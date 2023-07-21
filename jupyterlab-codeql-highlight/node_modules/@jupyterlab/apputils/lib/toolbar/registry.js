import { LabIcon } from '@jupyterlab/ui-components';
import { Widget } from '@lumino/widgets';
import { CommandToolbarButton, Toolbar } from './widget';
/**
 * Concrete implementation of IToolbarWidgetRegistry interface
 */
export class ToolbarWidgetRegistry {
    constructor(options) {
        this._widgets = new Map();
        this._defaultFactory = options.defaultFactory;
    }
    /**
     * Default toolbar item factory
     */
    get defaultFactory() {
        return this._defaultFactory;
    }
    set defaultFactory(factory) {
        this._defaultFactory = factory;
    }
    /**
     * Create a toolbar item widget
     *
     * @param widgetFactory The widget factory name that creates the toolbar
     * @param widget The newly widget containing the toolbar
     * @param toolbarItem The toolbar item definition
     * @returns The widget to be inserted in the toolbar.
     */
    createWidget(widgetFactory, widget, toolbarItem) {
        var _a;
        const factory = (_a = this._widgets.get(widgetFactory)) === null || _a === void 0 ? void 0 : _a.get(toolbarItem.name);
        return factory
            ? factory(widget)
            : this._defaultFactory(widgetFactory, widget, toolbarItem);
    }
    /**
     * Register a new toolbar item factory
     *
     * @param widgetFactory The widget factory name that creates the toolbar
     * @param toolbarItemName The unique toolbar item
     * @param factory The factory function that receives the widget containing the toolbar and returns the toolbar widget.
     * @returns The previously defined factory
     */
    registerFactory(widgetFactory, toolbarItemName, factory) {
        let namespace = this._widgets.get(widgetFactory);
        const oldFactory = namespace === null || namespace === void 0 ? void 0 : namespace.get(toolbarItemName);
        if (!namespace) {
            namespace = new Map();
            this._widgets.set(widgetFactory, namespace);
        }
        namespace.set(toolbarItemName, factory);
        return oldFactory;
    }
}
/**
 * Create the default toolbar item widget factory
 *
 * @param commands Application commands registry
 * @returns Default factory
 */
export function createDefaultFactory(commands) {
    return (widgetFactory, widget, toolbarItem) => {
        var _a;
        switch ((_a = toolbarItem.type) !== null && _a !== void 0 ? _a : 'command') {
            case 'command': {
                const { command: tId, args: tArgs, label: tLabel, icon: tIcon } = toolbarItem;
                const id = tId !== null && tId !== void 0 ? tId : '';
                const args = Object.assign({ toolbar: true }, tArgs);
                const icon = tIcon ? LabIcon.resolve({ icon: tIcon }) : undefined;
                // If there is an icon, undefined label will results in no label
                // otherwise the label will be set using the setting or the command label
                const label = (icon !== null && icon !== void 0 ? icon : commands.icon(id, args)) ? tLabel !== null && tLabel !== void 0 ? tLabel : '' : tLabel;
                return new CommandToolbarButton({
                    commands,
                    id,
                    args,
                    icon,
                    label
                });
            }
            case 'spacer':
                return Toolbar.createSpacerItem();
            default:
                return new Widget();
        }
    };
}
//# sourceMappingURL=registry.js.map