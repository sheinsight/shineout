"use strict";

exports.__esModule = true;
exports.default = exports.CheckedMode = void 0;

var _types = require("./types");

var IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE';
var CheckedMode = {
  // 只返回全选数据，包含父节点和子节点
  Full: 0,
  // 返回全部选择字节点和部分选中的父节点
  Half: 1,
  // 只返回选中子节点
  Child: 2,
  // 如果父节点下所有子节点全部选中，只返回父节点
  Shallow: 3,
  // 所选即所得
  Freedom: 4 // check status stack

};
exports.CheckedMode = CheckedMode;

var checkStatusStack = function checkStatusStack(stack, defaultStatus) {
  if (!stack || stack.length <= 0) return defaultStatus;
  if (stack.filter(function (d) {
    return d === 0;
  }).length === stack.length) return 0;
  var s = stack.filter(function (d) {
    return d === 0 || d === 2;
  });
  if (s.length <= 0) return defaultStatus;
  return 2;
};

var _default =
/*#__PURE__*/
function () {
  function _default(options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        data = _options.data,
        value = _options.value,
        keygen = _options.keygen,
        mode = _options.mode,
        disabled = _options.disabled,
        _options$childrenKey = _options.childrenKey,
        childrenKey = _options$childrenKey === void 0 ? 'children' : _options$childrenKey,
        unmatch = _options.unmatch;
    this.keygen = keygen;
    this.mode = mode;
    this.valueMap = new Map();
    this.unmatchedValueMap = new Map();
    this.unmatch = unmatch;
    this.events = {};
    this.$events = {};

    this.disabled = disabled || function () {
      return false;
    };

    this.childrenKey = childrenKey;
    this.setValue(value);
    this.setData(data);
  }

  var _proto = _default.prototype;

  _proto.updateDisabled = function updateDisabled(dis) {
    this.disabled = dis || function () {
      return false;
    };
  };

  _proto.bind = function bind(id, update) {
    this.events[id] = update;
  };

  _proto.unbind = function unbind(id) {
    delete this.events[id];
  };

  _proto.setUnmatedValue = function setUnmatedValue() {
    var _this = this;

    this.unmatchedValueMap = new Map();
    if (!this.value || !this.data) return;
    this.value.forEach(function (v) {
      var data = _this.getDataById(v);

      var unmatched = _this.isUnMatch(data);

      if (unmatched) _this.unmatchedValueMap.set(v, true);else _this.unmatchedValueMap.delete(v);
    });
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.isUnMatch = function isUnMatch(data) {
    return data && data[IS_NOT_MATCHED_VALUE];
  };

  _proto.setValue = function setValue(value) {
    this.value = value;

    if (value && value !== this.cachedValue) {
      this.initValue();
    }

    this.setUnmatedValue();
  };

  _proto.getValue = function getValue() {
    var _this2 = this;

    var value = [];
    this.valueMap.forEach(function (checked, id) {
      switch (_this2.mode) {
        case CheckedMode.Full:
        case CheckedMode.Freedom:
          if (checked === 1) value.push(id);
          break;

        case CheckedMode.Half:
          if (checked >= 1) value.push(id);
          break;

        case CheckedMode.Child:
          if (checked === 1 && _this2.pathMap.get(id).children.length === 0) value.push(id);
          break;

        case CheckedMode.Shallow:
          if (checked === 1) {
            var parentChecked = function () {
              var _this2$pathMap$get = _this2.pathMap.get(id),
                  path = _this2$pathMap$get.path;

              var pid = path[path.length - 1];
              if (!pid && pid !== 0) return false;
              return _this2.valueMap.get(pid) === 1;
            }();

            if (!parentChecked) value.push(id);
          }

          break;

        default:
      }
    });
    this.unmatchedValueMap.forEach(function (unmatch, id) {
      if (unmatch && _this2.unmatch) value.push(id);
    });
    this.cachedValue = value;
    return value;
  };

  _proto.setValueMap = function setValueMap(id, checked) {
    this.valueMap.set(id, checked);
    var update = this.events[id];
    if (update) update();
  };

  _proto.set = function set(id, checked, direction) {
    var _this3 = this;

    // self
    if (!this.isDisabled(id)) this.setValueMap(id, checked);
    var data = this.getDataById(id);

    if (data && data[IS_NOT_MATCHED_VALUE]) {
      if (checked) this.unmatchedValueMap.set(id, true);else this.unmatchedValueMap.delete(id);
      return null;
    }

    if (CheckedMode.Freedom === this.mode) {
      // Free mode will return zero
      return 0;
    }

    var _this$pathMap$get = this.pathMap.get(id),
        path = _this$pathMap$get.path,
        children = _this$pathMap$get.children;

    var childrenStack = []; // children

    if (direction !== 'asc') {
      children.forEach(function (cid) {
        // push status to stack
        childrenStack.push(_this3.set(cid, checked, 'desc'));
      });
    } // Exclude disabled


    var current = this.valueMap.get(id); // check all children status

    var status = checkStatusStack(childrenStack, current);

    if (status !== current) {
      this.setValueMap(id, status);
      current = status;
    } // parent


    if (direction !== 'desc' && path.length > 0) {
      var parentId = path[path.length - 1];
      var parentChecked = current;
      this.pathMap.get(parentId).children.forEach(function (cid) {
        if (parentChecked !== _this3.valueMap.get(cid)) {
          parentChecked = 2;
        }
      });
      this.set(parentId, parentChecked, 'asc');
    }

    return current;
  };

  _proto.isDisabled = function isDisabled(id) {
    var node = this.pathMap.get(id);
    if (node) return node.isDisabled;
    return false;
  };

  _proto.get = function get(id) {
    return this.valueMap.get(id);
  };

  _proto.getDataById = function getDataById(id) {
    var _ref;

    var oroginData = this.dataMap.get(id);
    if (oroginData) return oroginData;
    if (!this.unmatch) return null;
    return _ref = {}, _ref[IS_NOT_MATCHED_VALUE] = true, _ref.value = id, _ref;
  };

  _proto.getPath = function getPath(id) {
    return this.pathMap.get(id);
  };

  _proto.getChecked = function getChecked(id) {
    var value = this.get(id);
    var checked = value === 1;
    if (value === 2) checked = 'indeterminate';
    return checked;
  };

  _proto.getKey = function getKey(data, id, index) {
    if (id === void 0) {
      id = '';
    }

    if (typeof this.keygen === 'function') return this.keygen(data, id);
    if (this.keygen) return data[this.keygen];
    return id + (id ? ',' : '') + index;
  };

  _proto.initValue = function initValue(ids, forceCheck) {
    var _this4 = this;

    if (!this.data || !this.value) return undefined;

    if (!ids) {
      ids = [];
      this.pathMap.forEach(function (val, id) {
        if (val.path.length === 0) ids.push(id);
      });
    }

    var checked;
    ids.forEach(function (id) {
      var _this4$pathMap$get = _this4.pathMap.get(id),
          children = _this4$pathMap$get.children;

      if (forceCheck) {
        _this4.setValueMap(id, 1);

        _this4.initValue(children, forceCheck);

        return;
      }

      var childChecked = _this4.value.indexOf(id) >= 0 ? 1 : 0;

      if (childChecked === 1 && _this4.mode !== CheckedMode.Half && _this4.mode !== CheckedMode.Freedom) {
        _this4.initValue(children, 1);
      } else if (children.length > 0) {
        // 保持迭代
        var res = _this4.initValue(children);

        childChecked = _this4.mode === CheckedMode.Freedom ? childChecked : res;
      } else {
        childChecked = _this4.value.indexOf(id) >= 0 ? 1 : 0;
      }

      _this4.setValueMap(id, childChecked);

      if (checked === undefined) checked = childChecked;else if (checked !== childChecked) checked = 2;
    });
    return checked;
  };

  _proto.initData = function initData(data, path, disabled, index) {
    var _this5 = this;

    if (index === void 0) {
      index = [];
    }

    var ids = [];
    data.forEach(function (d, i) {
      var id = _this5.getKey(d, path[path.length - 1], i);

      if (_this5.dataMap.get(id)) {
        console.error("There is already a key \"" + id + "\" exists. The key must be unique.");
        return;
      }

      _this5.dataMap.set(id, d);

      var isDisabled = disabled;

      if (!isDisabled && typeof _this5.disabled === 'function') {
        isDisabled = _this5.disabled(d, i);
      }

      var indexPath = [].concat(index, [i]);
      ids.push(id);
      var children = [];

      if (Array.isArray(d[_this5.childrenKey])) {
        children = _this5.initData(d[_this5.childrenKey], [].concat(path, [id]), // exclude Freedom
        _this5.mode === CheckedMode.Freedom ? disabled : isDisabled, indexPath);
      }

      _this5.pathMap.set(id, {
        children: children,
        path: path,
        isDisabled: isDisabled,
        indexPath: indexPath,
        index: i
      });
    });
    return ids;
  };

  _proto.setData = function setData(data, dispatch) {
    var prevValue = this.value || [];
    this.cachedValue = [];
    this.pathMap = new Map();
    this.dataMap = new Map();
    this.valueMap = new Map();
    this.unmatchedValueMap = new Map();
    this.data = data;
    if (!data) return;
    this.initData(data, []);
    this.initValue();
    this.setValue(prevValue);
    if (dispatch) this.dispatch(_types.CHANGE_TOPIC);
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

  return _default;
}();

exports.default = _default;