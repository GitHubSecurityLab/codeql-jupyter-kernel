"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _ErrorList = _interopRequireDefault(require("./ErrorList"));

var _utils = require("../utils");

var _validate = _interopRequireWildcard(require("../validate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

      var data = (0, _pick2["default"])(formData, fields);

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
              var formValue = (0, _get2["default"])(formData, path); // adds path to fieldNames if it points to a value
              // or an empty object/array

              if (_typeof(formValue) !== "object" || (0, _isEmpty2["default"])(formValue)) {
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
      if ((0, _utils.isObject)(formData) || Array.isArray(formData)) {
        var newState = _this.getStateFromProps(_this.props, formData);

        formData = newState.formData;
      }

      var mustValidate = !_this.props.noValidate && _this.props.liveValidate;
      var state = {
        formData: formData
      };
      var newFormData = formData;

      if (_this.props.omitExtraData === true && _this.props.liveOmit === true) {
        var retrievedSchema = (0, _utils.retrieveSchema)(_this.state.schema, _this.state.schema, formData);
        var pathSchema = (0, _utils.toPathSchema)(retrievedSchema, "", _this.state.schema, formData);

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
          errorSchema = (0, _utils.mergeObjects)(errorSchema, _this.props.extraErrors, !!"concat arrays");
          errors = (0, _validate.toErrorList)(errorSchema);
        }

        state = {
          formData: newFormData,
          errors: errors,
          errorSchema: errorSchema,
          schemaValidationErrors: schemaValidationErrors,
          schemaValidationErrorSchema: schemaValidationErrorSchema
        };
      } else if (!_this.props.noValidate && newErrorSchema) {
        var _errorSchema = _this.props.extraErrors ? (0, _utils.mergeObjects)(newErrorSchema, _this.props.extraErrors, !!"concat arrays") : newErrorSchema;

        state = {
          formData: newFormData,
          errorSchema: _errorSchema,
          errors: (0, _validate.toErrorList)(_errorSchema)
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
        var retrievedSchema = (0, _utils.retrieveSchema)(_this.state.schema, _this.state.schema, newFormData);
        var pathSchema = (0, _utils.toPathSchema)(retrievedSchema, "", _this.state.schema, newFormData);

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
            _errorSchema2 = (0, _utils.mergeObjects)(_errorSchema2, _this.props.extraErrors, !!"concat arrays");
            _errors = (0, _validate.toErrorList)(_errorSchema2);
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
        errors = (0, _validate.toErrorList)(errorSchema);
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

    if (_this.props.onChange && !(0, _utils.deepEquals)(_this.state.formData, _this.props.formData)) {
      _this.props.onChange(_this.state);
    }

    _this.formElement = null;
    return _this;
  }

  _createClass(Form, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var nextState = this.getStateFromProps(nextProps, nextProps.formData);

      if (!(0, _utils.deepEquals)(nextState.formData, nextProps.formData) && !(0, _utils.deepEquals)(nextState.formData, this.state.formData) && this.props.onChange) {
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
      var formData = (0, _utils.getDefaultFormState)(schema, inputFormData, rootSchema);
      var retrievedSchema = (0, _utils.retrieveSchema)(schema, rootSchema, formData);
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
        errorSchema = (0, _utils.mergeObjects)(errorSchema, props.extraErrors, !!"concat arrays");
        errors = (0, _validate.toErrorList)(errorSchema);
      }

      var idSchema = (0, _utils.toIdSchema)(retrievedSchema, uiSchema["ui:rootFieldId"], rootSchema, formData, props.idPrefix);
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
      return (0, _utils.shouldRender)(this, nextProps, nextState);
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

      var resolvedSchema = (0, _utils.retrieveSchema)(schema, rootSchema, formData);
      return (0, _validate["default"])(formData, resolvedSchema, validate, transformErrors, additionalMetaSchemas, customFormats);
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
        return _react["default"].createElement(ErrorList, {
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
      var _getDefaultRegistry = (0, _utils.getDefaultRegistry)(),
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
      return _react["default"].createElement(FormTag, {
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
      }, this.renderErrors(), _react["default"].createElement(_SchemaField, {
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
      }), children ? children : _react["default"].createElement("div", null, _react["default"].createElement("button", {
        type: "submit",
        className: "btn btn-info"
      }, "Submit")));
    }
  }]);

  return Form;
}(_react.Component);

exports["default"] = Form;

_defineProperty(Form, "defaultProps", {
  uiSchema: {},
  noValidate: false,
  liveValidate: false,
  disabled: false,
  readonly: false,
  noHtml5Validate: false,
  ErrorList: _ErrorList["default"],
  omitExtraData: false
});

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    uiSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    widgets: _propTypes["default"].objectOf(_propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].object])),
    fields: _propTypes["default"].objectOf(_propTypes["default"].elementType),
    ArrayFieldTemplate: _propTypes["default"].elementType,
    ObjectFieldTemplate: _propTypes["default"].elementType,
    FieldTemplate: _propTypes["default"].elementType,
    ErrorList: _propTypes["default"].func,
    onChange: _propTypes["default"].func,
    onError: _propTypes["default"].func,
    showErrorList: _propTypes["default"].bool,
    onSubmit: _propTypes["default"].func,
    id: _propTypes["default"].string,
    className: _propTypes["default"].string,
    tagName: _propTypes["default"].elementType,
    name: _propTypes["default"].string,
    method: _propTypes["default"].string,
    target: _propTypes["default"].string,
    action: _propTypes["default"].string,
    autocomplete: _propTypes["default"].string,
    autoComplete: _propTypes["default"].string,
    enctype: _propTypes["default"].string,
    acceptcharset: _propTypes["default"].string,
    noValidate: _propTypes["default"].bool,
    noHtml5Validate: _propTypes["default"].bool,
    liveValidate: _propTypes["default"].bool,
    validate: _propTypes["default"].func,
    transformErrors: _propTypes["default"].func,
    formContext: _propTypes["default"].object,
    customFormats: _propTypes["default"].object,
    additionalMetaSchemas: _propTypes["default"].arrayOf(_propTypes["default"].object),
    omitExtraData: _propTypes["default"].bool,
    extraErrors: _propTypes["default"].object
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Zvcm0uanMiXSwibmFtZXMiOlsiRm9ybSIsInByb3BzIiwiZm9ybURhdGEiLCJmaWVsZHMiLCJsZW5ndGgiLCJkYXRhIiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImtleSIsInBhdGhTY2hlbWEiLCJnZXRBbGxQYXRocyIsIl9vYmoiLCJhY2MiLCJwYXRocyIsImZvckVhY2giLCJuZXdQYXRocyIsInBhdGgiLCJfX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMiLCIkbmFtZSIsInB1c2giLCJyZXBsYWNlIiwiZm9ybVZhbHVlIiwibmV3RXJyb3JTY2hlbWEiLCJuZXdTdGF0ZSIsImdldFN0YXRlRnJvbVByb3BzIiwibXVzdFZhbGlkYXRlIiwibm9WYWxpZGF0ZSIsImxpdmVWYWxpZGF0ZSIsInN0YXRlIiwibmV3Rm9ybURhdGEiLCJvbWl0RXh0cmFEYXRhIiwibGl2ZU9taXQiLCJyZXRyaWV2ZWRTY2hlbWEiLCJzY2hlbWEiLCJmaWVsZE5hbWVzIiwiZ2V0RmllbGROYW1lcyIsImdldFVzZWRGb3JtRGF0YSIsInNjaGVtYVZhbGlkYXRpb24iLCJ2YWxpZGF0ZSIsImVycm9ycyIsImVycm9yU2NoZW1hIiwic2NoZW1hVmFsaWRhdGlvbkVycm9ycyIsInNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSIsImV4dHJhRXJyb3JzIiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsIm9uQmx1ciIsIm9uRm9jdXMiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsInBlcnNpc3QiLCJvbkVycm9yIiwiY29uc29sZSIsImVycm9yIiwib25TdWJtaXQiLCJzdGF0dXMiLCJmb3JtRWxlbWVudCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlucHV0Rm9ybURhdGEiLCJ1aVNjaGVtYSIsImVkaXQiLCJyb290U2NoZW1hIiwiY3VzdG9tRm9ybWF0cyIsImFkZGl0aW9uYWxNZXRhU2NoZW1hcyIsImdldEN1cnJlbnRFcnJvcnMiLCJjdXJyZW50RXJyb3JzIiwiaWRTY2hlbWEiLCJpZFByZWZpeCIsInRyYW5zZm9ybUVycm9ycyIsImdldFJlZ2lzdHJ5IiwicmVzb2x2ZWRTY2hlbWEiLCJFcnJvckxpc3QiLCJzaG93RXJyb3JMaXN0IiwiZm9ybUNvbnRleHQiLCJ3aWRnZXRzIiwiQXJyYXlGaWVsZFRlbXBsYXRlIiwiT2JqZWN0RmllbGRUZW1wbGF0ZSIsIkZpZWxkVGVtcGxhdGUiLCJkZWZpbml0aW9ucyIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImNhbmNlbGFibGUiLCJjaGlsZHJlbiIsImlkIiwiY2xhc3NOYW1lIiwidGFnTmFtZSIsIm5hbWUiLCJtZXRob2QiLCJhY3Rpb24iLCJkZXByZWNhdGVkQXV0b2NvbXBsZXRlIiwiYXV0b2NvbXBsZXRlIiwiY3VycmVudEF1dG9Db21wbGV0ZSIsImF1dG9Db21wbGV0ZSIsImVuY3R5cGUiLCJhY2NlcHRjaGFyc2V0Iiwibm9IdG1sNVZhbGlkYXRlIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsInJlZ2lzdHJ5IiwiX1NjaGVtYUZpZWxkIiwiU2NoZW1hRmllbGQiLCJGb3JtVGFnIiwid2FybiIsImZvcm0iLCJyZW5kZXJFcnJvcnMiLCJDb21wb25lbnQiLCJEZWZhdWx0RXJyb3JMaXN0IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImFueSIsImJvb2wiLCJvYmplY3RPZiIsIm9uZU9mVHlwZSIsImZ1bmMiLCJlbGVtZW50VHlwZSIsInN0cmluZyIsImFycmF5T2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdxQkEsSTs7Ozs7QUFZbkIsZ0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7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c0JBQVVJLElBckNWO0FBc0NmM0UsSUFBQUEsV0FBVyxFQUFFdUUsc0JBQVVDO0FBdENSLEdBQWpCO0FBd0NEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IF9waWNrIGZyb20gXCJsb2Rhc2gvcGlja1wiO1xuaW1wb3J0IF9nZXQgZnJvbSBcImxvZGFzaC9nZXRcIjtcbmltcG9ydCBfaXNFbXB0eSBmcm9tIFwibG9kYXNoL2lzRW1wdHlcIjtcblxuaW1wb3J0IHsgZGVmYXVsdCBhcyBEZWZhdWx0RXJyb3JMaXN0IH0gZnJvbSBcIi4vRXJyb3JMaXN0XCI7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxuICByZXRyaWV2ZVNjaGVtYSxcbiAgc2hvdWxkUmVuZGVyLFxuICB0b0lkU2NoZW1hLFxuICBnZXREZWZhdWx0UmVnaXN0cnksXG4gIGRlZXBFcXVhbHMsXG4gIHRvUGF0aFNjaGVtYSxcbiAgaXNPYmplY3QsXG59IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgdG9FcnJvckxpc3QgfSBmcm9tIFwiLi4vdmFsaWRhdGVcIjtcbmltcG9ydCB7IG1lcmdlT2JqZWN0cyB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB1aVNjaGVtYToge30sXG4gICAgbm9WYWxpZGF0ZTogZmFsc2UsXG4gICAgbGl2ZVZhbGlkYXRlOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgIG5vSHRtbDVWYWxpZGF0ZTogZmFsc2UsXG4gICAgRXJyb3JMaXN0OiBEZWZhdWx0RXJyb3JMaXN0LFxuICAgIG9taXRFeHRyYURhdGE6IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBwcm9wcy5mb3JtRGF0YSk7XG4gICAgaWYgKFxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSAmJlxuICAgICAgIWRlZXBFcXVhbHModGhpcy5zdGF0ZS5mb3JtRGF0YSwgdGhpcy5wcm9wcy5mb3JtRGF0YSlcbiAgICApIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuZm9ybUVsZW1lbnQgPSBudWxsO1xuICB9XG5cbiAgVU5TQUZFX2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgbmV4dFN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyhuZXh0UHJvcHMsIG5leHRQcm9wcy5mb3JtRGF0YSk7XG4gICAgaWYgKFxuICAgICAgIWRlZXBFcXVhbHMobmV4dFN0YXRlLmZvcm1EYXRhLCBuZXh0UHJvcHMuZm9ybURhdGEpICYmXG4gICAgICAhZGVlcEVxdWFscyhuZXh0U3RhdGUuZm9ybURhdGEsIHRoaXMuc3RhdGUuZm9ybURhdGEpICYmXG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlXG4gICAgKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKG5leHRTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUobmV4dFN0YXRlKTtcbiAgfVxuXG4gIGdldFN0YXRlRnJvbVByb3BzKHByb3BzLCBpbnB1dEZvcm1EYXRhKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLnN0YXRlIHx8IHt9O1xuICAgIGNvbnN0IHNjaGVtYSA9IFwic2NoZW1hXCIgaW4gcHJvcHMgPyBwcm9wcy5zY2hlbWEgOiB0aGlzLnByb3BzLnNjaGVtYTtcbiAgICBjb25zdCB1aVNjaGVtYSA9IFwidWlTY2hlbWFcIiBpbiBwcm9wcyA/IHByb3BzLnVpU2NoZW1hIDogdGhpcy5wcm9wcy51aVNjaGVtYTtcbiAgICBjb25zdCBlZGl0ID0gdHlwZW9mIGlucHV0Rm9ybURhdGEgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgY29uc3QgbGl2ZVZhbGlkYXRlID1cbiAgICAgIFwibGl2ZVZhbGlkYXRlXCIgaW4gcHJvcHMgPyBwcm9wcy5saXZlVmFsaWRhdGUgOiB0aGlzLnByb3BzLmxpdmVWYWxpZGF0ZTtcbiAgICBjb25zdCBtdXN0VmFsaWRhdGUgPSBlZGl0ICYmICFwcm9wcy5ub1ZhbGlkYXRlICYmIGxpdmVWYWxpZGF0ZTtcbiAgICBjb25zdCByb290U2NoZW1hID0gc2NoZW1hO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gZ2V0RGVmYXVsdEZvcm1TdGF0ZShzY2hlbWEsIGlucHV0Rm9ybURhdGEsIHJvb3RTY2hlbWEpO1xuICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIGNvbnN0IGN1c3RvbUZvcm1hdHMgPSBwcm9wcy5jdXN0b21Gb3JtYXRzO1xuICAgIGNvbnN0IGFkZGl0aW9uYWxNZXRhU2NoZW1hcyA9IHByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcztcblxuICAgIGNvbnN0IGdldEN1cnJlbnRFcnJvcnMgPSAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubm9WYWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4geyBlcnJvcnM6IFtdLCBlcnJvclNjaGVtYToge30gfTtcbiAgICAgIH0gZWxzZSBpZiAoIXByb3BzLmxpdmVWYWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVycm9yczogc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycyB8fCBbXSxcbiAgICAgICAgICBlcnJvclNjaGVtYTogc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hIHx8IHt9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZXJyb3JzOiBzdGF0ZS5lcnJvcnMgfHwgW10sXG4gICAgICAgIGVycm9yU2NoZW1hOiBzdGF0ZS5lcnJvclNjaGVtYSB8fCB7fSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGxldCBlcnJvcnMsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE7XG4gICAgaWYgKG11c3RWYWxpZGF0ZSkge1xuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoXG4gICAgICAgIGZvcm1EYXRhLFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcbiAgICAgICAgY3VzdG9tRm9ybWF0c1xuICAgICAgKTtcbiAgICAgIGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xuICAgICAgZXJyb3JTY2hlbWEgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9yU2NoZW1hO1xuICAgICAgc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IGVycm9ycztcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXJyZW50RXJyb3JzID0gZ2V0Q3VycmVudEVycm9ycygpO1xuICAgICAgZXJyb3JzID0gY3VycmVudEVycm9ycy5lcnJvcnM7XG4gICAgICBlcnJvclNjaGVtYSA9IGN1cnJlbnRFcnJvcnMuZXJyb3JTY2hlbWE7XG4gICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gc3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycztcbiAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYSA9IHN0YXRlLnNjaGVtYVZhbGlkYXRpb25FcnJvclNjaGVtYTtcbiAgICB9XG4gICAgaWYgKHByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICBlcnJvclNjaGVtYSA9IG1lcmdlT2JqZWN0cyhcbiAgICAgICAgZXJyb3JTY2hlbWEsXG4gICAgICAgIHByb3BzLmV4dHJhRXJyb3JzLFxuICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXG4gICAgICApO1xuICAgICAgZXJyb3JzID0gdG9FcnJvckxpc3QoZXJyb3JTY2hlbWEpO1xuICAgIH1cbiAgICBjb25zdCBpZFNjaGVtYSA9IHRvSWRTY2hlbWEoXG4gICAgICByZXRyaWV2ZWRTY2hlbWEsXG4gICAgICB1aVNjaGVtYVtcInVpOnJvb3RGaWVsZElkXCJdLFxuICAgICAgcm9vdFNjaGVtYSxcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgcHJvcHMuaWRQcmVmaXhcbiAgICApO1xuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIHNjaGVtYSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgaWRTY2hlbWEsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGVkaXQsXG4gICAgICBlcnJvcnMsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIGFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcbiAgICB9O1xuICAgIGlmIChzY2hlbWFWYWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgICBuZXh0U3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb25FcnJvcnM7XG4gICAgICBuZXh0U3RhdGUuc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dFN0YXRlO1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuIHNob3VsZFJlbmRlcih0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gIH1cblxuICB2YWxpZGF0ZShcbiAgICBmb3JtRGF0YSxcbiAgICBzY2hlbWEgPSB0aGlzLnByb3BzLnNjaGVtYSxcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXMgPSB0aGlzLnByb3BzLmFkZGl0aW9uYWxNZXRhU2NoZW1hcyxcbiAgICBjdXN0b21Gb3JtYXRzID0gdGhpcy5wcm9wcy5jdXN0b21Gb3JtYXRzXG4gICkge1xuICAgIGNvbnN0IHsgdmFsaWRhdGUsIHRyYW5zZm9ybUVycm9ycyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMuZ2V0UmVnaXN0cnkoKTtcbiAgICBjb25zdCByZXNvbHZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIHJldHVybiB2YWxpZGF0ZUZvcm1EYXRhKFxuICAgICAgZm9ybURhdGEsXG4gICAgICByZXNvbHZlZFNjaGVtYSxcbiAgICAgIHZhbGlkYXRlLFxuICAgICAgdHJhbnNmb3JtRXJyb3JzLFxuICAgICAgYWRkaXRpb25hbE1ldGFTY2hlbWFzLFxuICAgICAgY3VzdG9tRm9ybWF0c1xuICAgICk7XG4gIH1cblxuICByZW5kZXJFcnJvcnMoKSB7XG4gICAgY29uc3QgeyBlcnJvcnMsIGVycm9yU2NoZW1hLCBzY2hlbWEsIHVpU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgRXJyb3JMaXN0LCBzaG93RXJyb3JMaXN0LCBmb3JtQ29udGV4dCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChlcnJvcnMubGVuZ3RoICYmIHNob3dFcnJvckxpc3QgIT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxFcnJvckxpc3RcbiAgICAgICAgICBlcnJvcnM9e2Vycm9yc31cbiAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0VXNlZEZvcm1EYXRhID0gKGZvcm1EYXRhLCBmaWVsZHMpID0+IHtcbiAgICAvL2ZvciB0aGUgY2FzZSBvZiBhIHNpbmdsZSBpbnB1dCBmb3JtXG4gICAgaWYgKGZpZWxkcy5sZW5ndGggPT09IDAgJiYgdHlwZW9mIGZvcm1EYXRhICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gZm9ybURhdGE7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBfcGljayhmb3JtRGF0YSwgZmllbGRzKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhKS5tYXAoa2V5ID0+IGRhdGFba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgZ2V0RmllbGROYW1lcyA9IChwYXRoU2NoZW1hLCBmb3JtRGF0YSkgPT4ge1xuICAgIGNvbnN0IGdldEFsbFBhdGhzID0gKF9vYmosIGFjYyA9IFtdLCBwYXRocyA9IFtcIlwiXSkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMoX29iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIF9vYmpba2V5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGxldCBuZXdQYXRocyA9IHBhdGhzLm1hcChwYXRoID0+IGAke3BhdGh9LiR7a2V5fWApO1xuICAgICAgICAgIC8vIElmIGFuIG9iamVjdCBpcyBtYXJrZWQgd2l0aCBhZGRpdGlvbmFsUHJvcGVydGllcywgYWxsIGl0cyBrZXlzIGFyZSB2YWxpZFxuICAgICAgICAgIGlmIChfb2JqW2tleV0uX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzICYmIF9vYmpba2V5XS4kbmFtZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgYWNjLnB1c2goX29ialtrZXldLiRuYW1lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0QWxsUGF0aHMoX29ialtrZXldLCBhY2MsIG5ld1BhdGhzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIiRuYW1lXCIgJiYgX29ialtrZXldICE9PSBcIlwiKSB7XG4gICAgICAgICAgcGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICAgIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC4vLCBcIlwiKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IF9nZXQoZm9ybURhdGEsIHBhdGgpO1xuICAgICAgICAgICAgLy8gYWRkcyBwYXRoIHRvIGZpZWxkTmFtZXMgaWYgaXQgcG9pbnRzIHRvIGEgdmFsdWVcbiAgICAgICAgICAgIC8vIG9yIGFuIGVtcHR5IG9iamVjdC9hcnJheVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmb3JtVmFsdWUgIT09IFwib2JqZWN0XCIgfHwgX2lzRW1wdHkoZm9ybVZhbHVlKSkge1xuICAgICAgICAgICAgICBhY2MucHVzaChwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH07XG5cbiAgICByZXR1cm4gZ2V0QWxsUGF0aHMocGF0aFNjaGVtYSk7XG4gIH07XG5cbiAgb25DaGFuZ2UgPSAoZm9ybURhdGEsIG5ld0Vycm9yU2NoZW1hKSA9PiB7XG4gICAgaWYgKGlzT2JqZWN0KGZvcm1EYXRhKSB8fCBBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmdldFN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIGZvcm1EYXRhKTtcbiAgICAgIGZvcm1EYXRhID0gbmV3U3RhdGUuZm9ybURhdGE7XG4gICAgfVxuICAgIGNvbnN0IG11c3RWYWxpZGF0ZSA9ICF0aGlzLnByb3BzLm5vVmFsaWRhdGUgJiYgdGhpcy5wcm9wcy5saXZlVmFsaWRhdGU7XG4gICAgbGV0IHN0YXRlID0geyBmb3JtRGF0YSB9O1xuICAgIGxldCBuZXdGb3JtRGF0YSA9IGZvcm1EYXRhO1xuXG4gICAgaWYgKHRoaXMucHJvcHMub21pdEV4dHJhRGF0YSA9PT0gdHJ1ZSAmJiB0aGlzLnByb3BzLmxpdmVPbWl0ID09PSB0cnVlKSB7XG4gICAgICBjb25zdCByZXRyaWV2ZWRTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgIHRoaXMuc3RhdGUuc2NoZW1hLFxuICAgICAgICBmb3JtRGF0YVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHBhdGhTY2hlbWEgPSB0b1BhdGhTY2hlbWEoXG4gICAgICAgIHJldHJpZXZlZFNjaGVtYSxcbiAgICAgICAgXCJcIixcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgIGZvcm1EYXRhXG4gICAgICApO1xuXG4gICAgICBjb25zdCBmaWVsZE5hbWVzID0gdGhpcy5nZXRGaWVsZE5hbWVzKHBhdGhTY2hlbWEsIGZvcm1EYXRhKTtcblxuICAgICAgbmV3Rm9ybURhdGEgPSB0aGlzLmdldFVzZWRGb3JtRGF0YShmb3JtRGF0YSwgZmllbGROYW1lcyk7XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobXVzdFZhbGlkYXRlKSB7XG4gICAgICBsZXQgc2NoZW1hVmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUobmV3Rm9ybURhdGEpO1xuICAgICAgbGV0IGVycm9ycyA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JzO1xuICAgICAgbGV0IGVycm9yU2NoZW1hID0gc2NoZW1hVmFsaWRhdGlvbi5lcnJvclNjaGVtYTtcbiAgICAgIGNvbnN0IHNjaGVtYVZhbGlkYXRpb25FcnJvcnMgPSBlcnJvcnM7XG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEgPSBlcnJvclNjaGVtYTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICAgIGVycm9yU2NoZW1hID0gbWVyZ2VPYmplY3RzKFxuICAgICAgICAgIGVycm9yU2NoZW1hLFxuICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXG4gICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxuICAgICAgICApO1xuICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XG4gICAgICB9XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgZm9ybURhdGE6IG5ld0Zvcm1EYXRhLFxuICAgICAgICBlcnJvcnMsXG4gICAgICAgIGVycm9yU2NoZW1hLFxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzLFxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEsXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSAmJiBuZXdFcnJvclNjaGVtYSkge1xuICAgICAgY29uc3QgZXJyb3JTY2hlbWEgPSB0aGlzLnByb3BzLmV4dHJhRXJyb3JzXG4gICAgICAgID8gbWVyZ2VPYmplY3RzKFxuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWEsXG4gICAgICAgICAgICB0aGlzLnByb3BzLmV4dHJhRXJyb3JzLFxuICAgICAgICAgICAgISFcImNvbmNhdCBhcnJheXNcIlxuICAgICAgICAgIClcbiAgICAgICAgOiBuZXdFcnJvclNjaGVtYTtcbiAgICAgIHN0YXRlID0ge1xuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXG4gICAgICAgIGVycm9yU2NoZW1hOiBlcnJvclNjaGVtYSxcbiAgICAgICAgZXJyb3JzOiB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSksXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgc3RhdGUsXG4gICAgICAoKSA9PiB0aGlzLnByb3BzLm9uQ2hhbmdlICYmIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5zdGF0ZSlcbiAgICApO1xuICB9O1xuXG4gIG9uQmx1ciA9ICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQmx1ciguLi5hcmdzKTtcbiAgICB9XG4gIH07XG5cbiAgb25Gb2N1cyA9ICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzKC4uLmFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBvblN1Ym1pdCA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChldmVudC50YXJnZXQgIT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wZXJzaXN0KCk7XG4gICAgbGV0IG5ld0Zvcm1EYXRhID0gdGhpcy5zdGF0ZS5mb3JtRGF0YTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9taXRFeHRyYURhdGEgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJldHJpZXZlZFNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKFxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcbiAgICAgICAgdGhpcy5zdGF0ZS5zY2hlbWEsXG4gICAgICAgIG5ld0Zvcm1EYXRhXG4gICAgICApO1xuICAgICAgY29uc3QgcGF0aFNjaGVtYSA9IHRvUGF0aFNjaGVtYShcbiAgICAgICAgcmV0cmlldmVkU2NoZW1hLFxuICAgICAgICBcIlwiLFxuICAgICAgICB0aGlzLnN0YXRlLnNjaGVtYSxcbiAgICAgICAgbmV3Rm9ybURhdGFcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGZpZWxkTmFtZXMgPSB0aGlzLmdldEZpZWxkTmFtZXMocGF0aFNjaGVtYSwgbmV3Rm9ybURhdGEpO1xuXG4gICAgICBuZXdGb3JtRGF0YSA9IHRoaXMuZ2V0VXNlZEZvcm1EYXRhKG5ld0Zvcm1EYXRhLCBmaWVsZE5hbWVzKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvcHMubm9WYWxpZGF0ZSkge1xuICAgICAgbGV0IHNjaGVtYVZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld0Zvcm1EYXRhKTtcbiAgICAgIGxldCBlcnJvcnMgPSBzY2hlbWFWYWxpZGF0aW9uLmVycm9ycztcbiAgICAgIGxldCBlcnJvclNjaGVtYSA9IHNjaGVtYVZhbGlkYXRpb24uZXJyb3JTY2hlbWE7XG4gICAgICBjb25zdCBzY2hlbWFWYWxpZGF0aW9uRXJyb3JzID0gZXJyb3JzO1xuICAgICAgY29uc3Qgc2NoZW1hVmFsaWRhdGlvbkVycm9yU2NoZW1hID0gZXJyb3JTY2hlbWE7XG4gICAgICBpZiAoT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICAgICAgZXJyb3JTY2hlbWEgPSBtZXJnZU9iamVjdHMoXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZXh0cmFFcnJvcnMsXG4gICAgICAgICAgICAhIVwiY29uY2F0IGFycmF5c1wiXG4gICAgICAgICAgKTtcbiAgICAgICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlcnJvcnMsXG4gICAgICAgICAgICBlcnJvclNjaGVtYSxcbiAgICAgICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnMsXG4gICAgICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWEsXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkVycm9yKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJvcHMub25FcnJvcihlcnJvcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZvcm0gdmFsaWRhdGlvbiBmYWlsZWRcIiwgZXJyb3JzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUaGVyZSBhcmUgbm8gZXJyb3JzIGdlbmVyYXRlZCB0aHJvdWdoIHNjaGVtYSB2YWxpZGF0aW9uLlxuICAgIC8vIENoZWNrIGZvciB1c2VyIHByb3ZpZGVkIGVycm9ycyBhbmQgdXBkYXRlIHN0YXRlIGFjY29yZGluZ2x5LlxuICAgIGxldCBlcnJvclNjaGVtYTtcbiAgICBsZXQgZXJyb3JzO1xuICAgIGlmICh0aGlzLnByb3BzLmV4dHJhRXJyb3JzKSB7XG4gICAgICBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXh0cmFFcnJvcnM7XG4gICAgICBlcnJvcnMgPSB0b0Vycm9yTGlzdChlcnJvclNjaGVtYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yU2NoZW1hID0ge307XG4gICAgICBlcnJvcnMgPSBbXTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKFxuICAgICAge1xuICAgICAgICBmb3JtRGF0YTogbmV3Rm9ybURhdGEsXG4gICAgICAgIGVycm9yczogZXJyb3JzLFxuICAgICAgICBlcnJvclNjaGVtYTogZXJyb3JTY2hlbWEsXG4gICAgICAgIHNjaGVtYVZhbGlkYXRpb25FcnJvcnM6IFtdLFxuICAgICAgICBzY2hlbWFWYWxpZGF0aW9uRXJyb3JTY2hlbWE6IHt9LFxuICAgICAgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TdWJtaXQpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLm9uU3VibWl0KFxuICAgICAgICAgICAgeyAuLi50aGlzLnN0YXRlLCBmb3JtRGF0YTogbmV3Rm9ybURhdGEsIHN0YXR1czogXCJzdWJtaXR0ZWRcIiB9LFxuICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICBnZXRSZWdpc3RyeSgpIHtcbiAgICAvLyBGb3IgQkMsIGFjY2VwdCBwYXNzZWQgU2NoZW1hRmllbGQgYW5kIFRpdGxlRmllbGQgcHJvcHMgYW5kIHBhc3MgdGhlbSB0b1xuICAgIC8vIHRoZSBcImZpZWxkc1wiIHJlZ2lzdHJ5IG9uZS5cbiAgICBjb25zdCB7IGZpZWxkcywgd2lkZ2V0cyB9ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpZWxkczogeyAuLi5maWVsZHMsIC4uLnRoaXMucHJvcHMuZmllbGRzIH0sXG4gICAgICB3aWRnZXRzOiB7IC4uLndpZGdldHMsIC4uLnRoaXMucHJvcHMud2lkZ2V0cyB9LFxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlOiB0aGlzLnByb3BzLkFycmF5RmllbGRUZW1wbGF0ZSxcbiAgICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuT2JqZWN0RmllbGRUZW1wbGF0ZSxcbiAgICAgIEZpZWxkVGVtcGxhdGU6IHRoaXMucHJvcHMuRmllbGRUZW1wbGF0ZSxcbiAgICAgIGRlZmluaXRpb25zOiB0aGlzLnByb3BzLnNjaGVtYS5kZWZpbml0aW9ucyB8fCB7fSxcbiAgICAgIHJvb3RTY2hlbWE6IHRoaXMucHJvcHMuc2NoZW1hLFxuICAgICAgZm9ybUNvbnRleHQ6IHRoaXMucHJvcHMuZm9ybUNvbnRleHQgfHwge30sXG4gICAgfTtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5mb3JtRWxlbWVudCkge1xuICAgICAgdGhpcy5mb3JtRWxlbWVudC5kaXNwYXRjaEV2ZW50KFxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJzdWJtaXRcIiwge1xuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGlkLFxuICAgICAgaWRQcmVmaXgsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICB0YWdOYW1lLFxuICAgICAgbmFtZSxcbiAgICAgIG1ldGhvZCxcbiAgICAgIHRhcmdldCxcbiAgICAgIGFjdGlvbixcbiAgICAgIGF1dG9jb21wbGV0ZTogZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSxcbiAgICAgIGF1dG9Db21wbGV0ZTogY3VycmVudEF1dG9Db21wbGV0ZSxcbiAgICAgIGVuY3R5cGUsXG4gICAgICBhY2NlcHRjaGFyc2V0LFxuICAgICAgbm9IdG1sNVZhbGlkYXRlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICByZWFkb25seSxcbiAgICAgIGZvcm1Db250ZXh0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBzY2hlbWEsIHVpU2NoZW1hLCBmb3JtRGF0YSwgZXJyb3JTY2hlbWEsIGlkU2NoZW1hIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gdGhpcy5nZXRSZWdpc3RyeSgpO1xuICAgIGNvbnN0IF9TY2hlbWFGaWVsZCA9IHJlZ2lzdHJ5LmZpZWxkcy5TY2hlbWFGaWVsZDtcbiAgICBjb25zdCBGb3JtVGFnID0gdGFnTmFtZSA/IHRhZ05hbWUgOiBcImZvcm1cIjtcbiAgICBpZiAoZGVwcmVjYXRlZEF1dG9jb21wbGV0ZSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIlVzaW5nIGF1dG9jb21wbGV0ZSBwcm9wZXJ0eSBvZiBGb3JtIGlzIGRlcHJlY2F0ZWQsIHVzZSBhdXRvQ29tcGxldGUgaW5zdGVhZC5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgYXV0b0NvbXBsZXRlID0gY3VycmVudEF1dG9Db21wbGV0ZVxuICAgICAgPyBjdXJyZW50QXV0b0NvbXBsZXRlXG4gICAgICA6IGRlcHJlY2F0ZWRBdXRvY29tcGxldGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1UYWdcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiBcInJqc2ZcIn1cbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICBtZXRob2Q9e21ldGhvZH1cbiAgICAgICAgdGFyZ2V0PXt0YXJnZXR9XG4gICAgICAgIGFjdGlvbj17YWN0aW9ufVxuICAgICAgICBhdXRvQ29tcGxldGU9e2F1dG9Db21wbGV0ZX1cbiAgICAgICAgZW5jVHlwZT17ZW5jdHlwZX1cbiAgICAgICAgYWNjZXB0Q2hhcnNldD17YWNjZXB0Y2hhcnNldH1cbiAgICAgICAgbm9WYWxpZGF0ZT17bm9IdG1sNVZhbGlkYXRlfVxuICAgICAgICBvblN1Ym1pdD17dGhpcy5vblN1Ym1pdH1cbiAgICAgICAgcmVmPXtmb3JtID0+IHtcbiAgICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybTtcbiAgICAgICAgfX0+XG4gICAgICAgIHt0aGlzLnJlbmRlckVycm9ycygpfVxuICAgICAgICA8X1NjaGVtYUZpZWxkXG4gICAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgICAgdWlTY2hlbWE9e3VpU2NoZW1hfVxuICAgICAgICAgIGVycm9yU2NoZW1hPXtlcnJvclNjaGVtYX1cbiAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XG4gICAgICAgICAgaWRQcmVmaXg9e2lkUHJlZml4fVxuICAgICAgICAgIGZvcm1Db250ZXh0PXtmb3JtQ29udGV4dH1cbiAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgb25CbHVyPXt0aGlzLm9uQmx1cn1cbiAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9uRm9jdXN9XG4gICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICByZWFkb25seT17cmVhZG9ubHl9XG4gICAgICAgIC8+XG4gICAgICAgIHtjaGlsZHJlbiA/IChcbiAgICAgICAgICBjaGlsZHJlblxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIj5cbiAgICAgICAgICAgICAgU3VibWl0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvRm9ybVRhZz5cbiAgICApO1xuICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgRm9ybS5wcm9wVHlwZXMgPSB7XG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5hbnksXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3aWRnZXRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXG4gICAgICBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLm9iamVjdF0pXG4gICAgKSxcbiAgICBmaWVsZHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuZWxlbWVudFR5cGUpLFxuICAgIEFycmF5RmllbGRUZW1wbGF0ZTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxuICAgIE9iamVjdEZpZWxkVGVtcGxhdGU6IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcbiAgICBGaWVsZFRlbXBsYXRlOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gICAgRXJyb3JMaXN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FcnJvcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2hvd0Vycm9yTGlzdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25TdWJtaXQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB0YWdOYW1lOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtZXRob2Q6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgdGFyZ2V0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhdXRvY29tcGxldGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXV0b0NvbXBsZXRlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGVuY3R5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWNjZXB0Y2hhcnNldDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBub1ZhbGlkYXRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBub0h0bWw1VmFsaWRhdGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGxpdmVWYWxpZGF0ZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgdmFsaWRhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRyYW5zZm9ybUVycm9yczogUHJvcFR5cGVzLmZ1bmMsXG4gICAgZm9ybUNvbnRleHQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY3VzdG9tRm9ybWF0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBhZGRpdGlvbmFsTWV0YVNjaGVtYXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5vYmplY3QpLFxuICAgIG9taXRFeHRyYURhdGE6IFByb3BUeXBlcy5ib29sLFxuICAgIGV4dHJhRXJyb3JzOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xufVxuIl19