import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import Input from './Input';
import { inputClass } from './styles';
import { isRTL } from '../config';
import { sub } from '../utils/numbers';
import { getDirectionClass } from '../utils/classname';

var Number =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Number, _PureComponent);

  function Number(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleAddClick = _this.handleCalc.bind(_assertThisInitialized(_assertThisInitialized(_this)), props.step);
    _this.handleSubClick = _this.handleCalc.bind(_assertThisInitialized(_assertThisInitialized(_this)), -props.step);
    _this.handleMouseUp = _this.handleMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Number.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.hold = false;
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut);
  };

  _proto.handleChange = function handleChange(value, check, isEmpty) {
    if (isEmpty || value === undefined) {
      this.props.onChange(value);
      return;
    }

    if (!check) {
      if (new RegExp('^-?\\d*\\.?\\d*$').test(value)) {
        this.props.onChange(value);
      }

      return;
    }

    var _this$props = this.props,
        digits = _this$props.digits,
        step = _this$props.step,
        numType = _this$props.numType,
        allowNull = _this$props.allowNull;

    if (numType === 'positive' && value <= 0) {
      value = allowNull ? null : undefined;
    } else if (typeof digits === 'number') {
      value = parseFloat(value.toFixed(digits));
    } else {
      var stepStr = step.toString();
      var dot = stepStr.lastIndexOf('.');
      if (dot >= 0) value = parseFloat(value.toFixed(stepStr.length - dot));
    }

    var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max;
    if (max !== undefined && value > max) value = max;
    if (min !== undefined && value < min) value = min;

    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  };

  _proto.handleBlur = function handleBlur(e) {
    this.hold = false;
    var value = parseFloat(e.target.value); // for the empty

    if (e.target.value === '' && this.props.allowNull) {
      value = null;
    } // eslint-disable-next-line no-restricted-globals


    if (isNaN(value)) value = 0;

    if (this.props.clearToUndefined && e.target.value === '' && this.props.value === undefined) {
      this.handleChange(undefined, true, true);
    } else {
      this.handleChange(value, true, value === null);
    }

    this.props.onBlur(e);
  };

  _proto.changeValue = function changeValue(mod) {
    if (this.props.disabled) return;
    var val = this.props.value;
    if (val === 0) val = '0';
    var value = parseFloat(("" + (val || '')).replace(/,/g, '')); // eslint-disable-next-line

    if (isNaN(value)) value = 0;
    var _this$props3 = this.props,
        numType = _this$props3.numType,
        integerLimit = _this$props3.integerLimit;
    var calculateVal = sub(value, mod);

    if (numType === 'positive' && calculateVal <= 0) {
      return;
    }

    if (numType === 'non-negative' && calculateVal < 0) {
      return;
    }

    if (integerLimit && String(parseInt(calculateVal, 10)).length > integerLimit) {
      return;
    }

    this.handleChange(calculateVal, true);
  };

  _proto.longPress = function longPress(mod) {
    var _this2 = this;

    if (!this.hold) return;
    setTimeout(function () {
      _this2.changeValue(mod);

      _this2.longPress(mod);
    }, 50);
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    var _this3 = this;

    var step = this.props.step;
    this.hold = true;
    if (e.keyCode !== 38 && e.keyCode !== 40) return;
    e.preventDefault();
    var mod = e.keyCode === 38 ? step : -step;
    this.changeValue(mod);
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut);
    this.keyPressTimeOut = setTimeout(function () {
      _this3.longPress(mod);
    }, 600);
  };

  _proto.handleCalc = function handleCalc(mod) {
    var _this4 = this;

    var onMouseDown = this.props.onMouseDown;
    if (onMouseDown) onMouseDown();
    this.hold = true;
    this.changeValue(mod);
    this.keyPressTimeOut = setTimeout(function () {
      _this4.longPress(mod);
    }, 1000);
  };

  _proto.handleKeyUp = function handleKeyUp() {
    this.hold = false;
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut);
  };

  _proto.handleMouseUp = function handleMouseUp() {
    var onMouseUp = this.props.onMouseUp;
    if (onMouseUp) onMouseUp();
    this.hold = false;
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut);
  };

  _proto.renderArrowGroup = function renderArrowGroup() {
    var hideArrow = this.props.hideArrow;
    if (hideArrow) return [];
    return [React.createElement("a", {
      key: "up" // do not need the tab to focus
      ,
      tabIndex: -1,
      className: inputClass('number-up'),
      onMouseDown: this.handleAddClick,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseUp
    }, icons.AngleRight), React.createElement("a", {
      key: "down" // do not need the tab to focus
      ,
      tabIndex: -1,
      className: inputClass('number-down'),
      onMouseDown: this.handleSubClick,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseUp
    }, icons.AngleRight)];
  };

  _proto.renderRTL = function renderRTL() {
    var _this$props4 = this.props,
        onChange = _this$props4.onChange,
        allowNull = _this$props4.allowNull,
        hideArrow = _this$props4.hideArrow,
        other = _objectWithoutPropertiesLoose(_this$props4, ["onChange", "allowNull", "hideArrow"]);

    return [].concat(this.renderArrowGroup(), [React.createElement(Input, _extends({
      key: "input"
    }, other, {
      className: inputClass(!hideArrow && getDirectionClass('number'), 'rtl'),
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur,
      type: "number"
    }))]);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        onChange = _this$props5.onChange,
        allowNull = _this$props5.allowNull,
        hideArrow = _this$props5.hideArrow,
        other = _objectWithoutPropertiesLoose(_this$props5, ["onChange", "allowNull", "hideArrow"]);

    var rtl = isRTL();

    if (rtl) {
      return this.renderRTL();
    }

    return [React.createElement(Input, _extends({
      key: "input"
    }, other, {
      className: inputClass(!hideArrow && getDirectionClass('number')),
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur,
      type: "number"
    }))].concat(this.renderArrowGroup());
  };

  return Number;
}(PureComponent);

Number.propTypes = {
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  digits: PropTypes.number,
  integerLimit: PropTypes.number,
  numType: PropTypes.string,
  autoSelect: PropTypes.bool,
  allowNull: PropTypes.bool,
  hideArrow: PropTypes.bool,
  clearToUndefined: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
Number.defaultProps = {
  step: 1,
  allowNull: false,
  hideArrow: false
};
export default Number;