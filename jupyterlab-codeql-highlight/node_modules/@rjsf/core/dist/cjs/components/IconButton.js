"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = IconButton;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function IconButton(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? "default" : _props$type,
      icon = props.icon,
      className = props.className,
      otherProps = _objectWithoutProperties(props, ["type", "icon", "className"]);

  return _react["default"].createElement("button", _extends({
    type: "button",
    className: "btn btn-".concat(type, " ").concat(className)
  }, otherProps), _react["default"].createElement("i", {
    className: "glyphicon glyphicon-".concat(icon)
  }));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ljb25CdXR0b24uanMiXSwibmFtZXMiOlsiSWNvbkJ1dHRvbiIsInByb3BzIiwidHlwZSIsImljb24iLCJjbGFzc05hbWUiLCJvdGhlclByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUFFZSxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUFBLG9CQUNxQkEsS0FEckIsQ0FDaENDLElBRGdDO0FBQUEsTUFDaENBLElBRGdDLDRCQUN6QixTQUR5QjtBQUFBLE1BQ2RDLElBRGMsR0FDcUJGLEtBRHJCLENBQ2RFLElBRGM7QUFBQSxNQUNSQyxTQURRLEdBQ3FCSCxLQURyQixDQUNSRyxTQURRO0FBQUEsTUFDTUMsVUFETiw0QkFDcUJKLEtBRHJCOztBQUV4QyxTQUNFO0FBQ0UsSUFBQSxJQUFJLEVBQUMsUUFEUDtBQUVFLElBQUEsU0FBUyxvQkFBYUMsSUFBYixjQUFxQkUsU0FBckI7QUFGWCxLQUdNQyxVQUhOLEdBSUU7QUFBRyxJQUFBLFNBQVMsZ0NBQXlCRixJQUF6QjtBQUFaLElBSkYsQ0FERjtBQVFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBJY29uQnV0dG9uKHByb3BzKSB7XG4gIGNvbnN0IHsgdHlwZSA9IFwiZGVmYXVsdFwiLCBpY29uLCBjbGFzc05hbWUsIC4uLm90aGVyUHJvcHMgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgY2xhc3NOYW1lPXtgYnRuIGJ0bi0ke3R5cGV9ICR7Y2xhc3NOYW1lfWB9XG4gICAgICB7Li4ub3RoZXJQcm9wc30+XG4gICAgICA8aSBjbGFzc05hbWU9e2BnbHlwaGljb24gZ2x5cGhpY29uLSR7aWNvbn1gfSAvPlxuICAgIDwvYnV0dG9uPlxuICApO1xufVxuIl19