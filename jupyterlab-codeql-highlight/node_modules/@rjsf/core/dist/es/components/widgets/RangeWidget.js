function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import { rangeSpec } from "../../utils";

function RangeWidget(props) {
  var schema = props.schema,
      value = props.value,
      BaseInput = props.registry.widgets.BaseInput;
  return React.createElement("div", {
    className: "field-range-wrapper"
  }, React.createElement(BaseInput, _extends({
    type: "range"
  }, props, rangeSpec(schema))), React.createElement("span", {
    className: "range-view"
  }, value));
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
}

export default RangeWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvUmFuZ2VXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJyYW5nZVNwZWMiLCJSYW5nZVdpZGdldCIsInByb3BzIiwic2NoZW1hIiwidmFsdWUiLCJCYXNlSW5wdXQiLCJyZWdpc3RyeSIsIndpZGdldHMiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFFQSxTQUFTQyxTQUFULFFBQTBCLGFBQTFCOztBQUVBLFNBQVNDLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCO0FBQUEsTUFFeEJDLE1BRndCLEdBT3RCRCxLQVBzQixDQUV4QkMsTUFGd0I7QUFBQSxNQUd4QkMsS0FId0IsR0FPdEJGLEtBUHNCLENBR3hCRSxLQUh3QjtBQUFBLE1BS1hDLFNBTFcsR0FPdEJILEtBUHNCLENBSXhCSSxRQUp3QixDQUt0QkMsT0FMc0IsQ0FLWEYsU0FMVztBQVExQixTQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFLG9CQUFDLFNBQUQ7QUFBVyxJQUFBLElBQUksRUFBQztBQUFoQixLQUE0QkgsS0FBNUIsRUFBdUNGLFNBQVMsQ0FBQ0csTUFBRCxDQUFoRCxFQURGLEVBRUU7QUFBTSxJQUFBLFNBQVMsRUFBQztBQUFoQixLQUE4QkMsS0FBOUIsQ0FGRixDQURGO0FBTUQ7O0FBRUQsSUFBSUksT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNULEVBQUFBLFdBQVcsQ0FBQ1UsU0FBWixHQUF3QjtBQUN0QlAsSUFBQUEsS0FBSyxFQUFFTCxTQUFTLENBQUNhLFNBQVYsQ0FBb0IsQ0FBQ2IsU0FBUyxDQUFDYyxNQUFYLEVBQW1CZCxTQUFTLENBQUNlLE1BQTdCLENBQXBCO0FBRGUsR0FBeEI7QUFHRDs7QUFFRCxlQUFlYixXQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5pbXBvcnQgeyByYW5nZVNwZWMgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gUmFuZ2VXaWRnZXQocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIHNjaGVtYSxcbiAgICB2YWx1ZSxcbiAgICByZWdpc3RyeToge1xuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcbiAgICB9LFxuICB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaWVsZC1yYW5nZS13cmFwcGVyXCI+XG4gICAgICA8QmFzZUlucHV0IHR5cGU9XCJyYW5nZVwiIHsuLi5wcm9wc30gey4uLnJhbmdlU3BlYyhzY2hlbWEpfSAvPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmFuZ2Utdmlld1wiPnt2YWx1ZX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgUmFuZ2VXaWRnZXQucHJvcFR5cGVzID0ge1xuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmdlV2lkZ2V0O1xuIl19