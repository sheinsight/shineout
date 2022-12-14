import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { datepickerClass } from './styles';
import utils from './utils';
import paramUtils from './paramUtils';
import Icon from './Icon';
import { getLocale } from '../locale';
import { PureComponent } from '../component';
import Time from './Time';
var minStr = 'yyyy-MM-dd 00:00:00';
var maxStr = 'yyyy-MM-dd 23:59:59';

var Day =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Day, _PureComponent);

  function Day(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      hover: null
    };
    _this.handleNextMonth = _this.handleMonth.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
    _this.handlePrevMonth = _this.handleMonth.bind(_assertThisInitialized(_assertThisInitialized(_this)), -1);
    _this.handleNextYear = _this.handleMonth.bind(_assertThisInitialized(_assertThisInitialized(_this)), 12);
    _this.handlePrevYear = _this.handleMonth.bind(_assertThisInitialized(_assertThisInitialized(_this)), -12);
    _this.handleMonthMode = _this.handleModeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'month');
    _this.handleYearMode = _this.handleModeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'year');
    _this.handleWeekLeave = _this.handleWeek.bind(_assertThisInitialized(_assertThisInitialized(_this)), null);
    _this.handleTimeChange = _this.handleTimeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDisabled = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.formatWithDefaultTime = _this.formatWithDefaultTime.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.disabledRegister(_this.handleDisabled, 'day', props.index);
    return _this;
  }

  var _proto = Day.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.getDays = function getDays() {
    var current = this.props.current;
    if (!current) return this.cachedDays;
    var date = utils.clearHMS(current, this.getOptions());

    if (this.cachedDate && utils.isSameMonth(this.cachedDate, date, this.getOptions()) && this.cachedDays) {
      return this.cachedDays;
    }

    this.cachedDays = utils.getDaysOfMonth(date, this.getOptions());
    this.cachedDate = date;
    return this.cachedDays;
  };

  _proto.formatWithDefaultTime = function formatWithDefaultTime(i) {
    var idx = 0;
    var _this$props = this.props,
        current = _this$props.current,
        defaultTime = _this$props.defaultTime,
        index = _this$props.index;
    if (typeof index === 'number') idx = index;
    if (typeof i === 'number') idx = i;
    if (!defaultTime[idx]) return current;
    return utils.cloneTime(current, defaultTime[idx], utils.TIME_FORMAT, this.getOptions());
  };

  _proto.handleDayDoubleClick = function handleDayDoubleClick(date) {
    var _this$props2 = this.props,
        type = _this$props2.type,
        defaultTime = _this$props2.defaultTime,
        index = _this$props2.index; // range & datetime & deafultTime

    if (type !== 'datetime' || !defaultTime.length || index === undefined) return;
    this.handleDayClick(date, 0);
    this.handleDayClick(date, 1);
  };

  _proto.handleDayClick = function handleDayClick(date, sync) {
    var _this$props3 = this.props,
        type = _this$props3.type,
        allowSingle = _this$props3.allowSingle,
        rangeDate = _this$props3.rangeDate,
        min = _this$props3.min,
        max = _this$props3.max,
        index = _this$props3.index,
        value = _this$props3.value;
    var current = index === sync && value || this.formatWithDefaultTime(sync);
    var onChange = typeof sync === 'number' ? this.props.onChangeSync.bind(this.props, sync) : this.props.onChange;

    if (type === 'week') {
      onChange.apply(void 0, paramUtils.weekHandleChangeParams(date, true, true));
    } else {
      var newDate = utils.setTime(utils.toDate(date), current); // only can select day with the same day of min/max

      if (min && utils.compareAsc(newDate, min) < 0) utils.setTime(newDate, min);
      if (max && utils.compareAsc(newDate, max) > 0) utils.setTime(newDate, max);
      if (allowSingle && rangeDate[index] && utils.clearHMS(newDate, this.getOptions()).getTime() === utils.clearHMS(rangeDate[index], this.getOptions()).getTime()) newDate = '';
      onChange.apply(void 0, paramUtils.dayHandleChangeParams(newDate, true, type !== 'datetime'));
    }
  };

  _proto.handleTimeChange = function handleTimeChange(time, change, end, mode) {
    var _this$props4;

    (_this$props4 = this.props).onChange.apply(_this$props4, paramUtils.timeHandleChangeParams(time, true, false, mode));
  };

  _proto.handleWeek = function handleWeek(hover) {
    this.setState({
      hover: hover
    });
  };

  _proto.handleMonth = function handleMonth(month) {
    var _this$props5 = this.props,
        current = _this$props5.current,
        onChange = _this$props5.onChange; // warning: month === 12 || month === -12, this is statement is year mode.

    if (month === -12 || month === 12) {
      onChange.apply(void 0, paramUtils.yearHandleChangeParams(utils.addMonths(current, month, this.getOptions())));
      return;
    }

    onChange.apply(void 0, paramUtils.monthHandleChangeParams(utils.addMonths(current, month, this.getOptions())));
  };

  _proto.handleModeChange = function handleModeChange(mode) {
    this.props.onModeChange(mode);
  };

  _proto.handleDayHover = function handleDayHover(date) {
    this.props.onDayHover(date);
  };

  _proto.handleDisabled = function handleDisabled(date, minDate, maxDate) {
    var _this$props6 = this.props,
        index = _this$props6.index,
        disabled = _this$props6.disabled,
        range = _this$props6.range,
        rangeTemp = _this$props6.rangeTemp,
        min = _this$props6.min,
        max = _this$props6.max;
    var minD = minDate || min && utils.toDate(utils.format(min, minStr, this.getOptions()), this.getOptions());
    var maxD = maxDate || max && utils.toDate(utils.format(max, maxStr, this.getOptions()), this.getOptions());
    var isDisabled = disabled ? disabled(date) : false; // only for single, single picker don't has index

    if (index === undefined && !isDisabled) {
      if (minD && utils.compareAsc(date, minD) < 0 || maxD && utils.compareAsc(date, maxD) > 0) isDisabled = true;
    }

    if (!isDisabled && index === 1) {
      if (typeof range === 'number' && utils.compareAsc(date, utils.addSeconds(rangeTemp, range, this.getOptions())) > 0 || utils.compareAsc(date, utils.clearHMS(rangeTemp, this.getOptions())) < 0 || utils.compareAsc(date, utils.clearHMS(min, this.getOptions())) < 0 || utils.compareAsc(date, max) > 0) {
        isDisabled = true;
      } // if (utils.compareAsc(date, min) < 0) isDisabled = true

    }

    if (!isDisabled && index === 0) {
      if (utils.compareAsc(date, utils.clearHMS(min, this.getOptions())) < 0 || utils.compareAsc(date, max) > 0) {
        isDisabled = true;
      }
    }

    return isDisabled;
  };

  _proto.renderDay = function renderDay(date, minD, maxD) {
    var _this$props7 = this.props,
        current = _this$props7.current,
        value = _this$props7.value,
        index = _this$props7.index,
        type = _this$props7.type,
        rangeDate = _this$props7.rangeDate;
    var hover = this.state.hover;
    var isDisabled = this.handleDisabled(date, minD, maxD);
    var classList = [utils.isSameDay(date, this.today, this.getOptions()) && 'today', utils.compareMonth(current, date, 0, this.getOptions()) !== 0 && 'other-month', isDisabled && 'disabled'];
    var hoverClass;
    var hoverProps = {};
    var weekStart = getLocale('startOfWeek');
    var weekEnd = weekStart ? 0 : 6;
    var day = utils.getDateInfo(date, 'day', this.getOptions());

    if (type === 'week') {
      hoverProps.onMouseEnter = this.handleWeek.bind(this, date);
      hoverProps.onMouseLeave = this.handleWeekLeave;

      if (utils.isSameWeek(date, value, this.getOptions())) {
        hoverClass = datepickerClass('active', day === weekStart && 'hover-start', day === weekEnd && 'hover-end');
      } else if (hover && utils.isSameWeek(date, hover, this.getOptions())) {
        hoverClass = datepickerClass('hover', day === weekStart && 'hover-start', day === weekEnd && 'hover-end');
      }
    } else if (rangeDate && utils.compareMonth(current, date, 0, this.getOptions()) === 0) {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date);
      classList.push(utils.isSameDay(date, rangeDate[index], this.getOptions()) && 'active');
      hoverClass = datepickerClass(utils.compareDay(rangeDate[0], date, 0, this.getOptions()) <= 0 && utils.compareDay(rangeDate[1], date, 0, this.getOptions()) >= 0 && 'hover', // Datetime Picker range end datetime classname #330
      utils.isSameDay(rangeDate[index], date, this.getOptions()) && "hover-" + (index === 0 ? 'start' : 'end') + " active");
    } else if (value) {
      classList.push(utils.isSameDay(date, value, this.getOptions()) && 'active');
    }

    return React.createElement("div", _extends({
      key: date.getTime(),
      className: hoverClass,
      onClick: isDisabled ? undefined : this.handleDayClick.bind(this, date, undefined),
      onDoubleClick: isDisabled ? undefined : this.handleDayDoubleClick.bind(this, date, undefined)
    }, hoverProps), React.createElement("span", {
      className: datepickerClass.apply(void 0, classList)
    }, utils.getDateInfo(date, 'date', this.getOptions())));
  };

  _proto.renderTimepicker = function renderTimepicker() {
    var _this$props8 = this.props,
        rangeDate = _this$props8.rangeDate,
        index = _this$props8.index,
        showTimePicker = _this$props8.showTimePicker;
    if (this.props.type !== 'datetime') return undefined;
    if (!showTimePicker) return undefined;
    var format = this.props.format;

    if (/^[T|t]$/.test(format)) {
      format = 'HH:mm:ss';
    } else {
      var match = format.match(/[H|h].*/); // eslint-disable-next-line

      if (match) format = match[0];
    }

    var value = rangeDate ? utils.toDateWithFormat(rangeDate[index], format, undefined, this.getOptions()) : this.props.value;
    if (!value) return undefined;
    return React.createElement("div", {
      className: datepickerClass('datetime')
    }, React.createElement(Icon, {
      name: "Clock",
      className: "clock"
    }), React.createElement(Time, _extends({}, this.props, {
      format: format,
      value: value,
      onChange: this.handleTimeChange
    })), React.createElement("span", null, utils.format(value, format, this.getOptions())));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props9 = this.props,
        current = _this$props9.current,
        min = _this$props9.min,
        index = _this$props9.index,
        max = _this$props9.max;
    var days = this.getDays();
    this.today = utils.newDate(undefined, this.getOptions());
    var minDate = min && utils.toDate(utils.format(min, minStr, this.getOptions()), this.getOptions());
    var maxDate = max && utils.toDate(utils.format(max, maxStr, this.getOptions()), this.getOptions());
    return React.createElement("div", {
      className: datepickerClass('day-picker')
    }, React.createElement("div", {
      className: datepickerClass('title')
    }, getLocale('pickerTitle')[index]), React.createElement("div", {
      className: datepickerClass('header')
    }, React.createElement(Icon, {
      name: "AngleDoubleLeft",
      className: "left",
      disabled: !!(min && utils.compareYear(current, min, -1, this.getOptions()) === -1),
      onClick: this.handlePrevYear
    }), React.createElement(Icon, {
      name: "AngleLeft",
      className: "left",
      disabled: !!(min && utils.compareMonth(current, min, 0, this.getOptions()) <= 0),
      onClick: this.handlePrevMonth
    }), React.createElement("span", {
      className: datepickerClass('ym')
    }, React.createElement("span", {
      onClick: this.handleYearMode
    }, utils.getDateInfo(current, 'year', this.getOptions())), React.createElement("span", {
      onClick: this.handleMonthMode
    }, getLocale('monthValues.short')[utils.getDateInfo(current, 'month', this.getOptions())])), React.createElement(Icon, {
      name: "AngleRight",
      className: "right",
      onClick: this.handleNextMonth
    }), React.createElement(Icon, {
      onClick: this.handleNextYear,
      name: "AngleDoubleRight",
      className: "right"
    })), React.createElement("div", {
      className: datepickerClass('week')
    }, getLocale('weekdayValues.narrow').map(function (w) {
      return React.createElement("span", {
        key: w
      }, w);
    })), React.createElement("div", {
      className: datepickerClass('list')
    }, days.map(function (d) {
      return _this2.renderDay(d, minDate, maxDate);
    })), React.createElement("div", {
      style: {
        flex: 1
      }
    }), this.renderTimepicker());
  };

  return Day;
}(PureComponent);

Day.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  format: PropTypes.string,
  index: PropTypes.number,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onChangeSync: PropTypes.func,
  onDayHover: PropTypes.func,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  rangeDate: PropTypes.array,
  rangeTemp: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  showTimePicker: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
  defaultTime: PropTypes.array,
  allowSingle: PropTypes.bool,
  timeZone: PropTypes.string,
  disabledRegister: PropTypes.func
};
export default Day;