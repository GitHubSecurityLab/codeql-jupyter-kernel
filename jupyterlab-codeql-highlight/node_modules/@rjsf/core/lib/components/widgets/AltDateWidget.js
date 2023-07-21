function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { shouldRender, parseDateString, toDateString, pad } from "../../utils";

function rangeOptions(start, stop) {
  var options = [];

  for (var i = start; i <= stop; i++) {
    options.push({
      value: i,
      label: pad(i, 2)
    });
  }

  return options;
}

function readyForChange(state) {
  return Object.keys(state).every(function (key) {
    return state[key] !== -1;
  });
}

function DateElement(props) {
  var type = props.type,
      range = props.range,
      value = props.value,
      select = props.select,
      rootId = props.rootId,
      disabled = props.disabled,
      readonly = props.readonly,
      autofocus = props.autofocus,
      registry = props.registry,
      onBlur = props.onBlur;
  var id = rootId + "_" + type;
  var SelectWidget = registry.widgets.SelectWidget;
  return React.createElement(SelectWidget, {
    schema: {
      type: "integer"
    },
    id: id,
    className: "form-control",
    options: {
      enumOptions: rangeOptions(range[0], range[1])
    },
    placeholder: type,
    value: value,
    disabled: disabled,
    readonly: readonly,
    autofocus: autofocus,
    onChange: function onChange(value) {
      return select(type, value);
    },
    onBlur: onBlur
  });
}

var AltDateWidget =
/*#__PURE__*/
function (_Component) {
  _inherits(AltDateWidget, _Component);

  function AltDateWidget(props) {
    var _this;

    _classCallCheck(this, AltDateWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AltDateWidget).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (property, value) {
      _this.setState(_defineProperty({}, property, typeof value === "undefined" ? -1 : value), function () {
        // Only propagate to parent state if we have a complete date{time}
        if (readyForChange(_this.state)) {
          _this.props.onChange(toDateString(_this.state, _this.props.time));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setNow", function (event) {
      event.preventDefault();
      var _this$props = _this.props,
          time = _this$props.time,
          disabled = _this$props.disabled,
          readonly = _this$props.readonly,
          onChange = _this$props.onChange;

      if (disabled || readonly) {
        return;
      }

      var nowDateObj = parseDateString(new Date().toJSON(), time);

      _this.setState(nowDateObj, function () {
        return onChange(toDateString(_this.state, time));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clear", function (event) {
      event.preventDefault();
      var _this$props2 = _this.props,
          time = _this$props2.time,
          disabled = _this$props2.disabled,
          readonly = _this$props2.readonly,
          onChange = _this$props2.onChange;

      if (disabled || readonly) {
        return;
      }

      _this.setState(parseDateString("", time), function () {
        return onChange(undefined);
      });
    });

    _this.state = parseDateString(props.value, props.time);
    return _this;
  }

  _createClass(AltDateWidget, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.value && prevProps.value !== parseDateString(this.props.value, this.props.time)) {
        this.setState(parseDateString(this.props.value, this.props.time));
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return shouldRender(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          id = _this$props3.id,
          disabled = _this$props3.disabled,
          readonly = _this$props3.readonly,
          autofocus = _this$props3.autofocus,
          registry = _this$props3.registry,
          onBlur = _this$props3.onBlur,
          options = _this$props3.options;
      return React.createElement("ul", {
        className: "list-inline"
      }, this.dateElementProps.map(function (elemProps, i) {
        return React.createElement("li", {
          key: i
        }, React.createElement(DateElement, _extends({
          rootId: id,
          select: _this2.onChange
        }, elemProps, {
          disabled: disabled,
          readonly: readonly,
          registry: registry,
          onBlur: onBlur,
          autofocus: autofocus && i === 0
        })));
      }), (options.hideNowButton !== "undefined" ? !options.hideNowButton : true) && React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "btn btn-info btn-now",
        onClick: this.setNow
      }, "Now")), (options.hideClearButton !== "undefined" ? !options.hideClearButton : true) && React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "btn btn-warning btn-clear",
        onClick: this.clear
      }, "Clear")));
    }
  }, {
    key: "dateElementProps",
    get: function get() {
      var _this$props4 = this.props,
          time = _this$props4.time,
          options = _this$props4.options;
      var _this$state = this.state,
          year = _this$state.year,
          month = _this$state.month,
          day = _this$state.day,
          hour = _this$state.hour,
          minute = _this$state.minute,
          second = _this$state.second;
      var data = [{
        type: "year",
        range: options.yearsRange,
        value: year
      }, {
        type: "month",
        range: [1, 12],
        value: month
      }, {
        type: "day",
        range: [1, 31],
        value: day
      }];

      if (time) {
        data.push({
          type: "hour",
          range: [0, 23],
          value: hour
        }, {
          type: "minute",
          range: [0, 59],
          value: minute
        }, {
          type: "second",
          range: [0, 59],
          value: second
        });
      }

      return data;
    }
  }]);

  return AltDateWidget;
}(Component);

