import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';
import { PureComponent } from '../component';
import shallowEqual from '../utils/shallowEqual';
import utils from './utils';
import { getLocale } from '../locale';
import paramUtils from './paramUtils';
import Picker from './Picker';
import { datepickerClass } from './styles';
import Quick from './Quick';

var Range =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Range, _PureComponent);

  function Range(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      rangeDate: props.value
    };
    _this.pickers = [];
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFirstChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 0);
    _this.handleSecondChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
    _this.handleDayHover = _this.handleDayHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindFirstPicker = _this.bindPicker.bind(_assertThisInitialized(_assertThisInitialized(_this)), 0);
    _this.bindSecondPicker = _this.bindPicker.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
    _this.handleDisabledStart = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'start');
    _this.handleDisabledEnd = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'end');
    _this.changeDateSmart = _this.changeDateSmart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fillTime = _this.fillTime.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleQuick = _this.handleQuick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Range.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var rangeDate = this.state.rangeDate;

    if (rangeDate.length !== 1 && !shallowEqual(prevProps.value, this.props.value) && !shallowEqual(this.state.rangeDate, this.props.value)) {
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
      weekStartsOn: getLocale('startOfWeek')
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
      utils.cloneTime(date, this.props.value[1], this.props.format, this.getOptions()); // this.setState({ hover: date })
    }
  };

  _proto.changeDateSmart = function changeDateSmart(rangeDate) {
    if (!rangeDate[0] || !rangeDate[1]) return;
    var s = rangeDate[0],
        e = rangeDate[1];
    var range = this.props.range;

    if (typeof range === 'number') {
      if (utils.compareAsc(s, utils.addSeconds(e, -range, this.getOptions())) < 0) rangeDate[1] = utils.addSeconds(s, range, this.getOptions());
    }

    if (utils.compareAsc(s, e) > 0) {
      var sWitheTime = utils.toDate(s, this.getOptions());
      utils.setTime(sWitheTime, e);
      rangeDate[1] = utils.compareAsc(s, sWitheTime) > 0 ? s : sWitheTime;
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
    var handleOnChangeParams = paramUtils.handleOnChangeParams(areaType);

    if (!change) {
      var _this$props2;

      var current = immer(this.props.current, function (draft) {
        draft[index] = date;
      });

      (_this$props2 = this.props).onChange.apply(_this$props2, handleOnChangeParams(current));

      return;
    }

    if (mode === 'time') {
      var endChangedDate;
      this.setState(immer(function (draft) {
        draft.rangeDate[index] = date;
        var _draft$rangeDate = draft.rangeDate,
            s = _draft$rangeDate[0],
            e = _draft$rangeDate[1];

        if (index !== 0) {
          if (s && s.getHours() === e.getHours()) {
            if (utils.compareAsc(s, e) === 1) {
              e.setMinutes(s.getMinutes());
            }
          }

          return;
        }

        if (range && utils.compareAsc(s, e) === 1) {
          endChangedDate = date;
          draft.rangeDate[1] = endChangedDate;
        }

        if (typeof range === 'number' && utils.compareAsc(s, utils.addSeconds(e, -range, _this2.getOptions())) < 0) {
          endChangedDate = utils.addSeconds(s, range, _this2.getOptions());
          draft.rangeDate[1] = endChangedDate;
        }
      }), function () {
        var _this2$props;

        var current = immer(_this2.props.value, function (draft) {
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

    utils.cloneTime(date, this.props.value[index], undefined, this.getOptions());

    if (min && utils.compareAsc(date, min) <= 0) {
      utils.setTime(date, min);
    }

    if (max && utils.compareAsc(date, max) >= 0) {
      utils.setTime(date, max);
    } // if (this.state.rangeDate.filter(a => a).length !== 1) {
    //   this.setState({ rangeDate: index === 1 ? [undefined, date] : [date], hover: undefined })
    //   return
    // }


    this.setState(immer(function (draft) {
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
    return utils.formatDateWithDefaultTime(date, value[index], defaultTime[index], format, this.getOptions());
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

    (_this$props5 = this.props).onChange.apply(_this$props5, paramUtils.quickHandleChangeParams(quick.value, true, null, null, quick));
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
        props = _objectWithoutPropertiesLoose(_this$props6, ["current", "value", "range", "children", "min", "max", "quicks"]);

    var rangeDate = [].concat(this.state.rangeDate);
    return React.createElement("div", {
      className: datepickerClass('range-picker')
    }, React.createElement(Quick, _extends({}, this.props, {
      current: this.state.rangeDate,
      onChange: this.handleQuick
    })), React.createElement(Picker, _extends({}, props, {
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
      value: utils.toDateWithFormat(value[0], props.format, undefined, this.getOptions()),
      showTimePicker: value.length === 2
    })), React.createElement(Picker, _extends({}, props, {
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
      value: utils.toDateWithFormat(value[1], props.format, undefined, this.getOptions()),
      showTimePicker: value.length === 2
    })));
  };

  return Range;
}(PureComponent);

Range.propTypes = {
  current: PropTypes.array,
  disabled: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  value: PropTypes.array,
  type: PropTypes.string.isRequired,
  defaultTime: PropTypes.array,
  quicks: PropTypes.array,
  min: PropTypes.object,
  max: PropTypes.object,
  timeZone: PropTypes.string
};
Range.defaultProps = {
  value: []
};
export default Range;