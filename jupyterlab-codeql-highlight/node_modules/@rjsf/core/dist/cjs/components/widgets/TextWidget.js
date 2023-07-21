"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TextWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return _react["default"].createElement(BaseInput, props);
}

if (process.env.NODE_ENV !== "production") {
  TextWidget.propTypes = {
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    id: _propTypes["default"].string
  };
}

var _default = TextWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVGV4dFdpZGdldC5qcyJdLCJuYW1lcyI6WyJUZXh0V2lkZ2V0IiwicHJvcHMiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJ2YWx1ZSIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsIm51bWJlciIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUFBLE1BQ2pCQyxTQURpQixHQUNIRCxLQUFLLENBQUNFLFFBQU4sQ0FBZUMsT0FEWixDQUNqQkYsU0FEaUI7QUFFekIsU0FBTyxnQ0FBQyxTQUFELEVBQWVELEtBQWYsQ0FBUDtBQUNEOztBQUVELElBQUlJLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDUCxFQUFBQSxVQUFVLENBQUNRLFNBQVgsR0FBdUI7QUFDckJDLElBQUFBLEtBQUssRUFBRUMsc0JBQVVDLFNBQVYsQ0FBb0IsQ0FBQ0Qsc0JBQVVFLE1BQVgsRUFBbUJGLHNCQUFVRyxNQUE3QixDQUFwQixDQURjO0FBRXJCQyxJQUFBQSxFQUFFLEVBQUVKLHNCQUFVRTtBQUZPLEdBQXZCO0FBSUQ7O2VBRWNaLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmZ1bmN0aW9uIFRleHRXaWRnZXQocHJvcHMpIHtcbiAgY29uc3QgeyBCYXNlSW5wdXQgfSA9IHByb3BzLnJlZ2lzdHJ5LndpZGdldHM7XG4gIHJldHVybiA8QmFzZUlucHV0IHsuLi5wcm9wc30gLz47XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgVGV4dFdpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGV4dFdpZGdldDtcbiJdfQ==