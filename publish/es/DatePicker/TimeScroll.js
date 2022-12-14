import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { range } from '../utils/numbers';
import { datepickerClass } from './styles';
import paramUtils from './paramUtils';
import { getLocale } from '../locale';
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
  _inheritsLoose(TimeScroll, _PureComponent);

  function TimeScroll(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      weekStartsOn: getLocale('startOfWeek')
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

    var _paramUtils$judgeTime = paramUtils.judgeTimeByRange(num, current, mode, min, max, ra, disabled, disabledTime, this.getOptions()),
        isDisabled = _paramUtils$judgeTime[0];

    var className = datepickerClass(!isDisabled && value === num && 'time-active');
    return React.createElement("span", {
      key: num,
      className: className,
      style: this.getItemStyle(num, isDisabled),
      onClick: this.handleClick.bind(this, num)
    }, text);
  };

  _proto.render = function render() {
    var _this3 = this;

    var total = this.props.total;
    return React.createElement("div", {
      ref: this.bindElement,
      className: datepickerClass('time-list'),
      onMouseLeave: this.handleMouseLeave,
      onScroll: this.handleScroll
    }, React.createElement("div", {
      className: datepickerClass('pad')
    }), range(total, 0).map(function (v) {
      return _this3.renderItem(v);
    }), React.createElement("div", {
      className: datepickerClass('pad')
    }));
  };

  return TimeScroll;
}(PureComponent);

TimeScroll.propTypes = {
  ampm: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  total: PropTypes.number,
  value: PropTypes.number.isRequired,
  step: PropTypes.number,
  disabled: PropTypes.func,
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  range: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  current: PropTypes.object,
  mode: PropTypes.string,
  disabledTime: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  timeZone: PropTypes.string
};
TimeScroll.defaultProps = {
  total: 60
};
export default TimeScroll;