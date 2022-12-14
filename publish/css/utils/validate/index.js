"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _Datum = _interopRequireDefault(require("../../Datum"));

var _errors = require("../errors");

var _strings = require("../strings");

var _flat = require("../flat");

var _range = _interopRequireDefault(require("./range"));

var _rangeLength = _interopRequireDefault(require("./rangeLength"));

var _required = _interopRequireDefault(require("./required"));

var _type = _interopRequireDefault(require("./type"));

var _regExp = _interopRequireDefault(require("./regExp"));

function getRule(rules, props) {
  if (props === void 0) {
    props = {};
  }

  if (typeof rules === 'function') {
    if (rules.isInnerValidator) rules = rules();else return rules;
  }

  if (typeof props === 'string') props = {
    type: props
  };
  var _rules = rules,
      _rules$type = _rules.type,
      type = _rules$type === void 0 ? props.type : _rules$type,
      message = _rules.message,
      regExp = _rules.regExp,
      func = _rules.func,
      other = (0, _objectWithoutPropertiesLoose2.default)(_rules, ["type", "message", "regExp", "func"]);
  props = Object.assign({}, props, other);
  props.message = typeof message === 'function' ? message(props) : (0, _strings.substitute)(message, props);
  if (func) return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return func.apply(void 0, args.concat([props]));
  };
  if (other.required !== undefined) return (0, _required.default)(props);
  if (regExp) return (0, _regExp.default)(regExp, props);

  if (other.min !== undefined || other.max !== undefined) {
    if (type === 'number' || type === 'integer') {
      return (0, _range.default)((0, _objectSpread2.default)({}, props, {
        min: other.min,
        max: other.max
      }));
    }

    return (0, _rangeLength.default)(props);
  }

  if (type) return (0, _type.default)(type, props.message);
  var err = new Error("Rule " + JSON.stringify(rules) + " is not valid.");
  console.error(err);
  throw err;
}

var validate = function validate(value, formdata, rules, props) {
  return new Promise(function (resolve, reject) {
    var $rules = (0, _flat.flattenArray)(rules);
    var rule = $rules.shift();

    if (rule === undefined) {
      resolve(true);
      return;
    }

    if (!rule) {
      validate(value, formdata, $rules, props).then(resolve, reject);
      return;
    }

    var callback = function callback(result) {
      if (result !== true) {
        reject((0, _errors.wrapFormError)(result));
        return;
      }

      validate(value, formdata, $rules, props).then(resolve, reject);
    };

    var fn = getRule(rule, props);
    var val = value;

    if (fn === rule && (value instanceof _Datum.default.List || value instanceof _Datum.default.Form)) {
      val = value.getValue();
    }

    var cb = fn(val, formdata, callback);

    if (cb && cb.then) {
      cb.then(callback.bind(null, true)).catch(function (e) {
        reject((0, _errors.wrapFormError)(e));
      });
    }
  });
};

var _default = validate;
exports.default = _default;