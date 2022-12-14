import { entries } from './utils/objects';
import Notification from './utils/notification';
export var noti = new Notification();
var config = {
  cssModule: process.env.CSS_MODULE || false,
  prefix: process.env.SO_PREFIX || 'so',
  locale: process.env.LOCALE || 'en-US',
  autoSSL: false,
  delay: undefined,
  scrollRatio: 100,
  trim: undefined,
  spin: undefined,
  caret: undefined,
  direction: 'ltr'
};
export default config;
export function set(name, value) {
  if (value !== undefined && name in config) config[name] = value;
  noti.dispatch(name);
}
export function setConfig(conf) {
  for (var _iterator = entries(conf), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
    set(key, value);
  }
}
export function isRTL() {
  return config.direction === 'rtl';
}