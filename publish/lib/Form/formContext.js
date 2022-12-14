"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.formConsumer = exports.formProvider = exports.Consumer = exports.Provider = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _context = _interopRequireDefault(require("../context"));

var _func = require("../utils/func");

var _objects = require("../utils/objects");

var _is = require("../utils/is");

var _convert = _interopRequireDefault(require("../Rule/convert"));

var _Rule = require("../Rule");

var context = (0, _context.default)();

var isRule = function isRule(rules) {
  if (!(0, _is.isObject)(rules)) return false;
  return rules.$$type === _Rule.RULE_TYPE;
}; // eslint-disable-next-line


var Provider = context.Provider; // eslint-disable-next-line

exports.Provider = Provider;
var Consumer = context.Consumer;
exports.Consumer = Consumer;

var formProvider = function formProvider(Origin) {
  var FormProvider =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inheritsLoose2.default)(FormProvider, _PureComponent);

    function FormProvider(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.combineRules = _this.combineRules.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      _this.groupValidate = _this.groupValidate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      return _this;
    }

    var _proto = FormProvider.prototype;

    _proto.getRulesFromString = function getRulesFromString(str) {
      var rule = this.props.rule;

      if (!isRule(rule)) {
        console.error(new Error('Form rule is missed or is not a Rule instance.'));
        return [];
      }

      if (!str) return [];
      return (0, _convert.default)(rule, str);
    };

    _proto.combineRules = function combineRules(name, propRules) {
      var rules = this.props.rules;
      var newRules = [];

      if ((0, _is.isObject)(rules) && name) {
        newRules = (0, _objects.deepGet)(rules, name) || [];
      } else if ((0, _is.isArray)(rules)) {
        newRules = rules;
      }

      if (typeof propRules === 'string') {
        newRules = newRules.concat(this.getRulesFromString(propRules));
      } else if ((0, _is.isArray)(propRules)) {
        newRules = newRules.concat(propRules);
      }

      return newRules;
    };

    _proto.groupValidate = function groupValidate(name) {// not implement...
    };

    _proto.render = function render() {
      var _this$props = this.props,
          datum = _this$props.datum,
          labelAlign = _this$props.labelAlign,
          labelVerticalAlign = _this$props.labelVerticalAlign,
          labelWidth = _this$props.labelWidth,
          disabled = _this$props.disabled,
          pending = _this$props.pending,
          mode = _this$props.mode,
          size = _this$props.size,
          keepErrorHeight = _this$props.keepErrorHeight;
      var value = {
        formDatum: datum,
        formMode: mode,
        disabled: disabled || pending,
        labelAlign: labelAlign,
        labelVerticalAlign: labelVerticalAlign,
        labelWidth: labelWidth,
        size: size,
        combineRules: this.combineRules,
        groupValidate: this.groupValidate,
        keepErrorHeight: keepErrorHeight
      };
      return _react.default.createElement(Provider, {
        value: value
      }, _react.default.createElement(Origin, this.props));
    };

    return FormProvider;
  }(_react.PureComponent);

  FormProvider.propTypes = {
    datum: _propTypes.default.object,
    disabled: _propTypes.default.bool,
    labelAlign: _propTypes.default.string,
    labelVerticalAlign: _propTypes.default.string,
    labelWidth: _propTypes.default.any,
    mode: _propTypes.default.string,
    pending: _propTypes.default.bool,
    rule: _propTypes.default.object,
    rules: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
    size: _propTypes.default.string,
    keepErrorHeight: _propTypes.default.bool
  };
  return FormProvider;
};

exports.formProvider = formProvider;
var formConsumer = (0, _func.curry)(function (keys, Origin, props) {
  var filterProps = function filterProps(value) {
    var cps = {};
    if (!value) return cps;
    if (!keys) return value;
    keys.forEach(function (k) {
      var val = value[k];
      if (val !== undefined) cps[k] = val;
    });
    return cps;
  };

  return _react.default.createElement(Consumer, null, function (value) {
    var formProps = filterProps(value);
    return _react.default.createElement(Origin, (0, _extends2.default)({}, formProps, props, {
      disabled: formProps.disabled || props.disabled
    }));
  });
});
exports.formConsumer = formConsumer;