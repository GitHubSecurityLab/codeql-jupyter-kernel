"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AltDateWidget = _interopRequireDefault(require("./AltDateWidget"));

var _AltDateTimeWidget = _interopRequireDefault(require("./AltDateTimeWidget"));

var _BaseInput = _interopRequireDefault(require("./BaseInput"));

var _CheckboxWidget = _interopRequireDefault(require("./CheckboxWidget"));

var _CheckboxesWidget = _interopRequireDefault(require("./CheckboxesWidget"));

var _ColorWidget = _interopRequireDefault(require("./ColorWidget"));

var _DateWidget = _interopRequireDefault(require("./DateWidget"));

var _DateTimeWidget = _interopRequireDefault(require("./DateTimeWidget"));

var _EmailWidget = _interopRequireDefault(require("./EmailWidget"));

var _FileWidget = _interopRequireDefault(require("./FileWidget"));

var _HiddenWidget = _interopRequireDefault(require("./HiddenWidget"));

var _PasswordWidget = _interopRequireDefault(require("./PasswordWidget"));

var _RadioWidget = _interopRequireDefault(require("./RadioWidget"));

var _RangeWidget = _interopRequireDefault(require("./RangeWidget"));

var _SelectWidget = _interopRequireDefault(require("./SelectWidget"));

var _TextareaWidget = _interopRequireDefault(require("./TextareaWidget"));

var _TextWidget = _interopRequireDefault(require("./TextWidget"));

var _URLWidget = _interopRequireDefault(require("./URLWidget"));

