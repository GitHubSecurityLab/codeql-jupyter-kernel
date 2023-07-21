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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", ";name=".concat(encodeURIComponent(name), ";base64"));
}

function processFile(file) {
  var name = file.name,
      size = file.size,
      type = file.type;
  return new Promise(function (resolve, reject) {
    var reader = new window.FileReader();
    reader.onerror = reject;

    reader.onload = function (event) {
      resolve({
        dataURL: addNameToDataURL(event.target.result, name),
        name: name,
        size: size,
        type: type
      });
    };

    reader.readAsDataURL(file);
  });
}

function processFiles(files) {
  return Promise.all([].map.call(files, processFile));
}

function FilesInfo(props) {
  var filesInfo = props.filesInfo;

  if (filesInfo.length === 0) {
    return null;
  }

  return _react["default"].createElement("ul", {
    className: "file-info"
  }, filesInfo.map(function (fileInfo, key) {
    var name = fileInfo.name,
        size = fileInfo.size,
        type = fileInfo.type;
    return _react["default"].createElement("li", {
      key: key
    }, _react["default"].createElement("strong", null, name), " (", type, ", ", size, " bytes)");
  }));
}

function extractFileInfo(dataURLs) {
  return dataURLs.filter(function (dataURL) {
    return typeof dataURL !== "undefined";
  }).map(function (dataURL) {
    var _dataURItoBlob = (0, _utils.dataURItoBlob)(dataURL),
        blob = _dataURItoBlob.blob,
        name = _dataURItoBlob.name;

    return {
      name: name,
      size: blob.size,
      type: blob.type
    };
  });
}

var FileWidget =
/*#__PURE__*/
function (_Component) {
  _inherits(FileWidget, _Component);

  function FileWidget(props) {
    var _this;

    _classCallCheck(this, FileWidget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileWidget).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      processFiles(event.target.files).then(function (filesInfo) {
        var state = {
          values: filesInfo.map(function (fileInfo) {
            return fileInfo.dataURL;
          }),
          filesInfo: filesInfo
        };

        _this.setState(state, function () {
          if (multiple) {
            onChange(state.values);
          } else {
            onChange(state.values[0]);
          }
        });
      });
    });

    var value = props.value;
    var values = Array.isArray(value) ? value : [value];
    _this.state = {
      values: values,
      filesInfo: extractFileInfo(values)
    };
    return _this;
  }

  _createClass(FileWidget, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          id = _this$props2.id,
          readonly = _this$props2.readonly,
          disabled = _this$props2.disabled,
          autofocus = _this$props2.autofocus,
          options = _this$props2.options;
      var filesInfo = this.state.filesInfo;
      return _react["default"].createElement("div", null, _react["default"].createElement("p", null, _react["default"].createElement("input", {
        ref: function ref(_ref) {
          return _this2.inputRef = _ref;
        },
        id: id,
        type: "file",
        disabled: readonly || disabled,
        onChange: this.onChange,
        defaultValue: "",
        autoFocus: autofocus,
        multiple: multiple,
        accept: options.accept
      })), _react["default"].createElement(FilesInfo, {
        filesInfo: filesInfo
      }));
    }
  }]);

  return FileWidget;
}(_react.Component);

FileWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  FileWidget.propTypes = {
    multiple: _propTypes["default"].bool,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
    autofocus: _propTypes["default"].bool
  };
}

