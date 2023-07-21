function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import IconButton from "../IconButton";
import React from "react";
import PropTypes from "prop-types";
import * as types from "../../types";
import { ADDITIONAL_PROPERTY_FLAG, isSelect, retrieveSchema, toIdSchema, getDefaultRegistry, mergeObjects, deepEquals, getSchemaType, getDisplayLabel } from "../../utils";
var REQUIRED_FIELD_SYMBOL = "*";
var COMPONENT_TYPES = {
  array: "ArrayField",
  "boolean": "BooleanField",
  integer: "NumberField",
  number: "NumberField",
  object: "ObjectField",
  string: "StringField",
  "null": "NullField"
};

function getFieldComponent(schema, uiSchema, idSchema, fields) {
  var field = uiSchema["ui:field"];

  if (typeof field === "function") {
    return field;
  }

  if (typeof field === "string" && field in fields) {
    return fields[field];
  }

  var componentName = COMPONENT_TYPES[getSchemaType(schema)]; // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
  // render a field and let the MultiSchemaField component handle the form display

  if (!componentName && (schema.anyOf || schema.oneOf)) {
    return function () {
      return null;
    };
  }

  return componentName in fields ? fields[componentName] : function () {
    var UnsupportedField = fields.UnsupportedField;
    return React.createElement(UnsupportedField, {
      schema: schema,
      idSchema: idSchema,
      reason: "Unknown field type ".concat(schema.type)
    });
  };
}

function Label(props) {
  var label = props.label,
      required = props.required,
      id = props.id;

  if (!label) {
    return null;
  }

  return React.createElement("label", {
    className: "control-label",
    htmlFor: id
  }, label, required && React.createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

function LabelInput(props) {
  var id = props.id,
      label = props.label,
      onChange = props.onChange;
  return React.createElement("input", {
    className: "form-control",
    type: "text",
    id: id,
    onBlur: function onBlur(event) {
      return onChange(event.target.value);
    },
    defaultValue: label
  });
}

function Help(props) {
  var id = props.id,
      help = props.help;

  if (!help) {
    return null;
  }

  if (typeof help === "string") {
    return React.createElement("p", {
      id: id,
      className: "help-block"
    }, help);
  }

  return React.createElement("div", {
    id: id,
    className: "help-block"
  }, help);
}

function ErrorList(props) {
  var _props$errors = props.errors,
      errors = _props$errors === void 0 ? [] : _props$errors;

  if (errors.length === 0) {
    return null;
  }

  return React.createElement("div", null, React.createElement("ul", {
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return React.createElement("li", {
      className: "text-danger",
      key: index
    }, error);
  })));
}

function DefaultTemplate(props) {
  var id = props.id,
      label = props.label,
      children = props.children,
      errors = props.errors,
      help = props.help,
      description = props.description,
      hidden = props.hidden,
      required = props.required,
      displayLabel = props.displayLabel;

  if (hidden) {
    return React.createElement("div", {
      className: "hidden"
    }, children);
  }

  return React.createElement(WrapIfAdditional, props, displayLabel && React.createElement(Label, {
    label: label,
    required: required,
    id: id
  }), displayLabel && description ? description : null, children, errors, help);
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    errors: PropTypes.element,
    rawErrors: PropTypes.arrayOf(PropTypes.string),
    help: PropTypes.element,
    rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.element,
    rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hidden: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    displayLabel: PropTypes.bool,
    fields: PropTypes.object,
    formContext: PropTypes.object
  };
}

DefaultTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true
};

function WrapIfAdditional(props) {
  var id = props.id,
      classNames = props.classNames,
      disabled = props.disabled,
      label = props.label,
      onKeyChange = props.onKeyChange,
      onDropPropertyClick = props.onDropPropertyClick,
      readonly = props.readonly,
      required = props.required,
      schema = props.schema;
  var keyLabel = "".concat(label, " Key"); // i18n ?

  var additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

  if (!additional) {
    return React.createElement("div", {
      className: classNames
    }, props.children);
  }

  return React.createElement("div", {
    className: classNames
  }, React.createElement("div", {
    className: "row"
  }, React.createElement("div", {
    className: "col-xs-5 form-additional"
  }, React.createElement("div", {
    className: "form-group"
  }, React.createElement(Label, {
    label: keyLabel,
    required: required,
    id: "".concat(id, "-key")
  }), React.createElement(LabelInput, {
    label: label,
    required: required,
    id: "".concat(id, "-key"),
    onChange: onKeyChange
  }))), React.createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, props.children), React.createElement("div", {
    className: "col-xs-2"
  }, React.createElement(IconButton, {
    type: "danger",
    icon: "remove",
    className: "array-item-remove btn-block",
    tabIndex: "-1",
    style: {
      border: "0"
    },
    disabled: disabled || readonly,
    onClick: onDropPropertyClick(label)
  }))));
}

