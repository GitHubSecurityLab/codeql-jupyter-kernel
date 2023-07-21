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

import React from "react";
import * as ReactIs from "react-is";
import mergeAllOf from "json-schema-merge-allof";
import fill from "core-js-pure/features/array/fill";
import union from "lodash/union";
import jsonpointer from "jsonpointer";
import fields from "./components/fields";
import widgets from "./components/widgets";
import validateFormData, { isValid } from "./validate";
export var ADDITIONAL_PROPERTY_FLAG = "__additional_property";
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
export function canExpand(schema, uiSchema, formData) {
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
export function getDefaultRegistry() {
  return {
    fields: fields,
    widgets: widgets,
    definitions: {},
    rootSchema: {},
    formContext: {}
  };
}
/* Gets the type of a given schema. */

export function getSchemaType(schema) {
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
export function getWidget(schema, widget) {
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

        return React.createElement(Widget, _extends({
          options: _objectSpread({}, defaultOptions, options)
        }, props));
      };
    }

    return Widget.MergedWidget;
  }

  if (typeof widget === "function" || ReactIs.isForwardRef(React.createElement(widget)) || ReactIs.isMemo(widget)) {
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
export function hasWidget(schema, widget) {
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
            var fillerEntries = fill(new Array(schema.minItems - defaultsLength), computeDefaults(fillerSchema, fillerSchema.defaults, rootSchema)); // then fill up the rest with either the item default or empty, up to minItems

            return defaultEntries.concat(fillerEntries);
          }
        } else {
          return defaults ? defaults : [];
        }
      }

  }

  return defaults;
}

