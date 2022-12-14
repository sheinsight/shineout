"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.loopConsumer = exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("../context"));

var _component = require("../component");

var _types = require("../Datum/types");

var _validate = _interopRequireDefault(require("../utils/validate"));

var _uid = require("../utils/uid");

var _numbers = require("../utils/numbers");

var _errors = require("../utils/errors");

var _FieldError = _interopRequireDefault(require("./FieldError"));

var _createReactContext = (0, _context.default)(),
    Provider = _createReactContext.Provider,
    Consumer = _createReactContext.Consumer;

var Tag = _react.default.Fragment ? _react.default.Fragment : 'span';

var Loop =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Loop, _PureComponent);

  function Loop(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.contextValue = {
      bind: _this.bindValidate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))),
      unbind: _this.unbindValidate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)))
    };
    _this.validate = _this.validate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.selfValidate = _this.selfValidate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.update = _this.forceUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.validations = [_this.selfValidate];
    _this.keys = [];
    console.warn('Form.Loop is not recommend. Use Form.FieldSet instead.');
    return _this;
  }

  var _proto = Loop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var _this$props = this.props,
        formDatum = _this$props.formDatum,
        name = _this$props.name,
        defaultValue = _this$props.defaultValue;
    formDatum.bind(name, this.handleUpdate.bind(this), defaultValue, this.validate);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    var _this$props2 = this.props,
        formDatum = _this$props2.formDatum,
        name = _this$props2.name;

    if (formDatum && name) {
      formDatum.unbind(name, this.handleUpdate);
    }
  };

  _proto.bindValidate = function bindValidate(val) {
    if (this.validations.indexOf(val) < 0) {
      this.validations.unshift(val);
    }
  };

  _proto.unbindValidate = function unbindValidate(val) {
    this.validations = this.validations.filter(function (v) {
      return v !== val;
    });
  };

  _proto.selfValidate = function selfValidate() {
    var _this$props3 = this.props,
        formDatum = _this$props3.formDatum,
        name = _this$props3.name;
    var value = formDatum.get(name);
    var data = formDatum.getValue();
    var rules = [].concat(this.props.rules);
    rules = rules.concat(formDatum.getRule(name));
    return (0, _validate.default)(value, data, rules, 'array').then(function () {
      formDatum.setError(name, []);
      return true;
    }, function (e) {
      formDatum.setError(name, e);
      return (0, _errors.wrapFormError)(e);
    });
  };

  _proto.updateWithValidate = function updateWithValidate() {
    this.selfValidate().then(this.update);
  };

  _proto.validate = function validate(type) {
    // old api
    var value = type === _types.FORCE_PASS ? _types.FORCE_PASS : undefined;
    return (0, _errors.promiseAll)(this.validations.map(function (v) {
      return v(value, undefined);
    }));
  };

  _proto.handleUpdate = function handleUpdate(_, sn, type) {
    if (type === _types.ERROR_TYPE || type === _types.IGNORE_VALIDATE) {
      this.update();
    } else if (type === _types.FORCE_PASS) {
      this.validate(_types.FORCE_PASS);
    } else {
      this.selfValidate().then(this.update).catch(function () {});
    }
  };

  _proto.handleChange = function handleChange(index, value, fullSet) {
    var _this$props4 = this.props,
        formDatum = _this$props4.formDatum,
        name = _this$props4.name;

    if (fullSet) {
      formDatum.set(name, value);
      return;
    }

    var values = formDatum.get(name);
    if (!values) return;
    values[index] = value;
    formDatum.set(name, [].concat(values));
  };

  _proto.handleInsert = function handleInsert(index, value) {
    this.keys.splice(index, 0, (0, _uid.getUidStr)());
    var _this$props5 = this.props,
        formDatum = _this$props5.formDatum,
        name = _this$props5.name;
    formDatum.insert(name, index, value);
    this.updateWithValidate();
  };

  _proto.handleRemove = function handleRemove(index) {
    this.keys.splice(index, 1);
    var _this$props6 = this.props,
        formDatum = _this$props6.formDatum,
        name = _this$props6.name;
    formDatum.splice(name, index);
    this.updateWithValidate();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props7 = this.props,
        children = _this$props7.children,
        empty = _this$props7.empty,
        formDatum = _this$props7.formDatum,
        name = _this$props7.name,
        defaultValue = _this$props7.defaultValue;
    var values = formDatum.get(name) || defaultValue;
    var error = formDatum.getError(name);

    if (values.length === 0 && empty) {
      return empty(this.handleInsert.bind(this, 0));
    }

    (0, _numbers.range)(values.length, 0).forEach(function (i) {
      if (!_this2.keys[i]) _this2.keys[i] = (0, _uid.getUidStr)();
    });
    var errorList = Array.isArray(error) ? error : [];
    var results = values.map(function (value, index) {
      return _react.default.createElement(Tag, {
        key: _this2.keys[index]
      }, children({
        list: values,
        value: value,
        index: index,
        error: errorList[index],
        onChange: _this2.handleChange.bind(_this2, index),
        onInsert: _this2.handleInsert.bind(_this2, index),
        onAppend: _this2.handleInsert.bind(_this2, index + 1),
        onRemove: _this2.handleRemove.bind(_this2, index)
      }));
    });

    if (error instanceof Error) {
      results.push(_react.default.createElement(_FieldError.default, {
        key: "error",
        error: error
      }));
    }

    return _react.default.createElement(Provider, {
      value: this.contextValue
    }, results);
  };

  return Loop;
}(_component.PureComponent);

exports.default = Loop;
Loop.propTypes = {
  children: _propTypes.default.func.isRequired,
  defaultValue: _propTypes.default.array,
  empty: _propTypes.default.func,
  formDatum: _propTypes.default.object.isRequired,
  name: _propTypes.default.string,
  rules: _propTypes.default.array
};
Loop.defaultProps = {
  defaultValue: [],
  rules: [] // eslint-disable-next-line

};

var loopConsumer = function loopConsumer(Origin) {
  return (
    /*#__PURE__*/
    function (_PureComponent2) {
      (0, _inheritsLoose2.default)(_class, _PureComponent2);

      function _class() {
        return _PureComponent2.apply(this, arguments) || this;
      }

      var _proto2 = _class.prototype;

      _proto2.render = function render() {
        var _this3 = this;

        return _react.default.createElement(Consumer, null, function (value) {
          return _react.default.createElement(Origin, (0, _extends2.default)({}, _this3.props, {
            loopContext: value
          }));
        });
      };

      return _class;
    }(_component.PureComponent)
  );
};

exports.loopConsumer = loopConsumer;