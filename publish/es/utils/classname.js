import classnames from 'classnames';
import config, { isRTL } from '../config';
export var getDirectionClass = function getDirectionClass(c) {
  return c + " " + c + "-" + (isRTL() ? 'rtl' : 'ltr');
};
/**
 * create a new className generate function, add namespace, handle css module
 * @param style - object; for css module
 * @param module - string
 * @param prefix - string, default value is 'shineout'
 * * */

export default (function (style, module, prefix) {
  if (prefix === void 0) {
    prefix = config.prefix;
  }

  return function () {
    var className = classnames.apply(void 0, arguments);
    if (!className) return '';
    var ns = "" + prefix + (module ? "-" + module : '-');
    var list = className.split(' ').map(function (c) {
      return c === '_' ? ns : ns + "-" + c;
    });

    if (config.cssModule) {
      list = list.map(function (c) {
        return style[c] || c;
      });
    }

    return list.join(' ');
  };
});