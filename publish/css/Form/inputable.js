"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _errors = require("../utils/errors");

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _func = require("../utils/func");

var _objects = require("../utils/objects");

var _uid = require("../utils/uid");

var _is = require("../utils/is");

var _validate2 = _interopRequireDefault(require("../utils/validate"));

var _types = require("../Datum/types");

var _formContext = require("./formContext");

var _Item = require("./Item");

var _Loop = require("./Loop");

var _FieldSet = require("./FieldSet");

var types = ['formDatum', 'disabled', 'combineRules', 'size'];
var consumer = (0, _func.compose)((0, _formContext.formConsumer)(types), _Item.itemConsumer, _Loop.loopConsumer, _FieldSet.fieldSetConsumer);

var tryValue = function tryValue(val, def) {
  return val === undefined ? def : val;
};

var beforeValueChange = (0, _func.curry)(function (fn, value, datum) {
  if (!fn) return value;
  var newValue = fn(value, datum);
  return newValue === undefined ? value : newValue;
});

var _default = (0, _func.curry)(function (Origin) {
  var _class, _temp;

  return consumer((_temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inheritsLoose2.default)(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      var formDatum = props.formDatum,
          name = props.name,
          defaultValue = props.defaultValue;
      _this.state = {
        error: undefined,
        value: props.value || defaultValue
      };
      _this.itemName = (0, _uid.getUidStr)();
      _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleDatumBind = _this.handleDatumBind.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.handleError = _this.handleError.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.validate = _this.validate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.validateHook = _this.validateHook.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.lastValue = formDatum && name ? formDatum.get(name) || {} : {};
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      _Component.prototype.componentDidMount.call(this);

      var _this$props = this.props,
          onChange = _this$props.onChange,
          readOnly = _this$props.readOnly,
          disabled = _this$props.disabled;

      if ('value' in this.props && !onChange && disabled !== true && readOnly !== true) {
        console.error('warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly` or `disabled`');
      }

      var _this$props2 = this.props,
          formDatum = _this$props2.formDatum,
          loopContext = _this$props2.loopContext,
          name = _this$props2.name,
          defaultValue = _this$props2.defaultValue,
          bindInputToItem = _this$props2.bindInputToItem,
          popover = _this$props2.popover;

      if (formDatum && name) {
        if (Array.isArray(name)) {
          var dv = defaultValue || [];
          name.forEach(function (n, i) {
            return formDatum.bind(n, _this2.handleUpdate, dv[i], _this2.validate);
          });
          this.state.value = name.map(function (n) {
            return formDatum.get(n);
          });
          formDatum.subscribe((0, _types.errorSubscribe)(this.errorName), this.handleUpdate);
        } else {
          formDatum.bind(name, this.handleUpdate, defaultValue, this.validate);
          this.state.value = formDatum.get(name);
        }

        this.lastValue = this.state.value;
      }

      if (bindInputToItem && name && !popover) bindInputToItem(this.errorName);
      if (loopContext) loopContext.bind(this.validate);
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      var skip = [].concat(this.props.scuSkip || [], ['formDatum', 'loopContext']);
      var isFormDatum = this.props.formDatum && this.props.name;
      if (isFormDatum) skip.push('value');
      var options = {
        skip: skip,
        deep: ['data', 'defaultValue', 'datum', 'name', 'rule', 'style']
      };
      if (!isFormDatum && !(0, _shallowEqual.default)(this.getValue(), nextState.value)) return true;
      return !((0, _shallowEqual.default)(nextProps, this.props, options) && (0, _shallowEqual.default)(nextState, this.state));
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      _Component.prototype.componentWillUnmount.call(this);

      var _this$props3 = this.props,
          formDatum = _this$props3.formDatum,
          name = _this$props3.name,
          loopContext = _this$props3.loopContext,
          unbindInputFromItem = _this$props3.unbindInputFromItem,
          reserveAble = _this$props3.reserveAble;
      clearTimeout(this.updateTimer);

      if (formDatum && name) {
        formDatum.unbind(name, this.handleUpdate, reserveAble);

        if (Array.isArray(name)) {
          formDatum.unsubscribe((0, _types.errorSubscribe)(this.errorName), this.handleUpdate);
          formDatum.setError(this.errorName);
        }
      }

      if (unbindInputFromItem && name) unbindInputFromItem(this.errorName);
      if (loopContext) loopContext.unbind(this.validate);
    };

    _proto.getValue = function getValue() {
      var _this$props4 = this.props,
          formDatum = _this$props4.formDatum,
          name = _this$props4.name,
          value = _this$props4.value,
          defaultValue = _this$props4.defaultValue;

      if (formDatum && name) {
        if (Array.isArray(name)) {
          var dv = defaultValue || [];
          return name.map(function (n, i) {
            return tryValue(formDatum.get(n), dv[i]);
          });
        }

        return tryValue(formDatum.get(name), defaultValue);
      }

      var hasValue = 'value' in this.props || 'checked' in this.props;
      return !hasValue ? this.state.value : value;
    };

    _proto.getError = function getError() {
      var _this$props5 = this.props,
          formDatum = _this$props5.formDatum,
          name = _this$props5.name,
          error = _this$props5.error;

      if ('error' in this.props) {
        return error;
      }

      if (formDatum && name) {
        return formDatum.getError(this.errorName);
      }

      return this.state.error;
    };

    _proto.handleDatumBind = function handleDatumBind(datum) {
      this.datum = datum;
    };

    _proto.handleError = function handleError(error) {
      var _this$props6 = this.props,
          formDatum = _this$props6.formDatum,
          name = _this$props6.name,
          onItemError = _this$props6.onItemError,
          onError = _this$props6.onError;

      if (formDatum && name) {
        if (!(0, _errors.isSameError)(error, formDatum.getError(this.errorName, true))) {
          formDatum.setError(this.errorName, error, true);
        }
      } else {
        this.setState({
          error: error
        });
      }

      var hasError = error !== undefined;
      this.errorChange = hasError !== this.lastError;
      this.lastError = hasError;
      if (onError) onError(error);
      if (onItemError && !name) onItemError(this.itemName, error);
    };

    _proto.validateHook = function validateHook(customValidate) {
      this.customValidate = customValidate;
    };

    _proto.validate = function validate(value, data, type) {
      var _this3 = this;

      var _this$props7 = this.props,
          name = _this$props7.name,
          formDatum = _this$props7.formDatum,
          combineRules = _this$props7.combineRules,
          bind = _this$props7.bind;
      var names = Array.isArray(name) ? name : [name];
      var validates = [];
      var validateProps = (0, _objects.filterProps)(this.props, function (v) {
        return typeof v === 'string' || typeof v === 'number';
      });

      if (this.datum) {
        var datumValue = this.datum.formatValue(value);
        value = this.datum.limit === 1 ? datumValue[0] : datumValue;
        validateProps.type = 'array';
      }

      if (type === _types.FORCE_PASS || value === _types.FORCE_PASS) {
        this.handleError();
        return Promise.resolve(true);
      }

      if (value === undefined || Array.isArray(name)) value = this.getValue();
      if (!Array.isArray(name)) value = [value];
      if (this.customValidate) validates.push(this.customValidate());

      if (formDatum && bind && type !== _types.IGNORE_BIND) {
        // console.error(new Error('Use "bind" props to combine validate is not recommend. Use Form "groups" props instead.'))
        formDatum.validateFields(bind, _types.IGNORE_BIND).catch(function () {});
      }

      if (!data && formDatum) data = formDatum.getValue();
      var rules = this.props.rules;
      names.forEach(function (n, i) {
        if (formDatum && combineRules) {
          rules = combineRules(n, rules);
        }

        if ((0, _is.isArray)(rules) && rules.length > 0) {
          validates.push((0, _validate2.default)(value[i], data, rules, validateProps));
        }
      });
      return (0, _errors.promiseAll)(validates).then(function (res) {
        _this3.handleError(res === true ? undefined : res);

        return res;
      }).catch(function (e) {
        _this3.handleError(e);

        return e;
      });
    };

    _proto.handleChange = function handleChange(value) {
      var _this4 = this;

      var _this$props8 = this.props,
          formDatum = _this$props8.formDatum,
          name = _this$props8.name,
          fieldSetValidate = _this$props8.fieldSetValidate,
          onChange = _this$props8.onChange,
          filterSameChange = _this$props8.filterSameChange;
      var currentValue = this.getValue();

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if ((args.length === 0 || filterSameChange) && (0, _shallowEqual.default)(value, currentValue)) {
        return;
      }

      var beforeChange = beforeValueChange(this.props.beforeChange);

      if (formDatum && name) {
        value = beforeChange(value, formDatum);
        formDatum.set(name, value);
        formDatum.removeFormError(this.errorName);
      } else {
        value = beforeChange(value, null);
        this.setState({
          value: value
        }, function () {
          _this4.validate(value).catch(function () {});
        });
      }

      if (onChange) onChange.apply(void 0, [value].concat(args));
      if (fieldSetValidate) fieldSetValidate(true);
    };

    _proto.handleUpdate = function handleUpdate(value, sn, type) {
      var _this5 = this;

      if (type === _types.ERROR_TYPE) {
        if (!(0, _errors.isSameError)(value, this.state.error)) this.setState({
          error: value
        });
        return;
      }

      var _this$props9 = this.props,
          name = _this$props9.name,
          onChange = _this$props9.onChange,
          forceChangeOnValueSet = _this$props9.forceChangeOnValueSet;
      var newValue = !Array.isArray(name) ? value : (0, _immer.default)(this.getValue(), function (draft) {
        name.forEach(function (n, i) {
          if (n === sn) draft[i] = value;
        });
      });
      if (!this.errorChange && (0, _shallowEqual.default)(newValue, this.lastValue)) return;
      this.lastValue = newValue;

      if (type === _types.FORCE_PASS) {
        this.handleError();
        this.setState({
          error: undefined
        });
        this.forceUpdate();
        return;
      }

      if (onChange && forceChangeOnValueSet) onChange(newValue);

      if (type !== _types.IGNORE_VALIDATE) {
        if (this.updateTimer) clearTimeout(this.updateTimer);
        this.updateTimer = setTimeout(function () {
          _this5.validate(newValue, undefined, type).catch(function () {});
        });
      }

      this.forceUpdate();
    };

    _proto.render = function render() {
      var _this$props10 = this.props,
          formDatum = _this$props10.formDatum,
          value = _this$props10.value,
          required = _this$props10.required,
          loopContext = _this$props10.loopContext,
          bind = _this$props10.bind,
          onItemError = _this$props10.onItemError,
          bindInputToItem = _this$props10.bindInputToItem,
          unbindInputFromItem = _this$props10.unbindInputFromItem,
          scuSkip = _this$props10.scuSkip,
          defaultValue = _this$props10.defaultValue,
          reserveAble = _this$props10.reserveAble,
          other = (0, _objectWithoutPropertiesLoose2.default)(_this$props10, ["formDatum", "value", "required", "loopContext", "bind", "onItemError", "bindInputToItem", "unbindInputFromItem", "scuSkip", "defaultValue", "reserveAble"]);
      return _react.default.createElement(Origin, (0, _extends2.default)({}, other, {
        formDatum: formDatum,
        error: this.getError(),
        value: this.getValue(),
        onChange: this.handleChange,
        onDatumBind: this.handleDatumBind,
        validateHook: this.validateHook
      }));
    };

    (0, _createClass2.default)(_class, [{
      key: "errorName",
      get: function get() {
        var name = this.props.name;
        return Array.isArray(name) ? name.join('|') : name;
      }
    }]);
    return _class;
  }(_component.Component), (0, _defineProperty2.default)(_class, "propTypes", {
    beforeChange: _propTypes.default.func,
    bind: _propTypes.default.array,
    bindInputToItem: _propTypes.default.func,
    combineRules: _propTypes.default.func,
    defaultValue: _propTypes.default.any,
    fieldSetValidate: _propTypes.default.func,
    forceChangeOnValueSet: _propTypes.default.bool,
    formDatum: _propTypes.default.object,
    innerFormNamePath: _propTypes.default.string,
    loopContext: _propTypes.default.object,
    name: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
    onChange: _propTypes.default.func,
    onError: _propTypes.default.func,
    onItemError: _propTypes.default.func,
    popover: _propTypes.default.string,
    required: _propTypes.default.bool,
    rules: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.string]),
    type: _propTypes.default.string,
    unbindInputFromItem: _propTypes.default.func,
    value: _propTypes.default.any,
    scuSkip: _propTypes.default.array,
    error: _propTypes.default.object,
    readOnly: _propTypes.default.bool,
    disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
    filterSameChange: _propTypes.default.bool,
    reserveAble: _propTypes.default.bool
  }), (0, _defineProperty2.default)(_class, "defaultProps", {
    rules: [],
    scuSkip: ['onChange', 'rules']
  }), _temp));
});

exports.default = _default;