function SchemaFieldRender(props) {
  var uiSchema = props.uiSchema,
      formData = props.formData,
      errorSchema = props.errorSchema,
      idPrefix = props.idPrefix,
      name = props.name,
      onChange = props.onChange,
      onKeyChange = props.onKeyChange,
      onDropPropertyClick = props.onDropPropertyClick,
      required = props.required,
      _props$registry = props.registry,
      registry = _props$registry === void 0 ? getDefaultRegistry() : _props$registry,
      _props$wasPropertyKey = props.wasPropertyKeyModified,
      wasPropertyKeyModified = _props$wasPropertyKey === void 0 ? false : _props$wasPropertyKey;
  var rootSchema = registry.rootSchema,
      fields = registry.fields,
      formContext = registry.formContext;
  var FieldTemplate = uiSchema["ui:FieldTemplate"] || registry.FieldTemplate || DefaultTemplate;
  var idSchema = props.idSchema;
  var schema = retrieveSchema(props.schema, rootSchema, formData);
  idSchema = mergeObjects(toIdSchema(schema, null, rootSchema, formData, idPrefix), idSchema);
  var FieldComponent = getFieldComponent(schema, uiSchema, idSchema, fields);
  var DescriptionField = fields.DescriptionField;
  var disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  var readonly = Boolean(props.readonly || uiSchema["ui:readonly"] || props.schema.readOnly || schema.readOnly);
  var autofocus = Boolean(props.autofocus || uiSchema["ui:autofocus"]);

  if (Object.keys(schema).length === 0) {
    return null;
  }

  var displayLabel = getDisplayLabel(schema, uiSchema, rootSchema);

  var __errors = errorSchema.__errors,
      fieldErrorSchema = _objectWithoutProperties(errorSchema, ["__errors"]); // See #439: uiSchema: Don't pass consumed class names to child components


  var field = React.createElement(FieldComponent, _extends({}, props, {
    idSchema: idSchema,
    schema: schema,
    uiSchema: _objectSpread({}, uiSchema, {
      classNames: undefined
    }),
    disabled: disabled,
    readonly: readonly,
    autofocus: autofocus,
    errorSchema: fieldErrorSchema,
    formContext: formContext,
    rawErrors: __errors
  }));
  var id = idSchema.$id; // If this schema has a title defined, but the user has set a new key/label, retain their input.

  var label;

  if (wasPropertyKeyModified) {
    label = name;
  } else {
    label = uiSchema["ui:title"] || props.schema.title || schema.title || name;
  }

  var description = uiSchema["ui:description"] || props.schema.description || schema.description;
  var errors = __errors;
  var help = uiSchema["ui:help"];
  var hidden = uiSchema["ui:widget"] === "hidden";
  var classNames = ["form-group", "field", "field-".concat(schema.type), errors && errors.length > 0 ? "field-error has-error has-danger" : "", uiSchema.classNames].join(" ").trim();
  var fieldProps = {
    description: React.createElement(DescriptionField, {
      id: id + "__description",
      description: description,
      formContext: formContext
    }),
    rawDescription: description,
    help: React.createElement(Help, {
      id: id + "__help",
      help: help
    }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: React.createElement(ErrorList, {
      errors: errors
    }),
    rawErrors: errors,
    id: id,
    label: label,
    hidden: hidden,
    onChange: onChange,
    onKeyChange: onKeyChange,
    onDropPropertyClick: onDropPropertyClick,
    required: required,
    disabled: disabled,
    readonly: readonly,
    displayLabel: displayLabel,
    classNames: classNames,
    formContext: formContext,
    formData: formData,
    fields: fields,
    schema: schema,
    uiSchema: uiSchema,
    registry: registry
  };
  var _AnyOfField = registry.fields.AnyOfField;
  var _OneOfField = registry.fields.OneOfField;
  return React.createElement(FieldTemplate, fieldProps, React.createElement(React.Fragment, null, field, schema.anyOf && !isSelect(schema) && React.createElement(_AnyOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.anyOf.map(function (_schema) {
      return retrieveSchema(_schema, rootSchema, formData);
    }),
    baseType: schema.type,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  }), schema.oneOf && !isSelect(schema) && React.createElement(_OneOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.oneOf.map(function (_schema) {
      return retrieveSchema(_schema, rootSchema, formData);
    }),
    baseType: schema.type,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  })));
}

