import { deepMerge } from '../utils/objects';
import { getLocale } from '../locale';
var options = {
  skipUndefined: true
};
export default (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message;

  return function (regExp, msg) {
    if (typeof regExp !== 'string' && !(regExp instanceof RegExp)) {
      console.error(new Error("Rule \"reg\" param expect a RegExp object or a string, get " + typeof regExp));
      return null;
    }

    return deepMerge({
      message: getLocale('rules.reg')
    }, deepMerge({
      message: message,
      regExp: regExp
    }, {
      message: msg
    }, options), options);
  };
});