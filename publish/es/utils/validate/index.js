import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import Datum from '../../Datum';
import { wrapFormError } from '../errors';
import { substitute } from '../strings';
import { flattenArray } from '../flat';
import range from './range';
import rangeLength from './rangeLength';
import required from './required';
import typeOf from './type';
import regTest from './regExp';

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
      other = _objectWithoutPropertiesLoose(_rules, ["type", "message", "regExp", "func"]);

  props = Object.assign({}, props, other);
  props.message = typeof message === 'function' ? message(props) : substitute(message, props);
  if (func) return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return func.apply(void 0, args.concat([props]));
  };
  if (other.required !== undefined) return required(props);
  if (regExp) return regTest(regExp, props);

  if (other.min !== undefined || other.max !== undefined) {
    if (type === 'number' || type === 'integer') {
      return range(_objectSpread({}, props, {
        min: other.min,
        max: other.max
      }));
    }

    return rangeLength(props);
  }

  if (type) return typeOf(type, props.message);
  var err = new Error("Rule " + JSON.stringify(rules) + " is not valid.");
  console.error(err);
  throw err;
}

var validate = function validate(value, formdata, rules, props) {
  return new Promise(function (resolve, reject) {
    var $rules = flattenArray(rules);
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
        reject(wrapFormError(result));
        return;
      }

      validate(value, formdata, $rules, props).then(resolve, reject);
    };

    var fn = getRule(rule, props);
    var val = value;

    if (fn === rule && (value instanceof Datum.List || value instanceof Datum.Form)) {
      val = value.getValue();
    }

    var cb = fn(val, formdata, callback);

    if (cb && cb.then) {
      cb.then(callback.bind(null, true)).catch(function (e) {
        reject(wrapFormError(e));
      });
    }
  });
};

export default validate;