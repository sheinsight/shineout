import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import createReactContext from '../context';
import { curry } from '../utils/func';
import { deepGet } from '../utils/objects';
import { isObject, isArray } from '../utils/is';
import convert from '../Rule/convert';
import { RULE_TYPE } from '../Rule';
var context = createReactContext();

var isRule = function isRule(rules) {
  if (!isObject(rules)) return false;
  return rules.$$type === RULE_TYPE;
}; // eslint-disable-next-line


export var Provider = context.Provider; // eslint-disable-next-line

export var Consumer = context.Consumer;
export var formProvider = function formProvider(Origin) {
  var FormProvider =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(FormProvider, _PureComponent);

    function FormProvider(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.combineRules = _this.combineRules.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.groupValidate = _this.groupValidate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      return convert(rule, str);
    };

    _proto.combineRules = function combineRules(name, propRules) {
      var rules = this.props.rules;
      var newRules = [];

      if (isObject(rules) && name) {
        newRules = deepGet(rules, name) || [];
      } else if (isArray(rules)) {
        newRules = rules;
      }

      if (typeof propRules === 'string') {
        newRules = newRules.concat(this.getRulesFromString(propRules));
      } else if (isArray(propRules)) {
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
      return React.createElement(Provider, {
        value: value
      }, React.createElement(Origin, this.props));
    };

    return FormProvider;
  }(PureComponent);

  FormProvider.propTypes = {
    datum: PropTypes.object,
    disabled: PropTypes.bool,
    labelAlign: PropTypes.string,
    labelVerticalAlign: PropTypes.string,
    labelWidth: PropTypes.any,
    mode: PropTypes.string,
    pending: PropTypes.bool,
    rule: PropTypes.object,
    rules: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    size: PropTypes.string,
    keepErrorHeight: PropTypes.bool
  };
  return FormProvider;
};
export var formConsumer = curry(function (keys, Origin, props) {
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

  return React.createElement(Consumer, null, function (value) {
    var formProps = filterProps(value);
    return React.createElement(Origin, _extends({}, formProps, props, {
      disabled: formProps.disabled || props.disabled
    }));
  });
});