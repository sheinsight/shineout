"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _numbers = require("../utils/numbers");

var _styles = require("./styles");

var _Icon = _interopRequireDefault(require("./Icon"));

var _locale = require("../locale");

var _utils = _interopRequireDefault(require("./utils"));

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var MONTHBASE = '2019-01-01 00:00:00';

var Year =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Year, _PureComponent);

  function Year(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handlePrevRange = _this.handleRangeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -15);
    _this.handleNextRange = _this.handleRangeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 15);
    _this.renderYear = _this.renderYear.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDisabled = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    props.disabledRegister(_this.handleDisabled, 'year', props.index);
    return _this;
  }

  var _proto = Year.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.handleChange = function handleChange(year) {
    var _this$props = this.props,
        current = _this$props.current,
        onChange = _this$props.onChange,
        onModeChange = _this$props.onModeChange,
        type = _this$props.type;

    var date = _utils.default.changeDate(current, 'year', year, this.getOptions());

    var isYearType = this.props.type === 'year';
    onChange.apply(void 0, _paramUtils.default.yearHandleChangeParams(date, isYearType, isYearType));
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
    onChange.apply(void 0, _paramUtils.default.yearHandleChangeParams(_utils.default.addYears(current, year, this.getOptions())));
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
    var isDisabled = min && _utils.default.compareYear(min, date, 1, this.getOptions()) >= 0;

    if (!isDisabled) {
      isDisabled = max && _utils.default.compareYear(date, max, 1, this.getOptions()) >= 0;
    }

    if (!isDisabled && type === 'year' && typeof disabled === 'function') {
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

  _proto.renderYear = function renderYear(y) {
    var value = this.props.value;

    var date = _utils.default.changeDate(_utils.default.toDate(MONTHBASE, this.getOptions()), 'year', y, this.getOptions());

    var isDisabled = this.handleDisabled(date);
    var className = (0, _styles.datepickerClass)(value && _utils.default.getDateInfo(value, 'year', this.getOptions()) === y && 'active', isDisabled && 'disabled');
    return _react.default.createElement("span", {
      key: y,
      className: className,
      onClick: isDisabled ? undefined : this.handleChange.bind(this, y)
    }, y);
  };

  _proto.render = function render() {
    var current = this.props.current;
    var cy = _utils.default.getDateInfo(current, 'year', this.getOptions()) - 7;
    var years = (0, _numbers.range)(15, 0).map(function (i) {
      return cy + i;
    });
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('year-picker')
    }, _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('header')
    }, _react.default.createElement(_Icon.default, {
      name: "AngleLeft",
      className: "left",
      onClick: this.handlePrevRange
    }), _react.default.createElement("span", {
      className: (0, _styles.datepickerClass)('ym')
    }, years[0] + " ~ " + years[years.length - 1]), _react.default.createElement(_Icon.default, {
      name: "AngleRight",
      className: "right",
      onClick: this.handleNextRange
    })), _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('list')
    }, years.map(this.renderYear)));
  };

  return Year;
}(_react.PureComponent);

Year.propTypes = {
  disabled: _propTypes.default.func,
  current: _propTypes.default.object.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onModeChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.object,
  type: _propTypes.default.string,
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  range: _propTypes.default.number,
  index: _propTypes.default.number,
  rangeDate: _propTypes.default.array,
  timeZone: _propTypes.default.string,
  disabledRegister: _propTypes.default.func
};
var _default = Year;
exports.default = _default;