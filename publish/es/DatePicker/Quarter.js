import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import utils from './utils';
import paramUtils from './paramUtils';
import { datepickerClass } from './styles';
import { getLocale } from '../locale';
var Quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

var Quarter =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Quarter, _PureComponent);

  function Quarter(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleNextYear = _this.handleYearChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
    _this.handlePrevYear = _this.handleYearChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), -1);
    _this.handleQuarterClick = _this.handleQuarterClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDisabled = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    props.disabledRegister(_this.handleDisabled, 'quarter', props.index);
    return _this;
  }

  var _proto = Quarter.prototype;

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

  _proto.handleQuarterClick = function handleQuarterClick(date) {
    var onChange = this.props.onChange;
    onChange.apply(void 0, paramUtils.quarterHandleChangeParams(date, true, true));
  };

  _proto.handleDisabled = function handleDisabled(date) {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        index = _this$props2.index,
        min = _this$props2.min,
        max = _this$props2.max,
        rangeDate = _this$props2.rangeDate,
        range = _this$props2.range,
        type = _this$props2.type;
    var isDisabled = min && utils.compareQuarter(min, date, 1, this.getOptions()) >= 0;

    if (!isDisabled) {
      isDisabled = max && utils.compareQuarter(date, max, 1, this.getOptions()) >= 0;
    }

    if (!isDisabled && type === 'quarter' && typeof disabled === 'function') {
      isDisabled = disabled(date);
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && utils.compareQuarter(date, utils.addSeconds(rangeDate[1], -range, this.getOptions()), 0, this.getOptions()) < 0) {
        isDisabled = true;
      }
    }

    if (!isDisabled && index === 1) {
      if (rangeDate[0] && utils.compareQuarter(date, utils.addSeconds(rangeDate[0], range, this.getOptions()), 0, this.getOptions()) > 0) {
        isDisabled = true;
      }
    }

    return isDisabled;
  };

  _proto.renderQuarter = function renderQuarter(q, i) {
    var _this$props3 = this.props,
        current = _this$props3.current,
        index = _this$props3.index,
        rangeDate = _this$props3.rangeDate,
        value = _this$props3.value;
    var year = utils.getDateInfo(current, 'year', this.getOptions());
    var date = utils.parse(year + " " + (i + 1), 'yyyy Q', this.getOptions());
    var isDisabled = this.handleDisabled(date); // let hoverClass

    var classList = [isDisabled && 'disabled'];

    if (rangeDate) {
      if (utils.isSameQuarter(date, rangeDate[index], this.getOptions())) {
        classList.push('active');
      } // hoverClass = datepickerClass(
      //   rangeDate[0] &&
      //     utils.compareQuarter(rangeDate[0], date) <= 0 &&
      //     rangeDate[1] &&
      //     utils.compareQuarter(rangeDate[1], date) >= 0 &&
      //     'hover',
      //   // Datetime Picker range end datetime classname #330
      //   utils.isSameQuarter(rangeDate[index], date) && `hover-${index === 0 ? 'start' : 'end'} active`
      // )

    } else if (value) {
      if (utils.isSameQuarter(date, value, this.getOptions())) {
        classList.push('active');
      }
    }

    return React.createElement("div", {
      key: date.getTime() // className={hoverClass}
      ,
      onClick: isDisabled ? undefined : this.handleQuarterClick.bind(this, date, undefined)
    }, React.createElement("span", {
      className: datepickerClass.apply(void 0, classList)
    }, q));
  };

  _proto.render = function render() {
    var _this2 = this;

    var current = this.props.current;
    return React.createElement("div", {
      className: datepickerClass('quarter-picker')
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
    }, Quarters.map(function (q, i) {
      return _this2.renderQuarter(q, i);
    })));
  };

  return Quarter;
}(PureComponent);

Quarter.propTypes = {
  current: PropTypes.object.isRequired,
  disabled: PropTypes.func,
  index: PropTypes.number,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  range: PropTypes.number,
  rangeDate: PropTypes.array,
  type: PropTypes.string.isRequired,
  value: PropTypes.object,
  timeZone: PropTypes.string,
  disabledRegister: PropTypes.func
};
export default Quarter;