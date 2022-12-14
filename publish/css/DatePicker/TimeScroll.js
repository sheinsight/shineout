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

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var _locale = require("../locale");

var lineHeight = 30;
var grayStyle = {
  1: {
    color: '#888'
  },
  2: {
    color: '#ccc'
  },
  3: {
    color: '#eee'
  }
};

var TimeScroll =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(TimeScroll, _PureComponent);

  function TimeScroll(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleMouseLeave = _this.handleMouseLeave.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleScroll = _this.handleScroll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = TimeScroll.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateScrollTop();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.updateScrollTop();
  };

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.getValue = function getValue(v) {
    var _this$props = this.props,
        step = _this$props.step,
        ampm = _this$props.ampm;
    if (!step || ampm) return v;
    return Math.ceil(v / step);
  };

  _proto.getItemStyle = function getItemStyle(num, isDisabled) {
    if (isDisabled) return null;

    if (this.props.ampm || typeof this.props.step === 'number' && this.props.step > 0) {
      if (this.props.value % this.props.step) return null;
      return grayStyle[Math.ceil(Math.abs(this.props.value - num) / this.props.step)];
    }

    return grayStyle[Math.abs(this.props.value - num)];
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.updateScrollTop = function updateScrollTop() {
    var _this2 = this;

    var value = this.props.value;
    if (!this.element) return;
    if (typeof this.props.step === 'number' && this.props.step > 0 && value % this.props.step) return;

    if (this.element.scrollTop !== lineHeight * value) {
      setTimeout(function () {
        if (_this2.element) _this2.scrollToValue();
      });
    }
  };

  _proto.scrollToValue = function scrollToValue() {
    var value = this.props.value;
    this.element.scrollTop = lineHeight * this.getValue(value);
  };

  _proto.handleClick = function handleClick(value) {
    this.props.onChange(value);
    this.element.scrollTop = lineHeight * this.getValue(value);
  };

  _proto.handleMouseLeave = function handleMouseLeave() {
    var value = Math.round(this.element.scrollTop / lineHeight);
    this.element.scrollTop = lineHeight * value;
  };

  _proto.handleScroll = function handleScroll() {
    var _this$props2 = this.props,
        step = _this$props2.step,
        ampm = _this$props2.ampm;
    var value = Math.round(this.element.scrollTop / lineHeight);
    if (value * step === this.props.value) return;

    if (typeof step === 'number' && step > 0 && !ampm && value !== this.props.value) {
      this.props.onChange(value * step);
      return;
    }

    if (value !== this.props.value) this.props.onChange(value);
  };

  _proto.renderItem = function renderItem(num) {
    var _this$props3 = this.props,
        ampm = _this$props3.ampm,
        total = _this$props3.total,
        value = _this$props3.value,
        step = _this$props3.step,
        mode = _this$props3.mode,
        min = _this$props3.min,
        max = _this$props3.max,
        ra = _this$props3.range,
        current = _this$props3.current,
        disabled = _this$props3.disabled,
        disabledTime = _this$props3.disabledTime;
    if (typeof step === 'number' && step <= 0) return null;
    if (!ampm && typeof step === 'number' && num % step !== 0) return null;
    var text = num;
    if (ampm) text = ['am', 'pm'][num];else if (total === 12 && num === 0) text = '12';else if (num < 10) text = "0" + num;

    var _paramUtils$judgeTime = _paramUtils.default.judgeTimeByRange(num, current, mode, min, max, ra, disabled, disabledTime, this.getOptions()),
        isDisabled = _paramUtils$judgeTime[0];

    var className = (0, _styles.datepickerClass)(!isDisabled && value === num && 'time-active');
    return _react.default.createElement("span", {
      key: num,
      className: className,
      style: this.getItemStyle(num, isDisabled),
      onClick: this.handleClick.bind(this, num)
    }, text);
  };

  _proto.render = function render() {
    var _this3 = this;

    var total = this.props.total;
    return _react.default.createElement("div", {
      ref: this.bindElement,
      className: (0, _styles.datepickerClass)('time-list'),
      onMouseLeave: this.handleMouseLeave,
      onScroll: this.handleScroll
    }, _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('pad')
    }), (0, _numbers.range)(total, 0).map(function (v) {
      return _this3.renderItem(v);
    }), _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('pad')
    }));
  };

  return TimeScroll;
}(_react.PureComponent);

TimeScroll.propTypes = {
  ampm: _propTypes.default.bool,
  onChange: _propTypes.default.func.isRequired,
  total: _propTypes.default.number,
  value: _propTypes.default.number.isRequired,
  step: _propTypes.default.number,
  disabled: _propTypes.default.func,
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  range: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  current: _propTypes.default.object,
  mode: _propTypes.default.string,
  disabledTime: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  timeZone: _propTypes.default.string
};
TimeScroll.defaultProps = {
  total: 60
};
var _default = TimeScroll;
exports.default = _default;