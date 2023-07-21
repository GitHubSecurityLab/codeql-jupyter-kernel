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

import AddButton from "../AddButton";
import React, { Component } from "react";
import * as types from "../../types";
import { orderProperties, retrieveSchema, getDefaultRegistry, canExpand, ADDITIONAL_PROPERTY_FLAG } from "../../utils";

function DefaultObjectFieldTemplate(props) {
  var TitleField = props.TitleField,
      DescriptionField = props.DescriptionField;
  return React.createElement("fieldset", {
    id: props.idSchema.$id
  }, (props.uiSchema["ui:title"] || props.title) && React.createElement(TitleField, {
    id: "".concat(props.idSchema.$id, "__title"),
    title: props.title || props.uiSchema["ui:title"],
    required: props.required,
    formContext: props.formContext
  }), props.description && React.createElement(DescriptionField, {
    id: "".concat(props.idSchema.$id, "__description"),
    description: props.description,
    formContext: props.formContext
  }), props.properties.map(function (prop) {
    return prop.content;
  }), canExpand(props.schema, props.uiSchema, props.formData) && React.createElement(AddButton, {
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
              registry = _this$props$registry === void 0 ? getDefaultRegistry() : _this$props$registry;
          var refSchema = retrieveSchema({
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
          registry = _this$props2$registry === void 0 ? getDefaultRegistry() : _this$props2$registry;
      var rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var schema = retrieveSchema(this.props.schema, rootSchema, formData);
      var title = schema.title === undefined ? name : schema.title;
      var description = uiSchema["ui:description"] || schema.description;
      var orderedProperties;

      try {
        var properties = Object.keys(schema.properties || {});
        orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
      } catch (err) {
        return React.createElement("div", null, React.createElement("p", {
          className: "config-error",
          style: {
            color: "red"
          }
        }, "Invalid ", name || "root", " object field configuration:", React.createElement("em", null, err.message), "."), React.createElement("pre", null, JSON.stringify(schema)));
      }

      var Template = uiSchema["ui:ObjectFieldTemplate"] || registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;
      var templateProps = {
        title: uiSchema["ui:title"] || title,
        description: description,
        TitleField: TitleField,
        DescriptionField: DescriptionField,
        properties: orderedProperties.map(function (name) {
          var addedByAdditionalProperties = schema.properties[name].hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);
          var fieldUiSchema = addedByAdditionalProperties ? uiSchema.additionalProperties : uiSchema[name];
          var hidden = fieldUiSchema && fieldUiSchema["ui:widget"] === "hidden";
          return {
            content: React.createElement(SchemaField, {
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
      return React.createElement(Template, _extends({}, templateProps, {
        onAddClick: this.handleAddClick
      }));
    }
  }]);

  return ObjectField;
}(Component);

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

export default ObjectField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9PYmplY3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJBZGRCdXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsInR5cGVzIiwib3JkZXJQcm9wZXJ0aWVzIiwicmV0cmlldmVTY2hlbWEiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJjYW5FeHBhbmQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJEZWZhdWx0T2JqZWN0RmllbGRUZW1wbGF0ZSIsInByb3BzIiwiVGl0bGVGaWVsZCIsIkRlc2NyaXB0aW9uRmllbGQiLCJpZFNjaGVtYSIsIiRpZCIsInVpU2NoZW1hIiwidGl0bGUiLCJyZXF1aXJlZCIsImZvcm1Db250ZXh0IiwiZGVzY3JpcHRpb24iLCJwcm9wZXJ0aWVzIiwibWFwIiwicHJvcCIsImNvbnRlbnQiLCJzY2hlbWEiLCJmb3JtRGF0YSIsIm9uQWRkQ2xpY2siLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiT2JqZWN0RmllbGQiLCJ3YXNQcm9wZXJ0eUtleU1vZGlmaWVkIiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJuYW1lIiwiYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwidmFsdWUiLCJlcnJvclNjaGVtYSIsInVuZGVmaW5lZCIsIm5ld0Zvcm1EYXRhIiwib25DaGFuZ2UiLCJrZXkiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY29waWVkRm9ybURhdGEiLCJwcmVmZXJyZWRLZXkiLCJpbmRleCIsIm5ld0tleSIsImhhc093blByb3BlcnR5Iiwib2xkVmFsdWUiLCJnZXRBdmFpbGFibGVLZXkiLCJuZXdLZXlzIiwia2V5VmFsdWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlbmFtZWRPYmoiLCJhc3NpZ24iLCJzZXRTdGF0ZSIsInR5cGUiLCJyZWdpc3RyeSIsInJlZlNjaGVtYSIsIiRyZWYiLCJyb290U2NoZW1hIiwiZ2V0RGVmYXVsdFZhbHVlIiwiQXJyYXkiLCJpc0FycmF5IiwiaW5kZXhPZiIsImlkUHJlZml4Iiwib25CbHVyIiwib25Gb2N1cyIsImZpZWxkcyIsIlNjaGVtYUZpZWxkIiwib3JkZXJlZFByb3BlcnRpZXMiLCJlcnIiLCJjb2xvciIsIm1lc3NhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiVGVtcGxhdGUiLCJPYmplY3RGaWVsZFRlbXBsYXRlIiwidGVtcGxhdGVQcm9wcyIsImZpZWxkVWlTY2hlbWEiLCJoaWRkZW4iLCJpc1JlcXVpcmVkIiwic3RhdGUiLCJvbktleUNoYW5nZSIsIm9uUHJvcGVydHlDaGFuZ2UiLCJvbkRyb3BQcm9wZXJ0eUNsaWNrIiwiaGFuZGxlQWRkQ2xpY2siLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJmaWVsZFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxPQUFPQyxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLGVBREYsRUFFRUMsY0FGRixFQUdFQyxrQkFIRixFQUlFQyxTQUpGLEVBS0VDLHdCQUxGLFFBTU8sYUFOUDs7QUFRQSxTQUFTQywwQkFBVCxDQUFvQ0MsS0FBcEMsRUFBMkM7QUFBQSxNQUNqQ0MsVUFEaUMsR0FDQUQsS0FEQSxDQUNqQ0MsVUFEaUM7QUFBQSxNQUNyQkMsZ0JBRHFCLEdBQ0FGLEtBREEsQ0FDckJFLGdCQURxQjtBQUV6QyxTQUNFO0FBQVUsSUFBQSxFQUFFLEVBQUVGLEtBQUssQ0FBQ0csUUFBTixDQUFlQztBQUE3QixLQUNHLENBQUNKLEtBQUssQ0FBQ0ssUUFBTixDQUFlLFVBQWYsS0FBOEJMLEtBQUssQ0FBQ00sS0FBckMsS0FDQyxvQkFBQyxVQUFEO0FBQ0UsSUFBQSxFQUFFLFlBQUtOLEtBQUssQ0FBQ0csUUFBTixDQUFlQyxHQUFwQixZQURKO0FBRUUsSUFBQSxLQUFLLEVBQUVKLEtBQUss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QTJDO0FBQ3pDNUQsRUFBQUEsV0FBVyxDQUFDNkQsU0FBWixHQUF3QnZGLEtBQUssQ0FBQ3dGLFVBQTlCO0FBQ0Q7O0FBRUQsZUFBZTlELFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWRkQnV0dG9uIGZyb20gXCIuLi9BZGRCdXR0b25cIjtcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5pbXBvcnQge1xuICBvcmRlclByb3BlcnRpZXMsXG4gIHJldHJpZXZlU2NoZW1hLFxuICBnZXREZWZhdWx0UmVnaXN0cnksXG4gIGNhbkV4cGFuZCxcbiAgQURESVRJT05BTF9QUk9QRVJUWV9GTEFHLFxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gRGVmYXVsdE9iamVjdEZpZWxkVGVtcGxhdGUocHJvcHMpIHtcbiAgY29uc3QgeyBUaXRsZUZpZWxkLCBEZXNjcmlwdGlvbkZpZWxkIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZmllbGRzZXQgaWQ9e3Byb3BzLmlkU2NoZW1hLiRpZH0+XG4gICAgICB7KHByb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgcHJvcHMudGl0bGUpICYmIChcbiAgICAgICAgPFRpdGxlRmllbGRcbiAgICAgICAgICBpZD17YCR7cHJvcHMuaWRTY2hlbWEuJGlkfV9fdGl0bGVgfVxuICAgICAgICAgIHRpdGxlPXtwcm9wcy50aXRsZSB8fCBwcm9wcy51aVNjaGVtYVtcInVpOnRpdGxlXCJdfVxuICAgICAgICAgIHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cbiAgICAgICAgICBmb3JtQ29udGV4dD17cHJvcHMuZm9ybUNvbnRleHR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3Byb3BzLmRlc2NyaXB0aW9uICYmIChcbiAgICAgICAgPERlc2NyaXB0aW9uRmllbGRcbiAgICAgICAgICBpZD17YCR7cHJvcHMuaWRTY2hlbWEuJGlkfV9fZGVzY3JpcHRpb25gfVxuICAgICAgICAgIGRlc2NyaXB0aW9uPXtwcm9wcy5kZXNjcmlwdGlvbn1cbiAgICAgICAgICBmb3JtQ29udGV4dD17cHJvcHMuZm9ybUNvbnRleHR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3Byb3BzLnByb3BlcnRpZXMubWFwKHByb3AgPT4gcHJvcC5jb250ZW50KX1cbiAgICAgIHtjYW5FeHBhbmQocHJvcHMuc2NoZW1hLCBwcm9wcy51aVNjaGVtYSwgcHJvcHMuZm9ybURhdGEpICYmIChcbiAgICAgICAgPEFkZEJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1wcm9wZXJ0eS1leHBhbmRcIlxuICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQWRkQ2xpY2socHJvcHMuc2NoZW1hKX1cbiAgICAgICAgICBkaXNhYmxlZD17cHJvcHMuZGlzYWJsZWQgfHwgcHJvcHMucmVhZG9ubHl9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZmllbGRzZXQ+XG4gICk7XG59XG5cbmNsYXNzIE9iamVjdEZpZWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB1aVNjaGVtYToge30sXG4gICAgZm9ybURhdGE6IHt9LFxuICAgIGVycm9yU2NoZW1hOiB7fSxcbiAgICBpZFNjaGVtYToge30sXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICByZWFkb25seTogZmFsc2UsXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgd2FzUHJvcGVydHlLZXlNb2RpZmllZDogZmFsc2UsXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHt9LFxuICB9O1xuXG4gIGlzUmVxdWlyZWQobmFtZSkge1xuICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMucHJvcHMuc2NoZW1hO1xuICAgIHJldHVybiAoXG4gICAgICBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgc2NoZW1hLnJlcXVpcmVkLmluZGV4T2YobmFtZSkgIT09IC0xXG4gICAgKTtcbiAgfVxuXG4gIG9uUHJvcGVydHlDaGFuZ2UgPSAobmFtZSwgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gZmFsc2UpID0+IHtcbiAgICByZXR1cm4gKHZhbHVlLCBlcnJvclNjaGVtYSkgPT4ge1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIC8vIERvbid0IHNldCB2YWx1ZSA9IHVuZGVmaW5lZCBmb3IgZmllbGRzIGFkZGVkIGJ5XG4gICAgICAgIC8vIGFkZGl0aW9uYWxQcm9wZXJ0aWVzLiBEb2luZyBzbyByZW1vdmVzIHRoZW0gZnJvbSB0aGVcbiAgICAgICAgLy8gZm9ybURhdGEsIHdoaWNoIGNhdXNlcyB0aGVtIHRvIGNvbXBsZXRlbHkgZGlzYXBwZWFyXG4gICAgICAgIC8vIChpbmNsdWRpbmcgdGhlIGlucHV0IGZpZWxkIGZvciB0aGUgcHJvcGVydHkgbmFtZSkuIFVubGlrZVxuICAgICAgICAvLyBmaWVsZHMgd2hpY2ggYXJlIFwibWFuZGF0ZWRcIiBieSB0aGUgc2NoZW1hLCB0aGVzZSBmaWVsZHMgY2FuXG4gICAgICAgIC8vIGJlIHNldCB0byB1bmRlZmluZWQgYnkgY2xpY2tpbmcgYSBcImRlbGV0ZSBmaWVsZFwiIGJ1dHRvbiwgc29cbiAgICAgICAgLy8gc2V0IGVtcHR5IHZhbHVlcyB0byB0aGUgZW1wdHkgc3RyaW5nLlxuICAgICAgICB2YWx1ZSA9IFwiXCI7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSwgW25hbWVdOiB2YWx1ZSB9O1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcbiAgICAgICAgbmV3Rm9ybURhdGEsXG4gICAgICAgIGVycm9yU2NoZW1hICYmXG4gICAgICAgICAgdGhpcy5wcm9wcy5lcnJvclNjaGVtYSAmJiB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxuICAgICAgICAgICAgW25hbWVdOiBlcnJvclNjaGVtYSxcbiAgICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG4gIH07XG5cbiAgb25Ecm9wUHJvcGVydHlDbGljayA9IGtleSA9PiB7XG4gICAgcmV0dXJuIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCB7IG9uQ2hhbmdlLCBmb3JtRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGNvcGllZEZvcm1EYXRhID0geyAuLi5mb3JtRGF0YSB9O1xuICAgICAgZGVsZXRlIGNvcGllZEZvcm1EYXRhW2tleV07XG4gICAgICBvbkNoYW5nZShjb3BpZWRGb3JtRGF0YSk7XG4gICAgfTtcbiAgfTtcblxuICBnZXRBdmFpbGFibGVLZXkgPSAocHJlZmVycmVkS2V5LCBmb3JtRGF0YSkgPT4ge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIG5ld0tleSA9IHByZWZlcnJlZEtleTtcbiAgICB3aGlsZSAoZm9ybURhdGEuaGFzT3duUHJvcGVydHkobmV3S2V5KSkge1xuICAgICAgbmV3S2V5ID0gYCR7cHJlZmVycmVkS2V5fS0keysraW5kZXh9YDtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0tleTtcbiAgfTtcblxuICBvbktleUNoYW5nZSA9IG9sZFZhbHVlID0+IHtcbiAgICByZXR1cm4gKHZhbHVlLCBlcnJvclNjaGVtYSkgPT4ge1xuICAgICAgaWYgKG9sZFZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhbHVlID0gdGhpcy5nZXRBdmFpbGFibGVLZXkodmFsdWUsIHRoaXMucHJvcHMuZm9ybURhdGEpO1xuICAgICAgY29uc3QgbmV3Rm9ybURhdGEgPSB7IC4uLnRoaXMucHJvcHMuZm9ybURhdGEgfTtcbiAgICAgIGNvbnN0IG5ld0tleXMgPSB7IFtvbGRWYWx1ZV06IHZhbHVlIH07XG4gICAgICBjb25zdCBrZXlWYWx1ZXMgPSBPYmplY3Qua2V5cyhuZXdGb3JtRGF0YSkubWFwKGtleSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IG5ld0tleXNba2V5XSB8fCBrZXk7XG4gICAgICAgIHJldHVybiB7IFtuZXdLZXldOiBuZXdGb3JtRGF0YVtrZXldIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlbmFtZWRPYmogPSBPYmplY3QuYXNzaWduKHt9LCAuLi5rZXlWYWx1ZXMpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHsgd2FzUHJvcGVydHlLZXlNb2RpZmllZDogdHJ1ZSB9KTtcblxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcbiAgICAgICAgcmVuYW1lZE9iaixcbiAgICAgICAgZXJyb3JTY2hlbWEgJiZcbiAgICAgICAgICB0aGlzLnByb3BzLmVycm9yU2NoZW1hICYmIHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuZXJyb3JTY2hlbWEsXG4gICAgICAgICAgICBbdmFsdWVdOiBlcnJvclNjaGVtYSxcbiAgICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG4gIH07XG5cbiAgZ2V0RGVmYXVsdFZhbHVlKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgcmV0dXJuIFwiTmV3IFZhbHVlXCI7XG4gICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgY2FzZSBcImJvb2xlYW5cIjpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgY2FzZSBcIm51bGxcIjpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICByZXR1cm4ge307XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBXZSBkb24ndCBoYXZlIGEgZGF0YXR5cGUgZm9yIHNvbWUgcmVhc29uIChwZXJoYXBzIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIHdhcyB0cnVlKVxuICAgICAgICByZXR1cm4gXCJOZXcgVmFsdWVcIjtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBZGRDbGljayA9IHNjaGVtYSA9PiAoKSA9PiB7XG4gICAgbGV0IHR5cGUgPSBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMudHlwZTtcbiAgICBjb25zdCBuZXdGb3JtRGF0YSA9IHsgLi4udGhpcy5wcm9wcy5mb3JtRGF0YSB9O1xuXG4gICAgaWYgKHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcbiAgICAgIGNvbnN0IHsgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHJlZlNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxuICAgICAgICB7ICRyZWY6IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1tcIiRyZWZcIl0gfSxcbiAgICAgICAgcmVnaXN0cnkucm9vdFNjaGVtYSxcbiAgICAgICAgdGhpcy5wcm9wcy5mb3JtRGF0YVxuICAgICAgKTtcblxuICAgICAgdHlwZSA9IHJlZlNjaGVtYS50eXBlO1xuICAgIH1cblxuICAgIG5ld0Zvcm1EYXRhW1xuICAgICAgdGhpcy5nZXRBdmFpbGFibGVLZXkoXCJuZXdLZXlcIiwgbmV3Rm9ybURhdGEpXG4gICAgXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHR5cGUpO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdGb3JtRGF0YSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgZm9ybURhdGEsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIGlkU2NoZW1hLFxuICAgICAgbmFtZSxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICByZWFkb25seSxcbiAgICAgIGlkUHJlZml4LFxuICAgICAgb25CbHVyLFxuICAgICAgb25Gb2N1cyxcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IHJvb3RTY2hlbWEsIGZpZWxkcywgZm9ybUNvbnRleHQgfSA9IHJlZ2lzdHJ5O1xuICAgIGNvbnN0IHsgU2NoZW1hRmllbGQsIFRpdGxlRmllbGQsIERlc2NyaXB0aW9uRmllbGQgfSA9IGZpZWxkcztcbiAgICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYSh0aGlzLnByb3BzLnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuXG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgPT09IHVuZGVmaW5lZCA/IG5hbWUgOiBzY2hlbWEudGl0bGU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB1aVNjaGVtYVtcInVpOmRlc2NyaXB0aW9uXCJdIHx8IHNjaGVtYS5kZXNjcmlwdGlvbjtcbiAgICBsZXQgb3JkZXJlZFByb3BlcnRpZXM7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcyB8fCB7fSk7XG4gICAgICBvcmRlcmVkUHJvcGVydGllcyA9IG9yZGVyUHJvcGVydGllcyhwcm9wZXJ0aWVzLCB1aVNjaGVtYVtcInVpOm9yZGVyXCJdKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwiY29uZmlnLWVycm9yXCIgc3R5bGU9e3sgY29sb3I6IFwicmVkXCIgfX0+XG4gICAgICAgICAgICBJbnZhbGlkIHtuYW1lIHx8IFwicm9vdFwifSBvYmplY3QgZmllbGQgY29uZmlndXJhdGlvbjpcbiAgICAgICAgICAgIDxlbT57ZXJyLm1lc3NhZ2V9PC9lbT4uXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxwcmU+e0pTT04uc3RyaW5naWZ5KHNjaGVtYSl9PC9wcmU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBUZW1wbGF0ZSA9XG4gICAgICB1aVNjaGVtYVtcInVpOk9iamVjdEZpZWxkVGVtcGxhdGVcIl0gfHxcbiAgICAgIHJlZ2lzdHJ5Lk9iamVjdEZpZWxkVGVtcGxhdGUgfHxcbiAgICAgIERlZmF1bHRPYmplY3RGaWVsZFRlbXBsYXRlO1xuXG4gICAgY29uc3QgdGVtcGxhdGVQcm9wcyA9IHtcbiAgICAgIHRpdGxlOiB1aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHRpdGxlLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBUaXRsZUZpZWxkLFxuICAgICAgRGVzY3JpcHRpb25GaWVsZCxcbiAgICAgIHByb3BlcnRpZXM6IG9yZGVyZWRQcm9wZXJ0aWVzLm1hcChuYW1lID0+IHtcbiAgICAgICAgY29uc3QgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzID0gc2NoZW1hLnByb3BlcnRpZXNbXG4gICAgICAgICAgbmFtZVxuICAgICAgICBdLmhhc093blByb3BlcnR5KEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyk7XG4gICAgICAgIGNvbnN0IGZpZWxkVWlTY2hlbWEgPSBhZGRlZEJ5QWRkaXRpb25hbFByb3BlcnRpZXNcbiAgICAgICAgICA/IHVpU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICAgICAgOiB1aVNjaGVtYVtuYW1lXTtcbiAgICAgICAgY29uc3QgaGlkZGVuID0gZmllbGRVaVNjaGVtYSAmJiBmaWVsZFVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImhpZGRlblwiO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29udGVudDogKFxuICAgICAgICAgICAgPFNjaGVtYUZpZWxkXG4gICAgICAgICAgICAgIGtleT17bmFtZX1cbiAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgcmVxdWlyZWQ9e3RoaXMuaXNSZXF1aXJlZChuYW1lKX1cbiAgICAgICAgICAgICAgc2NoZW1hPXtzY2hlbWEucHJvcGVydGllc1tuYW1lXX1cbiAgICAgICAgICAgICAgdWlTY2hlbWE9e2ZpZWxkVWlTY2hlbWF9XG4gICAgICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYVtuYW1lXX1cbiAgICAgICAgICAgICAgaWRTY2hlbWE9e2lkU2NoZW1hW25hbWVdfVxuICAgICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XG4gICAgICAgICAgICAgIGZvcm1EYXRhPXsoZm9ybURhdGEgfHwge30pW25hbWVdfVxuICAgICAgICAgICAgICB3YXNQcm9wZXJ0eUtleU1vZGlmaWVkPXt0aGlzLnN0YXRlLndhc1Byb3BlcnR5S2V5TW9kaWZpZWR9XG4gICAgICAgICAgICAgIG9uS2V5Q2hhbmdlPXt0aGlzLm9uS2V5Q2hhbmdlKG5hbWUpfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vblByb3BlcnR5Q2hhbmdlKFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgYWRkZWRCeUFkZGl0aW9uYWxQcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgICAgICBvbkZvY3VzPXtvbkZvY3VzfVxuICAgICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxuICAgICAgICAgICAgICBvbkRyb3BQcm9wZXJ0eUNsaWNrPXt0aGlzLm9uRHJvcFByb3BlcnR5Q2xpY2t9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICksXG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICByZWFkb25seSxcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICByZXF1aXJlZCxcbiAgICAgICAgICBoaWRkZW4sXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICAgIHJlYWRvbmx5LFxuICAgICAgZGlzYWJsZWQsXG4gICAgICByZXF1aXJlZCxcbiAgICAgIGlkU2NoZW1hLFxuICAgICAgdWlTY2hlbWEsXG4gICAgICBzY2hlbWEsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGZvcm1Db250ZXh0LFxuICAgICAgcmVnaXN0cnksXG4gICAgfTtcbiAgICByZXR1cm4gPFRlbXBsYXRlIHsuLi50ZW1wbGF0ZVByb3BzfSBvbkFkZENsaWNrPXt0aGlzLmhhbmRsZUFkZENsaWNrfSAvPjtcbiAgfVxufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIE9iamVjdEZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdEZpZWxkO1xuIl19