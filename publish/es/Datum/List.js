import _createClass from "@babel/runtime/helpers/createClass";
import deepEqual from 'deep-eql';
import shallowEqual from '../utils/shallowEqual';
import { CHANGE_TOPIC, WITH_OUT_DISPATCH } from './types';

var _default =
/*#__PURE__*/
function () {
  function _default(args) {
    if (args === void 0) {
      args = {};
    }

    var _args = args,
        format = _args.format,
        onChange = _args.onChange,
        separator = _args.separator,
        value = _args.value,
        prediction = _args.prediction,
        distinct = _args.distinct,
        disabled = _args.disabled,
        limit = _args.limit;
    this.distinct = distinct;
    this.limit = limit;
    this.separator = separator;
    this.initFormat(format);
    this.$events = {};
    this.$cachedDisabled = {};
    this.$cachedFlatten = new Map();
    this.setDisabled(disabled);
    if (prediction) this.prediction = prediction;
    this.setValue(value, WITH_OUT_DISPATCH);
    this.onChange = onChange;
  }

  var _proto = _default.prototype;

  // should clean $cachedFlatten when data changed
  _proto.cleanDataCache = function cleanDataCache() {
    this.$cachedFlatten = new Map();
  };

  _proto.resetValueMap = function resetValueMap() {
    var map = new Map();

    for (var i = 0; i < this.$values.length; i++) {
      map.set(this.$values[i], true);
    }

    this.valueMap = map;
  };

  _proto.setDisabled = function setDisabled(disabled) {
    if (this.$cachedDisabled === disabled) return;
    this.$cachedDisabled = disabled;

    this.disabled = function () {
      switch (typeof disabled) {
        case 'boolean':
          return disabled;

        case 'function':
          return disabled.apply(void 0, arguments);

        default:
          return false;
      }
    };
  };

  _proto.handleChange = function handleChange(values) {
    this.$values = values;
    this.resetValueMap();
    this.dispatch(CHANGE_TOPIC);

    if (this.onChange) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.onChange.apply(this, [this.getValue()].concat(args));
    }
  };

  _proto.flattenTreeData = function flattenTreeData(data, childrenKey) {
    var _this = this;

    var keys = data.map(function (v) {
      return _this.format(v);
    }).map(function (v) {
      return typeof v === 'object' ? JSON.stringify(v) : v;
    });
    var key = keys.join();

    if (keys.length !== 0) {
      var cached = this.$cachedFlatten.get(key);
      if (cached) return cached;
    }

    var flatten = [];

    var deepAdd = function deepAdd(items) {
      items.forEach(function (item) {
        var exist = flatten.find(function (raw) {
          return _this.prediction ? _this.prediction(raw, item) : _this.format(raw) === _this.format(item);
        });
        if (!exist) flatten.push(item);
        if (item[childrenKey]) deepAdd(item[childrenKey]);
      });
    };

    deepAdd(data);
    if (keys.length) this.$cachedFlatten.set(key, flatten);
    return flatten;
  };

  _proto.setLock = function setLock(lock) {
    this.updateLock = lock;
  };

  _proto.add = function add(data, _, childrenKey, unshift) {
    var _this2 = this;

    if (data === undefined || data === null) return; // clear value

    if (this.limit === 1) this.$values = [];
    this.resetValueMap();
    var raws = Array.isArray(data) ? data : [data];

    if (childrenKey && this.limit !== 1) {
      raws = this.flattenTreeData(raws, childrenKey);
    }

    raws = raws.filter(function (v) {
      var disabled = _this2.disabled(v);

      if (disabled) return false;
      if (_this2.distinct) return !_this2.check(v);
      return true;
    });
    var values = [];

    for (var _iterator = raws, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var r = _ref;
      var v = this.format(r);
      if (v !== undefined) values.push(v);
    }

    this.handleChange(unshift ? values.concat(this.values) : this.values.concat(values), data, true);
  };

  _proto.set = function set(value) {
    this.$values = [];
    this.resetValueMap();
    this.add(value);
  };

  _proto.check = function check(raw) {
    if (this.prediction) {
      for (var i = 0, count = this.values.length; i < count; i++) {
        if (this.prediction(this.values[i], raw)) return true;
      }

      return false;
    }

    return !!this.valueMap.get(this.format(raw));
  };

  _proto.getDataByValue = function getDataByValue(data, value) {
    var _this3 = this;

    if (this.prediction) {
      for (var i = 0, count = data.length; i < count; i++) {
        if (this.prediction(value, data[i])) return data[i];
      }

      return null;
    }

    return data.find(function (d) {
      return value === _this3.format(d);
    });
  };

  _proto.clear = function clear() {
    this.values = [];
  };

  _proto.dispatch = function dispatch(name) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var event = this.$events[name];
    if (!event) return;
    event.forEach(function (fn) {
      return fn.apply(void 0, args);
    });
  };

  _proto.initFormat = function initFormat(f) {
    switch (typeof f) {
      case 'string':
        this.format = function (value) {
          return value[f];
        };

        break;

      case 'function':
        this.format = function (value) {
          return f(value);
        };

        break;

      default:
        this.format = function (a) {
          return a;
        };

        break;
    }
  };

  _proto.defaultPrediction = function defaultPrediction(value, data) {
    return value === this.format(data);
  };

  _proto.remove = function remove(value, _, childrenKey) {
    var _this4 = this;

    if (value === undefined || value === null) return;
    var raws = Array.isArray(value) ? value : [value];

    if (childrenKey) {
      raws = this.flattenTreeData(raws, childrenKey);
    }

    raws = raws.filter(function (r) {
      return !_this4.disabled(r);
    });
    var values = [];

    if (!this.prediction) {
      var rowValueMap = new Map();

      for (var i = 0; i < raws.length; i++) {
        if (raws[i].IS_NOT_MATCHED_VALUE) {
          rowValueMap.set(raws[i].value, true);
        } else {
          rowValueMap.set(this.format(raws[i]), true);
        }
      }

      for (var _i2 = 0; _i2 < this.values.length; _i2++) {
        var val = this.values[_i2];

        if (!rowValueMap.get(val)) {
          values.push(val);
        }
      }
    } else {
      var prediction = this.prediction;

      outer: for (var _iterator2 = this.values, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i3 >= _iterator2.length) break;
          _ref2 = _iterator2[_i3++];
        } else {
          _i3 = _iterator2.next();
          if (_i3.done) break;
          _ref2 = _i3.value;
        }

        var _val = _ref2;

        for (var j = 0; j < raws.length; j++) {
          if (raws[j].IS_NOT_MATCHED_VALUE && _val === raws[j].value || prediction(_val, raws[j])) {
            raws.splice(j, 1);
            continue outer;
          }
        }

        values.push(_val);
      }
    } // this.values = values


    this.handleChange(values, value, false);
  };

  _proto.subscribe = function subscribe(name, fn) {
    if (!this.$events[name]) this.$events[name] = [];
    var events = this.$events[name];
    if (fn in events) return;
    events.push(fn);
  };

  _proto.unsubscribe = function unsubscribe(name, fn) {
    if (!this.$events[name]) return;
    this.$events[name] = this.$events[name].filter(function (e) {
      return e !== fn;
    });
  };

  _proto.getValue = function getValue() {
    var value = this.values; // eslint-disable-next-line

    if (this.limit === 1) value = this.values[0];else if (this.separator) value = this.values.join(this.separator);
    this.$cachedValue = value;
    return value;
  };

  _proto.resetValue = function resetValue(values, cached) {
    this.$values = values;
    this.resetValueMap();

    if (this.onChange && !cached) {
      this.onChange(this.getValue());
    }

    this.dispatch(CHANGE_TOPIC);
    this.dispatch('set-value');
  };

  _proto.formatValue = function formatValue(values) {
    if (values === void 0) {
      values = [];
    }

    if (this.limit === 1 && !Array.isArray(values)) {
      return [values];
    }

    if (!values) return [];

    if (Array.isArray(values)) {
      return values;
    }

    if (typeof values === 'string') {
      if (this.separator) {
        return values.split(this.separator).map(function (s) {
          return s.trim();
        });
      }

      console.warn('Select separator parameter is empty.');
      return [values];
    }

    console.error(new Error('Select values is not valid.'));
    return [];
  };

  _proto.setValue = function setValue(values, type) {
    if (values === void 0) {
      values = [];
    }

    if (deepEqual(values, this.$values)) return;

    if (type === WITH_OUT_DISPATCH) {
      this.$values = this.formatValue(values);
      this.resetValueMap();
    } else {
      this.resetValue(this.formatValue(values), shallowEqual(this.$cachedValue, values));
    }

    this.$cachedValue = this.getValue();
  };

  _createClass(_default, [{
    key: "length",
    get: function get() {
      return this.$values.length;
    }
  }, {
    key: "values",
    get: function get() {
      return this.$values;
    },
    set: function set(values) {
      this.$values = values;
      this.resetValueMap();
      this.dispatch(CHANGE_TOPIC);

      if (this.onChange) {
        this.onChange(this.getValue());
      }
    }
  }]);

  return _default;
}();

export { _default as default };