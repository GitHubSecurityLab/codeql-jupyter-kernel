function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function DateWidget(props) {
  var _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return React.createElement(BaseInput, _extends({
    type: "date"
  }, props, {
    onChange: function onChange(value) {
      return _onChange(value || undefined);
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateWidget.propTypes = {
    value: PropTypes.string
  };
}

export default DateWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkRhdGVXaWRnZXQiLCJwcm9wcyIsIm9uQ2hhbmdlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7O0FBRUEsU0FBU0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFBQSxNQUV2QkMsU0FGdUIsR0FNckJELEtBTnFCLENBRXZCQyxRQUZ1QjtBQUFBLE1BSVZDLFNBSlUsR0FNckJGLEtBTnFCLENBR3ZCRyxRQUh1QixDQUlyQkMsT0FKcUIsQ0FJVkYsU0FKVTtBQU96QixTQUNFLG9CQUFDLFNBQUQ7QUFDRSxJQUFBLElBQUksRUFBQztBQURQLEtBRU1GLEtBRk47QUFHRSxJQUFBLFFBQVEsRUFBRSxrQkFBQUssS0FBSztBQUFBLGFBQUlKLFNBQVEsQ0FBQ0ksS0FBSyxJQUFJQyxTQUFWLENBQVo7QUFBQTtBQUhqQixLQURGO0FBT0Q7O0FBRUQsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNWLEVBQUFBLFVBQVUsQ0FBQ1csU0FBWCxHQUF1QjtBQUNyQkwsSUFBQUEsS0FBSyxFQUFFUCxTQUFTLENBQUNhO0FBREksR0FBdkI7QUFHRDs7QUFFRCxlQUFlWixVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5mdW5jdGlvbiBEYXRlV2lkZ2V0KHByb3BzKSB7XG4gIGNvbnN0IHtcbiAgICBvbkNoYW5nZSxcbiAgICByZWdpc3RyeToge1xuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcbiAgICB9LFxuICB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPEJhc2VJbnB1dFxuICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgey4uLnByb3BzfVxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IG9uQ2hhbmdlKHZhbHVlIHx8IHVuZGVmaW5lZCl9XG4gICAgLz5cbiAgKTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBEYXRlV2lkZ2V0LnByb3BUeXBlcyA9IHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0ZVdpZGdldDtcbiJdfQ==