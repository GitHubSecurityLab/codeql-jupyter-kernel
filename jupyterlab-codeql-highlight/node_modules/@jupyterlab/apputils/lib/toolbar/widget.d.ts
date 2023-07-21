/// <reference types="react" />
import { ITranslator } from '@jupyterlab/translation';
import { LabIcon } from '@jupyterlab/ui-components';
import { IIterator } from '@lumino/algorithm';
import { CommandRegistry } from '@lumino/commands';
import { ReadonlyJSONObject } from '@lumino/coreutils';
import { Message } from '@lumino/messaging';
import { Layout, Widget } from '@lumino/widgets';
import { ISessionContext } from '../sessioncontext';
import { ReactWidget } from '../vdom';
/**
 * A class which provides a toolbar widget.
 */
export declare class Toolbar<T extends Widget = Widget> extends Widget {
    /**
     * Construct a new toolbar widget.
     */
    constructor(options?: Toolbar.IOptions);
    /**
     * Get an iterator over the ordered toolbar item names.
     *
     * @returns An iterator over the toolbar item names.
     */
    names(): IIterator<string>;
    /**
     * Add an item to the end of the toolbar.
     *
     * @param name - The name of the widget to add to the toolbar.
     *
     * @param widget - The widget to add to the toolbar.
     *
     * @param index - The optional name of the item to insert after.
     *
     * @returns Whether the item was added to toolbar.  Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    addItem(name: string, widget: T): boolean;
    /**
     * Insert an item into the toolbar at the specified index.
     *
     * @param index - The index at which to insert the item.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertItem(index: number, name: string, widget: T): boolean;
    /**
     * Insert an item into the toolbar at the after a target item.
     *
     * @param at - The target item to insert after.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertAfter(at: string, name: string, widget: T): boolean;
    /**
     * Insert an item into the toolbar at the before a target item.
     *
     * @param at - The target item to insert before.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertBefore(at: string, name: string, widget: T): boolean;
    private _insertRelative;
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the dock panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event: Event): void;
    /**
     * Handle a DOM click event.
     */
    protected handleClick(event: Event): void;
    /**
     * Handle `after-attach` messages for the widget.
     */
    protected onAfterAttach(msg: Message): void;
    /**
     * Handle `before-detach` messages for the widget.
     */
    protected onBeforeDetach(msg: Message): void;
}
/**
 * A class which provides a toolbar widget.
 */
export declare class ReactiveToolbar extends Toolbar<Widget> {
    /**
     * Construct a new toolbar widget.
     */
    constructor();
    /**
     * Dispose of the widget and its descendant widgets.
     */
    dispose(): void;
    /**
     * Insert an item into the toolbar at the after a target item.
     *
     * @param at - The target item to insert after.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar or if the target
     *   is the toolbar pop-up opener.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertAfter(at: string, name: string, widget: Widget): boolean;
    /**
     * Insert an item into the toolbar at the specified index.
     *
     * @param index - The index at which to insert the item.
     *
     * @param name - The name of the item.
     *
     * @param widget - The widget to add.
     *
     * @returns Whether the item was added to the toolbar. Returns false if
     *   an item of the same name is already in the toolbar.
     *
     * #### Notes
     * The index will be clamped to the bounds of the items.
     * The item can be removed from the toolbar by setting its parent to `null`.
     */
    insertItem(index: number, name: string, widget: Widget): boolean;
    /**
     * A message handler invoked on a `'before-hide'` message.
     *
     * It will hide the pop-up panel
     */
    onBeforeHide(msg: Message): void;
    protected onResize(msg: Widget.ResizeMessage): void;
    private _onResize;
    private _saveWidgetWidth;
    private _getWidgetWidth;
    protected readonly popupOpener: ToolbarPopupOpener;
    private readonly _widgetWidths;
    private readonly _resizer;
}
/**
 * The namespace for Toolbar class statics.
 */
export declare namespace Toolbar {
    /**
     * The options used to create a toolbar.
     */
    interface IOptions {
        /**
         * Toolbar widget layout.
         */
        layout?: Layout;
    }
    /**
     * Widget with associated toolbar
     */
    interface IWidgetToolbar extends Widget {
        /**
         * Toolbar of actions on the widget
         */
        toolbar?: Toolbar;
    }
    /**
     * Create an interrupt toolbar item.
     *
     * @deprecated since version v3.2
     * This is dead code now.
     */
    function createInterruptButton(sessionContext: ISessionContext, translator?: ITranslator): Widget;
    /**
     * Create a restart toolbar item.
     *
     * @deprecated since v3.2
     * This is dead code now.
     */
    function createRestartButton(sessionContext: ISessionContext, dialogs?: ISessionContext.IDialogs, translator?: ITranslator): Widget;
    /**
     * Create a toolbar spacer item.
     *
     * #### Notes
     * It is a flex spacer that separates the left toolbar items
     * from the right toolbar items.
     */
    function createSpacerItem(): Widget;
    /**
     * Create a kernel name indicator item.
     *
     * #### Notes
     * It will display the `'display_name`' of the session context. It can
     * handle a change in context or kernel.
     */
    function createKernelNameItem(sessionContext: ISessionContext, dialogs?: ISessionContext.IDialogs, translator?: ITranslator): Widget;
    /**
     * Create a kernel status indicator item.
     *
     * #### Notes
     * It will show a busy status if the kernel status is busy.
     * It will show the current status in the node title.
     * It can handle a change to the context or the kernel.
     */
    function createKernelStatusItem(sessionContext: ISessionContext, translator?: ITranslator): Widget;
}
/**
 * Namespace for ToolbarButtonComponent.
 */
