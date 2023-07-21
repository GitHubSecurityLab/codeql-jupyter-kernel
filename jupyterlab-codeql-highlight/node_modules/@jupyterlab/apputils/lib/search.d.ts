/// <reference types="react" />
import { ReactWidget } from './vdom';
/**
 * The class name added to the filebrowser crumbs node.
 */
export interface IFilterBoxProps {
    /**
     * A function to callback when filter is updated.
     */
    updateFilter: (filterFn: (item: string) => boolean | Partial<IScore> | null, query?: string) => void;
    /**
     * Whether to use the fuzzy filter.
     */
    useFuzzyFilter: boolean;
    /**
     * Optional placeholder for the search box.
     */
    placeholder?: string;
    /**
     * Whether to force a refresh.
     */
    forceRefresh?: boolean;
    /**
     * Whether to use case-sensitive search
     */
    caseSensitive?: boolean;
    /**
     * An optional initial search value.
     */
    initialQuery?: string;
}
/**
 * A text match score with associated content item.
 */
export interface IScore {
    /**
     * The numerical score for the text match.
     */
    score: number;
    /**
     * The indices of the text matches.
     */
    indices: number[] | null;
}
/**
 * Perform a fuzzy search on a single item.
 */
export declare function fuzzySearch(source: string, query: string): IScore | null;
export declare const updateFilterFunction: (value: string, useFuzzyFilter: boolean, caseSensitive?: boolean | undefined) => (item: string) => Partial<IScore> | null;
export declare const FilterBox: (props: IFilterBoxProps) => JSX.Element;
/**
 * A widget which hosts a input textbox to filter on file names.
 */
export declare const FilenameSearcher: (props: IFilterBoxProps) => ReactWidget;