var _default = FileWidget;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvRmlsZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJhZGROYW1lVG9EYXRhVVJMIiwiZGF0YVVSTCIsIm5hbWUiLCJyZXBsYWNlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicHJvY2Vzc0ZpbGUiLCJmaWxlIiwic2l6ZSIsInR5cGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlYWRlciIsIndpbmRvdyIsIkZpbGVSZWFkZXIiLCJvbmVycm9yIiwib25sb2FkIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwicHJvY2Vzc0ZpbGVzIiwiZmlsZXMiLCJhbGwiLCJtYXAiLCJjYWxsIiwiRmlsZXNJbmZvIiwicHJvcHMiLCJmaWxlc0luZm8iLCJsZW5ndGgiLCJmaWxlSW5mbyIsImtleSIsImV4dHJhY3RGaWxlSW5mbyIsImRhdGFVUkxzIiwiZmlsdGVyIiwiYmxvYiIsIkZpbGVXaWRnZXQiLCJtdWx0aXBsZSIsIm9uQ2hhbmdlIiwidGhlbiIsInN0YXRlIiwidmFsdWVzIiwic2V0U3RhdGUiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsImlkIiwicmVhZG9ubHkiLCJkaXNhYmxlZCIsImF1dG9mb2N1cyIsIm9wdGlvbnMiLCJyZWYiLCJpbnB1dFJlZiIsImFjY2VwdCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImJvb2wiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJhcnJheU9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsZ0JBQVQsQ0FBMEJDLE9BQTFCLEVBQW1DQyxJQUFuQyxFQUF5QztBQUN2QyxTQUFPRCxPQUFPLENBQUNFLE9B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RXpCSCxzQkFBVUksT0FBVixDQUFrQkosc0JBQVVHLE1BQTVCLENBRnlCLENBQXBCLENBRmM7QUFNckJkLElBQUFBLFNBQVMsRUFBRVcsc0JBQVVDO0FBTkEsR0FBdkI7QUFRRDs7ZUFFYzNCLFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5cbmltcG9ydCB7IGRhdGFVUkl0b0Jsb2IsIHNob3VsZFJlbmRlciB9IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuXG5mdW5jdGlvbiBhZGROYW1lVG9EYXRhVVJMKGRhdGFVUkwsIG5hbWUpIHtcbiAgcmV0dXJuIGRhdGFVUkwucmVwbGFjZShcIjtiYXNlNjRcIiwgYDtuYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfTtiYXNlNjRgKTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ZpbGUoZmlsZSkge1xuICBjb25zdCB7IG5hbWUsIHNpemUsIHR5cGUgfSA9IGZpbGU7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgcmVhZGVyLm9ubG9hZCA9IGV2ZW50ID0+IHtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBkYXRhVVJMOiBhZGROYW1lVG9EYXRhVVJMKGV2ZW50LnRhcmdldC5yZXN1bHQsIG5hbWUpLFxuICAgICAgICBuYW1lLFxuICAgICAgICBzaXplLFxuICAgICAgICB0eXBlLFxuICAgICAgfSk7XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NGaWxlcyhmaWxlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoW10ubWFwLmNhbGwoZmlsZXMsIHByb2Nlc3NGaWxlKSk7XG59XG5cbmZ1bmN0aW9uIEZpbGVzSW5mbyhwcm9wcykge1xuICBjb25zdCB7IGZpbGVzSW5mbyB9ID0gcHJvcHM7XG4gIGlmIChmaWxlc0luZm8ubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIChcbiAgICA8dWwgY2xhc3NOYW1lPVwiZmlsZS1pbmZvXCI+XG4gICAgICB7ZmlsZXNJbmZvLm1hcCgoZmlsZUluZm8sIGtleSkgPT4ge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHNpemUsIHR5cGUgfSA9IGZpbGVJbmZvO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxsaSBrZXk9e2tleX0+XG4gICAgICAgICAgICA8c3Ryb25nPntuYW1lfTwvc3Ryb25nPiAoe3R5cGV9LCB7c2l6ZX0gYnl0ZXMpXG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvdWw+XG4gICk7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RGaWxlSW5mbyhkYXRhVVJMcykge1xuICByZXR1cm4gZGF0YVVSTHNcbiAgICAuZmlsdGVyKGRhdGFVUkwgPT4gdHlwZW9mIGRhdGFVUkwgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgLm1hcChkYXRhVVJMID0+IHtcbiAgICAgIGNvbnN0IHsgYmxvYiwgbmFtZSB9ID0gZGF0YVVSSXRvQmxvYihkYXRhVVJMKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHNpemU6IGJsb2Iuc2l6ZSxcbiAgICAgICAgdHlwZTogYmxvYi50eXBlLFxuICAgICAgfTtcbiAgICB9KTtcbn1cblxuY2xhc3MgRmlsZVdpZGdldCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BzO1xuICAgIGNvbnN0IHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgIHRoaXMuc3RhdGUgPSB7IHZhbHVlcywgZmlsZXNJbmZvOiBleHRyYWN0RmlsZUluZm8odmFsdWVzKSB9O1xuICB9XG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgcmV0dXJuIHNob3VsZFJlbmRlcih0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSk7XG4gIH1cblxuICBvbkNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICBjb25zdCB7IG11bHRpcGxlLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBwcm9jZXNzRmlsZXMoZXZlbnQudGFyZ2V0LmZpbGVzKS50aGVuKGZpbGVzSW5mbyA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgdmFsdWVzOiBmaWxlc0luZm8ubWFwKGZpbGVJbmZvID0+IGZpbGVJbmZvLmRhdGFVUkwpLFxuICAgICAgICBmaWxlc0luZm8sXG4gICAgICB9O1xuICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICBvbkNoYW5nZShzdGF0ZS52YWx1ZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9uQ2hhbmdlKHN0YXRlLnZhbHVlc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG11bHRpcGxlLCBpZCwgcmVhZG9ubHksIGRpc2FibGVkLCBhdXRvZm9jdXMsIG9wdGlvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBmaWxlc0luZm8gfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgcmVmPXtyZWYgPT4gKHRoaXMuaW5wdXRSZWYgPSByZWYpfVxuICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRvbmx5IHx8IGRpc2FibGVkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9XG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU9XCJcIlxuICAgICAgICAgICAgYXV0b0ZvY3VzPXthdXRvZm9jdXN9XG4gICAgICAgICAgICBtdWx0aXBsZT17bXVsdGlwbGV9XG4gICAgICAgICAgICBhY2NlcHQ9e29wdGlvbnMuYWNjZXB0fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPEZpbGVzSW5mbyBmaWxlc0luZm89e2ZpbGVzSW5mb30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRmlsZVdpZGdldC5kZWZhdWx0UHJvcHMgPSB7XG4gIGF1dG9mb2N1czogZmFsc2UsXG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIEZpbGVXaWRnZXQucHJvcFR5cGVzID0ge1xuICAgIG11bHRpcGxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgXSksXG4gICAgYXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsZVdpZGdldDtcbiJdfQ==