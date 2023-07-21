function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";

function URLWidget(props) {
  var BaseInput = props.registry.widgets.BaseInput;
  return React.createElement(BaseInput, _extends({
    type: "url"
  }, props));
}

if (process.env.NODE_ENV !== "production") {
  URLWidget.propTypes = {
    value: PropTypes.string
  };
}

export default URLWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvVVJMV2lkZ2V0LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiVVJMV2lkZ2V0IiwicHJvcHMiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJ2YWx1ZSIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0Qjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUFBLE1BQ2hCQyxTQURnQixHQUNGRCxLQUFLLENBQUNFLFFBQU4sQ0FBZUMsT0FEYixDQUNoQkYsU0FEZ0I7QUFFeEIsU0FBTyxvQkFBQyxTQUFEO0FBQVcsSUFBQSxJQUFJLEVBQUM7QUFBaEIsS0FBMEJELEtBQTFCLEVBQVA7QUFDRDs7QUFFRCxJQUFJSSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1AsRUFBQUEsU0FBUyxDQUFDUSxTQUFWLEdBQXNCO0FBQ3BCQyxJQUFBQSxLQUFLLEVBQUVWLFNBQVMsQ0FBQ1c7QUFERyxHQUF0QjtBQUdEOztBQUVELGVBQWVWLFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmZ1bmN0aW9uIFVSTFdpZGdldChwcm9wcykge1xuICBjb25zdCB7IEJhc2VJbnB1dCB9ID0gcHJvcHMucmVnaXN0cnkud2lkZ2V0cztcbiAgcmV0dXJuIDxCYXNlSW5wdXQgdHlwZT1cInVybFwiIHsuLi5wcm9wc30gLz47XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgVVJMV2lkZ2V0LnByb3BUeXBlcyA9IHtcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVVJMV2lkZ2V0O1xuIl19