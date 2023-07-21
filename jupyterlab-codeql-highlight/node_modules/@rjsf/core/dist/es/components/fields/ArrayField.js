function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import AddButton from "../AddButton";
import IconButton from "../IconButton";
import React, { Component } from "react";
import includes from "core-js-pure/es/array/includes";
import * as types from "../../types";
import { getWidget, getDefaultFormState, getUiOptions, isMultiSelect, isFilesArray, isFixedItems, allowAdditionalItems, optionsList, retrieveSchema, toIdSchema, getDefaultRegistry } from "../../utils";
import { nanoid } from "nanoid";

function ArrayFieldTitle(_ref) {
  var TitleField = _ref.TitleField,
      idSchema = _ref.idSchema,
      title = _ref.title,
      required = _ref.required;

  if (!title) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__title");
  return React.createElement(TitleField, {
    id: id,
    title: title,
    required: required
  });
}

function ArrayFieldDescription(_ref2) {
  var DescriptionField = _ref2.DescriptionField,
      idSchema = _ref2.idSchema,
      description = _ref2.description;

  if (!description) {
    return null;
  }

  var id = "".concat(idSchema.$id, "__description");
  return React.createElement(DescriptionField, {
    id: id,
    description: description
  });
} // Used in the two templates


function DefaultArrayItem(props) {
  var btnStyle = {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    fontWeight: "bold"
  };
  return React.createElement("div", {
    key: props.key,
    className: props.className
  }, React.createElement("div", {
    className: props.hasToolbar ? "col-xs-9" : "col-xs-12"
  }, props.children), props.hasToolbar && React.createElement("div", {
    className: "col-xs-3 array-item-toolbox"
  }, React.createElement("div", {
    className: "btn-group",
    style: {
      display: "flex",
      justifyContent: "space-around"
    }
  }, (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
    icon: "arrow-up",
    "aria-label": "Move up",
    className: "array-item-move-up",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveUp,
    onClick: props.onReorderClick(props.index, props.index - 1)
  }), (props.hasMoveUp || props.hasMoveDown) && React.createElement(IconButton, {
    icon: "arrow-down",
    className: "array-item-move-down",
    "aria-label": "Move down",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly || !props.hasMoveDown,
    onClick: props.onReorderClick(props.index, props.index + 1)
  }), props.hasRemove && React.createElement(IconButton, {
    type: "danger",
    icon: "remove",
    "aria-label": "Remove",
    className: "array-item-remove",
    tabIndex: "-1",
    style: btnStyle,
    disabled: props.disabled || props.readonly,
    onClick: props.onDropIndexClick(props.index)
  }))));
}

function DefaultFixedArrayFieldTemplate(props) {
  return React.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, React.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && React.createElement("div", {
    className: "field-description",
    key: "field-description-".concat(props.idSchema.$id)
  }, props.uiSchema["ui:description"] || props.schema.description), React.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(DefaultArrayItem)), props.canAdd && React.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function DefaultNormalArrayFieldTemplate(props) {
  return React.createElement("fieldset", {
    className: props.className,
    id: props.idSchema.$id
  }, React.createElement(ArrayFieldTitle, {
    key: "array-field-title-".concat(props.idSchema.$id),
    TitleField: props.TitleField,
    idSchema: props.idSchema,
    title: props.uiSchema["ui:title"] || props.title,
    required: props.required
  }), (props.uiSchema["ui:description"] || props.schema.description) && React.createElement(ArrayFieldDescription, {
    key: "array-field-description-".concat(props.idSchema.$id),
    DescriptionField: props.DescriptionField,
    idSchema: props.idSchema,
    description: props.uiSchema["ui:description"] || props.schema.description
  }), React.createElement("div", {
    className: "row array-item-list",
    key: "array-item-list-".concat(props.idSchema.$id)
  }, props.items && props.items.map(function (p) {
    return DefaultArrayItem(p);
  })), props.canAdd && React.createElement(AddButton, {
    className: "array-item-add",
    onClick: props.onAddClick,
    disabled: props.disabled || props.readonly
  }));
}

function generateRowId() {
  return nanoid();
}

function generateKeyedFormData(formData) {
  return !Array.isArray(formData) ? [] : formData.map(function (item) {
    return {
      key: generateRowId(),
      item: item
    };
  });
}

function keyedToPlainFormData(keyedFormData) {
  return keyedFormData.map(function (keyedItem) {
    return keyedItem.item;
  });
}

var ArrayField =
/*#__PURE__*/
function (_Component) {
  _inherits(ArrayField, _Component);

  function ArrayField(props) {
    var _this;

    _classCallCheck(this, ArrayField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ArrayField).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "_getNewFormDataRow", function () {
      var _this$props = _this.props,
          schema = _this$props.schema,
          _this$props$registry = _this$props.registry,
          registry = _this$props$registry === void 0 ? getDefaultRegistry() : _this$props$registry;
      var rootSchema = registry.rootSchema;
      var itemSchema = schema.items;

      if (isFixedItems(schema) && allowAdditionalItems(schema)) {
        itemSchema = schema.additionalItems;
      }

      return getDefaultFormState(itemSchema, undefined, rootSchema);
    });

    _defineProperty(_assertThisInitialized(_this), "onAddClick", function (event) {
      if (event) {
        event.preventDefault();
      }

      var onChange = _this.props.onChange;
      var newKeyedFormDataRow = {
        key: generateRowId(),
        item: _this._getNewFormDataRow()
      };
      var newKeyedFormData = [].concat(_toConsumableArray(_this.state.keyedFormData), [newKeyedFormDataRow]);

      _this.setState({
        keyedFormData: newKeyedFormData,
        updatedKeyedFormData: true
      }, function () {
        return onChange(keyedToPlainFormData(newKeyedFormData));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAddIndexClick", function (index) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        var onChange = _this.props.onChange;
        var newKeyedFormDataRow = {
          key: generateRowId(),
          item: _this._getNewFormDataRow()
        };

        var newKeyedFormData = _toConsumableArray(_this.state.keyedFormData);

        newKeyedFormData.splice(index, 0, newKeyedFormDataRow);

        _this.setState({
          keyedFormData: newKeyedFormData,
          updatedKeyedFormData: true
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData));
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onDropIndexClick", function (index) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        var onChange = _this.props.onChange;
        var keyedFormData = _this.state.keyedFormData; // refs #195: revalidate to ensure properly reindexing errors

        var newErrorSchema;

        if (_this.props.errorSchema) {
          newErrorSchema = {};
          var errorSchema = _this.props.errorSchema;

          for (var i in errorSchema) {
            i = parseInt(i);

            if (i < index) {
              newErrorSchema[i] = errorSchema[i];
            } else if (i > index) {
              newErrorSchema[i - 1] = errorSchema[i];
            }
          }
        }

        var newKeyedFormData = keyedFormData.filter(function (_, i) {
          return i !== index;
        });

        _this.setState({
          keyedFormData: newKeyedFormData,
          updatedKeyedFormData: true
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onReorderClick", function (index, newIndex) {
      return function (event) {
        if (event) {
          event.preventDefault();
          event.target.blur();
        }

        var onChange = _this.props.onChange;
        var newErrorSchema;

        if (_this.props.errorSchema) {
          newErrorSchema = {};
          var errorSchema = _this.props.errorSchema;

          for (var i in errorSchema) {
            if (i == index) {
              newErrorSchema[newIndex] = errorSchema[index];
            } else if (i == newIndex) {
              newErrorSchema[index] = errorSchema[newIndex];
            } else {
              newErrorSchema[i] = errorSchema[i];
            }
          }
        }

        var keyedFormData = _this.state.keyedFormData;

        function reOrderArray() {
          // Copy item
          var _newKeyedFormData = keyedFormData.slice(); // Moves item from index to newIndex


          _newKeyedFormData.splice(index, 1);

          _newKeyedFormData.splice(newIndex, 0, keyedFormData[index]);

          return _newKeyedFormData;
        }

        var newKeyedFormData = reOrderArray();

        _this.setState({
          keyedFormData: newKeyedFormData
        }, function () {
          return onChange(keyedToPlainFormData(newKeyedFormData), newErrorSchema);
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeForIndex", function (index) {
      return function (value, errorSchema) {
        var _this$props2 = _this.props,
            formData = _this$props2.formData,
            onChange = _this$props2.onChange;
        var newFormData = formData.map(function (item, i) {
          // We need to treat undefined items as nulls to have validation.
          // See https://github.com/tdegrunt/jsonschema/issues/206
          var jsonValue = typeof value === "undefined" ? null : value;
          return index === i ? jsonValue : item;
        });
        onChange(newFormData, errorSchema && _this.props.errorSchema && _objectSpread({}, _this.props.errorSchema, _defineProperty({}, index, errorSchema)));
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectChange", function (value) {
      _this.props.onChange(value);
    });

    var _formData = props.formData;

    var _keyedFormData = generateKeyedFormData(_formData);

    _this.state = {
      keyedFormData: _keyedFormData,
      updatedKeyedFormData: false
    };
    return _this;
  }

  _createClass(ArrayField, [{
    key: "isItemRequired",
    value: function isItemRequired(itemSchema) {
      if (Array.isArray(itemSchema.type)) {
        // While we don't yet support composite/nullable jsonschema types, it's
        // future-proof to check for requirement against these.
        return !includes(itemSchema.type, "null");
      } // All non-null array item types are inherently required by design


      return itemSchema.type !== "null";
    }
  }, {
    key: "canAddItem",
    value: function canAddItem(formItems) {
      var _this$props3 = this.props,
          schema = _this$props3.schema,
          uiSchema = _this$props3.uiSchema;

      var _getUiOptions = getUiOptions(uiSchema),
          addable = _getUiOptions.addable;

      if (addable !== false) {
        // if ui:options.addable was not explicitly set to false, we can add
        // another item if we have not exceeded maxItems yet
        if (schema.maxItems !== undefined) {
          addable = formItems.length < schema.maxItems;
        } else {
          addable = true;
        }
      }

      return addable;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          schema = _this$props4.schema,
          uiSchema = _this$props4.uiSchema,
          idSchema = _this$props4.idSchema,
          _this$props4$registry = _this$props4.registry,
          registry = _this$props4$registry === void 0 ? getDefaultRegistry() : _this$props4$registry;
      var rootSchema = registry.rootSchema;

      if (!schema.hasOwnProperty("items")) {
        var fields = registry.fields;
        var UnsupportedField = fields.UnsupportedField;
        return React.createElement(UnsupportedField, {
          schema: schema,
          idSchema: idSchema,
          reason: "Missing items definition"
        });
      }

      if (isFixedItems(schema)) {
        return this.renderFixedArray();
      }

      if (isFilesArray(schema, uiSchema, rootSchema)) {
        return this.renderFiles();
      }

      if (isMultiSelect(schema, rootSchema)) {
        return this.renderMultiSelect();
      }

      return this.renderNormalArray();
    }
  }, {
    key: "renderNormalArray",
    value: function renderNormalArray() {
      var _this2 = this;

      var _this$props5 = this.props,
          schema = _this$props5.schema,
          uiSchema = _this$props5.uiSchema,
          errorSchema = _this$props5.errorSchema,
          idSchema = _this$props5.idSchema,
          name = _this$props5.name,
          required = _this$props5.required,
          disabled = _this$props5.disabled,
          readonly = _this$props5.readonly,
          autofocus = _this$props5.autofocus,
          _this$props5$registry = _this$props5.registry,
          registry = _this$props5$registry === void 0 ? getDefaultRegistry() : _this$props5$registry,
          onBlur = _this$props5.onBlur,
          onFocus = _this$props5.onFocus,
          idPrefix = _this$props5.idPrefix,
          rawErrors = _this$props5.rawErrors;
      var title = schema.title === undefined ? name : schema.title;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;
      var itemsSchema = retrieveSchema(schema.items, rootSchema);
      var formData = keyedToPlainFormData(this.state.keyedFormData);
      var arrayProps = {
        canAdd: this.canAddItem(formData),
        items: this.state.keyedFormData.map(function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var itemSchema = retrieveSchema(schema.items, rootSchema, item);
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, rootSchema, item, idPrefix);
          return _this2.renderArrayFieldItem({
            key: key,
            index: index,
            canMoveUp: index > 0,
            canMoveDown: index < formData.length - 1,
            itemSchema: itemSchema,
            itemIdSchema: itemIdSchema,
            itemErrorSchema: itemErrorSchema,
            itemData: item,
            itemUiSchema: uiSchema.items,
            autofocus: autofocus && index === 0,
            onBlur: onBlur,
            onFocus: onFocus
          });
        }),
        className: "field field-array field-array-of-".concat(itemsSchema.type),
        DescriptionField: DescriptionField,
        disabled: disabled,
        idSchema: idSchema,
        uiSchema: uiSchema,
        onAddClick: this.onAddClick,
        readonly: readonly,
        required: required,
        schema: schema,
        title: title,
        TitleField: TitleField,
        formContext: formContext,
        formData: formData,
        rawErrors: rawErrors,
        registry: registry
      }; // Check if a custom render function was passed in

      var Component = uiSchema["ui:ArrayFieldTemplate"] || ArrayFieldTemplate || DefaultNormalArrayFieldTemplate;
      return React.createElement(Component, arrayProps);
    }
  }, {
    key: "renderMultiSelect",
    value: function renderMultiSelect() {
      var _this$props6 = this.props,
          schema = _this$props6.schema,
          idSchema = _this$props6.idSchema,
          uiSchema = _this$props6.uiSchema,
          formData = _this$props6.formData,
          disabled = _this$props6.disabled,
          readonly = _this$props6.readonly,
          required = _this$props6.required,
          placeholder = _this$props6.placeholder,
          autofocus = _this$props6.autofocus,
          onBlur = _this$props6.onBlur,
          onFocus = _this$props6.onFocus,
          _this$props6$registry = _this$props6.registry,
          registry = _this$props6$registry === void 0 ? getDefaultRegistry() : _this$props6$registry,
          rawErrors = _this$props6.rawErrors,
          name = _this$props6.name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          rootSchema = registry.rootSchema,
          formContext = registry.formContext;
      var itemsSchema = retrieveSchema(schema.items, rootSchema, formData);
      var title = schema.title || name;
      var enumOptions = optionsList(itemsSchema);

      var _getUiOptions$enumOpt = _objectSpread({}, getUiOptions(uiSchema), {
        enumOptions: enumOptions
      }),
          _getUiOptions$enumOpt2 = _getUiOptions$enumOpt.widget,
          widget = _getUiOptions$enumOpt2 === void 0 ? "select" : _getUiOptions$enumOpt2,
          options = _objectWithoutProperties(_getUiOptions$enumOpt, ["widget"]);

      var Widget = getWidget(schema, widget, widgets);
      return React.createElement(Widget, {
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        options: options,
        schema: schema,
        registry: registry,
        value: items,
        disabled: disabled,
        readonly: readonly,
        required: required,
        label: title,
        placeholder: placeholder,
        formContext: formContext,
        autofocus: autofocus,
        rawErrors: rawErrors
      });
    }
  }, {
    key: "renderFiles",
    value: function renderFiles() {
      var _this$props7 = this.props,
          schema = _this$props7.schema,
          uiSchema = _this$props7.uiSchema,
          idSchema = _this$props7.idSchema,
          name = _this$props7.name,
          disabled = _this$props7.disabled,
          readonly = _this$props7.readonly,
          autofocus = _this$props7.autofocus,
          onBlur = _this$props7.onBlur,
          onFocus = _this$props7.onFocus,
          _this$props7$registry = _this$props7.registry,
          registry = _this$props7$registry === void 0 ? getDefaultRegistry() : _this$props7$registry,
          rawErrors = _this$props7.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var widgets = registry.widgets,
          formContext = registry.formContext;

      var _getUiOptions2 = getUiOptions(uiSchema),
          _getUiOptions2$widget = _getUiOptions2.widget,
          widget = _getUiOptions2$widget === void 0 ? "files" : _getUiOptions2$widget,
          options = _objectWithoutProperties(_getUiOptions2, ["widget"]);

      var Widget = getWidget(schema, widget, widgets);
      return React.createElement(Widget, {
        options: options,
        id: idSchema && idSchema.$id,
        multiple: true,
        onChange: this.onSelectChange,
        onBlur: onBlur,
        onFocus: onFocus,
        schema: schema,
        title: title,
        value: items,
        disabled: disabled,
        readonly: readonly,
        formContext: formContext,
        autofocus: autofocus,
        rawErrors: rawErrors
      });
    }
  }, {
    key: "renderFixedArray",
    value: function renderFixedArray() {
      var _this3 = this;

      var _this$props8 = this.props,
          schema = _this$props8.schema,
          uiSchema = _this$props8.uiSchema,
          formData = _this$props8.formData,
          errorSchema = _this$props8.errorSchema,
          idPrefix = _this$props8.idPrefix,
          idSchema = _this$props8.idSchema,
          name = _this$props8.name,
          required = _this$props8.required,
          disabled = _this$props8.disabled,
          readonly = _this$props8.readonly,
          autofocus = _this$props8.autofocus,
          _this$props8$registry = _this$props8.registry,
          registry = _this$props8$registry === void 0 ? getDefaultRegistry() : _this$props8$registry,
          onBlur = _this$props8.onBlur,
          onFocus = _this$props8.onFocus,
          rawErrors = _this$props8.rawErrors;
      var title = schema.title || name;
      var items = this.props.formData;
      var ArrayFieldTemplate = registry.ArrayFieldTemplate,
          rootSchema = registry.rootSchema,
          fields = registry.fields,
          formContext = registry.formContext;
      var TitleField = fields.TitleField;
      var itemSchemas = schema.items.map(function (item, index) {
        return retrieveSchema(item, rootSchema, formData[index]);
      });
      var additionalSchema = allowAdditionalItems(schema) ? retrieveSchema(schema.additionalItems, rootSchema, formData) : null;

      if (!items || items.length < itemSchemas.length) {
        // to make sure at least all fixed items are generated
        items = items || [];
        items = items.concat(new Array(itemSchemas.length - items.length));
      } // These are the props passed into the render function


      var arrayProps = {
        canAdd: this.canAddItem(items) && additionalSchema,
        className: "field field-array field-array-fixed-items",
        disabled: disabled,
        idSchema: idSchema,
        formData: formData,
        items: this.state.keyedFormData.map(function (keyedItem, index) {
          var key = keyedItem.key,
              item = keyedItem.item;
          var additional = index >= itemSchemas.length;
          var itemSchema = additional ? retrieveSchema(schema.additionalItems, rootSchema, item) : itemSchemas[index];
          var itemIdPrefix = idSchema.$id + "_" + index;
          var itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, rootSchema, item, idPrefix);
          var itemUiSchema = additional ? uiSchema.additionalItems || {} : Array.isArray(uiSchema.items) ? uiSchema.items[index] : uiSchema.items || {};
          var itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
          return _this3.renderArrayFieldItem({
            key: key,
            index: index,
            canRemove: additional,
            canMoveUp: index >= itemSchemas.length + 1,
            canMoveDown: additional && index < items.length - 1,
            itemSchema: itemSchema,
            itemData: item,
            itemUiSchema: itemUiSchema,
            itemIdSchema: itemIdSchema,
            itemErrorSchema: itemErrorSchema,
            autofocus: autofocus && index === 0,
            onBlur: onBlur,
            onFocus: onFocus
          });
        }),
        onAddClick: this.onAddClick,
        readonly: readonly,
        required: required,
        schema: schema,
        uiSchema: uiSchema,
        title: title,
        TitleField: TitleField,
        formContext: formContext,
        rawErrors: rawErrors
      }; // Check if a custom template template was passed in

      var Template = uiSchema["ui:ArrayFieldTemplate"] || ArrayFieldTemplate || DefaultFixedArrayFieldTemplate;
      return React.createElement(Template, arrayProps);
    }
  }, {
    key: "renderArrayFieldItem",
    value: function renderArrayFieldItem(props) {
      var key = props.key,
          index = props.index,
          _props$canRemove = props.canRemove,
          canRemove = _props$canRemove === void 0 ? true : _props$canRemove,
          _props$canMoveUp = props.canMoveUp,
          canMoveUp = _props$canMoveUp === void 0 ? true : _props$canMoveUp,
          _props$canMoveDown = props.canMoveDown,
          canMoveDown = _props$canMoveDown === void 0 ? true : _props$canMoveDown,
          itemSchema = props.itemSchema,
          itemData = props.itemData,
          itemUiSchema = props.itemUiSchema,
          itemIdSchema = props.itemIdSchema,
          itemErrorSchema = props.itemErrorSchema,
          autofocus = props.autofocus,
          onBlur = props.onBlur,
          onFocus = props.onFocus,
          rawErrors = props.rawErrors;
      var _this$props9 = this.props,
          disabled = _this$props9.disabled,
          readonly = _this$props9.readonly,
          uiSchema = _this$props9.uiSchema,
          _this$props9$registry = _this$props9.registry,
          registry = _this$props9$registry === void 0 ? getDefaultRegistry() : _this$props9$registry;
      var SchemaField = registry.fields.SchemaField;

      var _orderable$removable$ = _objectSpread({
        orderable: true,
        removable: true
      }, uiSchema["ui:options"]),
          orderable = _orderable$removable$.orderable,
          removable = _orderable$removable$.removable;

      var has = {
        moveUp: orderable && canMoveUp,
        moveDown: orderable && canMoveDown,
        remove: removable && canRemove
      };
      has.toolbar = Object.keys(has).some(function (key) {
        return has[key];
      });
      return {
        children: React.createElement(SchemaField, {
          index: index,
          schema: itemSchema,
          uiSchema: itemUiSchema,
          formData: itemData,
          errorSchema: itemErrorSchema,
          idSchema: itemIdSchema,
          required: this.isItemRequired(itemSchema),
          onChange: this.onChangeForIndex(index),
          onBlur: onBlur,
          onFocus: onFocus,
          registry: this.props.registry,
          disabled: this.props.disabled,
          readonly: this.props.readonly,
          autofocus: autofocus,
          rawErrors: rawErrors
        }),
        className: "array-item",
        disabled: disabled,
        hasToolbar: has.toolbar,
        hasMoveUp: has.moveUp,
        hasMoveDown: has.moveDown,
        hasRemove: has.remove,
        index: index,
        key: key,
        onAddIndexClick: this.onAddIndexClick,
        onDropIndexClick: this.onDropIndexClick,
        onReorderClick: this.onReorderClick,
        readonly: readonly
      };
    }
  }, {
    key: "itemTitle",
    get: function get() {
      var schema = this.props.schema;
      return schema.items.title || schema.items.description || "Item";
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      // Don't call getDerivedStateFromProps if keyed formdata was just updated.
      if (prevState.updatedKeyedFormData) {
        return {
          updatedKeyedFormData: false
        };
      }

      var nextFormData = nextProps.formData || [];
      var previousKeyedFormData = prevState.keyedFormData || [];
      var newKeyedFormData = nextFormData.length === previousKeyedFormData.length ? previousKeyedFormData.map(function (previousKeyedFormDatum, index) {
        return {
          key: previousKeyedFormDatum.key,
          item: nextFormData[index]
        };
      }) : generateKeyedFormData(nextFormData);
      return {
        keyedFormData: newKeyedFormData
      };
    }
  }]);

  return ArrayField;
}(Component);

_defineProperty(ArrayField, "defaultProps", {
  uiSchema: {},
  formData: [],
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
});

if (process.env.NODE_ENV !== "production") {
  ArrayField.propTypes = types.fieldProps;
}

export default ArrayField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpZWxkcy9BcnJheUZpZWxkLmpzIl0sIm5hbWVzIjpbIkFkZEJ1dHRvbiIsIkljb25CdXR0b24iLCJSZWFjdCIsIkNvbXBvbmVudCIsImluY2x1ZGVzIiwidHlwZXMiLCJnZXRXaWRnZXQiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwiZ2V0VWlPcHRpb25zIiwiaXNNdWx0aVNlbGVjdCIsImlzRmlsZXNBcnJheSIsImlzRml4ZWRJdGVtcyIsImFsbG93QWRkaXRpb25hbEl0ZW1zIiwib3B0aW9uc0xpc3QiLCJyZXRyaWV2ZVNjaGVtYSIsInRvSWRTY2hlbWEiLCJnZXREZWZhdWx0UmVnaXN0cnkiLCJuYW5vaWQiLCJBcnJheUZpZWxkVGl0bGUiLCJUaXRsZUZpZWxkIiwiaWRTY2hlbWEiLCJ0aXRsZSIsInJlcXVpcmVkIiwiaWQiLCIkaWQiLCJBcnJheUZpZWxkRGVzY3JpcHRpb24iLCJEZXNjcmlwdGlvbkZpZWxkIiwiZGVzY3JpcHRpb24iLCJEZWZhdWx0QXJyYXlJdGVtIiwicHJvcHMiLCJidG5TdHlsZSIsImZsZXgiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImZvbnRXZWlnaHQiLCJrZXkiLCJjbGFzc05hbWUiLCJoYXNUb29sYmFyIiwiY2hpbGRyZW4iLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJoYXNNb3ZlVXAiLCJoYXNNb3ZlRG93biIsImRpc2FibGVkIiwicmVhZG9ubHkiLCJvblJlb3JkZXJDbGljayIsImluZGV4IiwiaGFzUmVtb3ZlIiwib25Ecm9wSW5kZXhDbGljayIsIkRlZmF1bHRGaXhlZEFycmF5RmllbGRUZW1wbGF0ZSIsInVpU2NoZW1hIiwic2NoZW1hIiwiaXRlbXMiLCJtYXAiLCJjYW5BZGQiLCJvbkFkZENsaWNrIiwiRGVmYXVsdE5vcm1hbEFycmF5RmllbGRUZW1wbGF0ZSIsInAiLCJnZW5lcmF0ZVJvd0lkIiwiZ2VuZXJhdGVLZXllZEZvcm1EYXRhIiwiZm9ybURhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJpdGVtIiwia2V5ZWRUb1BsYWluRm9ybURhdGEiLCJrZXllZEZvcm1EYXRhIiwia2V5ZWRJdGVtIiwiQXJyYXlGaWVsZCIsInJlZ2lzdHJ5Iiwicm9vdFNjaGVtYSIsIml0ZW1TY2hlbWEiLCJhZGRpdGlvbmFsSXRlbXMiLCJ1bmRlZmluZWQiLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwib25DaGFuZ2UiLCJuZXdLZXllZEZvcm1EYXRhUm93IiwiX2dldE5ld0Zvcm1EYXRhUm93IiwibmV3S2V5ZWRGb3JtRGF0YSIsInN0YXRlIiwic2V0U3RhdGUiLCJ1cGRhdGVkS2V5ZWRGb3JtRGF0YSIsInNwbGljZSIsIm5ld0Vycm9yU2NoZW1hIiwiZXJyb3JTY2hlbWEiLCJpIiwicGFyc2VJbnQiLCJmaWx0ZXIiLCJfIiwibmV3SW5kZXgiLCJ0YXJnZXQiLCJibHVyIiwicmVPcmRlckFycmF5IiwiX25ld0tleWVkRm9ybURhdGEiLCJzbGljZSIsInZhbHVlIiwibmV3Rm9ybURhdGEiLCJqc29uVmFsdWUiLCJ0eXBlIiwiZm9ybUl0ZW1zIiwiYWRkYWJsZSIsIm1heEl0ZW1zIiwibGVuZ3RoIiwiaGFzT3duUHJvcGVydHkiLCJmaWVsZHMiLCJVbnN1cHBvcnRlZEZpZWxkIiwicmVuZGVyRml4ZWRBcnJheSIsInJlbmRlckZpbGVzIiwicmVuZGVyTXVsdGlTZWxlY3QiLCJyZW5kZXJOb3JtYWxBcnJheSIsIm5hbWUiLCJhdXRvZm9jdXMiLCJvbkJsdXIiLCJvbkZvY3VzIiwiaWRQcmVmaXgiLCJyYXdFcnJvcnMiLCJBcnJheUZpZWxkVGVtcGxhdGUiLCJmb3JtQ29udGV4dCIsIml0ZW1zU2NoZW1hIiwiYXJyYXlQcm9wcyIsImNhbkFkZEl0ZW0iLCJpdGVtRXJyb3JTY2hlbWEiLCJpdGVtSWRQcmVmaXgiLCJpdGVtSWRTY2hlbWEiLCJyZW5kZXJBcnJheUZpZWxkSXRlbSIsImNhbk1vdmVVcCIsImNhbk1vdmVEb3duIiwiaXRlbURhdGEiLCJpdGVtVWlTY2hlbWEiLCJwbGFjZWhvbGRlciIsIndpZGdldHMiLCJlbnVtT3B0aW9ucyIsIndpZGdldCIsIm9wdGlvbnMiLCJXaWRnZXQiLCJvblNlbGVjdENoYW5nZSIsIml0ZW1TY2hlbWFzIiwiYWRkaXRpb25hbFNjaGVtYSIsImNvbmNhdCIsImFkZGl0aW9uYWwiLCJjYW5SZW1vdmUiLCJUZW1wbGF0ZSIsIlNjaGVtYUZpZWxkIiwib3JkZXJhYmxlIiwicmVtb3ZhYmxlIiwiaGFzIiwibW92ZVVwIiwibW92ZURvd24iLCJyZW1vdmUiLCJ0b29sYmFyIiwiT2JqZWN0Iiwia2V5cyIsInNvbWUiLCJpc0l0ZW1SZXF1aXJlZCIsIm9uQ2hhbmdlRm9ySW5kZXgiLCJvbkFkZEluZGV4Q2xpY2siLCJuZXh0UHJvcHMiLCJwcmV2U3RhdGUiLCJuZXh0Rm9ybURhdGEiLCJwcmV2aW91c0tleWVkRm9ybURhdGEiLCJwcmV2aW91c0tleWVkRm9ybURhdHVtIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwicHJvcFR5cGVzIiwiZmllbGRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLFNBQVAsTUFBc0IsY0FBdEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGVBQXZCO0FBQ0EsT0FBT0MsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLGdDQUFyQjtBQUNBLE9BQU8sS0FBS0MsS0FBWixNQUF1QixhQUF2QjtBQUVBLFNBQ0VDLFNBREYsRUFFRUMsbUJBRkYsRUFHRUMsWUFIRixFQUlFQyxhQUpGLEVBS0VDLFlBTEYsRUFNRUMsWUFORixFQU9FQyxvQkFQRixFQVFFQyxXQVJGLEVBU0VDLGNBVEYsRUFVRUMsVUFWRixFQVdFQyxrQkFYRixRQVlPLGFBWlA7QUFhQSxTQUFTQyxNQUFULFFBQXVCLFFBQXZCOztBQUVBLFNBQVNDLGVBQVQsT0FBb0U7QUFBQSxNQUF6Q0MsVUFBeUMsUUFBekNBLFVBQXlDO0FBQUEsTUFBN0JD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Q0EsVUFBTWEsZ0JBQWdCLEdBQ3BCZ0YsWUFBWSxDQUFDeEQsTUFBYixLQUF3QnlELHFCQUFxQixDQUFDekQsTUFBOUMsR0FDSXlELHFCQUFxQixDQUFDMUcsR0FBdEIsQ0FBMEIsVUFBQzJHLHNCQUFELEVBQXlCbEgsS0FBekIsRUFBbUM7QUFDM0QsZUFBTztBQUNMWCxVQUFBQSxHQUFHLEVBQUU2SCxzQkFBc0IsQ0FBQzdILEdBRHZCO0FBRUw0QixVQUFBQSxJQUFJLEVBQUUrRixZQUFZLENBQUNoSCxLQUFEO0FBRmIsU0FBUDtBQUlELE9BTEQsQ0FESixHQU9JYSxxQkFBcUIsQ0FBQ21HLFlBQUQsQ0FSM0I7QUFTQSxhQUFPO0FBQ0w3RixRQUFBQSxhQUFhLEVBQUVhO0FBRFYsT0FBUDtBQUdEOzs7O0VBMUNzQjNFLFM7O2dCQUFuQmdFLFUsa0JBQ2tCO0FBQ3BCakIsRUFBQUEsUUFBUSxFQUFFLEVBRFU7QUFFcEJVLEVBQUFBLFFBQVEsRUFBRSxFQUZVO0FBR3BCeEMsRUFBQUEsUUFBUSxFQUFFLEVBSFU7QUFJcEJFLEVBQUFBLFFBQVEsRUFBRSxLQUpVO0FBS3BCcUIsRUFBQUEsUUFBUSxFQUFFLEtBTFU7QUFNcEJDLEVBQUFBLFFBQVEsRUFBRSxLQU5VO0FBT3BCbUUsRUFBQUEsU0FBUyxFQUFFO0FBUFMsQzs7QUFrbEJ4QixJQUFJa0QsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekNoRyxFQUFBQSxVQUFVLENBQUNpRyxTQUFYLEdBQXVCL0osS0FBSyxDQUFDZ0ssVUFBN0I7QUFDRDs7QUFFRCxlQUFlbEcsVUFBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBZGRCdXR0b24gZnJvbSBcIi4uL0FkZEJ1dHRvblwiO1xuaW1wb3J0IEljb25CdXR0b24gZnJvbSBcIi4uL0ljb25CdXR0b25cIjtcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBpbmNsdWRlcyBmcm9tIFwiY29yZS1qcy1wdXJlL2VzL2FycmF5L2luY2x1ZGVzXCI7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuaW1wb3J0IHtcbiAgZ2V0V2lkZ2V0LFxuICBnZXREZWZhdWx0Rm9ybVN0YXRlLFxuICBnZXRVaU9wdGlvbnMsXG4gIGlzTXVsdGlTZWxlY3QsXG4gIGlzRmlsZXNBcnJheSxcbiAgaXNGaXhlZEl0ZW1zLFxuICBhbGxvd0FkZGl0aW9uYWxJdGVtcyxcbiAgb3B0aW9uc0xpc3QsXG4gIHJldHJpZXZlU2NoZW1hLFxuICB0b0lkU2NoZW1hLFxuICBnZXREZWZhdWx0UmVnaXN0cnksXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xuaW1wb3J0IHsgbmFub2lkIH0gZnJvbSBcIm5hbm9pZFwiO1xuXG5mdW5jdGlvbiBBcnJheUZpZWxkVGl0bGUoeyBUaXRsZUZpZWxkLCBpZFNjaGVtYSwgdGl0bGUsIHJlcXVpcmVkIH0pIHtcbiAgaWYgKCF0aXRsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGNvbnN0IGlkID0gYCR7aWRTY2hlbWEuJGlkfV9fdGl0bGVgO1xuICByZXR1cm4gPFRpdGxlRmllbGQgaWQ9e2lkfSB0aXRsZT17dGl0bGV9IHJlcXVpcmVkPXtyZXF1aXJlZH0gLz47XG59XG5cbmZ1bmN0aW9uIEFycmF5RmllbGREZXNjcmlwdGlvbih7IERlc2NyaXB0aW9uRmllbGQsIGlkU2NoZW1hLCBkZXNjcmlwdGlvbiB9KSB7XG4gIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBpZCA9IGAke2lkU2NoZW1hLiRpZH1fX2Rlc2NyaXB0aW9uYDtcbiAgcmV0dXJuIDxEZXNjcmlwdGlvbkZpZWxkIGlkPXtpZH0gZGVzY3JpcHRpb249e2Rlc2NyaXB0aW9ufSAvPjtcbn1cblxuLy8gVXNlZCBpbiB0aGUgdHdvIHRlbXBsYXRlc1xuZnVuY3Rpb24gRGVmYXVsdEFycmF5SXRlbShwcm9wcykge1xuICBjb25zdCBidG5TdHlsZSA9IHtcbiAgICBmbGV4OiAxLFxuICAgIHBhZGRpbmdMZWZ0OiA2LFxuICAgIHBhZGRpbmdSaWdodDogNixcbiAgICBmb250V2VpZ2h0OiBcImJvbGRcIixcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGtleT17cHJvcHMua2V5fSBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17cHJvcHMuaGFzVG9vbGJhciA/IFwiY29sLXhzLTlcIiA6IFwiY29sLXhzLTEyXCJ9PlxuICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cblxuICAgICAge3Byb3BzLmhhc1Rvb2xiYXIgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0zIGFycmF5LWl0ZW0tdG9vbGJveFwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1ncm91cFwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwic3BhY2UtYXJvdW5kXCIsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgIHsocHJvcHMuaGFzTW92ZVVwIHx8IHByb3BzLmhhc01vdmVEb3duKSAmJiAoXG4gICAgICAgICAgICAgIDxJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgaWNvbj1cImFycm93LXVwXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiTW92ZSB1cFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXJyYXktaXRlbS1tb3ZlLXVwXCJcbiAgICAgICAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnRuU3R5bGV9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5IHx8ICFwcm9wcy5oYXNNb3ZlVXB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17cHJvcHMub25SZW9yZGVyQ2xpY2socHJvcHMuaW5kZXgsIHByb3BzLmluZGV4IC0gMSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7KHByb3BzLmhhc01vdmVVcCB8fCBwcm9wcy5oYXNNb3ZlRG93bikgJiYgKFxuICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGljb249XCJhcnJvdy1kb3duXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhcnJheS1pdGVtLW1vdmUtZG93blwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk1vdmUgZG93blwiXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e2J0blN0eWxlfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtcbiAgICAgICAgICAgICAgICAgIHByb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5IHx8ICFwcm9wcy5oYXNNb3ZlRG93blxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vblJlb3JkZXJDbGljayhwcm9wcy5pbmRleCwgcHJvcHMuaW5kZXggKyAxKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHtwcm9wcy5oYXNSZW1vdmUgJiYgKFxuICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJkYW5nZXJcIlxuICAgICAgICAgICAgICAgIGljb249XCJyZW1vdmVcIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJSZW1vdmVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tcmVtb3ZlXCJcbiAgICAgICAgICAgICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17YnRuU3R5bGV9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Byb3BzLmRpc2FibGVkIHx8IHByb3BzLnJlYWRvbmx5fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uRHJvcEluZGV4Q2xpY2socHJvcHMuaW5kZXgpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBEZWZhdWx0Rml4ZWRBcnJheUZpZWxkVGVtcGxhdGUocHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8ZmllbGRzZXQgY2xhc3NOYW1lPXtwcm9wcy5jbGFzc05hbWV9IGlkPXtwcm9wcy5pZFNjaGVtYS4kaWR9PlxuICAgICAgPEFycmF5RmllbGRUaXRsZVxuICAgICAgICBrZXk9e2BhcnJheS1maWVsZC10aXRsZS0ke3Byb3BzLmlkU2NoZW1hLiRpZH1gfVxuICAgICAgICBUaXRsZUZpZWxkPXtwcm9wcy5UaXRsZUZpZWxkfVxuICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XG4gICAgICAgIHRpdGxlPXtwcm9wcy51aVNjaGVtYVtcInVpOnRpdGxlXCJdIHx8IHByb3BzLnRpdGxlfVxuICAgICAgICByZXF1aXJlZD17cHJvcHMucmVxdWlyZWR9XG4gICAgICAvPlxuXG4gICAgICB7KHByb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9uKSAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJmaWVsZC1kZXNjcmlwdGlvblwiXG4gICAgICAgICAga2V5PXtgZmllbGQtZGVzY3JpcHRpb24tJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH0+XG4gICAgICAgICAge3Byb3BzLnVpU2NoZW1hW1widWk6ZGVzY3JpcHRpb25cIl0gfHwgcHJvcHMuc2NoZW1hLmRlc2NyaXB0aW9ufVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicm93IGFycmF5LWl0ZW0tbGlzdFwiXG4gICAgICAgIGtleT17YGFycmF5LWl0ZW0tbGlzdC0ke3Byb3BzLmlkU2NoZW1hLiRpZH1gfT5cbiAgICAgICAge3Byb3BzLml0ZW1zICYmIHByb3BzLml0ZW1zLm1hcChEZWZhdWx0QXJyYXlJdGVtKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cHJvcHMuY2FuQWRkICYmIChcbiAgICAgICAgPEFkZEJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tYWRkXCJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrfVxuICAgICAgICAgIGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5yZWFkb25seX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9maWVsZHNldD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGVmYXVsdE5vcm1hbEFycmF5RmllbGRUZW1wbGF0ZShwcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxmaWVsZHNldCBjbGFzc05hbWU9e3Byb3BzLmNsYXNzTmFtZX0gaWQ9e3Byb3BzLmlkU2NoZW1hLiRpZH0+XG4gICAgICA8QXJyYXlGaWVsZFRpdGxlXG4gICAgICAgIGtleT17YGFycmF5LWZpZWxkLXRpdGxlLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9XG4gICAgICAgIFRpdGxlRmllbGQ9e3Byb3BzLlRpdGxlRmllbGR9XG4gICAgICAgIGlkU2NoZW1hPXtwcm9wcy5pZFNjaGVtYX1cbiAgICAgICAgdGl0bGU9e3Byb3BzLnVpU2NoZW1hW1widWk6dGl0bGVcIl0gfHwgcHJvcHMudGl0bGV9XG4gICAgICAgIHJlcXVpcmVkPXtwcm9wcy5yZXF1aXJlZH1cbiAgICAgIC8+XG5cbiAgICAgIHsocHJvcHMudWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fCBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb24pICYmIChcbiAgICAgICAgPEFycmF5RmllbGREZXNjcmlwdGlvblxuICAgICAgICAgIGtleT17YGFycmF5LWZpZWxkLWRlc2NyaXB0aW9uLSR7cHJvcHMuaWRTY2hlbWEuJGlkfWB9XG4gICAgICAgICAgRGVzY3JpcHRpb25GaWVsZD17cHJvcHMuRGVzY3JpcHRpb25GaWVsZH1cbiAgICAgICAgICBpZFNjaGVtYT17cHJvcHMuaWRTY2hlbWF9XG4gICAgICAgICAgZGVzY3JpcHRpb249e1xuICAgICAgICAgICAgcHJvcHMudWlTY2hlbWFbXCJ1aTpkZXNjcmlwdGlvblwiXSB8fCBwcm9wcy5zY2hlbWEuZGVzY3JpcHRpb25cbiAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJvdyBhcnJheS1pdGVtLWxpc3RcIlxuICAgICAgICBrZXk9e2BhcnJheS1pdGVtLWxpc3QtJHtwcm9wcy5pZFNjaGVtYS4kaWR9YH0+XG4gICAgICAgIHtwcm9wcy5pdGVtcyAmJiBwcm9wcy5pdGVtcy5tYXAocCA9PiBEZWZhdWx0QXJyYXlJdGVtKHApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cHJvcHMuY2FuQWRkICYmIChcbiAgICAgICAgPEFkZEJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImFycmF5LWl0ZW0tYWRkXCJcbiAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkFkZENsaWNrfVxuICAgICAgICAgIGRpc2FibGVkPXtwcm9wcy5kaXNhYmxlZCB8fCBwcm9wcy5yZWFkb25seX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9maWVsZHNldD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSb3dJZCgpIHtcbiAgcmV0dXJuIG5hbm9pZCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUtleWVkRm9ybURhdGEoZm9ybURhdGEpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KGZvcm1EYXRhKVxuICAgID8gW11cbiAgICA6IGZvcm1EYXRhLm1hcChpdGVtID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBrZXk6IGdlbmVyYXRlUm93SWQoKSxcbiAgICAgICAgICBpdGVtLFxuICAgICAgICB9O1xuICAgICAgfSk7XG59XG5cbmZ1bmN0aW9uIGtleWVkVG9QbGFpbkZvcm1EYXRhKGtleWVkRm9ybURhdGEpIHtcbiAgcmV0dXJuIGtleWVkRm9ybURhdGEubWFwKGtleWVkSXRlbSA9PiBrZXllZEl0ZW0uaXRlbSk7XG59XG5cbmNsYXNzIEFycmF5RmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHVpU2NoZW1hOiB7fSxcbiAgICBmb3JtRGF0YTogW10sXG4gICAgaWRTY2hlbWE6IHt9LFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgcmVhZG9ubHk6IGZhbHNlLFxuICAgIGF1dG9mb2N1czogZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyBmb3JtRGF0YSB9ID0gcHJvcHM7XG4gICAgY29uc3Qga2V5ZWRGb3JtRGF0YSA9IGdlbmVyYXRlS2V5ZWRGb3JtRGF0YShmb3JtRGF0YSk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGtleWVkRm9ybURhdGEsXG4gICAgICB1cGRhdGVkS2V5ZWRGb3JtRGF0YTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMobmV4dFByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBEb24ndCBjYWxsIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyBpZiBrZXllZCBmb3JtZGF0YSB3YXMganVzdCB1cGRhdGVkLlxuICAgIGlmIChwcmV2U3RhdGUudXBkYXRlZEtleWVkRm9ybURhdGEpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IG5leHRGb3JtRGF0YSA9IG5leHRQcm9wcy5mb3JtRGF0YSB8fCBbXTtcbiAgICBjb25zdCBwcmV2aW91c0tleWVkRm9ybURhdGEgPSBwcmV2U3RhdGUua2V5ZWRGb3JtRGF0YSB8fCBbXTtcbiAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhID1cbiAgICAgIG5leHRGb3JtRGF0YS5sZW5ndGggPT09IHByZXZpb3VzS2V5ZWRGb3JtRGF0YS5sZW5ndGhcbiAgICAgICAgPyBwcmV2aW91c0tleWVkRm9ybURhdGEubWFwKChwcmV2aW91c0tleWVkRm9ybURhdHVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAga2V5OiBwcmV2aW91c0tleWVkRm9ybURhdHVtLmtleSxcbiAgICAgICAgICAgICAgaXRlbTogbmV4dEZvcm1EYXRhW2luZGV4XSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBnZW5lcmF0ZUtleWVkRm9ybURhdGEobmV4dEZvcm1EYXRhKTtcbiAgICByZXR1cm4ge1xuICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGl0ZW1UaXRsZSgpIHtcbiAgICBjb25zdCB7IHNjaGVtYSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gc2NoZW1hLml0ZW1zLnRpdGxlIHx8IHNjaGVtYS5pdGVtcy5kZXNjcmlwdGlvbiB8fCBcIkl0ZW1cIjtcbiAgfVxuXG4gIGlzSXRlbVJlcXVpcmVkKGl0ZW1TY2hlbWEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtU2NoZW1hLnR5cGUpKSB7XG4gICAgICAvLyBXaGlsZSB3ZSBkb24ndCB5ZXQgc3VwcG9ydCBjb21wb3NpdGUvbnVsbGFibGUganNvbnNjaGVtYSB0eXBlcywgaXQnc1xuICAgICAgLy8gZnV0dXJlLXByb29mIHRvIGNoZWNrIGZvciByZXF1aXJlbWVudCBhZ2FpbnN0IHRoZXNlLlxuICAgICAgcmV0dXJuICFpbmNsdWRlcyhpdGVtU2NoZW1hLnR5cGUsIFwibnVsbFwiKTtcbiAgICB9XG4gICAgLy8gQWxsIG5vbi1udWxsIGFycmF5IGl0ZW0gdHlwZXMgYXJlIGluaGVyZW50bHkgcmVxdWlyZWQgYnkgZGVzaWduXG4gICAgcmV0dXJuIGl0ZW1TY2hlbWEudHlwZSAhPT0gXCJudWxsXCI7XG4gIH1cblxuICBjYW5BZGRJdGVtKGZvcm1JdGVtcykge1xuICAgIGNvbnN0IHsgc2NoZW1hLCB1aVNjaGVtYSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgeyBhZGRhYmxlIH0gPSBnZXRVaU9wdGlvbnModWlTY2hlbWEpO1xuICAgIGlmIChhZGRhYmxlICE9PSBmYWxzZSkge1xuICAgICAgLy8gaWYgdWk6b3B0aW9ucy5hZGRhYmxlIHdhcyBub3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UsIHdlIGNhbiBhZGRcbiAgICAgIC8vIGFub3RoZXIgaXRlbSBpZiB3ZSBoYXZlIG5vdCBleGNlZWRlZCBtYXhJdGVtcyB5ZXRcbiAgICAgIGlmIChzY2hlbWEubWF4SXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhZGRhYmxlID0gZm9ybUl0ZW1zLmxlbmd0aCA8IHNjaGVtYS5tYXhJdGVtcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGFibGUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWRkYWJsZTtcbiAgfVxuXG4gIF9nZXROZXdGb3JtRGF0YVJvdyA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNjaGVtYSwgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHJlZ2lzdHJ5O1xuICAgIGxldCBpdGVtU2NoZW1hID0gc2NoZW1hLml0ZW1zO1xuICAgIGlmIChpc0ZpeGVkSXRlbXMoc2NoZW1hKSAmJiBhbGxvd0FkZGl0aW9uYWxJdGVtcyhzY2hlbWEpKSB7XG4gICAgICBpdGVtU2NoZW1hID0gc2NoZW1hLmFkZGl0aW9uYWxJdGVtcztcbiAgICB9XG4gICAgcmV0dXJuIGdldERlZmF1bHRGb3JtU3RhdGUoaXRlbVNjaGVtYSwgdW5kZWZpbmVkLCByb290U2NoZW1hKTtcbiAgfTtcblxuICBvbkFkZENsaWNrID0gZXZlbnQgPT4ge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGFSb3cgPSB7XG4gICAgICBrZXk6IGdlbmVyYXRlUm93SWQoKSxcbiAgICAgIGl0ZW06IHRoaXMuX2dldE5ld0Zvcm1EYXRhUm93KCksXG4gICAgfTtcbiAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhID0gWy4uLnRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YSwgbmV3S2V5ZWRGb3JtRGF0YVJvd107XG4gICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgIHtcbiAgICAgICAga2V5ZWRGb3JtRGF0YTogbmV3S2V5ZWRGb3JtRGF0YSxcbiAgICAgICAgdXBkYXRlZEtleWVkRm9ybURhdGE6IHRydWUsXG4gICAgICB9LFxuICAgICAgKCkgPT4gb25DaGFuZ2Uoa2V5ZWRUb1BsYWluRm9ybURhdGEobmV3S2V5ZWRGb3JtRGF0YSkpXG4gICAgKTtcbiAgfTtcblxuICBvbkFkZEluZGV4Q2xpY2sgPSBpbmRleCA9PiB7XG4gICAgcmV0dXJuIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG5ld0tleWVkRm9ybURhdGFSb3cgPSB7XG4gICAgICAgIGtleTogZ2VuZXJhdGVSb3dJZCgpLFxuICAgICAgICBpdGVtOiB0aGlzLl9nZXROZXdGb3JtRGF0YVJvdygpLFxuICAgICAgfTtcbiAgICAgIGxldCBuZXdLZXllZEZvcm1EYXRhID0gWy4uLnRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YV07XG4gICAgICBuZXdLZXllZEZvcm1EYXRhLnNwbGljZShpbmRleCwgMCwgbmV3S2V5ZWRGb3JtRGF0YVJvdyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBrZXllZEZvcm1EYXRhOiBuZXdLZXllZEZvcm1EYXRhLFxuICAgICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvbkNoYW5nZShrZXllZFRvUGxhaW5Gb3JtRGF0YShuZXdLZXllZEZvcm1EYXRhKSlcbiAgICAgICk7XG4gICAgfTtcbiAgfTtcblxuICBvbkRyb3BJbmRleENsaWNrID0gaW5kZXggPT4ge1xuICAgIHJldHVybiBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7IGtleWVkRm9ybURhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAvLyByZWZzICMxOTU6IHJldmFsaWRhdGUgdG8gZW5zdXJlIHByb3Blcmx5IHJlaW5kZXhpbmcgZXJyb3JzXG4gICAgICBsZXQgbmV3RXJyb3JTY2hlbWE7XG4gICAgICBpZiAodGhpcy5wcm9wcy5lcnJvclNjaGVtYSkge1xuICAgICAgICBuZXdFcnJvclNjaGVtYSA9IHt9O1xuICAgICAgICBjb25zdCBlcnJvclNjaGVtYSA9IHRoaXMucHJvcHMuZXJyb3JTY2hlbWE7XG4gICAgICAgIGZvciAobGV0IGkgaW4gZXJyb3JTY2hlbWEpIHtcbiAgICAgICAgICBpID0gcGFyc2VJbnQoaSk7XG4gICAgICAgICAgaWYgKGkgPCBpbmRleCkge1xuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWFbaV0gPSBlcnJvclNjaGVtYVtpXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGkgPiBpbmRleCkge1xuICAgICAgICAgICAgbmV3RXJyb3JTY2hlbWFbaSAtIDFdID0gZXJyb3JTY2hlbWFbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdLZXllZEZvcm1EYXRhID0ga2V5ZWRGb3JtRGF0YS5maWx0ZXIoKF8sIGkpID0+IGkgIT09IGluZGV4KTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBrZXllZEZvcm1EYXRhOiBuZXdLZXllZEZvcm1EYXRhLFxuICAgICAgICAgIHVwZGF0ZWRLZXllZEZvcm1EYXRhOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvbkNoYW5nZShrZXllZFRvUGxhaW5Gb3JtRGF0YShuZXdLZXllZEZvcm1EYXRhKSwgbmV3RXJyb3JTY2hlbWEpXG4gICAgICApO1xuICAgIH07XG4gIH07XG5cbiAgb25SZW9yZGVyQ2xpY2sgPSAoaW5kZXgsIG5ld0luZGV4KSA9PiB7XG4gICAgcmV0dXJuIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC50YXJnZXQuYmx1cigpO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGxldCBuZXdFcnJvclNjaGVtYTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmVycm9yU2NoZW1hKSB7XG4gICAgICAgIG5ld0Vycm9yU2NoZW1hID0ge307XG4gICAgICAgIGNvbnN0IGVycm9yU2NoZW1hID0gdGhpcy5wcm9wcy5lcnJvclNjaGVtYTtcbiAgICAgICAgZm9yIChsZXQgaSBpbiBlcnJvclNjaGVtYSkge1xuICAgICAgICAgIGlmIChpID09IGluZGV4KSB7XG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtuZXdJbmRleF0gPSBlcnJvclNjaGVtYVtpbmRleF07XG4gICAgICAgICAgfSBlbHNlIGlmIChpID09IG5ld0luZGV4KSB7XG4gICAgICAgICAgICBuZXdFcnJvclNjaGVtYVtpbmRleF0gPSBlcnJvclNjaGVtYVtuZXdJbmRleF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0Vycm9yU2NoZW1hW2ldID0gZXJyb3JTY2hlbWFbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsga2V5ZWRGb3JtRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGZ1bmN0aW9uIHJlT3JkZXJBcnJheSgpIHtcbiAgICAgICAgLy8gQ29weSBpdGVtXG4gICAgICAgIGxldCBfbmV3S2V5ZWRGb3JtRGF0YSA9IGtleWVkRm9ybURhdGEuc2xpY2UoKTtcblxuICAgICAgICAvLyBNb3ZlcyBpdGVtIGZyb20gaW5kZXggdG8gbmV3SW5kZXhcbiAgICAgICAgX25ld0tleWVkRm9ybURhdGEuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgX25ld0tleWVkRm9ybURhdGEuc3BsaWNlKG5ld0luZGV4LCAwLCBrZXllZEZvcm1EYXRhW2luZGV4XSk7XG5cbiAgICAgICAgcmV0dXJuIF9uZXdLZXllZEZvcm1EYXRhO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3S2V5ZWRGb3JtRGF0YSA9IHJlT3JkZXJBcnJheSgpO1xuICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAge1xuICAgICAgICAgIGtleWVkRm9ybURhdGE6IG5ld0tleWVkRm9ybURhdGEsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uQ2hhbmdlKGtleWVkVG9QbGFpbkZvcm1EYXRhKG5ld0tleWVkRm9ybURhdGEpLCBuZXdFcnJvclNjaGVtYSlcbiAgICAgICk7XG4gICAgfTtcbiAgfTtcblxuICBvbkNoYW5nZUZvckluZGV4ID0gaW5kZXggPT4ge1xuICAgIHJldHVybiAodmFsdWUsIGVycm9yU2NoZW1hKSA9PiB7XG4gICAgICBjb25zdCB7IGZvcm1EYXRhLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0gZm9ybURhdGEubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIC8vIFdlIG5lZWQgdG8gdHJlYXQgdW5kZWZpbmVkIGl0ZW1zIGFzIG51bGxzIHRvIGhhdmUgdmFsaWRhdGlvbi5cbiAgICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90ZGVncnVudC9qc29uc2NoZW1hL2lzc3Vlcy8yMDZcbiAgICAgICAgY29uc3QganNvblZhbHVlID0gdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IHZhbHVlO1xuICAgICAgICByZXR1cm4gaW5kZXggPT09IGkgPyBqc29uVmFsdWUgOiBpdGVtO1xuICAgICAgfSk7XG4gICAgICBvbkNoYW5nZShcbiAgICAgICAgbmV3Rm9ybURhdGEsXG4gICAgICAgIGVycm9yU2NoZW1hICYmXG4gICAgICAgICAgdGhpcy5wcm9wcy5lcnJvclNjaGVtYSAmJiB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmVycm9yU2NoZW1hLFxuICAgICAgICAgICAgW2luZGV4XTogZXJyb3JTY2hlbWEsXG4gICAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xuXG4gIG9uU2VsZWN0Q2hhbmdlID0gdmFsdWUgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY2hlbWEsXG4gICAgICB1aVNjaGVtYSxcbiAgICAgIGlkU2NoZW1hLFxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJvb3RTY2hlbWEgfSA9IHJlZ2lzdHJ5O1xuICAgIGlmICghc2NoZW1hLmhhc093blByb3BlcnR5KFwiaXRlbXNcIikpIHtcbiAgICAgIGNvbnN0IHsgZmllbGRzIH0gPSByZWdpc3RyeTtcbiAgICAgIGNvbnN0IHsgVW5zdXBwb3J0ZWRGaWVsZCB9ID0gZmllbGRzO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VW5zdXBwb3J0ZWRGaWVsZFxuICAgICAgICAgIHNjaGVtYT17c2NoZW1hfVxuICAgICAgICAgIGlkU2NoZW1hPXtpZFNjaGVtYX1cbiAgICAgICAgICByZWFzb249XCJNaXNzaW5nIGl0ZW1zIGRlZmluaXRpb25cIlxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJGaXhlZEFycmF5KCk7XG4gICAgfVxuICAgIGlmIChpc0ZpbGVzQXJyYXkoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlckZpbGVzKCk7XG4gICAgfVxuICAgIGlmIChpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlck11bHRpU2VsZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbmRlck5vcm1hbEFycmF5KCk7XG4gIH1cblxuICByZW5kZXJOb3JtYWxBcnJheSgpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY2hlbWEsXG4gICAgICB1aVNjaGVtYSxcbiAgICAgIGVycm9yU2NoZW1hLFxuICAgICAgaWRTY2hlbWEsXG4gICAgICBuYW1lLFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIHJlYWRvbmx5LFxuICAgICAgYXV0b2ZvY3VzLFxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcbiAgICAgIG9uQmx1cixcbiAgICAgIG9uRm9jdXMsXG4gICAgICBpZFByZWZpeCxcbiAgICAgIHJhd0Vycm9ycyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0aXRsZSA9IHNjaGVtYS50aXRsZSA9PT0gdW5kZWZpbmVkID8gbmFtZSA6IHNjaGVtYS50aXRsZTtcbiAgICBjb25zdCB7IEFycmF5RmllbGRUZW1wbGF0ZSwgcm9vdFNjaGVtYSwgZmllbGRzLCBmb3JtQ29udGV4dCB9ID0gcmVnaXN0cnk7XG4gICAgY29uc3QgeyBUaXRsZUZpZWxkLCBEZXNjcmlwdGlvbkZpZWxkIH0gPSBmaWVsZHM7XG4gICAgY29uc3QgaXRlbXNTY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0ga2V5ZWRUb1BsYWluRm9ybURhdGEodGhpcy5zdGF0ZS5rZXllZEZvcm1EYXRhKTtcbiAgICBjb25zdCBhcnJheVByb3BzID0ge1xuICAgICAgY2FuQWRkOiB0aGlzLmNhbkFkZEl0ZW0oZm9ybURhdGEpLFxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgeyBrZXksIGl0ZW0gfSA9IGtleWVkSXRlbTtcbiAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5pdGVtcywgcm9vdFNjaGVtYSwgaXRlbSk7XG4gICAgICAgIGNvbnN0IGl0ZW1FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hID8gZXJyb3JTY2hlbWFbaW5kZXhdIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBpdGVtSWRQcmVmaXggPSBpZFNjaGVtYS4kaWQgKyBcIl9cIiArIGluZGV4O1xuICAgICAgICBjb25zdCBpdGVtSWRTY2hlbWEgPSB0b0lkU2NoZW1hKFxuICAgICAgICAgIGl0ZW1TY2hlbWEsXG4gICAgICAgICAgaXRlbUlkUHJlZml4LFxuICAgICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgICAgaXRlbSxcbiAgICAgICAgICBpZFByZWZpeFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBcnJheUZpZWxkSXRlbSh7XG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGNhbk1vdmVVcDogaW5kZXggPiAwLFxuICAgICAgICAgIGNhbk1vdmVEb3duOiBpbmRleCA8IGZvcm1EYXRhLmxlbmd0aCAtIDEsXG4gICAgICAgICAgaXRlbVNjaGVtYTogaXRlbVNjaGVtYSxcbiAgICAgICAgICBpdGVtSWRTY2hlbWEsXG4gICAgICAgICAgaXRlbUVycm9yU2NoZW1hLFxuICAgICAgICAgIGl0ZW1EYXRhOiBpdGVtLFxuICAgICAgICAgIGl0ZW1VaVNjaGVtYTogdWlTY2hlbWEuaXRlbXMsXG4gICAgICAgICAgYXV0b2ZvY3VzOiBhdXRvZm9jdXMgJiYgaW5kZXggPT09IDAsXG4gICAgICAgICAgb25CbHVyLFxuICAgICAgICAgIG9uRm9jdXMsXG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICBjbGFzc05hbWU6IGBmaWVsZCBmaWVsZC1hcnJheSBmaWVsZC1hcnJheS1vZi0ke2l0ZW1zU2NoZW1hLnR5cGV9YCxcbiAgICAgIERlc2NyaXB0aW9uRmllbGQsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIGlkU2NoZW1hLFxuICAgICAgdWlTY2hlbWEsXG4gICAgICBvbkFkZENsaWNrOiB0aGlzLm9uQWRkQ2xpY2ssXG4gICAgICByZWFkb25seSxcbiAgICAgIHJlcXVpcmVkLFxuICAgICAgc2NoZW1hLFxuICAgICAgdGl0bGUsXG4gICAgICBUaXRsZUZpZWxkLFxuICAgICAgZm9ybUNvbnRleHQsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIHJhd0Vycm9ycyxcbiAgICAgIHJlZ2lzdHJ5LFxuICAgIH07XG5cbiAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSByZW5kZXIgZnVuY3Rpb24gd2FzIHBhc3NlZCBpblxuICAgIGNvbnN0IENvbXBvbmVudCA9XG4gICAgICB1aVNjaGVtYVtcInVpOkFycmF5RmllbGRUZW1wbGF0ZVwiXSB8fFxuICAgICAgQXJyYXlGaWVsZFRlbXBsYXRlIHx8XG4gICAgICBEZWZhdWx0Tm9ybWFsQXJyYXlGaWVsZFRlbXBsYXRlO1xuICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi5hcnJheVByb3BzfSAvPjtcbiAgfVxuXG4gIHJlbmRlck11bHRpU2VsZWN0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNjaGVtYSxcbiAgICAgIGlkU2NoZW1hLFxuICAgICAgdWlTY2hlbWEsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgcmVhZG9ubHksXG4gICAgICByZXF1aXJlZCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgYXV0b2ZvY3VzLFxuICAgICAgb25CbHVyLFxuICAgICAgb25Gb2N1cyxcbiAgICAgIHJlZ2lzdHJ5ID0gZ2V0RGVmYXVsdFJlZ2lzdHJ5KCksXG4gICAgICByYXdFcnJvcnMsXG4gICAgICBuYW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5mb3JtRGF0YTtcbiAgICBjb25zdCB7IHdpZGdldHMsIHJvb3RTY2hlbWEsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcbiAgICBjb25zdCBpdGVtc1NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5pdGVtcywgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIGNvbnN0IHRpdGxlID0gc2NoZW1hLnRpdGxlIHx8IG5hbWU7XG4gICAgY29uc3QgZW51bU9wdGlvbnMgPSBvcHRpb25zTGlzdChpdGVtc1NjaGVtYSk7XG4gICAgY29uc3QgeyB3aWRnZXQgPSBcInNlbGVjdFwiLCAuLi5vcHRpb25zIH0gPSB7XG4gICAgICAuLi5nZXRVaU9wdGlvbnModWlTY2hlbWEpLFxuICAgICAgZW51bU9wdGlvbnMsXG4gICAgfTtcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xuICAgIHJldHVybiAoXG4gICAgICA8V2lkZ2V0XG4gICAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XG4gICAgICAgIG11bHRpcGxlXG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgIHJlZ2lzdHJ5PXtyZWdpc3RyeX1cbiAgICAgICAgdmFsdWU9e2l0ZW1zfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cbiAgICAgICAgcmVxdWlyZWQ9e3JlcXVpcmVkfVxuICAgICAgICBsYWJlbD17dGl0bGV9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cbiAgICAgICAgcmF3RXJyb3JzPXtyYXdFcnJvcnN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJGaWxlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY2hlbWEsXG4gICAgICB1aVNjaGVtYSxcbiAgICAgIGlkU2NoZW1hLFxuICAgICAgbmFtZSxcbiAgICAgIGRpc2FibGVkLFxuICAgICAgcmVhZG9ubHksXG4gICAgICBhdXRvZm9jdXMsXG4gICAgICBvbkJsdXIsXG4gICAgICBvbkZvY3VzLFxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcbiAgICAgIHJhd0Vycm9ycyxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0aXRsZSA9IHNjaGVtYS50aXRsZSB8fCBuYW1lO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5mb3JtRGF0YTtcbiAgICBjb25zdCB7IHdpZGdldHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcbiAgICBjb25zdCB7IHdpZGdldCA9IFwiZmlsZXNcIiwgLi4ub3B0aW9ucyB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcbiAgICBjb25zdCBXaWRnZXQgPSBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHdpZGdldHMpO1xuICAgIHJldHVybiAoXG4gICAgICA8V2lkZ2V0XG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgIGlkPXtpZFNjaGVtYSAmJiBpZFNjaGVtYS4kaWR9XG4gICAgICAgIG11bHRpcGxlXG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uU2VsZWN0Q2hhbmdlfVxuICAgICAgICBvbkJsdXI9e29uQmx1cn1cbiAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgc2NoZW1hPXtzY2hlbWF9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgdmFsdWU9e2l0ZW1zfVxuICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgIHJlYWRvbmx5PXtyZWFkb25seX1cbiAgICAgICAgZm9ybUNvbnRleHQ9e2Zvcm1Db250ZXh0fVxuICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cbiAgICAgICAgcmF3RXJyb3JzPXtyYXdFcnJvcnN9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXJGaXhlZEFycmF5KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNjaGVtYSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgZm9ybURhdGEsXG4gICAgICBlcnJvclNjaGVtYSxcbiAgICAgIGlkUHJlZml4LFxuICAgICAgaWRTY2hlbWEsXG4gICAgICBuYW1lLFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIHJlYWRvbmx5LFxuICAgICAgYXV0b2ZvY3VzLFxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcbiAgICAgIG9uQmx1cixcbiAgICAgIG9uRm9jdXMsXG4gICAgICByYXdFcnJvcnMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdGl0bGUgPSBzY2hlbWEudGl0bGUgfHwgbmFtZTtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLnByb3BzLmZvcm1EYXRhO1xuICAgIGNvbnN0IHsgQXJyYXlGaWVsZFRlbXBsYXRlLCByb290U2NoZW1hLCBmaWVsZHMsIGZvcm1Db250ZXh0IH0gPSByZWdpc3RyeTtcbiAgICBjb25zdCB7IFRpdGxlRmllbGQgfSA9IGZpZWxkcztcbiAgICBjb25zdCBpdGVtU2NoZW1hcyA9IHNjaGVtYS5pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgcmV0cmlldmVTY2hlbWEoaXRlbSwgcm9vdFNjaGVtYSwgZm9ybURhdGFbaW5kZXhdKVxuICAgICk7XG4gICAgY29uc3QgYWRkaXRpb25hbFNjaGVtYSA9IGFsbG93QWRkaXRpb25hbEl0ZW1zKHNjaGVtYSlcbiAgICAgID8gcmV0cmlldmVTY2hlbWEoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcywgcm9vdFNjaGVtYSwgZm9ybURhdGEpXG4gICAgICA6IG51bGw7XG5cbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA8IGl0ZW1TY2hlbWFzLmxlbmd0aCkge1xuICAgICAgLy8gdG8gbWFrZSBzdXJlIGF0IGxlYXN0IGFsbCBmaXhlZCBpdGVtcyBhcmUgZ2VuZXJhdGVkXG4gICAgICBpdGVtcyA9IGl0ZW1zIHx8IFtdO1xuICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQobmV3IEFycmF5KGl0ZW1TY2hlbWFzLmxlbmd0aCAtIGl0ZW1zLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIC8vIFRoZXNlIGFyZSB0aGUgcHJvcHMgcGFzc2VkIGludG8gdGhlIHJlbmRlciBmdW5jdGlvblxuICAgIGNvbnN0IGFycmF5UHJvcHMgPSB7XG4gICAgICBjYW5BZGQ6IHRoaXMuY2FuQWRkSXRlbShpdGVtcykgJiYgYWRkaXRpb25hbFNjaGVtYSxcbiAgICAgIGNsYXNzTmFtZTogXCJmaWVsZCBmaWVsZC1hcnJheSBmaWVsZC1hcnJheS1maXhlZC1pdGVtc1wiLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBpZFNjaGVtYSxcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgaXRlbXM6IHRoaXMuc3RhdGUua2V5ZWRGb3JtRGF0YS5tYXAoKGtleWVkSXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgeyBrZXksIGl0ZW0gfSA9IGtleWVkSXRlbTtcbiAgICAgICAgY29uc3QgYWRkaXRpb25hbCA9IGluZGV4ID49IGl0ZW1TY2hlbWFzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaXRlbVNjaGVtYSA9IGFkZGl0aW9uYWxcbiAgICAgICAgICA/IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMsIHJvb3RTY2hlbWEsIGl0ZW0pXG4gICAgICAgICAgOiBpdGVtU2NoZW1hc1tpbmRleF07XG4gICAgICAgIGNvbnN0IGl0ZW1JZFByZWZpeCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgaW5kZXg7XG4gICAgICAgIGNvbnN0IGl0ZW1JZFNjaGVtYSA9IHRvSWRTY2hlbWEoXG4gICAgICAgICAgaXRlbVNjaGVtYSxcbiAgICAgICAgICBpdGVtSWRQcmVmaXgsXG4gICAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgICBpdGVtLFxuICAgICAgICAgIGlkUHJlZml4XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGl0ZW1VaVNjaGVtYSA9IGFkZGl0aW9uYWxcbiAgICAgICAgICA/IHVpU2NoZW1hLmFkZGl0aW9uYWxJdGVtcyB8fCB7fVxuICAgICAgICAgIDogQXJyYXkuaXNBcnJheSh1aVNjaGVtYS5pdGVtcylcbiAgICAgICAgICA/IHVpU2NoZW1hLml0ZW1zW2luZGV4XVxuICAgICAgICAgIDogdWlTY2hlbWEuaXRlbXMgfHwge307XG4gICAgICAgIGNvbnN0IGl0ZW1FcnJvclNjaGVtYSA9IGVycm9yU2NoZW1hID8gZXJyb3JTY2hlbWFbaW5kZXhdIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFycmF5RmllbGRJdGVtKHtcbiAgICAgICAgICBrZXksXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgY2FuUmVtb3ZlOiBhZGRpdGlvbmFsLFxuICAgICAgICAgIGNhbk1vdmVVcDogaW5kZXggPj0gaXRlbVNjaGVtYXMubGVuZ3RoICsgMSxcbiAgICAgICAgICBjYW5Nb3ZlRG93bjogYWRkaXRpb25hbCAmJiBpbmRleCA8IGl0ZW1zLmxlbmd0aCAtIDEsXG4gICAgICAgICAgaXRlbVNjaGVtYSxcbiAgICAgICAgICBpdGVtRGF0YTogaXRlbSxcbiAgICAgICAgICBpdGVtVWlTY2hlbWEsXG4gICAgICAgICAgaXRlbUlkU2NoZW1hLFxuICAgICAgICAgIGl0ZW1FcnJvclNjaGVtYSxcbiAgICAgICAgICBhdXRvZm9jdXM6IGF1dG9mb2N1cyAmJiBpbmRleCA9PT0gMCxcbiAgICAgICAgICBvbkJsdXIsXG4gICAgICAgICAgb25Gb2N1cyxcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICAgIG9uQWRkQ2xpY2s6IHRoaXMub25BZGRDbGljayxcbiAgICAgIHJlYWRvbmx5LFxuICAgICAgcmVxdWlyZWQsXG4gICAgICBzY2hlbWEsXG4gICAgICB1aVNjaGVtYSxcbiAgICAgIHRpdGxlLFxuICAgICAgVGl0bGVGaWVsZCxcbiAgICAgIGZvcm1Db250ZXh0LFxuICAgICAgcmF3RXJyb3JzLFxuICAgIH07XG5cbiAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSB0ZW1wbGF0ZSB0ZW1wbGF0ZSB3YXMgcGFzc2VkIGluXG4gICAgY29uc3QgVGVtcGxhdGUgPVxuICAgICAgdWlTY2hlbWFbXCJ1aTpBcnJheUZpZWxkVGVtcGxhdGVcIl0gfHxcbiAgICAgIEFycmF5RmllbGRUZW1wbGF0ZSB8fFxuICAgICAgRGVmYXVsdEZpeGVkQXJyYXlGaWVsZFRlbXBsYXRlO1xuICAgIHJldHVybiA8VGVtcGxhdGUgey4uLmFycmF5UHJvcHN9IC8+O1xuICB9XG5cbiAgcmVuZGVyQXJyYXlGaWVsZEl0ZW0ocHJvcHMpIHtcbiAgICBjb25zdCB7XG4gICAgICBrZXksXG4gICAgICBpbmRleCxcbiAgICAgIGNhblJlbW92ZSA9IHRydWUsXG4gICAgICBjYW5Nb3ZlVXAgPSB0cnVlLFxuICAgICAgY2FuTW92ZURvd24gPSB0cnVlLFxuICAgICAgaXRlbVNjaGVtYSxcbiAgICAgIGl0ZW1EYXRhLFxuICAgICAgaXRlbVVpU2NoZW1hLFxuICAgICAgaXRlbUlkU2NoZW1hLFxuICAgICAgaXRlbUVycm9yU2NoZW1hLFxuICAgICAgYXV0b2ZvY3VzLFxuICAgICAgb25CbHVyLFxuICAgICAgb25Gb2N1cyxcbiAgICAgIHJhd0Vycm9ycyxcbiAgICB9ID0gcHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgZGlzYWJsZWQsXG4gICAgICByZWFkb25seSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgcmVnaXN0cnkgPSBnZXREZWZhdWx0UmVnaXN0cnkoKSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICBmaWVsZHM6IHsgU2NoZW1hRmllbGQgfSxcbiAgICB9ID0gcmVnaXN0cnk7XG4gICAgY29uc3QgeyBvcmRlcmFibGUsIHJlbW92YWJsZSB9ID0ge1xuICAgICAgb3JkZXJhYmxlOiB0cnVlLFxuICAgICAgcmVtb3ZhYmxlOiB0cnVlLFxuICAgICAgLi4udWlTY2hlbWFbXCJ1aTpvcHRpb25zXCJdLFxuICAgIH07XG4gICAgY29uc3QgaGFzID0ge1xuICAgICAgbW92ZVVwOiBvcmRlcmFibGUgJiYgY2FuTW92ZVVwLFxuICAgICAgbW92ZURvd246IG9yZGVyYWJsZSAmJiBjYW5Nb3ZlRG93bixcbiAgICAgIHJlbW92ZTogcmVtb3ZhYmxlICYmIGNhblJlbW92ZSxcbiAgICB9O1xuICAgIGhhcy50b29sYmFyID0gT2JqZWN0LmtleXMoaGFzKS5zb21lKGtleSA9PiBoYXNba2V5XSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2hpbGRyZW46IChcbiAgICAgICAgPFNjaGVtYUZpZWxkXG4gICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgIHNjaGVtYT17aXRlbVNjaGVtYX1cbiAgICAgICAgICB1aVNjaGVtYT17aXRlbVVpU2NoZW1hfVxuICAgICAgICAgIGZvcm1EYXRhPXtpdGVtRGF0YX1cbiAgICAgICAgICBlcnJvclNjaGVtYT17aXRlbUVycm9yU2NoZW1hfVxuICAgICAgICAgIGlkU2NoZW1hPXtpdGVtSWRTY2hlbWF9XG4gICAgICAgICAgcmVxdWlyZWQ9e3RoaXMuaXNJdGVtUmVxdWlyZWQoaXRlbVNjaGVtYSl9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VGb3JJbmRleChpbmRleCl9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgb25Gb2N1cz17b25Gb2N1c31cbiAgICAgICAgICByZWdpc3RyeT17dGhpcy5wcm9wcy5yZWdpc3RyeX1cbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cbiAgICAgICAgICByZWFkb25seT17dGhpcy5wcm9wcy5yZWFkb25seX1cbiAgICAgICAgICBhdXRvZm9jdXM9e2F1dG9mb2N1c31cbiAgICAgICAgICByYXdFcnJvcnM9e3Jhd0Vycm9yc31cbiAgICAgICAgLz5cbiAgICAgICksXG4gICAgICBjbGFzc05hbWU6IFwiYXJyYXktaXRlbVwiLFxuICAgICAgZGlzYWJsZWQsXG4gICAgICBoYXNUb29sYmFyOiBoYXMudG9vbGJhcixcbiAgICAgIGhhc01vdmVVcDogaGFzLm1vdmVVcCxcbiAgICAgIGhhc01vdmVEb3duOiBoYXMubW92ZURvd24sXG4gICAgICBoYXNSZW1vdmU6IGhhcy5yZW1vdmUsXG4gICAgICBpbmRleCxcbiAgICAgIGtleSxcbiAgICAgIG9uQWRkSW5kZXhDbGljazogdGhpcy5vbkFkZEluZGV4Q2xpY2ssXG4gICAgICBvbkRyb3BJbmRleENsaWNrOiB0aGlzLm9uRHJvcEluZGV4Q2xpY2ssXG4gICAgICBvblJlb3JkZXJDbGljazogdGhpcy5vblJlb3JkZXJDbGljayxcbiAgICAgIHJlYWRvbmx5LFxuICAgIH07XG4gIH1cbn1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICBBcnJheUZpZWxkLnByb3BUeXBlcyA9IHR5cGVzLmZpZWxkUHJvcHM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFycmF5RmllbGQ7XG4iXX0=