import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { range as getRange } from '../utils/numbers';
import { datepickerClass } from './styles';
import Icon from './Icon';
import { getLocale } from '../locale';
import utils from './utils';
import paramUtils from './paramUtils';
var MONTHBASE = '2019-01-01 00:00:00';

var Year =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Year, _PureComponent);

  function Year(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handlePrevRange = _this.handleRangeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), -15);
    _this.handleNextRange = _this.handleRangeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 15);
    _this.renderYear = _this.renderYear.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDisabled = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.disabledRegister(_this.handleDisabled, 'year', props.index);
    return _this;
  }

  var _proto = Year.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.handleChange = function handleChange(year) {
    var _this$props = this.props,
        current = _this$props.current,
        onChange = _this$props.onChange,
        onModeChange = _this$props.onModeChange,
        type = _this$props.type;
    var date = utils.changeDate(current, 'year', year, this.getOptions());
    var isYearType = this.props.type === 'year';
    onChange.apply(void 0, paramUtils.yearHandleChangeParams(date, isYearType, isYearType));
    if (isYearType) return;
    var nextMode = 'month';

    if (type === 'quarter') {
      nextMode = type;
    }

    onModeChange(nextMode);
  };

  _proto.handleRangeChange = function handleRangeChange(year) {
    var _this$props2 = this.props,
        current = _this$props2.current,
        onChange = _this$props2.onChange;
    onChange.apply(void 0, paramUtils.yearHandleChangeParams(utils.addYears(current, year, this.getOptions())));
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
    var isDisabled = min && utils.compareYear(min, date, 1, this.getOptions()) >= 0;

    if (!isDisabled) {
      isDisabled = max && utils.compareYear(date, max, 1, this.getOptions()) >= 0;
    }

    if (!isDisabled && type === 'year' && typeof disabled === 'function') {
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

  _proto.renderYear = function renderYear(y) {
    var value = this.props.value;
    var date = utils.changeDate(utils.toDate(MONTHBASE, this.getOptions()), 'year', y, this.getOptions());
    var isDisabled = this.handleDisabled(date);
    var className = datepickerClass(value && utils.getDateInfo(value, 'year', this.getOptions()) === y && 'active', isDisabled && 'disabled');
    return React.createElement("span", {
      key: y,
      className: className,
      onClick: isDisabled ? undefined : this.handleChange.bind(this, y)
    }, y);
  };

  _proto.render = function render() {
    var current = this.props.current;
    var cy = utils.getDateInfo(current, 'year', this.getOptions()) - 7;
    var years = getRange(15, 0).map(function (i) {
      return cy + i;
    });
    return React.createElement("div", {
      className: datepickerClass('year-picker')
    }, React.createElement("div", {
      className: datepickerClass('header')
    }, React.createElement(Icon, {
      name: "AngleLeft",
      className: "left",
      onClick: this.handlePrevRange
    }), React.createElement("span", {
      className: datepickerClass('ym')
    }, years[0] + " ~ " + years[years.length - 1]), React.createElement(Icon, {
      name: "AngleRight",
      className: "right",
      onClick: this.handleNextRange
    })), React.createElement("div", {
      className: datepickerClass('list')
    }, years.map(this.renderYear)));
  };

  return Year;
}(PureComponent);

Year.propTypes = {
  disabled: PropTypes.func,
  current: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  type: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  range: PropTypes.number,
  index: PropTypes.number,
  rangeDate: PropTypes.array,
  timeZone: PropTypes.string,
  disabledRegister: PropTypes.func
};
export default Year;