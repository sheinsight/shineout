import { deepMerge } from '../utils/objects';
import { substitute } from '../utils/strings';
import { getLocale } from '../locale';

var createMessage = function createMessage(key) {
  return function (props) {
    var lt = '';

    switch (props.type) {
      case 'integer':
      case 'number':
        lt = 'number';
        break;

      case 'array':
        lt = 'array';
        break;

      default:
        lt = 'string';
    }

    return substitute(getLocale("rules.length." + key + "." + lt), props);
  };
};

var options = {
  skipUndefined: true
};
export var lengthMessage = {
  max: createMessage('max'),
  min: createMessage('min')
};
export default (function (key, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message;

  return function (len, msg) {
    var _deepMerge;

    if (typeof len !== 'number') {
      console.error(new Error("Rule \"" + key + "\" param expect a number, get " + typeof len));
      return null;
    }

    return deepMerge({
      message: lengthMessage[key]
    }, deepMerge((_deepMerge = {
      message: message
    }, _deepMerge[key] = len, _deepMerge), {
      message: msg
    }, options), options);
  };
});