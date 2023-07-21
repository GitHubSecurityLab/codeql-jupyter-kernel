"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AnyOfField =
/*#__PURE__*/
function (_Component) {
  _inherits(AnyOfField, _Component);

  function AnyOfField(props) {
    var _this;

    _classCallCheck(this, AnyOfField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnyOfField).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onOptionChange", function (option) {
      var selectedOption = parseInt(option, 10);
      var _this$props = _this.props,
          formData = _this$props.formData,
          onChange = _this$props.onChange,
          options = _this$props.options,
          registry = _this$props.registry;
      var rootSchema = registry.rootSchema;
      var newOption = (0, _utils.retrieveSchema)(options[selectedOption], rootSchema, formData); // If the new option is of type object and the current data is an object,
      // discard properties added using the old option.

      var newFormData = undefined;

      if ((0, _utils.guessType)(formData) === "object" && (newOption.type === "object" || newOption.properties)) {
        newFormData = Object.assign({}, formData);
        var optionsToDiscard = options.slice();
        optionsToDiscard.splice(selectedOption, 1); // Discard any data added using other options

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = optionsToDiscard[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _option = _step.value;

            if (_option.properties) {
              for (var key in _option.properties) {
                if (newFormData.hasOwnProperty(key)) {
                  delete newFormData[key];
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } // Call getDefaultFormState to make sure defaults are populated on change.


      onChange((0, _utils.getDefaultFormState)(options[selectedOption], newFormData, rootSchema));

      _this.setState({
        selectedOption: parseInt(option, 10)
      });
    });

    var _this$props2 = _this.props,
        _formData = _this$props2.formData,
        _options = _this$props2.options;
    _this.state = {
      selectedOption: _this.getMatchingOption(_formData, _options)
    };
    return _this;
  }

  _createClass(AnyOfField, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (!(0, _utils.deepEquals)(this.props.formData, prevProps.formData) && this.props.idSchema.$id === prevProps.idSchema.$id) {
        var matchingOption = this.getMatchingOption(this.props.formData, this.props.options);

        if (!prevState || matchingOption === this.state.selectedOption) {
          return;
        }

        this.setState({
          selectedOption: matchingOption
        });
      }
    }
  }, {
    key: "getMatchingOption",
    value: function getMatchingOption(formData, options) {
      var rootSchema = this.props.registry.rootSchema;
      var option = (0, _utils.getMatchingOption)(formData, options, rootSchema);

      if (option !== 0) {
        return option;
      } // If the form data matches none of the options, use the currently selected
      // option, assuming it's available; otherwise use the first option


      return this && this.state ? this.state.selectedOption : 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          baseType = _this$props3.baseType,
          disabled = _this$props3.disabled,
          errorSchema = _this$props3.errorSchema,
          formData = _this$props3.formData,
          idPrefix = _this$props3.idPrefix,
          idSchema = _this$props3.idSchema,
          onBlur = _this$props3.onBlur,
          onChange = _this$props3.onChange,
          onFocus = _this$props3.onFocus,
          options = _this$props3.options,
          registry = _this$props3.registry,
          uiSchema = _this$props3.uiSchema,
          schema = _this$props3.schema;
      var _SchemaField = registry.fields.SchemaField;
      var widgets = registry.widgets;
      var selectedOption = this.state.selectedOption;

      var _getUiOptions = (0, _utils.getUiOptions)(uiSchema),
          _getUiOptions$widget = _getUiOptions.widget,
          widget = _getUiOptions$widget === void 0 ? "select" : _getUiOptions$widget,
          uiOptions = _objectWithoutProperties(_getUiOptions, ["widget"]);

      var Widget = (0, _utils.getWidget)({
        type: "number"
      }, widget, widgets);
      var option = options[selectedOption] || null;
      var optionSchema;

      if (option) {
        // If the subschema doesn't declare a type, infer the type from the
        // parent schema
        optionSchema = option.type ? option : Object.assign({}, option, {
          type: baseType
        });
      }

      var enumOptions = options.map(function (option, index) {
        return {
          label: option.title || "Option ".concat(index + 1),
          value: index
        };
      });
      return _react["default"].createElement("div", {
        className: "panel panel-default panel-body"
      }, _react["default"].createElement("div", {
        className: "form-group"
      }, _react["default"].createElement(Widget, _extends({
        id: "".concat(idSchema.$id).concat(schema.oneOf ? "__oneof_select" : "__anyof_select"),
        schema: {
          type: "number",
          "default": 0
        },
        onChange: this.onOptionChange,
        onBlur: onBlur,
        onFocus: onFocus,
        value: selectedOption,
        options: {
          enumOptions: enumOptions
        }
      }, uiOptions))), option !== null && _react["default"].createElement(_SchemaField, {
        schema: optionSchema,
        uiSchema: uiSchema,
        errorSchema: errorSchema,
        idSchema: idSchema,
        idPrefix: idPrefix,
        formData: formData,
        onChange: onChange,
        onBlur: onBlur,
        onFocus: onFocus,
        registry: registry,
        disabled: disabled
      }));
    }
  }]);

  return AnyOfField;
}(_react.Component);

