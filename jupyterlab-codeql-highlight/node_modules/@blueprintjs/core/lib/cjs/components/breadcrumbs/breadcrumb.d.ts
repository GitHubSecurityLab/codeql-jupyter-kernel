import * as React from "react";
import { ActionProps, LinkProps } from "../../common/props";
export declare type BreadcrumbProps = IBreadcrumbProps;
/** @deprecated use BreadcrumbProps */
export interface IBreadcrumbProps extends ActionProps, LinkProps {
    /** Whether this breadcrumb is the current breadcrumb. */
    current?: boolean;
    /**
     * Pass through value to icon's title attribute. Should be used for breadcrumbs without
     * text or children defined.
     */
    iconTitle?: string;
}
export declare const Breadcrumb: React.FunctionComponent<BreadcrumbProps>;
