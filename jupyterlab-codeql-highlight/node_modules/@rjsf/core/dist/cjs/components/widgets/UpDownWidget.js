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

function UpDownWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, _extends({
    type: "number"
  }, props, (0, _utils.rangeSpec)(props.schema)));
}

if (process.env.NODE_ENV !== "production") {
  UpDownWidget.propTypes = {
    value: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
  };
}

var _default = UpDownWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVXBEb3duV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIlVwRG93bldpZGdldCIsInByb3BzIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwic2NoZW1hIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwidmFsdWUiLCJQcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsU0FBU0EsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFBQSxNQUdaQyxTQUhZLEdBS3ZCRCxLQUx1QixDQUV6QkUsUUFGeUIsQ0FHdkJDLE9BSHVCLENBR1pGLFNBSFk7QUFNM0IsU0FBTyxnQ0FBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBNkJELEtBQTdCLEVBQXdDLHNCQUFVQSxLQUFLLENBQUNJLE1BQWhCLENBQXhDLEVBQVA7QUFDRDs7QUFFRCxJQUFJQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1IsRUFBQUEsWUFBWSxDQUFDUyxTQUFiLEdBQXlCO0FBQ3ZCQyxJQUFBQSxLQUFLLEVBQUVDLHNCQUFVQyxTQUFWLENBQW9CLENBQUNELHNCQUFVRSxNQUFYLEVBQW1CRixzQkFBVUcsTUFBN0IsQ0FBcEI7QUFEZ0IsR0FBekI7QUFHRDs7ZUFFY2QsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuaW1wb3J0IHsgcmFuZ2VTcGVjIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIFVwRG93bldpZGdldChwcm9wcykge1xuICBjb25zdCB7XG4gICAgcmVnaXN0cnk6IHtcbiAgICAgIHdpZGdldHM6IHsgQmFzZUlucHV0IH0sXG4gICAgfSxcbiAgfSA9IHByb3BzO1xuICByZXR1cm4gPEJhc2VJbnB1dCB0eXBlPVwibnVtYmVyXCIgey4uLnByb3BzfSB7Li4ucmFuZ2VTcGVjKHByb3BzLnNjaGVtYSl9IC8+O1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFVwRG93bldpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVXBEb3duV2lkZ2V0O1xuIl19