_defineProperty(AltDateWidget, "defaultProps", {
  time: false,
  disabled: false,
  readonly: false,
  autofocus: false,
  options: {
    yearsRange: [1900, new Date().getFullYear() + 2]
  }
});

if (process.env.NODE_ENV !== "production") {
  AltDateWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    time: PropTypes.bool,
    options: PropTypes.object
  };
}

export default AltDateWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInNob3VsZFJlbmRlciIsInBhcnNlRGF0ZVN0cmluZyIsInRvRGF0ZVN0cmluZyIsInBhZCIsInJhbmdlT3B0aW9ucyIsInN0YXJ0Iiwic3RvcCIsIm9wdGlvbnMiLCJpIiwicHVzaCIsInZhbHVlIiwibGFiZWwiLCJyZWFkeUZvckNoYW5nZSIsInN0YXRlIiwiT2JqZWN0Iiwia2V5cyIsImV2ZXJ5Iiwia2V5IiwiRGF0ZUVsZW1lbnQiLCJwcm9wcyIsInR5cGUiLCJyYW5nZSIsInNlbGVjdCIsInJvb3RJZCIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJhdXRvZm9jdXMiLCJyZWdpc3RyeSIsIm9uQmx1ciIsImlkIiwiU2VsZWN0V2lkZ2V0Iiwid2lkZ2V0cyIsImVudW1PcHRpb25zIiwiQWx0RGF0ZVdpZGdldCIsInByb3BlcnR5Iiwic2V0U3RhdGUiLCJvbkNoYW5nZSIsInRpbWUiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwibm93RGF0ZU9iaiIsIkRhdGUiLCJ0b0pTT04iLCJ1bmRlZmluZWQiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJkYXRlRWxlbWVudFByb3BzIiwibWFwIiwiZWxlbVByb3BzIiwiaGlkZU5vd0J1dHRvbiIsInNldE5vdyIsImhpZGVDbGVhckJ1dHRvbiIsImNsZWFyIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImRhdGEiLCJ5ZWFyc1JhbmdlIiwiZ2V0RnVsbFllYXIiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJwcm9wVHlwZXMiLCJzY2hlbWEiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwic3RyaW5nIiwicmVxdWlyZWQiLCJib29sIiwiZnVuYyJdLCJtYXBwaW5ncyI6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R0FBMUI7QUFhRDs7QUFFRCxlQUFlcEMsYUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcblxuaW1wb3J0IHsgc2hvdWxkUmVuZGVyLCBwYXJzZURhdGVTdHJpbmcsIHRvRGF0ZVN0cmluZywgcGFkIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIHJhbmdlT3B0aW9ucyhzdGFydCwgc3RvcCkge1xuICBsZXQgb3B0aW9ucyA9IFtdO1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gc3RvcDsgaSsrKSB7XG4gICAgb3B0aW9ucy5wdXNoKHsgdmFsdWU6IGksIGxhYmVsOiBwYWQoaSwgMikgfSk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbmZ1bmN0aW9uIHJlYWR5Rm9yQ2hhbmdlKHN0YXRlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzdGF0ZSkuZXZlcnkoa2V5ID0+IHN0YXRlW2tleV0gIT09IC0xKTtcbn1cblxuZnVuY3Rpb24gRGF0ZUVsZW1lbnQocHJvcHMpIHtcbiAgY29uc3Qge1xuICAgIHR5cGUsXG4gICAgcmFuZ2UsXG4gICAgdmFsdWUsXG4gICAgc2VsZWN0LFxuICAgIHJvb3RJZCxcbiAgICBkaXNhYmxlZCxcbiAgICByZWFkb25seSxcbiAgICBhdXRvZm9jdXMsXG4gICAgcmVnaXN0cnksXG4gICAgb25CbHVyLFxuICB9ID0gcHJvcHM7XG4gIGNvbnN0IGlkID0gcm9vdElkICsgXCJfXCIgKyB0eXBlO1xuICBjb25zdCB7IFNlbGVjdFdpZGdldCB9ID0gcmVnaXN0cnkud2lkZ2V0cztcbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0V2lkZ2V0XG4gICAgICBzY2hlbWE9e3sgdHlwZTogXCJpbnRlZ2VyXCIgfX1cbiAgICAgIGlkPXtpZH1cbiAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICBvcHRpb25zPXt7IGVudW1PcHRpb25zOiByYW5nZU9wdGlvbnMocmFuZ2VbMF0sIHJhbmdlWzFdKSB9fVxuICAgICAgcGxhY2Vob2xkZXI9e3R5cGV9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkb25seT17cmVhZG9ubHl9XG4gICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cbiAgICAgIG9uQ2hhbmdlPXt2YWx1ZSA9PiBzZWxlY3QodHlwZSwgdmFsdWUpfVxuICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgLz5cbiAgKTtcbn1cblxuY2xhc3MgQWx0RGF0ZVdpZGdldCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdGltZTogZmFsc2UsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIHJlYWRvbmx5OiBmYWxzZSxcbiAgICBhdXRvZm9jdXM6IGZhbHNlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHllYXJzUmFuZ2U6IFsxOTAwLCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAyXSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBwYXJzZURhdGVTdHJpbmcocHJvcHMudmFsdWUsIHByb3BzLnRpbWUpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgaWYgKFxuICAgICAgcHJldlByb3BzLnZhbHVlICYmXG4gICAgICBwcmV2UHJvcHMudmFsdWUgIT09IHBhcnNlRGF0ZVN0cmluZyh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLnRpbWUpXG4gICAgKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHBhcnNlRGF0ZVN0cmluZyh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLnRpbWUpKTtcbiAgICB9XG4gIH1cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gc2hvdWxkUmVuZGVyKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKTtcbiAgfVxuXG4gIG9uQ2hhbmdlID0gKHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICB7IFtwcm9wZXJ0eV06IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IC0xIDogdmFsdWUgfSxcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gT25seSBwcm9wYWdhdGUgdG8gcGFyZW50IHN0YXRlIGlmIHdlIGhhdmUgYSBjb21wbGV0ZSBkYXRle3RpbWV9XG4gICAgICAgIGlmIChyZWFkeUZvckNoYW5nZSh0aGlzLnN0YXRlKSkge1xuICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodG9EYXRlU3RyaW5nKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMudGltZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfTtcblxuICBzZXROb3cgPSBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB7IHRpbWUsIGRpc2FibGVkLCByZWFkb25seSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKGRpc2FibGVkIHx8IHJlYWRvbmx5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vd0RhdGVPYmogPSBwYXJzZURhdGVTdHJpbmcobmV3IERhdGUoKS50b0pTT04oKSwgdGltZSk7XG4gICAgdGhpcy5zZXRTdGF0ZShub3dEYXRlT2JqLCAoKSA9PiBvbkNoYW5nZSh0b0RhdGVTdHJpbmcodGhpcy5zdGF0ZSwgdGltZSkpKTtcbiAgfTtcblxuICBjbGVhciA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHsgdGltZSwgZGlzYWJsZWQsIHJlYWRvbmx5LCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZGlzYWJsZWQgfHwgcmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZShwYXJzZURhdGVTdHJpbmcoXCJcIiwgdGltZSksICgpID0+IG9uQ2hhbmdlKHVuZGVmaW5lZCkpO1xuICB9O1xuXG4gIGdldCBkYXRlRWxlbWVudFByb3BzKCkge1xuICAgIGNvbnN0IHsgdGltZSwgb3B0aW9ucyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IGRhdGEgPSBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFwieWVhclwiLFxuICAgICAgICByYW5nZTogb3B0aW9ucy55ZWFyc1JhbmdlLFxuICAgICAgICB2YWx1ZTogeWVhcixcbiAgICAgIH0sXG4gICAgICB7IHR5cGU6IFwibW9udGhcIiwgcmFuZ2U6IFsxLCAxMl0sIHZhbHVlOiBtb250aCB9LFxuICAgICAgeyB0eXBlOiBcImRheVwiLCByYW5nZTogWzEsIDMxXSwgdmFsdWU6IGRheSB9LFxuICAgIF07XG4gICAgaWYgKHRpbWUpIHtcbiAgICAgIGRhdGEucHVzaChcbiAgICAgICAgeyB0eXBlOiBcImhvdXJcIiwgcmFuZ2U6IFswLCAyM10sIHZhbHVlOiBob3VyIH0sXG4gICAgICAgIHsgdHlwZTogXCJtaW51dGVcIiwgcmFuZ2U6IFswLCA1OV0sIHZhbHVlOiBtaW51dGUgfSxcbiAgICAgICAgeyB0eXBlOiBcInNlY29uZFwiLCByYW5nZTogWzAsIDU5XSwgdmFsdWU6IHNlY29uZCB9XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgcmVhZG9ubHksXG4gICAgICBhdXRvZm9jdXMsXG4gICAgICByZWdpc3RyeSxcbiAgICAgIG9uQmx1cixcbiAgICAgIG9wdGlvbnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWlubGluZVwiPlxuICAgICAgICB7dGhpcy5kYXRlRWxlbWVudFByb3BzLm1hcCgoZWxlbVByb3BzLCBpKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17aX0+XG4gICAgICAgICAgICA8RGF0ZUVsZW1lbnRcbiAgICAgICAgICAgICAgcm9vdElkPXtpZH1cbiAgICAgICAgICAgICAgc2VsZWN0PXt0aGlzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgICB7Li4uZWxlbVByb3BzfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cbiAgICAgICAgICAgICAgcmVnaXN0cnk9e3JlZ2lzdHJ5fVxuICAgICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgICAgICAgYXV0b2ZvY3VzPXthdXRvZm9jdXMgJiYgaSA9PT0gMH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICAgIHsob3B0aW9ucy5oaWRlTm93QnV0dG9uICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgPyAhb3B0aW9ucy5oaWRlTm93QnV0dG9uXG4gICAgICAgICAgOiB0cnVlKSAmJiAoXG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJidG4gYnRuLWluZm8gYnRuLW5vd1wiIG9uQ2xpY2s9e3RoaXMuc2V0Tm93fT5cbiAgICAgICAgICAgICAgTm93XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKX1cbiAgICAgICAgeyhvcHRpb25zLmhpZGVDbGVhckJ1dHRvbiAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgID8gIW9wdGlvbnMuaGlkZUNsZWFyQnV0dG9uXG4gICAgICAgICAgOiB0cnVlKSAmJiAoXG4gICAgICAgICAgPGxpPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLXdhcm5pbmcgYnRuLWNsZWFyXCJcbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5jbGVhcn0+XG4gICAgICAgICAgICAgIENsZWFyXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKX1cbiAgICAgIDwvdWw+XG4gICAgKTtcbiAgfVxufVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEFsdERhdGVXaWRnZXQucHJvcFR5cGVzID0ge1xuICAgIHNjaGVtYTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICByZWFkb25seTogUHJvcFR5cGVzLmJvb2wsXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB0aW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBbHREYXRlV2lkZ2V0O1xuIl19