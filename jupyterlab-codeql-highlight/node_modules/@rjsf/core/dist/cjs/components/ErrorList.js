"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ErrorList;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ErrorList(props) {
  var errors = props.errors;
  return _react["default"].createElement("div", {
    className: "panel panel-danger errors"
  }, _react["default"].createElement("div", {
    className: "panel-heading"
  }, _react["default"].createElement("h3", {
    className: "panel-title"
  }, "Errors")), _react["default"].createElement("ul", {
    className: "list-group"
  }, errors.map(function (error, i) {
    return _react["default"].createElement("li", {
      key: i,
      className: "list-group-item text-danger"
    }, error.stack);
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0Vycm9yTGlzdC5qcyJdLCJuYW1lcyI6WyJFcnJvckxpc3QiLCJwcm9wcyIsImVycm9ycyIsIm1hcCIsImVycm9yIiwiaSIsInN0YWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFZSxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFBLE1BQy9CQyxNQUQrQixHQUNwQkQsS0FEb0IsQ0FDL0JDLE1BRCtCO0FBRXZDLFNBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSSxJQUFBLFNBQVMsRUFBQztBQUFkLGNBREYsQ0FERixFQUlFO0FBQUksSUFBQSxTQUFTLEVBQUM7QUFBZCxLQUNHQSxNQUFNLENBQUNDLEdBQVAsQ0FBVyxVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBYztBQUN4QixXQUNFO0FBQUksTUFBQSxHQUFHLEVBQUVBLENBQVQ7QUFBWSxNQUFBLFNBQVMsRUFBQztBQUF0QixPQUNHRCxLQUFLLENBQUNFLEtBRFQsQ0FERjtBQUtELEdBTkEsQ0FESCxDQUpGLENBREY7QUFnQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVycm9yTGlzdChwcm9wcykge1xuICBjb25zdCB7IGVycm9ycyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbCBwYW5lbC1kYW5nZXIgZXJyb3JzXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWhlYWRpbmdcIj5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT1cInBhbmVsLXRpdGxlXCI+RXJyb3JzPC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXBcIj5cbiAgICAgICAge2Vycm9ycy5tYXAoKGVycm9yLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LWRhbmdlclwiPlxuICAgICAgICAgICAgICB7ZXJyb3Iuc3RhY2t9XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdfQ==