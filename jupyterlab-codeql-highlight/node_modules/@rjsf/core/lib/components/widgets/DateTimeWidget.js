function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import PropTypes from "prop-types";
import { utcToLocal, localToUTC } from "../../utils";

function DateTimeWidget(props) {
  var value = props.value,
      _onChange = props.onChange,
      BaseInput = props.registry.widgets.BaseInput;
  return React.createElement(BaseInput, _extends({
    type: "datetime-local"
  }, props, {
    value: utcToLocal(value),
    onChange: function onChange(value) {
      return _onChange(localToUTC(value));
    }
  }));
}

if (process.env.NODE_ENV !== "production") {
  DateTimeWidget.propTypes = {
    value: PropTypes.string
  };
}

export default DateTimeWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRGF0ZVRpbWVXaWRnZXQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJ1dGNUb0xvY2FsIiwibG9jYWxUb1VUQyIsIkRhdGVUaW1lV2lkZ2V0IiwicHJvcHMiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiQmFzZUlucHV0IiwicmVnaXN0cnkiLCJ3aWRnZXRzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic3RyaW5nIl0sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsVUFBVCxFQUFxQkMsVUFBckIsUUFBdUMsYUFBdkM7O0FBRUEsU0FBU0MsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7QUFBQSxNQUUzQkMsS0FGMkIsR0FPekJELEtBUHlCLENBRTNCQyxLQUYyQjtBQUFBLE1BRzNCQyxTQUgyQixHQU96QkYsS0FQeUIsQ0FHM0JFLFFBSDJCO0FBQUEsTUFLZEMsU0FMYyxHQU96QkgsS0FQeUIsQ0FJM0JJLFFBSjJCLENBS3pCQyxPQUx5QixDQUtkRixTQUxjO0FBUTdCLFNBQ0Usb0JBQUMsU0FBRDtBQUNFLElBQUEsSUFBSSxFQUFDO0FBRFAsS0FFTUgsS0FGTjtBQUdFLElBQUEsS0FBSyxFQUFFSCxVQUFVLENBQUNJLEtBQUQsQ0FIbkI7QUFJRSxJQUFBLFFBQVEsRUFBRSxrQkFBQUEsS0FBSztBQUFBLGFBQUlDLFNBQVEsQ0FBQ0osVUFBVSxDQUFDRyxLQUFELENBQVgsQ0FBWjtBQUFBO0FBSmpCLEtBREY7QUFRRDs7QUFFRCxJQUFJSyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6Q1QsRUFBQUEsY0FBYyxDQUFDVSxTQUFmLEdBQTJCO0FBQ3pCUixJQUFBQSxLQUFLLEVBQUVMLFNBQVMsQ0FBQ2M7QUFEUSxHQUEzQjtBQUdEOztBQUVELGVBQWVYLGNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgeyB1dGNUb0xvY2FsLCBsb2NhbFRvVVRDIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIERhdGVUaW1lV2lkZ2V0KHByb3BzKSB7XG4gIGNvbnN0IHtcbiAgICB2YWx1ZSxcbiAgICBvbkNoYW5nZSxcbiAgICByZWdpc3RyeToge1xuICAgICAgd2lkZ2V0czogeyBCYXNlSW5wdXQgfSxcbiAgICB9LFxuICB9ID0gcHJvcHM7XG4gIHJldHVybiAoXG4gICAgPEJhc2VJbnB1dFxuICAgICAgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCJcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHZhbHVlPXt1dGNUb0xvY2FsKHZhbHVlKX1cbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBvbkNoYW5nZShsb2NhbFRvVVRDKHZhbHVlKSl9XG4gICAgLz5cbiAgKTtcbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBEYXRlVGltZVdpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGVUaW1lV2lkZ2V0O1xuIl19