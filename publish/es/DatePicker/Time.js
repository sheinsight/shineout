import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { datepickerClass } from './styles';
import TimeScroll from './TimeScroll';
import utils from './utils';
import { isRTL } from '../config';
import paramUtils from './paramUtils';
import { getLocale } from '../locale';

var Time =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Time, _PureComponent);

  function Time(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.defaultValue = _this.getDefaultTime();
    _this.handleHourChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'hour');
    _this.handleMinuteChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'minute');
    _this.handleSecondChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'second');
    _this.handleAMPMChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'ampm');
    _this.handleDisabled = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.disabledRegister(_this.handleDisabled, 'time', props.index);
    return _this;
  }

  var _proto = Time.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.getDefaultTime = function getDefaultTime() {
    var idx = 0;
    var current = utils.newDate();
    var _this$props = this.props,
        index = _this$props.index,
        defaultTime = _this$props.defaultTime,
        format = _this$props.format;
    if (typeof index === 'number') idx = index;
    if (!defaultTime[idx]) return current;
    return utils.cloneTime(current, defaultTime[idx], format, this.getOptions());
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

    var _paramUtils$judgeTime = paramUtils.judgeTimeByRange(val, value, mode, min, max, range, disabled, disabledTime, this.getOptions()),
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

    (_this$props3 = this.props).onChange.apply(_this$props3, paramUtils.timeHandleChangeParams(date, true, false, 'time'));
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
    var rtl = isRTL();
    var res = [format.indexOf('H') >= 0 && React.createElement(TimeScroll, {
      key: "HH",
      current: value,
      value: utils.getDateInfo(value, 'hour', this.getOptions()),
      mode: "H",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      total: 24,
      step: hourStep,
      onChange: this.handleHourChange,
      disabledTime: disabledTime
    }), format.indexOf('h') >= 0 && React.createElement(TimeScroll, {
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
    }), format.indexOf('m') >= 0 && React.createElement(TimeScroll, {
      key: "mm",
      current: value,
      mode: "m",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: utils.getDateInfo(value, 'minute', this.getOptions()),
      step: minuteStep,
      onChange: this.handleMinuteChange,
      disabledTime: disabledTime
    }), format.indexOf('s') >= 0 && React.createElement(TimeScroll, {
      key: "ss",
      current: value,
      mode: "s",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: utils.getDateInfo(value, 'second', this.getOptions()),
      step: secondStep,
      onChange: this.handleSecondChange,
      disabledTime: disabledTime
    }), /a|A/.test(format) && React.createElement(TimeScroll, {
      key: "ampm",
      current: value,
      mode: "ampm",
      range: range,
      min: min,
      max: max,
      disabled: disabled,
      value: utils.getDateInfo(value, 'hour', this.getOptions()) >= 12 ? 1 : 0,
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
    var className = datepickerClass('time-picker');
    var hours = value.getHours();

    if (format.indexOf('h') >= 0 && hours >= 12) {
      hours -= 12;
    } // reset


    var min = utils.resetTimeByFormat(mi, format, this.getOptions());
    var max = utils.resetTimeByFormat(ma, format, this.getOptions());
    return React.createElement("div", {
      className: className
    }, this.renderTimeScroller(value, min, max, hours));
  };

  return Time;
}(PureComponent);

Time.propTypes = {
  disabled: PropTypes.func,
  format: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  range: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  value: PropTypes.object,
  defaultTime: PropTypes.array,
  index: PropTypes.number,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  disabledTime: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  disabledRegister: PropTypes.func,
  timeZone: PropTypes.string
};
export default Time;