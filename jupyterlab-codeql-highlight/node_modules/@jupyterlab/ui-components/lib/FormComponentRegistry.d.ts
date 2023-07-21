import { Token } from '@lumino/coreutils';
import type { Field } from '@rjsf/core';
/**
 * A registry for rendering fields used in the FormEditor component.
 */
export declare class FormComponentRegistry implements IFormComponentRegistry {
    /**
     * Adds a renderer for a given id - if the id is already in use, returns false.
     * Otherwise, returns true.
     * @param id - Unique ID for the given renderer.
     * @param renderer - A function that takes props and returns a rendered component
     * @returns - Whether the renderer was added successfully. False if the id is already in use.
     */
    addRenderer(id: string, renderer: Field): boolean;
    /**
     * Returns all registered renderers in dictionary form.
     * @returns - A dictionary that maps an id to a renderer.
     */
    get renderers(): {
        [id: string]: Field;
    };
    /**
     * Returns the renderer for the given id
     * @param id - The unique id for the renderer.
     * @returns - A function that takes props and returns a rendered component.
     */
    getRenderer(id: string): Field;
    private _renderers;
}
/**
 * A registry for rendering fields used in the FormEditor component.
 */
export interface IFormComponentRegistry {
    /**
     * Adds a renderer for a given id - if the id is already in use, returns false.
     * Otherwise, returns true.
     * @param id - Unique ID for the given renderer.
     * @param renderer - A function that takes props and returns a rendered component
     * @returns - Whether the renderer was added successfully. False if the id is already in use.
     */
    addRenderer: (id: string, renderer: Field) => void;
    /**
     * Returns the renderer for the given id
     * @param id - The unique id for the renderer.
     * @returns - A function that takes props and returns a rendered component.
     */
    getRenderer: (id: string) => Field;
    /**
     * Returns all registered renderers in dictionary form.
     * @returns - A dictionary that maps an id to a renderer.
     */
    renderers: {
        [id: string]: Field;
    };
}
export declare const IFormComponentRegistry: Token<IFormComponentRegistry>;
