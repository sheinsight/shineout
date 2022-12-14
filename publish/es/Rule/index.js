import { deepMerge, objectValues } from '../utils/objects';
import { isObject } from '../utils/is';
import required from './required';
import length from './length';
import _type from './type';
import regExp from './regExp';
export var RULE_TYPE = 'RULE_OBJECT';
var innerType = ['email', 'integer', 'number', 'url', 'json', 'hex', 'rgb', 'ipv4'];

var mergeOptions = function mergeOptions(opts) {
  if (opts === void 0) {
    opts = {};
  }

  if (!isObject(opts)) {
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
  return mergeOptions.apply(void 0, [deepMerge(opts, arg)].concat(args));
};

export default function () {
  for (var _len2 = arguments.length, opts = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    opts[_key2] = arguments[_key2];
  }

  var options = mergeOptions.apply(void 0, [{}].concat(opts));
  var rules = {
    required: required(options.required),
    max: length('max', options.max),
    min: length('min', options.min),
    regExp: regExp(options.regExp),
    type: function type(t) {
      return _type(t, options.type);
    }
  };

  rules.length = function (min, max, msg) {
    return [rules.min(min, msg), rules.max(max, msg)];
  };

  rules.range = function (min, max, msg) {
    return [rules.min(min, msg), rules.max(max, msg)];
  };

  innerType.forEach(function (k) {
    rules[k] = _type(k, options[k] || options.type);
  });
  var ruleKeys = Object.keys(rules);
  Object.keys(options).forEach(function (k) {
    if (!ruleKeys.includes(k)) {
      if (isObject(options[k])) {
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
  objectValues(rules).forEach(function (rule) {
    rule.isInnerValidator = true;
  });
  rules.$$type = RULE_TYPE;
  return rules;
}