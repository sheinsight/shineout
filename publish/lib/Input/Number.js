"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = _interopRequireDefault(require("../icons"));

var _Input = _interopRequireDefault(require("./Input"));

var _styles = require("./styles");

var _config = require("../config");

var _numbers = require("../utils/numbers");

var _classname = require("../utils/classname");

var Number =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Number, _PureComponent);

  function Number(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleAddClick = _this.handleCalc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), props.step);
    _this.handleSubClick = _this.handleCalc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -props.step);
    _this.handleMouseUp = _this.handleMouseUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
    var calculateVal = (0, _numbers.sub)(value, mod);

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
    return [_react.default.createElement("a", {
      key: "up" // do not need the tab to focus
      ,
      tabIndex: -1,
      className: (0, _styles.inputClass)('number-up'),
      onMouseDown: this.handleAddClick,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseUp
    }, _icons.default.AngleRight), _react.default.createElement("a", {
      key: "down" // do not need the tab to focus
      ,
      tabIndex: -1,
      className: (0, _styles.inputClass)('number-down'),
      onMouseDown: this.handleSubClick,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseUp
    }, _icons.default.AngleRight)];
  };

  _proto.renderRTL = function renderRTL() {
    var _this$props4 = this.props,
        onChange = _this$props4.onChange,
        allowNull = _this$props4.allowNull,
        hideArrow = _this$props4.hideArrow,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props4, ["onChange", "allowNull", "hideArrow"]);
    return [].concat(this.renderArrowGroup(), [_react.default.createElement(_Input.default, (0, _extends2.default)({
      key: "input"
    }, other, {
      className: (0, _styles.inputClass)(!hideArrow && (0, _classname.getDirectionClass)('number'), 'rtl'),
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
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, ["onChange", "allowNull", "hideArrow"]);
    var rtl = (0, _config.isRTL)();

    if (rtl) {
      return this.renderRTL();
    }

    return [_react.default.createElement(_Input.default, (0, _extends2.default)({
      key: "input"
    }, other, {
      className: (0, _styles.inputClass)(!hideArrow && (0, _classname.getDirectionClass)('number')),
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur,
      type: "number"
    }))].concat(this.renderArrowGroup());
  };

  return Number;
}(_react.PureComponent);

Number.propTypes = {
  disabled: _propTypes.default.bool,
  min: _propTypes.default.number,
  max: _propTypes.default.number,
  onMouseDown: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onBlur: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  step: _propTypes.default.number,
  digits: _propTypes.default.number,
  integerLimit: _propTypes.default.number,
  numType: _propTypes.default.string,
  autoSelect: _propTypes.default.bool,
  allowNull: _propTypes.default.bool,
  hideArrow: _propTypes.default.bool,
  clearToUndefined: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
Number.defaultProps = {
  step: 1,
  allowNull: false,
  hideArrow: false
};
var _default = Number;
exports.default = _default;