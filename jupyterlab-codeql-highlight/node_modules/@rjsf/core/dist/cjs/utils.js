"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canExpand = canExpand;
exports.getDefaultRegistry = getDefaultRegistry;
exports.getSchemaType = getSchemaType;
exports.getWidget = getWidget;
exports.hasWidget = hasWidget;
exports.getDefaultFormState = getDefaultFormState;
exports.mergeDefaultsWithFormData = mergeDefaultsWithFormData;
exports.getUiOptions = getUiOptions;
exports.getDisplayLabel = getDisplayLabel;
exports.isObject = isObject;
exports.mergeObjects = mergeObjects;
exports.asNumber = asNumber;
exports.orderProperties = orderProperties;
exports.isConstant = isConstant;
exports.toConstant = toConstant;
exports.isSelect = isSelect;
exports.isMultiSelect = isMultiSelect;
exports.isFilesArray = isFilesArray;
exports.isFixedItems = isFixedItems;
exports.allowAdditionalItems = allowAdditionalItems;
exports.optionsList = optionsList;
exports.findSchemaDefinition = findSchemaDefinition;
exports.stubExistingAdditionalProperties = stubExistingAdditionalProperties;
exports.resolveSchema = resolveSchema;
exports.retrieveSchema = retrieveSchema;
exports.mergeSchemas = mergeSchemas;
exports.deepEquals = deepEquals;
exports.shouldRender = shouldRender;
exports.toIdSchema = toIdSchema;
exports.toPathSchema = toPathSchema;
exports.parseDateString = parseDateString;
exports.toDateString = toDateString;
exports.utcToLocal = utcToLocal;
exports.localToUTC = localToUTC;
exports.pad = pad;
exports.dataURItoBlob = dataURItoBlob;
exports.rangeSpec = rangeSpec;
exports.getMatchingOption = getMatchingOption;
exports.schemaRequiresTrueValue = schemaRequiresTrueValue;
exports.guessType = exports.ADDITIONAL_PROPERTY_FLAG = void 0;

var _react = _interopRequireDefault(require("react"));

var ReactIs = _interopRequireWildcard(require("react-is"));

var _jsonSchemaMergeAllof = _interopRequireDefault(require("json-schema-merge-allof"));

var _fill = _interopRequireDefault(require("core-js-pure/features/array/fill"));

var _union = _interopRequireDefault(require("lodash/union"));

var _jsonpointer = _interopRequireDefault(require("jsonpointer"));

var _fields = _interopRequireDefault(require("./components/fields"));

var _widgets = _interopRequireDefault(require("./components/widgets"));

var _validate = _interopRequireWildcard(require("./validate"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ADDITIONAL_PROPERTY_FLAG = "__additional_property";
exports.ADDITIONAL_PROPERTY_FLAG = ADDITIONAL_PROPERTY_FLAG;
var widgetMap = {
  "boolean": {
    checkbox: "CheckboxWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    hidden: "HiddenWidget"
  },
  string: {
    text: "TextWidget",
    password: "PasswordWidget",
    email: "EmailWidget",
    hostname: "TextWidget",
    ipv4: "TextWidget",
    ipv6: "TextWidget",
    uri: "URLWidget",
    "data-url": "FileWidget",
    radio: "RadioWidget",
    select: "SelectWidget",
    textarea: "TextareaWidget",
    hidden: "HiddenWidget",
    date: "DateWidget",
    datetime: "DateTimeWidget",
    "date-time": "DateTimeWidget",
    "alt-date": "AltDateWidget",
    "alt-datetime": "AltDateTimeWidget",
    color: "ColorWidget",
    file: "FileWidget"
  },
  number: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  integer: {
    text: "TextWidget",
    select: "SelectWidget",
    updown: "UpDownWidget",
    range: "RangeWidget",
    radio: "RadioWidget",
    hidden: "HiddenWidget"
  },
  array: {
    select: "SelectWidget",
    checkboxes: "CheckboxesWidget",
    files: "FileWidget",
    hidden: "HiddenWidget"
  }
};

function canExpand(schema, uiSchema, formData) {
  if (!schema.additionalProperties) {
    return false;
  }

  var _getUiOptions = getUiOptions(uiSchema),
      expandable = _getUiOptions.expandable;

  if (expandable === false) {
    return expandable;
  } // if ui:options.expandable was not explicitly set to false, we can add
  // another property if we have not exceeded maxProperties yet


  if (schema.maxProperties !== undefined) {
    return Object.keys(formData).length < schema.maxProperties;
  }

  return true;
}

function getDefaultRegistry() {
  return {
    fields: _fields["default"],
    widgets: _widgets["default"],
    definitions: {},
    rootSchema: {},
    formContext: {}
  };
}
/* Gets the type of a given schema. */


function getSchemaType(schema) {
  var type = schema.type;

  if (!type && schema["const"]) {
    return guessType(schema["const"]);
  }

  if (!type && schema["enum"]) {
    return "string";
  }

  if (!type && (schema.properties || schema.additionalProperties)) {
    return "object";
  }

  if (type instanceof Array && type.length === 2 && type.includes("null")) {
    return type.find(function (type) {
      return type !== "null";
    });
  }

  return type;
}

function getWidget(schema, widget) {
  var registeredWidgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var type = getSchemaType(schema);

  function mergeOptions(Widget) {
    // cache return value as property of widget for proper react reconciliation
    if (!Widget.MergedWidget) {
      var defaultOptions = Widget.defaultProps && Widget.defaultProps.options || {};

      Widget.MergedWidget = function (_ref) {
        var _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            props = _objectWithoutProperties(_ref, ["options"]);

        return _react["default"].createElement(Widget, _extends({
          options: _objectSpread({}, defaultOptions, options)
        }, props));
      };
    }

    return Widget.MergedWidget;
  }

  if (typeof widget === "function" || ReactIs.isForwardRef(_react["default"].createElement(widget)) || ReactIs.isMemo(widget)) {
    return mergeOptions(widget);
  }

  if (typeof widget !== "string") {
    throw new Error("Unsupported widget definition: ".concat(_typeof(widget)));
  }

  if (registeredWidgets.hasOwnProperty(widget)) {
    var registeredWidget = registeredWidgets[widget];
    return getWidget(schema, registeredWidget, registeredWidgets);
  }

  if (!widgetMap.hasOwnProperty(type)) {
    throw new Error("No widget for type \"".concat(type, "\""));
  }

  if (widgetMap[type].hasOwnProperty(widget)) {
    var _registeredWidget = registeredWidgets[widgetMap[type][widget]];
    return getWidget(schema, _registeredWidget, registeredWidgets);
  }

  throw new Error("No widget \"".concat(widget, "\" for type \"").concat(type, "\""));
}

function hasWidget(schema, widget) {
  var registeredWidgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  try {
    getWidget(schema, widget, registeredWidgets);
    return true;
  } catch (e) {
    if (e.message && (e.message.startsWith("No widget") || e.message.startsWith("Unsupported widget"))) {
      return false;
    }

    throw e;
  }
}

function computeDefaults(_schema, parentDefaults, rootSchema) {
  var rawFormData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var includeUndefinedValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var schema = isObject(_schema) ? _schema : {};
  var formData = isObject(rawFormData) ? rawFormData : {}; // Compute the defaults recursively: give highest priority to deepest nodes.

  var defaults = parentDefaults;

  if (isObject(defaults) && isObject(schema["default"])) {
    // For object defaults, only override parent defaults that are defined in
    // schema.default.
    defaults = mergeObjects(defaults, schema["default"]);
  } else if ("default" in schema) {
    // Use schema defaults for this node.
    defaults = schema["default"];
  } else if ("$ref" in schema) {
    // Use referenced schema defaults for this node.
    var refSchema = findSchemaDefinition(schema.$ref, rootSchema);
    return computeDefaults(refSchema, defaults, rootSchema, formData, includeUndefinedValues);
  } else if ("dependencies" in schema) {
    var resolvedSchema = resolveDependencies(schema, rootSchema, formData);
    return computeDefaults(resolvedSchema, defaults, rootSchema, formData, includeUndefinedValues);
  } else if (isFixedItems(schema)) {
    defaults = schema.items.map(function (itemSchema, idx) {
      return computeDefaults(itemSchema, Array.isArray(parentDefaults) ? parentDefaults[idx] : undefined, rootSchema, formData, includeUndefinedValues);
    });
  } else if ("oneOf" in schema) {
    schema = schema.oneOf[getMatchingOption(undefined, schema.oneOf, rootSchema)];
  } else if ("anyOf" in schema) {
    schema = schema.anyOf[getMatchingOption(undefined, schema.anyOf, rootSchema)];
  } // Not defaults defined for this node, fallback to generic typed ones.


  if (typeof defaults === "undefined") {
    defaults = schema["default"];
  }

  switch (getSchemaType(schema)) {
    // We need to recur for object schema inner default values.
    case "object":
      return Object.keys(schema.properties || {}).reduce(function (acc, key) {
        // Compute the defaults for this node, with the parent defaults we might
        // have from a previous run: defaults[key].
        var computedDefault = computeDefaults(schema.properties[key], (defaults || {})[key], rootSchema, (formData || {})[key], includeUndefinedValues);

        if (includeUndefinedValues || computedDefault !== undefined) {
          acc[key] = computedDefault;
        }

        return acc;
      }, {});

    case "array":
      // Inject defaults into existing array defaults
      if (Array.isArray(defaults)) {
        defaults = defaults.map(function (item, idx) {
          return computeDefaults(schema.items[idx] || schema.additionalItems || {}, item, rootSchema);
        });
      } // Deeply inject defaults into already existing form data


      if (Array.isArray(rawFormData)) {
        defaults = rawFormData.map(function (item, idx) {
          return computeDefaults(schema.items, (defaults || {})[idx], rootSchema, item);
        });
      }

      if (schema.minItems) {
        if (!isMultiSelect(schema, rootSchema)) {
          var defaultsLength = defaults ? defaults.length : 0;

          if (schema.minItems > defaultsLength) {
            var defaultEntries = defaults || []; // populate the array with the defaults

            var fillerSchema = Array.isArray(schema.items) ? schema.additionalItems : schema.items;
            var fillerEntries = (0, _fill["default"])(new Array(schema.minItems - defaultsLength), computeDefaults(fillerSchema, fillerSchema.defaults, rootSchema)); // then fill up the rest with either the item default or empty, up to minItems

            return defaultEntries.concat(fillerEntries);
          }
        } else {
          return defaults ? defaults : [];
        }
      }

  }

  return defaults;
}

function getDefaultFormState(_schema, formData) {
  var rootSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var includeUndefinedValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!isObject(_schema)) {
    throw new Error("Invalid schema: " + _schema);
  }

  var schema = retrieveSchema(_schema, rootSchema, formData);
  var defaults = computeDefaults(schema, _schema["default"], rootSchema, formData, includeUndefinedValues);

  if (typeof formData === "undefined") {
    // No form data? Use schema defaults.
    return defaults;
  }

  if (isObject(formData) || Array.isArray(formData)) {
    return mergeDefaultsWithFormData(defaults, formData);
  }

  if (formData === 0 || formData === false || formData === "") {
    return formData;
  }

  return formData || defaults;
}
/**
 * When merging defaults and form data, we want to merge in this specific way:
 * - objects are deeply merged
 * - arrays are merged in such a way that:
 *   - when the array is set in form data, only array entries set in form data
 *     are deeply merged; additional entries from the defaults are ignored
 *   - when the array is not set in form data, the default is copied over
 * - scalars are overwritten/set by form data
 */


function mergeDefaultsWithFormData(defaults, formData) {
  if (Array.isArray(formData)) {
    if (!Array.isArray(defaults)) {
      defaults = [];
    }

    return formData.map(function (value, idx) {
      if (defaults[idx]) {
        return mergeDefaultsWithFormData(defaults[idx], value);
      }

      return value;
    });
  } else if (isObject(formData)) {
    var acc = Object.assign({}, defaults); // Prevent mutation of source object.

    return Object.keys(formData).reduce(function (acc, key) {
      acc[key] = mergeDefaultsWithFormData(defaults ? defaults[key] : {}, formData[key]);
      return acc;
    }, acc);
  } else {
    return formData;
  }
}

function getUiOptions(uiSchema) {
  // get all passed options from ui:widget, ui:options, and ui:<optionName>
  return Object.keys(uiSchema).filter(function (key) {
    return key.indexOf("ui:") === 0;
  }).reduce(function (options, key) {
    var value = uiSchema[key];

    if (key === "ui:widget" && isObject(value)) {
      console.warn("Setting options via ui:widget object is deprecated, use ui:options instead");
      return _objectSpread({}, options, value.options || {}, {
        widget: value.component
      });
    }

    if (key === "ui:options" && isObject(value)) {
      return _objectSpread({}, options, value);
    }

    return _objectSpread({}, options, _defineProperty({}, key.substring(3), value));
  }, {});
}

function getDisplayLabel(schema, uiSchema, rootSchema) {
  var uiOptions = getUiOptions(uiSchema);
  var _uiOptions$label = uiOptions.label,
      displayLabel = _uiOptions$label === void 0 ? true : _uiOptions$label;
  var schemaType = getSchemaType(schema);

  if (schemaType === "array") {
    displayLabel = isMultiSelect(schema, rootSchema) || isFilesArray(schema, uiSchema, rootSchema);
  }

  if (schemaType === "object") {
    displayLabel = false;
  }

  if (schemaType === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }

  if (uiSchema["ui:field"]) {
    displayLabel = false;
  }

  return displayLabel;
}

function isObject(thing) {
  if (typeof File !== "undefined" && thing instanceof File) {
    return false;
  }

  return _typeof(thing) === "object" && thing !== null && !Array.isArray(thing);
}

function mergeObjects(obj1, obj2) {
  var concatArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // Recursively merge deeply nested objects.
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.

  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays);
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function asNumber(value) {
  if (value === "") {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (/\.$/.test(value)) {
    // "3." can't really be considered a number even if it parses in js. The
    // user is most likely entering a float.
    return value;
  }

  if (/\.0$/.test(value)) {
    // we need to return this as a string here, to allow for input like 3.07
    return value;
  }

  var n = Number(value);
  var valid = typeof n === "number" && !Number.isNaN(n);

  if (/\.\d*0$/.test(value)) {
    // It's a number, that's cool - but we need it as a string so it doesn't screw
    // with the user when entering dollar amounts or other values (such as those with
    // specific precision or number of significant digits)
    return value;
  }

  return valid ? n : value;
}

function orderProperties(properties, order) {
  if (!Array.isArray(order)) {
    return properties;
  }

  var arrayToHash = function arrayToHash(arr) {
    return arr.reduce(function (prev, curr) {
      prev[curr] = true;
      return prev;
    }, {});
  };

  var errorPropList = function errorPropList(arr) {
    return arr.length > 1 ? "properties '".concat(arr.join("', '"), "'") : "property '".concat(arr[0], "'");
  };

  var propertyHash = arrayToHash(properties);
  var orderFiltered = order.filter(function (prop) {
    return prop === "*" || propertyHash[prop];
  });
  var orderHash = arrayToHash(orderFiltered);
  var rest = properties.filter(function (prop) {
    return !orderHash[prop];
  });
  var restIndex = orderFiltered.indexOf("*");

  if (restIndex === -1) {
    if (rest.length) {
      throw new Error("uiSchema order list does not contain ".concat(errorPropList(rest)));
    }

    return orderFiltered;
  }

  if (restIndex !== orderFiltered.lastIndexOf("*")) {
    throw new Error("uiSchema order list contains more than one wildcard item");
  }

  var complete = _toConsumableArray(orderFiltered);

  complete.splice.apply(complete, [restIndex, 1].concat(_toConsumableArray(rest)));
  return complete;
}
/**
 * This function checks if the given schema matches a single
 * constant value.
 */


function isConstant(schema) {
  return Array.isArray(schema["enum"]) && schema["enum"].length === 1 || schema.hasOwnProperty("const");
}

function toConstant(schema) {
  if (Array.isArray(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  } else if (schema.hasOwnProperty("const")) {
    return schema["const"];
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
}

function isSelect(_schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var schema = retrieveSchema(_schema, rootSchema);
  var altSchemas = schema.oneOf || schema.anyOf;

  if (Array.isArray(schema["enum"])) {
    return true;
  } else if (Array.isArray(altSchemas)) {
    return altSchemas.every(function (altSchemas) {
      return isConstant(altSchemas);
    });
  }

  return false;
}

function isMultiSelect(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!schema.uniqueItems || !schema.items) {
    return false;
  }

  return isSelect(schema.items, rootSchema);
}

function isFilesArray(schema, uiSchema) {
  var rootSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (uiSchema["ui:widget"] === "files") {
    return true;
  } else if (schema.items) {
    var itemsSchema = retrieveSchema(schema.items, rootSchema);
    return itemsSchema.type === "string" && itemsSchema.format === "data-url";
  }

  return false;
}

function isFixedItems(schema) {
  return Array.isArray(schema.items) && schema.items.length > 0 && schema.items.every(function (item) {
    return isObject(item);
  });
}

function allowAdditionalItems(schema) {
  if (schema.additionalItems === true) {
    console.warn("additionalItems=true is currently not supported");
  }

  return isObject(schema.additionalItems);
}

function optionsList(schema) {
  if (schema["enum"]) {
    return schema["enum"].map(function (value, i) {
      var label = schema.enumNames && schema.enumNames[i] || String(value);
      return {
        label: label,
        value: value
      };
    });
  } else {
    var altSchemas = schema.oneOf || schema.anyOf;
    return altSchemas.map(function (schema, i) {
      var value = toConstant(schema);
      var label = schema.title || String(value);
      return {
        schema: schema,
        label: label,
        value: value
      };
    });
  }
}

function findSchemaDefinition($ref) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var origRef = $ref;

  if ($ref.startsWith("#")) {
    // Decode URI fragment representation.
    $ref = decodeURIComponent($ref.substring(1));
  } else {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  var current = _jsonpointer["default"].get(rootSchema, $ref);

  if (current === undefined) {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  if (current.hasOwnProperty("$ref")) {
    return findSchemaDefinition(current.$ref, rootSchema);
  }

  return current;
} // In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining


var guessType = function guessType(value) {
  if (Array.isArray(value)) {
    return "array";
  } else if (typeof value === "string") {
    return "string";
  } else if (value == null) {
    return "null";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (!isNaN(value)) {
    return "number";
  } else if (_typeof(value) === "object") {
    return "object";
  } // Default to string if we can't figure it out


  return "string";
}; // This function will create new "properties" items for each key in our formData


exports.guessType = guessType;

function stubExistingAdditionalProperties(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Clone the schema so we don't ruin the consumer's original
  schema = _objectSpread({}, schema, {
    properties: _objectSpread({}, schema.properties)
  }); // make sure formData is an object

  formData = isObject(formData) ? formData : {};
  Object.keys(formData).forEach(function (key) {
    if (schema.properties.hasOwnProperty(key)) {
      // No need to stub, our schema already has the property
      return;
    }

    var additionalProperties;

    if (schema.additionalProperties.hasOwnProperty("$ref")) {
      additionalProperties = retrieveSchema({
        $ref: schema.additionalProperties["$ref"]
      }, rootSchema, formData);
    } else if (schema.additionalProperties.hasOwnProperty("type")) {
      additionalProperties = _objectSpread({}, schema.additionalProperties);
    } else {
      additionalProperties = {
        type: guessType(formData[key])
      };
    } // The type of our new key should match the additionalProperties value;


    schema.properties[key] = additionalProperties; // Set our additional property flag so we know it was dynamically added

    schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
  });
  return schema;
}

function resolveSchema(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (schema.hasOwnProperty("$ref")) {
    return resolveReference(schema, rootSchema, formData);
  } else if (schema.hasOwnProperty("dependencies")) {
    var resolvedSchema = resolveDependencies(schema, rootSchema, formData);
    return retrieveSchema(resolvedSchema, rootSchema, formData);
  } else if (schema.hasOwnProperty("allOf")) {
    return _objectSpread({}, schema, {
      allOf: schema.allOf.map(function (allOfSubschema) {
        return retrieveSchema(allOfSubschema, rootSchema, formData);
      })
    });
  } else {
    // No $ref or dependencies attribute found, returning the original schema.
    return schema;
  }
}

function resolveReference(schema, rootSchema, formData) {
  // Retrieve the referenced schema definition.
  var $refSchema = findSchemaDefinition(schema.$ref, rootSchema); // Drop the $ref property of the source schema.

  var $ref = schema.$ref,
      localSchema = _objectWithoutProperties(schema, ["$ref"]); // Update referenced schema definition with local schema properties.


  return retrieveSchema(_objectSpread({}, $refSchema, localSchema), rootSchema, formData);
}

function retrieveSchema(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!isObject(schema)) {
    return {};
  }

  var resolvedSchema = resolveSchema(schema, rootSchema, formData);

  if ("allOf" in schema) {
    try {
      resolvedSchema = (0, _jsonSchemaMergeAllof["default"])(_objectSpread({}, resolvedSchema, {
        allOf: resolvedSchema.allOf
      }));
    } catch (e) {
      console.warn("could not merge subschemas in allOf:\n" + e);

      var _resolvedSchema = resolvedSchema,
          allOf = _resolvedSchema.allOf,
          resolvedSchemaWithoutAllOf = _objectWithoutProperties(_resolvedSchema, ["allOf"]);

      return resolvedSchemaWithoutAllOf;
    }
  }

  var hasAdditionalProperties = resolvedSchema.hasOwnProperty("additionalProperties") && resolvedSchema.additionalProperties !== false;

  if (hasAdditionalProperties) {
    return stubExistingAdditionalProperties(resolvedSchema, rootSchema, formData);
  }

  return resolvedSchema;
}

function resolveDependencies(schema, rootSchema, formData) {
  // Drop the dependencies from the source schema.
  var _schema$dependencies = schema.dependencies,
      dependencies = _schema$dependencies === void 0 ? {} : _schema$dependencies,
      resolvedSchema = _objectWithoutProperties(schema, ["dependencies"]);

  if ("oneOf" in resolvedSchema) {
    resolvedSchema = resolvedSchema.oneOf[getMatchingOption(formData, resolvedSchema.oneOf, rootSchema)];
  } else if ("anyOf" in resolvedSchema) {
    resolvedSchema = resolvedSchema.anyOf[getMatchingOption(formData, resolvedSchema.anyOf, rootSchema)];
  }

  return processDependencies(dependencies, resolvedSchema, rootSchema, formData);
}

function processDependencies(dependencies, resolvedSchema, rootSchema, formData) {
  // Process dependencies updating the local schema properties as appropriate.
  for (var dependencyKey in dependencies) {
    // Skip this dependency if its trigger property is not present.
    if (formData[dependencyKey] === undefined) {
      continue;
    } // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)


    if (resolvedSchema.properties && !(dependencyKey in resolvedSchema.properties)) {
      continue;
    }

    var dependencyValue = dependencies[dependencyKey],
        remainingDependencies = _objectWithoutProperties(dependencies, [dependencyKey].map(_toPropertyKey));

    if (Array.isArray(dependencyValue)) {
      resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
    } else if (isObject(dependencyValue)) {
      resolvedSchema = withDependentSchema(resolvedSchema, rootSchema, formData, dependencyKey, dependencyValue);
    }

    return processDependencies(remainingDependencies, resolvedSchema, rootSchema, formData);
  }

  return resolvedSchema;
}

function withDependentProperties(schema, additionallyRequired) {
  if (!additionallyRequired) {
    return schema;
  }

  var required = Array.isArray(schema.required) ? Array.from(new Set([].concat(_toConsumableArray(schema.required), _toConsumableArray(additionallyRequired)))) : additionallyRequired;
  return _objectSpread({}, schema, {
    required: required
  });
}

function withDependentSchema(schema, rootSchema, formData, dependencyKey, dependencyValue) {
  var _retrieveSchema = retrieveSchema(dependencyValue, rootSchema, formData),
      oneOf = _retrieveSchema.oneOf,
      dependentSchema = _objectWithoutProperties(_retrieveSchema, ["oneOf"]);

  schema = mergeSchemas(schema, dependentSchema); // Since it does not contain oneOf, we return the original schema.

  if (oneOf === undefined) {
    return schema;
  } else if (!Array.isArray(oneOf)) {
    throw new Error("invalid: it is some ".concat(_typeof(oneOf), " instead of an array"));
  } // Resolve $refs inside oneOf.


  var resolvedOneOf = oneOf.map(function (subschema) {
    return subschema.hasOwnProperty("$ref") ? resolveReference(subschema, rootSchema, formData) : subschema;
  });
  return withExactlyOneSubschema(schema, rootSchema, formData, dependencyKey, resolvedOneOf);
}

function withExactlyOneSubschema(schema, rootSchema, formData, dependencyKey, oneOf) {
  var validSubschemas = oneOf.filter(function (subschema) {
    if (!subschema.properties) {
      return false;
    }

    var conditionPropertySchema = subschema.properties[dependencyKey];

    if (conditionPropertySchema) {
      var conditionSchema = {
        type: "object",
        properties: _defineProperty({}, dependencyKey, conditionPropertySchema)
      };

      var _validateFormData = (0, _validate["default"])(formData, conditionSchema),
          errors = _validateFormData.errors;

      return errors.length === 0;
    }
  });

  if (validSubschemas.length !== 1) {
    console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid");
    return schema;
  }

  var subschema = validSubschemas[0];

  var _subschema$properties = subschema.properties,
      conditionPropertySchema = _subschema$properties[dependencyKey],
      dependentSubschema = _objectWithoutProperties(_subschema$properties, [dependencyKey].map(_toPropertyKey));

  var dependentSchema = _objectSpread({}, subschema, {
    properties: dependentSubschema
  });

  return mergeSchemas(schema, retrieveSchema(dependentSchema, rootSchema, formData));
} // Recursively merge deeply nested schemas.
// The difference between mergeSchemas and mergeObjects
// is that mergeSchemas only concats arrays for
// values under the "required" keyword, and when it does,
// it doesn't include duplicate values.


function mergeSchemas(obj1, obj2) {
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.

  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right);
    } else if (obj1 && obj2 && (getSchemaType(obj1) === "object" || getSchemaType(obj2) === "object") && key === "required" && Array.isArray(left) && Array.isArray(right)) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = (0, _union["default"])(left, right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}

function deepEquals(a, b) {
  var ca = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  } else if (typeof a === "function" || typeof b === "function") {
    // Assume all functions are equivalent
    // see https://github.com/rjsf-team/react-jsonschema-form/issues/255
    return true;
  } else if (_typeof(a) !== "object" || _typeof(b) !== "object") {
    return false;
  } else if (a === null || b === null) {
    return false;
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase;
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }

    var slice = Array.prototype.slice;
    return deepEquals(slice.call(a), slice.call(b), ca, cb);
  } else {
    if (a.constructor !== b.constructor) {
      return false;
    }

    var ka = Object.keys(a);
    var kb = Object.keys(b); // don't bother with stack acrobatics if there's nothing there

    if (ka.length === 0 && kb.length === 0) {
      return true;
    }

    if (ka.length !== kb.length) {
      return false;
    }

    var cal = ca.length;

    while (cal--) {
      if (ca[cal] === a) {
        return cb[cal] === b;
      }
    }

    ca.push(a);
    cb.push(b);
    ka.sort();
    kb.sort();

    for (var j = ka.length - 1; j >= 0; j--) {
      if (ka[j] !== kb[j]) {
        return false;
      }
    }

    var _key;

    for (var k = ka.length - 1; k >= 0; k--) {
      _key = ka[k];

      if (!deepEquals(a[_key], b[_key], ca, cb)) {
        return false;
      }
    }

    ca.pop();
    cb.pop();
    return true;
  }
}

function shouldRender(comp, nextProps, nextState) {
  var props = comp.props,
      state = comp.state;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}

function toIdSchema(schema, id, rootSchema) {
  var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var idPrefix = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "root";
  var idSchema = {
    $id: id || idPrefix
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, rootSchema, formData);

    return toIdSchema(_schema, id, rootSchema, formData, idPrefix);
  }

  if ("items" in schema && !schema.items.$ref) {
    return toIdSchema(schema.items, id, rootSchema, formData, idPrefix);
  }

  if (schema.type !== "object") {
    return idSchema;
  }

  for (var name in schema.properties || {}) {
    var field = schema.properties[name];
    var fieldId = idSchema.$id + "_" + name;
    idSchema[name] = toIdSchema(isObject(field) ? field : {}, fieldId, rootSchema, // It's possible that formData is not an object -- this can happen if an
    // array item has just been added, but not populated with data yet
    (formData || {})[name], idPrefix);
  }

  return idSchema;
}

