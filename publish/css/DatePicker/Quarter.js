"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _utils = _interopRequireDefault(require("./utils"));

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var _styles = require("./styles");

var _locale = require("../locale");

var Quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

var Quarter =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Quarter, _PureComponent);

  function Quarter(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleNextYear = _this.handleYearChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
    _this.handlePrevYear = _this.handleYearChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -1);
    _this.handleQuarterClick = _this.handleQuarterClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDisabled = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    props.disabledRegister(_this.handleDisabled, 'quarter', props.index);
    return _this;
  }

  var _proto = Quarter.prototype;

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

  _proto.handleQuarterClick = function handleQuarterClick(date) {
    var onChange = this.props.onChange;
    onChange.apply(void 0, _paramUtils.default.quarterHandleChangeParams(date, true, true));
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
    var isDisabled = min && _utils.default.compareQuarter(min, date, 1, this.getOptions()) >= 0;

    if (!isDisabled) {
      isDisabled = max && _utils.default.compareQuarter(date, max, 1, this.getOptions()) >= 0;
    }

    if (!isDisabled && type === 'quarter' && typeof disabled === 'function') {
      isDisabled = disabled(date);
    }

    if (!isDisabled && index === 0) {
      if (rangeDate[1] && _utils.default.compareQuarter(date, _utils.default.addSeconds(rangeDate[1], -range, this.getOptions()), 0, this.getOptions()) < 0) {
        isDisabled = true;
      }
    }

    if (!isDisabled && index === 1) {
      if (rangeDate[0] && _utils.default.compareQuarter(date, _utils.default.addSeconds(rangeDate[0], range, this.getOptions()), 0, this.getOptions()) > 0) {
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

    var year = _utils.default.getDateInfo(current, 'year', this.getOptions());

    var date = _utils.default.parse(year + " " + (i + 1), 'yyyy Q', this.getOptions());

    var isDisabled = this.handleDisabled(date); // let hoverClass

    var classList = [isDisabled && 'disabled'];

    if (rangeDate) {
      if (_utils.default.isSameQuarter(date, rangeDate[index], this.getOptions())) {
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
      if (_utils.default.isSameQuarter(date, value, this.getOptions())) {
        classList.push('active');
      }
    }

    return _react.default.createElement("div", {
      key: date.getTime() // className={hoverClass}
      ,
      onClick: isDisabled ? undefined : this.handleQuarterClick.bind(this, date, undefined)
    }, _react.default.createElement("span", {
      className: _styles.datepickerClass.apply(void 0, classList)
    }, q));
  };

  _proto.render = function render() {
    var _this2 = this;

    var current = this.props.current;
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('quarter-picker')
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
    }, Quarters.map(function (q, i) {
      return _this2.renderQuarter(q, i);
    })));
  };

  return Quarter;
}(_react.PureComponent);

Quarter.propTypes = {
  current: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.func,
  index: _propTypes.default.number,
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  onChange: _propTypes.default.func.isRequired,
  onModeChange: _propTypes.default.func.isRequired,
  range: _propTypes.default.number,
  rangeDate: _propTypes.default.array,
  type: _propTypes.default.string.isRequired,
  value: _propTypes.default.object,
  timeZone: _propTypes.default.string,
  disabledRegister: _propTypes.default.func
};
var _default = Quarter;
exports.default = _default;