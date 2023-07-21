import { CommandRegistry } from '@lumino/commands';
import { Widget } from '@lumino/widgets';
import { IToolbarWidgetRegistry, ToolbarRegistry } from '../tokens';
/**
 * Concrete implementation of IToolbarWidgetRegistry interface
 */
export declare class ToolbarWidgetRegistry implements IToolbarWidgetRegistry {
    constructor(options: ToolbarRegistry.IOptions);
    /**
     * Default toolbar item factory
     */
    get defaultFactory(): (widgetFactory: string, widget: Widget, toolbarItem: ToolbarRegistry.IWidget) => Widget;
    set defaultFactory(factory: (widgetFactory: string, widget: Widget, toolbarItem: ToolbarRegistry.IWidget) => Widget);
    /**
     * Create a toolbar item widget
     *
     * @param widgetFactory The widget factory name that creates the toolbar
     * @param widget The newly widget containing the toolbar
     * @param toolbarItem The toolbar item definition
     * @returns The widget to be inserted in the toolbar.
     */
    createWidget(widgetFactory: string, widget: Widget, toolbarItem: ToolbarRegistry.IWidget): Widget;
    /**
     * Register a new toolbar item factory
     *
     * @param widgetFactory The widget factory name that creates the toolbar
     * @param toolbarItemName The unique toolbar item
     * @param factory The factory function that receives the widget containing the toolbar and returns the toolbar widget.
     * @returns The previously defined factory
     */
    registerFactory<T extends Widget = Widget>(widgetFactory: string, toolbarItemName: string, factory: (main: T) => Widget): ((main: T) => Widget) | undefined;
    protected _defaultFactory: (widgetFactory: string, widget: Widget, toolbarItem: ToolbarRegistry.IWidget) => Widget;
    protected _widgets: Map<string, Map<string, (main: Widget) => Widget>>;
}
/**
 * Create the default toolbar item widget factory
 *
 * @param commands Application commands registry
 * @returns Default factory
 */
export declare function createDefaultFactory(commands: CommandRegistry): (widgetFactory: string, widget: Widget, toolbarItem: ToolbarRegistry.IWidget) => Widget;
