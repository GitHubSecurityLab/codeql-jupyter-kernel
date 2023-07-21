/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
import { Token } from '@lumino/coreutils';
/**
 * A registry for rendering fields used in the FormEditor component.
 */
export class FormComponentRegistry {
    constructor() {
        this._renderers = {};
    }
    /**
     * Adds a renderer for a given id - if the id is already in use, returns false.
     * Otherwise, returns true.
     * @param id - Unique ID for the given renderer.
     * @param renderer - A function that takes props and returns a rendered component
     * @returns - Whether the renderer was added successfully. False if the id is already in use.
     */
    addRenderer(id, renderer) {
        if (this._renderers[id]) {
            return false;
        }
        this._renderers[id] = renderer;
        return true;
    }
    /**
     * Returns all registered renderers in dictionary form.
     * @returns - A dictionary that maps an id to a renderer.
     */
    get renderers() {
        return this._renderers;
    }
    /**
     * Returns the renderer for the given id
     * @param id - The unique id for the renderer.
     * @returns - A function that takes props and returns a rendered component.
     */
    getRenderer(id) {
        return this._renderers[id];
    }
}
export const IFormComponentRegistry = new Token('@jupyterlab/ui-components:ISettingEditorRegistry');
//# sourceMappingURL=FormComponentRegistry.js.map