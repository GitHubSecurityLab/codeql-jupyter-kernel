/// <reference types="react" />
export declare namespace ProgressCircle {
    /**
     * Props for the ProgressBar.
     */
    interface IProps {
        /**
         * The current progress percentage, from 0 to 100
         */
        progress: number;
        width?: number;
        height?: number;
    }
}
export declare function ProgressCircle(props: ProgressCircle.IProps): JSX.Element;
