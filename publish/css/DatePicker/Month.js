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

var _Icon = _interopRequireDefault(require("./Icon"));

var _utils = _interopRequireDefault(require("./utils"));

var _locale = require("../locale");

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var MONTHBASE = '2019-01-01 00:00:00';

var Month =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Month, _PureComponent);

  function Month(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleNextYear = _this.handleYearChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
    _this.handlePrevYear = _this.handleYearChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -1);
    _this.handleYearClick = _this.handleYearClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDisabled = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    props.disabledRegister(_this.handleDisabled, 'month', props.index);
    return _this;
  }

  var _proto = Month.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.handleYearChange = function handleYearChange(year) {
    var _this$props = this.props,
        current = _this$props.current,
        onChange = _this$props.onChange;
    onChange.apply(void 0, _paramUtils.default.yearHandleChangeParams(_utils.default.addYears(current, year, this.getOptions())));
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
    date = _utils.default.changeDate(date, 'month', month, this.getOptions());
    date = _utils.default.changeDate(date, 'date', 1, this.getOptions());
    onChange.apply(void 0, _paramUtils.default.monthHandleChangeParams(date, isMonthType, isMonthType));
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
    var isDisabled = min && _utils.default.compareMonth(min, date, 1, this.getOptions()) >= 0;

    if (!isDisabled) {
      isDisabled = max && _utils.default.compareMonth(date, max, 1, this.getOptions()) >= 0;
    }

    if (!isDisabled && type === 'month' && typeof disabled === 'function') {
      isDisabled = disabled(date);
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && _utils.default.compareAsc(date, _utils.default.addSeconds(rangeDate[1], -range, this.getOptions())) < 0) {
        isDisabled = true;
      }
    }

    if (!isDisabled && index === 1) {
      if (rangeDate[0] && _utils.default.compareAsc(date, _utils.default.addSeconds(rangeDate[0], range, this.getOptions())) > 0) {
        isDisabled = true;
      }
    }

    return isDisabled;
  };

  _proto.renderMonth = function renderMonth(m, i) {
    var _this$props4 = this.props,
        value = _this$props4.value,
        current = _this$props4.current;

    var date = _utils.default.toDate(MONTHBASE, this.getOptions());

    date = _utils.default.changeDate(date, 'year', _utils.default.getDateInfo(current, 'year', this.getOptions()), this.getOptions());
    date = _utils.default.changeDate(date, 'month', i, this.getOptions());
    var isDisabled = this.handleDisabled(date);
    var className = (0, _styles.datepickerClass)(_utils.default.isSameMonth(value, date, this.getOptions()) && 'active', isDisabled && 'disabled');
    return _react.default.createElement("span", {
      key: i,
      className: className,
      onClick: isDisabled ? undefined : this.handleMonthClick.bind(this, i)
    }, m);
  };

  _proto.render = function render() {
    var current = this.props.current;
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('month-picker')
    }, _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('header')
    }, _react.default.createElement(_Icon.default, {
      name: "AngleLeft",
      className: "left",
      onClick: this.handlePrevYear
    }), _react.default.createElement("span", {
      onClick: this.handleYearClick.bind(this),
      className: (0, _styles.datepickerClass)('ym')
    }, _utils.default.getDateInfo(current, 'year', this.getOptions())), _react.default.createElement(_Icon.default, {
      name: "AngleRight",
      className: "right",
      onClick: this.handleNextYear
    })), _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('list')
    }, (0, _locale.getLocale)('monthValues.short').map(this.renderMonth.bind(this))));
  };

  return Month;
}(_react.PureComponent);

Month.propTypes = {
  current: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.func,
  // max: PropTypes.object,
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  onChange: _propTypes.default.func.isRequired,
  onModeChange: _propTypes.default.func.isRequired,
  range: _propTypes.default.number,
  type: _propTypes.default.string.isRequired,
  value: _propTypes.default.object,
  index: _propTypes.default.number,
  rangeDate: _propTypes.default.array,
  timeZone: _propTypes.default.string,
  disabledRegister: _propTypes.default.func
};
var _default = Month;
exports.default = _default;