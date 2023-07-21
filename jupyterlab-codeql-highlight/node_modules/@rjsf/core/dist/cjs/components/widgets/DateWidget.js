"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function DateWidget(props) {
  var _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "date"
  }, props, {
    onChange: function onChange(value) {
      return _onChange(value || undefined);
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = DateWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJEYXRlV2lkZ2V0IiwicHJvcHMiLCJvbkNoYW5nZSIsIkJhc2VJbnB1dCIsInJlZ2lzdHJ5Iiwid2lkZ2V0cyIsInZhbHVlIiwidW5kZWZpbmVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7OztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQUEsTUFFdkJDLFNBRnVCLEdBTXJCRCxLQU5xQixDQUV2QkMsUUFGdUI7QUFBQSxNQUlWQyxTQUpVLEdBTXJCRixLQU5xQixDQUd2QkcsUUFIdUIsQ0FJckJDLE9BSnFCLENBSVZGLFNBSlU7QUFPekIsU0FDRSxnQ0FBQyxTQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUM7QUFEUCxLQUVNRixLQUZOO0FBR0UsSUFBQSxRQUFRLEVBQUUsa0JBQUFLLEtBQUs7QUFBQSxhQUFJSixTQUFRLENBQUNJLEtBQUssSUFBSUMsU0FBVixDQUFaO0FBQUE7QUFIakIsS0FERjtBQU9EOztBQUVELElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDVixFQUFBQSxVQUFVLENBQUNXLFNBQVgsR0FBdUI7QUFDckJMLElBQUFBLEtBQUssRUFBRU0sc0JBQVVDO0FBREksR0FBdkI7QUFHRDs7ZUFFY2IsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZnVuY3Rpb24gRGF0ZVdpZGdldChwcm9wcykge1xuICBjb25zdCB7XG4gICAgb25DaGFuZ2UsXG4gICAgcmVnaXN0cnk6IHtcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXG4gICAgfSxcbiAgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxCYXNlSW5wdXRcbiAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBvbkNoYW5nZSh2YWx1ZSB8fCB1bmRlZmluZWQpfVxuICAgIC8+XG4gICk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgRGF0ZVdpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGVXaWRnZXQ7XG4iXX0=