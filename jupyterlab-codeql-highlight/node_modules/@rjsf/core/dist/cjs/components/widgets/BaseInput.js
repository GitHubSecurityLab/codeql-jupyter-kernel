"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!props.id) {
    console.log("No id for", props);
    throw new Error("no id for props ".concat(JSON.stringify(props)));
  }

  var value = props.value,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      options = props.options,
      schema = props.schema,
      uiSchema = props.uiSchema,
      formContext = props.formContext,
      registry = props.registry,
      rawErrors = props.rawErrors,
      inputProps = _objectWithoutProperties(props, ["value", "readonly", "disabled", "autofocus", "onBlur", "onFocus", "options", "schema", "uiSchema", "formContext", "registry", "rawErrors"]); // If options.inputType is set use that as the input type


  if (options.inputType) {
    inputProps.type = options.inputType;
  } else if (!inputProps.type) {
    // If the schema is of type number or integer, set the input type to number
    if (schema.type === "number") {
      inputProps.type = "number"; // Setting step to 'any' fixes a bug in Safari where decimals are not
      // allowed in number inputs

      inputProps.step = "any";
    } else if (schema.type === "integer") {
      inputProps.type = "number"; // Since this is integer, you always want to step up or down in multiples
      // of 1

      inputProps.step = "1";
    } else {
      inputProps.type = "text";
    }
  }

  if (options.autocomplete) {
    inputProps.autoComplete = options.autocomplete;
  } // If multipleOf is defined, use this as the step value. This mainly improves
  // the experience for keyboard users (who can use the up/down KB arrows).


  if (schema.multipleOf) {
    inputProps.step = schema.multipleOf;
  }

  if (typeof schema.minimum !== "undefined") {
    inputProps.min = schema.minimum;
  }

  if (typeof schema.maximum !== "undefined") {
    inputProps.max = schema.maximum;
  }

  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;
    return props.onChange(value === "" ? options.emptyValue : value);
  };

  return [_react["default"].createElement("input", _extends({
    key: inputProps.id,
    className: "form-control",
    readOnly: readonly,
    disabled: disabled,
    autoFocus: autofocus,
    value: value == null ? "" : value
  }, inputProps, {
    list: schema.examples ? "examples_".concat(inputProps.id) : null,
    onChange: _onChange,
    onBlur: onBlur && function (event) {
      return onBlur(inputProps.id, event.target.value);
    },
    onFocus: onFocus && function (event) {
      return onFocus(inputProps.id, event.target.value);
    }
  })), schema.examples ? _react["default"].createElement("datalist", {
    key: "datalist_".concat(inputProps.id),
    id: "examples_".concat(inputProps.id)
  }, _toConsumableArray(new Set(schema.examples.concat(schema["default"] ? [schema["default"]] : []))).map(function (example) {
    return _react["default"].createElement("option", {
      key: example,
      value: example
    });
  })) : null];
}

BaseInput.defaultProps = {
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: _propTypes["default"].string.isRequired,
    placeholder: _propTypes["default"].string,
    value: _propTypes["default"].any,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    onBlur: _propTypes["default"].func,
    onFocus: _propTypes["default"].func
  };
}

