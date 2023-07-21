"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function UnsupportedField(_ref) {
  var schema = _ref.schema,
      idSchema = _ref.idSchema,
      reason = _ref.reason;
  return _react["default"].createElement("div", {
    className: "unsupported-field"
  }, _react["default"].createElement("p", null, "Unsupported field schema", idSchema && idSchema.$id && _react["default"].createElement("span", null, " for", " field ", _react["default"].createElement("code", null, idSchema.$id)), reason && _react["default"].createElement("em", null, ": ", reason), "."), schema && _react["default"].createElement("pre", null, JSON.stringify(schema, null, 2)));
}

if (process.env.NODE_ENV !== "production") {
  UnsupportedField.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    idSchema: _propTypes["default"].object,
    reason: _propTypes["default"].string
  };
}

var _default = UnsupportedField;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9VbnN1cHBvcnRlZEZpZWxkLmpzIl0sIm5hbWVzIjpbIlVuc3VwcG9ydGVkRmllbGQiLCJzY2hlbWEiLCJpZFNjaGVtYSIsInJlYXNvbiIsIiRpZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxnQkFBVCxPQUF3RDtBQUFBLE1BQTVCQyxNQUE0QixRQUE1QkEsTUFBNEI7QUFBQSxNQUFwQkMsUUFBb0IsUUFBcEJBLFFBQW9CO0FBQUEsTUFBVkMsTUFBVSxRQUFWQSxNQUFVO0FBQ3RELFNBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0UsdUVBRUdELFFBQVEsSUFBSUEsUUFBUSxDQUFDRSxHQUFyQixJQUNDLDhDQUNHLE1BREgsYUFDaUIsOENBQU9GLFFBQVEsQ0FBQ0UsR0FBaEIsQ0FEakIsQ0FISixFQU9HRCxNQUFNLElBQUksa0RBQU9BLE1BQVAsQ0FQYixNQURGLEVBVUdGLE1BQU0sSUFBSSw2Q0FBTUksSUFBSSxDQUFDQyxTQUFMLENBQWVMLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsQ0FBN0IsQ0FBTixDQVZiLENBREY7QUFjRDs7QUFFRCxJQUFJTSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1QsRUFBQUEsZ0JBQWdCLENBQUNVLFNBQWpCLEdBQTZCO0FBQzNCVCxJQUFBQSxNQUFNLEVBQUVVLHNCQUFVQyxNQUFWLENBQWlCQyxVQURFO0FBRTNCWCxJQUFBQSxRQUFRLEVBQUVTLHNCQUFVQyxNQUZPO0FBRzNCVCxJQUFBQSxNQUFNLEVBQUVRLHNCQUFVRztBQUhTLEdBQTdCO0FBS0Q7O2VBRWNkLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5mdW5jdGlvbiBVbnN1cHBvcnRlZEZpZWxkKHsgc2NoZW1hLCBpZFNjaGVtYSwgcmVhc29uIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInVuc3VwcG9ydGVkLWZpZWxkXCI+XG4gICAgICA8cD5cbiAgICAgICAgVW5zdXBwb3J0ZWQgZmllbGQgc2NoZW1hXG4gICAgICAgIHtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWQgJiYgKFxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAge1wiIGZvclwifSBmaWVsZCA8Y29kZT57aWRTY2hlbWEuJGlkfTwvY29kZT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICl9XG4gICAgICAgIHtyZWFzb24gJiYgPGVtPjoge3JlYXNvbn08L2VtPn0uXG4gICAgICA8L3A+XG4gICAgICB7c2NoZW1hICYmIDxwcmU+e0pTT04uc3RyaW5naWZ5KHNjaGVtYSwgbnVsbCwgMil9PC9wcmU+fVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIFVuc3VwcG9ydGVkRmllbGQucHJvcFR5cGVzID0ge1xuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlkU2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHJlYXNvbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVW5zdXBwb3J0ZWRGaWVsZDtcbiJdfQ==