export declare namespace ToolbarButtonComponent {
    /**
     * Interface for ToolbarButtonComponent props.
     */
    interface IProps {
        className?: string;
        /**
         * Data set of the button
         */
        dataset?: DOMStringMap;
        label?: string;
        icon?: LabIcon.IMaybeResolvable;
        iconClass?: string;
        iconLabel?: string;
        tooltip?: string;
        onClick?: () => void;
        enabled?: boolean;
        pressed?: boolean;
        pressedIcon?: LabIcon.IMaybeResolvable;
        pressedTooltip?: string;
        disabledTooltip?: string;
        /**
         * Trigger the button on the actual onClick event rather than onMouseDown.
         *
         * See note in ToolbarButtonComponent below as to why the default is to
         * trigger on onMouseDown.
         */
        actualOnClick?: boolean;
        /**
         * The application language translator.
         */
        translator?: ITranslator;
    }
}
/**
 * React component for a toolbar button.
 *
 * @param props - The props for ToolbarButtonComponent.
 */
export declare function ToolbarButtonComponent(props: ToolbarButtonComponent.IProps): JSX.Element;
/**
 * Adds the toolbar button class to the toolbar widget.
 * @param w Toolbar button widget.
 */
export declare function addToolbarButtonClass(w: Widget): Widget;
/**
 * Phosphor Widget version of static ToolbarButtonComponent.
 */
export declare class ToolbarButton extends ReactWidget {
    private props;
    /**
     * Creates a toolbar button
     * @param props props for underlying `ToolbarButton` component
     */
    constructor(props?: ToolbarButtonComponent.IProps);
    /**
     * Sets the pressed state for the button
     * @param value true if button is pressed, false otherwise
     */
    set pressed(value: boolean);
    /**
     * Returns true if button is pressed, false otherwise
     */
    get pressed(): boolean;
    /**
     * Sets the enabled state for the button
     * @param value true to enable the button, false otherwise
     */
    set enabled(value: boolean);
    /**
     * Returns true if button is enabled, false otherwise
     */
    get enabled(): boolean;
    /**
     * Sets the click handler for the button
     * @param value click handler
     */
    set onClick(value: () => void);
    /**
     * Returns the click handler for the button
     */
    get onClick(): () => void;
    render(): JSX.Element;
    private _pressed;
    private _enabled;
    private _onClick;
}
/**
 * Namespace for CommandToolbarButtonComponent.
 */
export declare namespace CommandToolbarButtonComponent {
    /**
     * Interface for CommandToolbarButtonComponent props.
     */
    interface IProps {
        /**
         * Application commands registry
         */
        commands: CommandRegistry;
        /**
         * Command unique id
         */
        id: string;
        /**
         * Command arguments
         */
        args?: ReadonlyJSONObject;
        /**
         * Overrides command icon
         */
        icon?: LabIcon;
        /**
         * Overrides command label
         */
        label?: string;
    }
}
/**
 * React component for a toolbar button that wraps a command.
 *
 * This wraps the ToolbarButtonComponent and watches the command registry
 * for changes to the command.
 */
export declare function CommandToolbarButtonComponent(props: CommandToolbarButtonComponent.IProps): JSX.Element;
export declare function addCommandToolbarButtonClass(w: Widget): Widget;
/**
 * Phosphor Widget version of CommandToolbarButtonComponent.
 */
export declare class CommandToolbarButton extends ReactWidget {
    private props;
    /**
     * Creates a command toolbar button
     * @param props props for underlying `CommandToolbarButtonComponent` component
     */
    constructor(props: CommandToolbarButtonComponent.IProps);
    render(): JSX.Element;
}
/**
 *  A class which provides a toolbar popup
 *  used to store widgets that don't fit
 *  in the toolbar when it is resized
 */
declare class ToolbarPopup extends Widget {
    width: number;
    /**
     *  Construct a new ToolbarPopup
     */
    constructor();
    /**
     * Updates the width of the popup, this
     * should match with the toolbar width
     *
     * @param width - The width to resize to
     * @protected
     */
    updateWidth(width: number): void;
    /**
     * Aligns the popup to left bottom of widget
     *
     * @param widget the widget to align to
     * @private
     */
    alignTo(widget: Widget): void;
    /**
     * Inserts the widget at specified index
     * @param index the index
     * @param widget widget to add
     */
    insertWidget(index: number, widget: Widget): void;
    /**
     *  Total number of widgets in the popup
     */
    widgetCount(): number;
    /**
     * Returns the widget at index
     * @param index the index
     */
    widgetAt(index: number): Widget;
}
/**
 *  A class that provides a ToolbarPopupOpener,
 *  which is a button added to toolbar when
 *  the toolbar items overflow toolbar width
 */
declare class ToolbarPopupOpener extends ToolbarButton {
    /**
     *  Create a new popup opener
     */
    constructor();
    /**
     * Add widget to the popup, prepends widgets
     * @param widget the widget to add
     */
    addWidget(widget: Widget): void;
    /**
     * Dispose of the widget and its descendant widgets.
     *
     * #### Notes
     * It is unsafe to use the widget after it has been disposed.
     *
     * All calls made to this method after the first are a no-op.
     */
    dispose(): void;
    /**
     * Hides the opener and the popup
     */
    hide(): void;
    /**
     * Hides the popup
     */
    hidePopup(): void;
    /**
     *  Updates width and position of the popup
     *  to align with the toolbar
     */
    updatePopup(): void;
    /**
     * Returns widget at index in the popup
     * @param index
     */
    widgetAt(index: number): Widget;
    /**
     * Returns total number of widgets in the popup
     *
     * @returns Number of widgets
     */
    widgetCount(): number;
    protected handleClick(): void;
    protected popup: ToolbarPopup;
}
export {};
