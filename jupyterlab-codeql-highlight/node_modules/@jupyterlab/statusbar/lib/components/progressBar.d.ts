/// <reference types="react" />
/**
 * A namespace for ProgressBar statics.
 */
export declare namespace ProgressBar {
    /**
     * Props for the ProgressBar.
     */
    interface IProps {
        /**
         * The current progress percentage, from 0 to 100
         */
        percentage: number;
        /**
         * Width of progress bar in pixel.
         */
        width?: number;
        /**
         * Text to show inside progress bar.
         */
        content?: string;
    }
}
/**
 * A functional tsx component for a progress bar.
 */
export declare function ProgressBar(props: ProgressBar.IProps): JSX.Element;