export function getDefaultFormState(_schema, formData) {
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

export function mergeDefaultsWithFormData(defaults, formData) {
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
export function getUiOptions(uiSchema) {
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
export function getDisplayLabel(schema, uiSchema, rootSchema) {
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
export function isObject(thing) {
  if (typeof File !== "undefined" && thing instanceof File) {
    return false;
  }

  return _typeof(thing) === "object" && thing !== null && !Array.isArray(thing);
}
export function mergeObjects(obj1, obj2) {
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
export function asNumber(value) {
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
export function orderProperties(properties, order) {
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

export function isConstant(schema) {
  return Array.isArray(schema["enum"]) && schema["enum"].length === 1 || schema.hasOwnProperty("const");
}
export function toConstant(schema) {
  if (Array.isArray(schema["enum"]) && schema["enum"].length === 1) {
    return schema["enum"][0];
  } else if (schema.hasOwnProperty("const")) {
    return schema["const"];
  } else {
    throw new Error("schema cannot be inferred as a constant");
  }
}
export function isSelect(_schema) {
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
export function isMultiSelect(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!schema.uniqueItems || !schema.items) {
    return false;
  }

  return isSelect(schema.items, rootSchema);
}
export function isFilesArray(schema, uiSchema) {
  var rootSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (uiSchema["ui:widget"] === "files") {
    return true;
  } else if (schema.items) {
    var itemsSchema = retrieveSchema(schema.items, rootSchema);
    return itemsSchema.type === "string" && itemsSchema.format === "data-url";
  }

  return false;
}
export function isFixedItems(schema) {
  return Array.isArray(schema.items) && schema.items.length > 0 && schema.items.every(function (item) {
    return isObject(item);
  });
}
export function allowAdditionalItems(schema) {
  if (schema.additionalItems === true) {
    console.warn("additionalItems=true is currently not supported");
  }

  return isObject(schema.additionalItems);
}
export function optionsList(schema) {
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
export function findSchemaDefinition($ref) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var origRef = $ref;

  if ($ref.startsWith("#")) {
    // Decode URI fragment representation.
    $ref = decodeURIComponent($ref.substring(1));
  } else {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  var current = jsonpointer.get(rootSchema, $ref);

  if (current === undefined) {
    throw new Error("Could not find a definition for ".concat(origRef, "."));
  }

  if (current.hasOwnProperty("$ref")) {
    return findSchemaDefinition(current.$ref, rootSchema);
  }

  return current;
} // In the case where we have to implicitly create a schema, it is useful to know what type to use
//  based on the data we are defining

export var guessType = function guessType(value) {
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

export function stubExistingAdditionalProperties(schema) {
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
export function resolveSchema(schema) {
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

export function retrieveSchema(schema) {
  var rootSchema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!isObject(schema)) {
    return {};
  }

  var resolvedSchema = resolveSchema(schema, rootSchema, formData);

  if ("allOf" in schema) {
    try {
      resolvedSchema = mergeAllOf(_objectSpread({}, resolvedSchema, {
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

      var _validateFormData = validateFormData(formData, conditionSchema),
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


export function mergeSchemas(obj1, obj2) {
  var acc = Object.assign({}, obj1); // Prevent mutation of source object.

  return Object.keys(obj2).reduce(function (acc, key) {
    var left = obj1 ? obj1[key] : {},
        right = obj2[key];

    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeSchemas(left, right);
    } else if (obj1 && obj2 && (getSchemaType(obj1) === "object" || getSchemaType(obj2) === "object") && key === "required" && Array.isArray(left) && Array.isArray(right)) {
      // Don't include duplicate values when merging
      // "required" fields.
      acc[key] = union(left, right);
    } else {
      acc[key] = right;
    }

    return acc;
  }, acc);
}

function isArguments(object) {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}

export function deepEquals(a, b) {
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
export function shouldRender(comp, nextProps, nextState) {
  var props = comp.props,
      state = comp.state;
  return !deepEquals(props, nextProps) || !deepEquals(state, nextState);
}
export function toIdSchema(schema, id, rootSchema) {
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
export function toPathSchema(schema) {
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
export function parseDateString(dateString) {
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
export function toDateString(_ref2) {
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
export function utcToLocal(jsonDate) {
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
export function localToUTC(dateString) {
  if (dateString) {
    return new Date(dateString).toJSON();
  }
}
export function pad(num, size) {
  var s = String(num);

  while (s.length < size) {
    s = "0" + s;
  }

  return s;
}
export function dataURItoBlob(dataURI) {
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
export function rangeSpec(schema) {
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
export function getMatchingOption(formData, options, rootSchema) {
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

      if (isValid(augmentedSchema, formData, rootSchema)) {
        return _i2;
      }
    } else if (isValid(option, formData, rootSchema)) {
      return _i2;
    }
  }

  return 0;
} // Check to see if a schema specifies that a value must be true

export function schemaRequiresTrueValue(schema) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlJlYWN0SXMiLCJtZXJnZUFsbE9mIiwiZmlsbCIsInVuaW9uIiwianNvbnBvaW50ZXIiLCJmaWVsZHMiLCJ3aWRnZXRzIiwidmFsaWRhdGVGb3JtRGF0YSIsImlzVmFsaWQiLCJBRERJVElPTkFMX1BST1BFUlRZX0ZMQUciLCJ3aWRnZXRNYXAiLCJjaGVja2JveCIsInJhZGlvIiwic2VsZWN0IiwiaGlkZGVuIiwic3RyaW5nIiwidGV4dCIsInBhc3N3b3JkIiwiZW1haWwiLCJob3N0bmFtZSIsImlwdjQiLCJpcHY2IiwidXJpIiwidGV4dGFyZWEiLCJkYXRlIiwiZGF0ZXRpbWUiLCJjb2xvciIsImZpbGUiLCJudW1iZXIiLCJ1cGRvd24iLCJyYW5nZSIsImludGVnZXIiLCJhcnJheSIsImNoZWNrYm94ZXMiLCJmaWxlcyIsImNhbkV4cGFuZCIsInNjaGVtYSIsInVpU2NoZW1hIiwiZm9ybURhdGEiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImdldFVpT3B0aW9ucyIsImV4cGFuZGFibGUiLCJtYXhQcm9wZXJ0aWVzIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImdldERlZmF1bHRSZWdpc3RyeSIsImRlZmluaXRpb25zIiwicm9vdFNjaGVtYSIsImZvcm1Db250ZXh0IiwiZ2V0U2NoZW1hVHlwZSIsInR5cGUiLCJndWVzc1R5cGUiLCJwcm9wZXJ0aWVzIiwiQXJyYXkiLCJpbmNsdWRlcyIsImZpbmQiLCJnZXRXaWRnZXQiLCJ3aWRnZXQiLCJyZWdpc3RlcmVkV2lkZ2V0cyIsIm1lcmdlT3B0aW9ucyIsIldpZGdldCIsIk1lcmdlZFdpZGdldCIsImRlZmF1bHRPcHRpb25zIiwiZGVmYXVsdFByb3BzIiwib3B0aW9ucyIsInByb3BzIiwiaXNGb3J3YXJkUmVmIiwiY3JlYXRlRWxlbWVudCIsImlzTWVtbyIsIkVycm9yIiwiaGFzT3duUHJvcGVydHkiLCJyZWdpc3RlcmVkV2lkZ2V0IiwiaGFzV2lkZ2V0IiwiZSIsIm1lc3NhZ2UiLCJzdGFydHNXaXRoIiwiY29tcHV0ZURlZmF1bHRzIiwiX3NjaGVtYSIsInBhcmVudERlZmF1bHRzIiwicmF3Rm9ybURhdGEiLCJpbmNsdWRlVW5kZWZpbmVkVmFsdWVzIiwiaXNPYmplY3QiLCJkZWZhdWx0cyIsIm1lcmdlT2JqZWN0cyIsInJlZlNjaGVtYSIsImZpbmRTY2hlbWFEZWZpbml0aW9uIiwiJHJlZiIsInJlc29sdmVkU2NoZW1hIiwicmVzb2x2ZURlcGVuZGVuY2llcyIsImlzRml4ZWRJdGVtcyIsIml0ZW1zIiwibWFwIiwiaXRlbVNjaGVtYSIsImlkeCIsImlzQXJyYXkiLCJvbmVPZiIsImdldE1hdGNoaW5nT3B0aW9uIiwiYW55T2YiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJjb21wdXRlZERlZmF1bHQiLCJpdGVtIiwiYWRkaXRpb25hbEl0ZW1zIiwibWluSXRlbXMiLCJpc011bHRpU2VsZWN0IiwiZGVmYXVsdHNMZW5ndGgiLCJkZWZhdWx0RW50cmllcyIsImZpbGxlclNjaGVtYSIsImZpbGxlckVudHJpZXMiLCJjb25jYXQiLCJnZXREZWZhdWx0Rm9ybVN0YXRlIiwicmV0cmlldmVTY2hlbWEiLCJtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhIiwidmFsdWUiLCJhc3NpZ24iLCJmaWx0ZXIiLCJpbmRleE9mIiwiY29uc29sZSIsIndhcm4iLCJjb21wb25lbnQiLCJzdWJzdHJpbmciLCJnZXREaXNwbGF5TGFiZWwiLCJ1aU9wdGlvbnMiLCJsYWJlbCIsImRpc3BsYXlMYWJlbCIsInNjaGVtYVR5cGUiLCJpc0ZpbGVzQXJyYXkiLCJ0aGluZyIsIkZpbGUiLCJvYmoxIiwib2JqMiIsImNvbmNhdEFycmF5cyIsImxlZnQiLCJyaWdodCIsImFzTnVtYmVyIiwidGVzdCIsIm4iLCJOdW1iZXIiLCJ2YWxpZCIsImlzTmFOIiwib3JkZXJQcm9wZXJ0aWVzIiwib3JkZXIiLCJhcnJheVRvSGFzaCIsImFyciIsInByZXYiLCJjdXJyIiwiZXJyb3JQcm9wTGlzdCIsImpvaW4iLCJwcm9wZXJ0eUhhc2giLCJvcmRlckZpbHRlcmVkIiwicHJvcCIsIm9yZGVySGFzaCIsInJlc3QiLCJyZXN0SW5kZXgiLCJsYXN0SW5kZXhPZiIsImNvbXBsZXRlIiwic3BsaWNlIiwiaXNDb25zdGFudCIsInRvQ29uc3RhbnQiLCJpc1NlbGVjdCIsImFsdFNjaGVtYXMiLCJldmVyeSIsInVuaXF1ZUl0ZW1zIiwiaXRlbXNTY2hlbWEiLCJmb3JtYXQiLCJhbGxvd0FkZGl0aW9uYWxJdGVtcyIsIm9wdGlvbnNMaXN0IiwiaSIsImVudW1OYW1lcyIsIlN0cmluZyIsInRpdGxlIiwib3JpZ1JlZiIsImRlY29kZVVSSUNvbXBvbmVudCIsImN1cnJlbnQiLCJnZXQiLCJzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyIsImZvckVhY2giLCJyZXNvbHZlU2NoZW1hIiwicmVzb2x2ZVJlZmVyZW5jZSIsImFsbE9mIiwiYWxsT2ZTdWJzY2hlbWEiLCIkcmVmU2NoZW1hIiwibG9jYWxTY2hlbWEiLCJyZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZiIsImhhc0FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVwZW5kZW5jaWVzIiwicHJvY2Vzc0RlcGVuZGVuY2llcyIsImRlcGVuZGVuY3lLZXkiLCJkZXBlbmRlbmN5VmFsdWUiLCJyZW1haW5pbmdEZXBlbmRlbmNpZXMiLCJ3aXRoRGVwZW5kZW50UHJvcGVydGllcyIsIndpdGhEZXBlbmRlbnRTY2hlbWEiLCJhZGRpdGlvbmFsbHlSZXF1aXJlZCIsInJlcXVpcmVkIiwiZnJvbSIsIlNldCIsImRlcGVuZGVudFNjaGVtYSIsIm1lcmdlU2NoZW1hcyIsInJlc29sdmVkT25lT2YiLCJzdWJzY2hlbWEiLCJ3aXRoRXhhY3RseU9uZVN1YnNjaGVtYSIsInZhbGlkU3Vic2NoZW1hcyIsImNvbmRpdGlvblByb3BlcnR5U2NoZW1hIiwiY29uZGl0aW9uU2NoZW1hIiwiZXJyb3JzIiwiZGVwZW5kZW50U3Vic2NoZW1hIiwiaXNBcmd1bWVudHMiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJkZWVwRXF1YWxzIiwiYSIsImIiLCJjYSIsImNiIiwiRGF0ZSIsImdldFRpbWUiLCJSZWdFeHAiLCJzb3VyY2UiLCJnbG9iYWwiLCJtdWx0aWxpbmUiLCJsYXN0SW5kZXgiLCJpZ25vcmVDYXNlIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsImthIiwia2IiLCJjYWwiLCJwdXNoIiwic29ydCIsImoiLCJrIiwicG9wIiwic2hvdWxkUmVuZGVyIiwiY29tcCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsInN0YXRlIiwidG9JZFNjaGVtYSIsImlkIiwiaWRQcmVmaXgiLCJpZFNjaGVtYSIsIiRpZCIsIm5hbWUiLCJmaWVsZCIsImZpZWxkSWQiLCJ0b1BhdGhTY2hlbWEiLCJwYXRoU2NoZW1hIiwiJG5hbWUiLCJyZXBsYWNlIiwiX19yanNmX2FkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZWxlbWVudCIsInByb3BlcnR5IiwicGFyc2VEYXRlU3RyaW5nIiwiZGF0ZVN0cmluZyIsImluY2x1ZGVUaW1lIiwieWVhciIsIm1vbnRoIiwiZGF5IiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwiZ2V0VVRDSG91cnMiLCJnZXRVVENNaW51dGVzIiwiZ2V0VVRDU2Vjb25kcyIsInRvRGF0ZVN0cmluZyIsInRpbWUiLCJ1dGNUaW1lIiwiVVRDIiwidG9KU09OIiwidXRjVG9Mb2NhbCIsImpzb25EYXRlIiwieXl5eSIsInBhZCIsImdldEZ1bGxZZWFyIiwiTU0iLCJnZXRNb250aCIsImRkIiwiZ2V0RGF0ZSIsImhoIiwiZ2V0SG91cnMiLCJtbSIsImdldE1pbnV0ZXMiLCJzcyIsImdldFNlY29uZHMiLCJTU1MiLCJnZXRNaWxsaXNlY29uZHMiLCJsb2NhbFRvVVRDIiwibnVtIiwic2l6ZSIsInMiLCJkYXRhVVJJdG9CbG9iIiwiZGF0YVVSSSIsInNwbGl0dGVkIiwic3BsaXQiLCJwYXJhbXMiLCJwYXJhbSIsImJpbmFyeSIsImF0b2IiLCJjaGFyQ29kZUF0IiwiYmxvYiIsIndpbmRvdyIsIkJsb2IiLCJVaW50OEFycmF5IiwicmFuZ2VTcGVjIiwic3BlYyIsIm11bHRpcGxlT2YiLCJzdGVwIiwibWluaW11bSIsIm1pbiIsIm1heGltdW0iLCJtYXgiLCJvcHRpb24iLCJyZXF1aXJlc0FueU9mIiwiYXVnbWVudGVkU2NoZW1hIiwic2hhbGxvd0Nsb25lIiwic2NoZW1hUmVxdWlyZXNUcnVlVmFsdWUiLCJzb21lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFVBQXpCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1Qix5QkFBdkI7QUFDQSxPQUFPQyxJQUFQLE1BQWlCLGtDQUFqQjtBQUNBLE9BQU9DLEtBQVAsTUFBa0IsY0FBbEI7QUFDQSxPQUFPQyxXQUFQLE1BQXdCLGFBQXhCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixxQkFBbkI7QUFDQSxPQUFPQyxPQUFQLE1BQW9CLHNCQUFwQjtBQUNBLE9BQU9DLGdCQUFQLElBQTJCQyxPQUEzQixRQUEwQyxZQUExQztBQUVBLE9BQU8sSUFBTUMsd0JBQXdCLEdBQUcsdUJBQWpDO0FBRVAsSUFBTUMsU0FBUyxHQUFHO0FBQ2hCLGFBQVM7QUFDUEMsSUFBQUEsUUFBUSxFQUFFLGdCQURIO0FBRVBDLElBQUFBLEtBQUssRUFBRSxhQUZBO0FBR1BDLElBQUFBLE1BQU0sRUFBRSxjQUhEO0FBSVBDLElBQUFBLE1BQU0sRUFBRTtBQUpELEdBRE87QUFPaEJDLEVBQUFBLE1BQU0sRUFBRTtBQUNOQyxJQUFBQSxJQUFJLEVBQUUsWUFEQTtBQUVOQyxJQUFBQSxRQUFRLEVBQUUsZ0JBRko7QUFHTkMsSUFBQUEsS0FBSyxFQUFFLGFBSEQ7QUFJTkMsSUFBQUEsUUFBUSxFQUFFLFlBSko7QUFLTkMsSUFBQUEsSUFBSSxFQUFF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OUM7OztBQUNBLE1BQUlBLE1BQU0sQ0FBQytELEtBQVAsSUFBZ0IvRCxNQUFNLENBQUMrRCxLQUFQLENBQWFyRCxNQUFiLEtBQXdCLENBQTVDLEVBQStDO0FBQzdDLFdBQU9xUix1QkFBdUIsQ0FBQy9SLE1BQU0sQ0FBQytELEtBQVAsQ0FBYSxDQUFiLENBQUQsQ0FBOUI7QUFDRCxHQWQ2QyxDQWdCOUM7OztBQUNBLE1BQUkvRCxNQUFNLENBQUM2RCxLQUFQLElBQWdCN0QsTUFBTSxDQUFDNkQsS0FBUCxDQUFhbkQsTUFBYixLQUF3QixDQUE1QyxFQUErQztBQUM3QyxXQUFPcVIsdUJBQXVCLENBQUMvUixNQUFNLENBQUM2RCxLQUFQLENBQWEsQ0FBYixDQUFELENBQTlCO0FBQ0QsR0FuQjZDLENBcUI5QztBQUNBOzs7QUFDQSxNQUFJN0QsTUFBTSxDQUFDa0osS0FBWCxFQUFrQjtBQUNoQixXQUFPbEosTUFBTSxDQUFDa0osS0FBUCxDQUFhOEksSUFBYixDQUFrQkQsdUJBQWxCLENBQVA7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0SXMgZnJvbSBcInJlYWN0LWlzXCI7XG5pbXBvcnQgbWVyZ2VBbGxPZiBmcm9tIFwianNvbi1zY2hlbWEtbWVyZ2UtYWxsb2ZcIjtcbmltcG9ydCBmaWxsIGZyb20gXCJjb3JlLWpzLXB1cmUvZmVhdHVyZXMvYXJyYXkvZmlsbFwiO1xuaW1wb3J0IHVuaW9uIGZyb20gXCJsb2Rhc2gvdW5pb25cIjtcbmltcG9ydCBqc29ucG9pbnRlciBmcm9tIFwianNvbnBvaW50ZXJcIjtcbmltcG9ydCBmaWVsZHMgZnJvbSBcIi4vY29tcG9uZW50cy9maWVsZHNcIjtcbmltcG9ydCB3aWRnZXRzIGZyb20gXCIuL2NvbXBvbmVudHMvd2lkZ2V0c1wiO1xuaW1wb3J0IHZhbGlkYXRlRm9ybURhdGEsIHsgaXNWYWxpZCB9IGZyb20gXCIuL3ZhbGlkYXRlXCI7XG5cbmV4cG9ydCBjb25zdCBBRERJVElPTkFMX1BST1BFUlRZX0ZMQUcgPSBcIl9fYWRkaXRpb25hbF9wcm9wZXJ0eVwiO1xuXG5jb25zdCB3aWRnZXRNYXAgPSB7XG4gIGJvb2xlYW46IHtcbiAgICBjaGVja2JveDogXCJDaGVja2JveFdpZGdldFwiLFxuICAgIHJhZGlvOiBcIlJhZGlvV2lkZ2V0XCIsXG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcbiAgfSxcbiAgc3RyaW5nOiB7XG4gICAgdGV4dDogXCJUZXh0V2lkZ2V0XCIsXG4gICAgcGFzc3dvcmQ6IFwiUGFzc3dvcmRXaWRnZXRcIixcbiAgICBlbWFpbDogXCJFbWFpbFdpZGdldFwiLFxuICAgIGhvc3RuYW1lOiBcIlRleHRXaWRnZXRcIixcbiAgICBpcHY0OiBcIlRleHRXaWRnZXRcIixcbiAgICBpcHY2OiBcIlRleHRXaWRnZXRcIixcbiAgICB1cmk6IFwiVVJMV2lkZ2V0XCIsXG4gICAgXCJkYXRhLXVybFwiOiBcIkZpbGVXaWRnZXRcIixcbiAgICByYWRpbzogXCJSYWRpb1dpZGdldFwiLFxuICAgIHNlbGVjdDogXCJTZWxlY3RXaWRnZXRcIixcbiAgICB0ZXh0YXJlYTogXCJUZXh0YXJlYVdpZGdldFwiLFxuICAgIGhpZGRlbjogXCJIaWRkZW5XaWRnZXRcIixcbiAgICBkYXRlOiBcIkRhdGVXaWRnZXRcIixcbiAgICBkYXRldGltZTogXCJEYXRlVGltZVdpZGdldFwiLFxuICAgIFwiZGF0ZS10aW1lXCI6IFwiRGF0ZVRpbWVXaWRnZXRcIixcbiAgICBcImFsdC1kYXRlXCI6IFwiQWx0RGF0ZVdpZGdldFwiLFxuICAgIFwiYWx0LWRhdGV0aW1lXCI6IFwiQWx0RGF0ZVRpbWVXaWRnZXRcIixcbiAgICBjb2xvcjogXCJDb2xvcldpZGdldFwiLFxuICAgIGZpbGU6IFwiRmlsZVdpZGdldFwiLFxuICB9LFxuICBudW1iZXI6IHtcbiAgICB0ZXh0OiBcIlRleHRXaWRnZXRcIixcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXG4gICAgdXBkb3duOiBcIlVwRG93bldpZGdldFwiLFxuICAgIHJhbmdlOiBcIlJhbmdlV2lkZ2V0XCIsXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXG4gIH0sXG4gIGludGVnZXI6IHtcbiAgICB0ZXh0OiBcIlRleHRXaWRnZXRcIixcbiAgICBzZWxlY3Q6IFwiU2VsZWN0V2lkZ2V0XCIsXG4gICAgdXBkb3duOiBcIlVwRG93bldpZGdldFwiLFxuICAgIHJhbmdlOiBcIlJhbmdlV2lkZ2V0XCIsXG4gICAgcmFkaW86IFwiUmFkaW9XaWRnZXRcIixcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXG4gIH0sXG4gIGFycmF5OiB7XG4gICAgc2VsZWN0OiBcIlNlbGVjdFdpZGdldFwiLFxuICAgIGNoZWNrYm94ZXM6IFwiQ2hlY2tib3hlc1dpZGdldFwiLFxuICAgIGZpbGVzOiBcIkZpbGVXaWRnZXRcIixcbiAgICBoaWRkZW46IFwiSGlkZGVuV2lkZ2V0XCIsXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gY2FuRXhwYW5kKHNjaGVtYSwgdWlTY2hlbWEsIGZvcm1EYXRhKSB7XG4gIGlmICghc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHsgZXhwYW5kYWJsZSB9ID0gZ2V0VWlPcHRpb25zKHVpU2NoZW1hKTtcbiAgaWYgKGV4cGFuZGFibGUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGV4cGFuZGFibGU7XG4gIH1cbiAgLy8gaWYgdWk6b3B0aW9ucy5leHBhbmRhYmxlIHdhcyBub3QgZXhwbGljaXRseSBzZXQgdG8gZmFsc2UsIHdlIGNhbiBhZGRcbiAgLy8gYW5vdGhlciBwcm9wZXJ0eSBpZiB3ZSBoYXZlIG5vdCBleGNlZWRlZCBtYXhQcm9wZXJ0aWVzIHlldFxuICBpZiAoc2NoZW1hLm1heFByb3BlcnRpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhmb3JtRGF0YSkubGVuZ3RoIDwgc2NoZW1hLm1heFByb3BlcnRpZXM7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0UmVnaXN0cnkoKSB7XG4gIHJldHVybiB7XG4gICAgZmllbGRzLFxuICAgIHdpZGdldHMsXG4gICAgZGVmaW5pdGlvbnM6IHt9LFxuICAgIHJvb3RTY2hlbWE6IHt9LFxuICAgIGZvcm1Db250ZXh0OiB7fSxcbiAgfTtcbn1cblxuLyogR2V0cyB0aGUgdHlwZSBvZiBhIGdpdmVuIHNjaGVtYS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2hlbWFUeXBlKHNjaGVtYSkge1xuICBsZXQgeyB0eXBlIH0gPSBzY2hlbWE7XG5cbiAgaWYgKCF0eXBlICYmIHNjaGVtYS5jb25zdCkge1xuICAgIHJldHVybiBndWVzc1R5cGUoc2NoZW1hLmNvbnN0KTtcbiAgfVxuXG4gIGlmICghdHlwZSAmJiBzY2hlbWEuZW51bSkge1xuICAgIHJldHVybiBcInN0cmluZ1wiO1xuICB9XG5cbiAgaWYgKCF0eXBlICYmIChzY2hlbWEucHJvcGVydGllcyB8fCBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXMpKSB7XG4gICAgcmV0dXJuIFwib2JqZWN0XCI7XG4gIH1cblxuICBpZiAodHlwZSBpbnN0YW5jZW9mIEFycmF5ICYmIHR5cGUubGVuZ3RoID09PSAyICYmIHR5cGUuaW5jbHVkZXMoXCJudWxsXCIpKSB7XG4gICAgcmV0dXJuIHR5cGUuZmluZCh0eXBlID0+IHR5cGUgIT09IFwibnVsbFwiKTtcbiAgfVxuXG4gIHJldHVybiB0eXBlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2lkZ2V0KHNjaGVtYSwgd2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyA9IHt9KSB7XG4gIGNvbnN0IHR5cGUgPSBnZXRTY2hlbWFUeXBlKHNjaGVtYSk7XG5cbiAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKFdpZGdldCkge1xuICAgIC8vIGNhY2hlIHJldHVybiB2YWx1ZSBhcyBwcm9wZXJ0eSBvZiB3aWRnZXQgZm9yIHByb3BlciByZWFjdCByZWNvbmNpbGlhdGlvblxuICAgIGlmICghV2lkZ2V0Lk1lcmdlZFdpZGdldCkge1xuICAgICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPVxuICAgICAgICAoV2lkZ2V0LmRlZmF1bHRQcm9wcyAmJiBXaWRnZXQuZGVmYXVsdFByb3BzLm9wdGlvbnMpIHx8IHt9O1xuICAgICAgV2lkZ2V0Lk1lcmdlZFdpZGdldCA9ICh7IG9wdGlvbnMgPSB7fSwgLi4ucHJvcHMgfSkgPT4gKFxuICAgICAgICA8V2lkZ2V0IG9wdGlvbnM9e3sgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfX0gey4uLnByb3BzfSAvPlxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIFdpZGdldC5NZXJnZWRXaWRnZXQ7XG4gIH1cblxuICBpZiAoXG4gICAgdHlwZW9mIHdpZGdldCA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgUmVhY3RJcy5pc0ZvcndhcmRSZWYoUmVhY3QuY3JlYXRlRWxlbWVudCh3aWRnZXQpKSB8fFxuICAgIFJlYWN0SXMuaXNNZW1vKHdpZGdldClcbiAgKSB7XG4gICAgcmV0dXJuIG1lcmdlT3B0aW9ucyh3aWRnZXQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB3aWRnZXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIHdpZGdldCBkZWZpbml0aW9uOiAke3R5cGVvZiB3aWRnZXR9YCk7XG4gIH1cblxuICBpZiAocmVnaXN0ZXJlZFdpZGdldHMuaGFzT3duUHJvcGVydHkod2lkZ2V0KSkge1xuICAgIGNvbnN0IHJlZ2lzdGVyZWRXaWRnZXQgPSByZWdpc3RlcmVkV2lkZ2V0c1t3aWRnZXRdO1xuICAgIHJldHVybiBnZXRXaWRnZXQoc2NoZW1hLCByZWdpc3RlcmVkV2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyk7XG4gIH1cblxuICBpZiAoIXdpZGdldE1hcC5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gd2lkZ2V0IGZvciB0eXBlIFwiJHt0eXBlfVwiYCk7XG4gIH1cblxuICBpZiAod2lkZ2V0TWFwW3R5cGVdLmhhc093blByb3BlcnR5KHdpZGdldCkpIHtcbiAgICBjb25zdCByZWdpc3RlcmVkV2lkZ2V0ID0gcmVnaXN0ZXJlZFdpZGdldHNbd2lkZ2V0TWFwW3R5cGVdW3dpZGdldF1dO1xuICAgIHJldHVybiBnZXRXaWRnZXQoc2NoZW1hLCByZWdpc3RlcmVkV2lkZ2V0LCByZWdpc3RlcmVkV2lkZ2V0cyk7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoYE5vIHdpZGdldCBcIiR7d2lkZ2V0fVwiIGZvciB0eXBlIFwiJHt0eXBlfVwiYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzID0ge30pIHtcbiAgdHJ5IHtcbiAgICBnZXRXaWRnZXQoc2NoZW1hLCB3aWRnZXQsIHJlZ2lzdGVyZWRXaWRnZXRzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChcbiAgICAgIGUubWVzc2FnZSAmJlxuICAgICAgKGUubWVzc2FnZS5zdGFydHNXaXRoKFwiTm8gd2lkZ2V0XCIpIHx8XG4gICAgICAgIGUubWVzc2FnZS5zdGFydHNXaXRoKFwiVW5zdXBwb3J0ZWQgd2lkZ2V0XCIpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEZWZhdWx0cyhcbiAgX3NjaGVtYSxcbiAgcGFyZW50RGVmYXVsdHMsXG4gIHJvb3RTY2hlbWEsXG4gIHJhd0Zvcm1EYXRhID0ge30sXG4gIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXMgPSBmYWxzZVxuKSB7XG4gIGxldCBzY2hlbWEgPSBpc09iamVjdChfc2NoZW1hKSA/IF9zY2hlbWEgOiB7fTtcbiAgY29uc3QgZm9ybURhdGEgPSBpc09iamVjdChyYXdGb3JtRGF0YSkgPyByYXdGb3JtRGF0YSA6IHt9O1xuICAvLyBDb21wdXRlIHRoZSBkZWZhdWx0cyByZWN1cnNpdmVseTogZ2l2ZSBoaWdoZXN0IHByaW9yaXR5IHRvIGRlZXBlc3Qgbm9kZXMuXG4gIGxldCBkZWZhdWx0cyA9IHBhcmVudERlZmF1bHRzO1xuICBpZiAoaXNPYmplY3QoZGVmYXVsdHMpICYmIGlzT2JqZWN0KHNjaGVtYS5kZWZhdWx0KSkge1xuICAgIC8vIEZvciBvYmplY3QgZGVmYXVsdHMsIG9ubHkgb3ZlcnJpZGUgcGFyZW50IGRlZmF1bHRzIHRoYXQgYXJlIGRlZmluZWQgaW5cbiAgICAvLyBzY2hlbWEuZGVmYXVsdC5cbiAgICBkZWZhdWx0cyA9IG1lcmdlT2JqZWN0cyhkZWZhdWx0cywgc2NoZW1hLmRlZmF1bHQpO1xuICB9IGVsc2UgaWYgKFwiZGVmYXVsdFwiIGluIHNjaGVtYSkge1xuICAgIC8vIFVzZSBzY2hlbWEgZGVmYXVsdHMgZm9yIHRoaXMgbm9kZS5cbiAgICBkZWZhdWx0cyA9IHNjaGVtYS5kZWZhdWx0O1xuICB9IGVsc2UgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSkge1xuICAgIC8vIFVzZSByZWZlcmVuY2VkIHNjaGVtYSBkZWZhdWx0cyBmb3IgdGhpcyBub2RlLlxuICAgIGNvbnN0IHJlZlNjaGVtYSA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHNjaGVtYS4kcmVmLCByb290U2NoZW1hKTtcbiAgICByZXR1cm4gY29tcHV0ZURlZmF1bHRzKFxuICAgICAgcmVmU2NoZW1hLFxuICAgICAgZGVmYXVsdHMsXG4gICAgICByb290U2NoZW1hLFxuICAgICAgZm9ybURhdGEsXG4gICAgICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSkge1xuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcbiAgICByZXR1cm4gY29tcHV0ZURlZmF1bHRzKFxuICAgICAgcmVzb2x2ZWRTY2hlbWEsXG4gICAgICBkZWZhdWx0cyxcbiAgICAgIHJvb3RTY2hlbWEsXG4gICAgICBmb3JtRGF0YSxcbiAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcbiAgICApO1xuICB9IGVsc2UgaWYgKGlzRml4ZWRJdGVtcyhzY2hlbWEpKSB7XG4gICAgZGVmYXVsdHMgPSBzY2hlbWEuaXRlbXMubWFwKChpdGVtU2NoZW1hLCBpZHgpID0+XG4gICAgICBjb21wdXRlRGVmYXVsdHMoXG4gICAgICAgIGl0ZW1TY2hlbWEsXG4gICAgICAgIEFycmF5LmlzQXJyYXkocGFyZW50RGVmYXVsdHMpID8gcGFyZW50RGVmYXVsdHNbaWR4XSA6IHVuZGVmaW5lZCxcbiAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgZm9ybURhdGEsXG4gICAgICAgIGluY2x1ZGVVbmRlZmluZWRWYWx1ZXNcbiAgICAgIClcbiAgICApO1xuICB9IGVsc2UgaWYgKFwib25lT2ZcIiBpbiBzY2hlbWEpIHtcbiAgICBzY2hlbWEgPVxuICAgICAgc2NoZW1hLm9uZU9mW2dldE1hdGNoaW5nT3B0aW9uKHVuZGVmaW5lZCwgc2NoZW1hLm9uZU9mLCByb290U2NoZW1hKV07XG4gIH0gZWxzZSBpZiAoXCJhbnlPZlwiIGluIHNjaGVtYSkge1xuICAgIHNjaGVtYSA9XG4gICAgICBzY2hlbWEuYW55T2ZbZ2V0TWF0Y2hpbmdPcHRpb24odW5kZWZpbmVkLCBzY2hlbWEuYW55T2YsIHJvb3RTY2hlbWEpXTtcbiAgfVxuXG4gIC8vIE5vdCBkZWZhdWx0cyBkZWZpbmVkIGZvciB0aGlzIG5vZGUsIGZhbGxiYWNrIHRvIGdlbmVyaWMgdHlwZWQgb25lcy5cbiAgaWYgKHR5cGVvZiBkZWZhdWx0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGRlZmF1bHRzID0gc2NoZW1hLmRlZmF1bHQ7XG4gIH1cblxuICBzd2l0Y2ggKGdldFNjaGVtYVR5cGUoc2NoZW1hKSkge1xuICAgIC8vIFdlIG5lZWQgdG8gcmVjdXIgZm9yIG9iamVjdCBzY2hlbWEgaW5uZXIgZGVmYXVsdCB2YWx1ZXMuXG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIGRlZmF1bHRzIGZvciB0aGlzIG5vZGUsIHdpdGggdGhlIHBhcmVudCBkZWZhdWx0cyB3ZSBtaWdodFxuICAgICAgICAvLyBoYXZlIGZyb20gYSBwcmV2aW91cyBydW46IGRlZmF1bHRzW2tleV0uXG4gICAgICAgIGxldCBjb21wdXRlZERlZmF1bHQgPSBjb21wdXRlRGVmYXVsdHMoXG4gICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNba2V5XSxcbiAgICAgICAgICAoZGVmYXVsdHMgfHwge30pW2tleV0sXG4gICAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgICAoZm9ybURhdGEgfHwge30pW2tleV0sXG4gICAgICAgICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xuICAgICAgICApO1xuICAgICAgICBpZiAoaW5jbHVkZVVuZGVmaW5lZFZhbHVlcyB8fCBjb21wdXRlZERlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFjY1trZXldID0gY29tcHV0ZWREZWZhdWx0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSk7XG5cbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgIC8vIEluamVjdCBkZWZhdWx0cyBpbnRvIGV4aXN0aW5nIGFycmF5IGRlZmF1bHRzXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkZWZhdWx0cykpIHtcbiAgICAgICAgZGVmYXVsdHMgPSBkZWZhdWx0cy5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXG4gICAgICAgICAgICBzY2hlbWEuaXRlbXNbaWR4XSB8fCBzY2hlbWEuYWRkaXRpb25hbEl0ZW1zIHx8IHt9LFxuICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgIHJvb3RTY2hlbWFcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gRGVlcGx5IGluamVjdCBkZWZhdWx0cyBpbnRvIGFscmVhZHkgZXhpc3RpbmcgZm9ybSBkYXRhXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdGb3JtRGF0YSkpIHtcbiAgICAgICAgZGVmYXVsdHMgPSByYXdGb3JtRGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICAgIHJldHVybiBjb21wdXRlRGVmYXVsdHMoXG4gICAgICAgICAgICBzY2hlbWEuaXRlbXMsXG4gICAgICAgICAgICAoZGVmYXVsdHMgfHwge30pW2lkeF0sXG4gICAgICAgICAgICByb290U2NoZW1hLFxuICAgICAgICAgICAgaXRlbVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHNjaGVtYS5taW5JdGVtcykge1xuICAgICAgICBpZiAoIWlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hKSkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRzTGVuZ3RoID0gZGVmYXVsdHMgPyBkZWZhdWx0cy5sZW5ndGggOiAwO1xuICAgICAgICAgIGlmIChzY2hlbWEubWluSXRlbXMgPiBkZWZhdWx0c0xlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdEVudHJpZXMgPSBkZWZhdWx0cyB8fCBbXTtcbiAgICAgICAgICAgIC8vIHBvcHVsYXRlIHRoZSBhcnJheSB3aXRoIHRoZSBkZWZhdWx0c1xuICAgICAgICAgICAgY29uc3QgZmlsbGVyU2NoZW1hID0gQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpXG4gICAgICAgICAgICAgID8gc2NoZW1hLmFkZGl0aW9uYWxJdGVtc1xuICAgICAgICAgICAgICA6IHNjaGVtYS5pdGVtcztcbiAgICAgICAgICAgIGNvbnN0IGZpbGxlckVudHJpZXMgPSBmaWxsKFxuICAgICAgICAgICAgICBuZXcgQXJyYXkoc2NoZW1hLm1pbkl0ZW1zIC0gZGVmYXVsdHNMZW5ndGgpLFxuICAgICAgICAgICAgICBjb21wdXRlRGVmYXVsdHMoZmlsbGVyU2NoZW1hLCBmaWxsZXJTY2hlbWEuZGVmYXVsdHMsIHJvb3RTY2hlbWEpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8gdGhlbiBmaWxsIHVwIHRoZSByZXN0IHdpdGggZWl0aGVyIHRoZSBpdGVtIGRlZmF1bHQgb3IgZW1wdHksIHVwIHRvIG1pbkl0ZW1zXG5cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RW50cmllcy5jb25jYXQoZmlsbGVyRW50cmllcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBkZWZhdWx0cyA/IGRlZmF1bHRzIDogW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZGVmYXVsdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0Rm9ybVN0YXRlKFxuICBfc2NoZW1hLFxuICBmb3JtRGF0YSxcbiAgcm9vdFNjaGVtYSA9IHt9LFxuICBpbmNsdWRlVW5kZWZpbmVkVmFsdWVzID0gZmFsc2Vcbikge1xuICBpZiAoIWlzT2JqZWN0KF9zY2hlbWEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzY2hlbWE6IFwiICsgX3NjaGVtYSk7XG4gIH1cbiAgY29uc3Qgc2NoZW1hID0gcmV0cmlldmVTY2hlbWEoX3NjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICBjb25zdCBkZWZhdWx0cyA9IGNvbXB1dGVEZWZhdWx0cyhcbiAgICBzY2hlbWEsXG4gICAgX3NjaGVtYS5kZWZhdWx0LFxuICAgIHJvb3RTY2hlbWEsXG4gICAgZm9ybURhdGEsXG4gICAgaW5jbHVkZVVuZGVmaW5lZFZhbHVlc1xuICApO1xuICBpZiAodHlwZW9mIGZvcm1EYXRhID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gTm8gZm9ybSBkYXRhPyBVc2Ugc2NoZW1hIGRlZmF1bHRzLlxuICAgIHJldHVybiBkZWZhdWx0cztcbiAgfVxuICBpZiAoaXNPYmplY3QoZm9ybURhdGEpIHx8IEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XG4gICAgcmV0dXJuIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGZvcm1EYXRhKTtcbiAgfVxuICBpZiAoZm9ybURhdGEgPT09IDAgfHwgZm9ybURhdGEgPT09IGZhbHNlIHx8IGZvcm1EYXRhID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG4gIHJldHVybiBmb3JtRGF0YSB8fCBkZWZhdWx0cztcbn1cblxuLyoqXG4gKiBXaGVuIG1lcmdpbmcgZGVmYXVsdHMgYW5kIGZvcm0gZGF0YSwgd2Ugd2FudCB0byBtZXJnZSBpbiB0aGlzIHNwZWNpZmljIHdheTpcbiAqIC0gb2JqZWN0cyBhcmUgZGVlcGx5IG1lcmdlZFxuICogLSBhcnJheXMgYXJlIG1lcmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQ6XG4gKiAgIC0gd2hlbiB0aGUgYXJyYXkgaXMgc2V0IGluIGZvcm0gZGF0YSwgb25seSBhcnJheSBlbnRyaWVzIHNldCBpbiBmb3JtIGRhdGFcbiAqICAgICBhcmUgZGVlcGx5IG1lcmdlZDsgYWRkaXRpb25hbCBlbnRyaWVzIGZyb20gdGhlIGRlZmF1bHRzIGFyZSBpZ25vcmVkXG4gKiAgIC0gd2hlbiB0aGUgYXJyYXkgaXMgbm90IHNldCBpbiBmb3JtIGRhdGEsIHRoZSBkZWZhdWx0IGlzIGNvcGllZCBvdmVyXG4gKiAtIHNjYWxhcnMgYXJlIG92ZXJ3cml0dGVuL3NldCBieSBmb3JtIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVmYXVsdHNXaXRoRm9ybURhdGEoZGVmYXVsdHMsIGZvcm1EYXRhKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGZvcm1EYXRhKSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShkZWZhdWx0cykpIHtcbiAgICAgIGRlZmF1bHRzID0gW107XG4gICAgfVxuICAgIHJldHVybiBmb3JtRGF0YS5tYXAoKHZhbHVlLCBpZHgpID0+IHtcbiAgICAgIGlmIChkZWZhdWx0c1tpZHhdKSB7XG4gICAgICAgIHJldHVybiBtZXJnZURlZmF1bHRzV2l0aEZvcm1EYXRhKGRlZmF1bHRzW2lkeF0sIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChpc09iamVjdChmb3JtRGF0YSkpIHtcbiAgICBjb25zdCBhY2MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cyk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZm9ybURhdGEpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGFjY1trZXldID0gbWVyZ2VEZWZhdWx0c1dpdGhGb3JtRGF0YShcbiAgICAgICAgZGVmYXVsdHMgPyBkZWZhdWx0c1trZXldIDoge30sXG4gICAgICAgIGZvcm1EYXRhW2tleV1cbiAgICAgICk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIGFjYyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVaU9wdGlvbnModWlTY2hlbWEpIHtcbiAgLy8gZ2V0IGFsbCBwYXNzZWQgb3B0aW9ucyBmcm9tIHVpOndpZGdldCwgdWk6b3B0aW9ucywgYW5kIHVpOjxvcHRpb25OYW1lPlxuICByZXR1cm4gT2JqZWN0LmtleXModWlTY2hlbWEpXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2YoXCJ1aTpcIikgPT09IDApXG4gICAgLnJlZHVjZSgob3B0aW9ucywga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHVpU2NoZW1hW2tleV07XG4gICAgICBpZiAoa2V5ID09PSBcInVpOndpZGdldFwiICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJTZXR0aW5nIG9wdGlvbnMgdmlhIHVpOndpZGdldCBvYmplY3QgaXMgZGVwcmVjYXRlZCwgdXNlIHVpOm9wdGlvbnMgaW5zdGVhZFwiXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAuLi4odmFsdWUub3B0aW9ucyB8fCB7fSksXG4gICAgICAgICAgd2lkZ2V0OiB2YWx1ZS5jb21wb25lbnQsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSBcInVpOm9wdGlvbnNcIiAmJiBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHsgLi4ub3B0aW9ucywgLi4udmFsdWUgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IC4uLm9wdGlvbnMsIFtrZXkuc3Vic3RyaW5nKDMpXTogdmFsdWUgfTtcbiAgICB9LCB7fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TGFiZWwoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSkge1xuICBjb25zdCB1aU9wdGlvbnMgPSBnZXRVaU9wdGlvbnModWlTY2hlbWEpO1xuICBsZXQgeyBsYWJlbDogZGlzcGxheUxhYmVsID0gdHJ1ZSB9ID0gdWlPcHRpb25zO1xuICBjb25zdCBzY2hlbWFUeXBlID0gZ2V0U2NoZW1hVHlwZShzY2hlbWEpO1xuXG4gIGlmIChzY2hlbWFUeXBlID09PSBcImFycmF5XCIpIHtcbiAgICBkaXNwbGF5TGFiZWwgPVxuICAgICAgaXNNdWx0aVNlbGVjdChzY2hlbWEsIHJvb3RTY2hlbWEpIHx8XG4gICAgICBpc0ZpbGVzQXJyYXkoc2NoZW1hLCB1aVNjaGVtYSwgcm9vdFNjaGVtYSk7XG4gIH1cblxuICBpZiAoc2NoZW1hVHlwZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xuICB9XG4gIGlmIChzY2hlbWFUeXBlID09PSBcImJvb2xlYW5cIiAmJiAhdWlTY2hlbWFbXCJ1aTp3aWRnZXRcIl0pIHtcbiAgICBkaXNwbGF5TGFiZWwgPSBmYWxzZTtcbiAgfVxuICBpZiAodWlTY2hlbWFbXCJ1aTpmaWVsZFwiXSkge1xuICAgIGRpc3BsYXlMYWJlbCA9IGZhbHNlO1xuICB9XG4gIHJldHVybiBkaXNwbGF5TGFiZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh0aGluZykge1xuICBpZiAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpbmcgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IFwib2JqZWN0XCIgJiYgdGhpbmcgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodGhpbmcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG9iajEsIG9iajIsIGNvbmNhdEFycmF5cyA9IGZhbHNlKSB7XG4gIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIGRlZXBseSBuZXN0ZWQgb2JqZWN0cy5cbiAgdmFyIGFjYyA9IE9iamVjdC5hc3NpZ24oe30sIG9iajEpOyAvLyBQcmV2ZW50IG11dGF0aW9uIG9mIHNvdXJjZSBvYmplY3QuXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmoyKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgY29uc3QgbGVmdCA9IG9iajEgPyBvYmoxW2tleV0gOiB7fSxcbiAgICAgIHJpZ2h0ID0gb2JqMltrZXldO1xuICAgIGlmIChvYmoxICYmIG9iajEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpc09iamVjdChyaWdodCkpIHtcbiAgICAgIGFjY1trZXldID0gbWVyZ2VPYmplY3RzKGxlZnQsIHJpZ2h0LCBjb25jYXRBcnJheXMpO1xuICAgIH0gZWxzZSBpZiAoY29uY2F0QXJyYXlzICYmIEFycmF5LmlzQXJyYXkobGVmdCkgJiYgQXJyYXkuaXNBcnJheShyaWdodCkpIHtcbiAgICAgIGFjY1trZXldID0gbGVmdC5jb25jYXQocmlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY2Nba2V5XSA9IHJpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCBhY2MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNOdW1iZXIodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAoL1xcLiQvLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gXCIzLlwiIGNhbid0IHJlYWxseSBiZSBjb25zaWRlcmVkIGEgbnVtYmVyIGV2ZW4gaWYgaXQgcGFyc2VzIGluIGpzLiBUaGVcbiAgICAvLyB1c2VyIGlzIG1vc3QgbGlrZWx5IGVudGVyaW5nIGEgZmxvYXQuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmICgvXFwuMCQvLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gd2UgbmVlZCB0byByZXR1cm4gdGhpcyBhcyBhIHN0cmluZyBoZXJlLCB0byBhbGxvdyBmb3IgaW5wdXQgbGlrZSAzLjA3XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGNvbnN0IG4gPSBOdW1iZXIodmFsdWUpO1xuICBjb25zdCB2YWxpZCA9IHR5cGVvZiBuID09PSBcIm51bWJlclwiICYmICFOdW1iZXIuaXNOYU4obik7XG5cbiAgaWYgKC9cXC5cXGQqMCQvLnRlc3QodmFsdWUpKSB7XG4gICAgLy8gSXQncyBhIG51bWJlciwgdGhhdCdzIGNvb2wgLSBidXQgd2UgbmVlZCBpdCBhcyBhIHN0cmluZyBzbyBpdCBkb2Vzbid0IHNjcmV3XG4gICAgLy8gd2l0aCB0aGUgdXNlciB3aGVuIGVudGVyaW5nIGRvbGxhciBhbW91bnRzIG9yIG90aGVyIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSB3aXRoXG4gICAgLy8gc3BlY2lmaWMgcHJlY2lzaW9uIG9yIG51bWJlciBvZiBzaWduaWZpY2FudCBkaWdpdHMpXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbGlkID8gbiA6IHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIG9yZGVyKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShvcmRlcikpIHtcbiAgICByZXR1cm4gcHJvcGVydGllcztcbiAgfVxuXG4gIGNvbnN0IGFycmF5VG9IYXNoID0gYXJyID0+XG4gICAgYXJyLnJlZHVjZSgocHJldiwgY3VycikgPT4ge1xuICAgICAgcHJldltjdXJyXSA9IHRydWU7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG4gIGNvbnN0IGVycm9yUHJvcExpc3QgPSBhcnIgPT5cbiAgICBhcnIubGVuZ3RoID4gMVxuICAgICAgPyBgcHJvcGVydGllcyAnJHthcnIuam9pbihcIicsICdcIil9J2BcbiAgICAgIDogYHByb3BlcnR5ICcke2FyclswXX0nYDtcbiAgY29uc3QgcHJvcGVydHlIYXNoID0gYXJyYXlUb0hhc2gocHJvcGVydGllcyk7XG4gIGNvbnN0IG9yZGVyRmlsdGVyZWQgPSBvcmRlci5maWx0ZXIoXG4gICAgcHJvcCA9PiBwcm9wID09PSBcIipcIiB8fCBwcm9wZXJ0eUhhc2hbcHJvcF1cbiAgKTtcbiAgY29uc3Qgb3JkZXJIYXNoID0gYXJyYXlUb0hhc2gob3JkZXJGaWx0ZXJlZCk7XG5cbiAgY29uc3QgcmVzdCA9IHByb3BlcnRpZXMuZmlsdGVyKHByb3AgPT4gIW9yZGVySGFzaFtwcm9wXSk7XG4gIGNvbnN0IHJlc3RJbmRleCA9IG9yZGVyRmlsdGVyZWQuaW5kZXhPZihcIipcIik7XG4gIGlmIChyZXN0SW5kZXggPT09IC0xKSB7XG4gICAgaWYgKHJlc3QubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGB1aVNjaGVtYSBvcmRlciBsaXN0IGRvZXMgbm90IGNvbnRhaW4gJHtlcnJvclByb3BMaXN0KHJlc3QpfWBcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBvcmRlckZpbHRlcmVkO1xuICB9XG4gIGlmIChyZXN0SW5kZXggIT09IG9yZGVyRmlsdGVyZWQubGFzdEluZGV4T2YoXCIqXCIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidWlTY2hlbWEgb3JkZXIgbGlzdCBjb250YWlucyBtb3JlIHRoYW4gb25lIHdpbGRjYXJkIGl0ZW1cIik7XG4gIH1cblxuICBjb25zdCBjb21wbGV0ZSA9IFsuLi5vcmRlckZpbHRlcmVkXTtcbiAgY29tcGxldGUuc3BsaWNlKHJlc3RJbmRleCwgMSwgLi4ucmVzdCk7XG4gIHJldHVybiBjb21wbGV0ZTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNoZWNrcyBpZiB0aGUgZ2l2ZW4gc2NoZW1hIG1hdGNoZXMgYSBzaW5nbGVcbiAqIGNvbnN0YW50IHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDb25zdGFudChzY2hlbWEpIHtcbiAgcmV0dXJuIChcbiAgICAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB8fFxuICAgIHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImNvbnN0XCIpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0NvbnN0YW50KHNjaGVtYSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEuZW51bSkgJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHNjaGVtYS5lbnVtWzBdO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImNvbnN0XCIpKSB7XG4gICAgcmV0dXJuIHNjaGVtYS5jb25zdDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzY2hlbWEgY2Fubm90IGJlIGluZmVycmVkIGFzIGEgY29uc3RhbnRcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU2VsZWN0KF9zY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSkge1xuICBjb25zdCBzY2hlbWEgPSByZXRyaWV2ZVNjaGVtYShfc2NoZW1hLCByb290U2NoZW1hKTtcbiAgY29uc3QgYWx0U2NoZW1hcyA9IHNjaGVtYS5vbmVPZiB8fCBzY2hlbWEuYW55T2Y7XG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYS5lbnVtKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYWx0U2NoZW1hcykpIHtcbiAgICByZXR1cm4gYWx0U2NoZW1hcy5ldmVyeShhbHRTY2hlbWFzID0+IGlzQ29uc3RhbnQoYWx0U2NoZW1hcykpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTXVsdGlTZWxlY3Qoc2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcbiAgaWYgKCFzY2hlbWEudW5pcXVlSXRlbXMgfHwgIXNjaGVtYS5pdGVtcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gaXNTZWxlY3Qoc2NoZW1hLml0ZW1zLCByb290U2NoZW1hKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlsZXNBcnJheShzY2hlbWEsIHVpU2NoZW1hLCByb290U2NoZW1hID0ge30pIHtcbiAgaWYgKHVpU2NoZW1hW1widWk6d2lkZ2V0XCJdID09PSBcImZpbGVzXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChzY2hlbWEuaXRlbXMpIHtcbiAgICBjb25zdCBpdGVtc1NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYS5pdGVtcywgcm9vdFNjaGVtYSk7XG4gICAgcmV0dXJuIGl0ZW1zU2NoZW1hLnR5cGUgPT09IFwic3RyaW5nXCIgJiYgaXRlbXNTY2hlbWEuZm9ybWF0ID09PSBcImRhdGEtdXJsXCI7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaXhlZEl0ZW1zKHNjaGVtYSkge1xuICByZXR1cm4gKFxuICAgIEFycmF5LmlzQXJyYXkoc2NoZW1hLml0ZW1zKSAmJlxuICAgIHNjaGVtYS5pdGVtcy5sZW5ndGggPiAwICYmXG4gICAgc2NoZW1hLml0ZW1zLmV2ZXJ5KGl0ZW0gPT4gaXNPYmplY3QoaXRlbSkpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxvd0FkZGl0aW9uYWxJdGVtcyhzY2hlbWEpIHtcbiAgaWYgKHNjaGVtYS5hZGRpdGlvbmFsSXRlbXMgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLndhcm4oXCJhZGRpdGlvbmFsSXRlbXM9dHJ1ZSBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZFwiKTtcbiAgfVxuICByZXR1cm4gaXNPYmplY3Qoc2NoZW1hLmFkZGl0aW9uYWxJdGVtcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25zTGlzdChzY2hlbWEpIHtcbiAgaWYgKHNjaGVtYS5lbnVtKSB7XG4gICAgcmV0dXJuIHNjaGVtYS5lbnVtLm1hcCgodmFsdWUsIGkpID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gKHNjaGVtYS5lbnVtTmFtZXMgJiYgc2NoZW1hLmVudW1OYW1lc1tpXSkgfHwgU3RyaW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiB7IGxhYmVsLCB2YWx1ZSB9O1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGFsdFNjaGVtYXMgPSBzY2hlbWEub25lT2YgfHwgc2NoZW1hLmFueU9mO1xuICAgIHJldHVybiBhbHRTY2hlbWFzLm1hcCgoc2NoZW1hLCBpKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRvQ29uc3RhbnQoc2NoZW1hKTtcbiAgICAgIGNvbnN0IGxhYmVsID0gc2NoZW1hLnRpdGxlIHx8IFN0cmluZyh2YWx1ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGxhYmVsLFxuICAgICAgICB2YWx1ZSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTY2hlbWFEZWZpbml0aW9uKCRyZWYsIHJvb3RTY2hlbWEgPSB7fSkge1xuICBjb25zdCBvcmlnUmVmID0gJHJlZjtcbiAgaWYgKCRyZWYuc3RhcnRzV2l0aChcIiNcIikpIHtcbiAgICAvLyBEZWNvZGUgVVJJIGZyYWdtZW50IHJlcHJlc2VudGF0aW9uLlxuICAgICRyZWYgPSBkZWNvZGVVUklDb21wb25lbnQoJHJlZi5zdWJzdHJpbmcoMSkpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke29yaWdSZWZ9LmApO1xuICB9XG4gIGNvbnN0IGN1cnJlbnQgPSBqc29ucG9pbnRlci5nZXQocm9vdFNjaGVtYSwgJHJlZik7XG4gIGlmIChjdXJyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgZGVmaW5pdGlvbiBmb3IgJHtvcmlnUmVmfS5gKTtcbiAgfVxuICBpZiAoY3VycmVudC5oYXNPd25Qcm9wZXJ0eShcIiRyZWZcIikpIHtcbiAgICByZXR1cm4gZmluZFNjaGVtYURlZmluaXRpb24oY3VycmVudC4kcmVmLCByb290U2NoZW1hKTtcbiAgfVxuICByZXR1cm4gY3VycmVudDtcbn1cblxuLy8gSW4gdGhlIGNhc2Ugd2hlcmUgd2UgaGF2ZSB0byBpbXBsaWNpdGx5IGNyZWF0ZSBhIHNjaGVtYSwgaXQgaXMgdXNlZnVsIHRvIGtub3cgd2hhdCB0eXBlIHRvIHVzZVxuLy8gIGJhc2VkIG9uIHRoZSBkYXRhIHdlIGFyZSBkZWZpbmluZ1xuZXhwb3J0IGNvbnN0IGd1ZXNzVHlwZSA9IGZ1bmN0aW9uIGd1ZXNzVHlwZSh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gXCJhcnJheVwiO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBcInN0cmluZ1wiO1xuICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gXCJudWxsXCI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBcImJvb2xlYW5cIjtcbiAgfSBlbHNlIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgcmV0dXJuIFwibnVtYmVyXCI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIFwib2JqZWN0XCI7XG4gIH1cbiAgLy8gRGVmYXVsdCB0byBzdHJpbmcgaWYgd2UgY2FuJ3QgZmlndXJlIGl0IG91dFxuICByZXR1cm4gXCJzdHJpbmdcIjtcbn07XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBjcmVhdGUgbmV3IFwicHJvcGVydGllc1wiIGl0ZW1zIGZvciBlYWNoIGtleSBpbiBvdXIgZm9ybURhdGFcbmV4cG9ydCBmdW5jdGlvbiBzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyhcbiAgc2NoZW1hLFxuICByb290U2NoZW1hID0ge30sXG4gIGZvcm1EYXRhID0ge31cbikge1xuICAvLyBDbG9uZSB0aGUgc2NoZW1hIHNvIHdlIGRvbid0IHJ1aW4gdGhlIGNvbnN1bWVyJ3Mgb3JpZ2luYWxcbiAgc2NoZW1hID0ge1xuICAgIC4uLnNjaGVtYSxcbiAgICBwcm9wZXJ0aWVzOiB7IC4uLnNjaGVtYS5wcm9wZXJ0aWVzIH0sXG4gIH07XG5cbiAgLy8gbWFrZSBzdXJlIGZvcm1EYXRhIGlzIGFuIG9iamVjdFxuICBmb3JtRGF0YSA9IGlzT2JqZWN0KGZvcm1EYXRhKSA/IGZvcm1EYXRhIDoge307XG5cbiAgT2JqZWN0LmtleXMoZm9ybURhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAoc2NoZW1hLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgLy8gTm8gbmVlZCB0byBzdHViLCBvdXIgc2NoZW1hIGFscmVhZHkgaGFzIHRoZSBwcm9wZXJ0eVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhZGRpdGlvbmFsUHJvcGVydGllcztcbiAgICBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSByZXRyaWV2ZVNjaGVtYShcbiAgICAgICAgeyAkcmVmOiBzY2hlbWEuYWRkaXRpb25hbFByb3BlcnRpZXNbXCIkcmVmXCJdIH0sXG4gICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgIGZvcm1EYXRhXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoc2NoZW1hLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KFwidHlwZVwiKSkge1xuICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7IC4uLnNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHsgdHlwZTogZ3Vlc3NUeXBlKGZvcm1EYXRhW2tleV0pIH07XG4gICAgfVxuXG4gICAgLy8gVGhlIHR5cGUgb2Ygb3VyIG5ldyBrZXkgc2hvdWxkIG1hdGNoIHRoZSBhZGRpdGlvbmFsUHJvcGVydGllcyB2YWx1ZTtcbiAgICBzY2hlbWEucHJvcGVydGllc1trZXldID0gYWRkaXRpb25hbFByb3BlcnRpZXM7XG4gICAgLy8gU2V0IG91ciBhZGRpdGlvbmFsIHByb3BlcnR5IGZsYWcgc28gd2Uga25vdyBpdCB3YXMgZHluYW1pY2FsbHkgYWRkZWRcbiAgICBzY2hlbWEucHJvcGVydGllc1trZXldW0FERElUSU9OQUxfUFJPUEVSVFlfRkxBR10gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gc2NoZW1hO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVNjaGVtYShzY2hlbWEsIHJvb3RTY2hlbWEgPSB7fSwgZm9ybURhdGEgPSB7fSkge1xuICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KFwiJHJlZlwiKSkge1xuICAgIHJldHVybiByZXNvbHZlUmVmZXJlbmNlKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImRlcGVuZGVuY2llc1wiKSkge1xuICAgIGNvbnN0IHJlc29sdmVkU2NoZW1hID0gcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcbiAgICByZXR1cm4gcmV0cmlldmVTY2hlbWEocmVzb2x2ZWRTY2hlbWEsIHJvb3RTY2hlbWEsIGZvcm1EYXRhKTtcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJhbGxPZlwiKSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zY2hlbWEsXG4gICAgICBhbGxPZjogc2NoZW1hLmFsbE9mLm1hcChhbGxPZlN1YnNjaGVtYSA9PlxuICAgICAgICByZXRyaWV2ZVNjaGVtYShhbGxPZlN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXG4gICAgICApLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gTm8gJHJlZiBvciBkZXBlbmRlbmNpZXMgYXR0cmlidXRlIGZvdW5kLCByZXR1cm5pbmcgdGhlIG9yaWdpbmFsIHNjaGVtYS5cbiAgICByZXR1cm4gc2NoZW1hO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVSZWZlcmVuY2Uoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSkge1xuICAvLyBSZXRyaWV2ZSB0aGUgcmVmZXJlbmNlZCBzY2hlbWEgZGVmaW5pdGlvbi5cbiAgY29uc3QgJHJlZlNjaGVtYSA9IGZpbmRTY2hlbWFEZWZpbml0aW9uKHNjaGVtYS4kcmVmLCByb290U2NoZW1hKTtcbiAgLy8gRHJvcCB0aGUgJHJlZiBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIHNjaGVtYS5cbiAgY29uc3QgeyAkcmVmLCAuLi5sb2NhbFNjaGVtYSB9ID0gc2NoZW1hO1xuICAvLyBVcGRhdGUgcmVmZXJlbmNlZCBzY2hlbWEgZGVmaW5pdGlvbiB3aXRoIGxvY2FsIHNjaGVtYSBwcm9wZXJ0aWVzLlxuICByZXR1cm4gcmV0cmlldmVTY2hlbWEoXG4gICAgeyAuLi4kcmVmU2NoZW1hLCAuLi5sb2NhbFNjaGVtYSB9LFxuICAgIHJvb3RTY2hlbWEsXG4gICAgZm9ybURhdGFcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSA9IHt9LCBmb3JtRGF0YSA9IHt9KSB7XG4gIGlmICghaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICBsZXQgcmVzb2x2ZWRTY2hlbWEgPSByZXNvbHZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICBpZiAoXCJhbGxPZlwiIGluIHNjaGVtYSkge1xuICAgIHRyeSB7XG4gICAgICByZXNvbHZlZFNjaGVtYSA9IG1lcmdlQWxsT2Yoe1xuICAgICAgICAuLi5yZXNvbHZlZFNjaGVtYSxcbiAgICAgICAgYWxsT2Y6IHJlc29sdmVkU2NoZW1hLmFsbE9mLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKFwiY291bGQgbm90IG1lcmdlIHN1YnNjaGVtYXMgaW4gYWxsT2Y6XFxuXCIgKyBlKTtcbiAgICAgIGNvbnN0IHsgYWxsT2YsIC4uLnJlc29sdmVkU2NoZW1hV2l0aG91dEFsbE9mIH0gPSByZXNvbHZlZFNjaGVtYTtcbiAgICAgIHJldHVybiByZXNvbHZlZFNjaGVtYVdpdGhvdXRBbGxPZjtcbiAgICB9XG4gIH1cbiAgY29uc3QgaGFzQWRkaXRpb25hbFByb3BlcnRpZXMgPVxuICAgIHJlc29sdmVkU2NoZW1hLmhhc093blByb3BlcnR5KFwiYWRkaXRpb25hbFByb3BlcnRpZXNcIikgJiZcbiAgICByZXNvbHZlZFNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyAhPT0gZmFsc2U7XG4gIGlmIChoYXNBZGRpdGlvbmFsUHJvcGVydGllcykge1xuICAgIHJldHVybiBzdHViRXhpc3RpbmdBZGRpdGlvbmFsUHJvcGVydGllcyhcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxuICAgICAgcm9vdFNjaGVtYSxcbiAgICAgIGZvcm1EYXRhXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZWRTY2hlbWE7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVEZXBlbmRlbmNpZXMoc2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSkge1xuICAvLyBEcm9wIHRoZSBkZXBlbmRlbmNpZXMgZnJvbSB0aGUgc291cmNlIHNjaGVtYS5cbiAgbGV0IHsgZGVwZW5kZW5jaWVzID0ge30sIC4uLnJlc29sdmVkU2NoZW1hIH0gPSBzY2hlbWE7XG4gIGlmIChcIm9uZU9mXCIgaW4gcmVzb2x2ZWRTY2hlbWEpIHtcbiAgICByZXNvbHZlZFNjaGVtYSA9XG4gICAgICByZXNvbHZlZFNjaGVtYS5vbmVPZltcbiAgICAgICAgZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIHJlc29sdmVkU2NoZW1hLm9uZU9mLCByb290U2NoZW1hKVxuICAgICAgXTtcbiAgfSBlbHNlIGlmIChcImFueU9mXCIgaW4gcmVzb2x2ZWRTY2hlbWEpIHtcbiAgICByZXNvbHZlZFNjaGVtYSA9XG4gICAgICByZXNvbHZlZFNjaGVtYS5hbnlPZltcbiAgICAgICAgZ2V0TWF0Y2hpbmdPcHRpb24oZm9ybURhdGEsIHJlc29sdmVkU2NoZW1hLmFueU9mLCByb290U2NoZW1hKVxuICAgICAgXTtcbiAgfVxuICByZXR1cm4gcHJvY2Vzc0RlcGVuZGVuY2llcyhcbiAgICBkZXBlbmRlbmNpZXMsXG4gICAgcmVzb2x2ZWRTY2hlbWEsXG4gICAgcm9vdFNjaGVtYSxcbiAgICBmb3JtRGF0YVxuICApO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0RlcGVuZGVuY2llcyhcbiAgZGVwZW5kZW5jaWVzLFxuICByZXNvbHZlZFNjaGVtYSxcbiAgcm9vdFNjaGVtYSxcbiAgZm9ybURhdGFcbikge1xuICAvLyBQcm9jZXNzIGRlcGVuZGVuY2llcyB1cGRhdGluZyB0aGUgbG9jYWwgc2NoZW1hIHByb3BlcnRpZXMgYXMgYXBwcm9wcmlhdGUuXG4gIGZvciAoY29uc3QgZGVwZW5kZW5jeUtleSBpbiBkZXBlbmRlbmNpZXMpIHtcbiAgICAvLyBTa2lwIHRoaXMgZGVwZW5kZW5jeSBpZiBpdHMgdHJpZ2dlciBwcm9wZXJ0eSBpcyBub3QgcHJlc2VudC5cbiAgICBpZiAoZm9ybURhdGFbZGVwZW5kZW5jeUtleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIFNraXAgdGhpcyBkZXBlbmRlbmN5IGlmIGl0IGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgc2NoZW1hIChzdWNoIGFzIHdoZW4gZGVwZW5kZW5jeUtleSBpcyBpdHNlbGYgYSBoaWRkZW4gZGVwZW5kZW5jeS4pXG4gICAgaWYgKFxuICAgICAgcmVzb2x2ZWRTY2hlbWEucHJvcGVydGllcyAmJlxuICAgICAgIShkZXBlbmRlbmN5S2V5IGluIHJlc29sdmVkU2NoZW1hLnByb3BlcnRpZXMpXG4gICAgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgW2RlcGVuZGVuY3lLZXldOiBkZXBlbmRlbmN5VmFsdWUsXG4gICAgICAuLi5yZW1haW5pbmdEZXBlbmRlbmNpZXNcbiAgICB9ID0gZGVwZW5kZW5jaWVzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRlcGVuZGVuY3lWYWx1ZSkpIHtcbiAgICAgIHJlc29sdmVkU2NoZW1hID0gd2l0aERlcGVuZGVudFByb3BlcnRpZXMocmVzb2x2ZWRTY2hlbWEsIGRlcGVuZGVuY3lWYWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdChkZXBlbmRlbmN5VmFsdWUpKSB7XG4gICAgICByZXNvbHZlZFNjaGVtYSA9IHdpdGhEZXBlbmRlbnRTY2hlbWEoXG4gICAgICAgIHJlc29sdmVkU2NoZW1hLFxuICAgICAgICByb290U2NoZW1hLFxuICAgICAgICBmb3JtRGF0YSxcbiAgICAgICAgZGVwZW5kZW5jeUtleSxcbiAgICAgICAgZGVwZW5kZW5jeVZhbHVlXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzc0RlcGVuZGVuY2llcyhcbiAgICAgIHJlbWFpbmluZ0RlcGVuZGVuY2llcyxcbiAgICAgIHJlc29sdmVkU2NoZW1hLFxuICAgICAgcm9vdFNjaGVtYSxcbiAgICAgIGZvcm1EYXRhXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZWRTY2hlbWE7XG59XG5cbmZ1bmN0aW9uIHdpdGhEZXBlbmRlbnRQcm9wZXJ0aWVzKHNjaGVtYSwgYWRkaXRpb25hbGx5UmVxdWlyZWQpIHtcbiAgaWYgKCFhZGRpdGlvbmFsbHlSZXF1aXJlZCkge1xuICAgIHJldHVybiBzY2hlbWE7XG4gIH1cbiAgY29uc3QgcmVxdWlyZWQgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZClcbiAgICA/IEFycmF5LmZyb20obmV3IFNldChbLi4uc2NoZW1hLnJlcXVpcmVkLCAuLi5hZGRpdGlvbmFsbHlSZXF1aXJlZF0pKVxuICAgIDogYWRkaXRpb25hbGx5UmVxdWlyZWQ7XG4gIHJldHVybiB7IC4uLnNjaGVtYSwgcmVxdWlyZWQ6IHJlcXVpcmVkIH07XG59XG5cbmZ1bmN0aW9uIHdpdGhEZXBlbmRlbnRTY2hlbWEoXG4gIHNjaGVtYSxcbiAgcm9vdFNjaGVtYSxcbiAgZm9ybURhdGEsXG4gIGRlcGVuZGVuY3lLZXksXG4gIGRlcGVuZGVuY3lWYWx1ZVxuKSB7XG4gIGxldCB7IG9uZU9mLCAuLi5kZXBlbmRlbnRTY2hlbWEgfSA9IHJldHJpZXZlU2NoZW1hKFxuICAgIGRlcGVuZGVuY3lWYWx1ZSxcbiAgICByb290U2NoZW1hLFxuICAgIGZvcm1EYXRhXG4gICk7XG4gIHNjaGVtYSA9IG1lcmdlU2NoZW1hcyhzY2hlbWEsIGRlcGVuZGVudFNjaGVtYSk7XG4gIC8vIFNpbmNlIGl0IGRvZXMgbm90IGNvbnRhaW4gb25lT2YsIHdlIHJldHVybiB0aGUgb3JpZ2luYWwgc2NoZW1hLlxuICBpZiAob25lT2YgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzY2hlbWE7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkob25lT2YpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkOiBpdCBpcyBzb21lICR7dHlwZW9mIG9uZU9mfSBpbnN0ZWFkIG9mIGFuIGFycmF5YCk7XG4gIH1cbiAgLy8gUmVzb2x2ZSAkcmVmcyBpbnNpZGUgb25lT2YuXG4gIGNvbnN0IHJlc29sdmVkT25lT2YgPSBvbmVPZi5tYXAoc3Vic2NoZW1hID0+XG4gICAgc3Vic2NoZW1hLmhhc093blByb3BlcnR5KFwiJHJlZlwiKVxuICAgICAgPyByZXNvbHZlUmVmZXJlbmNlKHN1YnNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpXG4gICAgICA6IHN1YnNjaGVtYVxuICApO1xuICByZXR1cm4gd2l0aEV4YWN0bHlPbmVTdWJzY2hlbWEoXG4gICAgc2NoZW1hLFxuICAgIHJvb3RTY2hlbWEsXG4gICAgZm9ybURhdGEsXG4gICAgZGVwZW5kZW5jeUtleSxcbiAgICByZXNvbHZlZE9uZU9mXG4gICk7XG59XG5cbmZ1bmN0aW9uIHdpdGhFeGFjdGx5T25lU3Vic2NoZW1hKFxuICBzY2hlbWEsXG4gIHJvb3RTY2hlbWEsXG4gIGZvcm1EYXRhLFxuICBkZXBlbmRlbmN5S2V5LFxuICBvbmVPZlxuKSB7XG4gIGNvbnN0IHZhbGlkU3Vic2NoZW1hcyA9IG9uZU9mLmZpbHRlcihzdWJzY2hlbWEgPT4ge1xuICAgIGlmICghc3Vic2NoZW1hLnByb3BlcnRpZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgeyBbZGVwZW5kZW5jeUtleV06IGNvbmRpdGlvblByb3BlcnR5U2NoZW1hIH0gPSBzdWJzY2hlbWEucHJvcGVydGllcztcbiAgICBpZiAoY29uZGl0aW9uUHJvcGVydHlTY2hlbWEpIHtcbiAgICAgIGNvbnN0IGNvbmRpdGlvblNjaGVtYSA9IHtcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIFtkZXBlbmRlbmN5S2V5XTogY29uZGl0aW9uUHJvcGVydHlTY2hlbWEsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBlcnJvcnMgfSA9IHZhbGlkYXRlRm9ybURhdGEoZm9ybURhdGEsIGNvbmRpdGlvblNjaGVtYSk7XG4gICAgICByZXR1cm4gZXJyb3JzLmxlbmd0aCA9PT0gMDtcbiAgICB9XG4gIH0pO1xuICBpZiAodmFsaWRTdWJzY2hlbWFzLmxlbmd0aCAhPT0gMSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiaWdub3Jpbmcgb25lT2YgaW4gZGVwZW5kZW5jaWVzIGJlY2F1c2UgdGhlcmUgaXNuJ3QgZXhhY3RseSBvbmUgc3Vic2NoZW1hIHRoYXQgaXMgdmFsaWRcIlxuICAgICk7XG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfVxuICBjb25zdCBzdWJzY2hlbWEgPSB2YWxpZFN1YnNjaGVtYXNbMF07XG4gIGNvbnN0IHtcbiAgICBbZGVwZW5kZW5jeUtleV06IGNvbmRpdGlvblByb3BlcnR5U2NoZW1hLFxuICAgIC4uLmRlcGVuZGVudFN1YnNjaGVtYVxuICB9ID0gc3Vic2NoZW1hLnByb3BlcnRpZXM7XG4gIGNvbnN0IGRlcGVuZGVudFNjaGVtYSA9IHsgLi4uc3Vic2NoZW1hLCBwcm9wZXJ0aWVzOiBkZXBlbmRlbnRTdWJzY2hlbWEgfTtcbiAgcmV0dXJuIG1lcmdlU2NoZW1hcyhcbiAgICBzY2hlbWEsXG4gICAgcmV0cmlldmVTY2hlbWEoZGVwZW5kZW50U2NoZW1hLCByb290U2NoZW1hLCBmb3JtRGF0YSlcbiAgKTtcbn1cblxuLy8gUmVjdXJzaXZlbHkgbWVyZ2UgZGVlcGx5IG5lc3RlZCBzY2hlbWFzLlxuLy8gVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBtZXJnZVNjaGVtYXMgYW5kIG1lcmdlT2JqZWN0c1xuLy8gaXMgdGhhdCBtZXJnZVNjaGVtYXMgb25seSBjb25jYXRzIGFycmF5cyBmb3Jcbi8vIHZhbHVlcyB1bmRlciB0aGUgXCJyZXF1aXJlZFwiIGtleXdvcmQsIGFuZCB3aGVuIGl0IGRvZXMsXG4vLyBpdCBkb2Vzbid0IGluY2x1ZGUgZHVwbGljYXRlIHZhbHVlcy5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVNjaGVtYXMob2JqMSwgb2JqMikge1xuICB2YXIgYWNjID0gT2JqZWN0LmFzc2lnbih7fSwgb2JqMSk7IC8vIFByZXZlbnQgbXV0YXRpb24gb2Ygc291cmNlIG9iamVjdC5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iajIpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICBjb25zdCBsZWZ0ID0gb2JqMSA/IG9iajFba2V5XSA6IHt9LFxuICAgICAgcmlnaHQgPSBvYmoyW2tleV07XG4gICAgaWYgKG9iajEgJiYgb2JqMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGlzT2JqZWN0KHJpZ2h0KSkge1xuICAgICAgYWNjW2tleV0gPSBtZXJnZVNjaGVtYXMobGVmdCwgcmlnaHQpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBvYmoxICYmXG4gICAgICBvYmoyICYmXG4gICAgICAoZ2V0U2NoZW1hVHlwZShvYmoxKSA9PT0gXCJvYmplY3RcIiB8fCBnZXRTY2hlbWFUeXBlKG9iajIpID09PSBcIm9iamVjdFwiKSAmJlxuICAgICAga2V5ID09PSBcInJlcXVpcmVkXCIgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkobGVmdCkgJiZcbiAgICAgIEFycmF5LmlzQXJyYXkocmlnaHQpXG4gICAgKSB7XG4gICAgICAvLyBEb24ndCBpbmNsdWRlIGR1cGxpY2F0ZSB2YWx1ZXMgd2hlbiBtZXJnaW5nXG4gICAgICAvLyBcInJlcXVpcmVkXCIgZmllbGRzLlxuICAgICAgYWNjW2tleV0gPSB1bmlvbihsZWZ0LCByaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjY1trZXldID0gcmlnaHQ7XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG4gIH0sIGFjYyk7XG59XG5cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwRXF1YWxzKGEsIGIsIGNhID0gW10sIGNiID0gW10pIHtcbiAgLy8gUGFydGlhbGx5IGV4dHJhY3RlZCBmcm9tIG5vZGUtZGVlcGVyIGFuZCBhZGFwdGVkIHRvIGV4Y2x1ZGUgY29tcGFyaXNvblxuICAvLyBjaGVja3MgZm9yIGZ1bmN0aW9ucy5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL290aGl5bTIzL25vZGUtZGVlcGVyXG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGEgPT09IFwiZnVuY3Rpb25cIiB8fCB0eXBlb2YgYiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gQXNzdW1lIGFsbCBmdW5jdGlvbnMgYXJlIGVxdWl2YWxlbnRcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jqc2YtdGVhbS9yZWFjdC1qc29uc2NoZW1hLWZvcm0vaXNzdWVzLzI1NVxuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhICE9PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKGEgPT09IG51bGwgfHwgYiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChhIGluc3RhbmNlb2YgRGF0ZSAmJiBiIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCk7XG4gIH0gZWxzZSBpZiAoYSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiBiIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGEuc291cmNlID09PSBiLnNvdXJjZSAmJlxuICAgICAgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmXG4gICAgICBhLm11bHRpbGluZSA9PT0gYi5tdWx0aWxpbmUgJiZcbiAgICAgIGEubGFzdEluZGV4ID09PSBiLmxhc3RJbmRleCAmJlxuICAgICAgYS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2VcbiAgICApO1xuICB9IGVsc2UgaWYgKGlzQXJndW1lbnRzKGEpIHx8IGlzQXJndW1lbnRzKGIpKSB7XG4gICAgaWYgKCEoaXNBcmd1bWVudHMoYSkgJiYgaXNBcmd1bWVudHMoYikpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGxldCBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICByZXR1cm4gZGVlcEVxdWFscyhzbGljZS5jYWxsKGEpLCBzbGljZS5jYWxsKGIpLCBjYSwgY2IpO1xuICB9IGVsc2Uge1xuICAgIGlmIChhLmNvbnN0cnVjdG9yICE9PSBiLmNvbnN0cnVjdG9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IGthID0gT2JqZWN0LmtleXMoYSk7XG4gICAgbGV0IGtiID0gT2JqZWN0LmtleXMoYik7XG4gICAgLy8gZG9uJ3QgYm90aGVyIHdpdGggc3RhY2sgYWNyb2JhdGljcyBpZiB0aGVyZSdzIG5vdGhpbmcgdGhlcmVcbiAgICBpZiAoa2EubGVuZ3RoID09PSAwICYmIGtiLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChrYS5sZW5ndGggIT09IGtiLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBjYWwgPSBjYS5sZW5ndGg7XG4gICAgd2hpbGUgKGNhbC0tKSB7XG4gICAgICBpZiAoY2FbY2FsXSA9PT0gYSkge1xuICAgICAgICByZXR1cm4gY2JbY2FsXSA9PT0gYjtcbiAgICAgIH1cbiAgICB9XG4gICAgY2EucHVzaChhKTtcbiAgICBjYi5wdXNoKGIpO1xuXG4gICAga2Euc29ydCgpO1xuICAgIGtiLnNvcnQoKTtcbiAgICBmb3IgKHZhciBqID0ga2EubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgIGlmIChrYVtqXSAhPT0ga2Jbal0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBrZXk7XG4gICAgZm9yIChsZXQgayA9IGthLmxlbmd0aCAtIDE7IGsgPj0gMDsgay0tKSB7XG4gICAgICBrZXkgPSBrYVtrXTtcbiAgICAgIGlmICghZGVlcEVxdWFscyhhW2tleV0sIGJba2V5XSwgY2EsIGNiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2EucG9wKCk7XG4gICAgY2IucG9wKCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkUmVuZGVyKGNvbXAsIG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gIGNvbnN0IHsgcHJvcHMsIHN0YXRlIH0gPSBjb21wO1xuICByZXR1cm4gIWRlZXBFcXVhbHMocHJvcHMsIG5leHRQcm9wcykgfHwgIWRlZXBFcXVhbHMoc3RhdGUsIG5leHRTdGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0lkU2NoZW1hKFxuICBzY2hlbWEsXG4gIGlkLFxuICByb290U2NoZW1hLFxuICBmb3JtRGF0YSA9IHt9LFxuICBpZFByZWZpeCA9IFwicm9vdFwiXG4pIHtcbiAgY29uc3QgaWRTY2hlbWEgPSB7XG4gICAgJGlkOiBpZCB8fCBpZFByZWZpeCxcbiAgfTtcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XG4gICAgY29uc3QgX3NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIHJldHVybiB0b0lkU2NoZW1hKF9zY2hlbWEsIGlkLCByb290U2NoZW1hLCBmb3JtRGF0YSwgaWRQcmVmaXgpO1xuICB9XG4gIGlmIChcIml0ZW1zXCIgaW4gc2NoZW1hICYmICFzY2hlbWEuaXRlbXMuJHJlZikge1xuICAgIHJldHVybiB0b0lkU2NoZW1hKHNjaGVtYS5pdGVtcywgaWQsIHJvb3RTY2hlbWEsIGZvcm1EYXRhLCBpZFByZWZpeCk7XG4gIH1cbiAgaWYgKHNjaGVtYS50eXBlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGlkU2NoZW1hO1xuICB9XG4gIGZvciAoY29uc3QgbmFtZSBpbiBzY2hlbWEucHJvcGVydGllcyB8fCB7fSkge1xuICAgIGNvbnN0IGZpZWxkID0gc2NoZW1hLnByb3BlcnRpZXNbbmFtZV07XG4gICAgY29uc3QgZmllbGRJZCA9IGlkU2NoZW1hLiRpZCArIFwiX1wiICsgbmFtZTtcbiAgICBpZFNjaGVtYVtuYW1lXSA9IHRvSWRTY2hlbWEoXG4gICAgICBpc09iamVjdChmaWVsZCkgPyBmaWVsZCA6IHt9LFxuICAgICAgZmllbGRJZCxcbiAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cbiAgICAgIC8vIGFycmF5IGl0ZW0gaGFzIGp1c3QgYmVlbiBhZGRlZCwgYnV0IG5vdCBwb3B1bGF0ZWQgd2l0aCBkYXRhIHlldFxuICAgICAgKGZvcm1EYXRhIHx8IHt9KVtuYW1lXSxcbiAgICAgIGlkUHJlZml4XG4gICAgKTtcbiAgfVxuICByZXR1cm4gaWRTY2hlbWE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1BhdGhTY2hlbWEoc2NoZW1hLCBuYW1lID0gXCJcIiwgcm9vdFNjaGVtYSwgZm9ybURhdGEgPSB7fSkge1xuICBjb25zdCBwYXRoU2NoZW1hID0ge1xuICAgICRuYW1lOiBuYW1lLnJlcGxhY2UoL15cXC4vLCBcIlwiKSxcbiAgfTtcbiAgaWYgKFwiJHJlZlwiIGluIHNjaGVtYSB8fCBcImRlcGVuZGVuY2llc1wiIGluIHNjaGVtYSB8fCBcImFsbE9mXCIgaW4gc2NoZW1hKSB7XG4gICAgY29uc3QgX3NjaGVtYSA9IHJldHJpZXZlU2NoZW1hKHNjaGVtYSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICAgIHJldHVybiB0b1BhdGhTY2hlbWEoX3NjaGVtYSwgbmFtZSwgcm9vdFNjaGVtYSwgZm9ybURhdGEpO1xuICB9XG5cbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcImFkZGl0aW9uYWxQcm9wZXJ0aWVzXCIpKSB7XG4gICAgcGF0aFNjaGVtYS5fX3Jqc2ZfYWRkaXRpb25hbFByb3BlcnRpZXMgPSB0cnVlO1xuICB9XG5cbiAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShcIml0ZW1zXCIpICYmIEFycmF5LmlzQXJyYXkoZm9ybURhdGEpKSB7XG4gICAgZm9ybURhdGEuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgcGF0aFNjaGVtYVtpXSA9IHRvUGF0aFNjaGVtYShcbiAgICAgICAgc2NoZW1hLml0ZW1zLFxuICAgICAgICBgJHtuYW1lfS4ke2l9YCxcbiAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgZWxlbWVudFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKSB7XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBzY2hlbWEucHJvcGVydGllcykge1xuICAgICAgcGF0aFNjaGVtYVtwcm9wZXJ0eV0gPSB0b1BhdGhTY2hlbWEoXG4gICAgICAgIHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5XSxcbiAgICAgICAgYCR7bmFtZX0uJHtwcm9wZXJ0eX1gLFxuICAgICAgICByb290U2NoZW1hLFxuICAgICAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgZm9ybURhdGEgaXMgbm90IGFuIG9iamVjdCAtLSB0aGlzIGNhbiBoYXBwZW4gaWYgYW5cbiAgICAgICAgLy8gYXJyYXkgaXRlbSBoYXMganVzdCBiZWVuIGFkZGVkLCBidXQgbm90IHBvcHVsYXRlZCB3aXRoIGRhdGEgeWV0XG4gICAgICAgIChmb3JtRGF0YSB8fCB7fSlbcHJvcGVydHldXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGF0aFNjaGVtYTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRGF0ZVN0cmluZyhkYXRlU3RyaW5nLCBpbmNsdWRlVGltZSA9IHRydWUpIHtcbiAgaWYgKCFkYXRlU3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IC0xLFxuICAgICAgbW9udGg6IC0xLFxuICAgICAgZGF5OiAtMSxcbiAgICAgIGhvdXI6IGluY2x1ZGVUaW1lID8gLTEgOiAwLFxuICAgICAgbWludXRlOiBpbmNsdWRlVGltZSA/IC0xIDogMCxcbiAgICAgIHNlY29uZDogaW5jbHVkZVRpbWUgPyAtMSA6IDAsXG4gICAgfTtcbiAgfVxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cmluZyk7XG4gIGlmIChOdW1iZXIuaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIHBhcnNlIGRhdGUgXCIgKyBkYXRlU3RyaW5nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHllYXI6IGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICBtb250aDogZGF0ZS5nZXRVVENNb250aCgpICsgMSwgLy8gb2ggeW91LCBqYXZhc2NyaXB0LlxuICAgIGRheTogZGF0ZS5nZXRVVENEYXRlKCksXG4gICAgaG91cjogaW5jbHVkZVRpbWUgPyBkYXRlLmdldFVUQ0hvdXJzKCkgOiAwLFxuICAgIG1pbnV0ZTogaW5jbHVkZVRpbWUgPyBkYXRlLmdldFVUQ01pbnV0ZXMoKSA6IDAsXG4gICAgc2Vjb25kOiBpbmNsdWRlVGltZSA/IGRhdGUuZ2V0VVRDU2Vjb25kcygpIDogMCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZVN0cmluZyhcbiAgeyB5ZWFyLCBtb250aCwgZGF5LCBob3VyID0gMCwgbWludXRlID0gMCwgc2Vjb25kID0gMCB9LFxuICB0aW1lID0gdHJ1ZVxuKSB7XG4gIGNvbnN0IHV0Y1RpbWUgPSBEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQpO1xuICBjb25zdCBkYXRldGltZSA9IG5ldyBEYXRlKHV0Y1RpbWUpLnRvSlNPTigpO1xuICByZXR1cm4gdGltZSA/IGRhdGV0aW1lIDogZGF0ZXRpbWUuc2xpY2UoMCwgMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRjVG9Mb2NhbChqc29uRGF0ZSkge1xuICBpZiAoIWpzb25EYXRlKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICAvLyByZXF1aXJlZCBmb3JtYXQgb2YgYFwieXl5eS1NTS1kZFRoaDptbVwiIGZvbGxvd2VkIGJ5IG9wdGlvbmFsIFwiOnNzXCIgb3IgXCI6c3MuU1NTXCJcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5wdXQuaHRtbCNsb2NhbC1kYXRlLWFuZC10aW1lLXN0YXRlLSh0eXBlJTNEZGF0ZXRpbWUtbG9jYWwpXG4gIC8vID4gc2hvdWxkIGJlIGEgX3ZhbGlkIGxvY2FsIGRhdGUgYW5kIHRpbWUgc3RyaW5nXyAobm90IEdNVClcblxuICAvLyBOb3RlIC0gZGF0ZSBjb25zdHJ1Y3RvciBwYXNzZWQgbG9jYWwgSVNPLTg2MDEgZG9lcyBub3QgY29ycmVjdGx5XG4gIC8vIGNoYW5nZSB0aW1lIHRvIFVUQyBpbiBub2RlIHByZS04XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShqc29uRGF0ZSk7XG5cbiAgY29uc3QgeXl5eSA9IHBhZChkYXRlLmdldEZ1bGxZZWFyKCksIDQpO1xuICBjb25zdCBNTSA9IHBhZChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgY29uc3QgZGQgPSBwYWQoZGF0ZS5nZXREYXRlKCksIDIpO1xuICBjb25zdCBoaCA9IHBhZChkYXRlLmdldEhvdXJzKCksIDIpO1xuICBjb25zdCBtbSA9IHBhZChkYXRlLmdldE1pbnV0ZXMoKSwgMik7XG4gIGNvbnN0IHNzID0gcGFkKGRhdGUuZ2V0U2Vjb25kcygpLCAyKTtcbiAgY29uc3QgU1NTID0gcGFkKGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCksIDMpO1xuXG4gIHJldHVybiBgJHt5eXl5fS0ke01NfS0ke2RkfVQke2hofToke21tfToke3NzfS4ke1NTU31gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9jYWxUb1VUQyhkYXRlU3RyaW5nKSB7XG4gIGlmIChkYXRlU3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGVTdHJpbmcpLnRvSlNPTigpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYWQobnVtLCBzaXplKSB7XG4gIGxldCBzID0gU3RyaW5nKG51bSk7XG4gIHdoaWxlIChzLmxlbmd0aCA8IHNpemUpIHtcbiAgICBzID0gXCIwXCIgKyBzO1xuICB9XG4gIHJldHVybiBzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGF0YVVSSXRvQmxvYihkYXRhVVJJKSB7XG4gIC8vIFNwbGl0IG1ldGFkYXRhIGZyb20gZGF0YVxuICBjb25zdCBzcGxpdHRlZCA9IGRhdGFVUkkuc3BsaXQoXCIsXCIpO1xuICAvLyBTcGxpdCBwYXJhbXNcbiAgY29uc3QgcGFyYW1zID0gc3BsaXR0ZWRbMF0uc3BsaXQoXCI7XCIpO1xuICAvLyBHZXQgbWltZS10eXBlIGZyb20gcGFyYW1zXG4gIGNvbnN0IHR5cGUgPSBwYXJhbXNbMF0ucmVwbGFjZShcImRhdGE6XCIsIFwiXCIpO1xuICAvLyBGaWx0ZXIgdGhlIG5hbWUgcHJvcGVydHkgZnJvbSBwYXJhbXNcbiAgY29uc3QgcHJvcGVydGllcyA9IHBhcmFtcy5maWx0ZXIocGFyYW0gPT4ge1xuICAgIHJldHVybiBwYXJhbS5zcGxpdChcIj1cIilbMF0gPT09IFwibmFtZVwiO1xuICB9KTtcbiAgLy8gTG9vayBmb3IgdGhlIG5hbWUgYW5kIHVzZSB1bmtub3duIGlmIG5vIG5hbWUgcHJvcGVydHkuXG4gIGxldCBuYW1lO1xuICBpZiAocHJvcGVydGllcy5sZW5ndGggIT09IDEpIHtcbiAgICBuYW1lID0gXCJ1bmtub3duXCI7XG4gIH0gZWxzZSB7XG4gICAgLy8gQmVjYXVzZSB3ZSBmaWx0ZXJlZCBvdXQgdGhlIG90aGVyIHByb3BlcnR5LFxuICAgIC8vIHdlIG9ubHkgaGF2ZSB0aGUgbmFtZSBjYXNlIGhlcmUuXG4gICAgbmFtZSA9IHByb3BlcnRpZXNbMF0uc3BsaXQoXCI9XCIpWzFdO1xuICB9XG5cbiAgLy8gQnVpbHQgdGhlIFVpbnQ4QXJyYXkgQmxvYiBwYXJhbWV0ZXIgZnJvbSB0aGUgYmFzZTY0IHN0cmluZy5cbiAgY29uc3QgYmluYXJ5ID0gYXRvYihzcGxpdHRlZFsxXSk7XG4gIGNvbnN0IGFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmluYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXkucHVzaChiaW5hcnkuY2hhckNvZGVBdChpKSk7XG4gIH1cbiAgLy8gQ3JlYXRlIHRoZSBibG9iIG9iamVjdFxuICBjb25zdCBibG9iID0gbmV3IHdpbmRvdy5CbG9iKFtuZXcgVWludDhBcnJheShhcnJheSldLCB7IHR5cGUgfSk7XG5cbiAgcmV0dXJuIHsgYmxvYiwgbmFtZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VTcGVjKHNjaGVtYSkge1xuICBjb25zdCBzcGVjID0ge307XG4gIGlmIChzY2hlbWEubXVsdGlwbGVPZikge1xuICAgIHNwZWMuc3RlcCA9IHNjaGVtYS5tdWx0aXBsZU9mO1xuICB9XG4gIGlmIChzY2hlbWEubWluaW11bSB8fCBzY2hlbWEubWluaW11bSA9PT0gMCkge1xuICAgIHNwZWMubWluID0gc2NoZW1hLm1pbmltdW07XG4gIH1cbiAgaWYgKHNjaGVtYS5tYXhpbXVtIHx8IHNjaGVtYS5tYXhpbXVtID09PSAwKSB7XG4gICAgc3BlYy5tYXggPSBzY2hlbWEubWF4aW11bTtcbiAgfVxuICByZXR1cm4gc3BlYztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hdGNoaW5nT3B0aW9uKGZvcm1EYXRhLCBvcHRpb25zLCByb290U2NoZW1hKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG9wdGlvbiA9IG9wdGlvbnNbaV07XG5cbiAgICAvLyBJZiB0aGUgc2NoZW1hIGRlc2NyaWJlcyBhbiBvYmplY3QgdGhlbiB3ZSBuZWVkIHRvIGFkZCBzbGlnaHRseSBtb3JlXG4gICAgLy8gc3RyaWN0IG1hdGNoaW5nIHRvIHRoZSBzY2hlbWEsIGJlY2F1c2UgdW5sZXNzIHRoZSBzY2hlbWEgdXNlcyB0aGVcbiAgICAvLyBcInJlcXVpcmVzXCIga2V5d29yZCwgYW4gb2JqZWN0IHdpbGwgbWF0Y2ggdGhlIHNjaGVtYSBhcyBsb25nIGFzIGl0XG4gICAgLy8gZG9lc24ndCBoYXZlIG1hdGNoaW5nIGtleXMgd2l0aCBhIGNvbmZsaWN0aW5nIHR5cGUuIFRvIGRvIHRoaXMgd2UgdXNlIGFuXG4gICAgLy8gXCJhbnlPZlwiIHdpdGggYW4gYXJyYXkgb2YgcmVxdWlyZXMuIFRoaXMgYXVnbWVudGF0aW9uIGV4cHJlc3NlcyB0aGF0IHRoZVxuICAgIC8vIHNjaGVtYSBzaG91bGQgbWF0Y2ggaWYgYW55IG9mIHRoZSBrZXlzIGluIHRoZSBzY2hlbWEgYXJlIHByZXNlbnQgb24gdGhlXG4gICAgLy8gb2JqZWN0IGFuZCBwYXNzIHZhbGlkYXRpb24uXG4gICAgaWYgKG9wdGlvbi5wcm9wZXJ0aWVzKSB7XG4gICAgICAvLyBDcmVhdGUgYW4gXCJhbnlPZlwiIHNjaGVtYSB0aGF0IHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBvZiB0aGUga2V5cyBpbiB0aGVcbiAgICAgIC8vIFwicHJvcGVydGllc1wiIG9iamVjdFxuICAgICAgY29uc3QgcmVxdWlyZXNBbnlPZiA9IHtcbiAgICAgICAgYW55T2Y6IE9iamVjdC5rZXlzKG9wdGlvbi5wcm9wZXJ0aWVzKS5tYXAoa2V5ID0+ICh7XG4gICAgICAgICAgcmVxdWlyZWQ6IFtrZXldLFxuICAgICAgICB9KSksXG4gICAgICB9O1xuXG4gICAgICBsZXQgYXVnbWVudGVkU2NoZW1hO1xuXG4gICAgICAvLyBJZiB0aGUgXCJhbnlPZlwiIGtleXdvcmQgYWxyZWFkeSBleGlzdHMsIHdyYXAgdGhlIGF1Z21lbnRhdGlvbiBpbiBhbiBcImFsbE9mXCJcbiAgICAgIGlmIChvcHRpb24uYW55T2YpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgc2hhbGxvdyBjbG9uZSBvZiB0aGUgb3B0aW9uXG4gICAgICAgIGNvbnN0IHsgLi4uc2hhbGxvd0Nsb25lIH0gPSBvcHRpb247XG5cbiAgICAgICAgaWYgKCFzaGFsbG93Q2xvbmUuYWxsT2YpIHtcbiAgICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiBcImFsbE9mXCIgYWxyZWFkeSBleGlzdHMsIHNoYWxsb3cgY2xvbmUgdGhlIGFycmF5XG4gICAgICAgICAgc2hhbGxvd0Nsb25lLmFsbE9mID0gc2hhbGxvd0Nsb25lLmFsbE9mLnNsaWNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzaGFsbG93Q2xvbmUuYWxsT2YucHVzaChyZXF1aXJlc0FueU9mKTtcblxuICAgICAgICBhdWdtZW50ZWRTY2hlbWEgPSBzaGFsbG93Q2xvbmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdWdtZW50ZWRTY2hlbWEgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb24sIHJlcXVpcmVzQW55T2YpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgdGhlIFwicmVxdWlyZWRcIiBmaWVsZCBhcyBpdCdzIGxpa2VseSB0aGF0IG5vdCBhbGwgZmllbGRzIGhhdmVcbiAgICAgIC8vIGJlZW4gZmlsbGVkIGluIHlldCwgd2hpY2ggd2lsbCBtZWFuIHRoYXQgdGhlIHNjaGVtYSBpcyBub3QgdmFsaWRcbiAgICAgIGRlbGV0ZSBhdWdtZW50ZWRTY2hlbWEucmVxdWlyZWQ7XG5cbiAgICAgIGlmIChpc1ZhbGlkKGF1Z21lbnRlZFNjaGVtYSwgZm9ybURhdGEsIHJvb3RTY2hlbWEpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNWYWxpZChvcHRpb24sIGZvcm1EYXRhLCByb290U2NoZW1hKSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAwO1xufVxuXG4vLyBDaGVjayB0byBzZWUgaWYgYSBzY2hlbWEgc3BlY2lmaWVzIHRoYXQgYSB2YWx1ZSBtdXN0IGJlIHRydWVcbmV4cG9ydCBmdW5jdGlvbiBzY2hlbWFSZXF1aXJlc1RydWVWYWx1ZShzY2hlbWEpIHtcbiAgLy8gQ2hlY2sgaWYgY29uc3QgaXMgYSB0cnV0aHkgdmFsdWVcbiAgaWYgKHNjaGVtYS5jb25zdCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgYW4gZW51bSBoYXMgYSBzaW5nbGUgdmFsdWUgb2YgdHJ1ZVxuICBpZiAoc2NoZW1hLmVudW0gJiYgc2NoZW1hLmVudW0ubGVuZ3RoID09PSAxICYmIHNjaGVtYS5lbnVtWzBdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJZiBhbnlPZiBoYXMgYSBzaW5nbGUgdmFsdWUsIGV2YWx1YXRlIHRoZSBzdWJzY2hlbWFcbiAgaWYgKHNjaGVtYS5hbnlPZiAmJiBzY2hlbWEuYW55T2YubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYS5hbnlPZlswXSk7XG4gIH1cblxuICAvLyBJZiBvbmVPZiBoYXMgYSBzaW5nbGUgdmFsdWUsIGV2YWx1YXRlIHRoZSBzdWJzY2hlbWFcbiAgaWYgKHNjaGVtYS5vbmVPZiAmJiBzY2hlbWEub25lT2YubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKHNjaGVtYS5vbmVPZlswXSk7XG4gIH1cblxuICAvLyBFdmFsdWF0ZSBlYWNoIHN1YnNjaGVtYSBpbiBhbGxPZiwgdG8gc2VlIGlmIG9uZSBvZiB0aGVtIHJlcXVpcmVzIGEgdHJ1ZVxuICAvLyB2YWx1ZVxuICBpZiAoc2NoZW1hLmFsbE9mKSB7XG4gICAgcmV0dXJuIHNjaGVtYS5hbGxPZi5zb21lKHNjaGVtYVJlcXVpcmVzVHJ1ZVZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==