function toPathSchema(schema) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var rootSchema = arguments.length > 2 ? arguments[2] : undefined;
  var formData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var pathSchema = {
    $name: name.replace(/^\./, "")
  };

  if ("$ref" in schema || "dependencies" in schema || "allOf" in schema) {
    var _schema = retrieveSchema(schema, rootSchema, formData);

    return toPathSchema(_schema, name, rootSchema, formData);
  }

  if (schema.hasOwnProperty("additionalProperties")) {
    pathSchema.__rjsf_additionalProperties = true;
  }

  if (schema.hasOwnProperty("items") && Array.isArray(formData)) {
    formData.forEach(function (element, i) {
      pathSchema[i] = toPathSchema(schema.items, "".concat(name, ".").concat(i), rootSchema, element);
    });
  } else if (schema.hasOwnProperty("properties")) {
    for (var property in schema.properties) {
      pathSchema[property] = toPathSchema(schema.properties[property], "".concat(name, ".").concat(property), rootSchema, // It's possible that formData is not an object -- this can happen if an
      // array item has just been added, but not populated with data yet
      (formData || {})[property]);
    }
  }

  return pathSchema;
}

function parseDateString(dateString) {
  var includeTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (!dateString) {
    return {
      year: -1,
      month: -1,
      day: -1,
      hour: includeTime ? -1 : 0,
      minute: includeTime ? -1 : 0,
      second: includeTime ? -1 : 0
    };
  }

  var date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Unable to parse date " + dateString);
  }

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    // oh you, javascript.
    day: date.getUTCDate(),
    hour: includeTime ? date.getUTCHours() : 0,
    minute: includeTime ? date.getUTCMinutes() : 0,
    second: includeTime ? date.getUTCSeconds() : 0
  };
}

function toDateString(_ref2) {
  var year = _ref2.year,
      month = _ref2.month,
      day = _ref2.day,
      _ref2$hour = _ref2.hour,
      hour = _ref2$hour === void 0 ? 0 : _ref2$hour,
      _ref2$minute = _ref2.minute,
      minute = _ref2$minute === void 0 ? 0 : _ref2$minute,
      _ref2$second = _ref2.second,
      second = _ref2$second === void 0 ? 0 : _ref2$second;
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var utcTime = Date.UTC(year, month - 1, day, hour, minute, second);
  var datetime = new Date(utcTime).toJSON();
  return time ? datetime : datetime.slice(0, 10);
}

function utcToLocal(jsonDate) {
  if (!jsonDate) {
    return "";
  } // required format of `"yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
  // https://html.spec.whatwg.org/multipage/input.html#local-date-and-time-state-(type%3Ddatetime-local)
  // > should be a _valid local date and time string_ (not GMT)
  // Note - date constructor passed local ISO-8601 does not correctly
  // change time to UTC in node pre-8


  var date = new Date(jsonDate);
  var yyyy = pad(date.getFullYear(), 4);
  var MM = pad(date.getMonth() + 1, 2);
  var dd = pad(date.getDate(), 2);
  var hh = pad(date.getHours(), 2);
  var mm = pad(date.getMinutes(), 2);
  var ss = pad(date.getSeconds(), 2);
  var SSS = pad(date.getMilliseconds(), 3);
  return "".concat(yyyy, "-").concat(MM, "-").concat(dd, "T").concat(hh, ":").concat(mm, ":").concat(ss, ".").concat(SSS);
}

