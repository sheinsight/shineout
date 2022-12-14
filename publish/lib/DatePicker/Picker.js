"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _styles = require("./styles");

var _utils = _interopRequireDefault(require("./utils"));

var _Year = _interopRequireDefault(require("./Year"));

var _locale = require("../locale");

var _Month = _interopRequireDefault(require("./Month"));

var _Day = _interopRequireDefault(require("./Day"));

var _Time = _interopRequireDefault(require("./Time"));

var _Quick = _interopRequireDefault(require("./Quick"));

var _Quarter = _interopRequireDefault(require("./Quarter"));

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var Picker =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Picker, _PureComponent);

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
    _this.defaultCurrent = _utils.default.toDateWithFormat(_utils.default.formatDateWithDefaultTime(_utils.default.newDate(undefined, _this.getOptions()), undefined, props.defaultTime[0], format, _this.getOptions()), format, undefined, _this.getOptions());
    _this.handleModeChange = _this.handleModeChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleEnter = _this.handleMouse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleLeave = _this.handleMouse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleQuick = _this.handleQuick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Picker.prototype;

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.handleQuick = function handleQuick(quick) {
    var onChange = this.props.onChange;
    onChange.apply(void 0, _paramUtils.default.quickHandleChangeParams(quick.value[0], true, null, null, quick));
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
        otherProps = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["current", "index", "children"]);
    var Render;

    switch (mode) {
      case 'year':
        Render = _Year.default;
        break;

      case 'month':
        Render = _Month.default;
        break;

      case 'time':
        Render = _Time.default;
        break;

      case 'quarter':
        Render = _Quarter.default;
        break;

      default:
        Render = _Day.default;
    } // only range has index prop


    if (index === undefined) return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('split')
    }, _react.default.createElement(_Quick.default, (0, _extends2.default)({}, otherProps, {
      current: current || this.defaultCurrent,
      onChange: this.handleQuick
    })), _react.default.createElement(Render, (0, _extends2.default)({}, otherProps, {
      current: current || this.defaultCurrent,
      onModeChange: this.handleModeChange
    })));
    return _react.default.createElement("div", {
      onMouseEnter: this.handleEnter,
      onMouseLeave: this.handleLeave
    }, _react.default.createElement(Render, (0, _extends2.default)({}, otherProps, {
      index: index,
      current: current || this.defaultCurrent,
      onModeChange: this.handleModeChange
    })));
  };

  return Picker;
}(_component.PureComponent);

Picker.propTypes = {
  current: _propTypes.default.object,
  disabled: _propTypes.default.func,
  format: _propTypes.default.string,
  max: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  min: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.object,
  type: _propTypes.default.string.isRequired,
  index: _propTypes.default.number,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  handleHover: _propTypes.default.func,
  defaultTime: _propTypes.default.array,
  timeZone: _propTypes.default.string
};
var _default = Picker;
exports.default = _default;