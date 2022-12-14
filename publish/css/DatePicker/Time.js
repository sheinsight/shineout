"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _TimeScroll = _interopRequireDefault(require("./TimeScroll"));

var _utils = _interopRequireDefault(require("./utils"));

var _config = require("../config");

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var _locale = require("../locale");

var Time =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Time, _PureComponent);

  function Time(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.defaultValue = _this.getDefaultTime();
    _this.handleHourChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'hour');
    _this.handleMinuteChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'minute');
    _this.handleSecondChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'second');
    _this.handleAMPMChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'ampm');
    _this.handleDisabled = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    props.disabledRegister(_this.handleDisabled, 'time', props.index);
    return _this;
  }

  var _proto = Time.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.getDefaultTime = function getDefaultTime() {
    var idx = 0;

    var current = _utils.default.newDate();

    var _this$props = this.props,
        index = _this$props.index,
        defaultTime = _this$props.defaultTime,
        format = _this$props.format;
    if (typeof index === 'number') idx = index;
    if (!defaultTime[idx]) return current;
    return _utils.default.cloneTime(current, defaultTime[idx], format, this.getOptions());
  };

  _proto.getValue = function getValue() {
    return this.props.value || this.defaultValue;
  };

  _proto.handleDisabled = function handleDisabled(value, val, mode, onlyVaild) {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        min = _this$props2.min,
        max = _this$props2.max,
        range = _this$props2.range,
        disabledTime = _this$props2.disabledTime;

    var _paramUtils$judgeTime = _paramUtils.default.judgeTimeByRange(val, value, mode, min, max, range, disabled, disabledTime, this.getOptions()),
        isDisabled = _paramUtils$judgeTime[0],
        date = _paramUtils$judgeTime[1];

    return onlyVaild ? isDisabled : [isDisabled, date];
  };

  _proto.handleChange = function handleChange(type, val) {
    var _this$props3;

    var format = this.props.format;
    var value = this.getValue();
    var mode = type;

    if (type === 'hour') {
      if (format.indexOf('h') >= 0) {
        mode = 'h';
      } else {
        mode = 'H';
      }
    }

    var _this$handleDisabled = this.handleDisabled(value, val, mode),
        isDisabled = _this$handleDisabled[0],
        date = _this$handleDisabled[1];

    if (isDisabled) return;

    (_this$props3 = this.props).onChange.apply(_this$props3, _paramUtils.default.timeHandleChangeParams(date, true, false, 'time'));
  };

  _proto.renderTimeScroller = function renderTimeScroller(value, min, max, hours) {
    var _this$props4 = this.props,
        format = _this$props4.format,
        hourStep = _this$props4.hourStep,
        minuteStep = _this$props4.minuteStep,
        secondStep = _this$props4.secondStep,
        range = _this$props4.range,
        disabled = _this$props4.disabled,
        disabledTime = _this$props4.disabledTime;
    var rtl = (0, _config.isRTL)();
    var res = [format.indexOf('H') >= 0 && _react.default.createElement(_TimeScroll.default, {
      key: "HH",
      current: value,
      value: _utils.default.getDateInfo(value, 'hour', this.getOptions()),
      mode: "H",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      total: 24,
      step: hourStep,
      onChange: this.handleHourChange,
      disabledTime: disabledTime
    }), format.indexOf('h') >= 0 && _react.default.createElement(_TimeScroll.default, {
      key: "hh",
      current: value,
      mode: "h",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: hours,
      total: 12,
      step: hourStep,
      onChange: this.handleHourChange,
      disabledTime: disabledTime
    }), format.indexOf('m') >= 0 && _react.default.createElement(_TimeScroll.default, {
      key: "mm",
      current: value,
      mode: "m",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: _utils.default.getDateInfo(value, 'minute', this.getOptions()),
      step: minuteStep,
      onChange: this.handleMinuteChange,
      disabledTime: disabledTime
    }), format.indexOf('s') >= 0 && _react.default.createElement(_TimeScroll.default, {
      key: "ss",
      current: value,
      mode: "s",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: _utils.default.getDateInfo(value, 'second', this.getOptions()),
      step: secondStep,
      onChange: this.handleSecondChange,
      disabledTime: disabledTime
    }), /a|A/.test(format) && _react.default.createElement(_TimeScroll.default, {
      key: "ampm",
      current: value,
      mode: "ampm",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: _utils.default.getDateInfo(value, 'hour', this.getOptions()) >= 12 ? 1 : 0,
      total: 2,
      ampm: true,
      onChange: this.handleAMPMChange,
      disabledTime: disabledTime
    })];

    if (rtl) {
      res = res.reverse();
    }

    return res;
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        format = _this$props5.format,
        mi = _this$props5.min,
        ma = _this$props5.max;
    var value = this.getValue();
    var className = (0, _styles.datepickerClass)('time-picker');
    var hours = value.getHours();

    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12;
    } // reset


    var min = _utils.default.resetTimeByFormat(mi, format, this.getOptions());

    var max = _utils.default.resetTimeByFormat(ma, format, this.getOptions());

    return _react.default.createElement("div", {
      className: className
    }, this.renderTimeScroller(value, min, max, hours));
  };

  return Time;
}(_react.PureComponent);

Time.propTypes = {
  disabled: _propTypes.default.func,
  format: _propTypes.default.string.isRequired,
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  onChange: _propTypes.default.func.isRequired,
  range: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  value: _propTypes.default.object,
  defaultTime: _propTypes.default.array,
  index: _propTypes.default.number,
  hourStep: _propTypes.default.number,
  minuteStep: _propTypes.default.number,
  secondStep: _propTypes.default.number,
  disabledTime: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  disabledRegister: _propTypes.default.func,
  timeZone: _propTypes.default.string
};
var _default = Time;
exports.default = _default;