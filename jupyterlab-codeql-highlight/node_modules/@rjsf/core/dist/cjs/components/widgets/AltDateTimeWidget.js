"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AltDateWidget = _interopRequireDefault(require("./AltDateWidget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function AltDateTimeWidget(props) {
  var AltDateWidget = props.registry.widgets.AltDateWidget;
  return _react["default"].createElement(AltDateWidget, _extends({
    time: true
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  AltDateTimeWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].string,
    required: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    options: _propTypes["default"].object
  };
}

AltDateTimeWidget.defaultProps = _objectSpread({}, _AltDateWidget["default"].defaultProps, {
  time: true
});
var _default = AltDateTimeWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiQWx0RGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsIkFsdERhdGVXaWRnZXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiaWQiLCJzdHJpbmciLCJ2YWx1ZSIsInJlcXVpcmVkIiwiYm9vbCIsIm9uQ2hhbmdlIiwiZnVuYyIsIm9wdGlvbnMiLCJkZWZhdWx0UHJvcHMiLCJ0aW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxTQUFTQSxpQkFBVCxDQUEyQkMsS0FBM0IsRUFBa0M7QUFBQSxNQUN4QkMsYUFEd0IsR0FDTkQsS0FBSyxDQUFDRSxRQUFOLENBQWVDLE9BRFQsQ0FDeEJGLGFBRHdCO0FBRWhDLFNBQU8sZ0NBQUMsYUFBRDtBQUFlLElBQUEsSUFBSTtBQUFuQixLQUF3QkQsS0FBeEIsRUFBUDtBQUNEOztBQUVELElBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDUCxFQUFBQSxpQkFBaUIsQ0FBQ1EsU0FBbEIsR0FBOEI7QUFDNUJDLElBQUFBLE1BQU0sRUFBRUMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREc7QUFFNUJDLElBQUFBLEVBQUUsRUFBRUgsc0JBQVVJLE1BQVYsQ0FBaUJGLFVBRk87QUFHNUJHLElBQUFBLEtBQUssRUFBRUwsc0JBQVVJLE1BSFc7QUFJNUJFLElBQUFBLFFBQVEsRUFBRU4sc0JBQVVPLElBSlE7QUFLNUJDLElBQUFBLFFBQVEsRUFBRVIsc0JBQVVTLElBTFE7QUFNNUJDLElBQUFBLE9BQU8sRUFBRVYsc0JBQVVDO0FBTlMsR0FBOUI7QUFRRDs7QUFFRFgsaUJBQWlCLENBQUNxQixZQUFsQixxQkFDS25CLDBCQUFjbUIsWUFEbkI7QUFFRUMsRUFBQUEsSUFBSSxFQUFFO0FBRlI7ZUFLZXRCLGlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IEFsdERhdGVXaWRnZXQgZnJvbSBcIi4vQWx0RGF0ZVdpZGdldFwiO1xuXG5mdW5jdGlvbiBBbHREYXRlVGltZVdpZGdldChwcm9wcykge1xuICBjb25zdCB7IEFsdERhdGVXaWRnZXQgfSA9IHByb3BzLnJlZ2lzdHJ5LndpZGdldHM7XG4gIHJldHVybiA8QWx0RGF0ZVdpZGdldCB0aW1lIHsuLi5wcm9wc30gLz47XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQWx0RGF0ZVRpbWVXaWRnZXQucHJvcFR5cGVzID0ge1xuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xufVxuXG5BbHREYXRlVGltZVdpZGdldC5kZWZhdWx0UHJvcHMgPSB7XG4gIC4uLkFsdERhdGVXaWRnZXQuZGVmYXVsdFByb3BzLFxuICB0aW1lOiB0cnVlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQWx0RGF0ZVRpbWVXaWRnZXQ7XG4iXX0=