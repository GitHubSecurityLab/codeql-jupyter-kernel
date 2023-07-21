import { ObservableList } from '@jupyterlab/observables';
import { SettingRegistry } from '@jupyterlab/settingregistry';
import { findIndex, toArray } from '@lumino/algorithm';
import { JSONExt } from '@lumino/coreutils';
import { Dialog, showDialog } from '../dialog';
/**
 * Default toolbar item rank
 *
 * #### Notes
 * This will place item just before the white spacer item in the notebook toolbar.
 */
const DEFAULT_TOOLBAR_ITEM_RANK = 50;
const TOOLBAR_KEY = 'jupyter.lab.toolbars';
/**
 * Display warning when the toolbar definition have been modified.
 *
 * @param trans Translation bundle
 */
async function displayInformation(trans) {
    const result = await showDialog({
        title: trans.__('Information'),
        body: trans.__('Toolbar customization has changed. You will need to reload JupyterLab to see the changes.'),
        buttons: [
            Dialog.cancelButton(),
            Dialog.okButton({ label: trans.__('Reload') })
        ]
    });
    if (result.button.accept) {
        location.reload();
    }
}
/**
 * Set the toolbar definition by accumulating all settings definition.
 *
 * The list will be populated only with the enabled items.
 *
 * @param toolbarItems Observable list to populate
 * @param registry Application settings registry
 * @param factoryName Widget factory name that needs a toolbar
 * @param pluginId Settings plugin id
 * @param translator Translator object
 * @param propertyId Property holding the toolbar definition in the settings; default 'toolbar'
 * @returns List of toolbar items
 */
async function setToolbarItems(toolbarItems, registry, factoryName, pluginId, translator, propertyId = 'toolbar') {
    var _a;
    const trans = translator.load('jupyterlab');
    let canonical = null;
    let loaded = {};
    let listenPlugin = true;
    try {
        /**
         * Populate the plugin's schema defaults.
         *
         * We keep track of disabled entries in case the plugin is loaded
         * after the toolbar initialization.
         */
        function populate(schema) {
            var _a, _b;
            loaded = {};
            const pluginDefaults = Object.keys(registry.plugins)
                // Filter out the current plugin (will be listed when reloading)
                // because we control its addition after the mapping step
                .filter(plugin => plugin !== pluginId)
                .map(plugin => {
                var _a, _b;
                const items = (_b = ((_a = registry.plugins[plugin].schema[TOOLBAR_KEY]) !== null && _a !== void 0 ? _a : {})[factoryName]) !== null && _b !== void 0 ? _b : [];
                loaded[plugin] = items;
                return items;
            })
                .concat([(_b = ((_a = schema[TOOLBAR_KEY]) !== null && _a !== void 0 ? _a : {})[factoryName]) !== null && _b !== void 0 ? _b : []])
                .reduceRight((acc, val) => SettingRegistry.reconcileToolbarItems(acc, val, true), []);
            // Apply default value as last step to take into account overrides.json
            // The standard toolbars default is [] as the plugin must use
            // `jupyter.lab.toolbars.<factory>` to define its default value.
            schema.properties[propertyId].default = SettingRegistry.reconcileToolbarItems(pluginDefaults, schema.properties[propertyId].default, true).sort((a, b) => {
                var _a, _b;
                return ((_a = a.rank) !== null && _a !== void 0 ? _a : DEFAULT_TOOLBAR_ITEM_RANK) -
                    ((_b = b.rank) !== null && _b !== void 0 ? _b : DEFAULT_TOOLBAR_ITEM_RANK);
            });
        }
        // Transform the plugin object to return different schema than the default.
        registry.transform(pluginId, {
            compose: plugin => {
                var _a, _b, _c, _d, _e;
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                const defaults = (_c = ((_b = ((_a = canonical.properties) !== null && _a !== void 0 ? _a : {})[propertyId]) !== null && _b !== void 0 ? _b : {}).default) !== null && _c !== void 0 ? _c : [];
                // Initialize the settings
                const user = plugin.data.user;
                const composite = plugin.data.composite;
                // Overrides the value with using the aggregated default for the toolbar property
                user[propertyId] = (_d = plugin.data.user[propertyId]) !== null && _d !== void 0 ? _d : [];
                composite[propertyId] = ((_e = SettingRegistry.reconcileToolbarItems(defaults, user[propertyId], false)) !== null && _e !== void 0 ? _e : []).sort((a, b) => {
                    var _a, _b;
                    return ((_a = a.rank) !== null && _a !== void 0 ? _a : DEFAULT_TOOLBAR_ITEM_RANK) -
                        ((_b = b.rank) !== null && _b !== void 0 ? _b : DEFAULT_TOOLBAR_ITEM_RANK);
                });
                plugin.data = { composite, user };
                return plugin;
            },
            fetch: plugin => {
                // Only override the canonical schema the first time.
                if (!canonical) {
                    canonical = JSONExt.deepCopy(plugin.schema);
                    populate(canonical);
                }
                return {
                    data: plugin.data,
                    id: plugin.id,
                    raw: plugin.raw,
                    schema: canonical,
                    version: plugin.version
                };
            }
        });
    }
    catch (error) {
        if (error.name === 'TransformError') {
            // Assume the existing transformer is the toolbar builder transformer
            // from another factory set up.
            listenPlugin = false;
        }
        else {
            throw error;
        }
    }
    // Repopulate the canonical variable after the setting registry has
    // preloaded all initial plugins.
    const settings = await registry.load(pluginId);
    // React to customization by the user
    settings.changed.connect(() => {
        var _a;
        const newItems = (_a = settings.composite[propertyId]) !== null && _a !== void 0 ? _a : [];
        transferSettings(newItems);
    });
    const transferSettings = (newItems) => {
        // This is not optimal but safer because a toolbar item with the same
        // name cannot be inserted (it will be a no-op). But that could happen
        // if the settings are changing the items order.
        toolbarItems.clear();
        toolbarItems.pushAll(newItems.filter(item => !item.disabled));
    };
    // Initialize the toolbar
    transferSettings((_a = settings.composite[propertyId]) !== null && _a !== void 0 ? _a : []);
    // React to plugin changes if no other transformer exists, otherwise bail.
    if (!listenPlugin) {
        return;
    }
    registry.pluginChanged.connect(async (sender, plugin) => {
        var _a, _b, _c;
        // Since the plugin storing the toolbar definition is transformed above,
        // if it has changed, it means that a request to reload was triggered.
        // Hence the toolbar definitions from the other plugins have been
        // automatically reset during the transform step.
        if (plugin === pluginId) {
            return;
        }
        // If a plugin changed its toolbar items
        const oldItems = (_a = loaded[plugin]) !== null && _a !== void 0 ? _a : [];
        const newItems = (_c = ((_b = registry.plugins[plugin].schema[TOOLBAR_KEY]) !== null && _b !== void 0 ? _b : {})[factoryName]) !== null && _c !== void 0 ? _c : [];
        if (!JSONExt.deepEqual(oldItems, newItems)) {
            if (loaded[plugin]) {
                // The plugin has changed, request the user to reload the UI
                await displayInformation(trans);
            }
            else {
                if (newItems.length > 0) {
                    canonical = null;
                    // This will trigger a settings.changed signal that will update the items
                    await registry.reload(pluginId);
                }
            }
        }
    });
}
/**
 * Create the toolbar factory for a given container widget based
 * on a data description stored in settings
 *
 * @param toolbarRegistry Toolbar widgets registry
 * @param settingsRegistry Settings registry
 * @param factoryName Toolbar container factory name
 * @param pluginId Settings plugin id
 * @param translator Translator
 * @param propertyId Toolbar definition key in the settings plugin
 * @returns List of toolbar widgets factory
 */