var _UpDownWidget = _interopRequireDefault(require("./UpDownWidget"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  BaseInput: _BaseInput["default"],
  PasswordWidget: _PasswordWidget["default"],
  RadioWidget: _RadioWidget["default"],
  UpDownWidget: _UpDownWidget["default"],
  RangeWidget: _RangeWidget["default"],
  SelectWidget: _SelectWidget["default"],
  TextWidget: _TextWidget["default"],
  DateWidget: _DateWidget["default"],
  DateTimeWidget: _DateTimeWidget["default"],
  AltDateWidget: _AltDateWidget["default"],
  AltDateTimeWidget: _AltDateTimeWidget["default"],
  EmailWidget: _EmailWidget["default"],
  URLWidget: _URLWidget["default"],
  TextareaWidget: _TextareaWidget["default"],
  HiddenWidget: _HiddenWidget["default"],
  ColorWidget: _ColorWidget["default"],
  FileWidget: _FileWidget["default"],
  CheckboxWidget: _CheckboxWidget["default"],
  CheckboxesWidget: _CheckboxesWidget["default"]
};
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3dpZGdldHMvaW5kZXguanMiXSwibmFtZXMiOlsiQmFzZUlucHV0IiwiUGFzc3dvcmRXaWRnZXQiLCJSYWRpb1dpZGdldCIsIlVwRG93bldpZGdldCIsIlJhbmdlV2lkZ2V0IiwiU2VsZWN0V2lkZ2V0IiwiVGV4dFdpZGdldCIsIkRhdGVXaWRnZXQiLCJEYXRlVGltZVdpZGdldCIsIkFsdERhdGVXaWRnZXQiLCJBbHREYXRlVGltZVdpZGdldCIsIkVtYWlsV2lkZ2V0IiwiVVJMV2lkZ2V0IiwiVGV4dGFyZWFXaWRnZXQiLCJIaWRkZW5XaWRnZXQiLCJDb2xvcldpZGdldCIsIkZpbGVXaWRnZXQiLCJDaGVja2JveFdpZGdldCIsIkNoZWNrYm94ZXNXaWRnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztlQUVlO0FBQ2JBLEVBQUFBLFNBQVMsRUFBVEEscUJBRGE7QUFFYkMsRUFBQUEsY0FBYyxFQUFkQSwwQkFGYTtBQUdiQyxFQUFBQSxXQUFXLEVBQVhBLHVCQUhhO0FBSWJDLEVBQUFBLFlBQVksRUFBWkEsd0JBSmE7QUFLYkMsRUFBQUEsV0FBVyxFQUFYQSx1QkFMYTtBQU1iQyxFQUFBQSxZQUFZLEVBQVpBLHdCQU5hO0FBT2JDLEVBQUFBLFVBQVUsRUFBVkEsc0JBUGE7QUFRYkMsRUFBQUEsVUFBVSxFQUFWQSxzQkFSYTtBQVNiQyxFQUFBQSxjQUFjLEVBQWRBLDBCQVRhO0FBVWJDLEVBQUFBLGFBQWEsRUFBYkEseUJBVmE7QUFXYkMsRUFBQUEsaUJBQWlCLEVBQWpCQSw2QkFYYTtBQVliQyxFQUFBQSxXQUFXLEVBQVhBLHVCQVphO0FBYWJDLEVBQUFBLFNBQVMsRUFBVEEscUJBYmE7QUFjYkMsRUFBQUEsY0FBYyxFQUFkQSwwQkFkYTtBQWViQyxFQUFBQSxZQUFZLEVBQVpBLHdCQWZhO0FBZ0JiQyxFQUFBQSxXQUFXLEVBQVhBLHVCQWhCYTtBQWlCYkMsRUFBQUEsVUFBVSxFQUFWQSxzQkFqQmE7QUFrQmJDLEVBQUFBLGNBQWMsRUFBZEEsMEJBbEJhO0FBbUJiQyxFQUFBQSxnQkFBZ0IsRUFBaEJBO0FBbkJhLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWx0RGF0ZVdpZGdldCBmcm9tIFwiLi9BbHREYXRlV2lkZ2V0XCI7XG5pbXBvcnQgQWx0RGF0ZVRpbWVXaWRnZXQgZnJvbSBcIi4vQWx0RGF0ZVRpbWVXaWRnZXRcIjtcbmltcG9ydCBCYXNlSW5wdXQgZnJvbSBcIi4vQmFzZUlucHV0XCI7XG5pbXBvcnQgQ2hlY2tib3hXaWRnZXQgZnJvbSBcIi4vQ2hlY2tib3hXaWRnZXRcIjtcbmltcG9ydCBDaGVja2JveGVzV2lkZ2V0IGZyb20gXCIuL0NoZWNrYm94ZXNXaWRnZXRcIjtcbmltcG9ydCBDb2xvcldpZGdldCBmcm9tIFwiLi9Db2xvcldpZGdldFwiO1xuaW1wb3J0IERhdGVXaWRnZXQgZnJvbSBcIi4vRGF0ZVdpZGdldFwiO1xuaW1wb3J0IERhdGVUaW1lV2lkZ2V0IGZyb20gXCIuL0RhdGVUaW1lV2lkZ2V0XCI7XG5pbXBvcnQgRW1haWxXaWRnZXQgZnJvbSBcIi4vRW1haWxXaWRnZXRcIjtcbmltcG9ydCBGaWxlV2lkZ2V0IGZyb20gXCIuL0ZpbGVXaWRnZXRcIjtcbmltcG9ydCBIaWRkZW5XaWRnZXQgZnJvbSBcIi4vSGlkZGVuV2lkZ2V0XCI7XG5pbXBvcnQgUGFzc3dvcmRXaWRnZXQgZnJvbSBcIi4vUGFzc3dvcmRXaWRnZXRcIjtcbmltcG9ydCBSYWRpb1dpZGdldCBmcm9tIFwiLi9SYWRpb1dpZGdldFwiO1xuaW1wb3J0IFJhbmdlV2lkZ2V0IGZyb20gXCIuL1JhbmdlV2lkZ2V0XCI7XG5pbXBvcnQgU2VsZWN0V2lkZ2V0IGZyb20gXCIuL1NlbGVjdFdpZGdldFwiO1xuaW1wb3J0IFRleHRhcmVhV2lkZ2V0IGZyb20gXCIuL1RleHRhcmVhV2lkZ2V0XCI7XG5pbXBvcnQgVGV4dFdpZGdldCBmcm9tIFwiLi9UZXh0V2lkZ2V0XCI7XG5pbXBvcnQgVVJMV2lkZ2V0IGZyb20gXCIuL1VSTFdpZGdldFwiO1xuaW1wb3J0IFVwRG93bldpZGdldCBmcm9tIFwiLi9VcERvd25XaWRnZXRcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBCYXNlSW5wdXQsXG4gIFBhc3N3b3JkV2lkZ2V0LFxuICBSYWRpb1dpZGdldCxcbiAgVXBEb3duV2lkZ2V0LFxuICBSYW5nZVdpZGdldCxcbiAgU2VsZWN0V2lkZ2V0LFxuICBUZXh0V2lkZ2V0LFxuICBEYXRlV2lkZ2V0LFxuICBEYXRlVGltZVdpZGdldCxcbiAgQWx0RGF0ZVdpZGdldCxcbiAgQWx0RGF0ZVRpbWVXaWRnZXQsXG4gIEVtYWlsV2lkZ2V0LFxuICBVUkxXaWRnZXQsXG4gIFRleHRhcmVhV2lkZ2V0LFxuICBIaWRkZW5XaWRnZXQsXG4gIENvbG9yV2lkZ2V0LFxuICBGaWxlV2lkZ2V0LFxuICBDaGVja2JveFdpZGdldCxcbiAgQ2hlY2tib3hlc1dpZGdldCxcbn07XG4iXX0=