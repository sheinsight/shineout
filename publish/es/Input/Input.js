import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { inputTitleClass } from '../InputTitle/styles';
import cleanProps from '../utils/cleanProps';
import Clear from './clear';
import { inputClass } from './styles';
import InputTitle from '../InputTitle';

function regLength(size) {
  return /\d+/.test(size) && size > 0 ? "{0," + size + "}" : '*';
}

function fillNumber(val) {
  return val.replace(/^(-)?(\.\d+)(?!=\.).*/g, '$10$2') // eslint-disable-next-line no-useless-escape
  .replace(/(-|^)0+(?=0\.?|[^0\.])/g, '$1').replace(/\.$/, '');
}

var Input =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Input, _PureComponent);

  function Input(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "defaultInfo", function (value) {
      if (!value || value.length === 0) return null;
      var info = _this.props.info;
      var text = value.length + " / " + info;
      if (value.length <= info) return text;
      return new Error(text);
    });

    _this.enterLock = false;
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAutoSelect = _this.handleAutoSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Input.prototype;

  _proto.bindRef = function bindRef(el) {
    var forwardedRef = this.props.forwardedRef;
    this.ref = el;
    if (forwardedRef) forwardedRef(el);
  };

  _proto.isValidNumber = function isValidNumber(val) {
    var numType = this.props.numType;
    var noNeg = numType === 'non-negative' || numType === 'positive';
    var regExp = new RegExp("^(" + (noNeg ? '' : '-') + ")?\\d*\\.?\\d*$", 'g');
    return regExp.test(val);
  };

  _proto.formatValue = function formatValue(val) {
    var value = val;
    var _this$props = this.props,
        type = _this$props.type,
        digits = _this$props.digits,
        integerLimit = _this$props.integerLimit,
        numType = _this$props.numType;
    var noNeg = numType === 'non-negative' || numType === 'positive';
    if (type !== 'number') return value;
    var regExp = new RegExp("^(" + (noNeg ? '' : '-') + ")?(\\d" + regLength(integerLimit) + ")(" + (digits !== 0 ? "\\.\\d" + regLength(digits) : '') + ")?.*$", 'g');
    value = value.replace(regExp, '$1$2$3');
    return value;
  };

  _proto.fixValue = function fixValue(val) {
    var _this$props2 = this.props,
        type = _this$props2.type,
        digits = _this$props2.digits,
        autoFix = _this$props2.autoFix,
        numType = _this$props2.numType;
    if (type !== 'number' || val === '') return val;
    if (/^[.-]+$/.test(val)) return '';
    var fixVal = fillNumber(val);
    if (numType === 'positive' && fixVal <= 0) return '';

    if (digits !== undefined && autoFix) {
      if (digits > 0) {
        fixVal = parseFloat(fixVal).toFixed(digits);
      } else {
        fixVal = parseInt(fixVal, 10).toString();
      }
    }

    return fixVal;
  };

  _proto.invalidNumber = function invalidNumber(value) {
    var _this$props3 = this.props,
        digits = _this$props3.digits,
        type = _this$props3.type,
        integerLimit = _this$props3.integerLimit;
    if (type !== 'number') return false;
    var reg = '^-?';

    if (!integerLimit) {
      reg += "\\d*";
    } else if (integerLimit > 0) {
      reg += "\\d{0," + integerLimit + "}";
    }

    if (digits === undefined) {
      reg += '\\.?\\d*';
    } else if (digits >= 0) {
      reg += "\\.?\\d{0," + digits + "}";
    }

    reg += '$';
    reg = new RegExp(reg);
    return !reg.test(value);
  };

  _proto.handleChange = function handleChange(e, clearClick) {
    var _this$props4 = this.props,
        type = _this$props4.type,
        clearable = _this$props4.clearable,
        coin = _this$props4.coin;

    if (clearClick) {
      this.ref.focus();
      if (typeof clearable === 'function') clearable();
    }

    var value = e.target.value;

    if (clearClick && this.props.clearToUndefined) {
      this.props.onChange(value);
      return;
    }

    if (type === 'number') {
      if (typeof value !== 'number') {
        value = String(value).replace(/。/g, '.');

        if (coin) {
          value = value.replaceAll(',', '');
        }
      }

      if (!this.isValidNumber(value)) {
        return;
      }

      value = this.formatValue(value);
    }

    this.props.onChange(value);
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    var onKeyDown = this.props.onKeyDown;
    if (e.keyCode === 13) this.enterPress = true;
    if (onKeyDown) onKeyDown(e);
  };

  _proto.handleKeyUp = function handleKeyUp(e) {
    var _this$props5 = this.props,
        onKeyUp = _this$props5.onKeyUp,
        onEnterPress = _this$props5.onEnterPress;

    if (this.enterPress && e.keyCode === 13 && onEnterPress) {
      onEnterPress(e.target.value, e);
      this.enterPress = false;
    }

    if (onKeyUp) onKeyUp(e);
  };

  _proto.handleBlur = function handleBlur(e) {
    var value = e.target.value;
    var _this$props6 = this.props,
        forceChange = _this$props6.forceChange,
        onBlur = _this$props6.onBlur,
        clearToUndefined = _this$props6.clearToUndefined,
        cancelChange = _this$props6.cancelChange;
    if (cancelChange) cancelChange();
    var newVal = this.fixValue(value);
    var isChange = !(clearToUndefined && newVal === '' && this.props.value === undefined);
    if (isChange && forceChange && !this.invalidNumber(newVal)) forceChange(newVal);
    if (onBlur) onBlur(e);
  };

  _proto.handleAutoSelect = function handleAutoSelect(event) {
    var onFocus = this.props.onFocus;
    var autoSelect = this.props.autoSelect;

    if (autoSelect) {
      event.currentTarget.select();
    }

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };

  _proto.renderInfo = function renderInfo() {
    var info = this.props.info;
    var notNumber = typeof info !== 'number';
    if (typeof info !== 'function' && notNumber) return null;
    var textInfo = notNumber ? info : this.defaultInfo;
    var res = textInfo(this.props.value); // empty

    if (!res) return null;
    var isError = res instanceof Error;
    var text = isError ? res.message : res;
    return React.createElement("div", {
      key: "info",
      style: {
        minWidth: 'auto'
      },
      className: inputClass('bottom-right', isError ? 'error' : 'tip')
    }, text);
  };

  _proto.render = function render() {
    var _this$props7 = this.props,
        type = _this$props7.type,
        defaultValue = _this$props7.defaultValue,
        digits = _this$props7.digits,
        className = _this$props7.className,
        clearable = _this$props7.clearable,
        htmlName = _this$props7.htmlName,
        forceChange = _this$props7.forceChange,
        onEnterPress = _this$props7.onEnterPress,
        forwardedRef = _this$props7.forwardedRef,
        innerTitle = _this$props7.innerTitle,
        inputFocus = _this$props7.inputFocus,
        clearToUndefined = _this$props7.clearToUndefined,
        placeholder = _this$props7.placeholder,
        coin = _this$props7.coin,
        other = _objectWithoutPropertiesLoose(_this$props7, ["type", "defaultValue", "digits", "className", "clearable", "htmlName", "forceChange", "onEnterPress", "forwardedRef", "innerTitle", "inputFocus", "clearToUndefined", "placeholder", "coin"]);

    var value = this.props.value == null || this.props.value === undefined ? '' : this.props.value;
    var needClearUndefined = clearToUndefined && this.props.value !== undefined;
    var showClear = !other.disabled && clearable && (value !== '' || needClearUndefined);
    var mc = classnames(className, showClear && inputClass('clearable'), innerTitle && inputTitleClass('hidable', 'item'));
    var isNumber = className && className.indexOf(inputClass('number')) > -1;
    return [React.createElement(InputTitle, {
      className: isNumber ? inputClass('number-title-box') : undefined,
      key: "input",
      innerTitle: innerTitle,
      open: !!inputFocus || !!value
    }, React.createElement("input", _extends({}, cleanProps(other), {
      placeholder: needClearUndefined ? '' : placeholder,
      className: mc || undefined,
      name: other.name || htmlName,
      type: type === 'password' ? type : 'text',
      value: value,
      ref: this.bindRef,
      key: "input",
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur,
      onFocus: this.handleAutoSelect
    }))), showClear && React.createElement(Clear, {
      onClick: this.handleChange,
      key: "close",
      clearResult: needClearUndefined ? undefined : ''
    }), this.renderInfo()];
  };

  return Input;
}(PureComponent);

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  digits: PropTypes.number,
  integerLimit: PropTypes.number,
  numType: PropTypes.string,
  autoSelect: PropTypes.bool,
  autoFix: PropTypes.bool,
  forceChange: PropTypes.func,
  htmlName: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  cancelChange: PropTypes.func,
  onEnterPress: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFocus: PropTypes.func,
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  forwardedRef: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  innerTitle: PropTypes.node,
  inputFocus: PropTypes.bool,
  clearToUndefined: PropTypes.bool,
  placeholder: PropTypes.string,
  coin: PropTypes.bool
};
Input.defaultProps = {
  type: 'text'
};
export default Input;