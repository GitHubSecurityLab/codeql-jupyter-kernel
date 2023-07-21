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

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "datetime-local"
  }, props, {
    value: (0, _utils.utcToLocal)(value),
    onChange: function onChange(value) {
      return _onChange((0, _utils.localToUTC)(value));
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateTimeWidget.propTypes = {
    value: _propTypes["default"].string
  };
}

var _default = DateTimeWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiRGF0ZVRpbWVXaWRnZXQiLCJwcm9wcyIsInZhbHVlIiwib25DaGFuZ2UiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFBQSxNQUUzQkMsS0FGMkIsR0FPekJELEtBUHlCLENBRTNCQyxLQUYyQjtBQUFBLE1BRzNCQyxTQUgyQixHQU96QkYsS0FQeUIsQ0FHM0JFLFFBSDJCO0FBQUEsTUFLZEMsU0FMYyxHQU96QkgsS0FQeUIsQ0FJM0JJLFFBSjJCLENBS3pCQyxPQUx5QixDQUtkRixTQUxjO0FBUTdCLFNBQ0UsZ0NBQUMsU0FBRDtBQUNFLElBQUEsSUFBSSxFQUFDO0FBRFAsS0FFTUgsS0FGTjtBQUdFLElBQUEsS0FBSyxFQUFFLHVCQUFXQyxLQUFYLENBSFQ7QUFJRSxJQUFBLFFBQVEsRUFBRSxrQkFBQUEsS0FBSztBQUFBLGFBQUlDLFNBQVEsQ0FBQyx1QkFBV0QsS0FBWCxDQUFELENBQVo7QUFBQTtBQUpqQixLQURGO0FBUUQ7O0FBRUQsSUFBSUssT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNULEVBQUFBLGNBQWMsQ0FBQ1UsU0FBZixHQUEyQjtBQUN6QlIsSUFBQUEsS0FBSyxFQUFFUyxzQkFBVUM7QUFEUSxHQUEzQjtBQUdEOztlQUVjWixjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IHsgdXRjVG9Mb2NhbCwgbG9jYWxUb1VUQyB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBEYXRlVGltZVdpZGdldChwcm9wcykge1xuICBjb25zdCB7XG4gICAgdmFsdWUsXG4gICAgb25DaGFuZ2UsXG4gICAgcmVnaXN0cnk6IHtcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXG4gICAgfSxcbiAgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxCYXNlSW5wdXRcbiAgICAgIHR5cGU9XCJkYXRldGltZS1sb2NhbFwiXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICB2YWx1ZT17dXRjVG9Mb2NhbCh2YWx1ZSl9XG4gICAgICBvbkNoYW5nZT17dmFsdWUgPT4gb25DaGFuZ2UobG9jYWxUb1VUQyh2YWx1ZSkpfVxuICAgIC8+XG4gICk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgRGF0ZVRpbWVXaWRnZXQucHJvcFR5cGVzID0ge1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRlVGltZVdpZGdldDtcbiJdfQ==