from metakernel import Magic
import os


class SetDatabaseMagic(Magic):

    def line_set_database(self, path):
        if not os.path.exists(path):
            self.kernel.Error_display("Databae path does not exist: {}".format(path))
            return
        self.kernel.Display("Registering database ...", clear_output=False)
        err = self.kernel._query_client.register_database(path)
        if err:
            self.kernel.Error_display("Error registering database: {}".format(err))
            return
        else:
            self.kernel.Display("Database registered!", clear_output=True)
            return


def register_magics(kernel):
    kernel.register_magics(SetDatabaseMagic)
