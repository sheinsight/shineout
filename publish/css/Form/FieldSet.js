"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.FieldSetProvider = exports.fieldSetConsumer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("../context"));

var _component = require("../component");

var _objects = require("../utils/objects");

var _validate2 = _interopRequireDefault(require("../utils/validate"));

var _errors = require("../utils/errors");

var _types = require("../Datum/types");

var _FieldError = _interopRequireDefault(require("./FieldError"));

var _createReactContext = (0, _context.default)(),
    Provider = _createReactContext.Provider,
    Consumer = _createReactContext.Consumer;

var extendName = function extendName(path, name) {
  if (path === void 0) {
    path = '';
  }

  if (name === undefined) return undefined;
  if (name === '') return path;
  if (Array.isArray(name)) return name.map(function (n) {
    return extendName(path, n);
  });
  return "" + path + (path.length > 0 ? '.' : '') + name;
};

var FieldSet =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(FieldSet, _Component);

  function FieldSet(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.validate = _this.validate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = FieldSet.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _Component.prototype.componentDidMount.call(this);

    var _this$props = this.props,
        formDatum = _this$props.formDatum,
        name = _this$props.name,
        defaultValue = _this$props.defaultValue;
    formDatum.bind(name, this.handleUpdate, defaultValue, this.validate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _Component.prototype.componentWillUnmount.call(this);

    var _this$props2 = this.props,
        formDatum = _this$props2.formDatum,
        name = _this$props2.name;
    formDatum.unbind(name, this.handleUpdate);
  };

  _proto.validate = function validate() {
    var _this2 = this;

    var _this$props3 = this.props,
        formDatum = _this$props3.formDatum,
        name = _this$props3.name;
    var value = formDatum.get(name);
    var data = formDatum.getValue();
    var validateProps = (0, _objects.filterProps)(this.props, function (v) {
      return typeof v === 'string' || typeof v === 'number';
    });
    validateProps.type = 'array';
    var rules = [].concat(this.props.rules);
    rules = rules.concat(formDatum.getRule(name));
    if (rules.length === 0) return Promise.resolve(true);
    return (0, _validate2.default)(value, data, rules, validateProps).then(function () {
      _this2.handleError();

      return true;
    }, function (e) {
      _this2.handleError(e);

      return new _errors.FormError(e);
    });
  };

  _proto.updateWithValidate = function updateWithValidate() {
    var _this3 = this;

    this.validate().then(function () {
      _this3.forceUpdate();
    });
  };

  _proto.handleError = function handleError(error) {
    var _this$props4 = this.props,
        formDatum = _this$props4.formDatum,
        name = _this$props4.name,
        onError = _this$props4.onError;
    if ((0, _errors.isSameError)(error, formDatum.getError(name, true))) return;
    formDatum.setError(name, error, true);
    if (onError) onError(error);
  };

  _proto.handleUpdate = function handleUpdate(v, n, type) {
    var _this4 = this;

    if (this.updateTimer) clearTimeout(this.updateTimer);
    this.updateTimer = setTimeout(function () {
      if (type === _types.ERROR_TYPE || type === _types.FORCE_PASS || type === _types.IGNORE_VALIDATE) {
        _this4.forceUpdate();
      } else {
        _this4.updateWithValidate();
      }
    });
  };

  _proto.handleInsert = function handleInsert(index, value) {
    var _this$props5 = this.props,
        formDatum = _this$props5.formDatum,
        name = _this$props5.name;
    formDatum.insert(name, index, value);
    this.updateWithValidate();
  };

  _proto.handleRemove = function handleRemove(index) {
    var _this$props6 = this.props,
        formDatum = _this$props6.formDatum,
        name = _this$props6.name;
    formDatum.splice(name, index);
    this.updateWithValidate();
  };

  _proto.handleChange = function handleChange(index, value, update) {
    var _this$props7 = this.props,
        formDatum = _this$props7.formDatum,
        name = _this$props7.name;
    formDatum.set(name + "[" + index + "]", value);
    if (update) this.updateWithValidate();
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$props8 = this.props,
        children = _this$props8.children,
        formDatum = _this$props8.formDatum,
        name = _this$props8.name,
        empty = _this$props8.empty,
        defaultValue = _this$props8.defaultValue;
    var errors = formDatum.getError(name);
    var result = [];

    if (typeof children !== 'function') {
      return _react.default.createElement(Provider, {
        value: {
          path: name,
          val: this.validate
        }
      }, children, errors instanceof Error && _react.default.createElement(_FieldError.default, {
        key: "error",
        error: errors
      }));
    }

    var values = formDatum.get(name) || defaultValue || [];
    if (values && !Array.isArray(values)) values = [values];

    if (values.length === 0 && empty) {
      result.push(empty(this.handleInsert.bind(this, 0)));
    } else {
      var errorList = (Array.isArray(errors) ? errors : [errors]).filter(Boolean);
      values.forEach(function (v, i) {
        result.push(_react.default.createElement(Provider, {
          key: i,
          value: {
            path: name + "[" + i + "]",
            val: _this5.validate
          }
        }, children({
          list: values,
          value: v,
          index: i,
          error: errorList,
          datum: formDatum,
          onChange: _this5.handleChange.bind(_this5, i),
          onInsert: _this5.handleInsert.bind(_this5, i),
          onAppend: _this5.handleInsert.bind(_this5, i + 1),
          onRemove: _this5.handleRemove.bind(_this5, i)
        })));
      });
    }

    if (errors instanceof Error) {
      result.push(_react.default.createElement(_FieldError.default, {
        key: "error",
        error: errors
      }));
    }

    return result;
  };

  return FieldSet;
}(_component.Component);

FieldSet.propTypes = {
  children: _propTypes.default.any,
  defaultValue: _propTypes.default.array,
  empty: _propTypes.default.func,
  formDatum: _propTypes.default.object.isRequired,
  name: _propTypes.default.string.isRequired,
  onError: _propTypes.default.func,
  rules: _propTypes.default.array
};
FieldSet.defaultProps = {
  rules: []
};

var fieldSetConsumer = function fieldSetConsumer(Origin) {
  return function (props) {
    return _react.default.createElement(Consumer, null, function (_temp) {
      var _ref = _temp === void 0 ? {} : _temp,
          path = _ref.path,
          val = _ref.val;

      return _react.default.createElement(Origin, (0, _extends2.default)({}, props, {
        // eslint-disable-next-line
        name: extendName(path, props.name),
        innerFormNamePath: path,
        fieldSetValidate: val
      }));
    });
  };
};

exports.fieldSetConsumer = fieldSetConsumer;
var FieldSetProvider = Provider;
exports.FieldSetProvider = FieldSetProvider;

var _default = fieldSetConsumer(FieldSet);

exports.default = _default;