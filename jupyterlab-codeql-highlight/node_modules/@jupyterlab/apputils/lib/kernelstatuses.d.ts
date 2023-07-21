import { ITranslator } from '@jupyterlab/translation';
import { ISessionContext } from './sessioncontext';
/**
 * Helper function to translate kernel statuses mapping by using
 * input translator.
 *
 * @param translator - - Language translator.
 * @return The translated kernel status mapping.
 */
export declare function translateKernelStatuses(translator?: ITranslator): Record<ISessionContext.KernelDisplayStatus, string>;
