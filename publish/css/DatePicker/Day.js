"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _utils = _interopRequireDefault(require("./utils"));

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _locale = require("../locale");

var _component = require("../component");

var _Time = _interopRequireDefault(require("./Time"));

var minStr = 'yyyy-MM-dd 00:00:00';
var maxStr = 'yyyy-MM-dd 23:59:59';

var Day =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Day, _PureComponent);

  function Day(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      hover: null
    };
    _this.handleNextMonth = _this.handleMonth.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
    _this.handlePrevMonth = _this.handleMonth.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -1);
    _this.handleNextYear = _this.handleMonth.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 12);
    _this.handlePrevYear = _this.handleMonth.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -12);
    _this.handleMonthMode = _this.handleModeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'month');
    _this.handleYearMode = _this.handleModeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'year');
    _this.handleWeekLeave = _this.handleWeek.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), null);
    _this.handleTimeChange = _this.handleTimeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDisabled = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.formatWithDefaultTime = _this.formatWithDefaultTime.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    props.disabledRegister(_this.handleDisabled, 'day', props.index);
    return _this;
  }

  var _proto = Day.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.getDays = function getDays() {
    var current = this.props.current;
    if (!current) return this.cachedDays;

    var date = _utils.default.clearHMS(current, this.getOptions());

    if (this.cachedDate && _utils.default.isSameMonth(this.cachedDate, date, this.getOptions()) && this.cachedDays) {
      return this.cachedDays;
    }

    this.cachedDays = _utils.default.getDaysOfMonth(date, this.getOptions());
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
    return _utils.default.cloneTime(current, defaultTime[idx], _utils.default.TIME_FORMAT, this.getOptions());
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
      onChange.apply(void 0, _paramUtils.default.weekHandleChangeParams(date, true, true));
    } else {
      var newDate = _utils.default.setTime(_utils.default.toDate(date), current); // only can select day with the same day of min/max


      if (min && _utils.default.compareAsc(newDate, min) < 0) _utils.default.setTime(newDate, min);
      if (max && _utils.default.compareAsc(newDate, max) > 0) _utils.default.setTime(newDate, max);
      if (allowSingle && rangeDate[index] && _utils.default.clearHMS(newDate, this.getOptions()).getTime() === _utils.default.clearHMS(rangeDate[index], this.getOptions()).getTime()) newDate = '';
      onChange.apply(void 0, _paramUtils.default.dayHandleChangeParams(newDate, true, type !== 'datetime'));
    }
  };

  _proto.handleTimeChange = function handleTimeChange(time, change, end, mode) {
    var _this$props4;

    (_this$props4 = this.props).onChange.apply(_this$props4, _paramUtils.default.timeHandleChangeParams(time, true, false, mode));
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
      onChange.apply(void 0, _paramUtils.default.yearHandleChangeParams(_utils.default.addMonths(current, month, this.getOptions())));
      return;
    }

    onChange.apply(void 0, _paramUtils.default.monthHandleChangeParams(_utils.default.addMonths(current, month, this.getOptions())));
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

    var minD = minDate || min && _utils.default.toDate(_utils.default.format(min, minStr, this.getOptions()), this.getOptions());

    var maxD = maxDate || max && _utils.default.toDate(_utils.default.format(max, maxStr, this.getOptions()), this.getOptions());

    var isDisabled = disabled ? disabled(date) : false; // only for single, single picker don't has index

    if (index === undefined && !isDisabled) {
      if (minD && _utils.default.compareAsc(date, minD) < 0 || maxD && _utils.default.compareAsc(date, maxD) > 0) isDisabled = true;
    }

    if (!isDisabled && index === 1) {
      if (typeof range === 'number' && _utils.default.compareAsc(date, _utils.default.addSeconds(rangeTemp, range, this.getOptions())) > 0 || _utils.default.compareAsc(date, _utils.default.clearHMS(rangeTemp, this.getOptions())) < 0 || _utils.default.compareAsc(date, _utils.default.clearHMS(min, this.getOptions())) < 0 || _utils.default.compareAsc(date, max) > 0) {
        isDisabled = true;
      } // if (utils.compareAsc(date, min) < 0) isDisabled = true

    }

    if (!isDisabled && index === 0) {
      if (_utils.default.compareAsc(date, _utils.default.clearHMS(min, this.getOptions())) < 0 || _utils.default.compareAsc(date, max) > 0) {
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
    var classList = [_utils.default.isSameDay(date, this.today, this.getOptions()) && 'today', _utils.default.compareMonth(current, date, 0, this.getOptions()) !== 0 && 'other-month', isDisabled && 'disabled'];
    var hoverClass;
    var hoverProps = {};
    var weekStart = (0, _locale.getLocale)('startOfWeek');
    var weekEnd = weekStart ? 0 : 6;

    var day = _utils.default.getDateInfo(date, 'day', this.getOptions());

    if (type === 'week') {
      hoverProps.onMouseEnter = this.handleWeek.bind(this, date);
      hoverProps.onMouseLeave = this.handleWeekLeave;

      if (_utils.default.isSameWeek(date, value, this.getOptions())) {
        hoverClass = (0, _styles.datepickerClass)('active', day === weekStart && 'hover-start', day === weekEnd && 'hover-end');
      } else if (hover && _utils.default.isSameWeek(date, hover, this.getOptions())) {
        hoverClass = (0, _styles.datepickerClass)('hover', day === weekStart && 'hover-start', day === weekEnd && 'hover-end');
      }
    } else if (rangeDate && _utils.default.compareMonth(current, date, 0, this.getOptions()) === 0) {
      hoverProps.onMouseEnter = this.handleDayHover.bind(this, date);
      classList.push(_utils.default.isSameDay(date, rangeDate[index], this.getOptions()) && 'active');
      hoverClass = (0, _styles.datepickerClass)(_utils.default.compareDay(rangeDate[0], date, 0, this.getOptions()) <= 0 && _utils.default.compareDay(rangeDate[1], date, 0, this.getOptions()) >= 0 && 'hover', // Datetime Picker range end datetime classname #330
      _utils.default.isSameDay(rangeDate[index], date, this.getOptions()) && "hover-" + (index === 0 ? 'start' : 'end') + " active");
    } else if (value) {
      classList.push(_utils.default.isSameDay(date, value, this.getOptions()) && 'active');
    }

    return _react.default.createElement("div", (0, _extends2.default)({
      key: date.getTime(),
      className: hoverClass,
      onClick: isDisabled ? undefined : this.handleDayClick.bind(this, date, undefined),
      onDoubleClick: isDisabled ? undefined : this.handleDayDoubleClick.bind(this, date, undefined)
    }, hoverProps), _react.default.createElement("span", {
      className: _styles.datepickerClass.apply(void 0, classList)
    }, _utils.default.getDateInfo(date, 'date', this.getOptions())));
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

    var value = rangeDate ? _utils.default.toDateWithFormat(rangeDate[index], format, undefined, this.getOptions()) : this.props.value;
    if (!value) return undefined;
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('datetime')
    }, _react.default.createElement(_Icon.default, {
      name: "Clock",
      className: "clock"
    }), _react.default.createElement(_Time.default, (0, _extends2.default)({}, this.props, {
      format: format,
      value: value,
      onChange: this.handleTimeChange
    })), _react.default.createElement("span", null, _utils.default.format(value, format, this.getOptions())));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props9 = this.props,
        current = _this$props9.current,
        min = _this$props9.min,
        index = _this$props9.index,
        max = _this$props9.max;
    var days = this.getDays();
    this.today = _utils.default.newDate(undefined, this.getOptions());

    var minDate = min && _utils.default.toDate(_utils.default.format(min, minStr, this.getOptions()), this.getOptions());

    var maxDate = max && _utils.default.toDate(_utils.default.format(max, maxStr, this.getOptions()), this.getOptions());

    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('day-picker')
    }, _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('title')
    }, (0, _locale.getLocale)('pickerTitle')[index]), _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('header')
    }, _react.default.createElement(_Icon.default, {
      name: "AngleDoubleLeft",
      className: "left",
      disabled: !!(min && _utils.default.compareYear(current, min, -1, this.getOptions()) === -1),
      onClick: this.handlePrevYear
    }), _react.default.createElement(_Icon.default, {
      name: "AngleLeft",
      className: "left",
      disabled: !!(min && _utils.default.compareMonth(current, min, 0, this.getOptions()) <= 0),
      onClick: this.handlePrevMonth
    }), _react.default.createElement("span", {
      className: (0, _styles.datepickerClass)('ym')
    }, _react.default.createElement("span", {
      onClick: this.handleYearMode
    }, _utils.default.getDateInfo(current, 'year', this.getOptions())), _react.default.createElement("span", {
      onClick: this.handleMonthMode
    }, (0, _locale.getLocale)('monthValues.short')[_utils.default.getDateInfo(current, 'month', this.getOptions())])), _react.default.createElement(_Icon.default, {
      name: "AngleRight",
      className: "right",
      onClick: this.handleNextMonth
    }), _react.default.createElement(_Icon.default, {
      onClick: this.handleNextYear,
      name: "AngleDoubleRight",
      className: "right"
    })), _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('week')
    }, (0, _locale.getLocale)('weekdayValues.narrow').map(function (w) {
      return _react.default.createElement("span", {
        key: w
      }, w);
    })), _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('list')
    }, days.map(function (d) {
      return _this2.renderDay(d, minDate, maxDate);
    })), _react.default.createElement("div", {
      style: {
        flex: 1
      }
    }), this.renderTimepicker());
  };

  return Day;
}(_component.PureComponent);

Day.propTypes = {
  current: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.func,
  format: _propTypes.default.string,
  index: _propTypes.default.number,
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  onChange: _propTypes.default.func.isRequired,
  onChangeSync: _propTypes.default.func,
  onDayHover: _propTypes.default.func,
  onModeChange: _propTypes.default.func.isRequired,
  range: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  rangeDate: _propTypes.default.array,
  rangeTemp: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  showTimePicker: _propTypes.default.bool,
  type: _propTypes.default.string.isRequired,
  value: _propTypes.default.object,
  defaultTime: _propTypes.default.array,
  allowSingle: _propTypes.default.bool,
  timeZone: _propTypes.default.string,
  disabledRegister: _propTypes.default.func
};
var _default = Day;
exports.default = _default;