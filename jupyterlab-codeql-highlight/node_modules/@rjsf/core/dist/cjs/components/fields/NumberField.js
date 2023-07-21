"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var types = _interopRequireWildcard(require("../../types"));

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

// Matches a string that ends in a . character, optionally followed by a sequence of
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


      var processed = typeof value === "string" && value.match(trailingCharMatcherWithPrefix) ? (0, _utils.asNumber)(value.replace(trailingCharMatcher, "")) : (0, _utils.asNumber)(value);

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

      return _react["default"].createElement(StringField, _extends({}, props, {
        formData: value,
        onChange: this.handleChange
      }));
    }
  }]);

  return NumberField;
}(_react["default"].Component);

if (process.env.NODE_ENV !== "production") {
  NumberField.propTypes = types.fieldProps;
}

NumberField.defaultProps = {
  uiSchema: {}
};
var _default = NumberField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9OdW1iZXJGaWVsZC5qcyJdLCJuYW1lcyI6WyJ0cmFpbGluZ0NoYXJNYXRjaGVyV2l0aFByZWZpeCIsInRyYWlsaW5nQ2hhck1hdGNoZXIiLCJOdW1iZXJGaWVsZCIsInByb3BzIiwidmFsdWUiLCJzZXRTdGF0ZSIsImxhc3RWYWx1ZSIsImNoYXJBdCIsInByb2Nlc3NlZCIsIm1hdGNoIiwicmVwbGFjZSIsIm9uQ2hhbmdlIiwic3RhdGUiLCJTdHJpbmdGaWVsZCIsInJlZ2lzdHJ5IiwiZmllbGRzIiwiZm9ybURhdGEiLCJyZSIsIlJlZ0V4cCIsImhhbmRsZUNoYW5nZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidHlwZXMiLCJmaWVsZFByb3BzIiwiZGVmYXVsdFByb3BzIiwidWlTY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLDZCQUE2QixHQUFHLGVBQXRDLEMsQ0FFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxTQUE1QjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFpQk1DLFc7Ozs7O0FBQ0osdUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDakIscUZBQU1BLEtBQU47O0FBRGlCLG1FQVFKLFVBQUFDLEtBQUssRUFBSTtBQUN0QjtBQUNBLFlBQUtDLFFBQUwsQ0FBYztBQUFFQyxRQUFBQSxTQUFTLEVBQUVGO0FBQWIsT0FBZCxFQUZzQixDQUl0QjtBQUNBOzs7QUFDQSxVQUFJLFVBQUdBLEtBQUgsRUFBV0csTUFBWCxDQUFrQixDQUFsQixNQUF5QixHQUE3QixFQUFrQztBQUNoQ0gsUUFBQUEsS0FBSyxjQUFPQSxLQUFQLENBQUw7QUFDRCxPQVJxQixDQVV0QjtBQUNBO0FBQ0E7OztBQUNBLFVBQUlJLFNBQVMsR0FDWCxPQUFPSixLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxLQUFLLENBQUNLLEtBQU4sQ0FBWVQsNkJBQVosQ0FBN0IsR0FDSSxxQkFBU0ksS0FBSyxDQUFDTSxPQUFOLENBQWNULG1CQUFkLEVBQW1DLEVBQW5DLENBQVQsQ0FESixHQUVJLHFCQUFTRyxLQUFULENBSE47O0FBS0EsWUFBS0QsS0FBTCxDQUFXUSxRQUFYLENBQW9CSCxTQUFwQjtBQUNELEtBM0JrQjs7QUFHakIsVUFBS0ksS0FBTCxHQUFhO0FBQ1hOLE1BQUFBLFNBQVMsRUFBRUgsS0FBSyxDQUFDQztBQUROLEtBQWI7QUFIaUI7QUFNbEI7Ozs7NkJBdUJRO0FBQUEsVUFDQ1MsV0FERCxHQUNpQixLQUFLVixLQUFMLENBQVdXLFFBQVgsQ0FBb0JDLE1BRHJDLENBQ0NGLFdBREQ7O0FBQUEsd0JBRXdCLEtBQUtWLEtBRjdCO0FBQUEsVUFFQ2EsUUFGRCxlQUVDQSxRQUZEO0FBQUEsVUFFY2IsS0FGZDs7QUFBQSxVQUdDRyxTQUhELEdBR2UsS0FBS00sS0FIcEIsQ0FHQ04sU0FIRDtBQUtQLFVBQUlGLEtBQUssR0FBR1ksUUFBWjs7QUFFQSxVQUFJLE9BQU9WLFNBQVAsS0FBcUIsUUFBckIsSUFBaUMsT0FBT0YsS0FBUCxLQUFpQixRQUF0RCxFQUFnRTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxZQUFNYSxFQUFFLEdBQUcsSUFBSUMsTUFBSixDQUFXLFVBQUdkLEtBQUgsRUFBV00sT0FBWCxDQUFtQixHQUFuQixFQUF3QixLQUF4QixJQUFpQyxTQUE1QyxDQUFYLENBSjhELENBTTlEO0FBQ0E7O0FBQ0EsWUFBSUosU0FBUyxDQUFDRyxLQUFWLENBQWdCUSxFQUFoQixDQUFKLEVBQXlCO0FBQ3ZCYixVQUFBQSxLQUFLLEdBQUdFLFNBQVI7QUFDRDtBQUNGOztBQUVELGFBQ0UsZ0NBQUMsV0FBRCxlQUFpQkgsS0FBakI7QUFBd0IsUUFBQSxRQUFRLEVBQUVDLEtBQWxDO0FBQXlDLFFBQUEsUUFBUSxFQUFFLEtBQUtlO0FBQXhELFNBREY7QUFHRDs7OztFQXJEdUJDLGtCQUFNQyxTOztBQXdEaEMsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekN0QixFQUFBQSxXQUFXLENBQUN1QixTQUFaLEdBQXdCQyxLQUFLLENBQUNDLFVBQTlCO0FBQ0Q7O0FBRUR6QixXQUFXLENBQUMwQixZQUFaLEdBQTJCO0FBQ3pCQyxFQUFBQSxRQUFRLEVBQUU7QUFEZSxDQUEzQjtlQUllM0IsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgdHlwZXMgZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBhc051bWJlciB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG4vLyBNYXRjaGVzIGEgc3RyaW5nIHRoYXQgZW5kcyBpbiBhIC4gY2hhcmFjdGVyLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5IGEgc2VxdWVuY2Ugb2Zcbi8vIGRpZ2l0cyBmb2xsb3dlZCBieSBhbnkgbnVtYmVyIG9mIDAgY2hhcmFjdGVycyB1cCB1bnRpbCB0aGUgZW5kIG9mIHRoZSBsaW5lLlxuLy8gRW5zdXJpbmcgdGhhdCB0aGVyZSBpcyBhdCBsZWFzdCBvbmUgcHJlZml4ZWQgY2hhcmFjdGVyIGlzIGltcG9ydGFudCBzbyB0aGF0XG4vLyB5b3UgZG9uJ3QgaW5jb3JyZWN0bHkgbWF0Y2ggYWdhaW5zdCBcIjBcIi5cbmNvbnN0IHRyYWlsaW5nQ2hhck1hdGNoZXJXaXRoUHJlZml4ID0gL1xcLihbMC05XSowKSokLztcblxuLy8gVGhpcyBpcyB1c2VkIGZvciB0cmltbWluZyB0aGUgdHJhaWxpbmcgMCBhbmQgLiBjaGFyYWN0ZXJzIHdpdGhvdXQgYWZmZWN0aW5nXG4vLyB0aGUgcmVzdCBvZiB0aGUgc3RyaW5nLiBJdHMgcG9zc2libGUgdG8gdXNlIG9uZSBSZWdFeCB3aXRoIGdyb3VwcyBmb3IgdGhpc1xuLy8gZnVuY3Rpb25hbGl0eSwgYnV0IGl0IGlzIGZhaXJseSBjb21wbGV4IGNvbXBhcmVkIHRvIHNpbXBseSBkZWZpbmluZyB0d29cbi8vIGRpZmZlcmVudCBtYXRjaGVycy5cbmNvbnN0IHRyYWlsaW5nQ2hhck1hdGNoZXIgPSAvWzAuXTAqJC87XG5cbi8qKlxuICogVGhlIE51bWJlckZpZWxkIGNsYXNzIGhhcyBzb21lIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGRlYWxpbmcgd2l0aCB0cmFpbGluZ1xuICogZGVjaW1hbCBwb2ludHMgYW5kL29yIHplcm9lcy4gVGhpcyBsb2dpYyBpcyBkZXNpZ25lZCB0byBhbGxvdyB0cmFpbGluZyB2YWx1ZXNcbiAqIHRvIGJlIHZpc2libGUgaW4gdGhlIGlucHV0IGVsZW1lbnQsIGJ1dCBub3QgYmUgcmVwcmVzZW50ZWQgaW4gdGhlXG4gKiBjb3JyZXNwb25kaW5nIGZvcm0gZGF0YS5cbiAqXG4gKiBUaGUgYWxnb3JpdGhtIGlzIGFzIGZvbGxvd3M6XG4gKlxuICogMS4gV2hlbiB0aGUgaW5wdXQgdmFsdWUgY2hhbmdlcyB0aGUgdmFsdWUgaXMgY2FjaGVkIGluIHRoZSBjb21wb25lbnQgc3RhdGVcbiAqXG4gKiAyLiBUaGUgdmFsdWUgaXMgdGhlbiBub3JtYWxpemVkLCByZW1vdmluZyB0cmFpbGluZyBkZWNpbWFsIHBvaW50cyBhbmQgemVyb3MsXG4gKiAgICB0aGVuIHBhc3NlZCB0byB0aGUgXCJvbkNoYW5nZVwiIGNhbGxiYWNrXG4gKlxuICogMy4gV2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbmRlcmVkLCB0aGUgZm9ybURhdGEgdmFsdWUgaXMgY2hlY2tlZCBhZ2FpbnN0IHRoZVxuICogICAgdmFsdWUgY2FjaGVkIGluIHRoZSBzdGF0ZS4gSWYgaXQgbWF0Y2hlcyB0aGUgY2FjaGVkIHZhbHVlLCB0aGUgY2FjaGVkXG4gKiAgICB2YWx1ZSBpcyBwYXNzZWQgdG8gdGhlIGlucHV0IGluc3RlYWQgb2YgdGhlIGZvcm1EYXRhIHZhbHVlXG4gKi9cbmNsYXNzIE51bWJlckZpZWxkIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbGFzdFZhbHVlOiBwcm9wcy52YWx1ZSxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlID0gdmFsdWUgPT4ge1xuICAgIC8vIENhY2hlIHRoZSBvcmlnaW5hbCB2YWx1ZSBpbiBjb21wb25lbnQgc3RhdGVcbiAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFZhbHVlOiB2YWx1ZSB9KTtcblxuICAgIC8vIE5vcm1hbGl6ZSBkZWNpbWFscyB0aGF0IGRvbid0IHN0YXJ0IHdpdGggYSB6ZXJvIGNoYXJhY3RlciBpbiBhZHZhbmNlIHNvXG4gICAgLy8gdGhhdCB0aGUgcmVzdCBvZiB0aGUgbm9ybWFsaXphdGlvbiBsb2dpYyBpcyBzaW1wbGVyXG4gICAgaWYgKGAke3ZhbHVlfWAuY2hhckF0KDApID09PSBcIi5cIikge1xuICAgICAgdmFsdWUgPSBgMCR7dmFsdWV9YDtcbiAgICB9XG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSB2YWx1ZSBpcyBhIHN0cmluZyAodGhpcyBjYW4gaGFwcGVuIGlmIHRoZSB3aWRnZXQgdXNlZCBpcyBhXG4gICAgLy8gPHNlbGVjdD4sIGR1ZSB0byBhbiBlbnVtIGRlY2xhcmF0aW9uIGV0YykgdGhlbiwgaWYgdGhlIHZhbHVlIGVuZHMgaW4gYVxuICAgIC8vIHRyYWlsaW5nIGRlY2ltYWwgcG9pbnQgb3IgbXVsdGlwbGUgemVyb2VzLCBzdHJpcCB0aGUgdHJhaWxpbmcgdmFsdWVzXG4gICAgbGV0IHByb2Nlc3NlZCA9XG4gICAgICB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubWF0Y2godHJhaWxpbmdDaGFyTWF0Y2hlcldpdGhQcmVmaXgpXG4gICAgICAgID8gYXNOdW1iZXIodmFsdWUucmVwbGFjZSh0cmFpbGluZ0NoYXJNYXRjaGVyLCBcIlwiKSlcbiAgICAgICAgOiBhc051bWJlcih2YWx1ZSk7XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHByb2Nlc3NlZCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgU3RyaW5nRmllbGQgfSA9IHRoaXMucHJvcHMucmVnaXN0cnkuZmllbGRzO1xuICAgIGNvbnN0IHsgZm9ybURhdGEsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgbGFzdFZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgbGV0IHZhbHVlID0gZm9ybURhdGE7XG5cbiAgICBpZiAodHlwZW9mIGxhc3RWYWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIC8vIENvbnN0cnVjdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0aGF0IGNoZWNrcyBmb3IgYSBzdHJpbmcgdGhhdCBjb25zaXN0c1xuICAgICAgLy8gb2YgdGhlIGZvcm1EYXRhIHZhbHVlIHN1ZmZpeGVkIHdpdGggemVybyBvciBvbmUgJy4nIGNoYXJhY3RlcnMgYW5kIHplcm9cbiAgICAgIC8vIG9yIG1vcmUgJzAnIGNoYXJhY3RlcnNcbiAgICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChgJHt2YWx1ZX1gLnJlcGxhY2UoXCIuXCIsIFwiXFxcXC5cIikgKyBcIlxcXFwuPzAqJFwiKTtcblxuICAgICAgLy8gSWYgdGhlIGNhY2hlZCBcImxhc3RWYWx1ZVwiIGlzIGEgbWF0Y2gsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIGZvcm1EYXRhXG4gICAgICAvLyB2YWx1ZSB0byBwcmV2ZW50IHRoZSBpbnB1dCB2YWx1ZSBmcm9tIGNoYW5naW5nIGluIHRoZSBVSVxuICAgICAgaWYgKGxhc3RWYWx1ZS5tYXRjaChyZSkpIHtcbiAgICAgICAgdmFsdWUgPSBsYXN0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHJpbmdGaWVsZCB7Li4ucHJvcHN9IGZvcm1EYXRhPXt2YWx1ZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxuICAgICk7XG4gIH1cbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBOdW1iZXJGaWVsZC5wcm9wVHlwZXMgPSB0eXBlcy5maWVsZFByb3BzO1xufVxuXG5OdW1iZXJGaWVsZC5kZWZhdWx0UHJvcHMgPSB7XG4gIHVpU2NoZW1hOiB7fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE51bWJlckZpZWxkO1xuIl19