var _default = BaseInput;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQmFzZUlucHV0LmpzIl0sIm5hbWVzIjpbIkJhc2VJbnB1dCIsInByb3BzIiwiaWQiLCJjb25zb2xlIiwibG9nIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwidmFsdWUiLCJyZWFkb25seSIsImRpc2FibGVkIiwiYXV0b2ZvY3VzIiwib25CbHVyIiwib25Gb2N1cyIsIm9wdGlvbnMiLCJzY2hlbWEiLCJ1aVNjaGVtYSIsImZvcm1Db250ZXh0IiwicmVnaXN0cnkiLCJyYXdFcnJvcnMiLCJpbnB1dFByb3BzIiwiaW5wdXRUeXBlIiwidHlwZSIsInN0ZXAiLCJhdXRvY29tcGxldGUiLCJhdXRvQ29tcGxldGUiLCJtdWx0aXBsZU9mIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJfb25DaGFuZ2UiLCJ0YXJnZXQiLCJvbkNoYW5nZSIsImVtcHR5VmFsdWUiLCJleGFtcGxlcyIsImV2ZW50IiwiU2V0IiwiY29uY2F0IiwibWFwIiwiZXhhbXBsZSIsImRlZmF1bHRQcm9wcyIsInJlcXVpcmVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsInBsYWNlaG9sZGVyIiwiYW55IiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEI7QUFDeEI7QUFDQTtBQUNBLE1BQUksQ0FBQ0EsS0FBSyxDQUFDQyxFQUFYLEVBQWU7QUFDYkMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QkgsS0FBekI7QUFDQSxVQUFNLElBQUlJLEtBQUosMkJBQTZCQyxJQUFJLENBQUNDLFNBQUwsQ0FBZU4sS0FBZixDQUE3QixFQUFOO0FBQ0Q7O0FBTnVCLE1BUXRCTyxLQVJzQixHQXFC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UDtBQTRCRDs7QUFFRHhDLFNBQVMsQ0FBQ3lDLFlBQVYsR0FBeUI7QUFDdkJDLEVBQUFBLFFBQVEsRUFBRSxLQURhO0FBRXZCaEMsRUFBQUEsUUFBUSxFQUFFLEtBRmE7QUFHdkJELEVBQUFBLFFBQVEsRUFBRSxLQUhhO0FBSXZCRSxFQUFBQSxTQUFTLEVBQUU7QUFKWSxDQUF6Qjs7QUFPQSxJQUFJZ0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekM3QyxFQUFBQSxTQUFTLENBQUM4QyxTQUFWLEdBQXNCO0FBQ3BCNUMsSUFBQUEsRUFBRSxFQUFFNkMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREQ7QUFFcEJDLElBQUFBLFdBQVcsRUFBRUgsc0JBQVVDLE1BRkg7QUFHcEJ4QyxJQUFBQSxLQUFLLEVBQUV1QyxzQkFBVUksR0FIRztBQUlwQlQsSUFBQUEsUUFBUSxFQUFFSyxzQkFBVUssSUFKQTtBQUtwQjFDLElBQUFBLFFBQVEsRUFBRXFDLHNCQUFVSyxJQUxBO0FBTXBCM0MsSUFBQUEsUUFBUSxFQUFFc0Msc0JBQVVLLElBTkE7QUFPcEJ6QyxJQUFBQSxTQUFTLEVBQUVvQyxzQkFBVUssSUFQRDtBQVFwQm5CLElBQUFBLFFBQVEsRUFBRWMsc0JBQVVNLElBUkE7QUFTcEJ6QyxJQUFBQSxNQUFNLEVBQUVtQyxzQkFBVU0sSUFURTtBQVVwQnhDLElBQUFBLE9BQU8sRUFBRWtDLHNCQUFVTTtBQVZDLEdBQXRCO0FBWUQ7O2VBRWNyRCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5mdW5jdGlvbiBCYXNlSW5wdXQocHJvcHMpIHtcbiAgLy8gTm90ZTogc2luY2UgUmVhY3QgMTUuMi4wIHdlIGNhbid0IGZvcndhcmQgdW5rbm93biBlbGVtZW50IGF0dHJpYnV0ZXMsIHNvIHdlXG4gIC8vIGV4Y2x1ZGUgdGhlIFwib3B0aW9uc1wiIGFuZCBcInNjaGVtYVwiIG9uZXMgaGVyZS5cbiAgaWYgKCFwcm9wcy5pZCkge1xuICAgIGNvbnNvbGUubG9nKFwiTm8gaWQgZm9yXCIsIHByb3BzKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIGlkIGZvciBwcm9wcyAke0pTT04uc3RyaW5naWZ5KHByb3BzKX1gKTtcbiAgfVxuICBjb25zdCB7XG4gICAgdmFsdWUsXG4gICAgcmVhZG9ubHksXG4gICAgZGlzYWJsZWQsXG4gICAgYXV0b2ZvY3VzLFxuICAgIG9uQmx1cixcbiAgICBvbkZvY3VzLFxuICAgIG9wdGlvbnMsXG4gICAgc2NoZW1hLFxuICAgIHVpU2NoZW1hLFxuICAgIGZvcm1Db250ZXh0LFxuICAgIHJlZ2lzdHJ5LFxuICAgIHJhd0Vycm9ycyxcbiAgICAuLi5pbnB1dFByb3BzXG4gIH0gPSBwcm9wcztcblxuICAvLyBJZiBvcHRpb25zLmlucHV0VHlwZSBpcyBzZXQgdXNlIHRoYXQgYXMgdGhlIGlucHV0IHR5cGVcbiAgaWYgKG9wdGlvbnMuaW5wdXRUeXBlKSB7XG4gICAgaW5wdXRQcm9wcy50eXBlID0gb3B0aW9ucy5pbnB1dFR5cGU7XG4gIH0gZWxzZSBpZiAoIWlucHV0UHJvcHMudHlwZSkge1xuICAgIC8vIElmIHRoZSBzY2hlbWEgaXMgb2YgdHlwZSBudW1iZXIgb3IgaW50ZWdlciwgc2V0IHRoZSBpbnB1dCB0eXBlIHRvIG51bWJlclxuICAgIGlmIChzY2hlbWEudHlwZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJudW1iZXJcIjtcbiAgICAgIC8vIFNldHRpbmcgc3RlcCB0byAnYW55JyBmaXhlcyBhIGJ1ZyBpbiBTYWZhcmkgd2hlcmUgZGVjaW1hbHMgYXJlIG5vdFxuICAgICAgLy8gYWxsb3dlZCBpbiBudW1iZXIgaW5wdXRzXG4gICAgICBpbnB1dFByb3BzLnN0ZXAgPSBcImFueVwiO1xuICAgIH0gZWxzZSBpZiAoc2NoZW1hLnR5cGUgPT09IFwiaW50ZWdlclwiKSB7XG4gICAgICBpbnB1dFByb3BzLnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgLy8gU2luY2UgdGhpcyBpcyBpbnRlZ2VyLCB5b3UgYWx3YXlzIHdhbnQgdG8gc3RlcCB1cCBvciBkb3duIGluIG11bHRpcGxlc1xuICAgICAgLy8gb2YgMVxuICAgICAgaW5wdXRQcm9wcy5zdGVwID0gXCIxXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwidGV4dFwiO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zLmF1dG9jb21wbGV0ZSkge1xuICAgIGlucHV0UHJvcHMuYXV0b0NvbXBsZXRlID0gb3B0aW9ucy5hdXRvY29tcGxldGU7XG4gIH1cblxuICAvLyBJZiBtdWx0aXBsZU9mIGlzIGRlZmluZWQsIHVzZSB0aGlzIGFzIHRoZSBzdGVwIHZhbHVlLiBUaGlzIG1haW5seSBpbXByb3Zlc1xuICAvLyB0aGUgZXhwZXJpZW5jZSBmb3Iga2V5Ym9hcmQgdXNlcnMgKHdobyBjYW4gdXNlIHRoZSB1cC9kb3duIEtCIGFycm93cykuXG4gIGlmIChzY2hlbWEubXVsdGlwbGVPZikge1xuICAgIGlucHV0UHJvcHMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzY2hlbWEubWluaW11bSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlucHV0UHJvcHMubWluID0gc2NoZW1hLm1pbmltdW07XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5tYXhpbXVtICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaW5wdXRQcm9wcy5tYXggPSBzY2hlbWEubWF4aW11bTtcbiAgfVxuXG4gIGNvbnN0IF9vbkNoYW5nZSA9ICh7IHRhcmdldDogeyB2YWx1ZSB9IH0pID0+IHtcbiAgICByZXR1cm4gcHJvcHMub25DaGFuZ2UodmFsdWUgPT09IFwiXCIgPyBvcHRpb25zLmVtcHR5VmFsdWUgOiB2YWx1ZSk7XG4gIH07XG5cbiAgcmV0dXJuIFtcbiAgICA8aW5wdXRcbiAgICAgIGtleT17aW5wdXRQcm9wcy5pZH1cbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICByZWFkT25seT17cmVhZG9ubHl9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBhdXRvRm9jdXM9e2F1dG9mb2N1c31cbiAgICAgIHZhbHVlPXt2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlfVxuICAgICAgey4uLmlucHV0UHJvcHN9XG4gICAgICBsaXN0PXtzY2hlbWEuZXhhbXBsZXMgPyBgZXhhbXBsZXNfJHtpbnB1dFByb3BzLmlkfWAgOiBudWxsfVxuICAgICAgb25DaGFuZ2U9e19vbkNoYW5nZX1cbiAgICAgIG9uQmx1cj17b25CbHVyICYmIChldmVudCA9PiBvbkJsdXIoaW5wdXRQcm9wcy5pZCwgZXZlbnQudGFyZ2V0LnZhbHVlKSl9XG4gICAgICBvbkZvY3VzPXtvbkZvY3VzICYmIChldmVudCA9PiBvbkZvY3VzKGlucHV0UHJvcHMuaWQsIGV2ZW50LnRhcmdldC52YWx1ZSkpfVxuICAgIC8+LFxuICAgIHNjaGVtYS5leGFtcGxlcyA/IChcbiAgICAgIDxkYXRhbGlzdFxuICAgICAgICBrZXk9e2BkYXRhbGlzdF8ke2lucHV0UHJvcHMuaWR9YH1cbiAgICAgICAgaWQ9e2BleGFtcGxlc18ke2lucHV0UHJvcHMuaWR9YH0+XG4gICAgICAgIHtbXG4gICAgICAgICAgLi4ubmV3IFNldChcbiAgICAgICAgICAgIHNjaGVtYS5leGFtcGxlcy5jb25jYXQoc2NoZW1hLmRlZmF1bHQgPyBbc2NoZW1hLmRlZmF1bHRdIDogW10pXG4gICAgICAgICAgKSxcbiAgICAgICAgXS5tYXAoZXhhbXBsZSA9PiAoXG4gICAgICAgICAgPG9wdGlvbiBrZXk9e2V4YW1wbGV9IHZhbHVlPXtleGFtcGxlfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvZGF0YWxpc3Q+XG4gICAgKSA6IG51bGwsXG4gIF07XG59XG5cbkJhc2VJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG4gIHJlcXVpcmVkOiBmYWxzZSxcbiAgZGlzYWJsZWQ6IGZhbHNlLFxuICByZWFkb25seTogZmFsc2UsXG4gIGF1dG9mb2N1czogZmFsc2UsXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEJhc2VJbnB1dC5wcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlSW5wdXQ7XG4iXX0=