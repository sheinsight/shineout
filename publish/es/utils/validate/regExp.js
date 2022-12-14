import nullable from './nullable';
export default (function (regExp, options) {
  return nullable(function (value, formdata, callback) {
    var message = options.message;
    var reg = typeof regExp === 'string' ? new RegExp(regExp) : regExp;
    if (reg.global) reg.lastIndex = 0;

    if (reg.test(value)) {
      callback(true);
    } else {
      callback(new Error(message));
    }
  });
});