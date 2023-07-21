"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function RangeWidget(props) {
  var schema = props.schema,
      value = props.value,
      BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement("div", {
    className: "field-range-wrapper"
  }, _react["default"].createElement(BaseInput, _extends({
    type: "range"
  }, props, (0, _utils.rangeSpec)(schema))), _react["default"].createElement("span", {
    className: "range-view"
  }, value));
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
  };
}

var _default = RangeWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUmFuZ2VXaWRnZXQuanMiXSwibmFtZXMiOlsiUmFuZ2VXaWRnZXQiLCJwcm9wcyIsInNjaGVtYSIsInZhbHVlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib25lT2ZUeXBlIiwic3RyaW5nIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQUEsTUFFeEJDLE1BRndCLEdBT3RCRCxLQVBzQixDQUV4QkMsTUFGd0I7QUFBQSxNQUd4QkMsS0FId0IsR0FPdEJGLEtBUHNCLENBR3hCRSxLQUh3QjtBQUFBLE1BS1hDLFNBTFcsR0FPdEJILEtBUHNCLENBSXhCSSxRQUp3QixDQUt0QkMsT0FMc0IsQ0FLWEYsU0FMVztBQVExQixTQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFLGdDQUFDLFNBQUQ7QUFBVyxJQUFBLElBQUksRUFBQztBQUFoQixLQUE0QkgsS0FBNUIsRUFBdUMsc0JBQVVDLE1BQVYsQ0FBdkMsRUFERixFQUVFO0FBQU0sSUFBQSxTQUFTLEVBQUM7QUFBaEIsS0FBOEJDLEtBQTlCLENBRkYsQ0FERjtBQU1EOztBQUVELElBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDVCxFQUFBQSxXQUFXLENBQUNVLFNBQVosR0FBd0I7QUFDdEJQLElBQUFBLEtBQUssRUFBRVEsc0JBQVVDLFNBQVYsQ0FBb0IsQ0FBQ0Qsc0JBQVVFLE1BQVgsRUFBbUJGLHNCQUFVRyxNQUE3QixDQUFwQjtBQURlLEdBQXhCO0FBR0Q7O2VBRWNkLFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmltcG9ydCB7IHJhbmdlU3BlYyB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBSYW5nZVdpZGdldChwcm9wcykge1xuICBjb25zdCB7XG4gICAgc2NoZW1hLFxuICAgIHZhbHVlLFxuICAgIHJlZ2lzdHJ5OiB7XG4gICAgICB3aWRnZXRzOiB7IEJhc2VJbnB1dCB9LFxuICAgIH0sXG4gIH0gPSBwcm9wcztcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkLXJhbmdlLXdyYXBwZXJcIj5cbiAgICAgIDxCYXNlSW5wdXQgdHlwZT1cInJhbmdlXCIgey4uLnByb3BzfSB7Li4ucmFuZ2VTcGVjKHNjaGVtYSl9IC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyYW5nZS12aWV3XCI+e3ZhbHVlfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSYW5nZVdpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUmFuZ2VXaWRnZXQ7XG4iXX0=