function localToUTC(dateString) {
  if (dateString) {
    return new Date(dateString).toJSON();
  }
}

function pad(num, size) {
  var s = String(num);

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}

function dataURItoBlob(dataURI) {
  // Split metadata from data
  var splitted = dataURI.split(","); // Split params

  var params = splitted[0].split(";"); // Get mime-type from params

  var type = params[0].replace("data:", ""); // Filter the name property from params

  var properties = params.filter(function (param) {
    return param.split("=")[0] === "name";
  }); // Look for the name and use unknown if no name property.

  var name;

  if (properties.length !== 1) {
    name = "unknown";
  } else {
    // Because we filtered out the other property,
    // we only have the name case here.
    name = properties[0].split("=")[1];
  } // Built the Uint8Array Blob parameter from the base64 string.


  var binary = atob(splitted[1]);
  var array = [];

  for (var _i = 0; _i < binary.length; _i++) {
    array.push(binary.charCodeAt(_i));
  } // Create the blob object


  var blob = new window.Blob([new Uint8Array(array)], {
    type: type
  });
  return {
    blob: blob,
    name: name
  };
}

function rangeSpec(schema) {
  var spec = {};

  if (schema.multipleOf) {
    spec.step = schema.multipleOf;
  }

  if (schema.minimum || schema.minimum === 0) {
    spec.min = schema.minimum;
  }

  if (schema.maximum || schema.maximum === 0) {
    spec.max = schema.maximum;
  }

  return spec;
}

function getMatchingOption(formData, options, rootSchema) {
  for (var _i2 = 0; _i2 < options.length; _i2++) {
    var option = options[_i2]; // If the schema describes an object then we need to add slightly more
    // strict matching to the schema, because unless the schema uses the
    // "requires" keyword, an object will match the schema as long as it
    // doesn't have matching keys with a conflicting type. To do this we use an
    // "anyOf" with an array of requires. This augmentation expresses that the
    // schema should match if any of the keys in the schema are present on the
    // object and pass validation.

    if (option.properties) {
      // Create an "anyOf" schema that requires at least one of the keys in the
      // "properties" object
      var requiresAnyOf = {
        anyOf: Object.keys(option.properties).map(function (key) {
          return {
            required: [key]
          };
        })
      };
      var augmentedSchema = void 0; // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"

      if (option.anyOf) {
        // Create a shallow clone of the option
        var shallowClone = _extends({}, option);

        if (!shallowClone.allOf) {
          shallowClone.allOf = [];
        } else {
          // If "allOf" already exists, shallow clone the array
          shallowClone.allOf = shallowClone.allOf.slice();
        }

        shallowClone.allOf.push(requiresAnyOf);
        augmentedSchema = shallowClone;
      } else {
        augmentedSchema = Object.assign({}, option, requiresAnyOf);
      } // Remove the "required" field as it's likely that not all fields have
      // been filled in yet, which will mean that the schema is not valid


      delete augmentedSchema.required;

      if ((0, _validate.isValid)(augmentedSchema, formData, rootSchema)) {
        return _i2;
      }
    } else if ((0, _validate.isValid)(option, formData, rootSchema)) {
      return _i2;
    }
  }

  return 0;
} // Check to see if a schema specifies that a value must be true


