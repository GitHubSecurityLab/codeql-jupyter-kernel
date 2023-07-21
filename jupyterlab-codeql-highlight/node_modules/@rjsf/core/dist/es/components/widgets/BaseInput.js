function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
import PropTypes from "prop-types";

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

  return [React.createElement("input", _extends({
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
  })), schema.examples ? React.createElement("datalist", {
    key: "datalist_".concat(inputProps.id),
    id: "examples_".concat(inputProps.id)
  }, _toConsumableArray(new Set(schema.examples.concat(schema["default"] ? [schema["default"]] : []))).map(function (example) {
    return React.createElement("option", {
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
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func
  };
}

export default BaseInput;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQmFzZUlucHV0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiQmFzZUlucHV0IiwicHJvcHMiLCJpZCIsImNvbnNvbGUiLCJsb2ciLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWx1ZSIsInJlYWRvbmx5IiwiZGlzYWJsZWQiLCJhdXRvZm9jdXMiLCJvbkJsdXIiLCJvbkZvY3VzIiwib3B0aW9ucyIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybUNvbnRleHQiLCJyZWdpc3RyeSIsInJhd0Vycm9ycyIsImlucHV0UHJvcHMiLCJpbnB1dFR5cGUiLCJ0eXBlIiwic3RlcCIsImF1dG9jb21wbGV0ZSIsImF1dG9Db21wbGV0ZSIsIm11bHRpcGxlT2YiLCJtaW5pbXVtIiwibWluIiwibWF4aW11bSIsIm1heCIsIl9vbkNoYW5nZSIsInRhcmdldCIsIm9uQ2hhbmdlIiwiZW1wdHlWYWx1ZSIsImV4YW1wbGVzIiwiZXZlbnQiLCJTZXQiLCJjb25jYXQiLCJtYXAiLCJleGFtcGxlIiwiZGVmYXVsdFByb3BzIiwicmVxdWlyZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwicGxhY2Vob2xkZXIiLCJhbnkiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN4QjtBQUNBO0FBQ0EsTUFBSSxDQUFDQSxLQUFLLENBQUNDLEVBQVgsRUFBZTtBQUNiQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxXQUFaLEVBQXlCSCxLQUF6QjtBQUNBLFVBQU0sSUFBSUksS0FBSiwyQkFBNkJDLElBQUksQ0FBQ0MsU0FBTCxDQUFlTixL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QUE3QixNQURXO0FBQUEsR0FKWixDQUhILENBREYsR0FZSSxJQTFCQyxDQUFQO0FBNEJEOztBQUVEeEMsU0FBUyxDQUFDeUMsWUFBVixHQUF5QjtBQUN2QkMsRUFBQUEsUUFBUSxFQUFFLEtBRGE7QUFFdkJoQyxFQUFBQSxRQUFRLEVBQUUsS0FGYTtBQUd2QkQsRUFBQUEsUUFBUSxFQUFFLEtBSGE7QUFJdkJFLEVBQUFBLFNBQVMsRUFBRTtBQUpZLENBQXpCOztBQU9BLElBQUlnQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QzdDLEVBQUFBLFNBQVMsQ0FBQzhDLFNBQVYsR0FBc0I7QUFDcEI1QyxJQUFBQSxFQUFFLEVBQUVILFNBQVMsQ0FBQ2dELE1BQVYsQ0FBaUJDLFVBREQ7QUFFcEJDLElBQUFBLFdBQVcsRUFBRWxELFNBQVMsQ0FBQ2dELE1BRkg7QUFHcEJ2QyxJQUFBQSxLQUFLLEVBQUVULFNBQVMsQ0FBQ21ELEdBSEc7QUFJcEJSLElBQUFBLFFBQVEsRUFBRTNDLFNBQVMsQ0FBQ29ELElBSkE7QUFLcEJ6QyxJQUFBQSxRQUFRLEVBQUVYLFNBQVMsQ0FBQ29ELElBTEE7QUFNcEIxQyxJQUFBQSxRQUFRLEVBQUVWLFNBQVMsQ0FBQ29ELElBTkE7QUFPcEJ4QyxJQUFBQSxTQUFTLEVBQUVaLFNBQVMsQ0FBQ29ELElBUEQ7QUFRcEJsQixJQUFBQSxRQUFRLEVBQUVsQyxTQUFTLENBQUNxRCxJQVJBO0FBU3BCeEMsSUFBQUEsTUFBTSxFQUFFYixTQUFTLENBQUNxRCxJQVRFO0FBVXBCdkMsSUFBQUEsT0FBTyxFQUFFZCxTQUFTLENBQUNxRDtBQVZDLEdBQXRCO0FBWUQ7O0FBRUQsZUFBZXBELFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmZ1bmN0aW9uIEJhc2VJbnB1dChwcm9wcykge1xuICAvLyBOb3RlOiBzaW5jZSBSZWFjdCAxNS4yLjAgd2UgY2FuJ3QgZm9yd2FyZCB1bmtub3duIGVsZW1lbnQgYXR0cmlidXRlcywgc28gd2VcbiAgLy8gZXhjbHVkZSB0aGUgXCJvcHRpb25zXCIgYW5kIFwic2NoZW1hXCIgb25lcyBoZXJlLlxuICBpZiAoIXByb3BzLmlkKSB7XG4gICAgY29uc29sZS5sb2coXCJObyBpZCBmb3JcIiwgcHJvcHMpO1xuICAgIHRocm93IG5ldyBFcnJvcihgbm8gaWQgZm9yIHByb3BzICR7SlNPTi5zdHJpbmdpZnkocHJvcHMpfWApO1xuICB9XG4gIGNvbnN0IHtcbiAgICB2YWx1ZSxcbiAgICByZWFkb25seSxcbiAgICBkaXNhYmxlZCxcbiAgICBhdXRvZm9jdXMsXG4gICAgb25CbHVyLFxuICAgIG9uRm9jdXMsXG4gICAgb3B0aW9ucyxcbiAgICBzY2hlbWEsXG4gICAgdWlTY2hlbWEsXG4gICAgZm9ybUNvbnRleHQsXG4gICAgcmVnaXN0cnksXG4gICAgcmF3RXJyb3JzLFxuICAgIC4uLmlucHV0UHJvcHNcbiAgfSA9IHByb3BzO1xuXG4gIC8vIElmIG9wdGlvbnMuaW5wdXRUeXBlIGlzIHNldCB1c2UgdGhhdCBhcyB0aGUgaW5wdXQgdHlwZVxuICBpZiAob3B0aW9ucy5pbnB1dFR5cGUpIHtcbiAgICBpbnB1dFByb3BzLnR5cGUgPSBvcHRpb25zLmlucHV0VHlwZTtcbiAgfSBlbHNlIGlmICghaW5wdXRQcm9wcy50eXBlKSB7XG4gICAgLy8gSWYgdGhlIHNjaGVtYSBpcyBvZiB0eXBlIG51bWJlciBvciBpbnRlZ2VyLCBzZXQgdGhlIGlucHV0IHR5cGUgdG8gbnVtYmVyXG4gICAgaWYgKHNjaGVtYS50eXBlID09PSBcIm51bWJlclwiKSB7XG4gICAgICBpbnB1dFByb3BzLnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgLy8gU2V0dGluZyBzdGVwIHRvICdhbnknIGZpeGVzIGEgYnVnIGluIFNhZmFyaSB3aGVyZSBkZWNpbWFscyBhcmUgbm90XG4gICAgICAvLyBhbGxvd2VkIGluIG51bWJlciBpbnB1dHNcbiAgICAgIGlucHV0UHJvcHMuc3RlcCA9IFwiYW55XCI7XG4gICAgfSBlbHNlIGlmIChzY2hlbWEudHlwZSA9PT0gXCJpbnRlZ2VyXCIpIHtcbiAgICAgIGlucHV0UHJvcHMudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAvLyBTaW5jZSB0aGlzIGlzIGludGVnZXIsIHlvdSBhbHdheXMgd2FudCB0byBzdGVwIHVwIG9yIGRvd24gaW4gbXVsdGlwbGVzXG4gICAgICAvLyBvZiAxXG4gICAgICBpbnB1dFByb3BzLnN0ZXAgPSBcIjFcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXRQcm9wcy50eXBlID0gXCJ0ZXh0XCI7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdGlvbnMuYXV0b2NvbXBsZXRlKSB7XG4gICAgaW5wdXRQcm9wcy5hdXRvQ29tcGxldGUgPSBvcHRpb25zLmF1dG9jb21wbGV0ZTtcbiAgfVxuXG4gIC8vIElmIG11bHRpcGxlT2YgaXMgZGVmaW5lZCwgdXNlIHRoaXMgYXMgdGhlIHN0ZXAgdmFsdWUuIFRoaXMgbWFpbmx5IGltcHJvdmVzXG4gIC8vIHRoZSBleHBlcmllbmNlIGZvciBrZXlib2FyZCB1c2VycyAod2hvIGNhbiB1c2UgdGhlIHVwL2Rvd24gS0IgYXJyb3dzKS5cbiAgaWYgKHNjaGVtYS5tdWx0aXBsZU9mKSB7XG4gICAgaW5wdXRQcm9wcy5zdGVwID0gc2NoZW1hLm11bHRpcGxlT2Y7XG4gIH1cblxuICBpZiAodHlwZW9mIHNjaGVtYS5taW5pbXVtICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaW5wdXRQcm9wcy5taW4gPSBzY2hlbWEubWluaW11bTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hLm1heGltdW0gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpbnB1dFByb3BzLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xuICB9XG5cbiAgY29uc3QgX29uQ2hhbmdlID0gKHsgdGFyZ2V0OiB7IHZhbHVlIH0gfSkgPT4ge1xuICAgIHJldHVybiBwcm9wcy5vbkNoYW5nZSh2YWx1ZSA9PT0gXCJcIiA/IG9wdGlvbnMuZW1wdHlWYWx1ZSA6IHZhbHVlKTtcbiAgfTtcblxuICByZXR1cm4gW1xuICAgIDxpbnB1dFxuICAgICAga2V5PXtpbnB1dFByb3BzLmlkfVxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIHJlYWRPbmx5PXtyZWFkb25seX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGF1dG9Gb2N1cz17YXV0b2ZvY3VzfVxuICAgICAgdmFsdWU9e3ZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWV9XG4gICAgICB7Li4uaW5wdXRQcm9wc31cbiAgICAgIGxpc3Q9e3NjaGVtYS5leGFtcGxlcyA/IGBleGFtcGxlc18ke2lucHV0UHJvcHMuaWR9YCA6IG51bGx9XG4gICAgICBvbkNoYW5nZT17X29uQ2hhbmdlfVxuICAgICAgb25CbHVyPXtvbkJsdXIgJiYgKGV2ZW50ID0+IG9uQmx1cihpbnB1dFByb3BzLmlkLCBldmVudC50YXJnZXQudmFsdWUpKX1cbiAgICAgIG9uRm9jdXM9e29uRm9jdXMgJiYgKGV2ZW50ID0+IG9uRm9jdXMoaW5wdXRQcm9wcy5pZCwgZXZlbnQudGFyZ2V0LnZhbHVlKSl9XG4gICAgLz4sXG4gICAgc2NoZW1hLmV4YW1wbGVzID8gKFxuICAgICAgPGRhdGFsaXN0XG4gICAgICAgIGtleT17YGRhdGFsaXN0XyR7aW5wdXRQcm9wcy5pZH1gfVxuICAgICAgICBpZD17YGV4YW1wbGVzXyR7aW5wdXRQcm9wcy5pZH1gfT5cbiAgICAgICAge1tcbiAgICAgICAgICAuLi5uZXcgU2V0KFxuICAgICAgICAgICAgc2NoZW1hLmV4YW1wbGVzLmNvbmNhdChzY2hlbWEuZGVmYXVsdCA/IFtzY2hlbWEuZGVmYXVsdF0gOiBbXSlcbiAgICAgICAgICApLFxuICAgICAgICBdLm1hcChleGFtcGxlID0+IChcbiAgICAgICAgICA8b3B0aW9uIGtleT17ZXhhbXBsZX0gdmFsdWU9e2V4YW1wbGV9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kYXRhbGlzdD5cbiAgICApIDogbnVsbCxcbiAgXTtcbn1cblxuQmFzZUlucHV0LmRlZmF1bHRQcm9wcyA9IHtcbiAgcmVxdWlyZWQ6IGZhbHNlLFxuICBkaXNhYmxlZDogZmFsc2UsXG4gIHJlYWRvbmx5OiBmYWxzZSxcbiAgYXV0b2ZvY3VzOiBmYWxzZSxcbn07XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQmFzZUlucHV0LnByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYW55LFxuICAgIHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVhZG9ubHk6IFByb3BUeXBlcy5ib29sLFxuICAgIGF1dG9mb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uQmx1cjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VJbnB1dDtcbiJdfQ==