"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.types = exports.style = exports.color = void 0;

var _is = require("./is");

var _expose = require("../styles/expose");

var _cssAccessors = _interopRequireWildcard(require("./css-accessors"));

var _strings = require("./strings");

var _objects = require("./objects");

var _varsInject = require("./vars-inject");

var types = ['primary', 'warning', 'danger', 'success', 'secondary'];
exports.types = types;
var attrs = ['background', 'color', 'border'];

function validateFormat(data) {
  if (!(0, _is.isObject)(data)) {
    console.error(new Error('Should enter a json data with attrs(key) and types(types)'));
    return false;
  } // attributes


  if (Object.keys(data).filter(function (v) {
    return attrs.indexOf(v) === -1;
  }).length > 0) {
    console.error(new Error("The attribute your entered does not exist need[" + attrs.join('/') + "]"));
    return false;
  } // types


  if (Object.values(data).filter(function (v) {
    return types.indexOf(v) === -1;
  }).length > 0) {
    console.error(new Error("The type your entered does not exist need[" + types.join('/') + "]"));
    return false;
  }

  return true;
}

function getClassname(data) {
  if (!validateFormat(data)) return '';
  return Object.keys(data).map(function (attr) {
    return (0, _expose.exposeClass)(data[attr] + "-" + attr);
  }).join(' ');
}

function resetTheme() {
  Object.keys(_cssAccessors.default).forEach(function (module) {
    var setter = "set" + (0, _strings.capitalize)(module);

    _cssAccessors.default[module][setter](Object.keys(_cssAccessors.default[module]).reduce(function (obj, key) {
      obj[key] = undefined;
      return obj;
    }, {}));
  });
}

function setStyleWithTag(options, custom) {
  (0, _varsInject.cleanStyleObj)();

  if (!options) {
    resetTheme();
  } else {
    for (var _iterator = (0, _objects.entries)(options), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref,
          key = _ref2[0],
          values = _ref2[1];
      var setterName = "set" + (0, _strings.capitalize)(key);
      if (_cssAccessors.default[key] && _cssAccessors.default[key][setterName]) _cssAccessors.default[key][setterName](values);
    }
  }

  (0, _varsInject.injectTag)(custom);
}

var style = {
  getClassname: getClassname,
  setStyle: function setStyle(options, custom) {
    if (custom === void 0) {
      custom = {};
    }

    if ((0, _varsInject.getInjectType)() === 'tag') {
      setStyleWithTag(options, custom);
      return;
    }

    if (!options) {
      resetTheme();
      return;
    }

    for (var _iterator2 = (0, _objects.entries)(options), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var _ref4 = _ref3,
          key = _ref4[0],
          values = _ref4[1];
      var setterName = "set" + (0, _strings.capitalize)(key);
      if (_cssAccessors.default[key] && _cssAccessors.default[key][setterName]) _cssAccessors.default[key][setterName](values);
    }
  },
  cleanCache: _cssAccessors.cleanCache,
  setInjectType: _varsInject.setInjectType,
  getInjectType: _varsInject.getInjectType
};
exports.style = style;
var color = _cssAccessors.default.color;
exports.color = color;