function schemaRequiresTrueValue(schema) {
  // Check if const is a truthy value
  if (schema["const"]) {
    return true;
  } // Check if an enum has a single value of true


  if (schema["enum"] && schema["enum"].length === 1 && schema["enum"][0] === true) {
    return true;
  } // If anyOf has a single value, evaluate the subschema


  if (schema.anyOf && schema.anyOf.length === 1) {
    return schemaRequiresTrueValue(schema.anyOf[0]);
  } // If oneOf has a single value, evaluate the subschema


  if (schema.oneOf && schema.oneOf.length === 1) {
    return schemaRequiresTrueValue(schema.oneOf[0]);
  } // Evaluate each subschema in allOf, to see if one of them requires a true
  // value


  if (schema.allOf) {
    return schema.allOf.some(schemaRequiresTrueValue);
  }

  return false;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJjaGVja2JveCIsInJhZGlvIiwic2VsZWN0IiwiaGlkZGVuIiwic3RyaW5nIiwidGV4dCIsInBhc3N3b3JkIiwiZW1haWwiLCJob3N0bmFtZSIsImlwdjQiLCJpcHY2IiwidXJpIiwidGV4dGFyZWEiLCJkYXRlIiwiZGF0ZXRpbWUiLCJjb2xvciIsImZpbGUiLCJudW1iZXIiLCJ1cGRvd24iLCJyYW5nZSIsImludGVnZXIiLCJhcnJheSIsImNoZWNrYm94ZXMiLCJmaWxlcyIsImNhbkV4cGFuZCIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybURhdGEiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImdldFVpT3B0aW9ucyIsImV4cGFuZGFibGUiLCJtYXhQcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImdldERlZmF1bHRSZWdpc3RyeSIsImZpZWxkcyIsIndpZGdldHMiLCJkZWZpbml0aW9ucyIsInJvb3RTY2hlbWEiLCJmb3JtQ29udGV4dCIsImdldFNjaGVtYVR5cGUiLCJ0eXBlIiwiZ3Vlc3NUeXBlIiwicHJvcGVydGllcyIsIkFycmF5IiwiaW5jbHVkZXMiLCJmaW5kIiwiZ2V0V2lkZ2V0Iiwid2lkZ2V0IiwicmVnaXN0ZXJlZFdpZGdldHMiLCJtZXJnZU9wdGlvbnMiLCJXaWRnZXQiLCJNZXJnZWRXaWRnZXQiLCJkZWZhdWx0T3B0aW9ucyIsImRlZmF1bHRQcm9wcyIsIm9wdGlvbnMiLCJwcm9wcyIsIlJlYWN0SXMiLCJpc0ZvcndhcmRSZWYiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJpc01lbW8iLCJFcnJvciIsImhhc093blByb3BlcnR5IiwicmVnaXN0ZXJlZFdpZGdldCIsImhhc1dpZGdldCIsImUiLCJtZXNzYWdlIiwic3RhcnRzV2l0aCIsImNvbXB1dGVEZWZhdWx0cyIsIl9zY2hlbWEiLCJwYXJlbnREZWZhdWx0cyIsInJhd0Zvcm1EYXRhIiwiaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyIsImlzT2JqZWN0IiwiZGVmYXVsdHMiLCJtZXJnZU9iamVjdHMiLCJyZWZTY2hlbWEiLCJmaW5kU2NoZW1hRGVmaW5pdGlvbiIsIiRyZWYiLCJyZXNvbHZlZFNjaGVtYSIsInJlc29sdmVEZXBlbmRlbmNpZXMiLCJpc0ZpeGVkSXRlbXMiLCJpdGVtcyIsIm1hcCIsIml0ZW1TY2hlbWEiLCJpZHgiLCJpc0FycmF5Iiwib25lT2YiLCJnZXRNYXRjaGluZ09wdGlvbiIsImFueU9mIiwicmVkdWNlIiwiYWNjIiwia2V5IiwiY29tcHV0ZWREZWZhdWx0IiwiaXRlbSIsImFkZGl0aW9uYWxJdGVtcyIsIm1pbkl0ZW1zIiwiaXNNdWx0aVNlbGVjdCIsImRlZmF1bHRzTGVuZ3RoIiwiZGVmYXVsdEVudHJpZXMiLCJmaWxsZXJTY2hlbWEiLCJmaWxsZXJFbnRyaWVzIiwiY29uY2F0IiwiZ2V0RGVmYXVsdEZvcm1TdGF0ZSIsInJldHJpZXZlU2NoZW1hIiwibWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YSIsInZhbHVlIiwiYXNzaWduIiwiZmlsdGVyIiwiaW5kZXhPZiIsImNvbnNvbGUiLCJ3YXJuIiwiY29tcG9uZW50Iiwic3Vic3RyaW5nIiwiZ2V0RGlzcGxheUxhYmVsIiwidWlPcHRpb25zIiwibGFiZWwiLCJkaXNwbGF5TGFiZWwiLCJzY2hlbWFUeXBlIiwiaXNGaWxlc0FycmF5IiwidGhpbmciLCJGaWxlIiwib2JqMSIsIm9iajIiLCJjb25jYXRBcnJheXMiLCJsZWZ0IiwicmlnaHQiLCJhc051bWJlciIsInRlc3QiLCJuIiwiTnVtYmVyIiwidmFsaWQiLCJpc05hTiIsIm9yZGVyUHJvcGVydGllcyIsIm9yZGVyIiwiYXJyYXlUb0hhc2giLCJhcnIiLCJwcmV2IiwiY3VyciIsImVycm9yUHJvcExpc3QiLCJqb2luIiwicHJvcGVydHlIYXNoIiwib3JkZXJGaWx0ZXJlZCIsInByb3AiLCJvcmRlckhhc2giLCJyZXN0IiwicmVzdEluZGV4IiwibGFzdEluZGV4T2YiLCJjb21wbGV0ZSIsInNwbGljZSIsImlzQ29uc3RhbnQiLCJ0b0NvbnN0YW50IiwiaXNTZWxlY3QiLCJhbHRTY2hlbWFzIiwiZXZlcnkiLCJ1bmlxdWVJdGVtcyIsIml0ZW1zU2NoZW1hIiwiZm9ybWF0IiwiYWxsb3dBZGRpdGlvbmFsSXRlbXMiLCJvcHRpb25zTGlzdCIsImkiLCJlbnVtTmFtZXMiLCJTdHJpbmciLCJ0aXRsZSIsIm9yaWdSZWYiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjdXJyZW50IiwianNvbnBvaW50ZXIiLCJnZXQiLCJzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyIsImZvckVhY2giLCJyZXNvbHZlU2NoZW1hIiwicmVzb2x2ZVJlZmVyZW5jZSIsImFsbE9mIiwiYWxsT2ZTdWJzY2hlbWEiLCIkcmVmU2NoZW1hIiwibG9jYWxTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZiIsImhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVwZW5kZW5jaWVzIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsImRlcGVuZGVuY3lLZXkiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZW1haW5pbmdEZXBlbmRlbmNpZXMiLCJ3aXRoRGVwZW5kZW50UHJvcGVydGllcyIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJhZGRpdGlvbmFsbHlSZXF1aXJlZCIsInJlcXVpcmVkIiwiZnJvbSIsIlNldCIsImRlcGVuZGVudFNjaGVtYSIsIm1lcmdlU2NoZW1hcyIsInJlc29sdmVkT25lT2YiLCJzdWJzY2hlbWEiLCJ3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSIsInZhbGlkU3Vic2NoZW1hcyIsImNvbmRpdGlvblByb3BlcnR5U2NoZW1hIiwiY29uZGl0aW9uU2NoZW1hIiwiZXJyb3JzIiwiZGVwZW5kZW50U3Vic2NoZW1hIiwiaXNBcmd1bWVudHMiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJkZWVwRXF1YWxzIiwiYSIsImIiLCJjYSIsImNiIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJzb3VyY2UiLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJsYXN0SW5kZXgiLCJpZ25vcmVDYXNlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsImthIiwia2IiLCJjYWwiLCJwdXNoIiwic29ydCIsImoiLCJrIiwicG9wIiwic2hvdWxkUmVuZGVyIiwiY29tcCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwidG9JZFNjaGVtYSIsImlkIiwiaWRQcmVmaXgiLCJpZFNjaGVtYSIsIiRpZCIsIm5hbWUiLCJmaWVsZCIsImZpZWxkSWQiLCJ0b1BhdGhTY2hlbWEiLCJwYXRoU2NoZW1hIiwiJG5hbWUiLCJyZXBsYWNlIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWxlbWVudCIsInByb3BlcnR5IiwicGFyc2VEYXRlU3RyaW5nIiwiZGF0ZVN0cmluZyIsImluY2x1ZGVUaW1lIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInRvRGF0ZVN0cmluZyIsInRpbWUiLCJ1dGNUaW1lIiwiVVRDIiwidG9KU09OIiwidXRjVG9Mb2NhbCIsImpzb25EYXRlIiwieXl5eSIsInBhZCIsImdldEZ1bGxZZWFyIiwiTU0iLCJnZXRNb250aCIsImRkIiwiZ2V0RGF0ZSIsImhoIiwiZ2V0SG91cnMiLCJtbSIsImdldE1pbnV0ZXMiLCJzcyIsImdldFNlY29uZHMiLCJTU1MiLCJnZXRNaWxsaXNlY29uZHMiLCJsb2NhbFRvVVRDIiwibnVtIiwic2l6ZSIsInMiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsInNwbGl0dGVkIiwic3BsaXQiLCJwYXJhbXMiLCJwYXJhbSIsImJpbmFyeSIsImF0b2IiLCJjaGFyQ29kZUF0IiwiYmxvYiIsIndpbmRvdyIsIkJsb2IiLCJVaW50OEFycmF5IiwicmFuZ2VTcGVjIiwic3BlYyIsIm11bHRpcGxlT2YiLCJzdGVwIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJvcHRpb24iLCJyZXF1aXJlc0FueU9mIiwiYXVnbWVudGVkU2NoZW1hIiwic2hhbGxvd0Nsb25lIiwic2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUiLCJzb21lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLHdCQUF3QixHQUFHLHVCQUFqQzs7QUFFUCxJQUFNQyxTQUFTLEdBQUc7QUFDaEIsYUFBUztBQUNQQyxJQUFBQSxRQUFRLEVBQUUsZ0JBREg7QUFFUEMsSUFBQUEsS0FBSyxFQUFFLGFBRkE7QUFHUEMsSUFBQUEsTUFBTSxFQUFFLGNBSEQ7QUFJUEMsSUFBQUEsTUFBTSxFQUFFO0FBSkQsR0FETztBQU9oQkMsRUFBQUEsTUFBTSxFQUFFO0FBQ05DLElBQUFBLElBQUksRUFBRSxZQURBO0FBRU5DLElBQUFBLFFBQVEsRUFBRSxnQkFGSjtBQUdOQyxJQUFBQSxLQUFLLEVBQUUsYUFIRDtBQUlOQyxJQUFBQSxRQUFRLEVBQUUsWUFKSjtBQUtOQyxJQUFBQSxJQUFJLEVBQUUsWUFMQTtBQU1OQyxJQUFBQSxJQUFJLEVBQUUsWUFOQTtBQU9OQyxJQUFBQSxHQUFHLEVBQUUsV0FQQztBQVFOLGdCQUFZLFlBUk47QUFTTlYsSUFBQUEsS0FBSyxFQUFFLGFBVEQ7QUFVTkMsSUFBQUEsTUFBTSxFQUFFLGNBVkY7QUFXTlUsSUFBQUEsUUFBUSxFQUFFLGdCQVhKO0FBWU5ULElBQUFBLE1BQU0sRUFBRSxjQVpGO0FBYU5VLElBQUFBLElBQUksRUFBRSxZQWJBO0FBY05DLElBQUFBLFFBQVEsRUFB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Q0FBUDtBQUNEOztBQUVELFNBQU8sS0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgUmVhY3RJcyBmcm9tIFwicmVhY3QtaXNcIjtcbmltcG9ydCBtZXJnZUFsbE9mIGZyb20gXCJqc29uLXNjaGVtYS1tZXJnZS1hbGxvZlwiO1xuaW1wb3J0IGZpbGwgZnJvbSBcImNvcmUtanMtcHVyZS9mZWF0dXJlcy9hcnJheS9maWxsXCI7XG5pbXBvcnQgdW5pb24gZnJvbSBcImxvZGFzaC91bmlvblwiO1xuaW1wb3J0IGpzb25wb2ludGVyIGZyb20gXCJqc29ucG9pbnRlclwiO1xuaW1wb3J0IGZpZWxkcyBmcm9tIFwiLi9jb21wb25lbnRzL2ZpZWxkc1wiO1xuaW1wb3J0IHdpZGdldHMgZnJvbSBcIi4vY29tcG9uZW50cy93aWRnZXRzXCI7XG5pbXBvcnQgdmFsaWRhdGVGb3JtRGF0YSwgeyBpc1ZhbGlkIH0gZnJvbSBcIi4vdmFsaWRhdGVcIjtcblxuZXhwb3J0IGNvbnN0IEFERElUSU9OQUxfUFJPUEVSVFlfRkxBRyA9IFwiX19hZGRpdGlvbmFsX3Byb3BlcnR5XCI7XG5cbmNvbnN0IHdpZGdldE1hcCA9IHtcbiAgYm9vbGVhbjoge1xuICAgIGNoZWNrYm94OiBcIkNoZWNrYm94V2lkZ2V0XCIsXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxuICB9LFxuICBzdHJpbmc6IHtcbiAgICB0ZXh0OiBcIlRleHRXaWRnZXRcIixcbiAgICBwYXNzd29yZDogXCJQYXNzd29yZFdpZGdldFwiLFxuICAgIGVtYWlsOiBcIkVtYWlsV2lkZ2V0XCIsXG4gICAgaG9zdG5hbWU6IFwiVGV4dFdpZGdldFwiLFxuICAgIGlwdjQ6IFwiVGV4dFdpZGdldFwiLFxuICAgIGlwdjY6IFwiVGV4dFdpZGdldFwiLFxuICAgIHVyaTogXCJVUkxXaWRnZXRcIixcbiAgICBcImRhdGEtdXJsXCI6IFwiRmlsZVdpZGdldFwiLFxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxuICAgIHRleHRhcmVhOiBcIlRleHRhcmVhV2lkZ2V0XCIsXG4gICAgaGlkZGVuOiBcIkhpZGRlbldpZGdldFwiLFxuICAgIGRhdGU6IFwiRGF0ZVdpZGdldFwiLFxuICAgIGRhdGV0aW1lOiBcIkRhdGVUaW1lV2lkZ2V0XCIsXG4gICAgXCJkYXRlLXRpbWVcIjogXCJEYXRlVGltZVdpZGdldFwiLFxuICAgIFwiYWx0LWRhdGVcIjogXCJBbHREYXRlV2lkZ2V0XCIsXG4gICAgXCJhbHQtZGF0ZXRpbWVcIjogXCJBbHREYXRlVGltZVdpZGdldFwiLFxuICAgIGNvbG9yOiBcIkNvbG9yV2lkZ2V0XCIsXG4gICAgZmlsZTogXCJGaWxlV2lkZ2V0XCIsXG4gIH0sXG4gIG51bWJlcjoge1xuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcbiAgICB1cGRvd246IFwiVXBEb3duV2lkZ2V0XCIsXG4gICAgcmFuZ2U6IFwiUmFuZ2VXaWRnZXRcIixcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcbiAgfSxcbiAgaW50ZWdlcjoge1xuICAgIHRleHQ6IFwiVGV4dFdpZGdldFwiLFxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcbiAgICB1cGRvd246IFwiVXBEb3duV2lkZ2V0XCIsXG4gICAgcmFuZ2U6IFwiUmFuZ2VXaWRnZXRcIixcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcbiAgfSxcbiAgYXJyYXk6IHtcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXG4gICAgY2hlY2tib3hlczogXCJDaGVja2JveGVzV2lkZ2V0XCIsXG4gICAgZmlsZXM6IFwiRmlsZVdpZGdldFwiLFxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5FeHBhbmQoc2NoZW1hLCB1aVNjaGVtYSwgZm9ybURhdGEpIHtcbiAgaWYgKCFzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgeyBleHBhbmRhYmxlIH0gPSBnZXRVaU9wdGlvbnModWlTY2hlbWEpO1xuICBpZiAoZXhwYW5kYWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZXhwYW5kYWJsZTtcbiAgfVxuICAvLyBpZiB1aTpvcHRpb25zLmV4cGFuZGFibGUgd2FzIG5vdCBleHBsaWNpdGx5IHNldCB0byBmYWxzZSwgd2UgY2FuIGFkZFxuICAvLyBhbm90aGVyIHByb3BlcnR5IGlmIHdlIGhhdmUgbm90IGV4Y2VlZGVkIG1heFByb3BlcnRpZXMgeWV0XG4gIGlmIChzY2hlbWEubWF4UHJvcGVydGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGZvcm1EYXRhKS5sZW5ndGggPCBzY2hlbWEubWF4UHJvcGVydGllcztcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRSZWdpc3RyeSgpIHtcbiAgcmV0dXJuIHtcbiAgICBmaWVsZHMsXG4gICAgd2lkZ2V0cyxcbiAgICBkZWZpbml0aW9uczoge30sXG4gICAgcm9vdFNjaGVtYToge30sXG4gICAgZm9ybUNvbnRleHQ6IHt9LFxuICB9O1xufVxuXG4vKiBHZXRzIHRoZSB0eXBlIG9mIGEgZ2l2ZW4gc2NoZW1hLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNjaGVtYVR5cGUoc2NoZW1hKSB7XG4gIGxldCB7IHR5cGUgfSA9IHNjaGVtYTtcblxuICBpZiAoIXR5cGUgJiYgc2NoZW1hLmNvbnN0KSB7XG4gICAgcmV0dXJuIGd1ZXNzVHlwZShzY2hlbWEuY29uc3QpO1xuICB9XG5cbiAgaWYgKCF0eXBlICYmIHNjaGVtYS5lbnVtKSB7XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH1cblxuICBpZiAoIXR5cGUgJiYgKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcykpIHtcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcbiAgfVxuXG4gIGlmICh0eXBlIGluc3RhbmNlb2YgQXJyYXkgJiYgdHlwZS5sZW5ndGggPT09IDIgJiYgdHlwZS5pbmNsdWRlcyhcIm51bGxcIikpIHtcbiAgICByZXR1cm4gdHlwZS5maW5kKHR5cGUgPT4gdHlwZSAhPT0gXCJudWxsXCIpO1xuICB9XG5cbiAgcmV0dXJuIHR5cGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzID0ge30pIHtcbiAgY29uc3QgdHlwZSA9IGdldFNjaGVtYVR5cGUoc2NoZW1hKTtcblxuICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMoV2lkZ2V0KSB7XG4gICAgLy8gY2FjaGUgcmV0dXJuIHZhbHVlIGFzIHByb3BlcnR5IG9mIHdpZGdldCBmb3IgcHJvcGVyIHJlYWN0IHJlY29uY2lsaWF0aW9uXG4gICAgaWYgKCFXaWRnZXQuTWVyZ2VkV2lkZ2V0KSB7XG4gICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9XG4gICAgICAgIChXaWRnZXQuZGVmYXVsdFByb3BzICYmIFdpZGdldC5kZWZhdWx0UHJvcHMub3B0aW9ucykgfHwge307XG4gICAgICBXaWRnZXQuTWVyZ2VkV2lkZ2V0ID0gKHsgb3B0aW9ucyA9IHt9LCAuLi5wcm9wcyB9KSA9PiAoXG4gICAgICAgIDxXaWRnZXQgb3B0aW9ucz17eyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9fSB7Li4ucHJvcHN9IC8+XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gV2lkZ2V0Lk1lcmdlZFdpZGdldDtcbiAgfVxuXG4gIGlmIChcbiAgICB0eXBlb2Ygd2lkZ2V0ID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICBSZWFjdElzLmlzRm9yd2FyZFJlZihSZWFjdC5jcmVhdGVFbGVtZW50KHdpZGdldCkpIHx8XG4gICAgUmVhY3RJcy5pc01lbW8od2lkZ2V0KVxuICApIHtcbiAgICByZXR1cm4gbWVyZ2VPcHRpb25zKHdpZGdldCk7XG4gIH1cblxuICBpZiAodHlwZW9mIHdpZGdldCAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgd2lkZ2V0IGRlZmluaXRpb246ICR7dHlwZW9mIHdpZGdldH1gKTtcbiAgfVxuXG4gIGlmIChyZWdpc3RlcmVkV2lkZ2V0cy5oYXNPd25Qcm9wZXJ0eSh3aWRnZXQpKSB7XG4gICAgY29uc3QgcmVnaXN0ZXJlZFdpZGdldCA9IHJlZ2lzdGVyZWRXaWRnZXRzW3dpZGdldF07XG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcbiAgfVxuXG4gIGlmICghd2lkZ2V0TWFwLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyB3aWRnZXQgZm9yIHR5cGUgXCIke3R5cGV9XCJgKTtcbiAgfVxuXG4gIGlmICh3aWRnZXRNYXBbdHlwZV0uaGFzT3duUHJvcGVydHkod2lkZ2V0KSkge1xuICAgIGNvbnN0IHJlZ2lzdGVyZWRXaWRnZXQgPSByZWdpc3RlcmVkV2lkZ2V0c1t3aWRnZXRNYXBbdHlwZV1bd2lkZ2V0XV07XG4gICAgcmV0dXJuIGdldFdpZGdldChzY2hlbWEsIHJlZ2lzdGVyZWRXaWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgTm8gd2lkZ2V0IFwiJHt3aWRnZXR9XCIgZm9yIHR5cGUgXCIke3R5cGV9XCJgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc1dpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMgPSB7fSkge1xuICB0cnkge1xuICAgIGdldFdpZGdldChzY2hlbWEsIHdpZGdldCwgcmVnaXN0ZXJlZFdpZGdldHMpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKFxuICAgICAgZS5tZXNzYWdlICYmXG4gICAgICAoZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCJObyB3aWRnZXRcIikgfHxcbiAgICAgICAgZS5tZXNzYWdlLnN0YXJ0c1dpdGgoXCJVbnN1cHBvcnRlZCB3aWRnZXRcIikpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRocm93IGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZURlZmF1bHRzKFxuICBfc2NoZW1hLFxuICBwYXJlbnREZWZhdWx0cyxcbiAgcm9vdFNjaGVtYSxcbiAgcmF3Rm9ybURhdGEgPSB7fSxcbiAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyA9IGZhbHNlXG4pIHtcbiAgbGV0IHNjaGVtYSA9IGlzT2JqZWN0KF9zY2hlbWEpID8gX3NjaGVtYSA6IHt9O1xuICBjb25zdCBmb3JtRGF0YSA9IGlzT2JqZWN0KHJhd0Zvcm1EYXRhKSA/IHJhd0Zvcm1EYXRhIDoge307XG4gIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIHJlY3Vyc2l2ZWx5OiBnaXZlIGhpZ2hlc3QgcHJpb3JpdHkgdG8gZGVlcGVzdCBub2Rlcy5cbiAgbGV0IGRlZmF1bHRzID0gcGFyZW50RGVmYXVsdHM7XG4gIGlmIChpc09iamVjdChkZWZhdWx0cykgJiYgaXNPYmplY3Qoc2NoZW1hLmRlZmF1bHQpKSB7XG4gICAgLy8gRm9yIG9iamVjdCBkZWZhdWx0cywgb25seSBvdmVycmlkZSBwYXJlbnQgZGVmYXVsdHMgdGhhdCBhcmUgZGVmaW5lZCBpblxuICAgIC8vIHNjaGVtYS5kZWZhdWx0LlxuICAgIGRlZmF1bHRzID0gbWVyZ2VPYmplY3RzKGRlZmF1bHRzLCBzY2hlbWEuZGVmYXVsdCk7XG4gIH0gZWxzZSBpZiAoXCJkZWZhdWx0XCIgaW4gc2NoZW1hKSB7XG4gICAgLy8gVXNlIHNjaGVtYSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLlxuICAgIGRlZmF1bHRzID0gc2NoZW1hLmRlZmF1bHQ7XG4gIH0gZWxzZSBpZiAoXCIkcmVmXCIgaW4gc2NoZW1hKSB7XG4gICAgLy8gVXNlIHJlZmVyZW5jZWQgc2NoZW1hIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUuXG4gICAgY29uc3QgcmVmU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oc2NoZW1hLiRyZWYsIHJvb3RTY2hlbWEpO1xuICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXG4gICAgICByZWZTY2hlbWEsXG4gICAgICBkZWZhdWx0cyxcbiAgICAgIHJvb3RTY2hlbWEsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcbiAgICApO1xuICB9IGVsc2UgaWYgKFwiZGVwZW5kZW5jaWVzXCIgaW4gc2NoZW1hKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXG4gICAgICByZXNvbHZlZFNjaGVtYSxcbiAgICAgIGRlZmF1bHRzLFxuICAgICAgcm9vdFNjaGVtYSxcbiAgICAgIGZvcm1EYXRhLFxuICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xuICAgICk7XG4gIH0gZWxzZSBpZiAoaXNGaXhlZEl0ZW1zKHNjaGVtYSkpIHtcbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5pdGVtcy5tYXAoKGl0ZW1TY2hlbWEsIGlkeCkgPT5cbiAgICAgIGNvbXB1dGVEZWZhdWx0cyhcbiAgICAgICAgaXRlbVNjaGVtYSxcbiAgICAgICAgQXJyYXkuaXNBcnJheShwYXJlbnREZWZhdWx0cykgPyBwYXJlbnREZWZhdWx0c1tpZHhdIDogdW5kZWZpbmVkLFxuICAgICAgICByb290U2NoZW1hLFxuICAgICAgICBmb3JtRGF0YSxcbiAgICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xuICAgICAgKVxuICAgICk7XG4gIH0gZWxzZSBpZiAoXCJvbmVPZlwiIGluIHNjaGVtYSkge1xuICAgIHNjaGVtYSA9XG4gICAgICBzY2hlbWEub25lT2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEub25lT2YsIHJvb3RTY2hlbWEpXTtcbiAgfSBlbHNlIGlmIChcImFueU9mXCIgaW4gc2NoZW1hKSB7XG4gICAgc2NoZW1hID1cbiAgICAgIHNjaGVtYS5hbnlPZltnZXRNYXRjaGluZ09wdGlvbih1bmRlZmluZWQsIHNjaGVtYS5hbnlPZiwgcm9vdFNjaGVtYSldO1xuICB9XG5cbiAgLy8gTm90IGRlZmF1bHRzIGRlZmluZWQgZm9yIHRoaXMgbm9kZSwgZmFsbGJhY2sgdG8gZ2VuZXJpYyB0eXBlZCBvbmVzLlxuICBpZiAodHlwZW9mIGRlZmF1bHRzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZGVmYXVsdHMgPSBzY2hlbWEuZGVmYXVsdDtcbiAgfVxuXG4gIHN3aXRjaCAoZ2V0U2NoZW1hVHlwZShzY2hlbWEpKSB7XG4gICAgLy8gV2UgbmVlZCB0byByZWN1ciBmb3Igb2JqZWN0IHNjaGVtYSBpbm5lciBkZWZhdWx0IHZhbHVlcy5cbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMgfHwge30pLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZSwgd2l0aCB0aGUgcGFyZW50IGRlZmF1bHRzIHdlIG1pZ2h0XG4gICAgICAgIC8vIGhhdmUgZnJvbSBhIHByZXZpb3VzIHJ1bjogZGVmYXVsdHNba2V5XS5cbiAgICAgICAgbGV0IGNvbXB1dGVkRGVmYXVsdCA9IGNvbXB1dGVEZWZhdWx0cyhcbiAgICAgICAgICBzY2hlbWEucHJvcGVydGllc1trZXldLFxuICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlba2V5XSxcbiAgICAgICAgICByb290U2NoZW1hLFxuICAgICAgICAgIChmb3JtRGF0YSB8fCB7fSlba2V5XSxcbiAgICAgICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpbmNsdWRlVW5kZWZpbmVkVmFsdWVzIHx8IGNvbXB1dGVkRGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWNjW2tleV0gPSBjb21wdXRlZERlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcblxuICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgLy8gSW5qZWN0IGRlZmF1bHRzIGludG8gZXhpc3RpbmcgYXJyYXkgZGVmYXVsdHNcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRlZmF1bHRzKSkge1xuICAgICAgICBkZWZhdWx0cyA9IGRlZmF1bHRzLm1hcCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcbiAgICAgICAgICAgIHNjaGVtYS5pdGVtc1tpZHhdIHx8IHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgfHwge30sXG4gICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgcm9vdFNjaGVtYVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBEZWVwbHkgaW5qZWN0IGRlZmF1bHRzIGludG8gYWxyZWFkeSBleGlzdGluZyBmb3JtIGRhdGFcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhd0Zvcm1EYXRhKSkge1xuICAgICAgICBkZWZhdWx0cyA9IHJhd0Zvcm1EYXRhLm1hcCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNvbXB1dGVEZWZhdWx0cyhcbiAgICAgICAgICAgIHNjaGVtYS5pdGVtcyxcbiAgICAgICAgICAgIChkZWZhdWx0cyB8fCB7fSlbaWR4XSxcbiAgICAgICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgICAgICBpdGVtXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc2NoZW1hLm1pbkl0ZW1zKSB7XG4gICAgICAgIGlmICghaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEpKSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdHNMZW5ndGggPSBkZWZhdWx0cyA/IGRlZmF1bHRzLmxlbmd0aCA6IDA7XG4gICAgICAgICAgaWYgKHNjaGVtYS5taW5JdGVtcyA+IGRlZmF1bHRzTGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0RW50cmllcyA9IGRlZmF1bHRzIHx8IFtdO1xuICAgICAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGFycmF5IHdpdGggdGhlIGRlZmF1bHRzXG4gICAgICAgICAgICBjb25zdCBmaWxsZXJTY2hlbWEgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcylcbiAgICAgICAgICAgICAgPyBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zXG4gICAgICAgICAgICAgIDogc2NoZW1hLml0ZW1zO1xuICAgICAgICAgICAgY29uc3QgZmlsbGVyRW50cmllcyA9IGZpbGwoXG4gICAgICAgICAgICAgIG5ldyBBcnJheShzY2hlbWEubWluSXRlbXMgLSBkZWZhdWx0c0xlbmd0aCksXG4gICAgICAgICAgICAgIGNvbXB1dGVEZWZhdWx0cyhmaWxsZXJTY2hlbWEsIGZpbGxlclNjaGVtYS5kZWZhdWx0cywgcm9vdFNjaGVtYSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAvLyB0aGVuIGZpbGwgdXAgdGhlIHJlc3Qgd2l0aCBlaXRoZXIgdGhlIGl0ZW0gZGVmYXVsdCBvciBlbXB0eSwgdXAgdG8gbWluSXRlbXNcblxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFbnRyaWVzLmNvbmNhdChmaWxsZXJFbnRyaWVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHRzID8gZGVmYXVsdHMgOiBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICB9XG4gIHJldHVybiBkZWZhdWx0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRGb3JtU3RhdGUoXG4gIF9zY2hlbWEsXG4gIGZvcm1EYXRhLFxuICByb290U2NoZW1hID0ge30sXG4gIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgPSBmYWxzZVxuKSB7XG4gIGlmICghaXNPYmplY3QoX3NjaGVtYSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNjaGVtYTogXCIgKyBfc2NoZW1hKTtcbiAgfVxuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XG4gIGNvbnN0IGRlZmF1bHRzID0gY29tcHV0ZURlZmF1bHRzKFxuICAgIHNjaGVtYSxcbiAgICBfc2NoZW1hLmRlZmF1bHQsXG4gICAgcm9vdFNjaGVtYSxcbiAgICBmb3JtRGF0YSxcbiAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXG4gICk7XG4gIGlmICh0eXBlb2YgZm9ybURhdGEgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyBObyBmb3JtIGRhdGE/IFVzZSBzY2hlbWEgZGVmYXVsdHMuXG4gICAgcmV0dXJuIGRlZmF1bHRzO1xuICB9XG4gIGlmIChpc09iamVjdChmb3JtRGF0YSkgfHwgQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcbiAgICByZXR1cm4gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0cywgZm9ybURhdGEpO1xuICB9XG4gIGlmIChmb3JtRGF0YSA9PT0gMCB8fCBmb3JtRGF0YSA9PT0gZmFsc2UgfHwgZm9ybURhdGEgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cbiAgcmV0dXJuIGZvcm1EYXRhIHx8IGRlZmF1bHRzO1xufVxuXG4vKipcbiAqIFdoZW4gbWVyZ2luZyBkZWZhdWx0cyBhbmQgZm9ybSBkYXRhLCB3ZSB3YW50IHRvIG1lcmdlIGluIHRoaXMgc3BlY2lmaWMgd2F5OlxuICogLSBvYmplY3RzIGFyZSBkZWVwbHkgbWVyZ2VkXG4gKiAtIGFycmF5cyBhcmUgbWVyZ2VkIGluIHN1Y2ggYSB3YXkgdGhhdDpcbiAqICAgLSB3aGVuIHRoZSBhcnJheSBpcyBzZXQgaW4gZm9ybSBkYXRhLCBvbmx5IGFycmF5IGVudHJpZXMgc2V0IGluIGZvcm0gZGF0YVxuICogICAgIGFyZSBkZWVwbHkgbWVyZ2VkOyBhZGRpdGlvbmFsIGVudHJpZXMgZnJvbSB0aGUgZGVmYXVsdHMgYXJlIGlnbm9yZWRcbiAqICAgLSB3aGVuIHRoZSBhcnJheSBpcyBub3Qgc2V0IGluIGZvcm0gZGF0YSwgdGhlIGRlZmF1bHQgaXMgY29waWVkIG92ZXJcbiAqIC0gc2NhbGFycyBhcmUgb3ZlcndyaXR0ZW4vc2V0IGJ5IGZvcm0gZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShkZWZhdWx0cywgZm9ybURhdGEpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGRlZmF1bHRzKSkge1xuICAgICAgZGVmYXVsdHMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1EYXRhLm1hcCgodmFsdWUsIGlkeCkgPT4ge1xuICAgICAgaWYgKGRlZmF1bHRzW2lkeF0pIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHNbaWR4XSwgdmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGZvcm1EYXRhKSkge1xuICAgIGNvbnN0IGFjYyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzKTsgLy8gUHJldmVudCBtdXRhdGlvbiBvZiBzb3VyY2Ugb2JqZWN0LlxuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgYWNjW2tleV0gPSBtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhKFxuICAgICAgICBkZWZhdWx0cyA/IGRlZmF1bHRzW2tleV0gOiB7fSxcbiAgICAgICAgZm9ybURhdGFba2V5XVxuICAgICAgKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgYWNjKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVpT3B0aW9ucyh1aVNjaGVtYSkge1xuICAvLyBnZXQgYWxsIHBhc3NlZCBvcHRpb25zIGZyb20gdWk6d2lkZ2V0LCB1aTpvcHRpb25zLCBhbmQgdWk6PG9wdGlvbk5hbWU+XG4gIHJldHVybiBPYmplY3Qua2V5cyh1aVNjaGVtYSlcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5kZXhPZihcInVpOlwiKSA9PT0gMClcbiAgICAucmVkdWNlKChvcHRpb25zLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdWlTY2hlbWFba2V5XTtcbiAgICAgIGlmIChrZXkgPT09IFwidWk6d2lkZ2V0XCIgJiYgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIlNldHRpbmcgb3B0aW9ucyB2aWEgdWk6d2lkZ2V0IG9iamVjdCBpcyBkZXByZWNhdGVkLCB1c2UgdWk6b3B0aW9ucyBpbnN0ZWFkXCJcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIC4uLih2YWx1ZS5vcHRpb25zIHx8IHt9KSxcbiAgICAgICAgICB3aWRnZXQ6IHZhbHVlLmNvbXBvbmVudCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09IFwidWk6b3B0aW9uc1wiICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4geyAuLi5vcHRpb25zLCAuLi52YWx1ZSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgW2tleS5zdWJzdHJpbmcoMyldOiB2YWx1ZSB9O1xuICAgIH0sIHt9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3BsYXlMYWJlbChzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hKSB7XG4gIGNvbnN0IHVpT3B0aW9ucyA9IGdldFVpT3B0aW9ucyh1aVNjaGVtYSk7XG4gIGxldCB7IGxhYmVsOiBkaXNwbGF5TGFiZWwgPSB0cnVlIH0gPSB1aU9wdGlvbnM7XG4gIGNvbnN0IHNjaGVtYVR5cGUgPSBnZXRTY2hlbWFUeXBlKHNjaGVtYSk7XG5cbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwiYXJyYXlcIikge1xuICAgIGRpc3BsYXlMYWJlbCA9XG4gICAgICBpc011bHRpU2VsZWN0KHNjaGVtYSwgcm9vdFNjaGVtYSkgfHxcbiAgICAgIGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hKTtcbiAgfVxuXG4gIGlmIChzY2hlbWFUeXBlID09PSBcIm9iamVjdFwiKSB7XG4gICAgZGlzcGxheUxhYmVsID0gZmFsc2U7XG4gIH1cbiAgaWYgKHNjaGVtYVR5cGUgPT09IFwiYm9vbGVhblwiICYmICF1aVNjaGVtYVtcInVpOndpZGdldFwiXSkge1xuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xuICB9XG4gIGlmICh1aVNjaGVtYVtcInVpOmZpZWxkXCJdKSB7XG4gICAgZGlzcGxheUxhYmVsID0gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRpc3BsYXlMYWJlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHRoaW5nKSB7XG4gIGlmICh0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGluZyBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gXCJvYmplY3RcIiAmJiB0aGluZyAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh0aGluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9iamVjdHMob2JqMSwgb2JqMiwgY29uY2F0QXJyYXlzID0gZmFsc2UpIHtcbiAgLy8gUmVjdXJzaXZlbHkgbWVyZ2UgZGVlcGx5IG5lc3RlZCBvYmplY3RzLlxuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iajIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gb2JqMSA/IG9iajFba2V5XSA6IHt9LFxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XG4gICAgaWYgKG9iajEgJiYgb2JqMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGlzT2JqZWN0KHJpZ2h0KSkge1xuICAgICAgYWNjW2tleV0gPSBtZXJnZU9iamVjdHMobGVmdCwgcmlnaHQsIGNvbmNhdEFycmF5cyk7XG4gICAgfSBlbHNlIGlmIChjb25jYXRBcnJheXMgJiYgQXJyYXkuaXNBcnJheShsZWZ0KSAmJiBBcnJheS5pc0FycmF5KHJpZ2h0KSkge1xuICAgICAgYWNjW2tleV0gPSBsZWZ0LmNvbmNhdChyaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG4gIH0sIGFjYyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc051bWJlcih2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICgvXFwuJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAvLyBcIjMuXCIgY2FuJ3QgcmVhbGx5IGJlIGNvbnNpZGVyZWQgYSBudW1iZXIgZXZlbiBpZiBpdCBwYXJzZXMgaW4ganMuIFRoZVxuICAgIC8vIHVzZXIgaXMgbW9zdCBsaWtlbHkgZW50ZXJpbmcgYSBmbG9hdC5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKC9cXC4wJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAvLyB3ZSBuZWVkIHRvIHJldHVybiB0aGlzIGFzIGEgc3RyaW5nIGhlcmUsIHRvIGFsbG93IGZvciBpbnB1dCBsaWtlIDMuMDdcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgY29uc3QgbiA9IE51bWJlcih2YWx1ZSk7XG4gIGNvbnN0IHZhbGlkID0gdHlwZW9mIG4gPT09IFwibnVtYmVyXCIgJiYgIU51bWJlci5pc05hTihuKTtcblxuICBpZiAoL1xcLlxcZCowJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAvLyBJdCdzIGEgbnVtYmVyLCB0aGF0J3MgY29vbCAtIGJ1dCB3ZSBuZWVkIGl0IGFzIGEgc3RyaW5nIHNvIGl0IGRvZXNuJ3Qgc2NyZXdcbiAgICAvLyB3aXRoIHRoZSB1c2VyIHdoZW4gZW50ZXJpbmcgZG9sbGFyIGFtb3VudHMgb3Igb3RoZXIgdmFsdWVzIChzdWNoIGFzIHRob3NlIHdpdGhcbiAgICAvLyBzcGVjaWZpYyBwcmVjaXNpb24gb3IgbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cylcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdmFsaWQgPyBuIDogdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlclByb3BlcnRpZXMocHJvcGVydGllcywgb3JkZXIpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG9yZGVyKSkge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzO1xuICB9XG5cbiAgY29uc3QgYXJyYXlUb0hhc2ggPSBhcnIgPT5cbiAgICBhcnIucmVkdWNlKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgICBwcmV2W2N1cnJdID0gdHJ1ZTtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0sIHt9KTtcbiAgY29uc3QgZXJyb3JQcm9wTGlzdCA9IGFyciA9PlxuICAgIGFyci5sZW5ndGggPiAxXG4gICAgICA/IGBwcm9wZXJ0aWVzICcke2Fyci5qb2luKFwiJywgJ1wiKX0nYFxuICAgICAgOiBgcHJvcGVydHkgJyR7YXJyWzBdfSdgO1xuICBjb25zdCBwcm9wZXJ0eUhhc2ggPSBhcnJheVRvSGFzaChwcm9wZXJ0aWVzKTtcbiAgY29uc3Qgb3JkZXJGaWx0ZXJlZCA9IG9yZGVyLmZpbHRlcihcbiAgICBwcm9wID0+IHByb3AgPT09IFwiKlwiIHx8IHByb3BlcnR5SGFzaFtwcm9wXVxuICApO1xuICBjb25zdCBvcmRlckhhc2ggPSBhcnJheVRvSGFzaChvcmRlckZpbHRlcmVkKTtcblxuICBjb25zdCByZXN0ID0gcHJvcGVydGllcy5maWx0ZXIocHJvcCA9PiAhb3JkZXJIYXNoW3Byb3BdKTtcbiAgY29uc3QgcmVzdEluZGV4ID0gb3JkZXJGaWx0ZXJlZC5pbmRleE9mKFwiKlwiKTtcbiAgaWYgKHJlc3RJbmRleCA9PT0gLTEpIHtcbiAgICBpZiAocmVzdC5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHVpU2NoZW1hIG9yZGVyIGxpc3QgZG9lcyBub3QgY29udGFpbiAke2Vycm9yUHJvcExpc3QocmVzdCl9YFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIG9yZGVyRmlsdGVyZWQ7XG4gIH1cbiAgaWYgKHJlc3RJbmRleCAhPT0gb3JkZXJGaWx0ZXJlZC5sYXN0SW5kZXhPZihcIipcIikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1aVNjaGVtYSBvcmRlciBsaXN0IGNvbnRhaW5zIG1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgaXRlbVwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbXBsZXRlID0gWy4uLm9yZGVyRmlsdGVyZWRdO1xuICBjb21wbGV0ZS5zcGxpY2UocmVzdEluZGV4LCAxLCAuLi5yZXN0KTtcbiAgcmV0dXJuIGNvbXBsZXRlO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSBnaXZlbiBzY2hlbWEgbWF0Y2hlcyBhIHNpbmdsZVxuICogY29uc3RhbnQgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnN0YW50KHNjaGVtYSkge1xuICByZXR1cm4gKFxuICAgIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpIHx8XG4gICAgc2NoZW1hLmhhc093blByb3BlcnR5KFwiY29uc3RcIilcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvQ29uc3RhbnQoc2NoZW1hKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gc2NoZW1hLmVudW1bMF07XG4gIH0gZWxzZSBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiY29uc3RcIikpIHtcbiAgICByZXR1cm4gc2NoZW1hLmNvbnN0O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcInNjaGVtYSBjYW5ub3QgYmUgaW5mZXJyZWQgYXMgYSBjb25zdGFudFwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTZWxlY3QoX3NjaGVtYSwgcm9vdFNjaGVtYSA9IHt9KSB7XG4gIGNvbnN0IHNjaGVtYSA9IHJldHJpZXZlU2NoZW1hKF9zY2hlbWEsIHJvb3RTY2hlbWEpO1xuICBjb25zdCBhbHRTY2hlbWFzID0gc2NoZW1hLm9uZU9mIHx8IHNjaGVtYS5hbnlPZjtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLmVudW0pKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhbHRTY2hlbWFzKSkge1xuICAgIHJldHVybiBhbHRTY2hlbWFzLmV2ZXJ5KGFsdFNjaGVtYXMgPT4gaXNDb25zdGFudChhbHRTY2hlbWFzKSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xuICBpZiAoIXNjaGVtYS51bmlxdWVJdGVtcyB8fCAhc2NoZW1hLml0ZW1zKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBpc1NlbGVjdChzY2hlbWEuaXRlbXMsIHJvb3RTY2hlbWEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaWxlc0FycmF5KHNjaGVtYSwgdWlTY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xuICBpZiAodWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0gPT09IFwiZmlsZXNcIikge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5pdGVtcykge1xuICAgIGNvbnN0IGl0ZW1zU2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcbiAgICByZXR1cm4gaXRlbXNTY2hlbWEudHlwZSA9PT0gXCJzdHJpbmdcIiAmJiBpdGVtc1NjaGVtYS5mb3JtYXQgPT09IFwiZGF0YS11cmxcIjtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZpeGVkSXRlbXMoc2NoZW1hKSB7XG4gIHJldHVybiAoXG4gICAgQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpICYmXG4gICAgc2NoZW1hLml0ZW1zLmxlbmd0aCA+IDAgJiZcbiAgICBzY2hlbWEuaXRlbXMuZXZlcnkoaXRlbSA9PiBpc09iamVjdChpdGVtKSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsbG93QWRkaXRpb25hbEl0ZW1zKHNjaGVtYSkge1xuICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUud2FybihcImFkZGl0aW9uYWxJdGVtcz10cnVlIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXCIpO1xuICB9XG4gIHJldHVybiBpc09iamVjdChzY2hlbWEuYWRkaXRpb25hbEl0ZW1zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wdGlvbnNMaXN0KHNjaGVtYSkge1xuICBpZiAoc2NoZW1hLmVudW0pIHtcbiAgICByZXR1cm4gc2NoZW1hLmVudW0ubWFwKCh2YWx1ZSwgaSkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSAoc2NoZW1hLmVudW1OYW1lcyAmJiBzY2hlbWEuZW51bU5hbWVzW2ldKSB8fCBTdHJpbmcodmFsdWUpO1xuICAgICAgcmV0dXJuIHsgbGFiZWwsIHZhbHVlIH07XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgYWx0U2NoZW1hcyA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2Y7XG4gICAgcmV0dXJuIGFsdFNjaGVtYXMubWFwKChzY2hlbWEsIGkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdG9Db25zdGFudChzY2hlbWEpO1xuICAgICAgY29uc3QgbGFiZWwgPSBzY2hlbWEudGl0bGUgfHwgU3RyaW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNjaGVtYSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFNjaGVtYURlZmluaXRpb24oJHJlZiwgcm9vdFNjaGVtYSA9IHt9KSB7XG4gIGNvbnN0IG9yaWdSZWYgPSAkcmVmO1xuICBpZiAoJHJlZi5zdGFydHNXaXRoKFwiI1wiKSkge1xuICAgIC8vIERlY29kZSBVUkkgZnJhZ21lbnQgcmVwcmVzZW50YXRpb24uXG4gICAgJHJlZiA9IGRlY29kZVVSSUNvbXBvbmVudCgkcmVmLnN1YnN0cmluZygxKSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIGRlZmluaXRpb24gZm9yICR7b3JpZ1JlZn0uYCk7XG4gIH1cbiAgY29uc3QgY3VycmVudCA9IGpzb25wb2ludGVyLmdldChyb290U2NoZW1hLCAkcmVmKTtcbiAgaWYgKGN1cnJlbnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke29yaWdSZWZ9LmApO1xuICB9XG4gIGlmIChjdXJyZW50Lmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xuICAgIHJldHVybiBmaW5kU2NoZW1hRGVmaW5pdGlvbihjdXJyZW50LiRyZWYsIHJvb3RTY2hlbWEpO1xuICB9XG4gIHJldHVybiBjdXJyZW50O1xufVxuXG4vLyBJbiB0aGUgY2FzZSB3aGVyZSB3ZSBoYXZlIHRvIGltcGxpY2l0bHkgY3JlYXRlIGEgc2NoZW1hLCBpdCBpcyB1c2VmdWwgdG8ga25vdyB3aGF0IHR5cGUgdG8gdXNlXG4vLyAgYmFzZWQgb24gdGhlIGRhdGEgd2UgYXJlIGRlZmluaW5nXG5leHBvcnQgY29uc3QgZ3Vlc3NUeXBlID0gZnVuY3Rpb24gZ3Vlc3NUeXBlKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBcImFycmF5XCI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBcIm51bGxcIjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIFwiYm9vbGVhblwiO1xuICB9IGVsc2UgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICByZXR1cm4gXCJudW1iZXJcIjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gXCJvYmplY3RcIjtcbiAgfVxuICAvLyBEZWZhdWx0IHRvIHN0cmluZyBpZiB3ZSBjYW4ndCBmaWd1cmUgaXQgb3V0XG4gIHJldHVybiBcInN0cmluZ1wiO1xufTtcblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGNyZWF0ZSBuZXcgXCJwcm9wZXJ0aWVzXCIgaXRlbXMgZm9yIGVhY2gga2V5IGluIG91ciBmb3JtRGF0YVxuZXhwb3J0IGZ1bmN0aW9uIHN0dWJFeGlzdGluZ0FkZGl0aW9uYWxQcm9wZXJ0aWVzKFxuICBzY2hlbWEsXG4gIHJvb3RTY2hlbWEgPSB7fSxcbiAgZm9ybURhdGEgPSB7fVxuKSB7XG4gIC8vIENsb25lIHRoZSBzY2hlbWEgc28gd2UgZG9uJ3QgcnVpbiB0aGUgY29uc3VtZXIncyBvcmlnaW5hbFxuICBzY2hlbWEgPSB7XG4gICAgLi4uc2NoZW1hLFxuICAgIHByb3BlcnRpZXM6IHsgLi4uc2NoZW1hLnByb3BlcnRpZXMgfSxcbiAgfTtcblxuICAvLyBtYWtlIHN1cmUgZm9ybURhdGEgaXMgYW4gb2JqZWN0XG4gIGZvcm1EYXRhID0gaXNPYmplY3QoZm9ybURhdGEpID8gZm9ybURhdGEgOiB7fTtcblxuICBPYmplY3Qua2V5cyhmb3JtRGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmIChzY2hlbWEucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAvLyBObyBuZWVkIHRvIHN0dWIsIG91ciBzY2hlbWEgYWxyZWFkeSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFkZGl0aW9uYWxQcm9wZXJ0aWVzO1xuICAgIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHJldHJpZXZlU2NoZW1hKFxuICAgICAgICB7ICRyZWY6IHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllc1tcIiRyZWZcIl0gfSxcbiAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgZm9ybURhdGFcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoXCJ0eXBlXCIpKSB7XG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHsgLi4uc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzID0geyB0eXBlOiBndWVzc1R5cGUoZm9ybURhdGFba2V5XSkgfTtcbiAgICB9XG5cbiAgICAvLyBUaGUgdHlwZSBvZiBvdXIgbmV3IGtleSBzaG91bGQgbWF0Y2ggdGhlIGFkZGl0aW9uYWxQcm9wZXJ0aWVzIHZhbHVlO1xuICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0gPSBhZGRpdGlvbmFsUHJvcGVydGllcztcbiAgICAvLyBTZXQgb3VyIGFkZGl0aW9uYWwgcHJvcGVydHkgZmxhZyBzbyB3ZSBrbm93IGl0IHdhcyBkeW5hbWljYWxseSBhZGRlZFxuICAgIHNjaGVtYS5wcm9wZXJ0aWVzW2tleV1bQURESVRJT05BTF9QUk9QRVJUWV9GTEFHXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBzY2hlbWE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9LCBmb3JtRGF0YSA9IHt9KSB7XG4gIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpKSB7XG4gICAgcmV0dXJuIHJlc29sdmVSZWZlcmVuY2Uoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XG4gIH0gZWxzZSBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiZGVwZW5kZW5jaWVzXCIpKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIHJldHVybiByZXRyaWV2ZVNjaGVtYShyZXNvbHZlZFNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFsbE9mXCIpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNjaGVtYSxcbiAgICAgIGFsbE9mOiBzY2hlbWEuYWxsT2YubWFwKGFsbE9mU3Vic2NoZW1hID0+XG4gICAgICAgIHJldHJpZXZlU2NoZW1hKGFsbE9mU3Vic2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcbiAgICAgICksXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBObyAkcmVmIG9yIGRlcGVuZGVuY2llcyBhdHRyaWJ1dGUgZm91bmQsIHJldHVybmluZyB0aGUgb3JpZ2luYWwgc2NoZW1hLlxuICAgIHJldHVybiBzY2hlbWE7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVJlZmVyZW5jZShzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKSB7XG4gIC8vIFJldHJpZXZlIHRoZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZpbml0aW9uLlxuICBjb25zdCAkcmVmU2NoZW1hID0gZmluZFNjaGVtYURlZmluaXRpb24oc2NoZW1hLiRyZWYsIHJvb3RTY2hlbWEpO1xuICAvLyBEcm9wIHRoZSAkcmVmIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugc2NoZW1hLlxuICBjb25zdCB7ICRyZWYsIC4uLmxvY2FsU2NoZW1hIH0gPSBzY2hlbWE7XG4gIC8vIFVwZGF0ZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZpbml0aW9uIHdpdGggbG9jYWwgc2NoZW1hIHByb3BlcnRpZXMuXG4gIHJldHVybiByZXRyaWV2ZVNjaGVtYShcbiAgICB7IC4uLiRyZWZTY2hlbWEsIC4uLmxvY2FsU2NoZW1hIH0sXG4gICAgcm9vdFNjaGVtYSxcbiAgICBmb3JtRGF0YVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hID0ge30sIGZvcm1EYXRhID0ge30pIHtcbiAgaWYgKCFpc09iamVjdChzY2hlbWEpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIGxldCByZXNvbHZlZFNjaGVtYSA9IHJlc29sdmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XG4gIGlmIChcImFsbE9mXCIgaW4gc2NoZW1hKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gbWVyZ2VBbGxPZih7XG4gICAgICAgIC4uLnJlc29sdmVkU2NoZW1hLFxuICAgICAgICBhbGxPZjogcmVzb2x2ZWRTY2hlbWEuYWxsT2YsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJjb3VsZCBub3QgbWVyZ2Ugc3Vic2NoZW1hcyBpbiBhbGxPZjpcXG5cIiArIGUpO1xuICAgICAgY29uc3QgeyBhbGxPZiwgLi4ucmVzb2x2ZWRTY2hlbWFXaXRob3V0QWxsT2YgfSA9IHJlc29sdmVkU2NoZW1hO1xuICAgICAgcmV0dXJuIHJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mO1xuICAgIH1cbiAgfVxuICBjb25zdCBoYXNBZGRpdGlvbmFsUHJvcGVydGllcyA9XG4gICAgcmVzb2x2ZWRTY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhZGRpdGlvbmFsUHJvcGVydGllc1wiKSAmJlxuICAgIHJlc29sdmVkU2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzICE9PSBmYWxzZTtcbiAgaWYgKGhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIHN0dWJFeGlzdGluZ0FkZGl0aW9uYWxQcm9wZXJ0aWVzKFxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXG4gICAgICByb290U2NoZW1hLFxuICAgICAgZm9ybURhdGFcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNvbHZlZFNjaGVtYTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKSB7XG4gIC8vIERyb3AgdGhlIGRlcGVuZGVuY2llcyBmcm9tIHRoZSBzb3VyY2Ugc2NoZW1hLlxuICBsZXQgeyBkZXBlbmRlbmNpZXMgPSB7fSwgLi4ucmVzb2x2ZWRTY2hlbWEgfSA9IHNjaGVtYTtcbiAgaWYgKFwib25lT2ZcIiBpbiByZXNvbHZlZFNjaGVtYSkge1xuICAgIHJlc29sdmVkU2NoZW1hID1cbiAgICAgIHJlc29sdmVkU2NoZW1hLm9uZU9mW1xuICAgICAgICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgcmVzb2x2ZWRTY2hlbWEub25lT2YsIHJvb3RTY2hlbWEpXG4gICAgICBdO1xuICB9IGVsc2UgaWYgKFwiYW55T2ZcIiBpbiByZXNvbHZlZFNjaGVtYSkge1xuICAgIHJlc29sdmVkU2NoZW1hID1cbiAgICAgIHJlc29sdmVkU2NoZW1hLmFueU9mW1xuICAgICAgICBnZXRNYXRjaGluZ09wdGlvbihmb3JtRGF0YSwgcmVzb2x2ZWRTY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXG4gICAgICBdO1xuICB9XG4gIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxuICAgIGRlcGVuZGVuY2llcyxcbiAgICByZXNvbHZlZFNjaGVtYSxcbiAgICByb290U2NoZW1hLFxuICAgIGZvcm1EYXRhXG4gICk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxuICBkZXBlbmRlbmNpZXMsXG4gIHJlc29sdmVkU2NoZW1hLFxuICByb290U2NoZW1hLFxuICBmb3JtRGF0YVxuKSB7XG4gIC8vIFByb2Nlc3MgZGVwZW5kZW5jaWVzIHVwZGF0aW5nIHRoZSBsb2NhbCBzY2hlbWEgcHJvcGVydGllcyBhcyBhcHByb3ByaWF0ZS5cbiAgZm9yIChjb25zdCBkZXBlbmRlbmN5S2V5IGluIGRlcGVuZGVuY2llcykge1xuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0cyB0cmlnZ2VyIHByb3BlcnR5IGlzIG5vdCBwcmVzZW50LlxuICAgIGlmIChmb3JtRGF0YVtkZXBlbmRlbmN5S2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gU2tpcCB0aGlzIGRlcGVuZGVuY3kgaWYgaXQgaXMgbm90IGluY2x1ZGVkIGluIHRoZSBzY2hlbWEgKHN1Y2ggYXMgd2hlbiBkZXBlbmRlbmN5S2V5IGlzIGl0c2VsZiBhIGhpZGRlbiBkZXBlbmRlbmN5LilcbiAgICBpZiAoXG4gICAgICByZXNvbHZlZFNjaGVtYS5wcm9wZXJ0aWVzICYmXG4gICAgICAhKGRlcGVuZGVuY3lLZXkgaW4gcmVzb2x2ZWRTY2hlbWEucHJvcGVydGllcylcbiAgICApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBbZGVwZW5kZW5jeUtleV06IGRlcGVuZGVuY3lWYWx1ZSxcbiAgICAgIC4uLnJlbWFpbmluZ0RlcGVuZGVuY2llc1xuICAgIH0gPSBkZXBlbmRlbmNpZXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeVZhbHVlKSkge1xuICAgICAgcmVzb2x2ZWRTY2hlbWEgPSB3aXRoRGVwZW5kZW50UHJvcGVydGllcyhyZXNvbHZlZFNjaGVtYSwgZGVwZW5kZW5jeVZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGRlcGVuZGVuY3lWYWx1ZSkpIHtcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFNjaGVtYShcbiAgICAgICAgcmVzb2x2ZWRTY2hlbWEsXG4gICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgIGZvcm1EYXRhLFxuICAgICAgICBkZXBlbmRlbmN5S2V5LFxuICAgICAgICBkZXBlbmRlbmN5VmFsdWVcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzRGVwZW5kZW5jaWVzKFxuICAgICAgcmVtYWluaW5nRGVwZW5kZW5jaWVzLFxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXG4gICAgICByb290U2NoZW1hLFxuICAgICAgZm9ybURhdGFcbiAgICApO1xuICB9XG4gIHJldHVybiByZXNvbHZlZFNjaGVtYTtcbn1cblxuZnVuY3Rpb24gd2l0aERlcGVuZGVudFByb3BlcnRpZXMoc2NoZW1hLCBhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xuICBpZiAoIWFkZGl0aW9uYWxseVJlcXVpcmVkKSB7XG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfVxuICBjb25zdCByZXF1aXJlZCA9IEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKVxuICAgID8gQXJyYXkuZnJvbShuZXcgU2V0KFsuLi5zY2hlbWEucmVxdWlyZWQsIC4uLmFkZGl0aW9uYWxseVJlcXVpcmVkXSkpXG4gICAgOiBhZGRpdGlvbmFsbHlSZXF1aXJlZDtcbiAgcmV0dXJuIHsgLi4uc2NoZW1hLCByZXF1aXJlZDogcmVxdWlyZWQgfTtcbn1cblxuZnVuY3Rpb24gd2l0aERlcGVuZGVudFNjaGVtYShcbiAgc2NoZW1hLFxuICByb290U2NoZW1hLFxuICBmb3JtRGF0YSxcbiAgZGVwZW5kZW5jeUtleSxcbiAgZGVwZW5kZW5jeVZhbHVlXG4pIHtcbiAgbGV0IHsgb25lT2YsIC4uLmRlcGVuZGVudFNjaGVtYSB9ID0gcmV0cmlldmVTY2hlbWEoXG4gICAgZGVwZW5kZW5jeVZhbHVlLFxuICAgIHJvb3RTY2hlbWEsXG4gICAgZm9ybURhdGFcbiAgKTtcbiAgc2NoZW1hID0gbWVyZ2VTY2hlbWFzKHNjaGVtYSwgZGVwZW5kZW50U2NoZW1hKTtcbiAgLy8gU2luY2UgaXQgZG9lcyBub3QgY29udGFpbiBvbmVPZiwgd2UgcmV0dXJuIHRoZSBvcmlnaW5hbCBzY2hlbWEuXG4gIGlmIChvbmVPZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShvbmVPZikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQ6IGl0IGlzIHNvbWUgJHt0eXBlb2Ygb25lT2Z9IGluc3RlYWQgb2YgYW4gYXJyYXlgKTtcbiAgfVxuICAvLyBSZXNvbHZlICRyZWZzIGluc2lkZSBvbmVPZi5cbiAgY29uc3QgcmVzb2x2ZWRPbmVPZiA9IG9uZU9mLm1hcChzdWJzY2hlbWEgPT5cbiAgICBzdWJzY2hlbWEuaGFzT3duUHJvcGVydHkoXCIkcmVmXCIpXG4gICAgICA/IHJlc29sdmVSZWZlcmVuY2Uoc3Vic2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcbiAgICAgIDogc3Vic2NoZW1hXG4gICk7XG4gIHJldHVybiB3aXRoRXhhY3RseU9uZVN1YnNjaGVtYShcbiAgICBzY2hlbWEsXG4gICAgcm9vdFNjaGVtYSxcbiAgICBmb3JtRGF0YSxcbiAgICBkZXBlbmRlbmN5S2V5LFxuICAgIHJlc29sdmVkT25lT2ZcbiAgKTtcbn1cblxuZnVuY3Rpb24gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXG4gIHNjaGVtYSxcbiAgcm9vdFNjaGVtYSxcbiAgZm9ybURhdGEsXG4gIGRlcGVuZGVuY3lLZXksXG4gIG9uZU9mXG4pIHtcbiAgY29uc3QgdmFsaWRTdWJzY2hlbWFzID0gb25lT2YuZmlsdGVyKHN1YnNjaGVtYSA9PiB7XG4gICAgaWYgKCFzdWJzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB7IFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEgfSA9IHN1YnNjaGVtYS5wcm9wZXJ0aWVzO1xuICAgIGlmIChjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSkge1xuICAgICAgY29uc3QgY29uZGl0aW9uU2NoZW1hID0ge1xuICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgW2RlcGVuZGVuY3lLZXldOiBjb25kaXRpb25Qcm9wZXJ0eVNjaGVtYSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGVycm9ycyB9ID0gdmFsaWRhdGVGb3JtRGF0YShmb3JtRGF0YSwgY29uZGl0aW9uU2NoZW1hKTtcbiAgICAgIHJldHVybiBlcnJvcnMubGVuZ3RoID09PSAwO1xuICAgIH1cbiAgfSk7XG4gIGlmICh2YWxpZFN1YnNjaGVtYXMubGVuZ3RoICE9PSAxKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJpZ25vcmluZyBvbmVPZiBpbiBkZXBlbmRlbmNpZXMgYmVjYXVzZSB0aGVyZSBpc24ndCBleGFjdGx5IG9uZSBzdWJzY2hlbWEgdGhhdCBpcyB2YWxpZFwiXG4gICAgKTtcbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG4gIGNvbnN0IHN1YnNjaGVtYSA9IHZhbGlkU3Vic2NoZW1hc1swXTtcbiAgY29uc3Qge1xuICAgIFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEsXG4gICAgLi4uZGVwZW5kZW50U3Vic2NoZW1hXG4gIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcbiAgY29uc3QgZGVwZW5kZW50U2NoZW1hID0geyAuLi5zdWJzY2hlbWEsIHByb3BlcnRpZXM6IGRlcGVuZGVudFN1YnNjaGVtYSB9O1xuICByZXR1cm4gbWVyZ2VTY2hlbWFzKFxuICAgIHNjaGVtYSxcbiAgICByZXRyaWV2ZVNjaGVtYShkZXBlbmRlbnRTY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKVxuICApO1xufVxuXG4vLyBSZWN1cnNpdmVseSBtZXJnZSBkZWVwbHkgbmVzdGVkIHNjaGVtYXMuXG4vLyBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG1lcmdlU2NoZW1hcyBhbmQgbWVyZ2VPYmplY3RzXG4vLyBpcyB0aGF0IG1lcmdlU2NoZW1hcyBvbmx5IGNvbmNhdHMgYXJyYXlzIGZvclxuLy8gdmFsdWVzIHVuZGVyIHRoZSBcInJlcXVpcmVkXCIga2V5d29yZCwgYW5kIHdoZW4gaXQgZG9lcyxcbi8vIGl0IGRvZXNuJ3QgaW5jbHVkZSBkdXBsaWNhdGUgdmFsdWVzLlxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlU2NoZW1hcyhvYmoxLCBvYmoyKSB7XG4gIHZhciBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBvYmoxKTsgLy8gUHJldmVudCBtdXRhdGlvbiBvZiBzb3VyY2Ugb2JqZWN0LlxuICByZXR1cm4gT2JqZWN0LmtleXMob2JqMikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGNvbnN0IGxlZnQgPSBvYmoxID8gb2JqMVtrZXldIDoge30sXG4gICAgICByaWdodCA9IG9iajJba2V5XTtcbiAgICBpZiAob2JqMSAmJiBvYmoxLmhhc093blByb3BlcnR5KGtleSkgJiYgaXNPYmplY3QocmlnaHQpKSB7XG4gICAgICBhY2Nba2V5XSA9IG1lcmdlU2NoZW1hcyhsZWZ0LCByaWdodCk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIG9iajEgJiZcbiAgICAgIG9iajIgJiZcbiAgICAgIChnZXRTY2hlbWFUeXBlKG9iajEpID09PSBcIm9iamVjdFwiIHx8IGdldFNjaGVtYVR5cGUob2JqMikgPT09IFwib2JqZWN0XCIpICYmXG4gICAgICBrZXkgPT09IFwicmVxdWlyZWRcIiAmJlxuICAgICAgQXJyYXkuaXNBcnJheShsZWZ0KSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShyaWdodClcbiAgICApIHtcbiAgICAgIC8vIERvbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcyB3aGVuIG1lcmdpbmdcbiAgICAgIC8vIFwicmVxdWlyZWRcIiBmaWVsZHMuXG4gICAgICBhY2Nba2V5XSA9IHVuaW9uKGxlZnQsIHJpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWNjW2tleV0gPSByaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIGFjYztcbiAgfSwgYWNjKTtcbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBFcXVhbHMoYSwgYiwgY2EgPSBbXSwgY2IgPSBbXSkge1xuICAvLyBQYXJ0aWFsbHkgZXh0cmFjdGVkIGZyb20gbm9kZS1kZWVwZXIgYW5kIGFkYXB0ZWQgdG8gZXhjbHVkZSBjb21wYXJpc29uXG4gIC8vIGNoZWNrcyBmb3IgZnVuY3Rpb25zLlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vb3RoaXltMjMvbm9kZS1kZWVwZXJcbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBiID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBBc3N1bWUgYWxsIGZ1bmN0aW9ucyBhcmUgZXF1aXZhbGVudFxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmpzZi10ZWFtL3JlYWN0LWpzb25zY2hlbWEtZm9ybS9pc3N1ZXMvMjU1XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgIT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAoYSA9PT0gbnVsbCB8fCBiID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKTtcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgUmVnRXhwICYmIGIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gKFxuICAgICAgYS5zb3VyY2UgPT09IGIuc291cmNlICYmXG4gICAgICBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcbiAgICAgIGEubXVsdGlsaW5lID09PSBiLm11bHRpbGluZSAmJlxuICAgICAgYS5sYXN0SW5kZXggPT09IGIubGFzdEluZGV4ICYmXG4gICAgICBhLmlnbm9yZUNhc2UgPT09IGIuaWdub3JlQ2FzZVxuICAgICk7XG4gIH0gZWxzZSBpZiAoaXNBcmd1bWVudHMoYSkgfHwgaXNBcmd1bWVudHMoYikpIHtcbiAgICBpZiAoIShpc0FyZ3VtZW50cyhhKSAmJiBpc0FyZ3VtZW50cyhiKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHJldHVybiBkZWVwRXF1YWxzKHNsaWNlLmNhbGwoYSksIHNsaWNlLmNhbGwoYiksIGNhLCBjYik7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGEuY29uc3RydWN0b3IgIT09IGIuY29uc3RydWN0b3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQga2EgPSBPYmplY3Qua2V5cyhhKTtcbiAgICBsZXQga2IgPSBPYmplY3Qua2V5cyhiKTtcbiAgICAvLyBkb24ndCBib3RoZXIgd2l0aCBzdGFjayBhY3JvYmF0aWNzIGlmIHRoZXJlJ3Mgbm90aGluZyB0aGVyZVxuICAgIGlmIChrYS5sZW5ndGggPT09IDAgJiYga2IubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGthLmxlbmd0aCAhPT0ga2IubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGNhbCA9IGNhLmxlbmd0aDtcbiAgICB3aGlsZSAoY2FsLS0pIHtcbiAgICAgIGlmIChjYVtjYWxdID09PSBhKSB7XG4gICAgICAgIHJldHVybiBjYltjYWxdID09PSBiO1xuICAgICAgfVxuICAgIH1cbiAgICBjYS5wdXNoKGEpO1xuICAgIGNiLnB1c2goYik7XG5cbiAgICBrYS5zb3J0KCk7XG4gICAga2Iuc29ydCgpO1xuICAgIGZvciAodmFyIGogPSBrYS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgaWYgKGthW2pdICE9PSBrYltqXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGtleTtcbiAgICBmb3IgKGxldCBrID0ga2EubGVuZ3RoIC0gMTsgayA+PSAwOyBrLS0pIHtcbiAgICAgIGtleSA9IGthW2tdO1xuICAgICAgaWYgKCFkZWVwRXF1YWxzKGFba2V5XSwgYltrZXldLCBjYSwgY2IpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYS5wb3AoKTtcbiAgICBjYi5wb3AoKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRSZW5kZXIoY29tcCwgbmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgY29uc3QgeyBwcm9wcywgc3RhdGUgfSA9IGNvbXA7XG4gIHJldHVybiAhZGVlcEVxdWFscyhwcm9wcywgbmV4dFByb3BzKSB8fCAhZGVlcEVxdWFscyhzdGF0ZSwgbmV4dFN0YXRlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvSWRTY2hlbWEoXG4gIHNjaGVtYSxcbiAgaWQsXG4gIHJvb3RTY2hlbWEsXG4gIGZvcm1EYXRhID0ge30sXG4gIGlkUHJlZml4ID0gXCJyb290XCJcbikge1xuICBjb25zdCBpZFNjaGVtYSA9IHtcbiAgICAkaWQ6IGlkIHx8IGlkUHJlZml4LFxuICB9O1xuICBpZiAoXCIkcmVmXCIgaW4gc2NoZW1hIHx8IFwiZGVwZW5kZW5jaWVzXCIgaW4gc2NoZW1hIHx8IFwiYWxsT2ZcIiBpbiBzY2hlbWEpIHtcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XG4gICAgcmV0dXJuIHRvSWRTY2hlbWEoX3NjaGVtYSwgaWQsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCk7XG4gIH1cbiAgaWYgKFwiaXRlbXNcIiBpbiBzY2hlbWEgJiYgIXNjaGVtYS5pdGVtcy4kcmVmKSB7XG4gICAgcmV0dXJuIHRvSWRTY2hlbWEoc2NoZW1hLml0ZW1zLCBpZCwgcm9vdFNjaGVtYSwgZm9ybURhdGEsIGlkUHJlZml4KTtcbiAgfVxuICBpZiAoc2NoZW1hLnR5cGUgIT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gaWRTY2hlbWE7XG4gIH1cbiAgZm9yIChjb25zdCBuYW1lIGluIHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KSB7XG4gICAgY29uc3QgZmllbGQgPSBzY2hlbWEucHJvcGVydGllc1tuYW1lXTtcbiAgICBjb25zdCBmaWVsZElkID0gaWRTY2hlbWEuJGlkICsgXCJfXCIgKyBuYW1lO1xuICAgIGlkU2NoZW1hW25hbWVdID0gdG9JZFNjaGVtYShcbiAgICAgIGlzT2JqZWN0KGZpZWxkKSA/IGZpZWxkIDoge30sXG4gICAgICBmaWVsZElkLFxuICAgICAgcm9vdFNjaGVtYSxcbiAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBmb3JtRGF0YSBpcyBub3QgYW4gb2JqZWN0IC0tIHRoaXMgY2FuIGhhcHBlbiBpZiBhblxuICAgICAgLy8gYXJyYXkgaXRlbSBoYXMganVzdCBiZWVuIGFkZGVkLCBidXQgbm90IHBvcHVsYXRlZCB3aXRoIGRhdGEgeWV0XG4gICAgICAoZm9ybURhdGEgfHwge30pW25hbWVdLFxuICAgICAgaWRQcmVmaXhcbiAgICApO1xuICB9XG4gIHJldHVybiBpZFNjaGVtYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUGF0aFNjaGVtYShzY2hlbWEsIG5hbWUgPSBcIlwiLCByb290U2NoZW1hLCBmb3JtRGF0YSA9IHt9KSB7XG4gIGNvbnN0IHBhdGhTY2hlbWEgPSB7XG4gICAgJG5hbWU6IG5hbWUucmVwbGFjZSgvXlxcLi8sIFwiXCIpLFxuICB9O1xuICBpZiAoXCIkcmVmXCIgaW4gc2NoZW1hIHx8IFwiZGVwZW5kZW5jaWVzXCIgaW4gc2NoZW1hIHx8IFwiYWxsT2ZcIiBpbiBzY2hlbWEpIHtcbiAgICBjb25zdCBfc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XG4gICAgcmV0dXJuIHRvUGF0aFNjaGVtYShfc2NoZW1hLCBuYW1lLCByb290U2NoZW1hLCBmb3JtRGF0YSk7XG4gIH1cblxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikpIHtcbiAgICBwYXRoU2NoZW1hLl9fcmpzZl9hZGRpdGlvbmFsUHJvcGVydGllcyA9IHRydWU7XG4gIH1cblxuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiaXRlbXNcIikgJiYgQXJyYXkuaXNBcnJheShmb3JtRGF0YSkpIHtcbiAgICBmb3JtRGF0YS5mb3JFYWNoKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICBwYXRoU2NoZW1hW2ldID0gdG9QYXRoU2NoZW1hKFxuICAgICAgICBzY2hlbWEuaXRlbXMsXG4gICAgICAgIGAke25hbWV9LiR7aX1gLFxuICAgICAgICByb290U2NoZW1hLFxuICAgICAgICBlbGVtZW50XG4gICAgICApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcInByb3BlcnRpZXNcIikpIHtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIHNjaGVtYS5wcm9wZXJ0aWVzKSB7XG4gICAgICBwYXRoU2NoZW1hW3Byb3BlcnR5XSA9IHRvUGF0aFNjaGVtYShcbiAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldLFxuICAgICAgICBgJHtuYW1lfS4ke3Byb3BlcnR5fWAsXG4gICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgIC8vIEl0J3MgcG9zc2libGUgdGhhdCBmb3JtRGF0YSBpcyBub3QgYW4gb2JqZWN0IC0tIHRoaXMgY2FuIGhhcHBlbiBpZiBhblxuICAgICAgICAvLyBhcnJheSBpdGVtIGhhcyBqdXN0IGJlZW4gYWRkZWQsIGJ1dCBub3QgcG9wdWxhdGVkIHdpdGggZGF0YSB5ZXRcbiAgICAgICAgKGZvcm1EYXRhIHx8IHt9KVtwcm9wZXJ0eV1cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXRoU2NoZW1hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VEYXRlU3RyaW5nKGRhdGVTdHJpbmcsIGluY2x1ZGVUaW1lID0gdHJ1ZSkge1xuICBpZiAoIWRhdGVTdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeWVhcjogLTEsXG4gICAgICBtb250aDogLTEsXG4gICAgICBkYXk6IC0xLFxuICAgICAgaG91cjogaW5jbHVkZVRpbWUgPyAtMSA6IDAsXG4gICAgICBtaW51dGU6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxuICAgICAgc2Vjb25kOiBpbmNsdWRlVGltZSA/IC0xIDogMCxcbiAgICB9O1xuICB9XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgaWYgKE51bWJlci5pc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcGFyc2UgZGF0ZSBcIiArIGRhdGVTdHJpbmcpO1xuICB9XG4gIHJldHVybiB7XG4gICAgeWVhcjogZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgIG1vbnRoOiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAvLyBvaCB5b3UsIGphdmFzY3JpcHQuXG4gICAgZGF5OiBkYXRlLmdldFVUQ0RhdGUoKSxcbiAgICBob3VyOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDSG91cnMoKSA6IDAsXG4gICAgbWludXRlOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDTWludXRlcygpIDogMCxcbiAgICBzZWNvbmQ6IGluY2x1ZGVUaW1lID8gZGF0ZS5nZXRVVENTZWNvbmRzKCkgOiAwLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlU3RyaW5nKFxuICB7IHllYXIsIG1vbnRoLCBkYXksIGhvdXIgPSAwLCBtaW51dGUgPSAwLCBzZWNvbmQgPSAwIH0sXG4gIHRpbWUgPSB0cnVlXG4pIHtcbiAgY29uc3QgdXRjVGltZSA9IERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCk7XG4gIGNvbnN0IGRhdGV0aW1lID0gbmV3IERhdGUodXRjVGltZSkudG9KU09OKCk7XG4gIHJldHVybiB0aW1lID8gZGF0ZXRpbWUgOiBkYXRldGltZS5zbGljZSgwLCAxMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dGNUb0xvY2FsKGpzb25EYXRlKSB7XG4gIGlmICghanNvbkRhdGUpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIC8vIHJlcXVpcmVkIGZvcm1hdCBvZiBgXCJ5eXl5LU1NLWRkVGhoOm1tXCIgZm9sbG93ZWQgYnkgb3B0aW9uYWwgXCI6c3NcIiBvciBcIjpzcy5TU1NcIlxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbnB1dC5odG1sI2xvY2FsLWRhdGUtYW5kLXRpbWUtc3RhdGUtKHR5cGUlM0RkYXRldGltZS1sb2NhbClcbiAgLy8gPiBzaG91bGQgYmUgYSBfdmFsaWQgbG9jYWwgZGF0ZSBhbmQgdGltZSBzdHJpbmdfIChub3QgR01UKVxuXG4gIC8vIE5vdGUgLSBkYXRlIGNvbnN0cnVjdG9yIHBhc3NlZCBsb2NhbCBJU08tODYwMSBkb2VzIG5vdCBjb3JyZWN0bHlcbiAgLy8gY2hhbmdlIHRpbWUgdG8gVVRDIGluIG5vZGUgcHJlLThcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGpzb25EYXRlKTtcblxuICBjb25zdCB5eXl5ID0gcGFkKGRhdGUuZ2V0RnVsbFllYXIoKSwgNCk7XG4gIGNvbnN0IE1NID0gcGFkKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpO1xuICBjb25zdCBkZCA9IHBhZChkYXRlLmdldERhdGUoKSwgMik7XG4gIGNvbnN0IGhoID0gcGFkKGRhdGUuZ2V0SG91cnMoKSwgMik7XG4gIGNvbnN0IG1tID0gcGFkKGRhdGUuZ2V0TWludXRlcygpLCAyKTtcbiAgY29uc3Qgc3MgPSBwYWQoZGF0ZS5nZXRTZWNvbmRzKCksIDIpO1xuICBjb25zdCBTU1MgPSBwYWQoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyk7XG5cbiAgcmV0dXJuIGAke3l5eXl9LSR7TU19LSR7ZGR9VCR7aGh9OiR7bW19OiR7c3N9LiR7U1NTfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhbFRvVVRDKGRhdGVTdHJpbmcpIHtcbiAgaWYgKGRhdGVTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZVN0cmluZykudG9KU09OKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW0sIHNpemUpIHtcbiAgbGV0IHMgPSBTdHJpbmcobnVtKTtcbiAgd2hpbGUgKHMubGVuZ3RoIDwgc2l6ZSkge1xuICAgIHMgPSBcIjBcIiArIHM7XG4gIH1cbiAgcmV0dXJuIHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhVVJJdG9CbG9iKGRhdGFVUkkpIHtcbiAgLy8gU3BsaXQgbWV0YWRhdGEgZnJvbSBkYXRhXG4gIGNvbnN0IHNwbGl0dGVkID0gZGF0YVVSSS5zcGxpdChcIixcIik7XG4gIC8vIFNwbGl0IHBhcmFtc1xuICBjb25zdCBwYXJhbXMgPSBzcGxpdHRlZFswXS5zcGxpdChcIjtcIik7XG4gIC8vIEdldCBtaW1lLXR5cGUgZnJvbSBwYXJhbXNcbiAgY29uc3QgdHlwZSA9IHBhcmFtc1swXS5yZXBsYWNlKFwiZGF0YTpcIiwgXCJcIik7XG4gIC8vIEZpbHRlciB0aGUgbmFtZSBwcm9wZXJ0eSBmcm9tIHBhcmFtc1xuICBjb25zdCBwcm9wZXJ0aWVzID0gcGFyYW1zLmZpbHRlcihwYXJhbSA9PiB7XG4gICAgcmV0dXJuIHBhcmFtLnNwbGl0KFwiPVwiKVswXSA9PT0gXCJuYW1lXCI7XG4gIH0pO1xuICAvLyBMb29rIGZvciB0aGUgbmFtZSBhbmQgdXNlIHVua25vd24gaWYgbm8gbmFtZSBwcm9wZXJ0eS5cbiAgbGV0IG5hbWU7XG4gIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCAhPT0gMSkge1xuICAgIG5hbWUgPSBcInVua25vd25cIjtcbiAgfSBlbHNlIHtcbiAgICAvLyBCZWNhdXNlIHdlIGZpbHRlcmVkIG91dCB0aGUgb3RoZXIgcHJvcGVydHksXG4gICAgLy8gd2Ugb25seSBoYXZlIHRoZSBuYW1lIGNhc2UgaGVyZS5cbiAgICBuYW1lID0gcHJvcGVydGllc1swXS5zcGxpdChcIj1cIilbMV07XG4gIH1cblxuICAvLyBCdWlsdCB0aGUgVWludDhBcnJheSBCbG9iIHBhcmFtZXRlciBmcm9tIHRoZSBiYXNlNjQgc3RyaW5nLlxuICBjb25zdCBiaW5hcnkgPSBhdG9iKHNwbGl0dGVkWzFdKTtcbiAgY29uc3QgYXJyYXkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICBhcnJheS5wdXNoKGJpbmFyeS5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuICAvLyBDcmVhdGUgdGhlIGJsb2Igb2JqZWN0XG4gIGNvbnN0IGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW25ldyBVaW50OEFycmF5KGFycmF5KV0sIHsgdHlwZSB9KTtcblxuICByZXR1cm4geyBibG9iLCBuYW1lIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZVNwZWMoc2NoZW1hKSB7XG4gIGNvbnN0IHNwZWMgPSB7fTtcbiAgaWYgKHNjaGVtYS5tdWx0aXBsZU9mKSB7XG4gICAgc3BlYy5zdGVwID0gc2NoZW1hLm11bHRpcGxlT2Y7XG4gIH1cbiAgaWYgKHNjaGVtYS5taW5pbXVtIHx8IHNjaGVtYS5taW5pbXVtID09PSAwKSB7XG4gICAgc3BlYy5taW4gPSBzY2hlbWEubWluaW11bTtcbiAgfVxuICBpZiAoc2NoZW1hLm1heGltdW0gfHwgc2NoZW1hLm1heGltdW0gPT09IDApIHtcbiAgICBzcGVjLm1heCA9IHNjaGVtYS5tYXhpbXVtO1xuICB9XG4gIHJldHVybiBzcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIG9wdGlvbnMsIHJvb3RTY2hlbWEpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgb3B0aW9uID0gb3B0aW9uc1tpXTtcblxuICAgIC8vIElmIHRoZSBzY2hlbWEgZGVzY3JpYmVzIGFuIG9iamVjdCB0aGVuIHdlIG5lZWQgdG8gYWRkIHNsaWdodGx5IG1vcmVcbiAgICAvLyBzdHJpY3QgbWF0Y2hpbmcgdG8gdGhlIHNjaGVtYSwgYmVjYXVzZSB1bmxlc3MgdGhlIHNjaGVtYSB1c2VzIHRoZVxuICAgIC8vIFwicmVxdWlyZXNcIiBrZXl3b3JkLCBhbiBvYmplY3Qgd2lsbCBtYXRjaCB0aGUgc2NoZW1hIGFzIGxvbmcgYXMgaXRcbiAgICAvLyBkb2Vzbid0IGhhdmUgbWF0Y2hpbmcga2V5cyB3aXRoIGEgY29uZmxpY3RpbmcgdHlwZS4gVG8gZG8gdGhpcyB3ZSB1c2UgYW5cbiAgICAvLyBcImFueU9mXCIgd2l0aCBhbiBhcnJheSBvZiByZXF1aXJlcy4gVGhpcyBhdWdtZW50YXRpb24gZXhwcmVzc2VzIHRoYXQgdGhlXG4gICAgLy8gc2NoZW1hIHNob3VsZCBtYXRjaCBpZiBhbnkgb2YgdGhlIGtleXMgaW4gdGhlIHNjaGVtYSBhcmUgcHJlc2VudCBvbiB0aGVcbiAgICAvLyBvYmplY3QgYW5kIHBhc3MgdmFsaWRhdGlvbi5cbiAgICBpZiAob3B0aW9uLnByb3BlcnRpZXMpIHtcbiAgICAgIC8vIENyZWF0ZSBhbiBcImFueU9mXCIgc2NoZW1hIHRoYXQgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIG9mIHRoZSBrZXlzIGluIHRoZVxuICAgICAgLy8gXCJwcm9wZXJ0aWVzXCIgb2JqZWN0XG4gICAgICBjb25zdCByZXF1aXJlc0FueU9mID0ge1xuICAgICAgICBhbnlPZjogT2JqZWN0LmtleXMob3B0aW9uLnByb3BlcnRpZXMpLm1hcChrZXkgPT4gKHtcbiAgICAgICAgICByZXF1aXJlZDogW2tleV0sXG4gICAgICAgIH0pKSxcbiAgICAgIH07XG5cbiAgICAgIGxldCBhdWdtZW50ZWRTY2hlbWE7XG5cbiAgICAgIC8vIElmIHRoZSBcImFueU9mXCIga2V5d29yZCBhbHJlYWR5IGV4aXN0cywgd3JhcCB0aGUgYXVnbWVudGF0aW9uIGluIGFuIFwiYWxsT2ZcIlxuICAgICAgaWYgKG9wdGlvbi5hbnlPZikge1xuICAgICAgICAvLyBDcmVhdGUgYSBzaGFsbG93IGNsb25lIG9mIHRoZSBvcHRpb25cbiAgICAgICAgY29uc3QgeyAuLi5zaGFsbG93Q2xvbmUgfSA9IG9wdGlvbjtcblxuICAgICAgICBpZiAoIXNoYWxsb3dDbG9uZS5hbGxPZikge1xuICAgICAgICAgIHNoYWxsb3dDbG9uZS5hbGxPZiA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIElmIFwiYWxsT2ZcIiBhbHJlYWR5IGV4aXN0cywgc2hhbGxvdyBjbG9uZSB0aGUgYXJyYXlcbiAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YgPSBzaGFsbG93Q2xvbmUuYWxsT2Yuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoYWxsb3dDbG9uZS5hbGxPZi5wdXNoKHJlcXVpcmVzQW55T2YpO1xuXG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IHNoYWxsb3dDbG9uZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF1Z21lbnRlZFNjaGVtYSA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbiwgcmVxdWlyZXNBbnlPZik7XG4gICAgICB9XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgXCJyZXF1aXJlZFwiIGZpZWxkIGFzIGl0J3MgbGlrZWx5IHRoYXQgbm90IGFsbCBmaWVsZHMgaGF2ZVxuICAgICAgLy8gYmVlbiBmaWxsZWQgaW4geWV0LCB3aGljaCB3aWxsIG1lYW4gdGhhdCB0aGUgc2NoZW1hIGlzIG5vdCB2YWxpZFxuICAgICAgZGVsZXRlIGF1Z21lbnRlZFNjaGVtYS5yZXF1aXJlZDtcblxuICAgICAgaWYgKGlzVmFsaWQoYXVnbWVudGVkU2NoZW1hLCBmb3JtRGF0YSwgcm9vdFNjaGVtYSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ZhbGlkKG9wdGlvbiwgZm9ybURhdGEsIHJvb3RTY2hlbWEpKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8vIENoZWNrIHRvIHNlZSBpZiBhIHNjaGVtYSBzcGVjaWZpZXMgdGhhdCBhIHZhbHVlIG11c3QgYmUgdHJ1ZVxuZXhwb3J0IGZ1bmN0aW9uIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYSkge1xuICAvLyBDaGVjayBpZiBjb25zdCBpcyBhIHRydXRoeSB2YWx1ZVxuICBpZiAoc2NoZW1hLmNvbnN0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBDaGVjayBpZiBhbiBlbnVtIGhhcyBhIHNpbmdsZSB2YWx1ZSBvZiB0cnVlXG4gIGlmIChzY2hlbWEuZW51bSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEgJiYgc2NoZW1hLmVudW1bMF0gPT09IHRydWUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIElmIGFueU9mIGhhcyBhIHNpbmdsZSB2YWx1ZSwgZXZhbHVhdGUgdGhlIHN1YnNjaGVtYVxuICBpZiAoc2NoZW1hLmFueU9mICYmIHNjaGVtYS5hbnlPZi5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLmFueU9mWzBdKTtcbiAgfVxuXG4gIC8vIElmIG9uZU9mIGhhcyBhIHNpbmdsZSB2YWx1ZSwgZXZhbHVhdGUgdGhlIHN1YnNjaGVtYVxuICBpZiAoc2NoZW1hLm9uZU9mICYmIHNjaGVtYS5vbmVPZi5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUoc2NoZW1hLm9uZU9mWzBdKTtcbiAgfVxuXG4gIC8vIEV2YWx1YXRlIGVhY2ggc3Vic2NoZW1hIGluIGFsbE9mLCB0byBzZWUgaWYgb25lIG9mIHRoZW0gcmVxdWlyZXMgYSB0cnVlXG4gIC8vIHZhbHVlXG4gIGlmIChzY2hlbWEuYWxsT2YpIHtcbiAgICByZXR1cm4gc2NoZW1hLmFsbE9mLnNvbWUoc2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIl19