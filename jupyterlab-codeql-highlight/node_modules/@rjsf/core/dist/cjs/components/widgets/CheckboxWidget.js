"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CheckboxWidget(props) {
  var schema = props.schema,
      id = props.id,
      value = props.value,
      disabled = props.disabled,
      readonly = props.readonly,
      label = props.label,
      autofocus = props.autofocus,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      _onChange = props.onChange,
      DescriptionField = props.DescriptionField; // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords

  var required = (0, _utils.schemaRequiresTrueValue)(schema);
  return _react["default"].createElement("div", {
    className: "checkbox ".concat(disabled || readonly ? "disabled" : "")
  }, schema.description && _react["default"].createElement(DescriptionField, {
    description: schema.description
  }), _react["default"].createElement("label", null, _react["default"].createElement("input", {
    type: "checkbox",
    id: id,
    checked: typeof value === "undefined" ? false : value,
    required: required,
    disabled: disabled || readonly,
    autoFocus: autofocus,
    onChange: function onChange(event) {
      return _onChange(event.target.checked);
    },
    onBlur: onBlur && function (event) {
      return onBlur(id, event.target.checked);
    },
    onFocus: onFocus && function (event) {
      return onFocus(id, event.target.checked);
    }
  }), _react["default"].createElement("span", null, label)));
}

CheckboxWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].bool,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func
  };
}

var _default = CheckboxWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQ2hlY2tib3hXaWRnZXQuanMiXSwibmFtZXMiOlsiQ2hlY2tib3hXaWRnZXQiLCJwcm9wcyIsInNjaGVtYSIsImlkIiwidmFsdWUiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwibGFiZWwiLCJhdXRvZm9jdXMiLCJvbkJsdXIiLCJvbkZvY3VzIiwib25DaGFuZ2UiLCJEZXNjcmlwdGlvbkZpZWxkIiwicmVxdWlyZWQiLCJkZXNjcmlwdGlvbiIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsImRlZmF1bHRQcm9wcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRUEsU0FBU0EsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFBQSxNQUUzQkMsTUFGMkIsR0FhekJELEtBYnlCLENBRTNCQyxNQUYyQjtBQUFBLE1BRzNCQyxFQUgyQixHQWF6QkYsS0FieUIsQ0FHM0JFLEVBSDJCO0FBQUEsTUFJM0JDLEtBSjJCLEdBYXpCSCxLQWJ5QixDQUkzQkcsS0FKMkI7QUFBQSxNQUszQkMsUUFMMkIsR0FhekJKLEtBYnlCLENBSzNCSSxRQUwyQjtBQUFBLE1BTTNCQyxRQU4yQixHQWF6QkwsS0FieUIsQ0FNM0JLLFFBTjJCO0FBQUEsTUFPM0JDLEtBUDJCLEdBYXpCTixLQWJ5QixDQU8zQk0sS0FQMkI7QUFBQSxNQVEzQkMsU0FSMkIsR0FhekJQLEtBYnlCLENBUTNCTyxTQVIyQjtBQUFBLE1BUzNCQyxNQVQyQixHQWF6QlIsS0FieUIsQ0FTM0JRLE1BVDJCO0FBQUEsTUFVM0JDLE9BVjJCLEdBYXpCVCxLQWJ5QixDQVUzQlMsT0FWMkI7QUFBQSxNQVczQkMsU0FYMkIsR0FhekJWLEtBYnlCLENBVzNCVSxRQVgyQjtBQUFBLE1BWTNCQyxnQkFaMkIsR0FhekJYLEtBYnlCLENBWTNCVyxnQkFaMkIsRUFlN0I7QUFDQTtBQUNBOztBQUNBLE1BQU1DLFFBQVEsR0FBRyxvQ0FBd0JYLE1BQXhCLENBQWpCO0FBRUEsU0FDRTtBQUFLLElBQUEsU0FBUyxxQkFBY0csUUFBUSxJQUFJQyxRQUFaLEdBQXVCLFVBQXZCLEdBQW9DLEVBQWxEO0FBQWQsS0FDR0osTUFBTSxDQUFDWSxXQUFQLElBQ0MsZ0NBQUMsZ0JBQUQ7QUFBa0IsSUFBQSxXQUFXLEVBQUVaLE1BQU0sQ0FBQ1k7QUFBdEMsSUFGSixFQUlFLCtDQUNFO0FBQ0UsSUFBQSxJQUFJLEVBQUMsVUFEUDtBQUVFLElBQUEsRUFBRSxFQUFFWCxFQUZOO0FBR0UsSUFBQSxPQUFPLEVBQUUsT0FBT0MsS0FBUCxLQUFpQixXQUFqQixHQUErQixLQUEvQixHQUF1Q0EsS0FIbEQ7QUFJRSxJQUFBLFFBQVEsRUFBRVMsUUFKWjtBQUtFLElBQUEsUUFBUSxFQUFFUixRQUFRLElBQUlDLFFBTHhCO0FBTUUsSUFBQSxTQUFTLEVBQUVFLFNBTmI7QUFPRSxJQUFBLFFBQVEsRUFBRSxrQkFBQU8sS0FBSztBQUFBLGFBQUlKLFNBQVEsQ0FBQ0ksS0FBSyxDQUFDQyxNQUFOLENBQWFDLE9BQWQsQ0FBWjtBQUFBLEtBUGpCO0FBUUUsSUFBQSxNQUFNLEVBQUVSLE1BQU0sSUFBSyxVQUFBTSxLQUFLO0FBQUEsYUFBSU4sTUFBTSxDQUFDTixFQUFELEVBQUtZLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxPQUFsQixDQUFWO0FBQUEsS0FSMUI7QUFTRSxJQUFBLE9BQU8sRUFBRVAsT0FBTyxJQUFLLFVBQUFLLEtBQUs7QUFBQSxhQUFJTCxPQUFPLENBQUNQLEVBQUQsRUFBS1ksS0FBSyxDQUFDQyxNQUFOLENBQWFDLE9BQWxCLENBQVg7QUFBQTtBQVQ1QixJQURGLEVBWUUsOENBQU9WLEtBQVAsQ0FaRixDQUpGLENBREY7QUFxQkQ7O0FBRURQLGNBQWMsQ0FBQ2tCLFlBQWYsR0FBOEI7QUFDNUJWLEVBQUFBLFNBQVMsRUFBRTtBQURpQixDQUE5Qjs7QUFJQSxJQUFJVyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q3JCLEVBQUFBLGNBQWMsQ0FBQ3NCLFNBQWYsR0FBMkI7QUFDekJwQixJQUFBQSxNQUFNLEVBQUVxQixzQkFBVUMsTUFBVixDQUFpQkMsVUFEQTtBQUV6QnRCLElBQUFBLEVBQUUsRUFBRW9CLHNCQUFVRyxNQUFWLENBQWlCRCxVQUZJO0FBR3pCckIsSUFBQUEsS0FBSyxFQUFFbUIsc0JBQVVJLElBSFE7QUFJekJkLElBQUFBLFFBQVEsRUFBRVUsc0JBQVVJLElBSks7QUFLekJ0QixJQUFBQSxRQUFRLEVBQUVrQixzQkFBVUksSUFMSztBQU16QnJCLElBQUFBLFFBQVEsRUFBRWlCLHNCQUFVSSxJQU5LO0FBT3pCbkIsSUFBQUEsU0FBUyxFQUFFZSxzQkFBVUksSUFQSTtBQVF6QmhCLElBQUFBLFFBQVEsRUFBRVksc0JBQVVLO0FBUkssR0FBM0I7QUFVRDs7ZUFFYzVCLGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZSB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBDaGVja2JveFdpZGdldChwcm9wcykge1xuICBjb25zdCB7XG4gICAgc2NoZW1hLFxuICAgIGlkLFxuICAgIHZhbHVlLFxuICAgIGRpc2FibGVkLFxuICAgIHJlYWRvbmx5LFxuICAgIGxhYmVsLFxuICAgIGF1dG9mb2N1cyxcbiAgICBvbkJsdXIsXG4gICAgb25Gb2N1cyxcbiAgICBvbkNoYW5nZSxcbiAgICBEZXNjcmlwdGlvbkZpZWxkLFxuICB9ID0gcHJvcHM7XG5cbiAgLy8gQmVjYXVzZSBhbiB1bmNoZWNrZWQgY2hlY2tib3ggd2lsbCBjYXVzZSBodG1sNSB2YWxpZGF0aW9uIHRvIGZhaWwsIG9ubHkgYWRkXG4gIC8vIHRoZSBcInJlcXVpcmVkXCIgYXR0cmlidXRlIGlmIHRoZSBmaWVsZCB2YWx1ZSBtdXN0IGJlIFwidHJ1ZVwiLCBkdWUgdG8gdGhlXG4gIC8vIFwiY29uc3RcIiBvciBcImVudW1cIiBrZXl3b3Jkc1xuICBjb25zdCByZXF1aXJlZCA9IHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17YGNoZWNrYm94ICR7ZGlzYWJsZWQgfHwgcmVhZG9ubHkgPyBcImRpc2FibGVkXCIgOiBcIlwifWB9PlxuICAgICAge3NjaGVtYS5kZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgIDxEZXNjcmlwdGlvbkZpZWxkIGRlc2NyaXB0aW9uPXtzY2hlbWEuZGVzY3JpcHRpb259IC8+XG4gICAgICApfVxuICAgICAgPGxhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBjaGVja2VkPXt0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyBmYWxzZSA6IHZhbHVlfVxuICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWQgfHwgcmVhZG9ubHl9XG4gICAgICAgICAgYXV0b0ZvY3VzPXthdXRvZm9jdXN9XG4gICAgICAgICAgb25DaGFuZ2U9e2V2ZW50ID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICBvbkJsdXI9e29uQmx1ciAmJiAoZXZlbnQgPT4gb25CbHVyKGlkLCBldmVudC50YXJnZXQuY2hlY2tlZCkpfVxuICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXMgJiYgKGV2ZW50ID0+IG9uRm9jdXMoaWQsIGV2ZW50LnRhcmdldC5jaGVja2VkKSl9XG4gICAgICAgIC8+XG4gICAgICAgIDxzcGFuPntsYWJlbH08L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5DaGVja2JveFdpZGdldC5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9mb2N1czogZmFsc2UsXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIENoZWNrYm94V2lkZ2V0LnByb3BUeXBlcyA9IHtcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hXaWRnZXQ7XG4iXX0=