export function createToolbarFactory(toolbarRegistry, settingsRegistry, factoryName, pluginId, translator, propertyId = 'toolbar') {
    const items = new ObservableList({
        itemCmp: (a, b) => JSONExt.deepEqual(a, b)
    });
    // Get toolbar definition from the settings
    setToolbarItems(items, settingsRegistry, factoryName, pluginId, translator, propertyId).catch(reason => {
        console.error(`Failed to load toolbar items for factory ${factoryName} from ${pluginId}`, reason);
    });
    return (widget) => {
        const updateToolbar = (list, change) => {
            switch (change.type) {
                case 'move':
                    toolbar.move(change.oldIndex, change.newIndex);
                    break;
                case 'add':
                    change.newValues.forEach(item => toolbar.push({
                        name: item.name,
                        widget: toolbarRegistry.createWidget(factoryName, widget, item)
                    }));
                    break;
                case 'remove':
                    change.oldValues.forEach(() => toolbar.remove(change.oldIndex));
                    break;
                case 'set':
                    change.newValues.forEach(item => toolbar.set(change.newIndex, {
                        name: item.name,
                        widget: toolbarRegistry.createWidget(factoryName, widget, item)
                    }));
                    break;
            }
        };
        const toolbar = new ObservableList({
            values: toArray(items).map(item => {
                return {
                    name: item.name,
                    widget: toolbarRegistry.createWidget(factoryName, widget, item)
                };
            })
        });
        items.changed.connect(updateToolbar);
        widget.disposed.connect(() => {
            items.changed.disconnect(updateToolbar);
        });
        return toolbar;
    };
}
/**
 * Set the toolbar items of a widget from a factory
 *
 * @param widget Widget with the toolbar to set
 * @param factory Toolbar items factory
 */
export function setToolbar(widget, factory) {
    if (!widget.toolbar) {
        console.log(`Widget ${widget.id} has no 'toolbar'.`);
        return;
    }
    const items = factory(widget);
    if (Array.isArray(items)) {
        items.forEach(({ name, widget: item }) => {
            widget.toolbar.addItem(name, item);
        });
    }
    else {
        const updateToolbar = (list, changes) => {
            switch (changes.type) {
                case 'add':
                    changes.newValues.forEach((item, index) => {
                        widget.toolbar.insertItem(changes.newIndex + index, item.name, item.widget);
                    });
                    break;
                case 'move':
                    changes.oldValues.forEach(item => {
                        item.widget.parent = null;
                    });
                    changes.newValues.forEach((item, index) => {
                        widget.toolbar.insertItem(changes.newIndex + index, item.name, item.widget);
                    });
                    break;
                case 'remove':
                    changes.oldValues.forEach(item => {
                        item.widget.parent = null;
                    });
                    break;
                case 'set':
                    changes.oldValues.forEach(item => {
                        item.widget.parent = null;
                    });
                    changes.newValues.forEach((item, index) => {
                        const existingIndex = findIndex(widget.toolbar.names(), name => item.name === name);
                        if (existingIndex >= 0) {
                            toArray(widget.toolbar.children())[existingIndex].parent = null;
                        }
                        widget.toolbar.insertItem(changes.newIndex + index, item.name, item.widget);
                    });
                    break;
            }
        };
        updateToolbar(items, {
            newIndex: 0,
            newValues: toArray(items),
            oldIndex: 0,
            oldValues: [],
            type: 'add'
        });
        items.changed.connect(updateToolbar);
        widget.disposed.connect(() => {
            items.changed.disconnect(updateToolbar);
        });
    }
}
//# sourceMappingURL=factory.js.map