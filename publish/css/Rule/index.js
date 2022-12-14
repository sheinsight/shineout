"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;
exports.RULE_TYPE = void 0;

var _objects = require("../utils/objects");

var _is = require("../utils/is");

var _required = _interopRequireDefault(require("./required"));

var _length = _interopRequireDefault(require("./length"));

var _type2 = _interopRequireDefault(require("./type"));

var _regExp = _interopRequireDefault(require("./regExp"));

var RULE_TYPE = 'RULE_OBJECT';
exports.RULE_TYPE = RULE_TYPE;
var innerType = ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4'];

var mergeOptions = function mergeOptions(opts) {
  if (opts === void 0) {
    opts = {};
  }

  if (!(0, _is.isObject)(opts)) {
    console.error(new Error("rules expect an object, got " + typeof options));
    return {};
  }

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length === 0) return opts;
  var arg = args.shift();
  Object.keys(arg).forEach(function (k) {
    if (typeof arg[k] === 'function') arg[k] = {
      func: arg[k]
    };
  });
  return mergeOptions.apply(void 0, [(0, _objects.deepMerge)(opts, arg)].concat(args));
};

function _default() {
  for (var _len2 = arguments.length, opts = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    opts[_key2] = arguments[_key2];
  }

  var options = mergeOptions.apply(void 0, [{}].concat(opts));
  var rules = {
    required: (0, _required.default)(options.required),
    max: (0, _length.default)('max', options.max),
    min: (0, _length.default)('min', options.min),
    regExp: (0, _regExp.default)(options.regExp),
    type: function type(t) {
      return (0, _type2.default)(t, options.type);
    }
  };

  rules.length = function (min, max, msg) {
    return [rules.min(min, msg), rules.max(max, msg)];
  };

  rules.range = function (min, max, msg) {
    return [rules.min(min, msg), rules.max(max, msg)];
  };

  innerType.forEach(function (k) {
    rules[k] = (0, _type2.default)(k, options[k] || options.type);
  });
  var ruleKeys = Object.keys(rules);
  Object.keys(options).forEach(function (k) {
    if (!ruleKeys.includes(k)) {
      if ((0, _is.isObject)(options[k])) {
        rules[k] = function (args) {
          return Object.assign({}, options[k], {
            args: args
          });
        };
      } else {
        console.error(new Error("Rule " + k + " is invalid, expect a function or an object."));
      }
    }
  });
  (0, _objects.objectValues)(rules).forEach(function (rule) {
    rule.isInnerValidator = true;
  });
  rules.$$type = RULE_TYPE;
  return rules;
}