var SchemaField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SchemaField, _React$Component);

  function SchemaField() {
    _classCallCheck(this, SchemaField);

    return _possibleConstructorReturn(this, _getPrototypeOf(SchemaField).apply(this, arguments));
  }

  _createClass(SchemaField, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !deepEquals(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      return SchemaFieldRender(this.props);
    }
  }]);

  return SchemaField;
}(React.Component);

SchemaField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SchemaField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    formData: PropTypes.any,
    errorSchema: PropTypes.object,
    registry: types.registry.isRequired
  };
}

export default SchemaField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJJY29uQnV0dG9uIiwiUmVhY3QiLCJQcm9wVHlwZXMiLCJ0eXBlcyIsIkFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyIsImlzU2VsZWN0IiwicmV0cmlldmVTY2hlbWEiLCJ0b0lkU2NoZW1hIiwiZ2V0RGVmYXVsdFJlZ2lzdHJ5IiwibWVyZ2VPYmplY3RzIiwiZGVlcEVxdWFscyIsImdldFNjaGVtYVR5cGUiLCJnZXREaXNwbGF5TGFiZWwiLCJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImludGVnZXIiLCJudW1iZXIiLCJvYmplY3QiLCJzdHJpbmciLCJnZXRGaWVsZENvbXBvbmVudCIsInNjaGVtYSIsInVpU2NoZW1hIiwiaWRTY2hlbWEiLCJmaWVsZHMiLCJmaWVsZCIsImNvbXBvbmVudE5hbWUiLCJhbnlPZiIsIm9uZU9mIiwiVW5zdXBwb3J0ZWRGaWVsZCIsInR5cGUiLCJMYWJlbCIsInByb3BzIiwibGFiZWwiLCJyZXF1aXJlZCIsImlkIiwiTGFiZWxJbnB1dCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkhlbHAiLCJoZWxwIiwiRXJyb3JMaXN0IiwiZXJyb3JzIiwibGVuZ3RoIiwiZmlsdGVyIiwiZWxlbSIsIm1hcCIsImVycm9yIiwiaW5kZXgiLCJEZWZhdWx0VGVtcGxhdGUiLCJjaGlsZHJlbiIsImRlc2NyaXB0aW9uIiwiaGlkZGVuIiwiZGlzcGxheUxhYmVsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiY2xhc3NOYW1lcyIsIm5vZGUiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsInJhd0Vycm9ycyIsImFycmF5T2YiLCJyYXdIZWxwIiwib25lT2ZUeXBlIiwicmF3RGVzY3JpcHRpb24iLCJib29sIiwicmVhZG9ubHkiLCJmb3JtQ29udGV4dCIsImRlZmF1bHRQcm9wcyIsIldyYXBJZkFkZGl0aW9uYWwiLCJkaXNhYmxlZCIsIm9uS2V5Q2hhbmdlIiwib25Ecm9wUHJvcGVydHlDbGljayIsImtleUxhYmVsIiwiYWRkaXRpb25hbCIsImhhc093blByb3BlcnR5IiwiYm9yZGVyIiwiU2NoZW1hRmllbGRSZW5kZXIiLCJmb3JtRGF0YSIsImVycm9yU2NoZW1hIiwiaWRQcmVmaXgiLCJuYW1lIiwicmVnaXN0cnkiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwicm9vdFNjaGVtYSIsIkZpZWxkVGVtcGxhdGUiLCJGaWVsZENvbXBvbmVudCIsIkRlc2NyaXB0aW9uRmllbGQiLCJCb29sZWFuIiwicmVhZE9ubHkiLCJhdXRvZm9jdXMiLCJPYmplY3QiLCJrZXlzIiwiX19lcnJvcnMiLCJmaWVsZEVycm9yU2NoZW1hIiwidW5kZWZpbmVkIiwiJGlkIiwidGl0bGUiLCJqb2luIiwidHJpbSIsImZpZWxkUHJvcHMiLCJfQW55T2ZGaWVsZCIsIkFueU9mRmllbGQiLCJfT25lT2ZGaWVsZCIsIk9uZU9mRmllbGQiLCJvbkJsdXIiLCJvbkZvY3VzIiwiX3NjaGVtYSIsIlNjaGVtYUZpZWxkIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiQ29tcG9uZW50IiwiYW55Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsVUFBUCxNQUF1QixlQUF2QjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBTyxLQUFLQyxLQUFaLE1BQXVCLGFBQXZCO0FBRUEsU0FDRUMsd0JBREYsRUFFRUMsUUFGRixFQUdFQyxjQUhGLEVBSUVDLFVBSkYsRUFLRUMsa0JBTEYsRUFNRUMsWUFORixFQU9FQyxVQVBGLEVBUUVDLGFBUkYsRUFTRUMsZUFURixRQVVPLGFBVlA7QUFZQSxJQUFNQyxxQkFBcUIsR0FBRyxHQUE5QjtBQUNBLElBQU1DLGVBQWUsR0FBRztBQUN0QkMs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eEI7QUFRRDs7QUFFRCxlQUFla0QsV0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuaW1wb3J0IHtcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxuICBpc1NlbGVjdCxcbiAgcmV0cmlldmVTY2hlbWEsXG4gIHRvSWRTY2hlbWEsXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcbiAgbWVyZ2VPYmplY3RzLFxuICBkZWVwRXF1YWxzLFxuICBnZXRTY2hlbWFUeXBlLFxuICBnZXREaXNwbGF5TGFiZWwsXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5jb25zdCBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgPSBcIipcIjtcbmNvbnN0IENPTVBPTkVOVF9UWVBFUyA9IHtcbiAgYXJyYXk6IFwiQXJyYXlGaWVsZFwiLFxuICBib29sZWFuOiBcIkJvb2xlYW5GaWVsZFwiLFxuICBpbnRlZ2VyOiBcIk51bWJlckZpZWxkXCIsXG4gIG51bWJlcjogXCJOdW1iZXJGaWVsZFwiLFxuICBvYmplY3Q6IFwiT2JqZWN0RmllbGRcIixcbiAgc3RyaW5nOiBcIlN0cmluZ0ZpZWxkXCIsXG4gIG51bGw6IFwiTnVsbEZpZWxkXCIsXG59O1xuXG5mdW5jdGlvbiBnZXRGaWVsZENvbXBvbmVudChzY2hlbWEsIHVpU2NoZW1hLCBpZFNjaGVtYSwgZmllbGRzKSB7XG4gIGNvbnN0IGZpZWxkID0gdWlTY2hlbWFbXCJ1aTpmaWVsZFwiXTtcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZpZWxkO1xuICB9XG4gIGlmICh0eXBlb2YgZmllbGQgPT09IFwic3RyaW5nXCIgJiYgZmllbGQgaW4gZmllbGRzKSB7XG4gICAgcmV0dXJuIGZpZWxkc1tmaWVsZF07XG4gIH1cblxuICBjb25zdCBjb21wb25lbnROYW1lID0gQ09NUE9ORU5UX1RZUEVTW2dldFNjaGVtYVR5cGUoc2NoZW1hKV07XG5cbiAgLy8gSWYgdGhlIHR5cGUgaXMgbm90IGRlZmluZWQgYW5kIHRoZSBzY2hlbWEgdXNlcyAnYW55T2YnIG9yICdvbmVPZicsIGRvbid0XG4gIC8vIHJlbmRlciBhIGZpZWxkIGFuZCBsZXQgdGhlIE11bHRpU2NoZW1hRmllbGQgY29tcG9uZW50IGhhbmRsZSB0aGUgZm9ybSBkaXNwbGF5XG4gIGlmICghY29tcG9uZW50TmFtZSAmJiAoc2NoZW1hLmFueU9mIHx8IHNjaGVtYS5vbmVPZikpIHtcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnROYW1lIGluIGZpZWxkc1xuICAgID8gZmllbGRzW2NvbXBvbmVudE5hbWVdXG4gICAgOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFVuc3VwcG9ydGVkRmllbGRcbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxuICAgICAgICAgICAgcmVhc29uPXtgVW5rbm93biBmaWVsZCB0eXBlICR7c2NoZW1hLnR5cGV9YH1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfTtcbn1cblxuZnVuY3Rpb24gTGFiZWwocHJvcHMpIHtcbiAgY29uc3QgeyBsYWJlbCwgcmVxdWlyZWQsIGlkIH0gPSBwcm9wcztcbiAgaWYgKCFsYWJlbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIiBodG1sRm9yPXtpZH0+XG4gICAgICB7bGFiZWx9XG4gICAgICB7cmVxdWlyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwicmVxdWlyZWRcIj57UkVRVUlSRURfRklFTERfU1lNQk9MfTwvc3Bhbj59XG4gICAgPC9sYWJlbD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTGFiZWxJbnB1dChwcm9wcykge1xuICBjb25zdCB7IGlkLCBsYWJlbCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxpbnB1dFxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGlkPXtpZH1cbiAgICAgIG9uQmx1cj17ZXZlbnQgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgIGRlZmF1bHRWYWx1ZT17bGFiZWx9XG4gICAgLz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gSGVscChwcm9wcykge1xuICBjb25zdCB7IGlkLCBoZWxwIH0gPSBwcm9wcztcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBoZWxwID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxuICAgICAgICB7aGVscH1cbiAgICAgIDwvcD5cbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT1cImhlbHAtYmxvY2tcIj5cbiAgICAgIHtoZWxwfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBFcnJvckxpc3QocHJvcHMpIHtcbiAgY29uc3QgeyBlcnJvcnMgPSBbXSB9ID0gcHJvcHM7XG4gIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZXJyb3ItZGV0YWlsIGJzLWNhbGxvdXQgYnMtY2FsbG91dC1pbmZvXCI+XG4gICAgICAgIHtlcnJvcnNcbiAgICAgICAgICAuZmlsdGVyKGVsZW0gPT4gISFlbGVtKVxuICAgICAgICAgIC5tYXAoKGVycm9yLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICk7XG59XG5mdW5jdGlvbiBEZWZhdWx0VGVtcGxhdGUocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIGlkLFxuICAgIGxhYmVsLFxuICAgIGNoaWxkcmVuLFxuICAgIGVycm9ycyxcbiAgICBoZWxwLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhpZGRlbixcbiAgICByZXF1aXJlZCxcbiAgICBkaXNwbGF5TGFiZWwsXG4gIH0gPSBwcm9wcztcbiAgaWYgKGhpZGRlbikge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlblwiPntjaGlsZHJlbn08L2Rpdj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxXcmFwSWZBZGRpdGlvbmFsIHsuLi5wcm9wc30+XG4gICAgICB7ZGlzcGxheUxhYmVsICYmIDxMYWJlbCBsYWJlbD17bGFiZWx9IHJlcXVpcmVkPXtyZXF1aXJlZH0gaWQ9e2lkfSAvPn1cbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbiA6IG51bGx9XG4gICAgICB7Y2hpbGRyZW59XG4gICAgICB7ZXJyb3JzfVxuICAgICAge2hlbHB9XG4gICAgPC9XcmFwSWZBZGRpdGlvbmFsPlxuICApO1xufVxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBEZWZhdWx0VGVtcGxhdGUucHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgZXJyb3JzOiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICByYXdFcnJvcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGhlbHA6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHJhd0hlbHA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHJhd0Rlc2NyaXB0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICAgIGhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNwbGF5TGFiZWw6IFByb3BUeXBlcy5ib29sLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmb3JtQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcbiAgfTtcbn1cblxuRGVmYXVsdFRlbXBsYXRlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZGVuOiBmYWxzZSxcbiAgcmVhZG9ubHk6IGZhbHNlLFxuICByZXF1aXJlZDogZmFsc2UsXG4gIGRpc3BsYXlMYWJlbDogdHJ1ZSxcbn07XG5cbmZ1bmN0aW9uIFdyYXBJZkFkZGl0aW9uYWwocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIGlkLFxuICAgIGNsYXNzTmFtZXMsXG4gICAgZGlzYWJsZWQsXG4gICAgbGFiZWwsXG4gICAgb25LZXlDaGFuZ2UsXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcbiAgICByZWFkb25seSxcbiAgICByZXF1aXJlZCxcbiAgICBzY2hlbWEsXG4gIH0gPSBwcm9wcztcbiAgY29uc3Qga2V5TGFiZWwgPSBgJHtsYWJlbH0gS2V5YDsgLy8gaTE4biA/XG4gIGNvbnN0IGFkZGl0aW9uYWwgPSBzY2hlbWEuaGFzT3duUHJvcGVydHkoQURESVRJT05BTF9QUk9QRVJUWV9GTEFHKTtcblxuICBpZiAoIWFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9Pntwcm9wcy5jaGlsZHJlbn08L2Rpdj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTUgZm9ybS1hZGRpdGlvbmFsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8TGFiZWwgbGFiZWw9e2tleUxhYmVsfSByZXF1aXJlZD17cmVxdWlyZWR9IGlkPXtgJHtpZH0ta2V5YH0gLz5cbiAgICAgICAgICAgIDxMYWJlbElucHV0XG4gICAgICAgICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgICAgICAgICBpZD17YCR7aWR9LWtleWB9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbktleUNoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWRkaXRpb25hbCBmb3JtLWdyb3VwIGNvbC14cy01XCI+XG4gICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMlwiPlxuICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiZGFuZ2VyXCJcbiAgICAgICAgICAgIGljb249XCJyZW1vdmVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1yZW1vdmUgYnRuLWJsb2NrXCJcbiAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiBcIjBcIiB9fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHJlYWRvbmx5fVxuICAgICAgICAgICAgb25DbGljaz17b25Ecm9wUHJvcGVydHlDbGljayhsYWJlbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gU2NoZW1hRmllbGRSZW5kZXIocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIHVpU2NoZW1hLFxuICAgIGZvcm1EYXRhLFxuICAgIGVycm9yU2NoZW1hLFxuICAgIGlkUHJlZml4LFxuICAgIG5hbWUsXG4gICAgb25DaGFuZ2UsXG4gICAgb25LZXlDaGFuZ2UsXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcbiAgICByZXF1aXJlZCxcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxuICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQgPSBmYWxzZSxcbiAgfSA9IHByb3BzO1xuICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xuICBjb25zdCBGaWVsZFRlbXBsYXRlID1cbiAgICB1aVNjaGVtYVtcInVpOkZpZWxkVGVtcGxhdGVcIl0gfHwgcmVnaXN0cnkuRmllbGRUZW1wbGF0ZSB8fCBEZWZhdWx0VGVtcGxhdGU7XG4gIGxldCBpZFNjaGVtYSA9IHByb3BzLmlkU2NoZW1hO1xuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShwcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcbiAgaWRTY2hlbWEgPSBtZXJnZU9iamVjdHMoXG4gICAgdG9JZFNjaGVtYShzY2hlbWEsIG51bGwsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCksXG4gICAgaWRTY2hlbWFcbiAgKTtcbiAgY29uc3QgRmllbGRDb21wb25lbnQgPSBnZXRGaWVsZENvbXBvbmVudChzY2hlbWEsIHVpU2NoZW1hLCBpZFNjaGVtYSwgZmllbGRzKTtcbiAgY29uc3QgeyBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XG4gIGNvbnN0IGRpc2FibGVkID0gQm9vbGVhbihwcm9wcy5kaXNhYmxlZCB8fCB1aVNjaGVtYVtcInVpOmRpc2FibGVkXCJdKTtcbiAgY29uc3QgcmVhZG9ubHkgPSBCb29sZWFuKFxuICAgIHByb3BzLnJlYWRvbmx5IHx8XG4gICAgICB1aVNjaGVtYVtcInVpOnJlYWRvbmx5XCJdIHx8XG4gICAgICBwcm9wcy5zY2hlbWEucmVhZE9ubHkgfHxcbiAgICAgIHNjaGVtYS5yZWFkT25seVxuICApO1xuICBjb25zdCBhdXRvZm9jdXMgPSBCb29sZWFuKHByb3BzLmF1dG9mb2N1cyB8fCB1aVNjaGVtYVtcInVpOmF1dG9mb2N1c1wiXSk7XG4gIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUxhYmVsID0gZ2V0RGlzcGxheUxhYmVsKHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpO1xuXG4gIGNvbnN0IHsgX19lcnJvcnMsIC4uLmZpZWxkRXJyb3JTY2hlbWEgfSA9IGVycm9yU2NoZW1hO1xuXG4gIC8vIFNlZSAjNDM5OiB1aVNjaGVtYTogRG9uJ3QgcGFzcyBjb25zdW1lZCBjbGFzcyBuYW1lcyB0byBjaGlsZCBjb21wb25lbnRzXG4gIGNvbnN0IGZpZWxkID0gKFxuICAgIDxGaWVsZENvbXBvbmVudFxuICAgICAgey4uLnByb3BzfVxuICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxuICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICB1aVNjaGVtYT17eyAuLi51aVNjaGVtYSwgY2xhc3NOYW1lczogdW5kZWZpbmVkIH19XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cbiAgICAgIGVycm9yU2NoZW1hPXtmaWVsZEVycm9yU2NoZW1hfVxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgcmF3RXJyb3JzPXtfX2Vycm9yc31cbiAgICAvPlxuICApO1xuXG4gIGNvbnN0IGlkID0gaWRTY2hlbWEuJGlkO1xuXG4gIC8vIElmIHRoaXMgc2NoZW1hIGhhcyBhIHRpdGxlIGRlZmluZWQsIGJ1dCB0aGUgdXNlciBoYXMgc2V0IGEgbmV3IGtleS9sYWJlbCwgcmV0YWluIHRoZWlyIGlucHV0LlxuICBsZXQgbGFiZWw7XG4gIGlmICh3YXNQcm9wZXJ0eUtleU1vZGlmaWVkKSB7XG4gICAgbGFiZWwgPSBuYW1lO1xuICB9IGVsc2Uge1xuICAgIGxhYmVsID0gdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy5zY2hlbWEudGl0bGUgfHwgc2NoZW1hLnRpdGxlIHx8IG5hbWU7XG4gIH1cblxuICBjb25zdCBkZXNjcmlwdGlvbiA9XG4gICAgdWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fFxuICAgIHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbiB8fFxuICAgIHNjaGVtYS5kZXNjcmlwdGlvbjtcbiAgY29uc3QgZXJyb3JzID0gX19lcnJvcnM7XG4gIGNvbnN0IGhlbHAgPSB1aVNjaGVtYVtcInVpOmhlbHBcIl07XG4gIGNvbnN0IGhpZGRlbiA9IHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xuICBjb25zdCBjbGFzc05hbWVzID0gW1xuICAgIFwiZm9ybS1ncm91cFwiLFxuICAgIFwiZmllbGRcIixcbiAgICBgZmllbGQtJHtzY2hlbWEudHlwZX1gLFxuICAgIGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCA/IFwiZmllbGQtZXJyb3IgaGFzLWVycm9yIGhhcy1kYW5nZXJcIiA6IFwiXCIsXG4gICAgdWlTY2hlbWEuY2xhc3NOYW1lcyxcbiAgXVxuICAgIC5qb2luKFwiIFwiKVxuICAgIC50cmltKCk7XG5cbiAgY29uc3QgZmllbGRQcm9wcyA9IHtcbiAgICBkZXNjcmlwdGlvbjogKFxuICAgICAgPERlc2NyaXB0aW9uRmllbGRcbiAgICAgICAgaWQ9e2lkICsgXCJfX2Rlc2NyaXB0aW9uXCJ9XG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgLz5cbiAgICApLFxuICAgIHJhd0Rlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICBoZWxwOiA8SGVscCBpZD17aWQgKyBcIl9faGVscFwifSBoZWxwPXtoZWxwfSAvPixcbiAgICByYXdIZWxwOiB0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIiA/IGhlbHAgOiB1bmRlZmluZWQsXG4gICAgZXJyb3JzOiA8RXJyb3JMaXN0IGVycm9ycz17ZXJyb3JzfSAvPixcbiAgICByYXdFcnJvcnM6IGVycm9ycyxcbiAgICBpZCxcbiAgICBsYWJlbCxcbiAgICBoaWRkZW4sXG4gICAgb25DaGFuZ2UsXG4gICAgb25LZXlDaGFuZ2UsXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcbiAgICByZXF1aXJlZCxcbiAgICBkaXNhYmxlZCxcbiAgICByZWFkb25seSxcbiAgICBkaXNwbGF5TGFiZWwsXG4gICAgY2xhc3NOYW1lcyxcbiAgICBmb3JtQ29udGV4dCxcbiAgICBmb3JtRGF0YSxcbiAgICBmaWVsZHMsXG4gICAgc2NoZW1hLFxuICAgIHVpU2NoZW1hLFxuICAgIHJlZ2lzdHJ5LFxuICB9O1xuXG4gIGNvbnN0IF9BbnlPZkZpZWxkID0gcmVnaXN0cnkuZmllbGRzLkFueU9mRmllbGQ7XG4gIGNvbnN0IF9PbmVPZkZpZWxkID0gcmVnaXN0cnkuZmllbGRzLk9uZU9mRmllbGQ7XG5cbiAgcmV0dXJuIChcbiAgICA8RmllbGRUZW1wbGF0ZSB7Li4uZmllbGRQcm9wc30+XG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIHtmaWVsZH1cblxuICAgICAgICB7LypcbiAgICAgICAgSWYgdGhlIHNjaGVtYSBgYW55T2ZgIG9yICdvbmVPZicgY2FuIGJlIHJlbmRlcmVkIGFzIGEgc2VsZWN0IGNvbnRyb2wsIGRvbid0XG4gICAgICAgIHJlbmRlciB0aGUgc2VsZWN0aW9uIGFuZCBsZXQgYFN0cmluZ0ZpZWxkYCBjb21wb25lbnQgaGFuZGxlXG4gICAgICAgIHJlbmRlcmluZ1xuICAgICAgKi99XG4gICAgICAgIHtzY2hlbWEuYW55T2YgJiYgIWlzU2VsZWN0KHNjaGVtYSkgJiYgKFxuICAgICAgICAgIDxfQW55T2ZGaWVsZFxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxuICAgICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17cHJvcHMub25DaGFuZ2V9XG4gICAgICAgICAgICBvbkZvY3VzPXtwcm9wcy5vbkZvY3VzfVxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLmFueU9mLm1hcChfc2NoZW1hID0+XG4gICAgICAgICAgICAgIHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cbiAgICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3NjaGVtYS5vbmVPZiAmJiAhaXNTZWxlY3Qoc2NoZW1hKSAmJiAoXG4gICAgICAgICAgPF9PbmVPZkZpZWxkXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XG4gICAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XG4gICAgICAgICAgICBvbkJsdXI9e3Byb3BzLm9uQmx1cn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgIG9uRm9jdXM9e3Byb3BzLm9uRm9jdXN9XG4gICAgICAgICAgICBvcHRpb25zPXtzY2hlbWEub25lT2YubWFwKF9zY2hlbWEgPT5cbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgYmFzZVR5cGU9e3NjaGVtYS50eXBlfVxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxuICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgPC9GaWVsZFRlbXBsYXRlPlxuICApO1xufVxuXG5jbGFzcyBTY2hlbWFGaWVsZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAhZGVlcEVxdWFscyh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBTY2hlbWFGaWVsZFJlbmRlcih0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5TY2hlbWFGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XG4gIHVpU2NoZW1hOiB7fSxcbiAgZXJyb3JTY2hlbWE6IHt9LFxuICBpZFNjaGVtYToge30sXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgcmVhZG9ubHk6IGZhbHNlLFxuICBhdXRvZm9jdXM6IGZhbHNlLFxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTY2hlbWFGaWVsZC5wcm9wVHlwZXMgPSB7XG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaWRTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXG4gICAgZXJyb3JTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcmVnaXN0cnk6IHR5cGVzLnJlZ2lzdHJ5LmlzUmVxdWlyZWQsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjaGVtYUZpZWxkO1xuIl19