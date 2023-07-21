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

import React from "react";
import * as types from "../../types";
import { asNumber } from "../../utils"; // Matches a string that ends in a . character, optionally followed by a sequence of
// digits followed by any number of 0 characters up until the end of the line.
// Ensuring that there is at least one prefixed character is important so that
// you don't incorrectly match against "0".

var trailingCharMatcherWithPrefix = /\.([0-9]*0)*$/; // This is used for trimming the trailing 0 and . characters without affecting
// the rest of the string. Its possible to use one RegEx with groups for this
// functionality, but it is fairly complex compared to simply defining two
// different matchers.

var trailingCharMatcher = /[0.]0*$/;
/**
 * The NumberField class has some special handling for dealing with trailing
 * decimal points and/or zeroes. This logic is designed to allow trailing values
 * to be visible in the input element, but not be represented in the
 * corresponding form data.
 *
 * The algorithm is as follows:
 *
 * 1. When the input value changes the value is cached in the component state
 *
 * 2. The value is then normalized, removing trailing decimal points and zeros,
 *    then passed to the "onChange" callback
 *
 * 3. When the component is rendered, the formData value is checked against the
 *    value cached in the state. If it matches the cached value, the cached
 *    value is passed to the input instead of the formData value
 */

var NumberField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberField, _React$Component);

  function NumberField(props) {
    var _this;

    _classCallCheck(this, NumberField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberField).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
      // Cache the original value in component state
      _this.setState({
        lastValue: value
      }); // Normalize decimals that don't start with a zero character in advance so
      // that the rest of the normalization logic is simpler


      if ("".concat(value).charAt(0) === ".") {
        value = "0".concat(value);
      } // Check that the value is a string (this can happen if the widget used is a
      // <select>, due to an enum declaration etc) then, if the value ends in a
      // trailing decimal point or multiple zeroes, strip the trailing values


      var processed = typeof value === "string" && value.match(trailingCharMatcherWithPrefix) ? asNumber(value.replace(trailingCharMatcher, "")) : asNumber(value);

      _this.props.onChange(processed);
    });

    _this.state = {
      lastValue: props.value
    };
    return _this;
  }

  _createClass(NumberField, [{
    key: "render",
    value: function render() {
      var StringField = this.props.registry.fields.StringField;

      var _this$props = this.props,
          formData = _this$props.formData,
          props = _objectWithoutProperties(_this$props, ["formData"]);

      var lastValue = this.state.lastValue;
      var value = formData;

      if (typeof lastValue === "string" && typeof value === "number") {
        // Construct a regular expression that checks for a string that consists
        // of the formData value suffixed with zero or one '.' characters and zero
        // or more '0' characters
        var re = new RegExp("".concat(value).replace(".", "\\.") + "\\.?0*$"); // If the cached "lastValue" is a match, use that instead of the formData
        // value to prevent the input value from changing in the UI

        if (lastValue.match(re)) {
          value = lastValue;
        }
      }

      return React.createElement(StringField, _extends({}, props, {
        formData: value,
        onChange: this.handleChange
      }));
    }
  }]);

  return NumberField;
}(React.Component);

if (process.env.NODE_ENV !== "production") {
  NumberField.propTypes = types.fieldProps;
}

