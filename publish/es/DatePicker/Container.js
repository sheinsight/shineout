import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import immer from 'immer';
import { PureComponent } from '../component';
import { datepickerClass } from './styles';
import { inputClass } from '../Input/styles';
import Icon from './Icon';
import utils from './utils';
import Picker from './Picker';
import Range from './Range';
import Text from './Text';
import { getUidStr } from '../utils/uid';
import { isArray } from '../utils/is';
import { getParent } from '../utils/dom/element';
import absoluteList from '../AnimationList/AbsoluteList';
import { docSize } from '../utils/dom/document';
import { getRTLPosition } from '../utils/strings';
import List from '../AnimationList';
import { getLocale } from '../locale';
import DateFns from './utils';
import { isRTL } from '../config';
import InputTitle from '../InputTitle';
import { inputTitleClass } from '../InputTitle/styles';
import { getDirectionClass } from '../utils/classname';
var FadeList = List(['fade'], 'fast');
var OptionList = absoluteList(function (_ref) {
  var focus = _ref.focus,
      other = _objectWithoutPropertiesLoose(_ref, ["focus"]);

  return React.createElement(FadeList, _extends({
    show: focus
  }, other));
});

var getCurrentPosition = function getCurrentPosition(position) {
  if (isRTL()) {
    return getRTLPosition(position);
  }

  return position;
};