AnyOfField.defaultProps = {
  disabled: false,
  errorSchema: {},
  idSchema: {},
  uiSchema: {}
};

if (process.env.NODE_ENV !== "production") {
  AnyOfField.propTypes = {
    options: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
    baseType: _propTypes["default"].string,
    uiSchema: _propTypes["default"].object,
    idSchema: _propTypes["default"].object,
    formData: _propTypes["default"].any,
    errorSchema: _propTypes["default"].object,
    registry: types.registry.isRequired
  };
}

var _default = AnyOfField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9NdWx0aVNjaGVtYUZpZWxkLmpzIl0sIm5hbWVzIjpbIkFueU9mRmllbGQiLCJwcm9wcyIsIm9wdGlvbiIsInNlbGVjdGVkT3B0aW9uIiwicGFyc2VJbnQiLCJmb3JtRGF0YSIsIm9uQ2hhbmdlIiwib3B0aW9ucyIsInJlZ2lzdHJ5Iiwicm9vdFNjaGVtYSIsIm5ld09wdGlvbiIsIm5ld0Zvcm1EYXRhIiwidW5kZWZpbmVkIiwidHlwZSIsInByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJvcHRpb25zVG9EaXNjYXJkIiwic2xpY2UiLCJzcGxpY2UiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInNldFN0YXRlIiwic3RhdGUiLCJnZXRNYXRjaGluZ09wdGlvbiIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImlkU2NoZW1hIiwiJGlkIiwibWF0Y2hpbmdPcHRpb24iLCJiYXNlVHlwZSIsImRpc2FibGVkIiwiZXJyb3JTY2hlbWEiLCJpZFByZWZpeCIsIm9uQmx1ciIsIm9uRm9jdXMiLCJ1aVNjaGVtYSIsInNjaGVtYSIsIl9TY2hlbWFGaWVsZCIsImZpZWxkcyIsIlNjaGVtYUZpZWxkIiwid2lkZ2V0cyIsIndpZGdldCIsInVpT3B0aW9ucyIsIldpZGdldCIsIm9wdGlvblNjaGVtYSIsImVudW1PcHRpb25zIiwibWFwIiwiaW5kZXgiLCJsYWJlbCIsInRpdGxlIiwidmFsdWUiLCJvbmVPZiIsIm9uT3B0aW9uQ2hhbmdlIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJhbnkiLCJ0eXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJ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RSxNQUE1QixFQUFvQ0MsVUFEeEI7QUFFckJqQyxJQUFBQSxRQUFRLEVBQUU4QixzQkFBVUksTUFGQztBQUdyQjVCLElBQUFBLFFBQVEsRUFBRXdCLHNCQUFVRSxNQUhDO0FBSXJCbkMsSUFBQUEsUUFBUSxFQUFFaUMsc0JBQVVFLE1BSkM7QUFLckJ6RCxJQUFBQSxRQUFRLEVBQUV1RCxzQkFBVUssR0FMQztBQU1yQmpDLElBQUFBLFdBQVcsRUFBRTRCLHNCQUFVRSxNQU5GO0FBT3JCdEQsSUFBQUEsUUFBUSxFQUFFMEQsS0FBSyxDQUFDMUQsUUFBTixDQUFldUQ7QUFQSixHQUF2QjtBQVNEOztlQUVjL0QsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0VWlPcHRpb25zLFxuICBnZXRXaWRnZXQsXG4gIGd1ZXNzVHlwZSxcbiAgcmV0cmlldmVTY2hlbWEsXG4gIGdldERlZmF1bHRGb3JtU3RhdGUsXG4gIGdldE1hdGNoaW5nT3B0aW9uLFxuICBkZWVwRXF1YWxzLFxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuY2xhc3MgQW55T2ZGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgY29uc3QgeyBmb3JtRGF0YSwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZE9wdGlvbjogdGhpcy5nZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgb3B0aW9ucyksXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIGlmIChcbiAgICAgICFkZWVwRXF1YWxzKHRoaXMucHJvcHMuZm9ybURhdGEsIHByZXZQcm9wcy5mb3JtRGF0YSkgJiZcbiAgICAgIHRoaXMucHJvcHMuaWRTY2hlbWEuJGlkID09PSBwcmV2UHJvcHMuaWRTY2hlbWEuJGlkXG4gICAgKSB7XG4gICAgICBjb25zdCBtYXRjaGluZ09wdGlvbiA9IHRoaXMuZ2V0TWF0Y2hpbmdPcHRpb24oXG4gICAgICAgIHRoaXMucHJvcHMuZm9ybURhdGEsXG4gICAgICAgIHRoaXMucHJvcHMub3B0aW9uc1xuICAgICAgKTtcblxuICAgICAgaWYgKCFwcmV2U3RhdGUgfHwgbWF0Y2hpbmdPcHRpb24gPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWRPcHRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2VsZWN0ZWRPcHRpb246IG1hdGNoaW5nT3B0aW9uLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHRoaXMucHJvcHMucmVnaXN0cnk7XG5cbiAgICBsZXQgb3B0aW9uID0gZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMsIHJvb3RTY2hlbWEpO1xuICAgIGlmIChvcHRpb24gIT09IDApIHtcbiAgICAgIHJldHVybiBvcHRpb247XG4gICAgfVxuICAgIC8vIElmIHRoZSBmb3JtIGRhdGEgbWF0Y2hlcyBub25lIG9mIHRoZSBvcHRpb25zLCB1c2UgdGhlIGN1cnJlbnRseSBzZWxlY3RlZFxuICAgIC8vIG9wdGlvbiwgYXNzdW1pbmcgaXQncyBhdmFpbGFibGU7IG90aGVyd2lzZSB1c2UgdGhlIGZpcnN0IG9wdGlvblxuICAgIHJldHVybiB0aGlzICYmIHRoaXMuc3RhdGUgPyB0aGlzLnN0YXRlLnNlbGVjdGVkT3B0aW9uIDogMDtcbiAgfVxuXG4gIG9uT3B0aW9uQ2hhbmdlID0gb3B0aW9uID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHBhcnNlSW50KG9wdGlvbiwgMTApO1xuICAgIGNvbnN0IHsgZm9ybURhdGEsIG9uQ2hhbmdlLCBvcHRpb25zLCByZWdpc3RyeSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHJlZ2lzdHJ5O1xuICAgIGNvbnN0IG5ld09wdGlvbiA9IHJldHJpZXZlU2NoZW1hKFxuICAgICAgb3B0aW9uc1tzZWxlY3RlZE9wdGlvbl0sXG4gICAgICByb290U2NoZW1hLFxuICAgICAgZm9ybURhdGFcbiAgICApO1xuXG4gICAgLy8gSWYgdGhlIG5ldyBvcHRpb24gaXMgb2YgdHlwZSBvYmplY3QgYW5kIHRoZSBjdXJyZW50IGRhdGEgaXMgYW4gb2JqZWN0LFxuICAgIC8vIGRpc2NhcmQgcHJvcGVydGllcyBhZGRlZCB1c2luZyB0aGUgb2xkIG9wdGlvbi5cbiAgICBsZXQgbmV3Rm9ybURhdGEgPSB1bmRlZmluZWQ7XG4gICAgaWYgKFxuICAgICAgZ3Vlc3NUeXBlKGZvcm1EYXRhKSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgKG5ld09wdGlvbi50eXBlID09PSBcIm9iamVjdFwiIHx8IG5ld09wdGlvbi5wcm9wZXJ0aWVzKVxuICAgICkge1xuICAgICAgbmV3Rm9ybURhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBmb3JtRGF0YSk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnNUb0Rpc2NhcmQgPSBvcHRpb25zLnNsaWNlKCk7XG4gICAgICBvcHRpb25zVG9EaXNjYXJkLnNwbGljZShzZWxlY3RlZE9wdGlvbiwgMSk7XG5cbiAgICAgIC8vIERpc2NhcmQgYW55IGRhdGEgYWRkZWQgdXNpbmcgb3RoZXIgb3B0aW9uc1xuICAgICAgZm9yIChjb25zdCBvcHRpb24gb2Ygb3B0aW9uc1RvRGlzY2FyZCkge1xuICAgICAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvcHRpb24ucHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKG5ld0Zvcm1EYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIG5ld0Zvcm1EYXRhW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIENhbGwgZ2V0RGVmYXVsdEZvcm1TdGF0ZSB0byBtYWtlIHN1cmUgZGVmYXVsdHMgYXJlIHBvcHVsYXRlZCBvbiBjaGFuZ2UuXG4gICAgb25DaGFuZ2UoXG4gICAgICBnZXREZWZhdWx0Rm9ybVN0YXRlKG9wdGlvbnNbc2VsZWN0ZWRPcHRpb25dLCBuZXdGb3JtRGF0YSwgcm9vdFNjaGVtYSlcbiAgICApO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzZWxlY3RlZE9wdGlvbjogcGFyc2VJbnQob3B0aW9uLCAxMCksXG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGJhc2VUeXBlLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgaWRQcmVmaXgsXG4gICAgICBpZFNjaGVtYSxcbiAgICAgIG9uQmx1cixcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgb25Gb2N1cyxcbiAgICAgIG9wdGlvbnMsXG4gICAgICByZWdpc3RyeSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgc2NoZW1hLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgX1NjaGVtYUZpZWxkID0gcmVnaXN0cnkuZmllbGRzLlNjaGVtYUZpZWxkO1xuICAgIGNvbnN0IHsgd2lkZ2V0cyB9ID0gcmVnaXN0cnk7XG4gICAgY29uc3QgeyBzZWxlY3RlZE9wdGlvbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHdpZGdldCA9IFwic2VsZWN0XCIsIC4uLnVpT3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoeyB0eXBlOiBcIm51bWJlclwiIH0sIHdpZGdldCwgd2lkZ2V0cyk7XG5cbiAgICBjb25zdCBvcHRpb24gPSBvcHRpb25zW3NlbGVjdGVkT3B0aW9uXSB8fCBudWxsO1xuICAgIGxldCBvcHRpb25TY2hlbWE7XG5cbiAgICBpZiAob3B0aW9uKSB7XG4gICAgICAvLyBJZiB0aGUgc3Vic2NoZW1hIGRvZXNuJ3QgZGVjbGFyZSBhIHR5cGUsIGluZmVyIHRoZSB0eXBlIGZyb20gdGhlXG4gICAgICAvLyBwYXJlbnQgc2NoZW1hXG4gICAgICBvcHRpb25TY2hlbWEgPSBvcHRpb24udHlwZVxuICAgICAgICA/IG9wdGlvblxuICAgICAgICA6IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbiwgeyB0eXBlOiBiYXNlVHlwZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBlbnVtT3B0aW9ucyA9IG9wdGlvbnMubWFwKChvcHRpb24sIGluZGV4KSA9PiAoe1xuICAgICAgbGFiZWw6IG9wdGlvbi50aXRsZSB8fCBgT3B0aW9uICR7aW5kZXggKyAxfWAsXG4gICAgICB2YWx1ZTogaW5kZXgsXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwgcGFuZWwtZGVmYXVsdCBwYW5lbC1ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgIDxXaWRnZXRcbiAgICAgICAgICAgIGlkPXtgJHtpZFNjaGVtYS4kaWR9JHtcbiAgICAgICAgICAgICAgc2NoZW1hLm9uZU9mID8gXCJfX29uZW9mX3NlbGVjdFwiIDogXCJfX2FueW9mX3NlbGVjdFwiXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHNjaGVtYT17eyB0eXBlOiBcIm51bWJlclwiLCBkZWZhdWx0OiAwIH19XG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbk9wdGlvbkNoYW5nZX1cbiAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9wdGlvbn1cbiAgICAgICAgICAgIG9wdGlvbnM9e3sgZW51bU9wdGlvbnMgfX1cbiAgICAgICAgICAgIHsuLi51aU9wdGlvbnN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge29wdGlvbiAhPT0gbnVsbCAmJiAoXG4gICAgICAgICAgPF9TY2hlbWFGaWVsZFxuICAgICAgICAgICAgc2NoZW1hPXtvcHRpb25TY2hlbWF9XG4gICAgICAgICAgICB1aVNjaGVtYT17dWlTY2hlbWF9XG4gICAgICAgICAgICBlcnJvclNjaGVtYT17ZXJyb3JTY2hlbWF9XG4gICAgICAgICAgICBpZFNjaGVtYT17aWRTY2hlbWF9XG4gICAgICAgICAgICBpZFByZWZpeD17aWRQcmVmaXh9XG4gICAgICAgICAgICBmb3JtRGF0YT17Zm9ybURhdGF9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXN9XG4gICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuQW55T2ZGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpc2FibGVkOiBmYWxzZSxcbiAgZXJyb3JTY2hlbWE6IHt9LFxuICBpZFNjaGVtYToge30sXG4gIHVpU2NoZW1hOiB7fSxcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQW55T2ZGaWVsZC5wcm9wVHlwZXMgPSB7XG4gICAgb3B0aW9uczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCkuaXNSZXF1aXJlZCxcbiAgICBiYXNlVHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB1aVNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBpZFNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBmb3JtRGF0YTogUHJvcFR5cGVzLmFueSxcbiAgICBlcnJvclNjaGVtYTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICByZWdpc3RyeTogdHlwZXMucmVnaXN0cnkuaXNSZXF1aXJlZCxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQW55T2ZGaWVsZDtcbiJdfQ==