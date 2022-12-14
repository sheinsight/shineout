import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import { datepickerClass } from './styles';
import utils from './utils';
import Year from './Year';
import { getLocale } from '../locale';
import Month from './Month';
import Day from './Day';
import Time from './Time';
import Quick from './Quick';
import Quarter from './Quarter';
import paramUtils from './paramUtils';

var Picker =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Picker, _PureComponent);

  function Picker(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    var mode;

    switch (props.type) {
      case 'year':
        mode = 'year';
        break;

      case 'month':
        mode = 'month';
        break;

      case 'quarter':
        mode = 'quarter';
        break;

      case 'time':
        mode = 'time';
        break;

      default:
        mode = 'day';
    }

    _this.state = {
      mode: mode
    };
    var format = 'yyyy-MM-dd HH:mm:ss';
    _this.defaultCurrent = utils.toDateWithFormat(utils.formatDateWithDefaultTime(utils.newDate(undefined, _this.getOptions()), undefined, props.defaultTime[0], format, _this.getOptions()), format, undefined, _this.getOptions());
    _this.handleModeChange = _this.handleModeChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleEnter = _this.handleMouse.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.handleLeave = _this.handleMouse.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.handleQuick = _this.handleQuick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Picker.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.handleQuick = function handleQuick(quick) {
    var onChange = this.props.onChange;
    onChange.apply(void 0, paramUtils.quickHandleChangeParams(quick.value[0], true, null, null, quick));
  };

  _proto.handleMouse = function handleMouse(isEnter, e) {
    // stop
    e.stopPropagation();
    var _this$props = this.props,
        index = _this$props.index,
        handleHover = _this$props.handleHover;
    handleHover(index, isEnter);
  };

  _proto.handleModeChange = function handleModeChange(mode) {
    var _this2 = this;

    setTimeout(function () {
      _this2.setState({
        mode: mode
      });
    }, 10);
  };

  _proto.render = function render() {
    var mode = this.state.mode;

    var _this$props2 = this.props,
        current = _this$props2.current,
        index = _this$props2.index,
        children = _this$props2.children,
        otherProps = _objectWithoutPropertiesLoose(_this$props2, ["current", "index", "children"]);

    var Render;

    switch (mode) {
      case 'year':
        Render = Year;
        break;

      case 'month':
        Render = Month;
        break;

      case 'time':
        Render = Time;
        break;

      case 'quarter':
        Render = Quarter;
        break;

      default:
        Render = Day;
    } // only range has index prop


    if (index === undefined) return React.createElement("div", {
      className: datepickerClass('split')
    }, React.createElement(Quick, _extends({}, otherProps, {
      current: current || this.defaultCurrent,
      onChange: this.handleQuick
    })), React.createElement(Render, _extends({}, otherProps, {
      current: current || this.defaultCurrent,
      onModeChange: this.handleModeChange
    })));
    return React.createElement("div", {
      onMouseEnter: this.handleEnter,
      onMouseLeave: this.handleLeave
    }, React.createElement(Render, _extends({}, otherProps, {
      index: index,
      current: current || this.defaultCurrent,
      onModeChange: this.handleModeChange
    })));
  };

  return Picker;
}(PureComponent);

Picker.propTypes = {
  current: PropTypes.object,
  disabled: PropTypes.func,
  format: PropTypes.string,
  max: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  type: PropTypes.string.isRequired,
  index: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  handleHover: PropTypes.func,
  defaultTime: PropTypes.array,
  timeZone: PropTypes.string
};
export default Picker;