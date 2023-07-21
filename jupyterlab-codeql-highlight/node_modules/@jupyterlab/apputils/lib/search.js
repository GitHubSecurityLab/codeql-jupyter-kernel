// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
import { InputGroup } from '@jupyterlab/ui-components';
import { StringExt } from '@lumino/algorithm';
import React, { useEffect, useState } from 'react';
import { ReactWidget } from './vdom';
/**
 * Perform a fuzzy search on a single item.
 */
export function fuzzySearch(source, query) {
    // Set up the match score and indices array.
    let score = Infinity;
    let indices = null;
    // The regex for search word boundaries
    const rgx = /\b\w/g;
    let continueSearch = true;
    // Search the source by word boundary.
    while (continueSearch) {
        // Find the next word boundary in the source.
        let rgxMatch = rgx.exec(source);
        // Break if there is no more source context.
        if (!rgxMatch) {
            break;
        }
        // Run the string match on the relevant substring.
        let match = StringExt.matchSumOfDeltas(source, query, rgxMatch.index);
        // Break if there is no match.
        if (!match) {
            break;
        }
        // Update the match if the score is better.
        if (match && match.score <= score) {
            score = match.score;
            indices = match.indices;
        }
    }
    // Bail if there was no match.
    if (!indices || score === Infinity) {
        return null;
    }
    // Handle a split match.
    return {
        score,
        indices
    };
}
export const updateFilterFunction = (value, useFuzzyFilter, caseSensitive) => {
    return (item) => {
        if (useFuzzyFilter) {
            // Run the fuzzy search for the item and query.
            const query = value.toLowerCase();
            // Ignore the item if it is not a match.
            return fuzzySearch(item, query);
        }
        if (!caseSensitive) {
            item = item.toLocaleLowerCase();
            value = value.toLocaleLowerCase();
        }
        const i = item.indexOf(value);
        if (i === -1) {
            return null;
        }
        return {
            indices: [...Array(item.length).keys()].map(x => x + 1)
        };
    };
};
export const FilterBox = (props) => {
    var _a;
    const [filter, setFilter] = useState((_a = props.initialQuery) !== null && _a !== void 0 ? _a : '');
    if (props.forceRefresh) {
        useEffect(() => {
            props.updateFilter((item) => {
                return {};
            });
        }, []);
    }
    useEffect(() => {
        // If there is an initial search value, pass the parent the initial filter function for that value.
        if (props.initialQuery !== undefined) {
            props.updateFilter(updateFilterFunction(props.initialQuery, props.useFuzzyFilter, props.caseSensitive), props.initialQuery);
        }
    }, []);
    /**
     * Handler for search input changes.
     */
    const handleChange = (e) => {
        const target = e.target;
        setFilter(target.value);
        props.updateFilter(updateFilterFunction(target.value, props.useFuzzyFilter, props.caseSensitive), target.value);
    };
    return (React.createElement(InputGroup, { type: "text", rightIcon: "ui-components:search", placeholder: props.placeholder, onChange: handleChange, className: "jp-FilterBox", value: filter }));
};
/**
 * A widget which hosts a input textbox to filter on file names.
 */
export const FilenameSearcher = (props) => {
    return ReactWidget.create(React.createElement(FilterBox, { updateFilter: props.updateFilter, useFuzzyFilter: props.useFuzzyFilter, placeholder: props.placeholder, forceRefresh: props.forceRefresh, caseSensitive: props.caseSensitive }));
};
//# sourceMappingURL=search.js.map