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

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _shallowEqual = _interopRequireDefault(require("../utils/shallowEqual"));

var _utils = _interopRequireDefault(require("./utils"));

var _locale = require("../locale");

var _paramUtils = _interopRequireDefault(require("./paramUtils"));

var _Picker = _interopRequireDefault(require("./Picker"));

var _styles = require("./styles");

var _Quick = _interopRequireDefault(require("./Quick"));

var Range =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Range, _PureComponent);

  function Range(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      rangeDate: props.value
    };
    _this.pickers = [];
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFirstChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 0);
    _this.handleSecondChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
    _this.handleDayHover = _this.handleDayHover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindFirstPicker = _this.bindPicker.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 0);
    _this.bindSecondPicker = _this.bindPicker.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
    _this.handleDisabledStart = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'start');
    _this.handleDisabledEnd = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'end');
    _this.changeDateSmart = _this.changeDateSmart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.fillTime = _this.fillTime.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleQuick = _this.handleQuick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Range.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var rangeDate = this.state.rangeDate;

    if (rangeDate.length !== 1 && !(0, _shallowEqual.default)(prevProps.value, this.props.value) && !(0, _shallowEqual.default)(this.state.rangeDate, this.props.value)) {
      // eslint-disable-next-line
      this.setState({
        rangeDate: this.props.value
      });
    }
  };

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.bindPicker = function bindPicker(index, el) {
    this.pickers[index] = el;
  };

  _proto.resetRange = function resetRange(rangeDate) {
    this.setState({
      rangeDate: rangeDate
    });
  };

  _proto.handleDayHover = function handleDayHover(date) {
    if (this.state.rangeDate.length === 1) {
      _utils.default.cloneTime(date, this.props.value[1], this.props.format, this.getOptions()); // this.setState({ hover: date })

    }
  };

  _proto.changeDateSmart = function changeDateSmart(rangeDate) {
    if (!rangeDate[0] || !rangeDate[1]) return;
    var s = rangeDate[0],
        e = rangeDate[1];
    var range = this.props.range;

    if (typeof range === 'number') {
      if (_utils.default.compareAsc(s, _utils.default.addSeconds(e, -range, this.getOptions())) < 0) rangeDate[1] = _utils.default.addSeconds(s, range, this.getOptions());
    }

    if (_utils.default.compareAsc(s, e) > 0) {
      var sWitheTime = _utils.default.toDate(s, this.getOptions());

      _utils.default.setTime(sWitheTime, e);

      rangeDate[1] = _utils.default.compareAsc(s, sWitheTime) > 0 ? s : sWitheTime;
    }
  } // Be consistent with the parent onChange, expand first params: index
  ;

  _proto.handleChange = function handleChange(index, date, change, end, mode, isQuickSelect, areaType) {
    var _this2 = this;

    var _this$props = this.props,
        type = _this$props.type,
        range = _this$props.range,
        min = _this$props.min,
        max = _this$props.max;

    var handleOnChangeParams = _paramUtils.default.handleOnChangeParams(areaType);

    if (!change) {
      var _this$props2;

      var current = (0, _immer.default)(this.props.current, function (draft) {
        draft[index] = date;
      });

      (_this$props2 = this.props).onChange.apply(_this$props2, handleOnChangeParams(current));

      return;
    }

    if (mode === 'time') {
      var endChangedDate;
      this.setState((0, _immer.default)(function (draft) {
        draft.rangeDate[index] = date;
        var _draft$rangeDate = draft.rangeDate,
            s = _draft$rangeDate[0],
            e = _draft$rangeDate[1];

        if (index !== 0) {
          if (s && s.getHours() === e.getHours()) {
            if (_utils.default.compareAsc(s, e) === 1) {
              e.setMinutes(s.getMinutes());
            }
          }

          return;
        }

        if (range && _utils.default.compareAsc(s, e) === 1) {
          endChangedDate = date;
          draft.rangeDate[1] = endChangedDate;
        }

        if (typeof range === 'number' && _utils.default.compareAsc(s, _utils.default.addSeconds(e, -range, _this2.getOptions())) < 0) {
          endChangedDate = _utils.default.addSeconds(s, range, _this2.getOptions());
          draft.rangeDate[1] = endChangedDate;
        }
      }), function () {
        var _this2$props;

        var current = (0, _immer.default)(_this2.props.value, function (draft) {
          draft[index] = date;
          if (endChangedDate) draft[1] = endChangedDate;
          draft[1 - index] = draft[1 - index] || '';
        });

        (_this2$props = _this2.props).onChange.apply(_this2$props, handleOnChangeParams(current, true));
      });
      return;
    }

    if (type === 'month') {
      var _this$props3;

      // eslint-disable-next-line
      var rangeDate = [].concat(this.state.rangeDate);
      rangeDate[index] = date;
      rangeDate[1 - index] = rangeDate[1 - index] || '';
      this.changeDateSmart(rangeDate);
      this.setState({
        rangeDate: rangeDate
      });

      (_this$props3 = this.props).onChange.apply(_this$props3, handleOnChangeParams(rangeDate, true, true, index === 1));

      return;
    }

    _utils.default.cloneTime(date, this.props.value[index], undefined, this.getOptions());

    if (min && _utils.default.compareAsc(date, min) <= 0) {
      _utils.default.setTime(date, min);
    }

    if (max && _utils.default.compareAsc(date, max) >= 0) {
      _utils.default.setTime(date, max);
    } // if (this.state.rangeDate.filter(a => a).length !== 1) {
    //   this.setState({ rangeDate: index === 1 ? [undefined, date] : [date], hover: undefined })
    //   return
    // }


    this.setState((0, _immer.default)(function (draft) {
      // const method = utils.compareAsc(draft.rangeDate[0], date) > 0 ? 'unshift' : 'push'
      draft.rangeDate[index] = date;
      draft.rangeDate[1 - index] = draft.rangeDate[1 - index] || ''; // draft.rangeDate.map(this.fillTime)
      // range change start&end

      _this2.changeDateSmart(draft.rangeDate);

      draft.hover = undefined;
    }), function () {
      var _this2$props2;

      // only 'datetime' don not need close, 'time is up'
      (_this2$props2 = _this2.props).onChange.apply(_this2$props2, handleOnChangeParams(_this2.state.rangeDate, true, type !== 'datetime', index === 1));
    });
  };

  _proto.fillTime = function fillTime(date, index) {
    var _this$props4 = this.props,
        defaultTime = _this$props4.defaultTime,
        format = _this$props4.format,
        value = _this$props4.value;
    return _utils.default.formatDateWithDefaultTime(date, value[index], defaultTime[index], format, this.getOptions());
  };

  _proto.handleDisabled = function handleDisabled(type, date) {
    var disabled = this.props.disabled;
    var rangeDate = this.state.rangeDate;

    if (disabled) {
      return disabled.apply(void 0, [date, type].concat(rangeDate));
    }

    return false;
  };

  _proto.handleQuick = function handleQuick(quick) {
    var _this$props5;

    this.setState({
      rangeDate: quick.value
    });

    (_this$props5 = this.props).onChange.apply(_this$props5, _paramUtils.default.quickHandleChangeParams(quick.value, true, null, null, quick));
  };

  _proto.render = function render() {
    // min & max can not to child
    var _this$props6 = this.props,
        current = _this$props6.current,
        value = _this$props6.value,
        range = _this$props6.range,
        children = _this$props6.children,
        min = _this$props6.min,
        max = _this$props6.max,
        quicks = _this$props6.quicks,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props6, ["current", "value", "range", "children", "min", "max", "quicks"]);
    var rangeDate = [].concat(this.state.rangeDate);
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('range-picker')
    }, _react.default.createElement(_Quick.default, (0, _extends2.default)({}, this.props, {
      current: this.state.rangeDate,
      onChange: this.handleQuick
    })), _react.default.createElement(_Picker.default, (0, _extends2.default)({}, props, {
      pos: "start",
      disabled: this.handleDisabledStart,
      index: 0,
      min: min,
      max: max,
      current: current[0],
      range: typeof range === 'number' ? range : undefined,
      rangeDate: rangeDate,
      rangeTemp: rangeDate[0],
      onChange: this.handleFirstChange,
      onChangeSync: this.handleChange,
      onDayHover: this.handleDayHover,
      ref: this.bindFirstPicker,
      value: _utils.default.toDateWithFormat(value[0], props.format, undefined, this.getOptions()),
      showTimePicker: value.length === 2
    })), _react.default.createElement(_Picker.default, (0, _extends2.default)({}, props, {
      disabled: this.handleDisabledEnd,
      index: 1,
      min: rangeDate[0] ? rangeDate[0] : min,
      max: max,
      current: current[1],
      range: typeof range === 'number' ? range : undefined,
      rangeDate: rangeDate,
      rangeTemp: rangeDate[0],
      onChange: this.handleSecondChange,
      onChangeSync: this.handleChange,
      onDayHover: this.handleDayHover,
      ref: this.bindSecondPicker,
      value: _utils.default.toDateWithFormat(value[1], props.format, undefined, this.getOptions()),
      showTimePicker: value.length === 2
    })));
  };

  return Range;
}(_component.PureComponent);

Range.propTypes = {
  current: _propTypes.default.array,
  disabled: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  format: _propTypes.default.string,
  onChange: _propTypes.default.func.isRequired,
  range: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  value: _propTypes.default.array,
  type: _propTypes.default.string.isRequired,
  defaultTime: _propTypes.default.array,
  quicks: _propTypes.default.array,
  min: _propTypes.default.object,
  max: _propTypes.default.object,
  timeZone: _propTypes.default.string
};
Range.defaultProps = {
  value: []
};
var _default = Range;
exports.default = _default;