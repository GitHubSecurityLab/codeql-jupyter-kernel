import { IObservableList } from '@jupyterlab/observables';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ITranslator } from '@jupyterlab/translation';
import { Widget } from '@lumino/widgets';
import { IToolbarWidgetRegistry, ToolbarRegistry } from '../tokens';
import { Toolbar } from './widget';
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
export declare function createToolbarFactory(toolbarRegistry: IToolbarWidgetRegistry, settingsRegistry: ISettingRegistry, factoryName: string, pluginId: string, translator: ITranslator, propertyId?: string): (widget: Widget) => IObservableList<ToolbarRegistry.IToolbarItem>;
/**
 * Set the toolbar items of a widget from a factory
 *
 * @param widget Widget with the toolbar to set
 * @param factory Toolbar items factory
 */
export declare function setToolbar(widget: Toolbar.IWidgetToolbar, factory: (widget: Widget) => IObservableList<ToolbarRegistry.IToolbarItem> | ToolbarRegistry.IToolbarItem[]): void;
