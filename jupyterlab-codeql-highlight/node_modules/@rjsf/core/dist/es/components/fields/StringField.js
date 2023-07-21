function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import * as types from "../../types";
import { getWidget, getUiOptions, isSelect, optionsList, getDefaultRegistry, hasWidget } from "../../utils";

function StringField(props) {
  var schema = props.schema,
      name = props.name,
      uiSchema = props.uiSchema,
      idSchema = props.idSchema,
      formData = props.formData,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onChange = props.onChange,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? getDefaultRegistry() : _props$registry,
      rawErrors = props.rawErrors;
  var title = schema.title,
      format = schema.format;
  var widgets = registry.widgets,
      formContext = registry.formContext;
  var enumOptions = isSelect(schema) && optionsList(schema);
  var defaultWidget = enumOptions ? "select" : "text";

  if (format && hasWidget(schema, format, widgets)) {
    defaultWidget = format;
  }

  var _getUiOptions = getUiOptions(uiSchema),
      _getUiOptions$widget = _getUiOptions.widget,
      widget = _getUiOptions$widget === void 0 ? defaultWidget : _getUiOptions$widget,
      _getUiOptions$placeho = _getUiOptions.placeholder,
      placeholder = _getUiOptions$placeho === void 0 ? "" : _getUiOptions$placeho,
      options = _objectWithoutProperties(_getUiOptions, ["widget", "placeholder"]);

  var Widget = getWidget(schema, widget, widgets);
  return React.createElement(Widget, {
    options: _objectSpread({}, options, {
      enumOptions: enumOptions
    }),
    schema: schema,
    uiSchema: uiSchema,
    id: idSchema && idSchema.$id,
    label: title === undefined ? name : title,
    value: formData,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus,
    required: required,
    disabled: disabled,
    readonly: readonly,
    formContext: formContext,
    autofocus: autofocus,
    registry: registry,
    placeholder: placeholder,
    rawErrors: rawErrors
  });
}

if (process.env.NODE_ENV !== "production") {
  StringField.propTypes = types.fieldProps;
}

