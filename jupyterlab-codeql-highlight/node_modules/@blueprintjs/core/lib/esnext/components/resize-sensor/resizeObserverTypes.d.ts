/** @fileoverview types re-exported from the resize observer polyfill library, will be removed in v4.0 */
import type { ResizeObserverEntry } from "@juggle/resize-observer";
import type { DOMRectReadOnly } from "@juggle/resize-observer/lib/DOMRectReadOnly";
/** @deprecated use { ResizeObserverEntry } from "@juggle/resize-observer" */
export declare type IResizeEntry = ResizeObserverEntry;
/** @deprecated use { ResizeObserverEntry } from "@juggle/resize-observer" */
export declare type ResizeEntry = IResizeEntry;
/** @deprecated */
export declare type IDOMRectReadOnly = DOMRectReadOnly;
/** @deprecated */
export { DOMRectReadOnly };
