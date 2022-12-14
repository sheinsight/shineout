"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.cleanCache = cleanCache;
exports.default = void 0;

var _varsInject = _interopRequireDefault(require("./vars-inject"));

var _strings = require("./strings");

var _objects = require("./objects");

function setOptions(options, setter) {
  if (!options) return;

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
        value = _ref2[1];
    if (key === setter) continue;
    this[key] = value;
  }
}

function getDOMStyle(dom) {
  document.body.appendChild(dom);
  var style = window.getComputedStyle(dom);
  Promise.resolve().then(function () {
    dom.parentElement.removeChild(dom);
  });
  return style;
}

function getStyleAttr(className, key) {
  if (key === void 0) {
    key = 'color';
  }

  var div = document.createElement('div');
  div.className = className;
  return getDOMStyle(div)[key];
}

var cache = {};

function genAccessors(obj, data) {
  data.conf.forEach(function (item) {
    var name = item.name,
        className = item.className,
        attr = item.attr,
        _item$parser = item.parser,
        parser = _item$parser === void 0 ? function (v) {
      return v;
    } : _item$parser;
    var info = data.info;
    var cacheKey = info.name + "-" + name;
    Object.defineProperty(obj, name, {
      enumerable: true,
      get: function get() {
        if (cache[cacheKey]) return cache[cacheKey];
        if (item.value) return item.value;
        var res = getStyleAttr(className, attr);
        cache[cacheKey] = parser(res);
        return cache[cacheKey];
      },
      // eslint-disable-next-line no-return-assign
      set: function set(v) {
        delete cache[cacheKey];
        if (item.value) item.value = v;
        data[name] = v;
      }
    });
  });
}

var accessors = {
  table: {},
  tag: {},
  pagination: {},
  button: {},
  color: {},
  tooltip: {},
  input: {},
  select: {},
  datepicker: {},
  slider: {},
  menu: {},
  form: {},
  checkbox: {},
  radio: {},
  alert: {},
  message: {},
  card: {},
  modal: {},
  popover: {},
  tree: {},
  dropdown: {},
  common: {},
  switch: {},
  tabs: {},
  cascader: {},
  list: {},
  progress: {}
};

var _loop = function _loop() {
  if (_isArray2) {
    if (_i2 >= _iterator2.length) return "break";
    _ref3 = _iterator2[_i2++];
  } else {
    _i2 = _iterator2.next();
    if (_i2.done) return "break";
    _ref3 = _i2.value;
  }

  var _ref4 = _ref3,
      key = _ref4[0],
      value = _ref4[1];
  var setterName = "set" + (0, _strings.capitalize)(key);

  value[setterName] = function (options) {
    return setOptions.call(value, options, setterName);
  };

  genAccessors(value, _varsInject.default[key]);
};

for (var _iterator2 = (0, _objects.entries)(accessors), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
  var _ref3;

  var _ret = _loop();

  if (_ret === "break") break;
}

function cleanCache() {
  cache = {};
}

var _default = accessors;
exports.default = _default;