function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { default as DefaultErrorList } from "./ErrorList";
import { getDefaultFormState, retrieveSchema, shouldRender, toIdSchema, getDefaultRegistry, deepEquals, toPathSchema, isObject } from "../utils";
import validateFormData, { toErrorList } from "../validate";
import { mergeObjects } from "../utils";

var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    var _this;

    _classCallCheck(this, Form);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getUsedFormData", function (formData, fields) {
      //for the case of a single input form
      if (fields.length === 0 && _typeof(formData) !== "object") {
        return formData;
      }

      var data = _pick(formData, fields);

      if (Array.isArray(formData)) {
        return Object.keys(data).map(function (key) {
          return data[key];
        });
      }

      return data;
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldNames", function (pathSchema, formData) {
      var getAllPaths = function getAllPaths(_obj) {
        var acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [""];
        Object.keys(_obj).forEach(function (key) {
          if (_typeof(_obj[key]) === "object") {
            var newPaths = paths.map(function (path) {
              return "".concat(path, ".").concat(key);
            }); // If an object is marked with additionalProperties, all its keys are valid

            if (_obj[key].__rjsf_additionalProperties && _obj[key].$name !== "") {
              acc.push(_obj[key].$name);
            } else {
              getAllPaths(_obj[key], acc, newPaths);
            }
          } else if (key === "$name" && _obj[key] !== "") {
            paths.forEach(function (path) {
              path = path.replace(/^\./, "");

              var formValue = _get(formData, path); // adds path to fieldNames if it points to a value
              // or an empty object/array


              if (_typeof(formValue) !== "object" || _isEmpty(formValue)) {
                acc.push(path);
              }
            });
          }
        });
        return acc;
      };

      return getAllPaths(pathSchema);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (formData, newErrorSchema) {
      if (isObject(formData) || Array.isArray(formData)) {
        var newState = _this.getStateFromProps(_this.props, formData);

        formData = newState.formData;
      }

      var mustValidate = !_this.props.noValidate && _this.props.liveValidate;
      var state = {
        formData: formData
      };
      var newFormData = formData;

      if (_this.props.omitExtraData === true && _this.props.liveOmit === true) {
        var retrievedSchema = retrieveSchema(_this.state.schema, _this.state.schema, formData);
        var pathSchema = toPathSchema(retrievedSchema, "", _this.state.schema, formData);

        var fieldNames = _this.getFieldNames(pathSchema, formData);

        newFormData = _this.getUsedFormData(formData, fieldNames);
        state = {
          formData: newFormData
        };
      }

      if (mustValidate) {
        var schemaValidation = _this.validate(newFormData);

        var errors = schemaValidation.errors;
        var errorSchema = schemaValidation.errorSchema;
        var schemaValidationErrors = errors;
        var schemaValidationErrorSchema = errorSchema;

        if (_this.props.extraErrors) {
          errorSchema = mergeObjects(errorSchema, _this.props.extraErrors, !!"concat arrays");
          errors = toErrorList(errorSchema);
        }

        state = {
          formData: newFormData,
          errors: errors,
          errorSchema: errorSchema,
          schemaValidationErrors: schemaValidationErrors,
          schemaValidationErrorSchema: schemaValidationErrorSchema
        };
      } else if (!_this.props.noValidate && newErrorSchema) {
        var _errorSchema = _this.props.extraErrors ? mergeObjects(newErrorSchema, _this.props.extraErrors, !!"concat arrays") : newErrorSchema;

        state = {
          formData: newFormData,
          errorSchema: _errorSchema,
          errors: toErrorList(_errorSchema)
        };
      }

      _this.setState(state, function () {
        return _this.props.onChange && _this.props.onChange(_this.state);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      if (_this.props.onBlur) {
        var _this$props;

        (_this$props = _this.props).onBlur.apply(_this$props, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      if (_this.props.onFocus) {
        var _this$props2;

        (_this$props2 = _this.props).onFocus.apply(_this$props2, arguments);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (event) {
      event.preventDefault();

      if (event.target !== event.currentTarget) {
        return;
      }

      event.persist();
      var newFormData = _this.state.formData;

      if (_this.props.omitExtraData === true) {
        var retrievedSchema = retrieveSchema(_this.state.schema, _this.state.schema, newFormData);
        var pathSchema = toPathSchema(retrievedSchema, "", _this.state.schema, newFormData);

        var fieldNames = _this.getFieldNames(pathSchema, newFormData);

        newFormData = _this.getUsedFormData(newFormData, fieldNames);
      }

      if (!_this.props.noValidate) {
        var schemaValidation = _this.validate(newFormData);

        var _errors = schemaValidation.errors;
        var _errorSchema2 = schemaValidation.errorSchema;
        var schemaValidationErrors = _errors;
        var schemaValidationErrorSchema = _errorSchema2;

        if (Object.keys(_errors).length > 0) {
          if (_this.props.extraErrors) {
            _errorSchema2 = mergeObjects(_errorSchema2, _this.props.extraErrors, !!"concat arrays");
            _errors = toErrorList(_errorSchema2);
          }

          _this.setState({
            errors: _errors,
            errorSchema: _errorSchema2,
            schemaValidationErrors: schemaValidationErrors,
            schemaValidationErrorSchema: schemaValidationErrorSchema
          }, function () {
            if (_this.props.onError) {
              _this.props.onError(_errors);
            } else {
              console.error("Form validation failed", _errors);
            }
          });

          return;
        }
      } // There are no errors generated through schema validation.
      // Check for user provided errors and update state accordingly.


      var errorSchema;
      var errors;

      if (_this.props.extraErrors) {
        errorSchema = _this.props.extraErrors;
        errors = toErrorList(errorSchema);
      } else {
        errorSchema = {};
        errors = [];
      }

      _this.setState({
        formData: newFormData,
        errors: errors,
        errorSchema: errorSchema,
        schemaValidationErrors: [],
        schemaValidationErrorSchema: {}
      }, function () {
        if (_this.props.onSubmit) {
          _this.props.onSubmit(_objectSpread({}, _this.state, {
            formData: newFormData,
            status: "submitted"
          }), event);
        }
      });
    });

    _this.state = _this.getStateFromProps(props, props.formData);

    if (_this.props.onChange && !deepEquals(_this.state.formData, _this.props.formData)) {
      _this.props.onChange(_this.state);
    }

    _this.formElement = null;
    return _this;
  }

  _createClass(Form, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var nextState = this.getStateFromProps(nextProps, nextProps.formData);

      if (!deepEquals(nextState.formData, nextProps.formData) && !deepEquals(nextState.formData, this.state.formData) && this.props.onChange) {
        this.props.onChange(nextState);
      }

      this.setState(nextState);
    }
  }, {
    key: "getStateFromProps",
    value: function getStateFromProps(props, inputFormData) {
      var state = this.state || {};
      var schema = "schema" in props ? props.schema : this.props.schema;
      var uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
      var edit = typeof inputFormData !== "undefined";
      var liveValidate = "liveValidate" in props ? props.liveValidate : this.props.liveValidate;
      var mustValidate = edit && !props.noValidate && liveValidate;
      var rootSchema = schema;
      var formData = getDefaultFormState(schema, inputFormData, rootSchema);
      var retrievedSchema = retrieveSchema(schema, rootSchema, formData);
      var customFormats = props.customFormats;
      var additionalMetaSchemas = props.additionalMetaSchemas;

      var getCurrentErrors = function getCurrentErrors() {
        if (props.noValidate) {
          return {
            errors: [],
            errorSchema: {}
          };
        } else if (!props.liveValidate) {
          return {
            errors: state.schemaValidationErrors || [],
            errorSchema: state.schemaValidationErrorSchema || {}
          };
        }

        return {
          errors: state.errors || [],
          errorSchema: state.errorSchema || {}
        };
      };

      var errors, errorSchema, schemaValidationErrors, schemaValidationErrorSchema;

      if (mustValidate) {
        var schemaValidation = this.validate(formData, schema, additionalMetaSchemas, customFormats);
        errors = schemaValidation.errors;
        errorSchema = schemaValidation.errorSchema;
        schemaValidationErrors = errors;
        schemaValidationErrorSchema = errorSchema;
      } else {
        var currentErrors = getCurrentErrors();
        errors = currentErrors.errors;
        errorSchema = currentErrors.errorSchema;
        schemaValidationErrors = state.schemaValidationErrors;
        schemaValidationErrorSchema = state.schemaValidationErrorSchema;
      }

      if (props.extraErrors) {
        errorSchema = mergeObjects(errorSchema, props.extraErrors, !!"concat arrays");
        errors = toErrorList(errorSchema);
      }

      var idSchema = toIdSchema(retrievedSchema, uiSchema["ui:rootFieldId"], rootSchema, formData, props.idPrefix);
      var nextState = {
        schema: schema,
        uiSchema: uiSchema,
        idSchema: idSchema,
        formData: formData,
        edit: edit,
        errors: errors,
        errorSchema: errorSchema,
        additionalMetaSchemas: additionalMetaSchemas
      };

      if (schemaValidationErrors) {
        nextState.schemaValidationErrors = schemaValidationErrors;
        nextState.schemaValidationErrorSchema = schemaValidationErrorSchema;
      }

      return nextState;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shouldRender(this, nextProps, nextState);
    }
  }, {
    key: "validate",
    value: function validate(formData) {
      var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.schema;
      var additionalMetaSchemas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.additionalMetaSchemas;
      var customFormats = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.props.customFormats;
      var _this$props3 = this.props,
          validate = _this$props3.validate,
          transformErrors = _this$props3.transformErrors;

      var _this$getRegistry = this.getRegistry(),
          rootSchema = _this$getRegistry.rootSchema;

      var resolvedSchema = retrieveSchema(schema, rootSchema, formData);
      return validateFormData(formData, resolvedSchema, validate, transformErrors, additionalMetaSchemas, customFormats);
    }
  }, {
    key: "renderErrors",
    value: function renderErrors() {
      var _this$state = this.state,
          errors = _this$state.errors,
          errorSchema = _this$state.errorSchema,
          schema = _this$state.schema,
          uiSchema = _this$state.uiSchema;
      var _this$props4 = this.props,
          ErrorList = _this$props4.ErrorList,
          showErrorList = _this$props4.showErrorList,
          formContext = _this$props4.formContext;

      if (errors.length && showErrorList != false) {
        return React.createElement(ErrorList, {
          errors: errors,
          errorSchema: errorSchema,
          schema: schema,
          uiSchema: uiSchema,
          formContext: formContext
        });
      }

      return null;
    }
  }, {
    key: "getRegistry",
    value: function getRegistry() {
      // For BC, accept passed SchemaField and TitleField props and pass them to
      // the "fields" registry one.
      var _getDefaultRegistry = getDefaultRegistry(),
          fields = _getDefaultRegistry.fields,
          widgets = _getDefaultRegistry.widgets;

      return {
        fields: _objectSpread({}, fields, this.props.fields),
        widgets: _objectSpread({}, widgets, this.props.widgets),
        ArrayFieldTemplate: this.props.ArrayFieldTemplate,
        ObjectFieldTemplate: this.props.ObjectFieldTemplate,
        FieldTemplate: this.props.FieldTemplate,
        definitions: this.props.schema.definitions || {},
        rootSchema: this.props.schema,
        formContext: this.props.formContext || {}
      };
    }
  }, {
    key: "submit",
    value: function submit() {
      if (this.formElement) {
        this.formElement.dispatchEvent(new CustomEvent("submit", {
          cancelable: true
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          children = _this$props5.children,
          id = _this$props5.id,
          idPrefix = _this$props5.idPrefix,
          className = _this$props5.className,
          tagName = _this$props5.tagName,
          name = _this$props5.name,
          method = _this$props5.method,
          target = _this$props5.target,
          action = _this$props5.action,
          deprecatedAutocomplete = _this$props5.autocomplete,
          currentAutoComplete = _this$props5.autoComplete,
          enctype = _this$props5.enctype,
          acceptcharset = _this$props5.acceptcharset,
          noHtml5Validate = _this$props5.noHtml5Validate,
          disabled = _this$props5.disabled,
          readonly = _this$props5.readonly,
          formContext = _this$props5.formContext;
      var _this$state2 = this.state,
          schema = _this$state2.schema,
          uiSchema = _this$state2.uiSchema,
          formData = _this$state2.formData,
          errorSchema = _this$state2.errorSchema,
          idSchema = _this$state2.idSchema;
      var registry = this.getRegistry();
      var _SchemaField = registry.fields.SchemaField;
      var FormTag = tagName ? tagName : "form";

      if (deprecatedAutocomplete) {
        console.warn("Using autocomplete property of Form is deprecated, use autoComplete instead.");
      }

      var autoComplete = currentAutoComplete ? currentAutoComplete : deprecatedAutocomplete;
      return React.createElement(FormTag, {
        className: className ? className : "rjsf",
        id: id,
        name: name,
        method: method,
        target: target,
        action: action,
        autoComplete: autoComplete,
        encType: enctype,
        acceptCharset: acceptcharset,
        noValidate: noHtml5Validate,
        onSubmit: this.onSubmit,
        ref: function ref(form) {
          _this2.formElement = form;
        }
      }, this.renderErrors(), React.createElement(_SchemaField, {
        schema: schema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        formContext: formContext,
        formData: formData,
        onChange: this.onChange,
        onBlur: this.onBlur,
        onFocus: this.onFocus,
        registry: registry,
        disabled: disabled,
        readonly: readonly
      }), children ? children : React.createElement("div", null, React.createElement("button", {
        type: "submit",
        className: "btn btn-info"
      }, "Submit")));
    }
  }]);

  return Form;
}(Component);

_defineProperty(Form, "defaultProps", {
  uiSchema: {},
  noValidate: false,
  liveValidate: false,
  disabled: false,
  readonly: false,
  noHtml5Validate: false,
  ErrorList: DefaultErrorList,
  omitExtraData: false
});

export { Form as default };

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    widgets: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    fields: PropTypes.objectOf(PropTypes.elementType),
    ArrayFieldTemplate: PropTypes.elementType,
    ObjectFieldTemplate: PropTypes.elementType,
    FieldTemplate: PropTypes.elementType,
    ErrorList: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    showErrorList: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    tagName: PropTypes.elementType,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    autoComplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    noHtml5Validate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    validate: PropTypes.func,
    transformErrors: PropTypes.func,
    formContext: PropTypes.object,
    customFormats: PropTypes.object,
    additionalMetaSchemas: PropTypes.arrayOf(PropTypes.object),
    omitExtraData: PropTypes.bool,
    extraErrors: PropTypes.object
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJfcGljayIsIl9nZXQiLCJfaXNFbXB0eSIsImRlZmF1bHQiLCJEZWZhdWx0RXJyb3JMaXN0IiwiZ2V0RGVmYXVsdEZvcm1TdGF0ZSIsInJldHJpZXZlU2NoZW1hIiwic2hvdWxkUmVuZGVyIiwidG9JZFNjaGVtYSIsImdldERlZmF1bHRSZWdpc3RyeSIsImRlZXBFcXVhbHMiLCJ0b1BhdGhTY2hlbWEiLCJpc09iamVjdCIsInZhbGlkYXRlRm9ybURhdGEiLCJ0b0Vycm9yTGlzdCIsIm1lcmdlT2JqZWN0cyIsIkZvcm0iLCJwcm9wcyIsImZvcm1EYXRhIiwiZmllbGRzIiwibGVuZ3RoIiwiZGF0YSIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJwYXRoU2NoZW1hIiwiZ2V0QWxsUGF0aHMiLCJfb2JqIiwiYWNjIiwicGF0aHMiLCJmb3JFYWNoIiwibmV3UGF0aHMiLCJwYXRoIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiJG5hbWUiLCJwdXNoIiwicmVwbGFjZSIsImZvcm1WYWx1ZSIsIm5ld0Vycm9yU2NoZW1hIiwibmV3U3RhdGUiLCJnZXRTdGF0ZUZyb21Qcm9wcyIsIm11c3RWYWxpZGF0ZSIsIm5vVmFsaWRhdGUiLCJsaXZlVmFsaWRhdGUiLCJzdGF0ZSIsIm5ld0Zvcm1EYXRhIiwib21pdEV4dHJhRGF0YSIsImxpdmVPbWl0IiwicmV0cmlldmVkU2NoZW1hIiwic2NoZW1hIiwiZmllbGROYW1lcyIsImdldEZpZWxkTmFtZXMiLCJnZXRVc2VkRm9ybURhdGEiLCJzY2hlbWFWYWxpZGF0aW9uIiwidmFsaWRhdGUiLCJlcnJvcnMiLCJlcnJvclNjaGVtYSIsInNjaGVtYVZhbGlkYXRpb25FcnJvcnMiLCJzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEiLCJleHRyYUVycm9ycyIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJvbkJsdXIiLCJvbkZvY3VzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJwZXJzaXN0Iiwib25FcnJvciIsImNvbnNvbGUiLCJlcnJvciIsIm9uU3VibWl0Iiwic3RhdHVzIiwiZm9ybUVsZW1lbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJpbnB1dEZvcm1EYXRhIiwidWlTY2hlbWEiLCJlZGl0Iiwicm9vdFNjaGVtYSIsImN1c3RvbUZvcm1hdHMiLCJhZGRpdGlvbmFsTWV0YVNjaGVtYXMiLCJnZXRDdXJyZW50RXJyb3JzIiwiY3VycmVudEVycm9ycyIsImlkU2NoZW1hIiwiaWRQcmVmaXgiLCJ0cmFuc2Zvcm1FcnJvcnMiLCJnZXRSZWdpc3RyeSIsInJlc29sdmVkU2NoZW1hIiwiRXJyb3JMaXN0Iiwic2hvd0Vycm9yTGlzdCIsImZvcm1Db250ZXh0Iiwid2lkZ2V0cyIsIkFycmF5RmllbGRUZW1wbGF0ZSIsIk9iamVjdEZpZWxkVGVtcGxhdGUiLCJGaWVsZFRlbXBsYXRlIiwiZGVmaW5pdGlvbnMiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJjYW5jZWxhYmxlIiwiY2hpbGRyZW4iLCJpZCIsImNsYXNzTmFtZSIsInRhZ05hbWUiLCJuYW1lIiwibWV0aG9kIiwiYWN0aW9uIiwiZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSIsImF1dG9jb21wbGV0ZSIsImN1cnJlbnRBdXRvQ29tcGxldGUiLCJhdXRvQ29tcGxldGUiLCJlbmN0eXBlIiwiYWNjZXB0Y2hhcnNldCIsIm5vSHRtbDVWYWxpZGF0ZSIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJyZWdpc3RyeSIsIl9TY2hlbWFGaWVsZCIsIlNjaGVtYUZpZWxkIiwiRm9ybVRhZyIsIndhcm4iLCJmb3JtIiwicmVuZGVyRXJyb3JzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImFueSIsImJvb2wiLCJvYmplY3RPZiIsIm9uZU9mVHlwZSIsImZ1bmMiLCJlbGVtZW50VHlwZSIsInN0cmluZyIsImFycmF5T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxLQUFQLE1BQWtCLGFBQWxCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixZQUFqQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsZ0JBQXJCO0FBRUEsU0FBU0MsT0FBTyxJQUFJQyxnQkFBcEIsUUFBNEMsYUFBNUM7QUFDQSxTQUNFQyxtQkFERixFQUVFQyxjQUZGLEVBR0VDLFlBSEYsRUFJRUMsVUFKRixFQUtFQyxrQkFMRixFQU1FQyxVQU5GLEVBT0VDLFlBUEYsRUFRRUMsUUFSRixRQVNPLFVBVFA7QUFVQSxPQUFPQyxnQkFBUCxJQUEyQkMsV0FBM0IsUUFBOEMsYUFBOUM7QUFDQSxTQUFTQyxZQUFULFFBQTZCLFVBQTdCOztJQUVxQkMsSTs7Ozs7QUFZbkIsZ0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIsOEVBQU1BLEtBQU47O0FBRGlCLHNFQW9KRCxVQUFDQyxRQUFELEVBQVdDLE1BQVgsRUFBc0I7QUFDdEM7QUFDQSxVQUFJQSxNQUFNLENBQUNDLE1BQVAsS0FBa0IsQ0FBbEIsSUFBdUIsUUFBT0YsUUFBUCxNQUFvQixRQUEvQyxFQUF5RDtBQUN2RCxlQUFPQSxRQUFQO0FBQ0Q7O0FBRUQsVUFBSUcsSUFBSSxHQUFHckIsS0FBSyxDQUFDa0IsUUFBRCxFQUFXQyxNQUFYLENBQWhCOztBQUNBLFVBQUlHLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxRQUFkLENBQUosRUFBNkI7QUFDM0IsZUFBT00sTUFBTSxDQUFDQyxJQUFQLENBQVlKLElBQVosRUFBa0JLLEdBQWxCLENBQXNCLFVBQUFDLEdBQUc7QUFBQSxpQkFBSU4sSUFBSSxDQUFDTSxHQUFELENBQVI7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QWtCN0ksU0FBUyxDQUFDb0ksTUFBNUIsQ0FwQ1I7QUFxQ2ZsRixJQUFBQSxhQUFhLEVBQUVsRCxTQUFTLENBQUN1SSxJQXJDVjtBQXNDZnhFLElBQUFBLFdBQVcsRUFBRS9ELFNBQVMsQ0FBQ29JO0FBdENSLEdBQWpCO0FBd0NEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IF9waWNrIGZyb20gXCJsb2Rhc2gvcGlja1wiO1xuaW1wb3J0IF9nZXQgZnJvbSBcImxvZGFzaC9nZXRcIjtcbmltcG9ydCBfaXNFbXB0eSBmcm9tIFwibG9kYXNoL2lzRW1wdHlcIjtcblxuaW1wb3J0IHsgZGVmYXVsdCBhcyBEZWZhdWx0RXJyb3JMaXN0IH0gZnJvbSBcIi4vRXJyb3JMaXN0XCI7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxuICByZXRyaWV2ZVNjaGVtYSxcbiAgc2hvdWxkUmVuZGVyLFxuICB0b0lkU2NoZW1hLFxuICBnZXREZWZhdWx0UmVnaXN0cnksXG4gIGRlZXBFcXVhbHMsXG4gIHRvUGF0aFNjaGVtYSxcbiAgaXNPYmplY3QsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgdG9FcnJvckxpc3QgfSBmcm9tIFwiLi4vdmFsaWRhdGVcIjtcbmltcG9ydCB7IG1lcmdlT2JqZWN0cyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB1aVNjaGVtYToge30sXG4gICAgbm9WYWxpZGF0ZTogZmFsc2UsXG4gICAgbGl2ZVZhbGlkYXRlOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgIG5vSHRtbDVWYWxpZGF0ZTogZmFsc2UsXG4gICAgRXJyb3JMaXN0OiBEZWZhdWx0RXJyb3JMaXN0LFxuICAgIG9taXRFeHRyYURhdGE6IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBwcm9wcy5mb3JtRGF0YSk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJlxuICAgICAgIWRlZXBFcXVhbHModGhpcy5zdGF0ZS5mb3JtRGF0YSwgdGhpcy5wcm9wcy5mb3JtRGF0YSlcbiAgICApIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuZm9ybUVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIG5leHRQcm9wcy5mb3JtRGF0YSk7XG4gICAgaWYgKFxuICAgICAgIWRlZXBFcXVhbHMobmV4dFN0YXRlLmZvcm1EYXRhLCBuZXh0UHJvcHMuZm9ybURhdGEpICYmXG4gICAgICAhZGVlcEVxdWFscyhuZXh0U3RhdGUuZm9ybURhdGEsIHRoaXMuc3RhdGUuZm9ybURhdGEpICYmXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlXG4gICAgKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5leHRTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfVxuXG4gIGdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBpbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlIHx8IHt9O1xuICAgIGNvbnN0IHNjaGVtYSA9IFwic2NoZW1hXCIgaW4gcHJvcHMgPyBwcm9wcy5zY2hlbWEgOiB0aGlzLnByb3BzLnNjaGVtYTtcbiAgICBjb25zdCB1aVNjaGVtYSA9IFwidWlTY2hlbWFcIiBpbiBwcm9wcyA/IHByb3BzLnVpU2NoZW1hIDogdGhpcy5wcm9wcy51aVNjaGVtYTtcbiAgICBjb25zdCBlZGl0ID0gdHlwZW9mIGlucHV0Rm9ybURhdGEgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgbGl2ZVZhbGlkYXRlID1cbiAgICAgIFwibGl2ZVZhbGlkYXRlXCIgaW4gcHJvcHMgPyBwcm9wcy5saXZlVmFsaWRhdGUgOiB0aGlzLnByb3BzLmxpdmVWYWxpZGF0ZTtcbiAgICBjb25zdCBtdXN0VmFsaWRhdGUgPSBlZGl0ICYmICFwcm9wcy5ub1ZhbGlkYXRlICYmIGxpdmVWYWxpZGF0ZTtcbiAgICBjb25zdCByb290U2NoZW1hID0gc2NoZW1hO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gZ2V0RGVmYXVsdEZvcm1TdGF0ZShzY2hlbWEsIGlucHV0Rm9ybURhdGEsIHJvb3RTY2hlbWEpO1xuICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIGNvbnN0IGN1c3RvbUZvcm1hdHMgPSBwcm9wcy5jdXN0b21Gb3JtYXRzO1xuICAgIGNvbnN0IGFkZGl0aW9uYWxNZXRhU2NoZW1hcyA9IHByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcztcblxuICAgIGNvbnN0IGdldEN1cnJlbnRFcnJvcnMgPSAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubm9WYWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcnM6IFtdLCBlcnJvclNjaGVtYToge30gfTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb3BzLmxpdmVWYWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVycm9yczogc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycyB8fCBbXSxcbiAgICAgICAgICBlcnJvclNjaGVtYTogc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hIHx8IHt9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZXJyb3JzOiBzdGF0ZS5lcnJvcnMgfHwgW10sXG4gICAgICAgIGVycm9yU2NoZW1hOiBzdGF0ZS5lcnJvclNjaGVtYSB8fCB7fSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGxldCBlcnJvcnMsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE7XG4gICAgaWYgKG11c3RWYWxpZGF0ZSkge1xuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoXG4gICAgICAgIGZvcm1EYXRhLFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcbiAgICAgICAgY3VzdG9tRm9ybWF0c1xuICAgICAgKTtcbiAgICAgIGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xuICAgICAgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXJyZW50RXJyb3JzID0gZ2V0Q3VycmVudEVycm9ycygpO1xuICAgICAgZXJyb3JzID0gY3VycmVudEVycm9ycy5lcnJvcnM7XG4gICAgICBlcnJvclNjaGVtYSA9IGN1cnJlbnRFcnJvcnMuZXJyb3JTY2hlbWE7XG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcbiAgICB9XG4gICAgaWYgKHByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcbiAgICAgICAgZXJyb3JTY2hlbWEsXG4gICAgICAgIHByb3BzLmV4dHJhRXJyb3JzLFxuICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXG4gICAgICApO1xuICAgICAgZXJyb3JzID0gdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpO1xuICAgIH1cbiAgICBjb25zdCBpZFNjaGVtYSA9IHRvSWRTY2hlbWEoXG4gICAgICByZXRyaWV2ZWRTY2hlbWEsXG4gICAgICB1aVNjaGVtYVtcInVpOnJvb3RGaWVsZElkXCJdLFxuICAgICAgcm9vdFNjaGVtYSxcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgcHJvcHMuaWRQcmVmaXhcbiAgICApO1xuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNjaGVtYSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgaWRTY2hlbWEsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGVkaXQsXG4gICAgICBlcnJvcnMsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcbiAgICB9O1xuICAgIGlmIChzY2hlbWFWYWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgICBuZXh0U3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb25FcnJvcnM7XG4gICAgICBuZXh0U3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuIHNob3VsZFJlbmRlcih0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gIH1cblxuICB2YWxpZGF0ZShcbiAgICBmb3JtRGF0YSxcbiAgICBzY2hlbWEgPSB0aGlzLnByb3BzLnNjaGVtYSxcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgPSB0aGlzLnByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcbiAgICBjdXN0b21Gb3JtYXRzID0gdGhpcy5wcm9wcy5jdXN0b21Gb3JtYXRzXG4gICkge1xuICAgIGNvbnN0IHsgdmFsaWRhdGUsIHRyYW5zZm9ybUVycm9ycyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcbiAgICBjb25zdCByZXNvbHZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIHJldHVybiB2YWxpZGF0ZUZvcm1EYXRhKFxuICAgICAgZm9ybURhdGEsXG4gICAgICByZXNvbHZlZFNjaGVtYSxcbiAgICAgIHZhbGlkYXRlLFxuICAgICAgdHJhbnNmb3JtRXJyb3JzLFxuICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxuICAgICAgY3VzdG9tRm9ybWF0c1xuICAgICk7XG4gIH1cblxuICByZW5kZXJFcnJvcnMoKSB7XG4gICAgY29uc3QgeyBlcnJvcnMsIGVycm9yU2NoZW1hLCBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgRXJyb3JMaXN0LCBzaG93RXJyb3JMaXN0LCBmb3JtQ29udGV4dCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChlcnJvcnMubGVuZ3RoICYmIHNob3dFcnJvckxpc3QgIT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvckxpc3RcbiAgICAgICAgICBlcnJvcnM9e2Vycm9yc31cbiAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0VXNlZEZvcm1EYXRhID0gKGZvcm1EYXRhLCBmaWVsZHMpID0+IHtcbiAgICAvL2ZvciB0aGUgY2FzZSBvZiBhIHNpbmdsZSBpbnB1dCBmb3JtXG4gICAgaWYgKGZpZWxkcy5sZW5ndGggPT09IDAgJiYgdHlwZW9mIGZvcm1EYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBfcGljayhmb3JtRGF0YSwgZmllbGRzKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5tYXAoa2V5ID0+IGRhdGFba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgZ2V0RmllbGROYW1lcyA9IChwYXRoU2NoZW1hLCBmb3JtRGF0YSkgPT4ge1xuICAgIGNvbnN0IGdldEFsbFBhdGhzID0gKF9vYmosIGFjYyA9IFtdLCBwYXRocyA9IFtcIlwiXSkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIF9vYmpba2V5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGxldCBuZXdQYXRocyA9IHBhdGhzLm1hcChwYXRoID0+IGAke3BhdGh9LiR7a2V5fWApO1xuICAgICAgICAgIC8vIElmIGFuIG9iamVjdCBpcyBtYXJrZWQgd2l0aCBhZGRpdGlvbmFsUHJvcGVydGllcywgYWxsIGl0cyBrZXlzIGFyZSB2YWxpZFxuICAgICAgICAgIGlmIChfb2JqW2tleV0uX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzICYmIF9vYmpba2V5XS4kbmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgYWNjLnB1c2goX29ialtrZXldLiRuYW1lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0QWxsUGF0aHMoX29ialtrZXldLCBhY2MsIG5ld1BhdGhzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIiRuYW1lXCIgJiYgX29ialtrZXldICE9PSBcIlwiKSB7XG4gICAgICAgICAgcGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC4vLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IF9nZXQoZm9ybURhdGEsIHBhdGgpO1xuICAgICAgICAgICAgLy8gYWRkcyBwYXRoIHRvIGZpZWxkTmFtZXMgaWYgaXQgcG9pbnRzIHRvIGEgdmFsdWVcbiAgICAgICAgICAgIC8vIG9yIGFuIGVtcHR5IG9iamVjdC9hcnJheVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtVmFsdWUgIT09IFwib2JqZWN0XCIgfHwgX2lzRW1wdHkoZm9ybVZhbHVlKSkge1xuICAgICAgICAgICAgICBhY2MucHVzaChwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG5cbiAgICByZXR1cm4gZ2V0QWxsUGF0aHMocGF0aFNjaGVtYSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoZm9ybURhdGEsIG5ld0Vycm9yU2NoZW1hKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KGZvcm1EYXRhKSB8fCBBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIGZvcm1EYXRhKTtcbiAgICAgIGZvcm1EYXRhID0gbmV3U3RhdGUuZm9ybURhdGE7XG4gICAgfVxuICAgIGNvbnN0IG11c3RWYWxpZGF0ZSA9ICF0aGlzLnByb3BzLm5vVmFsaWRhdGUgJiYgdGhpcy5wcm9wcy5saXZlVmFsaWRhdGU7XG4gICAgbGV0IHN0YXRlID0geyBmb3JtRGF0YSB9O1xuICAgIGxldCBuZXdGb3JtRGF0YSA9IGZvcm1EYXRhO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub21pdEV4dHJhRGF0YSA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLmxpdmVPbWl0ID09PSB0cnVlKSB7XG4gICAgICBjb25zdCByZXRyaWV2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxuICAgICAgICBmb3JtRGF0YVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXG4gICAgICAgIHJldHJpZXZlZFNjaGVtYSxcbiAgICAgICAgXCJcIixcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgIGZvcm1EYXRhXG4gICAgICApO1xuXG4gICAgICBjb25zdCBmaWVsZE5hbWVzID0gdGhpcy5nZXRGaWVsZE5hbWVzKHBhdGhTY2hlbWEsIGZvcm1EYXRhKTtcblxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShmb3JtRGF0YSwgZmllbGROYW1lcyk7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobXVzdFZhbGlkYXRlKSB7XG4gICAgICBsZXQgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUobmV3Rm9ybURhdGEpO1xuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xuICAgICAgbGV0IGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBlcnJvcnM7XG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxuICAgICAgICAgIGVycm9yU2NoZW1hLFxuICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXG4gICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxuICAgICAgICApO1xuICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XG4gICAgICB9XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxuICAgICAgICBlcnJvcnMsXG4gICAgICAgIGVycm9yU2NoZW1hLFxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzLFxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSAmJiBuZXdFcnJvclNjaGVtYSkge1xuICAgICAgY29uc3QgZXJyb3JTY2hlbWEgPSB0aGlzLnByb3BzLmV4dHJhRXJyb3JzXG4gICAgICAgID8gbWVyZ2VPYmplY3RzKFxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWEsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmV4dHJhRXJyb3JzLFxuICAgICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxuICAgICAgICAgIClcbiAgICAgICAgOiBuZXdFcnJvclNjaGVtYTtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXG4gICAgICAgIGVycm9yU2NoZW1hOiBlcnJvclNjaGVtYSxcbiAgICAgICAgZXJyb3JzOiB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSksXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgc3RhdGUsXG4gICAgICAoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlICYmIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZSlcbiAgICApO1xuICB9O1xuXG4gIG9uQmx1ciA9ICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1ciguLi5hcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgb25Gb2N1cyA9ICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKC4uLmFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBvblN1Ym1pdCA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gdGhpcy5zdGF0ZS5mb3JtRGF0YTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9taXRFeHRyYURhdGEgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgIG5ld0Zvcm1EYXRhXG4gICAgICApO1xuICAgICAgY29uc3QgcGF0aFNjaGVtYSA9IHRvUGF0aFNjaGVtYShcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxuICAgICAgICBcIlwiLFxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcbiAgICAgICAgbmV3Rm9ybURhdGFcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgbmV3Rm9ybURhdGEpO1xuXG4gICAgICBuZXdGb3JtRGF0YSA9IHRoaXMuZ2V0VXNlZEZvcm1EYXRhKG5ld0Zvcm1EYXRhLCBmaWVsZE5hbWVzKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSkge1xuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcbiAgICAgIGxldCBlcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9ycztcbiAgICAgIGxldCBlcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JTY2hlbWE7XG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICAgICAgZXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXG4gICAgICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXG4gICAgICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkVycm9yKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMub25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZvcm0gdmFsaWRhdGlvbiBmYWlsZWRcIiwgZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGVyZSBhcmUgbm8gZXJyb3JzIGdlbmVyYXRlZCB0aHJvdWdoIHNjaGVtYSB2YWxpZGF0aW9uLlxuICAgIC8vIENoZWNrIGZvciB1c2VyIHByb3ZpZGVkIGVycm9ycyBhbmQgdXBkYXRlIHN0YXRlIGFjY29yZGluZ2x5LlxuICAgIGxldCBlcnJvclNjaGVtYTtcbiAgICBsZXQgZXJyb3JzO1xuICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnM7XG4gICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yU2NoZW1hID0ge307XG4gICAgICBlcnJvcnMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXG4gICAgICAgIGVycm9yczogZXJyb3JzLFxuICAgICAgICBlcnJvclNjaGVtYTogZXJyb3JTY2hlbWEsXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnM6IFtdLFxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE6IHt9LFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWJtaXQpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KFxuICAgICAgICAgICAgeyAuLi50aGlzLnN0YXRlLCBmb3JtRGF0YTogbmV3Rm9ybURhdGEsIHN0YXR1czogXCJzdWJtaXR0ZWRcIiB9LFxuICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICBnZXRSZWdpc3RyeSgpIHtcbiAgICAvLyBGb3IgQkMsIGFjY2VwdCBwYXNzZWQgU2NoZW1hRmllbGQgYW5kIFRpdGxlRmllbGQgcHJvcHMgYW5kIHBhc3MgdGhlbSB0b1xuICAgIC8vIHRoZSBcImZpZWxkc1wiIHJlZ2lzdHJ5IG9uZS5cbiAgICBjb25zdCB7IGZpZWxkcywgd2lkZ2V0cyB9ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkczogeyAuLi5maWVsZHMsIC4uLnRoaXMucHJvcHMuZmllbGRzIH0sXG4gICAgICB3aWRnZXRzOiB7IC4uLndpZGdldHMsIC4uLnRoaXMucHJvcHMud2lkZ2V0cyB9LFxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlOiB0aGlzLnByb3BzLkFycmF5RmllbGRUZW1wbGF0ZSxcbiAgICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuT2JqZWN0RmllbGRUZW1wbGF0ZSxcbiAgICAgIEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuRmllbGRUZW1wbGF0ZSxcbiAgICAgIGRlZmluaXRpb25zOiB0aGlzLnByb3BzLnNjaGVtYS5kZWZpbml0aW9ucyB8fCB7fSxcbiAgICAgIHJvb3RTY2hlbWE6IHRoaXMucHJvcHMuc2NoZW1hLFxuICAgICAgZm9ybUNvbnRleHQ6IHRoaXMucHJvcHMuZm9ybUNvbnRleHQgfHwge30sXG4gICAgfTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5mb3JtRWxlbWVudCkge1xuICAgICAgdGhpcy5mb3JtRWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJzdWJtaXRcIiwge1xuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGlkLFxuICAgICAgaWRQcmVmaXgsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICB0YWdOYW1lLFxuICAgICAgbmFtZSxcbiAgICAgIG1ldGhvZCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGFjdGlvbixcbiAgICAgIGF1dG9jb21wbGV0ZTogZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSxcbiAgICAgIGF1dG9Db21wbGV0ZTogY3VycmVudEF1dG9Db21wbGV0ZSxcbiAgICAgIGVuY3R5cGUsXG4gICAgICBhY2NlcHRjaGFyc2V0LFxuICAgICAgbm9IdG1sNVZhbGlkYXRlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICByZWFkb25seSxcbiAgICAgIGZvcm1Db250ZXh0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBzY2hlbWEsIHVpU2NoZW1hLCBmb3JtRGF0YSwgZXJyb3JTY2hlbWEsIGlkU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gdGhpcy5nZXRSZWdpc3RyeSgpO1xuICAgIGNvbnN0IF9TY2hlbWFGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5TY2hlbWFGaWVsZDtcbiAgICBjb25zdCBGb3JtVGFnID0gdGFnTmFtZSA/IHRhZ05hbWUgOiBcImZvcm1cIjtcbiAgICBpZiAoZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIlVzaW5nIGF1dG9jb21wbGV0ZSBwcm9wZXJ0eSBvZiBGb3JtIGlzIGRlcHJlY2F0ZWQsIHVzZSBhdXRvQ29tcGxldGUgaW5zdGVhZC5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgYXV0b0NvbXBsZXRlID0gY3VycmVudEF1dG9Db21wbGV0ZVxuICAgICAgPyBjdXJyZW50QXV0b0NvbXBsZXRlXG4gICAgICA6IGRlcHJlY2F0ZWRBdXRvY29tcGxldGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1UYWdcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiBcInJqc2ZcIn1cbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICBtZXRob2Q9e21ldGhvZH1cbiAgICAgICAgdGFyZ2V0PXt0YXJnZXR9XG4gICAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cbiAgICAgICAgZW5jVHlwZT17ZW5jdHlwZX1cbiAgICAgICAgYWNjZXB0Q2hhcnNldD17YWNjZXB0Y2hhcnNldH1cbiAgICAgICAgbm9WYWxpZGF0ZT17bm9IdG1sNVZhbGlkYXRlfVxuICAgICAgICBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH1cbiAgICAgICAgcmVmPXtmb3JtID0+IHtcbiAgICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybTtcbiAgICAgICAgfX0+XG4gICAgICAgIHt0aGlzLnJlbmRlckVycm9ycygpfVxuICAgICAgICA8X1NjaGVtYUZpZWxkXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cbiAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XG4gICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cbiAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1cn1cbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXN9XG4gICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XG4gICAgICAgIC8+XG4gICAgICAgIHtjaGlsZHJlbiA/IChcbiAgICAgICAgICBjaGlsZHJlblxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIj5cbiAgICAgICAgICAgICAgU3VibWl0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvRm9ybVRhZz5cbiAgICApO1xuICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgRm9ybS5wcm9wVHlwZXMgPSB7XG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pXG4gICAgKSxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuZWxlbWVudFR5cGUpLFxuICAgIEFycmF5RmllbGRUZW1wbGF0ZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxuICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcbiAgICBGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gICAgRXJyb3JMaXN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0Vycm9yTGlzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25TdWJtaXQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0YWdOYW1lOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtZXRob2Q6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvY29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuY3R5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWNjZXB0Y2hhcnNldDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBub1ZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBub0h0bWw1VmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxpdmVWYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsaWRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRyYW5zZm9ybUVycm9yczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY3VzdG9tRm9ybWF0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIG9taXRFeHRyYURhdGE6IFByb3BUeXBlcy5ib29sLFxuICAgIGV4dHJhRXJyb3JzOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xufVxuIl19