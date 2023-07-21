"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  var componentName = COMPONENT_TYPES[(0, _utils.getSchemaType)(schema)]; // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
  // render a field and let the MultiSchemaField component handle the form display

  if (!componentName && (schema.anyOf || schema.oneOf)) {
    return function () {
      return null;
    };
  }

  return componentName in fields ? fields[componentName] : function () {
    var UnsupportedField = fields.UnsupportedField;
    return _react["default"].createElement(UnsupportedField, {
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

  return _react["default"].createElement("label", {
    className: "control-label",
    htmlFor: id
  }, label, required && _react["default"].createElement("span", {
    className: "required"
  }, REQUIRED_FIELD_SYMBOL));
}

function LabelInput(props) {
  var id = props.id,
      label = props.label,
      onChange = props.onChange;
  return _react["default"].createElement("input", {
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
    return _react["default"].createElement("p", {
      id: id,
      className: "help-block"
    }, help);
  }

  return _react["default"].createElement("div", {
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

  return _react["default"].createElement("div", null, _react["default"].createElement("ul", {
    className: "error-detail bs-callout bs-callout-info"
  }, errors.filter(function (elem) {
    return !!elem;
  }).map(function (error, index) {
    return _react["default"].createElement("li", {
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
    return _react["default"].createElement("div", {
      className: "hidden"
    }, children);
  }

  return _react["default"].createElement(WrapIfAdditional, props, displayLabel && _react["default"].createElement(Label, {
    label: label,
    required: required,
    id: id
  }), displayLabel && description ? description : null, children, errors, help);
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: _propTypes["default"].string,
    classNames: _propTypes["default"].string,
    label: _propTypes["default"].string,
    children: _propTypes["default"].node.isRequired,
    errors: _propTypes["default"].element,
    rawErrors: _propTypes["default"].arrayOf(_propTypes["default"].string),
    help: _propTypes["default"].element,
    rawHelp: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
    description: _propTypes["default"].element,
    rawDescription: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].element]),
    hidden: _propTypes["default"].bool,
    required: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    displayLabel: _propTypes["default"].bool,
    fields: _propTypes["default"].object,
    formContext: _propTypes["default"].object
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

  var additional = schema.hasOwnProperty(_utils.ADDITIONAL_PROPERTY_FLAG);

  if (!additional) {
    return _react["default"].createElement("div", {
      className: classNames
    }, props.children);
  }

  return _react["default"].createElement("div", {
    className: classNames
  }, _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("div", {
    className: "col-xs-5 form-additional"
  }, _react["default"].createElement("div", {
    className: "form-group"
  }, _react["default"].createElement(Label, {
    label: keyLabel,
    required: required,
    id: "".concat(id, "-key")
  }), _react["default"].createElement(LabelInput, {
    label: label,
    required: required,
    id: "".concat(id, "-key"),
    onChange: onKeyChange
  }))), _react["default"].createElement("div", {
    className: "form-additional form-group col-xs-5"
  }, props.children), _react["default"].createElement("div", {
    className: "col-xs-2"
  }, _react["default"].createElement(_IconButton["default"], {
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
      registry = _props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _props$registry,
      _props$wasPropertyKey = props.wasPropertyKeyModified,
      wasPropertyKeyModified = _props$wasPropertyKey === void 0 ? false : _props$wasPropertyKey;
  var rootSchema = registry.rootSchema,
      fields = registry.fields,
      formContext = registry.formContext;
  var FieldTemplate = uiSchema["ui:FieldTemplate"] || registry.FieldTemplate || DefaultTemplate;
  var idSchema = props.idSchema;
  var schema = (0, _utils.retrieveSchema)(props.schema, rootSchema, formData);
  idSchema = (0, _utils.mergeObjects)((0, _utils.toIdSchema)(schema, null, rootSchema, formData, idPrefix), idSchema);
  var FieldComponent = getFieldComponent(schema, uiSchema, idSchema, fields);
  var DescriptionField = fields.DescriptionField;
  var disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  var readonly = Boolean(props.readonly || uiSchema["ui:readonly"] || props.schema.readOnly || schema.readOnly);
  var autofocus = Boolean(props.autofocus || uiSchema["ui:autofocus"]);

  if (Object.keys(schema).length === 0) {
    return null;
  }

  var displayLabel = (0, _utils.getDisplayLabel)(schema, uiSchema, rootSchema);

  var __errors = errorSchema.__errors,
      fieldErrorSchema = _objectWithoutProperties(errorSchema, ["__errors"]); // See #439: uiSchema: Don't pass consumed class names to child components


  var field = _react["default"].createElement(FieldComponent, _extends({}, props, {
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
    description: _react["default"].createElement(DescriptionField, {
      id: id + "__description",
      description: description,
      formContext: formContext
    }),
    rawDescription: description,
    help: _react["default"].createElement(Help, {
      id: id + "__help",
      help: help
    }),
    rawHelp: typeof help === "string" ? help : undefined,
    errors: _react["default"].createElement(ErrorList, {
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
  return _react["default"].createElement(FieldTemplate, fieldProps, _react["default"].createElement(_react["default"].Fragment, null, field, schema.anyOf && !(0, _utils.isSelect)(schema) && _react["default"].createElement(_AnyOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.anyOf.map(function (_schema) {
      return (0, _utils.retrieveSchema)(_schema, rootSchema, formData);
    }),
    baseType: schema.type,
    registry: registry,
    schema: schema,
    uiSchema: uiSchema
  }), schema.oneOf && !(0, _utils.isSelect)(schema) && _react["default"].createElement(_OneOfField, {
    disabled: disabled,
    errorSchema: errorSchema,
    formData: formData,
    idPrefix: idPrefix,
    idSchema: idSchema,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onFocus: props.onFocus,
    options: schema.oneOf.map(function (_schema) {
      return (0, _utils.retrieveSchema)(_schema, rootSchema, formData);
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
      return !(0, _utils.deepEquals)(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      return SchemaFieldRender(this.props);
    }
  }]);

  return SchemaField;
}(_react["default"].Component);

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
    schema: _propTypes["default"].object.isRequired,
    uiSchema: _propTypes["default"].object,
    idSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    errorSchema: _propTypes["default"].object,
    registry: types.registry.isRequired
  };
}

var _default = SchemaField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9TY2hlbWFGaWVsZC5qcyJdLCJuYW1lcyI6WyJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDT01QT05FTlRfVFlQRVMiLCJhcnJheSIsImludGVnZXIiLCJudW1iZXIiLCJvYmplY3QiLCJzdHJpbmciLCJnZXRGaWVsZENvbXBvbmVudCIsInNjaGVtYSIsInVpU2NoZW1hIiwiaWRTY2hlbWEiLCJmaWVsZHMiLCJmaWVsZCIsImNvbXBvbmVudE5hbWUiLCJhbnlPZiIsIm9uZU9mIiwiVW5zdXBwb3J0ZWRGaWVsZCIsInR5cGUiLCJMYWJlbCIsInByb3BzIiwibGFiZWwiLCJyZXF1aXJlZCIsImlkIiwiTGFiZWxJbnB1dCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIkhlbHAiLCJoZWxwIiwiRXJyb3JMaXN0IiwiZXJyb3JzIiwibGVuZ3RoIiwiZmlsdGVyIiwiZWxlbSIsIm1hcCIsImVycm9yIiwiaW5kZXgiLCJEZWZhdWx0VGVtcGxhdGUiLCJjaGlsZHJlbiIsImRlc2NyaXB0aW9uIiwiaGlkZGVuIiwiZGlzcGxheUxhYmVsIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiY2xhc3NOYW1lcyIsIm5vZGUiLCJpc1JlcXVpcmVkIiwiZWxlbWVudCIsInJhd0Vycm9ycyIsImFycmF5T2YiLCJyYXdIZWxwIiwib25lT2ZUeXBlIiwicmF3RGVzY3JpcHRpb24iLCJib29sIiwicmVhZG9ubHkiLCJmb3JtQ29udGV4dCIsImRlZmF1bHRQcm9wcyIsIldyYXBJZkFkZGl0aW9uYWwiLCJkaXNhYmxlZCIsIm9uS2V5Q2hhbmdlIiwib25Ecm9wUHJvcGVydHlDbGljayIsImtleUxhYmVsIiwiYWRkaXRpb25hbCIsImhhc093blByb3BlcnR5IiwiQURESVRJT05BTF9QUk9QRVJUWV9GTEFHIiwiYm9yZGVyIiwiU2NoZW1hRmllbGRSZW5kZXIiLCJmb3JtRGF0YSIsImVycm9yU2NoZW1hIiwiaWRQcmVmaXgiLCJuYW1lIiwicmVnaXN0cnkiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwicm9vdFNjaGVtYSIsIkZpZWxkVGVtcGxhdGUiLCJGaWVsZENvbXBvbmVudCIsIkRlc2NyaXB0aW9uRmllbGQiLCJCb29sZWFuIiwicmVhZE9ubHkiLCJhdXRvZm9jdXMiLCJPYmplY3QiLCJrZXlzIiwiX19lcnJvcnMiLCJmaWVsZEVycm9yU2NoZW1hIiwidW5kZWZpbmVkIiwiJGlkIiwidGl0bGUiLCJqb2luIiwidHJpbSIsImZpZWxkUHJvcHMiLCJfQW55T2ZGaWVsZCIsIkFueU9mRmllbGQiLCJfT25lT2ZGaWVsZCIsIk9uZU9mRmllbGQiLCJvbkJsdXIiLCJvbkZvY3VzIiwiX3NjaGVtYSIsIlNjaGVtYUZpZWxkIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiUmVhY3QiLCJDb21wb25lbnQiLCJhbnkiLCJ0eXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsSUFBTUEscUJBQXFCLEdBQUcsR0FBOUI7QUFDQSxJQUFNQyxlQUFlLEdBQUc7QUFDdEJDLEVBQUFBLEtBQUssRUFBRSxZQURlO0FBRXRCLGFBQVMsY0FGYTtBQUd0QkMsRUFBQUEsT0FBTyxFQUFFLGFBSGE7QUFJdEJDLEVBQUFBLE1BQU0sRUFBRSxhQUpjO0FBS3RCQyxFQUFBQSxNQUFNLEVBQUUsYUFMYztBQU10QkMsRUFBQUEsTUFBTSxFQUFFLGFBTmM7QUFPdEIsVUFBTTtBQVBnQixDQUF4Qjs7QUFVQSxTQUFTQyxpQkFBVCxDQUEyQkMsTUFBM0IsRUFBbUNDLFFBQW5DLEVBQTZDQyxRQUE3QyxFQUF1REMsTUFBdkQsRUFBK0Q7QUFDN0QsTUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUMsVUFBRCxDQUF0Qjs7QUFDQSxNQUFJLE9BQU9HLEtBQVAsS0FBaUIsVUFBckIsRUFB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QUFBQSxTQUFTLEVBQUU7QUFOYyxDQUEzQjs7QUFTQSxJQUFJeEMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekN3RCxFQUFBQSxXQUFXLENBQUN2RCxTQUFaLEdBQXdCO0FBQ3RCdEMsSUFBQUEsTUFBTSxFQUFFdUMsc0JBQVUxQyxNQUFWLENBQWlCNkMsVUFESDtBQUV0QnpDLElBQUFBLFFBQVEsRUFBRXNDLHNCQUFVMUMsTUFGRTtBQUd0QkssSUFBQUEsUUFBUSxFQUFFcUMsc0JBQVUxQyxNQUhFO0FBSXRCa0UsSUFBQUEsUUFBUSxFQUFFeEIsc0JBQVUyRCxHQUpFO0FBS3RCbEMsSUFBQUEsV0FBVyxFQUFFekIsc0JBQVUxQyxNQUxEO0FBTXRCc0UsSUFBQUEsUUFBUSxFQUFFZ0MsS0FBSyxDQUFDaEMsUUFBTixDQUFlekI7QUFOSCxHQUF4QjtBQVFEOztlQUVjbUQsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJY29uQnV0dG9uIGZyb20gXCIuLi9JY29uQnV0dG9uXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuaW1wb3J0IHtcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxuICBpc1NlbGVjdCxcbiAgcmV0cmlldmVTY2hlbWEsXG4gIHRvSWRTY2hlbWEsXG4gIGdldERlZmF1bHRSZWdpc3RyeSxcbiAgbWVyZ2VPYmplY3RzLFxuICBkZWVwRXF1YWxzLFxuICBnZXRTY2hlbWFUeXBlLFxuICBnZXREaXNwbGF5TGFiZWwsXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5jb25zdCBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgPSBcIipcIjtcbmNvbnN0IENPTVBPTkVOVF9UWVBFUyA9IHtcbiAgYXJyYXk6IFwiQXJyYXlGaWVsZFwiLFxuICBib29sZWFuOiBcIkJvb2xlYW5GaWVsZFwiLFxuICBpbnRlZ2VyOiBcIk51bWJlckZpZWxkXCIsXG4gIG51bWJlcjogXCJOdW1iZXJGaWVsZFwiLFxuICBvYmplY3Q6IFwiT2JqZWN0RmllbGRcIixcbiAgc3RyaW5nOiBcIlN0cmluZ0ZpZWxkXCIsXG4gIG51bGw6IFwiTnVsbEZpZWxkXCIsXG59O1xuXG5mdW5jdGlvbiBnZXRGaWVsZENvbXBvbmVudChzY2hlbWEsIHVpU2NoZW1hLCBpZFNjaGVtYSwgZmllbGRzKSB7XG4gIGNvbnN0IGZpZWxkID0gdWlTY2hlbWFbXCJ1aTpmaWVsZFwiXTtcbiAgaWYgKHR5cGVvZiBmaWVsZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZpZWxkO1xuICB9XG4gIGlmICh0eXBlb2YgZmllbGQgPT09IFwic3RyaW5nXCIgJiYgZmllbGQgaW4gZmllbGRzKSB7XG4gICAgcmV0dXJuIGZpZWxkc1tmaWVsZF07XG4gIH1cblxuICBjb25zdCBjb21wb25lbnROYW1lID0gQ09NUE9ORU5UX1RZUEVTW2dldFNjaGVtYVR5cGUoc2NoZW1hKV07XG5cbiAgLy8gSWYgdGhlIHR5cGUgaXMgbm90IGRlZmluZWQgYW5kIHRoZSBzY2hlbWEgdXNlcyAnYW55T2YnIG9yICdvbmVPZicsIGRvbid0XG4gIC8vIHJlbmRlciBhIGZpZWxkIGFuZCBsZXQgdGhlIE11bHRpU2NoZW1hRmllbGQgY29tcG9uZW50IGhhbmRsZSB0aGUgZm9ybSBkaXNwbGF5XG4gIGlmICghY29tcG9uZW50TmFtZSAmJiAoc2NoZW1hLmFueU9mIHx8IHNjaGVtYS5vbmVPZikpIHtcbiAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnROYW1lIGluIGZpZWxkc1xuICAgID8gZmllbGRzW2NvbXBvbmVudE5hbWVdXG4gICAgOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPFVuc3VwcG9ydGVkRmllbGRcbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxuICAgICAgICAgICAgcmVhc29uPXtgVW5rbm93biBmaWVsZCB0eXBlICR7c2NoZW1hLnR5cGV9YH1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfTtcbn1cblxuZnVuY3Rpb24gTGFiZWwocHJvcHMpIHtcbiAgY29uc3QgeyBsYWJlbCwgcmVxdWlyZWQsIGlkIH0gPSBwcm9wcztcbiAgaWYgKCFsYWJlbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbnRyb2wtbGFiZWxcIiBodG1sRm9yPXtpZH0+XG4gICAgICB7bGFiZWx9XG4gICAgICB7cmVxdWlyZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwicmVxdWlyZWRcIj57UkVRVUlSRURfRklFTERfU1lNQk9MfTwvc3Bhbj59XG4gICAgPC9sYWJlbD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gTGFiZWxJbnB1dChwcm9wcykge1xuICBjb25zdCB7IGlkLCBsYWJlbCwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxpbnB1dFxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgIGlkPXtpZH1cbiAgICAgIG9uQmx1cj17ZXZlbnQgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgIGRlZmF1bHRWYWx1ZT17bGFiZWx9XG4gICAgLz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gSGVscChwcm9wcykge1xuICBjb25zdCB7IGlkLCBoZWxwIH0gPSBwcm9wcztcbiAgaWYgKCFoZWxwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBoZWxwID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxwIGlkPXtpZH0gY2xhc3NOYW1lPVwiaGVscC1ibG9ja1wiPlxuICAgICAgICB7aGVscH1cbiAgICAgIDwvcD5cbiAgICApO1xuICB9XG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD17aWR9IGNsYXNzTmFtZT1cImhlbHAtYmxvY2tcIj5cbiAgICAgIHtoZWxwfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBFcnJvckxpc3QocHJvcHMpIHtcbiAgY29uc3QgeyBlcnJvcnMgPSBbXSB9ID0gcHJvcHM7XG4gIGlmIChlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8dWwgY2xhc3NOYW1lPVwiZXJyb3ItZGV0YWlsIGJzLWNhbGxvdXQgYnMtY2FsbG91dC1pbmZvXCI+XG4gICAgICAgIHtlcnJvcnNcbiAgICAgICAgICAuZmlsdGVyKGVsZW0gPT4gISFlbGVtKVxuICAgICAgICAgIC5tYXAoKGVycm9yLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCIga2V5PXtpbmRleH0+XG4gICAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICk7XG59XG5mdW5jdGlvbiBEZWZhdWx0VGVtcGxhdGUocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIGlkLFxuICAgIGxhYmVsLFxuICAgIGNoaWxkcmVuLFxuICAgIGVycm9ycyxcbiAgICBoZWxwLFxuICAgIGRlc2NyaXB0aW9uLFxuICAgIGhpZGRlbixcbiAgICByZXF1aXJlZCxcbiAgICBkaXNwbGF5TGFiZWwsXG4gIH0gPSBwcm9wcztcbiAgaWYgKGhpZGRlbikge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlblwiPntjaGlsZHJlbn08L2Rpdj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxXcmFwSWZBZGRpdGlvbmFsIHsuLi5wcm9wc30+XG4gICAgICB7ZGlzcGxheUxhYmVsICYmIDxMYWJlbCBsYWJlbD17bGFiZWx9IHJlcXVpcmVkPXtyZXF1aXJlZH0gaWQ9e2lkfSAvPn1cbiAgICAgIHtkaXNwbGF5TGFiZWwgJiYgZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbiA6IG51bGx9XG4gICAgICB7Y2hpbGRyZW59XG4gICAgICB7ZXJyb3JzfVxuICAgICAge2hlbHB9XG4gICAgPC9XcmFwSWZBZGRpdGlvbmFsPlxuICApO1xufVxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBEZWZhdWx0VGVtcGxhdGUucHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZXM6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXG4gICAgZXJyb3JzOiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgICByYXdFcnJvcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpLFxuICAgIGhlbHA6IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHJhd0hlbHA6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gICAgZGVzY3JpcHRpb246IFByb3BUeXBlcy5lbGVtZW50LFxuICAgIHJhd0Rlc2NyaXB0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICAgIGhpZGRlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNwbGF5TGFiZWw6IFByb3BUeXBlcy5ib29sLFxuICAgIGZpZWxkczogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmb3JtQ29udGV4dDogUHJvcFR5cGVzLm9iamVjdCxcbiAgfTtcbn1cblxuRGVmYXVsdFRlbXBsYXRlLmRlZmF1bHRQcm9wcyA9IHtcbiAgaGlkZGVuOiBmYWxzZSxcbiAgcmVhZG9ubHk6IGZhbHNlLFxuICByZXF1aXJlZDogZmFsc2UsXG4gIGRpc3BsYXlMYWJlbDogdHJ1ZSxcbn07XG5cbmZ1bmN0aW9uIFdyYXBJZkFkZGl0aW9uYWwocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIGlkLFxuICAgIGNsYXNzTmFtZXMsXG4gICAgZGlzYWJsZWQsXG4gICAgbGFiZWwsXG4gICAgb25LZXlDaGFuZ2UsXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcbiAgICByZWFkb25seSxcbiAgICByZXF1aXJlZCxcbiAgICBzY2hlbWEsXG4gIH0gPSBwcm9wcztcbiAgY29uc3Qga2V5TGFiZWwgPSBgJHtsYWJlbH0gS2V5YDsgLy8gaTE4biA/XG4gIGNvbnN0IGFkZGl0aW9uYWwgPSBzY2hlbWEuaGFzT3duUHJvcGVydHkoQURESVRJT05BTF9QUk9QRVJUWV9GTEFHKTtcblxuICBpZiAoIWFkZGl0aW9uYWwpIHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9Pntwcm9wcy5jaGlsZHJlbn08L2Rpdj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTUgZm9ybS1hZGRpdGlvbmFsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICA8TGFiZWwgbGFiZWw9e2tleUxhYmVsfSByZXF1aXJlZD17cmVxdWlyZWR9IGlkPXtgJHtpZH0ta2V5YH0gLz5cbiAgICAgICAgICAgIDxMYWJlbElucHV0XG4gICAgICAgICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgICAgICAgICBpZD17YCR7aWR9LWtleWB9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbktleUNoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWRkaXRpb25hbCBmb3JtLWdyb3VwIGNvbC14cy01XCI+XG4gICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMlwiPlxuICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiZGFuZ2VyXCJcbiAgICAgICAgICAgIGljb249XCJyZW1vdmVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1yZW1vdmUgYnRuLWJsb2NrXCJcbiAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIlxuICAgICAgICAgICAgc3R5bGU9e3sgYm9yZGVyOiBcIjBcIiB9fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IHJlYWRvbmx5fVxuICAgICAgICAgICAgb25DbGljaz17b25Ecm9wUHJvcGVydHlDbGljayhsYWJlbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gU2NoZW1hRmllbGRSZW5kZXIocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIHVpU2NoZW1hLFxuICAgIGZvcm1EYXRhLFxuICAgIGVycm9yU2NoZW1hLFxuICAgIGlkUHJlZml4LFxuICAgIG5hbWUsXG4gICAgb25DaGFuZ2UsXG4gICAgb25LZXlDaGFuZ2UsXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcbiAgICByZXF1aXJlZCxcbiAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxuICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQgPSBmYWxzZSxcbiAgfSA9IHByb3BzO1xuICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xuICBjb25zdCBGaWVsZFRlbXBsYXRlID1cbiAgICB1aVNjaGVtYVtcInVpOkZpZWxkVGVtcGxhdGVcIl0gfHwgcmVnaXN0cnkuRmllbGRUZW1wbGF0ZSB8fCBEZWZhdWx0VGVtcGxhdGU7XG4gIGxldCBpZFNjaGVtYSA9IHByb3BzLmlkU2NoZW1hO1xuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShwcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcbiAgaWRTY2hlbWEgPSBtZXJnZU9iamVjdHMoXG4gICAgdG9JZFNjaGVtYShzY2hlbWEsIG51bGwsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCksXG4gICAgaWRTY2hlbWFcbiAgKTtcbiAgY29uc3QgRmllbGRDb21wb25lbnQgPSBnZXRGaWVsZENvbXBvbmVudChzY2hlbWEsIHVpU2NoZW1hLCBpZFNjaGVtYSwgZmllbGRzKTtcbiAgY29uc3QgeyBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XG4gIGNvbnN0IGRpc2FibGVkID0gQm9vbGVhbihwcm9wcy5kaXNhYmxlZCB8fCB1aVNjaGVtYVtcInVpOmRpc2FibGVkXCJdKTtcbiAgY29uc3QgcmVhZG9ubHkgPSBCb29sZWFuKFxuICAgIHByb3BzLnJlYWRvbmx5IHx8XG4gICAgICB1aVNjaGVtYVtcInVpOnJlYWRvbmx5XCJdIHx8XG4gICAgICBwcm9wcy5zY2hlbWEucmVhZE9ubHkgfHxcbiAgICAgIHNjaGVtYS5yZWFkT25seVxuICApO1xuICBjb25zdCBhdXRvZm9jdXMgPSBCb29sZWFuKHByb3BzLmF1dG9mb2N1cyB8fCB1aVNjaGVtYVtcInVpOmF1dG9mb2N1c1wiXSk7XG4gIGlmIChPYmplY3Qua2V5cyhzY2hlbWEpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUxhYmVsID0gZ2V0RGlzcGxheUxhYmVsKHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEpO1xuXG4gIGNvbnN0IHsgX19lcnJvcnMsIC4uLmZpZWxkRXJyb3JTY2hlbWEgfSA9IGVycm9yU2NoZW1hO1xuXG4gIC8vIFNlZSAjNDM5OiB1aVNjaGVtYTogRG9uJ3QgcGFzcyBjb25zdW1lZCBjbGFzcyBuYW1lcyB0byBjaGlsZCBjb21wb25lbnRzXG4gIGNvbnN0IGZpZWxkID0gKFxuICAgIDxGaWVsZENvbXBvbmVudFxuICAgICAgey4uLnByb3BzfVxuICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxuICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICB1aVNjaGVtYT17eyAuLi51aVNjaGVtYSwgY2xhc3NOYW1lczogdW5kZWZpbmVkIH19XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cbiAgICAgIGVycm9yU2NoZW1hPXtmaWVsZEVycm9yU2NoZW1hfVxuICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgcmF3RXJyb3JzPXtfX2Vycm9yc31cbiAgICAvPlxuICApO1xuXG4gIGNvbnN0IGlkID0gaWRTY2hlbWEuJGlkO1xuXG4gIC8vIElmIHRoaXMgc2NoZW1hIGhhcyBhIHRpdGxlIGRlZmluZWQsIGJ1dCB0aGUgdXNlciBoYXMgc2V0IGEgbmV3IGtleS9sYWJlbCwgcmV0YWluIHRoZWlyIGlucHV0LlxuICBsZXQgbGFiZWw7XG4gIGlmICh3YXNQcm9wZXJ0eUtleU1vZGlmaWVkKSB7XG4gICAgbGFiZWwgPSBuYW1lO1xuICB9IGVsc2Uge1xuICAgIGxhYmVsID0gdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCBwcm9wcy5zY2hlbWEudGl0bGUgfHwgc2NoZW1hLnRpdGxlIHx8IG5hbWU7XG4gIH1cblxuICBjb25zdCBkZXNjcmlwdGlvbiA9XG4gICAgdWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fFxuICAgIHByb3BzLnNjaGVtYS5kZXNjcmlwdGlvbiB8fFxuICAgIHNjaGVtYS5kZXNjcmlwdGlvbjtcbiAgY29uc3QgZXJyb3JzID0gX19lcnJvcnM7XG4gIGNvbnN0IGhlbHAgPSB1aVNjaGVtYVtcInVpOmhlbHBcIl07XG4gIGNvbnN0IGhpZGRlbiA9IHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xuICBjb25zdCBjbGFzc05hbWVzID0gW1xuICAgIFwiZm9ybS1ncm91cFwiLFxuICAgIFwiZmllbGRcIixcbiAgICBgZmllbGQtJHtzY2hlbWEudHlwZX1gLFxuICAgIGVycm9ycyAmJiBlcnJvcnMubGVuZ3RoID4gMCA/IFwiZmllbGQtZXJyb3IgaGFzLWVycm9yIGhhcy1kYW5nZXJcIiA6IFwiXCIsXG4gICAgdWlTY2hlbWEuY2xhc3NOYW1lcyxcbiAgXVxuICAgIC5qb2luKFwiIFwiKVxuICAgIC50cmltKCk7XG5cbiAgY29uc3QgZmllbGRQcm9wcyA9IHtcbiAgICBkZXNjcmlwdGlvbjogKFxuICAgICAgPERlc2NyaXB0aW9uRmllbGRcbiAgICAgICAgaWQ9e2lkICsgXCJfX2Rlc2NyaXB0aW9uXCJ9XG4gICAgICAgIGRlc2NyaXB0aW9uPXtkZXNjcmlwdGlvbn1cbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgLz5cbiAgICApLFxuICAgIHJhd0Rlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICBoZWxwOiA8SGVscCBpZD17aWQgKyBcIl9faGVscFwifSBoZWxwPXtoZWxwfSAvPixcbiAgICByYXdIZWxwOiB0eXBlb2YgaGVscCA9PT0gXCJzdHJpbmdcIiA/IGhlbHAgOiB1bmRlZmluZWQsXG4gICAgZXJyb3JzOiA8RXJyb3JMaXN0IGVycm9ycz17ZXJyb3JzfSAvPixcbiAgICByYXdFcnJvcnM6IGVycm9ycyxcbiAgICBpZCxcbiAgICBsYWJlbCxcbiAgICBoaWRkZW4sXG4gICAgb25DaGFuZ2UsXG4gICAgb25LZXlDaGFuZ2UsXG4gICAgb25Ecm9wUHJvcGVydHlDbGljayxcbiAgICByZXF1aXJlZCxcbiAgICBkaXNhYmxlZCxcbiAgICByZWFkb25seSxcbiAgICBkaXNwbGF5TGFiZWwsXG4gICAgY2xhc3NOYW1lcyxcbiAgICBmb3JtQ29udGV4dCxcbiAgICBmb3JtRGF0YSxcbiAgICBmaWVsZHMsXG4gICAgc2NoZW1hLFxuICAgIHVpU2NoZW1hLFxuICAgIHJlZ2lzdHJ5LFxuICB9O1xuXG4gIGNvbnN0IF9BbnlPZkZpZWxkID0gcmVnaXN0cnkuZmllbGRzLkFueU9mRmllbGQ7XG4gIGNvbnN0IF9PbmVPZkZpZWxkID0gcmVnaXN0cnkuZmllbGRzLk9uZU9mRmllbGQ7XG5cbiAgcmV0dXJuIChcbiAgICA8RmllbGRUZW1wbGF0ZSB7Li4uZmllbGRQcm9wc30+XG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIHtmaWVsZH1cblxuICAgICAgICB7LypcbiAgICAgICAgSWYgdGhlIHNjaGVtYSBgYW55T2ZgIG9yICdvbmVPZicgY2FuIGJlIHJlbmRlcmVkIGFzIGEgc2VsZWN0IGNvbnRyb2wsIGRvbid0XG4gICAgICAgIHJlbmRlciB0aGUgc2VsZWN0aW9uIGFuZCBsZXQgYFN0cmluZ0ZpZWxkYCBjb21wb25lbnQgaGFuZGxlXG4gICAgICAgIHJlbmRlcmluZ1xuICAgICAgKi99XG4gICAgICAgIHtzY2hlbWEuYW55T2YgJiYgIWlzU2VsZWN0KHNjaGVtYSkgJiYgKFxuICAgICAgICAgIDxfQW55T2ZGaWVsZFxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgZXJyb3JTY2hlbWE9e2Vycm9yU2NoZW1hfVxuICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxuICAgICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxuICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hfVxuICAgICAgICAgICAgb25CbHVyPXtwcm9wcy5vbkJsdXJ9XG4gICAgICAgICAgICBvbkNoYW5nZT17cHJvcHMub25DaGFuZ2V9XG4gICAgICAgICAgICBvbkZvY3VzPXtwcm9wcy5vbkZvY3VzfVxuICAgICAgICAgICAgb3B0aW9ucz17c2NoZW1hLmFueU9mLm1hcChfc2NoZW1hID0+XG4gICAgICAgICAgICAgIHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGJhc2VUeXBlPXtzY2hlbWEudHlwZX1cbiAgICAgICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cbiAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3NjaGVtYS5vbmVPZiAmJiAhaXNTZWxlY3Qoc2NoZW1hKSAmJiAoXG4gICAgICAgICAgPF9PbmVPZkZpZWxkXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XG4gICAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XG4gICAgICAgICAgICBvbkJsdXI9e3Byb3BzLm9uQmx1cn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtwcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgIG9uRm9jdXM9e3Byb3BzLm9uRm9jdXN9XG4gICAgICAgICAgICBvcHRpb25zPXtzY2hlbWEub25lT2YubWFwKF9zY2hlbWEgPT5cbiAgICAgICAgICAgICAgcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgYmFzZVR5cGU9e3NjaGVtYS50eXBlfVxuICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxuICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgPC9GaWVsZFRlbXBsYXRlPlxuICApO1xufVxuXG5jbGFzcyBTY2hlbWFGaWVsZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAhZGVlcEVxdWFscyh0aGlzLnByb3BzLCBuZXh0UHJvcHMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiBTY2hlbWFGaWVsZFJlbmRlcih0aGlzLnByb3BzKTtcbiAgfVxufVxuXG5TY2hlbWFGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XG4gIHVpU2NoZW1hOiB7fSxcbiAgZXJyb3JTY2hlbWE6IHt9LFxuICBpZFNjaGVtYToge30sXG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgcmVhZG9ubHk6IGZhbHNlLFxuICBhdXRvZm9jdXM6IGZhbHNlLFxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBTY2hlbWFGaWVsZC5wcm9wVHlwZXMgPSB7XG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaWRTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXG4gICAgZXJyb3JTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcmVnaXN0cnk6IHR5cGVzLnJlZ2lzdHJ5LmlzUmVxdWlyZWQsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjaGVtYUZpZWxkO1xuIl19