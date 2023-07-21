"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RadioWidget(props) {
  var options = props.options,
      value = props.value,
      required = props.required,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      _onChange = props.onChange,
      id = props.id; // Generating a unique field name to identify this set of radio buttons

  var name = Math.random().toString();
  var enumOptions = options.enumOptions,
      enumDisabled = options.enumDisabled,
      inline = options.inline; // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.

  return _react["default"].createElement("div", {
    className: "field-radio-group",
    id: id
  }, enumOptions.map(function (option, i) {
    var checked = option.value === value;
    var itemDisabled = enumDisabled && enumDisabled.indexOf(option.value) != -1;
    var disabledCls = disabled || itemDisabled || readonly ? "disabled" : "";

    var radio = _react["default"].createElement("span", null, _react["default"].createElement("input", {
      type: "radio",
      checked: checked,
      name: name,
      required: required,
      value: option.value,
      disabled: disabled || itemDisabled || readonly,
      autoFocus: autofocus && i === 0,
      onChange: function onChange(_) {
        return _onChange(option.value);
      },
      onBlur: onBlur && function (event) {
        return onBlur(id, event.target.value);
      },
      onFocus: onFocus && function (event) {
        return onFocus(id, event.target.value);
      }
    }), _react["default"].createElement("span", null, option.label));

    return inline ? _react["default"].createElement("label", {
      key: i,
      className: "radio-inline ".concat(disabledCls)
    }, radio) : _react["default"].createElement("div", {
      key: i,
      className: "radio ".concat(disabledCls)
    }, _react["default"].createElement("label", null, radio));
  }));
}

RadioWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    options: _propTypes["default"].shape({
      enumOptions: _propTypes["default"].array,
      inline: _propTypes["default"].bool
    }).isRequired,
    value: _propTypes["default"].any,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func
  };
}

var _default = RadioWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUmFkaW9XaWRnZXQuanMiXSwibmFtZXMiOlsiUmFkaW9XaWRnZXQiLCJwcm9wcyIsIm9wdGlvbnMiLCJ2YWx1ZSIsInJlcXVpcmVkIiwiZGlzYWJsZWQiLCJyZWFkb25seSIsImF1dG9mb2N1cyIsIm9uQmx1ciIsIm9uRm9jdXMiLCJvbkNoYW5nZSIsImlkIiwibmFtZSIsIk1hdGgiLCJyYW5kb20iLCJ0b1N0cmluZyIsImVudW1PcHRpb25zIiwiZW51bURpc2FibGVkIiwiaW5saW5lIiwibWFwIiwib3B0aW9uIiwiaSIsImNoZWNrZWQiLCJpdGVtRGlzYWJsZWQiLCJpbmRleE9mIiwiZGlzYWJsZWRDbHMiLCJyYWRpbyIsIl8iLCJldmVudCIsInRhcmdldCIsImxhYmVsIiwiZGVmYXVsdFByb3BzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic2NoZW1hIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInN0cmluZyIsInNoYXBlIiwiYXJyYXkiLCJib29sIiwiYW55IiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFBQSxNQUV4QkMsT0FGd0IsR0FZdEJELEtBWnNCLENBRXhCQyxPQUZ3QjtBQUFBLE1BR3hCQyxLQUh3QixHQVl0QkYsS0Fac0IsQ0FHeEJFLEtBSHdCO0FBQUEsTUFJeEJDLFFBSndCLEdBWXRCSCxLQVpzQixDQUl4QkcsUUFKd0I7QUFBQSxNQUt4QkMsUUFMd0IsR0FZdEJKLEtBWnNCLENBS3hCSSxRQUx3QjtBQUFBLE1BTXhCQyxRQU53QixHQVl0QkwsS0Fac0IsQ0FNeEJLLFFBTndCO0FBQUEsTUFPeEJDLFNBUHdCLEdBWXRCTixLQVpzQixDQU94Qk0sU0FQd0I7QUFBQSxNQVF4QkMsTUFSd0IsR0FZdEJQLEtBWnNCLENBUXhCTyxNQVJ3QjtBQUFBLE1BU3hCQyxPQVR3QixHQVl0QlIsS0Fac0IsQ0FTeEJRLE9BVHdCO0FBQUEsTUFVeEJDLFNBVndCLEdBWXRCVCxLQVpzQixDQVV4QlMsUUFWd0I7QUFBQSxNQVd4QkMsRUFYd0IsR0FZdEJWLEtBWnNCLENBV3hCVSxFQVh3QixFQWExQjs7QUFDQSxNQUFNQyxJQUFJLEdBQUdDLElBQUksQ0FBQ0MsTUFBTCxHQUFjQyxRQUFkLEVBQWI7QUFkMEIsTUFlbEJDLFdBZmtCLEdBZW9CZCxPQWZwQixDQWVsQmMsV0Fma0I7QUFBQSxNQWVMQyxZQWZLLEdBZW9CZixPQWZwQixDQWVMZSxZQWZLO0FBQUEsTUFlU0MsTUFmVCxHQWVvQmhCLE9BZnBCLENBZVNnQixNQWZULEVBZ0IxQjtBQUNBOztBQUNBLFNBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQyxtQkFBZjtBQUFtQyxJQUFBLEVBQUUsRUFBRVA7QUFBdkMsS0FDR0ssV0FBVyxDQUFDRyxHQUFaLENBQWdCLFVBQUNDLE1BQUQsRUFBU0MsQ0FBVCxFQUFlO0FBQzlCLFFBQU1DLE9BQU8sR0FBR0YsTUFBTSxDQUFDakIsS0FBUCxLQUFpQkEsS0FBakM7QUFDQSxRQUFNb0IsWUFBWSxHQUNoQk4sWUFBWSxJQUFJQSxZQUFZLENBQUNPLE9BQWIsQ0FBcUJKLE1BQU0sQ0FBQ2pCLEtBQTVCLEtBQXNDLENBQUMsQ0FEekQ7QUFFQSxRQUFNc0IsV0FBVyxHQUNmcEIsUUFBUSxJQUFJa0IsWUFBWixJQUE0QmpCLFFBQTVCLEdBQXVDLFVBQXZDLEdBQW9ELEVBRHREOztBQUVBLFFBQU1vQixLQUFLLEdBQ1QsOENBQ0U7QUFDRSxNQUFBLElBQUksRUFBQyxPQURQO0FBRUUsTUFBQSxPQUFPLEVBQUVKLE9BRlg7QUFHRSxNQUFBLElBQUksRUFBRVYsSUFIUjtBQUlFLE1BQUEsUUFBUSxFQUFFUixRQUpaO0FBS0UsTUFBQSxLQUFLLEVBQUVnQixNQUFNLENBQUNqQixLQUxoQjtBQU1FLE1BQUEsUUFBUSxFQUFFRSxRQUFRLElBQUlrQixZQUFaLElBQTRCakIsUUFOeEM7QUFPRSxNQUFBLFNBQVMsRUFBRUMsU0FBUyxJQUFJYyxDQUFDLEtBQUssQ0FQaEM7QUFRRSxNQUFBLFFBQVEsRUFBRSxrQkFBQU0sQ0FBQztBQUFBLGVBQUlqQixTQUFRLENBQUNVLE1BQU0sQ0FBQ2pCLEtBQVIsQ0FBWjtBQUFBLE9BUmI7QUFTRSxNQUFBLE1BQU0sRUFBRUssTUFBTSxJQUFLLFVBQUFvQixLQUFLO0FBQUEsZUFBSXBCLE1BQU0sQ0FBQ0csRUFBRCxFQUFLaUIsS0FBSyxDQUFDQyxNQUFOLENBQWExQixLQUFsQixDQUFWO0FBQUEsT0FUMUI7QUFVRSxNQUFBLE9BQU8sRUFBRU0sT0FBTyxJQUFLLFVBQUFtQixLQUFLO0FBQUEsZUFBSW5CLE9BQU8sQ0FBQ0UsRUFBRCxFQUFLaUIsS0FBSyxDQUFDQyxNQUFOLENBQWExQixLQUFsQixDQUFYO0FBQUE7QUFWNUIsTUFERixFQWFFLDhDQUFPaUIsTUFBTSxDQUFDVSxLQUFkLENBYkYsQ0FERjs7QUFrQkEsV0FBT1osTUFBTSxHQUNYO0FBQU8sTUFBQSxHQUFHLEVBQUVHLENBQVo7QUFBZSxNQUFBLFNBQVMseUJBQWtCSSxXQUFsQjtBQUF4QixPQUNHQyxLQURILENBRFcsR0FLWDtBQUFLLE1BQUEsR0FBRyxFQUFFTCxDQUFWO0FBQWEsTUFBQSxTQUFTLGtCQUFXSSxXQUFYO0FBQXRCLE9BQ0UsK0NBQVFDLEtBQVIsQ0FERixDQUxGO0FBU0QsR0FqQ0EsQ0FESCxDQURGO0FBc0NEOztBQUVEMUIsV0FBVyxDQUFDK0IsWUFBWixHQUEyQjtBQUN6QnhCLEVBQUFBLFNBQVMsRUFBRTtBQURjLENBQTNCOztBQUlBLElBQUl5QixPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q2xDLEVBQUFBLFdBQVcsQ0FBQ21DLFNBQVosR0FBd0I7QUFDdEJDLElBQUFBLE1BQU0sRUFBRUMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREg7QUFFdEI1QixJQUFBQSxFQUFFLEVBQUUwQixzQkFBVUcsTUFBVixDQUFpQkQsVUFGQztBQUd0QnJDLElBQUFBLE9BQU8sRUFBRW1DLHNCQUFVSSxLQUFWLENBQWdCO0FBQ3ZCekIsTUFBQUEsV0FBVyxFQUFFcUIsc0JBQVVLLEtBREE7QUFFdkJ4QixNQUFBQSxNQUFNLEVBQUVtQixzQkFBVU07QUFGSyxLQUFoQixFQUdOSixVQU5tQjtBQU90QnBDLElBQUFBLEtBQUssRUFBRWtDLHNCQUFVTyxHQVBLO0FBUXRCeEMsSUFBQUEsUUFBUSxFQUFFaUMsc0JBQVVNLElBUkU7QUFTdEJ0QyxJQUFBQSxRQUFRLEVBQUVnQyxzQkFBVU0sSUFURTtBQVV0QnJDLElBQUFBLFFBQVEsRUFBRStCLHNCQUFVTSxJQVZFO0FBV3RCcEMsSUFBQUEsU0FBUyxFQUFFOEIsc0JBQVVNLElBWEM7QUFZdEJqQyxJQUFBQSxRQUFRLEVBQUUyQixzQkFBVVE7QUFaRSxHQUF4QjtBQWNEOztlQUNjN0MsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuZnVuY3Rpb24gUmFkaW9XaWRnZXQocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIG9wdGlvbnMsXG4gICAgdmFsdWUsXG4gICAgcmVxdWlyZWQsXG4gICAgZGlzYWJsZWQsXG4gICAgcmVhZG9ubHksXG4gICAgYXV0b2ZvY3VzLFxuICAgIG9uQmx1cixcbiAgICBvbkZvY3VzLFxuICAgIG9uQ2hhbmdlLFxuICAgIGlkLFxuICB9ID0gcHJvcHM7XG4gIC8vIEdlbmVyYXRpbmcgYSB1bmlxdWUgZmllbGQgbmFtZSB0byBpZGVudGlmeSB0aGlzIHNldCBvZiByYWRpbyBidXR0b25zXG4gIGNvbnN0IG5hbWUgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHsgZW51bU9wdGlvbnMsIGVudW1EaXNhYmxlZCwgaW5saW5lIH0gPSBvcHRpb25zO1xuICAvLyBjaGVja2VkPXtjaGVja2VkfSBoYXMgYmVlbiBtb3ZlZCBhYm92ZSBuYW1lPXtuYW1lfSwgQXMgbWVudGlvbmVkIGluICMzNDk7XG4gIC8vIHRoaXMgaXMgYSB0ZW1wb3JhcnkgZml4IGZvciByYWRpbyBidXR0b24gcmVuZGVyaW5nIGJ1ZyBpbiBSZWFjdCwgZmFjZWJvb2svcmVhY3QjNzYzMC5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpZWxkLXJhZGlvLWdyb3VwXCIgaWQ9e2lkfT5cbiAgICAgIHtlbnVtT3B0aW9ucy5tYXAoKG9wdGlvbiwgaSkgPT4ge1xuICAgICAgICBjb25zdCBjaGVja2VkID0gb3B0aW9uLnZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgY29uc3QgaXRlbURpc2FibGVkID1cbiAgICAgICAgICBlbnVtRGlzYWJsZWQgJiYgZW51bURpc2FibGVkLmluZGV4T2Yob3B0aW9uLnZhbHVlKSAhPSAtMTtcbiAgICAgICAgY29uc3QgZGlzYWJsZWRDbHMgPVxuICAgICAgICAgIGRpc2FibGVkIHx8IGl0ZW1EaXNhYmxlZCB8fCByZWFkb25seSA/IFwiZGlzYWJsZWRcIiA6IFwiXCI7XG4gICAgICAgIGNvbnN0IHJhZGlvID0gKFxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e2NoZWNrZWR9XG4gICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgIHJlcXVpcmVkPXtyZXF1aXJlZH1cbiAgICAgICAgICAgICAgdmFsdWU9e29wdGlvbi52YWx1ZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGl0ZW1EaXNhYmxlZCB8fCByZWFkb25seX1cbiAgICAgICAgICAgICAgYXV0b0ZvY3VzPXthdXRvZm9jdXMgJiYgaSA9PT0gMH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e18gPT4gb25DaGFuZ2Uob3B0aW9uLnZhbHVlKX1cbiAgICAgICAgICAgICAgb25CbHVyPXtvbkJsdXIgJiYgKGV2ZW50ID0+IG9uQmx1cihpZCwgZXZlbnQudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgIG9uRm9jdXM9e29uRm9jdXMgJiYgKGV2ZW50ID0+IG9uRm9jdXMoaWQsIGV2ZW50LnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxzcGFuPntvcHRpb24ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gaW5saW5lID8gKFxuICAgICAgICAgIDxsYWJlbCBrZXk9e2l9IGNsYXNzTmFtZT17YHJhZGlvLWlubGluZSAke2Rpc2FibGVkQ2xzfWB9PlxuICAgICAgICAgICAge3JhZGlvfVxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT17YHJhZGlvICR7ZGlzYWJsZWRDbHN9YH0+XG4gICAgICAgICAgICA8bGFiZWw+e3JhZGlvfTwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuUmFkaW9XaWRnZXQuZGVmYXVsdFByb3BzID0ge1xuICBhdXRvZm9jdXM6IGZhbHNlLFxufTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBSYWRpb1dpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgZW51bU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgICAgIGlubGluZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgfSkuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmFueSxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IFJhZGlvV2lkZ2V0O1xuIl19