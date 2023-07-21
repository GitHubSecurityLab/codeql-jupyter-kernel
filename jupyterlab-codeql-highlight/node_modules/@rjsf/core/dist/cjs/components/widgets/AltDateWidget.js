"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

function rangeOptions(start, stop) {
  var options = [];

  for (var i = start; i <= stop; i++) {
    options.push({
      value: i,
      label: (0, _utils.pad)(i, 2)
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
  return _react["default"].createElement(SelectWidget, {
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
          _this.props.onChange((0, _utils.toDateString)(_this.state, _this.props.time));
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

      var nowDateObj = (0, _utils.parseDateString)(new Date().toJSON(), time);

      _this.setState(nowDateObj, function () {
        return onChange((0, _utils.toDateString)(_this.state, time));
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

      _this.setState((0, _utils.parseDateString)("", time), function () {
        return onChange(undefined);
      });
    });

    _this.state = (0, _utils.parseDateString)(props.value, props.time);
    return _this;
  }

  _createClass(AltDateWidget, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.value && prevProps.value !== (0, _utils.parseDateString)(this.props.value, this.props.time)) {
        this.setState((0, _utils.parseDateString)(this.props.value, this.props.time));
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
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
      return _react["default"].createElement("ul", {
        className: "list-inline"
      }, this.dateElementProps.map(function (elemProps, i) {
        return _react["default"].createElement("li", {
          key: i
        }, _react["default"].createElement(DateElement, _extends({
          rootId: id,
          select: _this2.onChange
        }, elemProps, {
          disabled: disabled,
          readonly: readonly,
          registry: registry,
          onBlur: onBlur,
          autofocus: autofocus && i === 0
        })));
      }), (options.hideNowButton !== "undefined" ? !options.hideNowButton : true) && _react["default"].createElement("li", null, _react["default"].createElement("a", {
        href: "#",
        className: "btn btn-info btn-now",
        onClick: this.setNow
      }, "Now")), (options.hideClearButton !== "undefined" ? !options.hideClearButton : true) && _react["default"].createElement("li", null, _react["default"].createElement("a", {
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
}(_react.Component);

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
    schema: _propTypes["default"].object.isRequired,
    id: _propTypes["default"].string.isRequired,
    value: _propTypes["default"].string,
    required: _propTypes["default"].bool,
    disabled: _propTypes["default"].bool,
    readonly: _propTypes["default"].bool,
    autofocus: _propTypes["default"].bool,
    onChange: _propTypes["default"].func,
    onBlur: _propTypes["default"].func,
    time: _propTypes["default"].bool,
    options: _propTypes["default"].object
  };
}

var _default = AltDateWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvQWx0RGF0ZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJyYW5nZU9wdGlvbnMiLCJzdGFydCIsInN0b3AiLCJvcHRpb25zIiwiaSIsInB1c2giLCJ2YWx1ZSIsImxhYmVsIiwicmVhZHlGb3JDaGFuZ2UiLCJzdGF0ZSIsIk9iamVjdCIsImtleXMiLCJldmVyeSIsImtleSIsIkRhdGVFbGVtZW50IiwicHJvcHMiLCJ0eXBlIiwicmFuZ2UiLCJzZWxlY3QiLCJyb290SWQiLCJkaXNhYmxlZCIsInJlYWRvbmx5IiwiYXV0b2ZvY3VzIiwicmVnaXN0cnkiLCJvbkJsdXIiLCJpZCIsIlNlbGVjdFdpZGdldCIsIndpZGdldHMiLCJlbnVtT3B0aW9ucyIsIkFsdERhdGVXaWRnZXQiLCJwcm9wZXJ0eSIsInNldFN0YXRlIiwib25DaGFuZ2UiLCJ0aW1lIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm5vd0RhdGVPYmoiLCJEYXRlIiwidG9KU09OIiwidW5kZWZpbmVkIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwiZGF0ZUVsZW1lbnRQcm9wcyIsIm1hcCIsImVsZW1Qcm9wcyIsImhpZGVOb3dCdXR0b24iLCJzZXROb3ciLCJoaWRlQ2xlYXJCdXR0b24iLCJjbGVhciIsInllYXIiLCJtb250aCIsImRheSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJkYXRhIiwieWVhcnNSYW5nZSIsIkNvbXBvbmVudCIsImdldEZ1bGxZZWFyIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwic2NoZW1hIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsInN0cmluZyIsInJlcXVpcmVkIiwiYm9vbCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNB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Qm5CLEVBQUFBLE9BQU8sRUFBRTtBQUNQdUQsSUFBQUEsVUFBVSxFQUFFLENBQUMsSUFBRCxFQUFPLElBQUlyQixJQUFKLEdBQVd1QixXQUFYLEtBQTJCLENBQWxDO0FBREw7QUFMVyxDOztBQXFJeEIsSUFBSUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNsQyxFQUFBQSxhQUFhLENBQUNtQyxTQUFkLEdBQTBCO0FBQ3hCQyxJQUFBQSxNQUFNLEVBQUVDLHNCQUFVQyxNQUFWLENBQWlCQyxVQUREO0FBRXhCM0MsSUFBQUEsRUFBRSxFQUFFeUMsc0JBQVVHLE1BQVYsQ0FBaUJELFVBRkc7QUFHeEI5RCxJQUFBQSxLQUFLLEVBQUU0RCxzQkFBVUcsTUFITztBQUl4QkMsSUFBQUEsUUFBUSxFQUFFSixzQkFBVUssSUFKSTtBQUt4Qm5ELElBQUFBLFFBQVEsRUFBRThDLHNCQUFVSyxJQUxJO0FBTXhCbEQsSUFBQUEsUUFBUSxFQUFFNkMsc0JBQVVLLElBTkk7QUFPeEJqRCxJQUFBQSxTQUFTLEVBQUU0QyxzQkFBVUssSUFQRztBQVF4QnZDLElBQUFBLFFBQVEsRUFBRWtDLHNCQUFVTSxJQVJJO0FBU3hCaEQsSUFBQUEsTUFBTSxFQUFFMEMsc0JBQVVNLElBVE07QUFVeEJ2QyxJQUFBQSxJQUFJLEVBQUVpQyxzQkFBVUssSUFWUTtBQVd4QnBFLElBQUFBLE9BQU8sRUFBRStELHNCQUFVQztBQVhLLEdBQTFCO0FBYUQ7O2VBRWN0QyxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuXG5pbXBvcnQgeyBzaG91bGRSZW5kZXIsIHBhcnNlRGF0ZVN0cmluZywgdG9EYXRlU3RyaW5nLCBwYWQgfSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcblxuZnVuY3Rpb24gcmFuZ2VPcHRpb25zKHN0YXJ0LCBzdG9wKSB7XG4gIGxldCBvcHRpb25zID0gW107XG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBzdG9wOyBpKyspIHtcbiAgICBvcHRpb25zLnB1c2goeyB2YWx1ZTogaSwgbGFiZWw6IHBhZChpLCAyKSB9KTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gcmVhZHlGb3JDaGFuZ2Uoc3RhdGUpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN0YXRlKS5ldmVyeShrZXkgPT4gc3RhdGVba2V5XSAhPT0gLTEpO1xufVxuXG5mdW5jdGlvbiBEYXRlRWxlbWVudChwcm9wcykge1xuICBjb25zdCB7XG4gICAgdHlwZSxcbiAgICByYW5nZSxcbiAgICB2YWx1ZSxcbiAgICBzZWxlY3QsXG4gICAgcm9vdElkLFxuICAgIGRpc2FibGVkLFxuICAgIHJlYWRvbmx5LFxuICAgIGF1dG9mb2N1cyxcbiAgICByZWdpc3RyeSxcbiAgICBvbkJsdXIsXG4gIH0gPSBwcm9wcztcbiAgY29uc3QgaWQgPSByb290SWQgKyBcIl9cIiArIHR5cGU7XG4gIGNvbnN0IHsgU2VsZWN0V2lkZ2V0IH0gPSByZWdpc3RyeS53aWRnZXRzO1xuICByZXR1cm4gKFxuICAgIDxTZWxlY3RXaWRnZXRcbiAgICAgIHNjaGVtYT17eyB0eXBlOiBcImludGVnZXJcIiB9fVxuICAgICAgaWQ9e2lkfVxuICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgIG9wdGlvbnM9e3sgZW51bU9wdGlvbnM6IHJhbmdlT3B0aW9ucyhyYW5nZVswXSwgcmFuZ2VbMV0pIH19XG4gICAgICBwbGFjZWhvbGRlcj17dHlwZX1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cbiAgICAgIGF1dG9mb2N1cz17YXV0b2ZvY3VzfVxuICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHNlbGVjdCh0eXBlLCB2YWx1ZSl9XG4gICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAvPlxuICApO1xufVxuXG5jbGFzcyBBbHREYXRlV2lkZ2V0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0aW1lOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgIGF1dG9mb2N1czogZmFsc2UsXG4gICAgb3B0aW9uczoge1xuICAgICAgeWVhcnNSYW5nZTogWzE5MDAsIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSArIDJdLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHBhcnNlRGF0ZVN0cmluZyhwcm9wcy52YWx1ZSwgcHJvcHMudGltZSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMudmFsdWUgJiZcbiAgICAgIHByZXZQcm9wcy52YWx1ZSAhPT0gcGFyc2VEYXRlU3RyaW5nKHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMudGltZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUocGFyc2VEYXRlU3RyaW5nKHRoaXMucHJvcHMudmFsdWUsIHRoaXMucHJvcHMudGltZSkpO1xuICAgIH1cbiAgfVxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiBzaG91bGRSZW5kZXIodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAocHJvcGVydHksIHZhbHVlKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHsgW3Byb3BlcnR5XTogdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gLTEgOiB2YWx1ZSB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICAvLyBPbmx5IHByb3BhZ2F0ZSB0byBwYXJlbnQgc3RhdGUgaWYgd2UgaGF2ZSBhIGNvbXBsZXRlIGRhdGV7dGltZX1cbiAgICAgICAgaWYgKHJlYWR5Rm9yQ2hhbmdlKHRoaXMuc3RhdGUpKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0b0RhdGVTdHJpbmcodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcy50aW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9O1xuXG4gIHNldE5vdyA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHsgdGltZSwgZGlzYWJsZWQsIHJlYWRvbmx5LCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoZGlzYWJsZWQgfHwgcmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm93RGF0ZU9iaiA9IHBhcnNlRGF0ZVN0cmluZyhuZXcgRGF0ZSgpLnRvSlNPTigpLCB0aW1lKTtcbiAgICB0aGlzLnNldFN0YXRlKG5vd0RhdGVPYmosICgpID0+IG9uQ2hhbmdlKHRvRGF0ZVN0cmluZyh0aGlzLnN0YXRlLCB0aW1lKSkpO1xuICB9O1xuXG4gIGNsZWFyID0gZXZlbnQgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyB0aW1lLCBkaXNhYmxlZCwgcmVhZG9ubHksIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChkaXNhYmxlZCB8fCByZWFkb25seSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHBhcnNlRGF0ZVN0cmluZyhcIlwiLCB0aW1lKSwgKCkgPT4gb25DaGFuZ2UodW5kZWZpbmVkKSk7XG4gIH07XG5cbiAgZ2V0IGRhdGVFbGVtZW50UHJvcHMoKSB7XG4gICAgY29uc3QgeyB0aW1lLCBvcHRpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZGF0YSA9IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogXCJ5ZWFyXCIsXG4gICAgICAgIHJhbmdlOiBvcHRpb25zLnllYXJzUmFuZ2UsXG4gICAgICAgIHZhbHVlOiB5ZWFyLFxuICAgICAgfSxcbiAgICAgIHsgdHlwZTogXCJtb250aFwiLCByYW5nZTogWzEsIDEyXSwgdmFsdWU6IG1vbnRoIH0sXG4gICAgICB7IHR5cGU6IFwiZGF5XCIsIHJhbmdlOiBbMSwgMzFdLCB2YWx1ZTogZGF5IH0sXG4gICAgXTtcbiAgICBpZiAodGltZSkge1xuICAgICAgZGF0YS5wdXNoKFxuICAgICAgICB7IHR5cGU6IFwiaG91clwiLCByYW5nZTogWzAsIDIzXSwgdmFsdWU6IGhvdXIgfSxcbiAgICAgICAgeyB0eXBlOiBcIm1pbnV0ZVwiLCByYW5nZTogWzAsIDU5XSwgdmFsdWU6IG1pbnV0ZSB9LFxuICAgICAgICB7IHR5cGU6IFwic2Vjb25kXCIsIHJhbmdlOiBbMCwgNTldLCB2YWx1ZTogc2Vjb25kIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICByZWFkb25seSxcbiAgICAgIGF1dG9mb2N1cyxcbiAgICAgIHJlZ2lzdHJ5LFxuICAgICAgb25CbHVyLFxuICAgICAgb3B0aW9ucyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtaW5saW5lXCI+XG4gICAgICAgIHt0aGlzLmRhdGVFbGVtZW50UHJvcHMubWFwKChlbGVtUHJvcHMsIGkpID0+IChcbiAgICAgICAgICA8bGkga2V5PXtpfT5cbiAgICAgICAgICAgIDxEYXRlRWxlbWVudFxuICAgICAgICAgICAgICByb290SWQ9e2lkfVxuICAgICAgICAgICAgICBzZWxlY3Q9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgICAgIHsuLi5lbGVtUHJvcHN9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgcmVhZG9ubHk9e3JlYWRvbmx5fVxuICAgICAgICAgICAgICByZWdpc3RyeT17cmVnaXN0cnl9XG4gICAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxuICAgICAgICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1cyAmJiBpID09PSAwfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApKX1cbiAgICAgICAgeyhvcHRpb25zLmhpZGVOb3dCdXR0b24gIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICA/ICFvcHRpb25zLmhpZGVOb3dCdXR0b25cbiAgICAgICAgICA6IHRydWUpICYmIChcbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mbyBidG4tbm93XCIgb25DbGljaz17dGhpcy5zZXROb3d9PlxuICAgICAgICAgICAgICBOb3dcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApfVxuICAgICAgICB7KG9wdGlvbnMuaGlkZUNsZWFyQnV0dG9uICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgPyAhb3B0aW9ucy5oaWRlQ2xlYXJCdXR0b25cbiAgICAgICAgICA6IHRydWUpICYmIChcbiAgICAgICAgICA8bGk+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZyBidG4tY2xlYXJcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsZWFyfT5cbiAgICAgICAgICAgICAgQ2xlYXJcbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApfVxuICAgICAgPC91bD5cbiAgICApO1xuICB9XG59XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgQWx0RGF0ZVdpZGdldC5wcm9wVHlwZXMgPSB7XG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICByZXF1aXJlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHJlYWRvbmx5OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRpbWU6IFByb3BUeXBlcy5ib29sLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFsdERhdGVXaWRnZXQ7XG4iXX0=