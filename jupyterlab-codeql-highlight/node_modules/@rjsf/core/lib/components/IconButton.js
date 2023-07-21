function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from "react";
export default function IconButton(props) {
  var _props$type = props.type,
      type = _props$type === void 0 ? "default" : _props$type,
      icon = props.icon,
      className = props.className,
      otherProps = _objectWithoutProperties(props, ["type", "icon", "className"]);

  return React.createElement("button", _extends({
    type: "button",
    className: "btn btn-".concat(type, " ").concat(className)
  }, otherProps), React.createElement("i", {
    className: "glyphicon glyphicon-".concat(icon)
  }));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0ljb25CdXR0b24uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJJY29uQnV0dG9uIiwicHJvcHMiLCJ0eXBlIiwiaWNvbiIsImNsYXNzTmFtZSIsIm90aGVyUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFFQSxlQUFlLFNBQVNDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCO0FBQUEsb0JBQ3FCQSxLQURyQixDQUNoQ0MsSUFEZ0M7QUFBQSxNQUNoQ0EsSUFEZ0MsNEJBQ3pCLFNBRHlCO0FBQUEsTUFDZEMsSUFEYyxHQUNxQkYsS0FEckIsQ0FDZEUsSUFEYztBQUFBLE1BQ1JDLFNBRFEsR0FDcUJILEtBRHJCLENBQ1JHLFNBRFE7QUFBQSxNQUNNQyxVQUROLDRCQUNxQkosS0FEckI7O0FBRXhDLFNBQ0U7QUFDRSxJQUFBLElBQUksRUFBQyxRQURQO0FBRUUsSUFBQSxTQUFTLG9CQUFhQyxJQUFiLGNBQXFCRSxTQUFyQjtBQUZYLEtBR01DLFVBSE4sR0FJRTtBQUFHLElBQUEsU0FBUyxnQ0FBeUJGLElBQXpCO0FBQVosSUFKRixDQURGO0FBUUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEljb25CdXR0b24ocHJvcHMpIHtcbiAgY29uc3QgeyB0eXBlID0gXCJkZWZhdWx0XCIsIGljb24sIGNsYXNzTmFtZSwgLi4ub3RoZXJQcm9wcyB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzc05hbWU9e2BidG4gYnRuLSR7dHlwZX0gJHtjbGFzc05hbWV9YH1cbiAgICAgIHsuLi5vdGhlclByb3BzfT5cbiAgICAgIDxpIGNsYXNzTmFtZT17YGdseXBoaWNvbiBnbHlwaGljb24tJHtpY29ufWB9IC8+XG4gICAgPC9idXR0b24+XG4gICk7XG59XG4iXX0=