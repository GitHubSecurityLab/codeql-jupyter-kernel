"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function HiddenWidget(_ref) {
  var id = _ref.id,
      value = _ref.value;
  return _react["default"].createElement("input", {
    type: "hidden",
    id: id,
    value: typeof value === "undefined" ? "" : value
  });
}

if (process.env.NODE_ENV !== "production") {
  HiddenWidget.propTypes = {
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool])
  };
}

var _default = HiddenWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvSGlkZGVuV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIkhpZGRlbldpZGdldCIsImlkIiwidmFsdWUiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwib25lT2ZUeXBlIiwibnVtYmVyIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsU0FBU0EsWUFBVCxPQUFxQztBQUFBLE1BQWJDLEVBQWEsUUFBYkEsRUFBYTtBQUFBLE1BQVRDLEtBQVMsUUFBVEEsS0FBUztBQUNuQyxTQUNFO0FBQ0UsSUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLElBQUEsRUFBRSxFQUFFRCxFQUZOO0FBR0UsSUFBQSxLQUFLLEVBQUUsT0FBT0MsS0FBUCxLQUFpQixXQUFqQixHQUErQixFQUEvQixHQUFvQ0E7QUFIN0MsSUFERjtBQU9EOztBQUVELElBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDTCxFQUFBQSxZQUFZLENBQUNNLFNBQWIsR0FBeUI7QUFDdkJMLElBQUFBLEVBQUUsRUFBRU0sc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREU7QUFFdkJQLElBQUFBLEtBQUssRUFBRUssc0JBQVVHLFNBQVYsQ0FBb0IsQ0FDekJILHNCQUFVQyxNQURlLEVBRXpCRCxzQkFBVUksTUFGZSxFQUd6Qkosc0JBQVVLLElBSGUsQ0FBcEI7QUFGZ0IsR0FBekI7QUFRRDs7ZUFFY1osWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZnVuY3Rpb24gSGlkZGVuV2lkZ2V0KHsgaWQsIHZhbHVlIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJoaWRkZW5cIlxuICAgICAgaWQ9e2lkfVxuICAgICAgdmFsdWU9e3R5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwiXCIgOiB2YWx1ZX1cbiAgICAvPlxuICApO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEhpZGRlbldpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgIF0pLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBIaWRkZW5XaWRnZXQ7XG4iXX0=