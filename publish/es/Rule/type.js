import { deepMerge } from '../utils/objects';
import { substitute } from '../utils/strings';
import { getLocale } from '../locale';
export var typeMessage = function typeMessage(props) {
  var path = props.title ? 'rules.type' : 'rules.reg';
  return substitute(getLocale(path), props);
};
var options = {
  skipUndefined: true
};
export default (function (type, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      message = _ref.message,
      tip = _ref.tip;

  return function (msg) {
    return deepMerge({
      type: type,
      message: typeMessage
    }, deepMerge({
      message: message,
      tip: tip
    }, {
      message: msg
    }, options), options);
  };
});