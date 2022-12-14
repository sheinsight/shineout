import { isEmpty } from '../is';
export default (function (options) {
  return function (value, formdata, callback) {
    var min = options.min,
        max = options.max,
        message = options.message;
    var error = new Error(message);

    if (isEmpty(value)) {
      if (min) callback(error);else callback(true);
      return;
    }

    var len = typeof value === 'number' ? value.toString().length : value.length;

    if (typeof min === 'number' && len < min || typeof max === 'number' && len > max) {
      callback(error);
    } else {
      callback(true);
    }
  };
});