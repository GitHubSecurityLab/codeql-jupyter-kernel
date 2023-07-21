"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AddButton = _interopRequireDefault(require("../AddButton"));

var _react = _interopRequireWildcard(require("react"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function DefaultObjectFieldTemplate(props) {
  var TitleField = props.TitleField,
      DescriptionField = props.DescriptionField;
  return _react["default"].createElement("fieldset", {
    id: props.idSchema.$id
  }, (props.uiSchema["ui:title"] || props.title) && _react["default"].createElement(TitleField, {
    id: "".concat(props.idSchema.$id, "__title"),
    title: props.title || props.uiSchema["ui:title"],
    required: props.required,
    formContext: props.formContext
  }), props.description && _react["default"].createElement(DescriptionField, {
    id: "".concat(props.idSchema.$id, "__description"),
    description: props.description,
    formContext: props.formContext
  }), props.properties.map(function (prop) {
    return prop.content;
  }), (0, _utils.canExpand)(props.schema, props.uiSchema, props.formData) && _react["default"].createElement(_AddButton["default"], {
    className: "object-property-expand",
    onClick: props.onAddClick(props.schema),
    disabled: props.disabled || props.readonly
  }));
}

var ObjectField =
/*#__PURE__*/
function (_Component) {
  _inherits(ObjectField, _Component);

  function ObjectField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      wasPropertyKeyModified: false,
      additionalProperties: {}
    });

    _defineProperty(_assertThisInitialized(_this), "onPropertyChange", function (name) {
      var addedByAdditionalProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return function (value, errorSchema) {
        if (value === undefined && addedByAdditionalProperties) {
          // Don't set value = undefined for fields added by
          // additionalProperties. Doing so removes them from the
          // formData, which causes them to completely disappear
          // (including the input field for the property name). Unlike
          // fields which are "mandated" by the schema, these fields can
          // be set to undefined by clicking a "delete field" button, so
          // set empty values to the empty string.
          value = "";
        }

        var newFormData = _objectSpread({}, _this.props.formData, _defineProperty({}, name, value));

        _this.props.onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, name, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onDropPropertyClick", function (key) {
      return function (event) {
        event.preventDefault();
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            formData = _this$props.formData;

        var copiedFormData = _objectSpread({}, formData);

        delete copiedFormData[key];
        onChange(copiedFormData);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getAvailableKey", function (preferredKey, formData) {
      var index = 0;
      var newKey = preferredKey;

      while (formData.hasOwnProperty(newKey)) {
        newKey = "".concat(preferredKey, "-").concat(++index);
      }

      return newKey;
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyChange", function (oldValue) {
      return function (value, errorSchema) {
        if (oldValue === value) {
          return;
        }

        value = _this.getAvailableKey(value, _this.props.formData);

        var newFormData = _objectSpread({}, _this.props.formData);

        var newKeys = _defineProperty({}, oldValue, value);

        var keyValues = Object.keys(newFormData).map(function (key) {
          var newKey = newKeys[key] || key;
          return _defineProperty({}, newKey, newFormData[key]);
        });
        var renamedObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(keyValues)));

        _this.setState({
          wasPropertyKeyModified: true
        });

        _this.props.onChange(renamedObj, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, value, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleAddClick", function (schema) {
      return function () {
        var type = schema.additionalProperties.type;

        var newFormData = _objectSpread({}, _this.props.formData);

        if (schema.additionalProperties.hasOwnProperty("$ref")) {
          var _this$props$registry = _this.props.registry,
              registry = _this$props$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props$registry;
          var refSchema = (0, _utils.retrieveSchema)({
            $ref: schema.additionalProperties["$ref"]
          }, registry.rootSchema, _this.props.formData);
          type = refSchema.type;
        }

        newFormData[_this.getAvailableKey("newKey", newFormData)] = _this.getDefaultValue(type);

        _this.props.onChange(newFormData);
      };
    });

    return _this;
  }

  _createClass(ObjectField, [{
    key: "isRequired",
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue(type) {
      switch (type) {
        case "string":
          return "New Value";

        case "array":
          return [];

        case "boolean":
          return false;

        case "null":
          return null;

        case "number":
          return 0;

        case "object":
          return {};

        default:
          // We don't have a datatype for some reason (perhaps additionalProperties was true)
          return "New Value";
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          uiSchema = _this$props2.uiSchema,
          formData = _this$props2.formData,
          errorSchema = _this$props2.errorSchema,
          idSchema = _this$props2.idSchema,
          name = _this$props2.name,
          required = _this$props2.required,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          idPrefix = _this$props2.idPrefix,
          onBlur = _this$props2.onBlur,
          onFocus = _this$props2.onFocus,
          _this$props2$registry = _this$props2.registry,
          registry = _this$props2$registry === void 0 ? (0, _utils.getDefaultRegistry)() : _this$props2$registry;
      var rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var schema = (0, _utils.retrieveSchema)(this.props.schema, rootSchema, formData);
      var title = schema.title === undefined ? name : schema.title;
      var description = uiSchema["ui:description"] || schema.description;
      var orderedProperties;

      try {
        var properties = Object.keys(schema.properties || {});
        orderedProperties = (0, _utils.orderProperties)(properties, uiSchema["ui:order"]);
      } catch (err) {
        return _react["default"].createElement("div", null, _react["default"].createElement("p", {
          className: "config-error",
          style: {
            color: "red"
          }
        }, "Invalid ", name || "root", " object field configuration:", _react["default"].createElement("em", null, err.message), "."), _react["default"].createElement("pre", null, JSON.stringify(schema)));
      }

      var Template = uiSchema["ui:ObjectFieldTemplate"] || registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;
      var templateProps = {
        title: uiSchema["ui:title"] || title,
        description: description,
        TitleField: TitleField,
        DescriptionField: DescriptionField,
        properties: orderedProperties.map(function (name) {
          var addedByAdditionalProperties = schema.properties[name].hasOwnProperty(_utils.ADDITIONAL_PROPERTY_FLAG);
          var fieldUiSchema = addedByAdditionalProperties ? uiSchema.additionalProperties : uiSchema[name];
          var hidden = fieldUiSchema && fieldUiSchema["ui:widget"] === "hidden";
          return {
            content: _react["default"].createElement(SchemaField, {
              key: name,
              name: name,
              required: _this2.isRequired(name),
              schema: schema.properties[name],
              uiSchema: fieldUiSchema,
              errorSchema: errorSchema[name],
              idSchema: idSchema[name],
              idPrefix: idPrefix,
              formData: (formData || {})[name],
              wasPropertyKeyModified: _this2.state.wasPropertyKeyModified,
              onKeyChange: _this2.onKeyChange(name),
              onChange: _this2.onPropertyChange(name, addedByAdditionalProperties),
              onBlur: onBlur,
              onFocus: onFocus,
              registry: registry,
              disabled: disabled,
              readonly: readonly,
              onDropPropertyClick: _this2.onDropPropertyClick
            }),
            name: name,
            readonly: readonly,
            disabled: disabled,
            required: required,
            hidden: hidden
          };
        }),
        readonly: readonly,
        disabled: disabled,
        required: required,
        idSchema: idSchema,
        uiSchema: uiSchema,
        schema: schema,
        formData: formData,
        formContext: formContext,
        registry: registry
      };
      return _react["default"].createElement(Template, _extends({}, templateProps, {
        onAddClick: this.handleAddClick
      }));
    }
  }]);

  return ObjectField;
}(_react.Component);

_defineProperty(ObjectField, "defaultProps", {
  uiSchema: {},
  formData: {},
  errorSchema: {},
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false
});

if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = types.fieldProps;
}

var _default = ObjectField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9PYmplY3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZSIsInByb3BzIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJpZFNjaGVtYSIsIiRpZCIsInVpU2NoZW1hIiwidGl0bGUiLCJyZXF1aXJlZCIsImZvcm1Db250ZXh0IiwiZGVzY3JpcHRpb24iLCJwcm9wZXJ0aWVzIiwibWFwIiwicHJvcCIsImNvbnRlbnQiLCJzY2hlbWEiLCJmb3JtRGF0YSIsIm9uQWRkQ2xpY2siLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiT2JqZWN0RmllbGQiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJuYW1lIiwiYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwidmFsdWUiLCJlcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIm5ld0Zvcm1EYXRhIiwib25DaGFuZ2UiLCJrZXkiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29waWVkRm9ybURhdGEiLCJwcmVmZXJyZWRLZXkiLCJpbmRleCIsIm5ld0tleSIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJnZXRBdmFpbGFibGVLZXkiLCJuZXdLZXlzIiwia2V5VmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlbmFtZWRPYmoiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsInR5cGUiLCJyZWdpc3RyeSIsInJlZlNjaGVtYSIsIiRyZWYiLCJyb290U2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXhPZiIsImlkUHJlZml4Iiwib25CbHVyIiwib25Gb2N1cyIsImZpZWxkcyIsIlNjaGVtYUZpZWxkIiwib3JkZXJlZFByb3BlcnRpZXMiLCJlcnIiLCJjb2xvciIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiVGVtcGxhdGUiLCJPYmplY3RGaWVsZFRlbXBsYXRlIiwidGVtcGxhdGVQcm9wcyIsIkFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyIsImZpZWxkVWlTY2hlbWEiLCJoaWRkZW4iLCJpc1JlcXVpcmVkIiwic3RhdGUiLCJvbktleUNoYW5nZSIsIm9uUHJvcGVydHlDaGFuZ2UiLCJvbkRyb3BQcm9wZXJ0eUNsaWNrIiwiaGFuZGxlQWRkQ2xpY2siLCJDb21wb25lbnQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJ0eXBlcyIsImZpZWxkUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxTQUFTQSwwQkFBVCxDQUFvQ0MsS0FBcEMsRUFBMkM7QUFBQSxNQUNqQ0MsVUFEaUMsR0FDQUQsS0FEQSxDQUNqQ0MsVUFEaUM7QUFBQSxNQUNyQkMsZ0JBRHFCLEdBQ0FGLEtBREEsQ0FDckJFLGdCQURxQjtBQUV6QyxTQUNFO0FBQVUsSUFBQSxFQUFFLEVBQUVGLEtBQUssQ0FBQ0csUUFBTixDQUFlQztBQUE3QixLQUNHLENBQUNKLEtBQUssQ0FBQ0ssUUFBTixDQUFlLFVBQWYsS0FBOEJMLEtBQUssQ0FBQ00sS0FBckMsS0FDQyxnQ0FBQyxVQUFEO0FBQ0UsSUFBQSxFQUFFLFlBQUtOLEtBQUssQ0FBQ0csUUFBTixDQUFlQyxHQUFwQixZQURKO0FBRUUsSUFBQSxLQUFLLEVBQUVKLEtBQUssQ0FBQ00sS0FBTixJQUFlTixLQUFLLENBQUNLLFFBQU4sQ0FBZSxVQUFmLENBRnhCO0FBR0UsSUFBQSxRQUFRLEVBQUVMLEtBQUssQ0FBQ08sUUFIbEI7QUFJRSxJQUFBLFdBQVcsRUFBRVAsS0FBSyxDQUFDUTtBQUpyQixJQUZKLEVBU0dSLEtBQUssQ0FBQ1MsV0FBTixJQUNDLGdDQUFDLGdCQUFEO0FBQ0UsSUFBQSxFQUFFLFlBQUtULEtBQUssQ0FBQ0csUUFBTixDQUFlQyxHQUFwQixrQkFESjtBQUVFLElBQUEsV0FBVyxFQUFFSixLQUFLLENBQUNTLFdBRnJCO0FBR0UsSUFBQSxXQUFXLEVBQUVULEtBQUssQ0FBQ1E7QUFIckIsSUFWSixFQWdCR1IsS0FBSyxDQUFDVSxVQUFOLENBQWlCQyxHQUFqQixDQUFxQixVQUFBQyxJQUFJO0FBQUEsV0FBSUEsSUFBSSxDQUFDQyxPQUFUO0FBQUEsR0FBekIsQ0FoQkgsRUFpQkcsc0JBQVViLEtBQUssQ0FBQ2MsTUFBaEIsRUFBd0JkLEtBQUssQ0FBQ0ssUUFBOUIsRUFBd0NMLEtBQUssQ0FBQ2UsUUFBOUMsS0FDQyxnQ0FBQyxxQkFBRDtBQUNFLElBQUEsU0FBUyxFQUFDLHdCQURaO0FBRUUsSUFBQSxPQUFPLEVBQUVmLEtBQUssQ0FBQ2dCLFVBQU4sQ0FBaUJoQixLQUFLLENBQUNjLE1BQXZCLENBRlg7QUFHRSxJQUFBLFFBQVEsRUFBRWQsS0FBSyxDQUFDaUIsUUFBTixJQUFrQmpCLEtBQUssQ0FBQ2tCO0FBSHBDLElBbEJKLENBREY7QUEyQkQ7O0lBRUtDLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0REFXSTtBQUNOQyxNQUFBQSxzQkFBc0IsRUFBRSxLQURsQjtBQUVOQyxNQUFBQSxvQkFBb0IsRUFBRTtBQUZoQixLOzt1RUFZVyxVQUFDQyxJQUFELEVBQStDO0FBQUEsVUFBeENDLDJCQUF3Qyx1RUFBVixLQUFVO0FBQ2hFLGFBQU8sVUFBQ0MsS0FBRCxFQUFRQyxXQUFSLEVBQXdCO0FBQzdCLFlBQUlELEtBQUssS0FBS0UsU0FBVixJQUF1QkgsMkJBQTNCLEVBQXdEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLFVBQUFBLEtBQUssR0FBRyxFQUFSO0FBQ0Q7O0FBQ0QsWUFBTUcsV0FBVyxxQkFBUSxNQUFLM0IsS0FBTCxDQUFXZSxRQUFuQixzQkFBOEJPLElBQTlCLEVBQXFDRSxLQUFyQyxFQUFqQjs7QUFDQSxjQUFLeEIsS0FBTCxDQUFXNEIsUUFBWCxDQUNFRCxXQURGLEVBRUVGLFdBQVcsSUFDVCxNQUFLekIsS0FBTCxDQUFXeUIsV0FEYixzQkFFTyxNQUFLekIsS0FBTCxDQUFXeUIsV0FGbEIsc0JBR0tILElBSEwsRUFHWUcsV0FIWixFQUZGO0FBUUQsT0FwQkQ7QUFxQkQsSzs7MEVBRXFCLFVBQUFJLEdBQUcsRUFBSTtBQUMzQixhQUFPLFVBQUFDLEtBQUssRUFBSTtBQUNkQSxRQUFBQSxLQUFLLENBQUNDLGNBQU47QUFEYywwQkFFaUIsTUFBSy9CLEtBRnRCO0FBQUEsWUFFTjRCLFFBRk0sZUFFTkEsUUFGTTtBQUFBLFlBRUliLFFBRkosZUFFSUEsUUFGSjs7QUFHZCxZQUFNaUIsY0FBYyxxQkFBUWpCLFFBQVIsQ0FBcEI7O0FBQ0EsZUFBT2lCLGNBQWMsQ0FBQ0gsR0FBRCxDQUFyQjtBQUNBRCxRQUFBQSxRQUFRLENBQUNJLGNBQUQsQ0FBUjtBQUNELE9BTkQ7QUFPRCxLOztzRUFFaUIsVUFBQ0MsWUFBRCxFQUFlbEIsUUFBZixFQUE0QjtBQUM1QyxVQUFJbUIsS0FBSyxHQUFHLENBQVo7QUFDQSxVQUFJQyxNQUFNLEdBQUdGLFlBQWI7O0FBQ0EsYUFBT2xCLFFBQVEsQ0FBQ3FCLGNBQVQsQ0FBd0JELE1BQXhCLENBQVAsRUFBd0M7QUFDdENBLFFBQUFBLE1BQU0sYUFBTUYsWUFBTixjQUFzQixFQUFFQyxLQUF4QixDQUFOO0FBQ0Q7O0FBQ0QsYUFBT0MsTUFBUDtBQUNELEs7O2tFQUVhLFVBQUFFLFFBQVEsRUFBSTtBQUN4QixhQUFPLFVBQUNiLEtBQUQsRUFBUUMsV0FBUixFQUF3QjtBQUM3QixZQUFJWSxRQUFRLEtBQUtiLEtBQWpCLEVBQXdCO0FBQ3RCO0FBQ0Q7O0FBRURBLFFBQUFBLEtBQUssR0FBRyxNQUFLYyxlQUFMLENBQXFCZCxLQUFyQixFQUE0QixNQUFLeEIsS0FBTCxDQUFXZSxRQUF2QyxDQUFSOztBQUNBLFlBQU1ZLFdBQVcscUJBQVEsTUFBSzNCLEtBQUwsQ0FBV2UsUUFBbkIsQ0FBakI7O0FBQ0EsWUFBTXdCLE9BQU8sdUJBQU1GLFFBQU4sRUFBaUJiLEtBQWpCLENBQWI7O0FBQ0EsWUFBTWdCLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlmLFdBQVosRUFBeUJoQixHQUF6QixDQUE2QixVQUFBa0IsR0FBRyxFQUFJO0FBQ3BELGNBQU1NLE1BQU0sR0FBR0ksT0FBTyxDQUFDVixHQUFELENBQVAsSUFBZ0JBLEdBQS9CO0FBQ0EscUNBQVVNLE1BQVYsRUFBbUJSLFdBQVcsQ0FBQ0UsR0FBRCxDQUE5QjtBQUNELFNBSGlCLENBQWxCO0FBSUEsWUFBTWMsVUFBVSxHQUFHRixNQUFNLENBQUNHLE1BQVAsT0FBQUgsTUFBTSxHQUFRLEVBQVIsNEJBQWVELFNBQWYsR0FBekI7O0FBRUEsY0FBS0ssUUFBTCxDQUFjO0FBQUV6QixVQUFBQSxzQkFBc0IsRUFBRTtBQUExQixTQUFkOztBQUVBLGNBQUtwQixLQUFMLENBQVc0QixRQUFYLENBQ0VlLFVBREYsRUFFRWxCLFdBQVcsSUFDVCxNQUFLekIsS0FBTCxDQUFXeUIsV0FEYixzQkFFTyxNQUFLekIsS0FBTCxDQUFXeUIsV0FGbEIsc0JBR0tELEtBSEwsRUFHYUMsV0FIYixFQUZGO0FBUUQsT0F4QkQ7QUF5QkQsSzs7cUVBc0JnQixVQUFBWCxNQUFNO0FBQUEsYUFBSSxZQUFNO0FBQy9CLFlBQUlnQyxJQUFJLEdBQUdoQyxNQUFNLENBQUNPLG9CQUFQLENBQTRCeUIsSUFBdkM7O0FBQ0EsWUFBTW5CLFdBQVcscUJBQVEsTUFBSzNCLEtBQUwsQ0FBV2UsUUFBbkIsQ0FBakI7O0FBRUEsWUFBSUQsTUFBTSxDQUFDTyxvQkFBUCxDQUE0QmUsY0FBNUIsQ0FBMkMsTUFBM0MsQ0FBSixFQUF3RDtBQUFBLHFDQUNWLE1BQUtwQyxLQURLLENBQzlDK0MsUUFEOEM7QUFBQSxjQUM5Q0EsUUFEOEMscUNBQ25DLGdDQURtQztBQUV0RCxjQUFNQyxTQUFTLEdBQUcsMkJBQ2hCO0FBQUVDLFlBQUFBLElBQUksRUFBRW5DLE1BQU0sQ0FBQ08sb0JBQVAsQ0FBNEIsTUFBNUI7QUFBUixXQURnQixFQUVoQjBCLFFBQVEsQ0FBQ0csVUFGTyxFQUdoQixNQUFLbEQsS0FBTCxDQUFXZSxRQUhLLENBQWxCO0FBTUErQixVQUFBQSxJQUFJLEdBQUdFLFNBQVMsQ0FBQ0YsSUFBakI7QUFDRDs7QUFFRG5CLFFBQUFBLFdBQVcsQ0FDVCxNQUFLVyxlQUFMLENBQXFCLFFBQXJCLEVBQStCWCxXQUEvQixDQURTLENBQVgsR0FFSSxNQUFLd0IsZUFBTCxDQUFxQkwsSUFBckIsQ0FGSjs7QUFJQSxjQUFLOUMsS0FBTCxDQUFXNEIsUUFBWCxDQUFvQkQsV0FBcEI7QUFDRCxPQXBCc0I7QUFBQSxLOzs7Ozs7OytCQWxHWkwsSSxFQUFNO0FBQ2YsVUFBTVIsTUFBTSxHQUFHLEtBQUtkLEtBQUwsQ0FBV2MsTUFBMUI7QUFDQSxhQUNFc0MsS0FBSyxDQUFDQyxPQUFOLENBQWN2QyxNQUFNLENBQUNQLFFBQXJCLEtBQWtDTyxNQUFNLENBQUNQLFFBQVAsQ0FBZ0IrQyxPQUFoQixDQUF3QmhDLElBQXhCLE1BQWtDLENBQUMsQ0FEdkU7QUFHRDs7O29DQXlFZXdCLEksRUFBTTtBQUNwQixjQUFRQSxJQUFSO0FBQ0UsYUFBSyxRQUFMO0FBQ0UsaUJBQU8sV0FBUDs7QUFDRixhQUFLLE9BQUw7QUFDRSxpQkFBTyxFQUFQOztBQUNGLGFBQUssU0FBTDtBQUNFLGlCQUFPLEtBQVA7O0FBQ0YsYUFBSyxNQUFMO0FBQ0UsaUJBQU8sSUFBUDs7QUFDRixhQUFLLFFBQUw7QUFDRSxpQkFBTyxDQUFQOztBQUNGLGFBQUssUUFBTDtBQUNFLGlCQUFPLEVBQVA7O0FBQ0Y7QUFDRTtBQUNBLGlCQUFPLFdBQVA7QUFmSjtBQWlCRDs7OzZCQXdCUTtBQUFBOztBQUFBLHlCQWNILEtBQUs5QyxLQWRGO0FBQUEsVUFFTEssUUFGSyxnQkFFTEEsUUFGSztBQUFBLFVBR0xVLFFBSEssZ0JBR0xBLFFBSEs7QUFBQSxVQUlMVSxXQUpLLGdCQUlMQSxXQUpLO0FBQUEsVUFLTHRCLFFBTEssZ0JBS0xBLFFBTEs7QUFBQSxVQU1MbUIsSUFOSyxnQkFNTEEsSUFOSztBQUFBLFVBT0xmLFFBUEssZ0JBT0xBLFFBUEs7QUFBQSxVQVFMVSxRQVJLLGdCQVFMQSxRQVJLO0FBQUEsVUFTTEMsUUFUSyxnQkFTTEEsUUFUSztBQUFBLFVBVUxxQyxRQVZLLGdCQVVMQSxRQVZLO0FBQUEsVUFXTEMsTUFYSyxnQkFXTEEsTUFYSztBQUFBLFVBWUxDLE9BWkssZ0JBWUxBLE9BWks7QUFBQSwrQ0FhTFYsUUFiSztBQUFBLFVBYUxBLFFBYkssc0NBYU0sZ0NBYk47QUFBQSxVQWdCQ0csVUFoQkQsR0FnQnFDSCxRQWhCckMsQ0FnQkNHLFVBaEJEO0FBQUEsVUFnQmFRLE1BaEJiLEdBZ0JxQ1gsUUFoQnJDLENBZ0JhVyxNQWhCYjtBQUFBLFVBZ0JxQmxELFdBaEJyQixHQWdCcUN1QyxRQWhCckMsQ0FnQnFCdkMsV0FoQnJCO0FBQUEsVUFpQkNtRCxXQWpCRCxHQWlCK0NELE1BakIvQyxDQWlCQ0MsV0FqQkQ7QUFBQSxVQWlCYzFELFVBakJkLEdBaUIrQ3lELE1BakIvQyxDQWlCY3pELFVBakJkO0FBQUEsVUFpQjBCQyxnQkFqQjFCLEdBaUIrQ3dELE1BakIvQyxDQWlCMEJ4RCxnQkFqQjFCO0FBa0JQLFVBQU1ZLE1BQU0sR0FBRywyQkFBZSxLQUFLZCxLQUFMLENBQVdjLE1BQTFCLEVBQWtDb0MsVUFBbEMsRUFBOENuQyxRQUE5QyxDQUFmO0FBRUEsVUFBTVQsS0FBSyxHQUFHUSxNQUFNLENBQUNSLEtBQVAsS0FBaUJvQixTQUFqQixHQUE2QkosSUFBN0IsR0FBb0NSLE1BQU0sQ0FBQ1IsS0FBekQ7QUFDQSxVQUFNRyxXQUFXLEdBQUdKLFFBQVEsQ0FBQyxnQkFBRCxDQUFSLElBQThCUyxNQUFNLENBQUNMLFdBQXpEO0FBQ0EsVUFBSW1ELGlCQUFKOztBQUNBLFVBQUk7QUFDRixZQUFNbEQsVUFBVSxHQUFHK0IsTUFBTSxDQUFDQyxJQUFQLENBQVk1QixNQUFNLENBQUNKLFVBQVAsSUFBcUIsRUFBakMsQ0FBbkI7QUFDQWtELFFBQUFBLGlCQUFpQixHQUFHLDRCQUFnQmxELFVBQWhCLEVBQTRCTCxRQUFRLENBQUMsVUFBRCxDQUFwQyxDQUFwQjtBQUNELE9BSEQsQ0FHRSxPQUFPd0QsR0FBUCxFQUFZO0FBQ1osZUFDRSw2Q0FDRTtBQUFHLFVBQUEsU0FBUyxFQUFDLGNBQWI7QUFBNEIsVUFBQSxLQUFLLEVBQUU7QUFBRUMsWUFBQUEsS0FBSyxFQUFFO0FBQVQ7QUFBbkMsdUJBQ1d4QyxJQUFJLElBQUksTUFEbkIsa0NBRUUsNENBQUt1QyxHQUFHLENBQUNFLE9BQVQsQ0FGRixNQURGLEVBS0UsNkNBQU1DLElBQUksQ0FBQ0MsU0FBTCxDQUFlbkQsTUFBZixDQUFOLENBTEYsQ0FERjtBQVNEOztBQUVELFVBQU1vRCxRQUFRLEdBQ1o3RCxRQUFRLENBQUMsd0JBQUQsQ0FBUixJQUNBMEMsUUFBUSxDQUFDb0IsbUJBRFQsSUFFQXBFLDBCQUhGO0FBS0EsVUFBTXFFLGFBQWEsR0FBRztBQUNwQjlELFFBQUFBLEtBQUssRUFBRUQsUUFBUSxDQUFDLFVBQUQsQ0FBUixJQUF3QkMsS0FEWDtBQUVwQkcsUUFBQUEsV0FBVyxFQUFYQSxXQUZvQjtBQUdwQlIsUUFBQUEsVUFBVSxFQUFWQSxVQUhvQjtBQUlwQkMsUUFBQUEsZ0JBQWdCLEVBQWhCQSxnQkFKb0I7QUFLcEJRLFFBQUFBLFVBQVUsRUFBRWtELGlCQUFpQixDQUFDakQsR0FBbEIsQ0FBc0IsVUFBQVcsSUFBSSxFQUFJO0FBQ3hDLGNBQU1DLDJCQUEyQixHQUFHVCxNQUFNLENBQUNKLFVBQVAsQ0FDbENZLElBRGtDLEVBRWxDYyxjQUZrQyxDQUVuQmlDLCtCQUZtQixDQUFwQztBQUdBLGNBQU1DLGFBQWEsR0FBRy9DLDJCQUEyQixHQUM3Q2xCLFFBQVEsQ0FBQ2dCLG9CQURvQyxHQUU3Q2hCLFFBQVEsQ0FBQ2lCLElBQUQsQ0FGWjtBQUdBLGNBQU1pRCxNQUFNLEdBQUdELGFBQWEsSUFBSUEsYUFBYSxDQUFDLFdBQUQsQ0FBYixLQUErQixRQUEvRDtBQUVBLGlCQUFPO0FBQ0x6RCxZQUFBQSxPQUFPLEVBQ0wsZ0NBQUMsV0FBRDtBQUNFLGNBQUEsR0FBRyxFQUFFUyxJQURQO0FBRUUsY0FBQSxJQUFJLEVBQUVBLElBRlI7QUFHRSxjQUFBLFFBQVEsRUFBRSxNQUFJLENBQUNrRCxVQUFMLENBQWdCbEQsSUFBaEIsQ0FIWjtBQUlFLGNBQUEsTUFBTSxFQUFFUixNQUFNLENBQUNKLFVBQVAsQ0FBa0JZLElBQWxCLENBSlY7QUFLRSxjQUFBLFFBQVEsRUFBRWdELGFBTFo7QUFNRSxjQUFBLFdBQVcsRUFBRTdDLFdBQVcsQ0FBQ0gsSUFBRCxDQU4xQjtBQU9FLGNBQUEsUUFBUSxFQUFFbkIsUUFBUSxDQUFDbUIsSUFBRCxDQVBwQjtBQVFFLGNBQUEsUUFBUSxFQUFFaUMsUUFSWjtBQVNFLGNBQUEsUUFBUSxFQUFFLENBQUN4QyxRQUFRLElBQUksRUFBYixFQUFpQk8sSUFBakIsQ0FUWjtBQVVFLGNBQUEsc0JBQXNCLEVBQUUsTUFBSSxDQUFDbUQsS0FBTCxDQUFXckQsc0JBVnJDO0FBV0UsY0FBQSxXQUFXLEVBQUUsTUFBSSxDQUFDc0QsV0FBTCxDQUFpQnBELElBQWpCLENBWGY7QUFZRSxjQUFBLFFBQVEsRUFBRSxNQUFJLENBQUNxRCxnQkFBTCxDQUNSckQsSUFEUSxFQUVSQywyQkFGUSxDQVpaO0FBZ0JFLGNBQUEsTUFBTSxFQUFFaUMsTUFoQlY7QUFpQkUsY0FBQSxPQUFPLEVBQUVDLE9BakJYO0FBa0JFLGNBQUEsUUFBUSxFQUFFVixRQWxCWjtBQW1CRSxjQUFBLFFBQVEsRUFBRTlCLFFBbkJaO0FBb0JFLGNBQUEsUUFBUSxFQUFFQyxRQXBCWjtBQXFCRSxjQUFBLG1CQUFtQixFQUFFLE1BQUksQ0FBQzBEO0FBckI1QixjQUZHO0FBMEJMdEQsWUFBQUEsSUFBSSxFQUFKQSxJQTFCSztBQTJCTEosWUFBQUEsUUFBUSxFQUFSQSxRQTNCSztBQTRCTEQsWUFBQUEsUUFBUSxFQUFSQSxRQTVCSztBQTZCTFYsWUFBQUEsUUFBUSxFQUFSQSxRQTdCSztBQThCTGdFLFlBQUFBLE1BQU0sRUFBTkE7QUE5QkssV0FBUDtBQWdDRCxTQXpDVyxDQUxRO0FBK0NwQnJELFFBQUFBLFFBQVEsRUFBUkEsUUEvQ29CO0FBZ0RwQkQsUUFBQUEsUUFBUSxFQUFSQSxRQWhEb0I7QUFpRHBCVixRQUFBQSxRQUFRLEVBQVJBLFFBakRvQjtBQWtEcEJKLFFBQUFBLFFBQVEsRUFBUkEsUUFsRG9CO0FBbURwQkUsUUFBQUEsUUFBUSxFQUFSQSxRQW5Eb0I7QUFvRHBCUyxRQUFBQSxNQUFNLEVBQU5BLE1BcERvQjtBQXFEcEJDLFFBQUFBLFFBQVEsRUFBUkEsUUFyRG9CO0FBc0RwQlAsUUFBQUEsV0FBVyxFQUFYQSxXQXREb0I7QUF1RHBCdUMsUUFBQUEsUUFBUSxFQUFSQTtBQXZEb0IsT0FBdEI7QUF5REEsYUFBTyxnQ0FBQyxRQUFELGVBQWNxQixhQUFkO0FBQTZCLFFBQUEsVUFBVSxFQUFFLEtBQUtTO0FBQTlDLFNBQVA7QUFDRDs7OztFQTdPdUJDLGdCOztnQkFBcEIzRCxXLGtCQUNrQjtBQUNwQmQsRUFBQUEsUUFBUSxFQUFFLEVBRFU7QUFFcEJVLEVBQUFBLFFBQVEsRUFBRSxFQUZVO0FBR3BCVSxFQUFBQSxXQUFXLEVBQUUsRUFITztBQUlwQnRCLEVBQUFBLFFBQVEsRUFBRSxFQUpVO0FBS3BCSSxFQUFBQSxRQUFRLEVBQUUsS0FMVTtBQU1wQlUsRUFBQUEsUUFBUSxFQUFFLEtBTlU7QUFPcEJDLEVBQUFBLFFBQVEsRUFBRTtBQVBVLEM7O0FBK094QixJQUFJNkQsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM5RCxFQUFBQSxXQUFXLENBQUMrRCxTQUFaLEdBQXdCQyxLQUFLLENBQUNDLFVBQTlCO0FBQ0Q7O2VBRWNqRSxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFkZEJ1dHRvbiBmcm9tIFwiLi4vQWRkQnV0dG9uXCI7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuaW1wb3J0IHtcbiAgb3JkZXJQcm9wZXJ0aWVzLFxuICByZXRyaWV2ZVNjaGVtYSxcbiAgZ2V0RGVmYXVsdFJlZ2lzdHJ5LFxuICBjYW5FeHBhbmQsXG4gIEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIERlZmF1bHRPYmplY3RGaWVsZFRlbXBsYXRlKHByb3BzKSB7XG4gIGNvbnN0IHsgVGl0bGVGaWVsZCwgRGVzY3JpcHRpb25GaWVsZCB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGZpZWxkc2V0IGlkPXtwcm9wcy5pZFNjaGVtYS4kaWR9PlxuICAgICAgeyhwcm9wcy51aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHByb3BzLnRpdGxlKSAmJiAoXG4gICAgICAgIDxUaXRsZUZpZWxkXG4gICAgICAgICAgaWQ9e2Ake3Byb3BzLmlkU2NoZW1hLiRpZH1fX3RpdGxlYH1cbiAgICAgICAgICB0aXRsZT17cHJvcHMudGl0bGUgfHwgcHJvcHMudWlTY2hlbWFbXCJ1aTp0aXRsZVwiXX1cbiAgICAgICAgICByZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG4gICAgICAgICAgZm9ybUNvbnRleHQ9e3Byb3BzLmZvcm1Db250ZXh0fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtwcm9wcy5kZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgIDxEZXNjcmlwdGlvbkZpZWxkXG4gICAgICAgICAgaWQ9e2Ake3Byb3BzLmlkU2NoZW1hLiRpZH1fX2Rlc2NyaXB0aW9uYH1cbiAgICAgICAgICBkZXNjcmlwdGlvbj17cHJvcHMuZGVzY3JpcHRpb259XG4gICAgICAgICAgZm9ybUNvbnRleHQ9e3Byb3BzLmZvcm1Db250ZXh0fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtwcm9wcy5wcm9wZXJ0aWVzLm1hcChwcm9wID0+IHByb3AuY29udGVudCl9XG4gICAgICB7Y2FuRXhwYW5kKHByb3BzLnNjaGVtYSwgcHJvcHMudWlTY2hlbWEsIHByb3BzLmZvcm1EYXRhKSAmJiAoXG4gICAgICAgIDxBZGRCdXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9XCJvYmplY3QtcHJvcGVydHktZXhwYW5kXCJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrKHByb3BzLnNjaGVtYSl9XG4gICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5fVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2ZpZWxkc2V0PlxuICApO1xufVxuXG5jbGFzcyBPYmplY3RGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdWlTY2hlbWE6IHt9LFxuICAgIGZvcm1EYXRhOiB7fSxcbiAgICBlcnJvclNjaGVtYToge30sXG4gICAgaWRTY2hlbWE6IHt9LFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQ6IGZhbHNlLFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB7fSxcbiAgfTtcblxuICBpc1JlcXVpcmVkKG5hbWUpIHtcbiAgICBjb25zdCBzY2hlbWEgPSB0aGlzLnByb3BzLnNjaGVtYTtcbiAgICByZXR1cm4gKFxuICAgICAgQXJyYXkuaXNBcnJheShzY2hlbWEucmVxdWlyZWQpICYmIHNjaGVtYS5yZXF1aXJlZC5pbmRleE9mKG5hbWUpICE9PSAtMVxuICAgICk7XG4gIH1cblxuICBvblByb3BlcnR5Q2hhbmdlID0gKG5hbWUsIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcyA9IGZhbHNlKSA9PiB7XG4gICAgcmV0dXJuICh2YWx1ZSwgZXJyb3JTY2hlbWEpID0+IHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgICAgICAvLyBEb24ndCBzZXQgdmFsdWUgPSB1bmRlZmluZWQgZm9yIGZpZWxkcyBhZGRlZCBieVxuICAgICAgICAvLyBhZGRpdGlvbmFsUHJvcGVydGllcy4gRG9pbmcgc28gcmVtb3ZlcyB0aGVtIGZyb20gdGhlXG4gICAgICAgIC8vIGZvcm1EYXRhLCB3aGljaCBjYXVzZXMgdGhlbSB0byBjb21wbGV0ZWx5IGRpc2FwcGVhclxuICAgICAgICAvLyAoaW5jbHVkaW5nIHRoZSBpbnB1dCBmaWVsZCBmb3IgdGhlIHByb3BlcnR5IG5hbWUpLiBVbmxpa2VcbiAgICAgICAgLy8gZmllbGRzIHdoaWNoIGFyZSBcIm1hbmRhdGVkXCIgYnkgdGhlIHNjaGVtYSwgdGhlc2UgZmllbGRzIGNhblxuICAgICAgICAvLyBiZSBzZXQgdG8gdW5kZWZpbmVkIGJ5IGNsaWNraW5nIGEgXCJkZWxldGUgZmllbGRcIiBidXR0b24sIHNvXG4gICAgICAgIC8vIHNldCBlbXB0eSB2YWx1ZXMgdG8gdGhlIGVtcHR5IHN0cmluZy5cbiAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3Rm9ybURhdGEgPSB7IC4uLnRoaXMucHJvcHMuZm9ybURhdGEsIFtuYW1lXTogdmFsdWUgfTtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXG4gICAgICAgIG5ld0Zvcm1EYXRhLFxuICAgICAgICBlcnJvclNjaGVtYSAmJlxuICAgICAgICAgIHRoaXMucHJvcHMuZXJyb3JTY2hlbWEgJiYge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5lcnJvclNjaGVtYSxcbiAgICAgICAgICAgIFtuYW1lXTogZXJyb3JTY2hlbWEsXG4gICAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xuXG4gIG9uRHJvcFByb3BlcnR5Q2xpY2sgPSBrZXkgPT4ge1xuICAgIHJldHVybiBldmVudCA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgeyBvbkNoYW5nZSwgZm9ybURhdGEgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBjb3BpZWRGb3JtRGF0YSA9IHsgLi4uZm9ybURhdGEgfTtcbiAgICAgIGRlbGV0ZSBjb3BpZWRGb3JtRGF0YVtrZXldO1xuICAgICAgb25DaGFuZ2UoY29waWVkRm9ybURhdGEpO1xuICAgIH07XG4gIH07XG5cbiAgZ2V0QXZhaWxhYmxlS2V5ID0gKHByZWZlcnJlZEtleSwgZm9ybURhdGEpID0+IHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBuZXdLZXkgPSBwcmVmZXJyZWRLZXk7XG4gICAgd2hpbGUgKGZvcm1EYXRhLmhhc093blByb3BlcnR5KG5ld0tleSkpIHtcbiAgICAgIG5ld0tleSA9IGAke3ByZWZlcnJlZEtleX0tJHsrK2luZGV4fWA7XG4gICAgfVxuICAgIHJldHVybiBuZXdLZXk7XG4gIH07XG5cbiAgb25LZXlDaGFuZ2UgPSBvbGRWYWx1ZSA9PiB7XG4gICAgcmV0dXJuICh2YWx1ZSwgZXJyb3JTY2hlbWEpID0+IHtcbiAgICAgIGlmIChvbGRWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0QXZhaWxhYmxlS2V5KHZhbHVlLCB0aGlzLnByb3BzLmZvcm1EYXRhKTtcbiAgICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0geyAuLi50aGlzLnByb3BzLmZvcm1EYXRhIH07XG4gICAgICBjb25zdCBuZXdLZXlzID0geyBbb2xkVmFsdWVdOiB2YWx1ZSB9O1xuICAgICAgY29uc3Qga2V5VmFsdWVzID0gT2JqZWN0LmtleXMobmV3Rm9ybURhdGEpLm1hcChrZXkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBuZXdLZXlzW2tleV0gfHwga2V5O1xuICAgICAgICByZXR1cm4geyBbbmV3S2V5XTogbmV3Rm9ybURhdGFba2V5XSB9O1xuICAgICAgfSk7XG4gICAgICBjb25zdCByZW5hbWVkT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgLi4ua2V5VmFsdWVzKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdhc1Byb3BlcnR5S2V5TW9kaWZpZWQ6IHRydWUgfSk7XG5cbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoXG4gICAgICAgIHJlbmFtZWRPYmosXG4gICAgICAgIGVycm9yU2NoZW1hICYmXG4gICAgICAgICAgdGhpcy5wcm9wcy5lcnJvclNjaGVtYSAmJiB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxuICAgICAgICAgICAgW3ZhbHVlXTogZXJyb3JTY2hlbWEsXG4gICAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xuXG4gIGdldERlZmF1bHRWYWx1ZSh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgIHJldHVybiBcIk5ldyBWYWx1ZVwiO1xuICAgICAgY2FzZSBcImFycmF5XCI6XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIGNhc2UgXCJudWxsXCI6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gV2UgZG9uJ3QgaGF2ZSBhIGRhdGF0eXBlIGZvciBzb21lIHJlYXNvbiAocGVyaGFwcyBhZGRpdGlvbmFsUHJvcGVydGllcyB3YXMgdHJ1ZSlcbiAgICAgICAgcmV0dXJuIFwiTmV3IFZhbHVlXCI7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWRkQ2xpY2sgPSBzY2hlbWEgPT4gKCkgPT4ge1xuICAgIGxldCB0eXBlID0gc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLnR5cGU7XG4gICAgY29uc3QgbmV3Rm9ybURhdGEgPSB7IC4uLnRoaXMucHJvcHMuZm9ybURhdGEgfTtcblxuICAgIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XG4gICAgICBjb25zdCB7IHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCkgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCByZWZTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShcbiAgICAgICAgeyAkcmVmOiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNbXCIkcmVmXCJdIH0sXG4gICAgICAgIHJlZ2lzdHJ5LnJvb3RTY2hlbWEsXG4gICAgICAgIHRoaXMucHJvcHMuZm9ybURhdGFcbiAgICAgICk7XG5cbiAgICAgIHR5cGUgPSByZWZTY2hlbWEudHlwZTtcbiAgICB9XG5cbiAgICBuZXdGb3JtRGF0YVtcbiAgICAgIHRoaXMuZ2V0QXZhaWxhYmxlS2V5KFwibmV3S2V5XCIsIG5ld0Zvcm1EYXRhKVxuICAgIF0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZSh0eXBlKTtcblxuICAgIHRoaXMucHJvcHMub25DaGFuZ2UobmV3Rm9ybURhdGEpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICB1aVNjaGVtYSxcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgZXJyb3JTY2hlbWEsXG4gICAgICBpZFNjaGVtYSxcbiAgICAgIG5hbWUsXG4gICAgICByZXF1aXJlZCxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgcmVhZG9ubHksXG4gICAgICBpZFByZWZpeCxcbiAgICAgIG9uQmx1cixcbiAgICAgIG9uRm9jdXMsXG4gICAgICByZWdpc3RyeSA9IGdldERlZmF1bHRSZWdpc3RyeSgpLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyByb290U2NoZW1hLCBmaWVsZHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcbiAgICBjb25zdCB7IFNjaGVtYUZpZWxkLCBUaXRsZUZpZWxkLCBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XG4gICAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEodGhpcy5wcm9wcy5zY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcblxuICAgIGNvbnN0IHRpdGxlID0gc2NoZW1hLnRpdGxlID09PSB1bmRlZmluZWQgPyBuYW1lIDogc2NoZW1hLnRpdGxlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fCBzY2hlbWEuZGVzY3JpcHRpb247XG4gICAgbGV0IG9yZGVyZWRQcm9wZXJ0aWVzO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pO1xuICAgICAgb3JkZXJlZFByb3BlcnRpZXMgPSBvcmRlclByb3BlcnRpZXMocHJvcGVydGllcywgdWlTY2hlbWFbXCJ1aTpvcmRlclwiXSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImNvbmZpZy1lcnJvclwiIHN0eWxlPXt7IGNvbG9yOiBcInJlZFwiIH19PlxuICAgICAgICAgICAgSW52YWxpZCB7bmFtZSB8fCBcInJvb3RcIn0gb2JqZWN0IGZpZWxkIGNvbmZpZ3VyYXRpb246XG4gICAgICAgICAgICA8ZW0+e2Vyci5tZXNzYWdlfTwvZW0+LlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8cHJlPntKU09OLnN0cmluZ2lmeShzY2hlbWEpfTwvcHJlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgVGVtcGxhdGUgPVxuICAgICAgdWlTY2hlbWFbXCJ1aTpPYmplY3RGaWVsZFRlbXBsYXRlXCJdIHx8XG4gICAgICByZWdpc3RyeS5PYmplY3RGaWVsZFRlbXBsYXRlIHx8XG4gICAgICBEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZTtcblxuICAgIGNvbnN0IHRlbXBsYXRlUHJvcHMgPSB7XG4gICAgICB0aXRsZTogdWlTY2hlbWFbXCJ1aTp0aXRsZVwiXSB8fCB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgVGl0bGVGaWVsZCxcbiAgICAgIERlc2NyaXB0aW9uRmllbGQsXG4gICAgICBwcm9wZXJ0aWVzOiBvcmRlcmVkUHJvcGVydGllcy5tYXAobmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllcyA9IHNjaGVtYS5wcm9wZXJ0aWVzW1xuICAgICAgICAgIG5hbWVcbiAgICAgICAgXS5oYXNPd25Qcm9wZXJ0eShBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcpO1xuICAgICAgICBjb25zdCBmaWVsZFVpU2NoZW1hID0gYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICAgICAgPyB1aVNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1xuICAgICAgICAgIDogdWlTY2hlbWFbbmFtZV07XG4gICAgICAgIGNvbnN0IGhpZGRlbiA9IGZpZWxkVWlTY2hlbWEgJiYgZmllbGRVaVNjaGVtYVtcInVpOndpZGdldFwiXSA9PT0gXCJoaWRkZW5cIjtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbnRlbnQ6IChcbiAgICAgICAgICAgIDxTY2hlbWFGaWVsZFxuICAgICAgICAgICAgICBrZXk9e25hbWV9XG4gICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXt0aGlzLmlzUmVxdWlyZWQobmFtZSl9XG4gICAgICAgICAgICAgIHNjaGVtYT17c2NoZW1hLnByb3BlcnRpZXNbbmFtZV19XG4gICAgICAgICAgICAgIHVpU2NoZW1hPXtmaWVsZFVpU2NoZW1hfVxuICAgICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWFbbmFtZV19XG4gICAgICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYVtuYW1lXX1cbiAgICAgICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxuICAgICAgICAgICAgICBmb3JtRGF0YT17KGZvcm1EYXRhIHx8IHt9KVtuYW1lXX1cbiAgICAgICAgICAgICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZD17dGhpcy5zdGF0ZS53YXNQcm9wZXJ0eUtleU1vZGlmaWVkfVxuICAgICAgICAgICAgICBvbktleUNoYW5nZT17dGhpcy5vbktleUNoYW5nZShuYW1lKX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25Qcm9wZXJ0eUNoYW5nZShcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGFkZGVkQnlBZGRpdGlvbmFsUHJvcGVydGllc1xuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cbiAgICAgICAgICAgICAgb25Ecm9wUHJvcGVydHlDbGljaz17dGhpcy5vbkRyb3BQcm9wZXJ0eUNsaWNrfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApLFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgcmVhZG9ubHksXG4gICAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgICAgcmVxdWlyZWQsXG4gICAgICAgICAgaGlkZGVuLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgICByZWFkb25seSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBpZFNjaGVtYSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgc2NoZW1hLFxuICAgICAgZm9ybURhdGEsXG4gICAgICBmb3JtQ29udGV4dCxcbiAgICAgIHJlZ2lzdHJ5LFxuICAgIH07XG4gICAgcmV0dXJuIDxUZW1wbGF0ZSB7Li4udGVtcGxhdGVQcm9wc30gb25BZGRDbGljaz17dGhpcy5oYW5kbGVBZGRDbGlja30gLz47XG4gIH1cbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBPYmplY3RGaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3RGaWVsZDtcbiJdfQ==