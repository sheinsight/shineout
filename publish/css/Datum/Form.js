"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _deepEql = _interopRequireDefault(require("deep-eql"));

var _flat = require("../utils/flat");

var _clone = require("../utils/clone");

var _objects = require("../utils/objects");

var _is = require("../utils/is");

var _errors = require("../utils/errors");

var _types = require("./types");

var _default =
/*#__PURE__*/
function () {
  function _default(options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$removeUndefi = _options.removeUndefined,
        removeUndefined = _options$removeUndefi === void 0 ? true : _options$removeUndefi,
        rules = _options.rules,
        onChange = _options.onChange,
        value = _options.value,
        error = _options.error,
        initValidate = _options.initValidate,
        defaultValue = _options.defaultValue;
    this.rules = rules;
    this.onChange = onChange;
    this.removeUndefined = removeUndefined; // store names

    this.$inputNames = {}; // store values

    this.$values = {}; // store default value, for reset

    this.$defaultValues = (0, _objectSpread2.default)({}, defaultValue);
    this.$validator = {};
    this.$events = {}; // handle global errors

    this.$errors = {};
    this.updateLock = false;
    this.deepSetOptions = {
      removeUndefined: removeUndefined,
      forceSet: true
    };
    var initValue = 'value' in options ? value : defaultValue;
    if (initValue) this.setValue(initValue, initValidate ? undefined : _types.IGNORE_VALIDATE);
    if (error) this.resetFormError(error);
  }

  var _proto = _default.prototype;

  _proto.handleChange = function handleChange() {
    if (this.onChange) this.onChange(this.getValue());
  };

  _proto.reset = function reset() {
    this.$errors = {};
    this.setValue((0, _flat.unflatten)((0, _clone.fastClone)(this.$defaultValues)), _types.FORCE_PASS, true);
    this.handleChange();
    this.dispatch(_types.RESET_TOPIC);
  };

  _proto.setLock = function setLock(lock) {
    this.updateLock = lock;
  };

  _proto.get = function get(name) {
    var _this = this;

    if (Array.isArray(name)) return name.map(function (n) {
      return _this.get(n);
    });
    return (0, _objects.deepGet)(this.$values, name);
  };

  _proto.set = function set(name, value, pub) {
    if ((0, _is.isObject)(name)) {
      value = (0, _objects.objectValues)(name);
      name = Object.keys(name);
    }

    if ((0, _is.isArray)(name)) {
      this.setArrayValue(name, value);
      return;
    }

    if (value === this.get(name)) return;
    (0, _objects.deepSet)(this.$values, name, value, this.deepSetOptions);

    if (this.$inputNames[name]) {
      this.dispatch((0, _types.updateSubscribe)(name), value, name);
      this.dispatch((0, _types.changeSubscribe)(name));
    }

    if (value !== null && typeof value === 'object' || pub) this.publishValue(name, _types.FORCE_PASS);
    this.dispatch(_types.CHANGE_TOPIC);
    this.handleChange();
  };

  _proto.setArrayValue = function setArrayValue(names, values) {
    var _this2 = this;

    names.forEach(function (name, index) {
      (0, _objects.deepSet)(_this2.$values, name, values[index], _this2.deepSetOptions);
    });
    names.forEach(function (name, index) {
      if (_this2.$inputNames[name]) {
        _this2.dispatch((0, _types.updateSubscribe)(name), values[index], name);

        _this2.dispatch((0, _types.changeSubscribe)(name));
      }
    });
    this.dispatch(_types.CHANGE_TOPIC);
    this.handleChange();
  };

  _proto.insert = function insert(name, index, value) {
    this.insertError(name, index, undefined);
    var val = this.get(name);

    if (val) {
      val.splice(index, 0, value);
      this.publishValue(name, _types.IGNORE_VALIDATE);
      this.publishError(name); // insert value into Form in onAppend will trigger Form onChange

      this.handleChange();
    } else {
      this.set(name, [value]);
    }
  };

  _proto.splice = function splice(name, index) {
    this.spliceError(name, index);
    var list = this.get(name);
    list.splice(index, 1);
    this.publishValue(name, _types.IGNORE_VALIDATE);
    this.publishError(name); // remove value from Form in onRemove will trigger Form onChange

    this.handleChange();
  };

  _proto.remove = function remove(name) {
    (0, _objects.deepRemove)(this.$values, name);
  };

  _proto.publishValue = function publishValue(name, type) {
    var _this3 = this;

    var na = name + "[";
    var no = name + ".";
    Object.keys(this.$inputNames).filter(function (n) {
      return n.indexOf(na) === 0 || n.indexOf(no) === 0;
    }).forEach(function (n) {
      _this3.dispatch((0, _types.updateSubscribe)(n), _this3.get(n), n, type);
    });
  };

  _proto.getError = function getError(name, firstHand) {
    if (firstHand) return this.$errors[name];
    return (0, _flat.getSthByName)(name, this.$errors);
  };

  _proto.resetFormError = function resetFormError(error) {
    var _this4 = this;

    if (error === void 0) {
      error = {};
    }

    if (!this.$errors['']) this.$errors[''] = {};
    var items;

    if (Object.keys(error).length) {
      items = Object.keys(error).reduce(function (data, item) {
        data[item] = error[item] instanceof Error ? error[item] : new Error(error[item]);
        return data;
      }, {});
    } else {
      items = Object.keys(this.$errors['']).reduce(function (data, name) {
        data[name] = undefined;
        return data;
      }, {});
    }

    Object.keys(items).map(function (n) {
      return _this4.setFormError(n, items[n]);
    });
  };

  _proto.removeFormError = function removeFormError(name) {
    if (!this.$errors[''] || !this.$errors[''][name]) return;
    this.setFormError(name);
  };

  _proto.setFormError = function setFormError(name, error) {
    if (!this.$errors['']) return;
    if (error === undefined) delete this.$errors[''][name];else this.$errors[''][name] = error;
    this.dispatch((0, _types.errorSubscribe)(name), this.getError(name), name, _types.ERROR_TYPE);
    this.dispatch((0, _types.updateSubscribe)(name));
  };

  _proto.setError = function setError(name, error, pub) {
    if (error === undefined) delete this.$errors[name];else this.$errors[name] = error;
    this.dispatch((0, _types.errorSubscribe)(name), this.getError(name), name, _types.ERROR_TYPE);
    if (pub) this.publishError(name);
  };

  _proto.insertError = function insertError(name, index, error) {
    (0, _flat.insertValue)(this.$errors, name, index, error);
  };

  _proto.spliceError = function spliceError(name, index) {
    (0, _flat.spliceValue)(this.$errors, name, index);
  };

  _proto.publishError = function publishError(name) {
    var _this5 = this;

    var na = name + "[";
    var no = name + ".";
    Object.keys(this.$inputNames).filter(function (n) {
      return n.indexOf(na) === 0 || n.indexOf(no) === 0;
    }).forEach(function (n) {
      _this5.dispatch((0, _types.errorSubscribe)(n), _this5.getError(n), n, _types.ERROR_TYPE);
    });
  };

  _proto.getRule = function getRule(name) {
    if (!this.rules) return [];
    return (0, _objects.deepGet)(this.rules, name) || [];
  };

  _proto.getValue = function getValue() {
    return (0, _clone.deepClone)(this.$values);
  };

  _proto.setValue = function setValue(v, type, forceSet) {
    var _this6 = this;

    if (v === void 0) {
      v = {};
    }

    var values = (0, _is.isObject)(v) ? v : {};

    if (values !== v) {
      console.warn('Form value must be an Object');
    } // 兼容 value 传入 null 等错误等值


    if (!forceSet && (0, _deepEql.default)(values, this.$values)) return;
    this.$values = (0, _clone.deepClone)(values); // wait render end.

    setTimeout(function () {
      Object.keys(_this6.$inputNames).sort(function (a, b) {
        return a.length - b.length;
      }).forEach(function (name) {
        _this6.dispatch((0, _types.updateSubscribe)(name), _this6.get(name), name, type);

        _this6.dispatch((0, _types.changeSubscribe)(name));
      }); // for flow

      _this6.dispatch(_types.CHANGE_TOPIC);
    });
  };

  _proto.bind = function bind(name, fn, value, validate) {
    if (this.$inputNames[name]) {
      console.warn("There is already an item with name \"" + name + "\" exists. The name props must be unique.");
    }

    if (value !== undefined && this.get(name) == null) {
      this.set(name, value, true);
      this.dispatch((0, _types.changeSubscribe)(name));
      this.dispatch(_types.CHANGE_TOPIC);
    }

    if (!(name in this.$defaultValues) && value) this.$defaultValues[name] = (0, _clone.fastClone)(value);
    this.$validator[name] = validate;
    this.$inputNames[name] = true;
    this.subscribe((0, _types.updateSubscribe)(name), fn);
    this.subscribe((0, _types.errorSubscribe)(name), fn);
  };

  _proto.unbind = function unbind(name, cb, reserveAble) {
    var _this7 = this;

    if (Array.isArray(name)) {
      name.forEach(function (n) {
        return _this7.unbind(n);
      });
      return;
    }

    this.unsubscribe((0, _types.updateSubscribe)(name));
    this.unsubscribe((0, _types.errorSubscribe)(name));
    delete this.$inputNames[name];
    delete this.$validator[name];
    delete this.$errors[name];
    delete this.$defaultValues[name]; // when  setData due to unmount not delete value

    if (this.updateLock) return;
    if (!(0, _objects.deepHas)(this.$values, name)) return;
    if (reserveAble) return;
    (0, _objects.deepRemove)(this.$values, name);

    if (!this.formUnmount) {
      setTimeout(function () {
        _this7.handleChange();
      });
    }
  };

  _proto.dispatch = function dispatch(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var event = this.$events[name];
    if (!event) return;
    event.forEach(function (fn) {
      return fn.apply(void 0, args);
    });
  };

  _proto.subscribe = function subscribe(name, fn) {
    if (!this.$events[name]) this.$events[name] = [];
    var events = this.$events[name];
    if (fn in events) return;
    events.push(fn);
  };

  _proto.unsubscribe = function unsubscribe(name, fn) {
    if (!this.$events[name]) return;
    if (fn) this.$events[name] = this.$events[name].filter(function (e) {
      return e !== fn;
    });else delete this.$events[name];
  };

  _proto.validate = function validate(type) {
    var _this8 = this;

    return new Promise(function (resolve, reject) {
      var keys = Object.keys(_this8.$validator);

      var values = _this8.getValue();

      var validates = [].concat(keys.map(function (k) {
        return _this8.$validator[k](_this8.get(k), values, type);
      }), (_this8.$events[_types.VALIDATE_TOPIC] || []).map(function (fn) {
        return fn();
      }));
      Promise.all(validates).then(function (res) {
        var error = res.find(function (r) {
          return r !== true;
        });
        if (error === undefined) resolve(true);else reject(error);
      }).catch(function (e) {
        reject(new _errors.FormError(e));
      });
    });
  };

  _proto.validateFieldsByName = function validateFieldsByName(name, type) {
    var _this9 = this;

    if (!name || typeof name !== 'string') {
      return Promise.reject(new Error("Name expect a string, get \"" + name + "\""));
    }

    var validations = [];
    var values = this.getValue();
    Object.keys(this.$validator).forEach(function (n) {
      if (n === name || n.indexOf(name) === 0) {
        validations.push(_this9.$validator[n](_this9.get(n), values, type));
      }
    });
    return (0, _errors.promiseAll)(validations);
  };

  _proto.validateFields = function validateFields(names, type) {
    var _this10 = this;

    if (!Array.isArray(names)) names = [names];
    var validates = names.map(function (n) {
      return _this10.validateFieldsByName(n, type);
    });
    return (0, _errors.promiseAll)(validates);
  };

  _proto.validateClear = function validateClear() {
    var _this11 = this;

    var keys = Object.keys(this.$validator);
    var validates = keys.map(function (k) {
      return _this11.$validator[k](_types.FORCE_PASS);
    });
    Promise.all(validates);
    this.$errors = {};
  };

  return _default;
}();

exports.default = _default;