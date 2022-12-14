"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.isSameError = exports.promiseAll = exports.wrapFormError = exports.FormError = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var FormError =
/*#__PURE__*/
function (_Error) {
  (0, _inheritsLoose2.default)(FormError, _Error);

  function FormError(message, name, value) {
    var _this;

    _this = _Error.call(this) || this;
    _this.message = message;
    _this.name = name;
    _this.value = value;
    return _this;
  }

  return FormError;
}((0, _wrapNativeSuper2.default)(Error));

exports.FormError = FormError;

var wrapFormError = function wrapFormError(error) {
  if (error instanceof Error) {
    return new FormError(error.message);
  }

  if (Array.isArray(error)) {
    return error.map(wrapFormError);
  }

  return error;
};

exports.wrapFormError = wrapFormError;

var promiseAll = function promiseAll(ops, isForm) {
  if (isForm === void 0) {
    isForm = true;
  }

  return new Promise(function (resolve, reject) {
    Promise.all(ops).then(function (res) {
      var error = res.find(function (r) {
        return r !== true;
      });
      if (error) reject(error);else resolve(true);
    }).catch(function (e) {
      reject(isForm ? wrapFormError(e) : e);
    });
  });
};

exports.promiseAll = promiseAll;

var isSameError = function isSameError(a, b) {
  if (a === b) return true;

  if (a instanceof Error && b instanceof Error) {
    return a.message === b.message;
  }

  return a === b;
};

exports.isSameError = isSameError;