NumberField.defaultProps = {
  uiSchema: {}
};
export default NumberField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9OdW1iZXJGaWVsZC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInR5cGVzIiwiYXNOdW1iZXIiLCJ0cmFpbGluZ0NoYXJNYXRjaGVyV2l0aFByZWZpeCIsInRyYWlsaW5nQ2hhck1hdGNoZXIiLCJOdW1iZXJGaWVsZCIsInByb3BzIiwidmFsdWUiLCJzZXRTdGF0ZSIsImxhc3RWYWx1ZSIsImNoYXJBdCIsInByb2Nlc3NlZCIsIm1hdGNoIiwicmVwbGFjZSIsIm9uQ2hhbmdlIiwic3RhdGUiLCJTdHJpbmdGaWVsZCIsInJlZ2lzdHJ5IiwiZmllbGRzIiwiZm9ybURhdGEiLCJyZSIsIlJlZ0V4cCIsImhhbmRsZUNoYW5nZSIsIkNvbXBvbmVudCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsImZpZWxkUHJvcHMiLCJkZWZhdWx0UHJvcHMiLCJ1aVNjaGVtYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBRUEsT0FBTyxLQUFLQyxLQUFaLE1BQXVCLGFBQXZCO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixhQUF6QixDLENBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBTUMsNkJBQTZCLEdBQUcsZUFBdEMsQyxDQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLElBQU1DLG1CQUFtQixHQUFHLFNBQTVCO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWlCTUMsVzs7Ozs7QUFDSix1QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNqQixxRkFBTUEsS0FBTjs7QUFEaUIsbUVBUUosVUFBQUMsS0FBSyxFQUFJO0FBQ3RCO0FBQ0EsWUFBS0MsUUFBTCxDQUFjO0FBQUVDLFFBQUFBLFNBQVMsRUFBRUY7QUFBYixPQUFkLEVBRnNCLENBSXRCO0FBQ0E7OztBQUNBLFVBQUksVUFBR0EsS0FBSCxFQUFXRyxNQUFYLENBQWtCLENBQWxCLE1BQXlCLEdBQTdCLEVBQWtDO0FBQ2hDSCxRQUFBQSxLQUFLLGNBQU9BLEtBQVAsQ0FBTDtBQUNELE9BUnFCLENBVXRCO0FBQ0E7QUFDQTs7O0FBQ0EsVUFBSUksU0FBUyxHQUNYLE9BQU9KLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJBLEtBQUssQ0FBQ0ssS0FBTixDQUFZVCw2QkFBWixDQUE3QixHQUNJRCxRQUFRLENBQUNLLEtBQUssQ0FBQ00sT0FBTixDQUFjVCxtQkFBZCxFQUFtQyxFQUFuQyxDQUFELENBRFosR0FFSUYsUUFBUSxDQUFDSyxLQUFELENBSGQ7O0FBS0EsWUFBS0QsS0FBTCxDQUFXUSxRQUFYLENBQW9CSCxTQUFwQjtBQUNELEtBM0JrQjs7QUFHakIsVUFBS0ksS0FBTCxHQUFhO0FBQ1hOLE1BQUFBLFNBQVMsRUFBRUgsS0FBSyxDQUFDQztBQUROLEtBQWI7QUFIaUI7QUFNbEI7Ozs7NkJBdUJRO0FBQUEsVUFDQ1MsV0FERCxHQUNpQixLQUFLVixLQUFMLENBQVdXLFFBQVgsQ0FBb0JDLE1BRHJDLENBQ0NGLFdBREQ7O0FBQUEsd0JBRXdCLEtBQUtWLEtBRjdCO0FBQUEsVUFFQ2EsUUFGRCxlQUVDQSxRQUZEO0FBQUEsVUFFY2IsS0FGZDs7QUFBQSxVQUdDRyxTQUhELEdBR2UsS0FBS00sS0FIcEIsQ0FHQ04sU0FIRDtBQUtQLFVBQUlGLEtBQUssR0FBR1ksUUFBWjs7QUFFQSxVQUFJLE9BQU9WLFNBQVAsS0FBcUIsUUFBckIsSUFBaUMsT0FBT0YsS0FBUCxLQUFpQixRQUF0RCxFQUFnRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxZQUFNYSxFQUFFLEdBQUcsSUFBSUMsTUFBSixDQUFXLFVBQUdkLEtBQUgsRUFBV00sT0FBWCxDQUFtQixHQUFuQixFQUF3QixLQUF4QixJQUFpQyxTQUE1QyxDQUFYLENBSjhELENBTTlEO0FBQ0E7O0FBQ0EsWUFBSUosU0FBUyxDQUFDRyxLQUFWLENBQWdCUSxFQUFoQixDQUFKLEVBQXlCO0FBQ3ZCYixVQUFBQSxLQUFLLEdBQUdFLFNBQVI7QUFDRDtBQUNGOztBQUVELGFBQ0Usb0JBQUMsV0FBRCxlQUFpQkgsS0FBakI7QUFBd0IsUUFBQSxRQUFRLEVBQUVDLEtBQWxDO0FBQXlDLFFBQUEsUUFBUSxFQUFFLEtBQUtlO0FBQXhELFNBREY7QUFHRDs7OztFQXJEdUJ0QixLQUFLLENBQUN1QixTOztBQXdEaEMsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNyQixFQUFBQSxXQUFXLENBQUNzQixTQUFaLEdBQXdCMUIsS0FBSyxDQUFDMkIsVUFBOUI7QUFDRDs7QUFFRHZCLFdBQVcsQ0FBQ3dCLFlBQVosR0FBMkI7QUFDekJDLEVBQUFBLFFBQVEsRUFBRTtBQURlLENBQTNCO0FBSUEsZUFBZXpCLFdBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gXCIuLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgYXNOdW1iZXIgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuLy8gTWF0Y2hlcyBhIHN0cmluZyB0aGF0IGVuZHMgaW4gYSAuIGNoYXJhY3Rlciwgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBhIHNlcXVlbmNlIG9mXG4vLyBkaWdpdHMgZm9sbG93ZWQgYnkgYW55IG51bWJlciBvZiAwIGNoYXJhY3RlcnMgdXAgdW50aWwgdGhlIGVuZCBvZiB0aGUgbGluZS5cbi8vIEVuc3VyaW5nIHRoYXQgdGhlcmUgaXMgYXQgbGVhc3Qgb25lIHByZWZpeGVkIGNoYXJhY3RlciBpcyBpbXBvcnRhbnQgc28gdGhhdFxuLy8geW91IGRvbid0IGluY29ycmVjdGx5IG1hdGNoIGFnYWluc3QgXCIwXCIuXG5jb25zdCB0cmFpbGluZ0NoYXJNYXRjaGVyV2l0aFByZWZpeCA9IC9cXC4oWzAtOV0qMCkqJC87XG5cbi8vIFRoaXMgaXMgdXNlZCBmb3IgdHJpbW1pbmcgdGhlIHRyYWlsaW5nIDAgYW5kIC4gY2hhcmFjdGVycyB3aXRob3V0IGFmZmVjdGluZ1xuLy8gdGhlIHJlc3Qgb2YgdGhlIHN0cmluZy4gSXRzIHBvc3NpYmxlIHRvIHVzZSBvbmUgUmVnRXggd2l0aCBncm91cHMgZm9yIHRoaXNcbi8vIGZ1bmN0aW9uYWxpdHksIGJ1dCBpdCBpcyBmYWlybHkgY29tcGxleCBjb21wYXJlZCB0byBzaW1wbHkgZGVmaW5pbmcgdHdvXG4vLyBkaWZmZXJlbnQgbWF0Y2hlcnMuXG5jb25zdCB0cmFpbGluZ0NoYXJNYXRjaGVyID0gL1swLl0wKiQvO1xuXG4vKipcbiAqIFRoZSBOdW1iZXJGaWVsZCBjbGFzcyBoYXMgc29tZSBzcGVjaWFsIGhhbmRsaW5nIGZvciBkZWFsaW5nIHdpdGggdHJhaWxpbmdcbiAqIGRlY2ltYWwgcG9pbnRzIGFuZC9vciB6ZXJvZXMuIFRoaXMgbG9naWMgaXMgZGVzaWduZWQgdG8gYWxsb3cgdHJhaWxpbmcgdmFsdWVzXG4gKiB0byBiZSB2aXNpYmxlIGluIHRoZSBpbnB1dCBlbGVtZW50LCBidXQgbm90IGJlIHJlcHJlc2VudGVkIGluIHRoZVxuICogY29ycmVzcG9uZGluZyBmb3JtIGRhdGEuXG4gKlxuICogVGhlIGFsZ29yaXRobSBpcyBhcyBmb2xsb3dzOlxuICpcbiAqIDEuIFdoZW4gdGhlIGlucHV0IHZhbHVlIGNoYW5nZXMgdGhlIHZhbHVlIGlzIGNhY2hlZCBpbiB0aGUgY29tcG9uZW50IHN0YXRlXG4gKlxuICogMi4gVGhlIHZhbHVlIGlzIHRoZW4gbm9ybWFsaXplZCwgcmVtb3ZpbmcgdHJhaWxpbmcgZGVjaW1hbCBwb2ludHMgYW5kIHplcm9zLFxuICogICAgdGhlbiBwYXNzZWQgdG8gdGhlIFwib25DaGFuZ2VcIiBjYWxsYmFja1xuICpcbiAqIDMuIFdoZW4gdGhlIGNvbXBvbmVudCBpcyByZW5kZXJlZCwgdGhlIGZvcm1EYXRhIHZhbHVlIGlzIGNoZWNrZWQgYWdhaW5zdCB0aGVcbiAqICAgIHZhbHVlIGNhY2hlZCBpbiB0aGUgc3RhdGUuIElmIGl0IG1hdGNoZXMgdGhlIGNhY2hlZCB2YWx1ZSwgdGhlIGNhY2hlZFxuICogICAgdmFsdWUgaXMgcGFzc2VkIHRvIHRoZSBpbnB1dCBpbnN0ZWFkIG9mIHRoZSBmb3JtRGF0YSB2YWx1ZVxuICovXG5jbGFzcyBOdW1iZXJGaWVsZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGxhc3RWYWx1ZTogcHJvcHMudmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZSA9IHZhbHVlID0+IHtcbiAgICAvLyBDYWNoZSB0aGUgb3JpZ2luYWwgdmFsdWUgaW4gY29tcG9uZW50IHN0YXRlXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGxhc3RWYWx1ZTogdmFsdWUgfSk7XG5cbiAgICAvLyBOb3JtYWxpemUgZGVjaW1hbHMgdGhhdCBkb24ndCBzdGFydCB3aXRoIGEgemVybyBjaGFyYWN0ZXIgaW4gYWR2YW5jZSBzb1xuICAgIC8vIHRoYXQgdGhlIHJlc3Qgb2YgdGhlIG5vcm1hbGl6YXRpb24gbG9naWMgaXMgc2ltcGxlclxuICAgIGlmIChgJHt2YWx1ZX1gLmNoYXJBdCgwKSA9PT0gXCIuXCIpIHtcbiAgICAgIHZhbHVlID0gYDAke3ZhbHVlfWA7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgdmFsdWUgaXMgYSBzdHJpbmcgKHRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgd2lkZ2V0IHVzZWQgaXMgYVxuICAgIC8vIDxzZWxlY3Q+LCBkdWUgdG8gYW4gZW51bSBkZWNsYXJhdGlvbiBldGMpIHRoZW4sIGlmIHRoZSB2YWx1ZSBlbmRzIGluIGFcbiAgICAvLyB0cmFpbGluZyBkZWNpbWFsIHBvaW50IG9yIG11bHRpcGxlIHplcm9lcywgc3RyaXAgdGhlIHRyYWlsaW5nIHZhbHVlc1xuICAgIGxldCBwcm9jZXNzZWQgPVxuICAgICAgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLm1hdGNoKHRyYWlsaW5nQ2hhck1hdGNoZXJXaXRoUHJlZml4KVxuICAgICAgICA/IGFzTnVtYmVyKHZhbHVlLnJlcGxhY2UodHJhaWxpbmdDaGFyTWF0Y2hlciwgXCJcIikpXG4gICAgICAgIDogYXNOdW1iZXIodmFsdWUpO1xuXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShwcm9jZXNzZWQpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IFN0cmluZ0ZpZWxkIH0gPSB0aGlzLnByb3BzLnJlZ2lzdHJ5LmZpZWxkcztcbiAgICBjb25zdCB7IGZvcm1EYXRhLCAuLi5wcm9wcyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGxhc3RWYWx1ZSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGxldCB2YWx1ZSA9IGZvcm1EYXRhO1xuXG4gICAgaWYgKHR5cGVvZiBsYXN0VmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAvLyBDb25zdHJ1Y3QgYSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCBjaGVja3MgZm9yIGEgc3RyaW5nIHRoYXQgY29uc2lzdHNcbiAgICAgIC8vIG9mIHRoZSBmb3JtRGF0YSB2YWx1ZSBzdWZmaXhlZCB3aXRoIHplcm8gb3Igb25lICcuJyBjaGFyYWN0ZXJzIGFuZCB6ZXJvXG4gICAgICAvLyBvciBtb3JlICcwJyBjaGFyYWN0ZXJzXG4gICAgICBjb25zdCByZSA9IG5ldyBSZWdFeHAoYCR7dmFsdWV9YC5yZXBsYWNlKFwiLlwiLCBcIlxcXFwuXCIpICsgXCJcXFxcLj8wKiRcIik7XG5cbiAgICAgIC8vIElmIHRoZSBjYWNoZWQgXCJsYXN0VmFsdWVcIiBpcyBhIG1hdGNoLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBmb3JtRGF0YVxuICAgICAgLy8gdmFsdWUgdG8gcHJldmVudCB0aGUgaW5wdXQgdmFsdWUgZnJvbSBjaGFuZ2luZyBpbiB0aGUgVUlcbiAgICAgIGlmIChsYXN0VmFsdWUubWF0Y2gocmUpKSB7XG4gICAgICAgIHZhbHVlID0gbGFzdFZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8U3RyaW5nRmllbGQgey4uLnByb3BzfSBmb3JtRGF0YT17dmFsdWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cbiAgICApO1xuICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgTnVtYmVyRmllbGQucHJvcFR5cGVzID0gdHlwZXMuZmllbGRQcm9wcztcbn1cblxuTnVtYmVyRmllbGQuZGVmYXVsdFByb3BzID0ge1xuICB1aVNjaGVtYToge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOdW1iZXJGaWVsZDtcbiJdfQ==