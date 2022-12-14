import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { datepickerClass } from './styles';
import Icon from './Icon';
import utils from './utils';
import { getLocale } from '../locale';
import paramUtils from './paramUtils';
var MONTHBASE = '2019-01-01 00:00:00';

var Month =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Month, _PureComponent);

  function Month(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleNextYear = _this.handleYearChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
    _this.handlePrevYear = _this.handleYearChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), -1);
    _this.handleYearClick = _this.handleYearClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDisabled = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.disabledRegister(_this.handleDisabled, 'month', props.index);
    return _this;
  }

  var _proto = Month.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.handleYearChange = function handleYearChange(year) {
    var _this$props = this.props,
        current = _this$props.current,
        onChange = _this$props.onChange;
    onChange.apply(void 0, paramUtils.yearHandleChangeParams(utils.addYears(current, year, this.getOptions())));
  };

  _proto.handleYearClick = function handleYearClick() {
    this.props.onModeChange('year');
  };

  _proto.handleMonthClick = function handleMonthClick(month) {
    var _this$props2 = this.props,
        current = _this$props2.current,
        onChange = _this$props2.onChange,
        onModeChange = _this$props2.onModeChange;
    var date = new Date(current.getTime());
    var isMonthType = this.props.type === 'month';
    date = utils.changeDate(date, 'month', month, this.getOptions());
    date = utils.changeDate(date, 'date', 1, this.getOptions());
    onChange.apply(void 0, paramUtils.monthHandleChangeParams(date, isMonthType, isMonthType));
    if (!isMonthType) onModeChange('day');
  };

  _proto.handleDisabled = function handleDisabled(date) {
    var _this$props3 = this.props,
        min = _this$props3.min,
        disabled = _this$props3.disabled,
        range = _this$props3.range,
        type = _this$props3.type,
        index = _this$props3.index,
        rangeDate = _this$props3.rangeDate,
        max = _this$props3.max;
    var isDisabled = min && utils.compareMonth(min, date, 1, this.getOptions()) >= 0;

    if (!isDisabled) {
      isDisabled = max && utils.compareMonth(date, max, 1, this.getOptions()) >= 0;
    }

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date);
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && utils.compareAsc(date, utils.addSeconds(rangeDate[1], -range, this.getOptions())) < 0) {
        isDisabled = true;
      }
    }

    if (!isDisabled && index === 1) {
      if (rangeDate[0] && utils.compareAsc(date, utils.addSeconds(rangeDate[0], range, this.getOptions())) > 0) {
        isDisabled = true;
      }
    }

    return isDisabled;
  };

  _proto.renderMonth = function renderMonth(m, i) {
    var _this$props4 = this.props,
        value = _this$props4.value,
        current = _this$props4.current;
    var date = utils.toDate(MONTHBASE, this.getOptions());
    date = utils.changeDate(date, 'year', utils.getDateInfo(current, 'year', this.getOptions()), this.getOptions());
    date = utils.changeDate(date, 'month', i, this.getOptions());
    var isDisabled = this.handleDisabled(date);
    var className = datepickerClass(utils.isSameMonth(value, date, this.getOptions()) && 'active', isDisabled && 'disabled');
    return React.createElement("span", {
      key: i,
      className: className,
      onClick: isDisabled ? undefined : this.handleMonthClick.bind(this, i)
    }, m);
  };

  _proto.render = function render() {
    var current = this.props.current;
    return React.createElement("div", {
      className: datepickerClass('month-picker')
    }, React.createElement("div", {
      className: datepickerClass('header')
    }, React.createElement(Icon, {
      name: "AngleLeft",
      className: "left",
      onClick: this.handlePrevYear
    }), React.createElement("span", {
      onClick: this.handleYearClick.bind(this),
      className: datepickerClass('ym')
    }, utils.getDateInfo(current, 'year', this.getOptions())), React.createElement(Icon, {
      name: "AngleRight",
      className: "right",
      onClick: this.handleNextYear
    })), React.createElement("div", {
      className: datepickerClass('list')
    }, getLocale('monthValues.short').map(this.renderMonth.bind(this))));
  };

  return Month;
}(PureComponent);

Month.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  // max: PropTypes.object,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
  index: PropTypes.number,
  rangeDate: PropTypes.array,
  timeZone: PropTypes.string,
  disabledRegister: PropTypes.func
};
export default Month;