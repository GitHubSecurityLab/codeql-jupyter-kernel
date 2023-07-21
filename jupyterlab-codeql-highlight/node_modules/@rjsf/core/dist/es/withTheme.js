function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Form from "./";

function withTheme(themeProps) {
  return forwardRef(function (_ref, ref) {
    var fields = _ref.fields,
        widgets = _ref.widgets,
        directProps = _objectWithoutProperties(_ref, ["fields", "widgets"]);

    fields = _objectSpread({}, themeProps.fields, fields);
    widgets = _objectSpread({}, themeProps.widgets, widgets);
    return React.createElement(Form, _extends({}, themeProps, directProps, {
      fields: fields,
      widgets: widgets,
      ref: ref
    }));
  });
}

withTheme.propTypes = {
  widgets: PropTypes.object,
  fields: PropTypes.object
};
export default withTheme;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93aXRoVGhlbWUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJmb3J3YXJkUmVmIiwiUHJvcFR5cGVzIiwiRm9ybSIsIndpdGhUaGVtZSIsInRoZW1lUHJvcHMiLCJyZWYiLCJmaWVsZHMiLCJ3aWRnZXRzIiwiZGlyZWN0UHJvcHMiLCJwcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxVQUFoQixRQUFrQyxPQUFsQztBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLElBQWpCOztBQUVBLFNBQVNDLFNBQVQsQ0FBbUJDLFVBQW5CLEVBQStCO0FBQzdCLFNBQU9KLFVBQVUsQ0FBQyxnQkFBc0NLLEdBQXRDLEVBQThDO0FBQUEsUUFBM0NDLE1BQTJDLFFBQTNDQSxNQUEyQztBQUFBLFFBQW5DQyxPQUFtQyxRQUFuQ0EsT0FBbUM7QUFBQSxRQUF2QkMsV0FBdUI7O0FBQzlERixJQUFBQSxNQUFNLHFCQUFRRixVQUFVLENBQUNFLE1BQW5CLEVBQThCQSxNQUE5QixDQUFOO0FBQ0FDLElBQUFBLE9BQU8scUJBQVFILFVBQVUsQ0FBQ0csT0FBbkIsRUFBK0JBLE9BQS9CLENBQVA7QUFFQSxXQUNFLG9CQUFDLElBQUQsZUFDTUgsVUFETixFQUVNSSxXQUZOO0FBR0UsTUFBQSxNQUFNLEVBQUVGLE1BSFY7QUFJRSxNQUFBLE9BQU8sRUFBRUMsT0FKWDtBQUtFLE1BQUEsR0FBRyxFQUFFRjtBQUxQLE9BREY7QUFTRCxHQWJnQixDQUFqQjtBQWNEOztBQUVERixTQUFTLENBQUNNLFNBQVYsR0FBc0I7QUFDcEJGLEVBQUFBLE9BQU8sRUFBRU4sU0FBUyxDQUFDUyxNQURDO0FBRXBCSixFQUFBQSxNQUFNLEVBQUVMLFNBQVMsQ0FBQ1M7QUFGRSxDQUF0QjtBQUtBLGVBQWVQLFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiO1xuaW1wb3J0IEZvcm0gZnJvbSBcIi4vXCI7XG5cbmZ1bmN0aW9uIHdpdGhUaGVtZSh0aGVtZVByb3BzKSB7XG4gIHJldHVybiBmb3J3YXJkUmVmKCh7IGZpZWxkcywgd2lkZ2V0cywgLi4uZGlyZWN0UHJvcHMgfSwgcmVmKSA9PiB7XG4gICAgZmllbGRzID0geyAuLi50aGVtZVByb3BzLmZpZWxkcywgLi4uZmllbGRzIH07XG4gICAgd2lkZ2V0cyA9IHsgLi4udGhlbWVQcm9wcy53aWRnZXRzLCAuLi53aWRnZXRzIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1cbiAgICAgICAgey4uLnRoZW1lUHJvcHN9XG4gICAgICAgIHsuLi5kaXJlY3RQcm9wc31cbiAgICAgICAgZmllbGRzPXtmaWVsZHN9XG4gICAgICAgIHdpZGdldHM9e3dpZGdldHN9XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgLz5cbiAgICApO1xuICB9KTtcbn1cblxud2l0aFRoZW1lLnByb3BUeXBlcyA9IHtcbiAgd2lkZ2V0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgZmllbGRzOiBQcm9wVHlwZXMub2JqZWN0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFRoZW1lO1xuIl19