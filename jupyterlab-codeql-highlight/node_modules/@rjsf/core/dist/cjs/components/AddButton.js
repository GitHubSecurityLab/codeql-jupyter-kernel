"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AddButton;

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("./IconButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function AddButton(_ref) {
  var className = _ref.className,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  return _react["default"].createElement("div", {
    className: "row"
  }, _react["default"].createElement("p", {
    className: "col-xs-3 col-xs-offset-9 text-right ".concat(className)
  }, _react["default"].createElement(_IconButton["default"], {
    type: "info",
    icon: "plus",
    className: "btn-add col-xs-12",
    "aria-label": "Add",
    tabIndex: "0",
    onClick: onClick,
    disabled: disabled
  })));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0FkZEJ1dHRvbi5qcyJdLCJuYW1lcyI6WyJBZGRCdXR0b24iLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwiZGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVlLFNBQVNBLFNBQVQsT0FBcUQ7QUFBQSxNQUFoQ0MsU0FBZ0MsUUFBaENBLFNBQWdDO0FBQUEsTUFBckJDLE9BQXFCLFFBQXJCQSxPQUFxQjtBQUFBLE1BQVpDLFFBQVksUUFBWkEsUUFBWTtBQUNsRSxTQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFO0FBQUcsSUFBQSxTQUFTLGdEQUF5Q0YsU0FBekM7QUFBWixLQUNFLGdDQUFDLHNCQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLElBQUEsSUFBSSxFQUFDLE1BRlA7QUFHRSxJQUFBLFNBQVMsRUFBQyxtQkFIWjtBQUlFLGtCQUFXLEtBSmI7QUFLRSxJQUFBLFFBQVEsRUFBQyxHQUxYO0FBTUUsSUFBQSxPQUFPLEVBQUVDLE9BTlg7QUFPRSxJQUFBLFFBQVEsRUFBRUM7QUFQWixJQURGLENBREYsQ0FERjtBQWVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEljb25CdXR0b24gZnJvbSBcIi4vSWNvbkJ1dHRvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBZGRCdXR0b24oeyBjbGFzc05hbWUsIG9uQ2xpY2ssIGRpc2FibGVkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgPHAgY2xhc3NOYW1lPXtgY29sLXhzLTMgY29sLXhzLW9mZnNldC05IHRleHQtcmlnaHQgJHtjbGFzc05hbWV9YH0+XG4gICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgdHlwZT1cImluZm9cIlxuICAgICAgICAgIGljb249XCJwbHVzXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJidG4tYWRkIGNvbC14cy0xMlwiXG4gICAgICAgICAgYXJpYS1sYWJlbD1cIkFkZFwiXG4gICAgICAgICAgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgLz5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdfQ==