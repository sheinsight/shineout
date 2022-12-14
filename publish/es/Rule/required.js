import { deepMerge } from '../utils/objects';
import { substitute } from '../utils/strings';
import { getLocale } from '../locale';
var options = {
  skipUndefined: true
};
export var requiredMessage = function requiredMessage(props) {
  var type = props.type === 'array' ? 'array' : 'string';
  return substitute(getLocale("rules.required." + type), props);
};
export default (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message,
      tip = _ref.tip;

  return function (msg) {
    return deepMerge({
      required: true,
      message: requiredMessage
    }, deepMerge({
      message: message,
      tip: tip
    }, {
      message: msg
    }, options), options);
  };
});