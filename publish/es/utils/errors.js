import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";
export var FormError =
/*#__PURE__*/
function (_Error) {
  _inheritsLoose(FormError, _Error);

  function FormError(message, name, value) {
    var _this;

    _this = _Error.call(this) || this;
    _this.message = message;
    _this.name = name;
    _this.value = value;
    return _this;
  }

  return FormError;
}(_wrapNativeSuper(Error));
export var wrapFormError = function wrapFormError(error) {
  if (error instanceof Error) {
    return new FormError(error.message);
  }

  if (Array.isArray(error)) {
    return error.map(wrapFormError);
  }

  return error;
};
export var promiseAll = function promiseAll(ops, isForm) {
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
export var isSameError = function isSameError(a, b) {
  if (a === b) return true;

  if (a instanceof Error && b instanceof Error) {
    return a.message === b.message;
  }

  return a === b;
};