StringField.defaultProps = {
  uiSchema: {},
  disabled: false,
  readonly: false,
  autofocus: false
};
export default StringField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TdHJpbmdGaWVsZC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInR5cGVzIiwiZ2V0V2lkZ2V0IiwiZ2V0VWlPcHRpb25zIiwiaXNTZWxlY3QiLCJvcHRpb25zTGlzdCIsImdldERlZmF1bHRSZWdpc3RyeSIsImhhc1dpZGdldCIsIlN0cmluZ0ZpZWxkIiwicHJvcHMiLCJzY2hlbWEiLCJuYW1lIiwidWlTY2hlbWEiLCJpZFNjaGVtYSIsImZvcm1EYXRhIiwicmVxdWlyZWQiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiYXV0b2ZvY3VzIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJvbkZvY3VzIiwicmVnaXN0cnkiLCJyYXdFcnJvcnMiLCJ0aXRsZSIsImZvcm1hdCIsIndpZGdldHMiLCJmb3JtQ29udGV4dCIsImVudW1PcHRpb25zIiwiZGVmYXVsdFdpZGdldCIsIndpZGdldCIsInBsYWNlaG9sZGVyIiwib3B0aW9ucyIsIldpZGdldCIsIiRpZCIsInVuZGVmaW5lZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLFNBREYsRUFFRUMsWUFGRixFQUdFQyxRQUhGLEVBSUVDLFdBSkYsRUFLRUMsa0JBTEYsRUFNRUMsU0FORixRQU9PLGFBUFA7O0FBU0EsU0FBU0MsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFBQSxNQUV4QkMsTUFGd0IsR0FnQnRCRCxLQWhCc0IsQ0FFeEJDLE1BRndCO0FBQUEsTUFHeEJDLElBSHdCLEdBZ0J0QkYsS0FoQnNCLENBR3hCRSxJQUh3QjtBQUFBLE1BSXhCQyxRQUp3QixHQWdCdEJILEtBaEJzQixDQUl4QkcsUUFKd0I7QUFBQSxNQUt4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QVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM5QixFQUFBQSxXQUFXLENBQUMrQixTQUFaLEdBQXdCdEMsS0FBSyxDQUFDdUMsVUFBOUI7QUFDRDs7QUFFRGhDLFdBQVcsQ0FBQ2lDLFlBQVosR0FBMkI7QUFDekI3QixFQUFBQSxRQUFRLEVBQUUsRUFEZTtBQUV6QkksRUFBQUEsUUFBUSxFQUFFLEtBRmU7QUFHekJDLEVBQUFBLFFBQVEsRUFBRSxLQUhlO0FBSXpCQyxFQUFBQSxTQUFTLEVBQUU7QUFKYyxDQUEzQjtBQU9BLGVBQWVWLFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuaW1wb3J0IHtcbiAgZ2V0V2lkZ2V0LFxuICBnZXRVaU9wdGlvbnMsXG4gIGlzU2VsZWN0LFxuICBvcHRpb25zTGlzdCxcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxuICBoYXNXaWRnZXQsXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBTdHJpbmdGaWVsZChwcm9wcykge1xuICBjb25zdCB7XG4gICAgc2NoZW1hLFxuICAgIG5hbWUsXG4gICAgdWlTY2hlbWEsXG4gICAgaWRTY2hlbWEsXG4gICAgZm9ybURhdGEsXG4gICAgcmVxdWlyZWQsXG4gICAgZGlzYWJsZWQsXG4gICAgcmVhZG9ubHksXG4gICAgYXV0b2ZvY3VzLFxuICAgIG9uQ2hhbmdlLFxuICAgIG9uQmx1cixcbiAgICBvbkZvY3VzLFxuICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXG4gICAgcmF3RXJyb3JzLFxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgdGl0bGUsIGZvcm1hdCB9ID0gc2NoZW1hO1xuICBjb25zdCB7IHdpZGdldHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcbiAgY29uc3QgZW51bU9wdGlvbnMgPSBpc1NlbGVjdChzY2hlbWEpICYmIG9wdGlvbnNMaXN0KHNjaGVtYSk7XG4gIGxldCBkZWZhdWx0V2lkZ2V0ID0gZW51bU9wdGlvbnMgPyBcInNlbGVjdFwiIDogXCJ0ZXh0XCI7XG4gIGlmIChmb3JtYXQgJiYgaGFzV2lkZ2V0KHNjaGVtYSwgZm9ybWF0LCB3aWRnZXRzKSkge1xuICAgIGRlZmF1bHRXaWRnZXQgPSBmb3JtYXQ7XG4gIH1cbiAgY29uc3QgeyB3aWRnZXQgPSBkZWZhdWx0V2lkZ2V0LCBwbGFjZWhvbGRlciA9IFwiXCIsIC4uLm9wdGlvbnMgfSA9IGdldFVpT3B0aW9ucyhcbiAgICB1aVNjaGVtYVxuICApO1xuICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xuICByZXR1cm4gKFxuICAgIDxXaWRnZXRcbiAgICAgIG9wdGlvbnM9e3sgLi4ub3B0aW9ucywgZW51bU9wdGlvbnMgfX1cbiAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgaWQ9e2lkU2NoZW1hICYmIGlkU2NoZW1hLiRpZH1cbiAgICAgIGxhYmVsPXt0aXRsZSA9PT0gdW5kZWZpbmVkID8gbmFtZSA6IHRpdGxlfVxuICAgICAgdmFsdWU9e2Zvcm1EYXRhfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXN9XG4gICAgICByZWdpc3RyeT17cmVnaXN0cnl9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cbiAgICAvPlxuICApO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFN0cmluZ0ZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XG59XG5cblN0cmluZ0ZpZWxkLmRlZmF1bHRQcm9wcyA9IHtcbiAgdWlTY2hlbWE6IHt9LFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIHJlYWRvbmx5OiBmYWxzZSxcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ0ZpZWxkO1xuIl19