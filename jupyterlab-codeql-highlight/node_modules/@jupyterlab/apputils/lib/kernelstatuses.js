import { nullTranslator } from '@jupyterlab/translation';
/**
 * Helper function to translate kernel statuses mapping by using
 * input translator.
 *
 * @param translator - - Language translator.
 * @return The translated kernel status mapping.
 */
export function translateKernelStatuses(translator) {
    translator = translator || nullTranslator;
    const trans = translator.load('jupyterlab');
    const translated = {
        unknown: trans.__('Unknown'),
        starting: trans.__('Starting'),
        idle: trans.__('Idle'),
        busy: trans.__('Busy'),
        terminating: trans.__('Terminating'),
        restarting: trans.__('Restarting'),
        autorestarting: trans.__('Autorestarting'),
        dead: trans.__('Dead'),
        connected: trans.__('Connected'),
        connecting: trans.__('Connecting'),
        disconnected: trans.__('Disconnected'),
        initializing: trans.__('Initializing'),
        '': ''
    };
    return translated;
}
//# sourceMappingURL=kernelstatuses.js.map