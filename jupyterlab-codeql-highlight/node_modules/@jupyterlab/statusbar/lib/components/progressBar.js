// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
/**
 * A functional tsx component for a progress bar.
 */
export function ProgressBar(props) {
    const { width, percentage } = props, rest = __rest(props, ["width", "percentage"]);
    return (React.createElement("div", { className: 'jp-Statusbar-ProgressBar-progress-bar', role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": percentage },
        React.createElement(Filler, Object.assign({}, Object.assign({ percentage }, rest), { contentWidth: width }))));
}
/**
 * A functional tsx component for a partially filled div.
 */
function Filler(props) {
    return (React.createElement("div", { style: {
            width: `${props.percentage}%`
        } },
        React.createElement("p", null, props.content)));
}
//# sourceMappingURL=progressBar.js.map