var Container =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Container, _PureComponent);

  function Container(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      focus: false,
      current: _this.getCurrent(),
      position: props.position,
      picker0: false,
      picker1: false
    };
    _this.disabledMap = {};
    _this.pickerId = "picker_" + getUidStr();
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindPicker = _this.bindPicker.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindWrappedPicker = _this.bindWrappedPicker.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindTextSpan = _this.bindTextSpan.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.handleBlur = _this.handleToggle.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClear = _this.handleClear.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleHover = _this.handleHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleTextChange = _this.handleTextChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.parseDate = _this.parseDate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.dateToCurrent = _this.dateToCurrent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.shouldFocus = _this.shouldFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDisabled = _this.handleDisabled.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.disabledRegister = _this.disabledRegister.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindClickAway = _this.bindClickAway.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearClickAway = _this.clearClickAway.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClickAway = _this.handleClickAway.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDefaultTime = _this.getDefaultTime.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getQuick = _this.getQuick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.firstRender = false;
    return _this;
  }

  var _proto = Container.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.clearClickAway();
  };

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: getLocale('startOfWeek')
    };
  };

  _proto.getCurrent = function getCurrent() {
    var _this2 = this;

    var current;
    var _this$props = this.props,
        defaultRangeMonth = _this$props.defaultRangeMonth,
        defaultPickerValue = _this$props.defaultPickerValue,
        value = _this$props.value;

    if (this.props.range) {
      var defaultPickerRange = defaultRangeMonth || defaultPickerValue || [];
      current = (this.props.value || []).map(function (v, i) {
        v = _this2.parseDate(v);
        if (utils.isInvalid(v)) v = utils.newDate(defaultPickerRange[i], _this2.getOptions());
        return v;
      });
      if (current.length === 0) current = [utils.newDate(defaultPickerRange[0], this.getOptions()), utils.newDate(defaultPickerRange[1], this.getOptions())];
    } else {
      current = this.parseDate(value || defaultPickerValue);
    }

    return current;
  };

  _proto.getFormat = function getFormat() {
    var _this$props2 = this.props,
        format = _this$props2.format,
        type = _this$props2.type;

    if (format) {
      if (type === 'week' && format.indexOf('I') > -1) return format.replace(/y/g, 'Y');
      return format;
    }

    switch (type) {
      case 'date':
        return 'yyyy-MM-dd';

      case 'month':
        return 'yyyy-MM';

      case 'time':
        return 'HH:mm:ss';

      case 'year':
        return 'yyyy';

      case 'week':
        return 'RRRR II';

      case 'quarter':
        return 'yyyy-[Q]Q';

      default:
        return 'yyyy-MM-dd HH:mm:ss';
    }
  };

  _proto.getQuick = function getQuick(format) {
    var _this3 = this;

    var quickSelect = this.props.quickSelect;
    if (!Array.isArray(quickSelect)) return undefined;
    return quickSelect.map(function (q) {
      var invalid = false;
      if (!q.value) return {
        name: q.name,
        invalid: true
      };
      var date = (Array.isArray(q.value) ? q.value : [q.value]).map(function (v) {
        return DateFns.toDateWithFormat(v, format, undefined, _this3.getOptions());
      });
      if (DateFns.isInvalid(date[0])) invalid = true;
      if (date[1] && DateFns.isInvalid(date[1])) invalid = true;
      if (invalid) return {
        name: q.name,
        invalid: true
      };
      return {
        name: q.name,
        value: date
      };
    });
  };

  _proto.getDefaultTime = function getDefaultTime() {
    var defaultTime = this.props.defaultTime;
    if (typeof defaultTime === 'string') return [defaultTime];
    if (isArray(defaultTime)) return defaultTime;
    return [];
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindPicker = function bindPicker(picker) {
    this.picker = picker;
  };

  _proto.bindWrappedPicker = function bindWrappedPicker(el) {
    this.pickerContainer = el;
  };

  _proto.bindTextSpan = function bindTextSpan(el) {
    this.textSpan = el;
  };

  _proto.parseDate = function parseDate(value) {
    return utils.toDateWithFormat(value, this.getFormat(), undefined, this.getOptions());
  };

  _proto.bindClickAway = function bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway);
  };

  _proto.clearClickAway = function clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway);
  };

  _proto.shouldFocus = function shouldFocus(el) {
    if (el.getAttribute('data-id') === this.pickerId) return true;
    if (getParent(el, "." + datepickerClass('result'))) return true;
    return false;
  };

  _proto.handleClickAway = function handleClickAway(e) {
    var onPicker = e.target === this.element || this.element.contains(e.target);
    var onAbsolutePicker = getParent(e.target, "." + datepickerClass('location'));

    if (!onPicker && !onAbsolutePicker) {
      if (this.props.inputable && this.textSpan) this.textSpan.blur();
      this.clearClickAway();
      this.handleToggle(false);
      this.props.onBlur();
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    if (!this.shouldFocus(e.target)) return;
    this.props.onFocus(e);
    this.bindClickAway();
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleToggle(!this.state.focus);
    } // fot close the list


    if (e.keyCode === 9) {
      this.props.onBlur(e); // e.preventDefault()

      if (this.state.focus) this.handleToggle(false);else this.clearClickAway();
    }
  };

  _proto.handleToggle = function handleToggle(focus, e) {
    var _this4 = this;

    var quickSelect = this.props.quickSelect;
    var hasQuickColumn = Array.isArray(quickSelect) && quickSelect.length > 0;
    if (this.props.disabled === true) return;
    if (focus === this.state.focus) return;
    if (e && focus && getParent(e.target, this.pickerContainer)) return; // click close icon

    if (focus && e && e.target.classList.contains(datepickerClass('close'))) return;
    this.setState(immer(function (state) {
      state.focus = focus;

      if (focus === true) {
        var rect = _this4.element.getBoundingClientRect();

        var windowHeight = docSize.height;
        var windowWidth = docSize.width;
        var pickerWidth = _this4.props.range ? 540 : 270 + (hasQuickColumn ? 120 : 0);

        if (!_this4.props.position) {
          if (rect.bottom + 300 > windowHeight) {
            if (rect.left + pickerWidth > windowWidth) state.position = 'right-top';else state.position = 'left-top';
          } else if (rect.left + pickerWidth > windowWidth) state.position = 'right-bottom';else state.position = 'left-bottom';
        }

        state.current = _this4.getCurrent();
      }
    }));

    if (focus && this.picker && this.picker.resetRange) {
      this.picker.resetRange((this.props.value || []).map(this.parseDate));
    }

    if (focus === true) {
      this.firstRender = true; // this.props.onFocus()

      this.bindClickAway();
    } else {
      this.props.onValueBlur();
    }
  };

  _proto.triggerValueBlur = function triggerValueBlur(cb) {
    var inputable = this.props.inputable;
    var focus = this.state.focus;
    if (cb && typeof cb === 'function') cb(); // OnChange is not triggered when handling copy and paste

    if (inputable && focus === false) {
      this.props.onValueBlur();
    }
  };

  _proto.disabledRegister = function disabledRegister(disabled, mode, index) {
    if (index === undefined) {
      this.disabledMap[mode] = disabled;
      return;
    }

    if (!this.disabledMap[mode]) this.disabledMap[mode] = [];
    this.disabledMap[mode][index] = disabled;
  };

  _proto.handleDisabled = function handleDisabled(date, index) {
    var mode = this.props.type;
    var disabledMap = this.disabledMap;
    var isRange = index !== undefined;

    switch (mode) {
      case 'time':
        return isRange ? disabledMap.time[index](date, undefined, undefined, true) : disabledMap.time(date, undefined, undefined, true);

      case 'date':
        return isRange ? disabledMap.day[index](date) : disabledMap.day(date);

      case 'week':
        return isRange ? disabledMap.day[index](date) : disabledMap.day(date);

      case 'month':
        return isRange ? disabledMap.month[index](date) : disabledMap.month(date);

      case 'year':
        return isRange ? disabledMap.year[index](date) : disabledMap.year(date);

      case 'quarter':
        return isRange ? disabledMap.quarter[index](date) : disabledMap.quarter(date);

      case 'datetime':
        return isRange ? disabledMap.time[index](date, undefined, undefined, true) || disabledMap.day[index](date) : disabledMap.time(date, undefined, undefined, true) || disabledMap.day(date);

      default:
        return false;
    }
  };

  _proto.handleTextChange = function handleTextChange(date, index, e) {
    var _this5 = this;

    var _this$props3 = this.props,
        disabledTime = _this$props3.disabledTime,
        disabled = _this$props3.disabled,
        max = _this$props3.max,
        min = _this$props3.min,
        range = _this$props3.range;
    var format = this.getFormat();
    var val = date ? utils.format(date, format, this.getOptions()) : '';
    var isDisabled;

    if (disabled || disabledTime || max || min || range) {
      isDisabled = this.handleDisabled(date, index);
      if (isDisabled) return;
    }

    if (!this.props.range) {
      var close = !(e && e.target && this.element.contains(e.target));
      this.props.onChange(val, close ? this.triggerValueBlur.bind(this, this.handleBlur) : undefined);
      return;
    }

    var value = [].concat(immer(this.props.value === undefined && range ? [] : this.props.value, function (draft) {
      draft[index] = val;
    }));
    if (utils.compareAsc(value[0], value[1]) > 0) value.push(value.shift());
    this.props.onChange(value, this.triggerValueBlur.bind(this, function () {
      _this5.setState({
        current: _this5.getCurrent()
      });
    }));
  };

  _proto.dateToCurrent = function dateToCurrent(date) {
    var range = this.props.range;
    if (!range) return date;
    var current = this.state.current;
    return [date[0] || current[0], date[1] || current[1]];
  };

  _proto.handleChange = function handleChange(date, change, blur, isEnd, isQuickSelect, areaType) {
    var _this6 = this;

    var onPickerChange = this.props.onPickerChange; // is range only select one

    var rangeOne = this.props.range && !(date[0] && date[1]);
    var format = this.getFormat();
    var value;
    if (this.props.range) value = date.map(function (v) {
      return v ? utils.format(v, format, _this6.getOptions()) : v;
    });else value = utils.format(date, format, this.getOptions());
    var callback;
    if (!this.props.range) callback = blur ? this.handleBlur : undefined;else {
      callback = blur && !rangeOne ? this.handleBlur : undefined;
    }
    var newCurrent = this.dateToCurrent(date);
    if (onPickerChange) onPickerChange(value, isQuickSelect, areaType);

    if (change) {
      this.setState({
        current: newCurrent
      });
      this.props.onChange(value, callback, isQuickSelect);
    } else {
      this.setState({
        current: newCurrent
      }, callback);
    }
  };

  _proto.handleClear = function handleClear(e) {
    var _this7 = this;

    var clearWithUndefined = this.props.clearWithUndefined;
    e.stopPropagation();
    var empty = clearWithUndefined ? undefined : '';
    var value = this.props.range ? [empty, empty] : empty;
    this.props.onChange(value, function () {
      _this7.props.onValueBlur();

      _this7.handleToggle(false);

      _this7.element.focus();
    });
  };

  _proto.handleHover = function handleHover(index, isEnter) {
    var _this$setState;

    this.setState((_this$setState = {}, _this$setState["picker" + index] = isEnter, _this$setState));
  };

  _proto.renderText = function renderText(value, placeholder, key) {
    var _this$props4 = this.props,
        inputable = _this$props4.inputable,
        formatResult = _this$props4.formatResult,
        disabled = _this$props4.disabled;
    var date = this.parseDate(value);
    var className = classnames(datepickerClass('txt', this.state["picker" + key] && 'text-focus'), utils.isInvalid(date) && inputClass('placeholder'));
    var resultFormat = formatResult || this.getFormat();
    return React.createElement(Text, {
      key: key || 'single',
      onTextSpanRef: this.bindTextSpan,
      focusElement: this.textSpan,
      className: className,
      focus: this.state.focus,
      format: resultFormat,
      element: this.element,
      index: key,
      inputable: inputable,
      placeholder: placeholder,
      onChange: this.handleTextChange,
      value: utils.isInvalid(date) ? undefined : utils.format(date, resultFormat, this.getOptions()),
      disabled: disabled === true
    });
  };

  _proto.renderResult = function renderResult() {
    var _this8 = this;

    var _this$props5 = this.props,
        disabled = _this$props5.disabled,
        range = _this$props5.range,
        placeholder = _this$props5.placeholder,
        type = _this$props5.type,
        innerTitle = _this$props5.innerTitle,
        inputable = _this$props5.inputable;
    var value = this.props.value;
    if (!value && range) value = []; // const isEmpty = !value || value.length === 0

    var clearable = this.props.clearable;
    if (disabled === true) clearable = false;
    var isEmpty = (range ? value : [value]).reduce(function (result, str) {
      var date = _this8.parseDate(str);

      return result && utils.isInvalid(date);
    }, true);
    return React.createElement("div", {
      className: datepickerClass('result')
    }, React.createElement(InputTitle, {
      className: datepickerClass('title-box'),
      contentClass: inputTitleClass('hidable'),
      innerTitle: innerTitle,
      open: !isEmpty || inputable && this.state.focus
    }, range ? [this.renderText(value[0], placeholder[0], 0), React.createElement("span", {
      key: "-",
      className: datepickerClass('separate')
    }, "~"), this.renderText(value[1], placeholder[1], 1)] : this.renderText(value, placeholder)), React.createElement(Icon, {
      className: isEmpty || !clearable ? '' : 'indecator',
      name: type === 'time' ? 'Clock' : 'Calendar'
    }), !isEmpty && clearable && React.createElement(Icon, {
      name: "CloseCircle",
      className: "close",
      tag: "a",
      onClick: this.handleClear
    }));
  };

  _proto.renderWrappedPicker = function renderWrappedPicker() {
    var _this$state = this.state,
        focus = _this$state.focus,
        position = _this$state.position;
    var _this$props6 = this.props,
        absolute = _this$props6.absolute,
        zIndex = _this$props6.zIndex,
        quickSelect = _this$props6.quickSelect;
    var props = {
      absolute: absolute,
      focus: focus,
      className: datepickerClass('picker', 'location', "absolute-" + getCurrentPosition(position), quickSelect && getDirectionClass('quick')),
      zIndex: zIndex,
      getRef: this.bindWrappedPicker // computed absolute position needed

    };

    if (absolute) {
      props.rootClass = datepickerClass('absolute', isRTL() && 'rtl');
      props.parentElement = this.element;
      props.position = position;
    } else {
      props.position = getCurrentPosition(position);
    }

    return React.createElement(OptionList, props, this.renderPicker());
  };

  _proto.renderPicker = function renderPicker() {
    var _this9 = this;

    if (!this.firstRender) return undefined;
    var _this$props7 = this.props,
        range = _this$props7.range,
        type = _this$props7.type,
        value = _this$props7.value,
        min = _this$props7.min,
        max = _this$props7.max,
        disabled = _this$props7.disabled,
        allowSingle = _this$props7.allowSingle,
        hourStep = _this$props7.hourStep,
        minuteStep = _this$props7.minuteStep,
        secondStep = _this$props7.secondStep,
        disabledTime = _this$props7.disabledTime,
        timeZone = _this$props7.timeZone;
    var format = this.getFormat();
    var quicks = this.getQuick(format);
    var Component = range ? Range : Picker;
    return React.createElement(Component, {
      ref: this.bindPicker,
      defaultTime: this.getDefaultTime(),
      current: this.state.current,
      format: format,
      disabled: typeof disabled === 'function' ? disabled : undefined,
      onChange: this.handleChange,
      type: type,
      range: range,
      quicks: quicks,
      value: range ? (value || []).map(function (v) {
        return _this9.parseDate(v);
      }) : this.parseDate(value),
      showTimePicker: !!value,
      allowSingle: allowSingle,
      handleHover: this.handleHover,
      min: DateFns.toDateWithFormat(min, format, undefined, this.getOptions()),
      max: DateFns.toDateWithFormat(max, format, undefined, this.getOptions()),
      hourStep: hourStep,
      minuteStep: minuteStep,
      secondStep: secondStep,
      disabledTime: disabledTime,
      disabledRegister: this.disabledRegister,
      timeZone: timeZone
    }, this.props.children);
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        range = _this$props8.range,
        size = _this$props8.size,
        disabled = _this$props8.disabled,
        align = _this$props8.align,
        innerTitle = _this$props8.innerTitle;
    var focus = this.state.focus;
    var rtl = isRTL();
    var className = datepickerClass('inner', range && 'range', size && "size-" + size, focus && 'focus', disabled === true && 'disabled', align && "align-" + align, getCurrentPosition(this.state.position), rtl && 'rtl', innerTitle && 'inner-title');
    return React.createElement("div", {
      // eslint-disable-next-line
      tabIndex: disabled === true ? -1 : 0,
      className: className,
      onFocus: this.handleFocus,
      "data-id": this.pickerId,
      ref: this.bindElement,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown
    }, this.renderResult(), this.renderWrappedPicker());
  };

  return Container;
}(PureComponent);

Container.propTypes = {
  clearable: PropTypes.bool,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  format: PropTypes.string,
  formatResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  inputable: PropTypes.bool,
  placeholder: PropTypes.any,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  position: PropTypes.string,
  range: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  size: PropTypes.string,
  type: PropTypes.string,
  allowSingle: PropTypes.bool,
  defaultTime: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.array]),
  absolute: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onValueBlur: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  quickSelect: PropTypes.array,
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  defaultRangeMonth: PropTypes.array,
  defaultPickerValue: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  onPickerChange: PropTypes.func,
  disabledTime: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  clearWithUndefined: PropTypes.bool,
  innerTitle: PropTypes.node,
  timeZone: PropTypes.string
};
Container.defaultProps = {
  clearable: true,
  placeholder: React.createElement("span", null, "\xA0"),
  type: 'date',
  allowSingle: false
};
export default Container;