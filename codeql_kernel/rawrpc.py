import io
import json
import threading
from queue import Queue
from subprocess import PIPE, Popen


class RPC(object):
    def __init__(self, cmd):
        self.cmd = cmd
        self.start()
        super(RPC, self).__init__()

    def start(self):
        self._proc: Popen = Popen(self.cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)

        assert self._proc.stdin
        assert self._proc.stdout
        assert self._proc.stderr

        self.stdin = io.open(self._proc.stdin.fileno(), "wb")
        self.stdout = io.open(self._proc.stdout.fileno(), "rb")
        self.stderr = io.open(self._proc.stderr.fileno(), "rb")

        self._queue = Queue()

        self.watchdog_stdout = Watchdog(self, name="stdout")
        self.watchdog_stderr = Watchdog(self, name="stderr")

    def stop(self):
        if self.stdin and not self.stdin.closed:
            self.stdin.close()
        if self.stdout and not self.stdout.closed:
            self.stdout.close()
        if self.stderr and not self.stderr.closed:
            self.stderr.close()
        self.watchdog_stdout.stop()
        self.watchdog_stderr.stop()
        self._proc.terminate()
        self._proc.wait()
        self._proc.kill()

    def restart(self):
        self.stop()
        self.start()

    def request(self, cmd):
        self._write(cmd)
        return self._queue.get()

    def _handle_stdout(self, resp):
        try:
            self._queue.put((None, json.loads(resp)))
        except:
            self._queue.put((None, resp))

    def _handle_stderr(self, resp):
        self._queue.put((resp, None))

    def _write(self, s):
        req = json.dumps(s)
        req = req + "\0"
        try:
            self.stdin.write(bytearray(req, "utf-8"))
            self.stdin.flush()
        except:
            pass


class Watchdog(threading.Thread):
    def __init__(self, rpc, name="watchdog", interval=0.1):
        super(Watchdog, self).__init__()

        if name == "stderr":
            self.stream = rpc.stderr
            self.handle = rpc._handle_stderr
        elif name == "stdout":
            self.stream = rpc.stdout
            self.handle = rpc._handle_stdout

        # store attributes
        self.rpc = rpc
        self.name = name
        self.interval = interval
        self.daemon = True

        # register a stop event
        self._stop = threading.Event()

        self.start()

    def start(self):
        super(Watchdog, self).start()

    def stop(self):
        self._stop.set()

    def run(self):
        # reset the stop event
        self._stop.clear()

        # stop here when stream is not set or closed
        if not self.stream or self.stream.closed:
            return

        # read new incoming lines
        while not self._stop.is_set():
            resp = None

            # stop when stream is closed
            if self.stream.closed:
                break

            try:
                resp = ""
                while True:
                    c = self.stream.read(1).decode("utf-8")
                    if c == "\x00" and self.name == "stdout":
                        break
                    elif c == "\n" and self.name == "stderr":
                        break
                    elif not c:
                        # EOF
                        break
                    else:
                        resp = resp + c
            except IOError:
                # prevent residual race conditions occurring when stream is closed externally
                pass
            self.handle(resp)
            self._stop.wait(self.interval)
