"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _immer = _interopRequireDefault(require("immer"));

var _component = require("../component");

var _styles = require("./styles");

var _styles2 = require("../Input/styles");

var _Icon = _interopRequireDefault(require("./Icon"));

var _utils = _interopRequireDefault(require("./utils"));

var _Picker = _interopRequireDefault(require("./Picker"));

var _Range = _interopRequireDefault(require("./Range"));

var _Text = _interopRequireDefault(require("./Text"));

var _uid = require("../utils/uid");

var _is = require("../utils/is");

var _element = require("../utils/dom/element");

var _AbsoluteList = _interopRequireDefault(require("../AnimationList/AbsoluteList"));

var _document = require("../utils/dom/document");

var _strings = require("../utils/strings");

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _locale = require("../locale");

var _config = require("../config");

var _InputTitle = _interopRequireDefault(require("../InputTitle"));

var _styles3 = require("../InputTitle/styles");

var _classname = require("../utils/classname");

var FadeList = (0, _AnimationList.default)(['fade'], 'fast');
var OptionList = (0, _AbsoluteList.default)(function (_ref) {
  var focus = _ref.focus,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["focus"]);
  return _react.default.createElement(FadeList, (0, _extends2.default)({
    show: focus
  }, other));
});

var getCurrentPosition = function getCurrentPosition(position) {
  if ((0, _config.isRTL)()) {
    return (0, _strings.getRTLPosition)(position);
  }

  return position;
};

var Container =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Container, _PureComponent);

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
    _this.pickerId = "picker_" + (0, _uid.getUidStr)();
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindPicker = _this.bindPicker.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindWrappedPicker = _this.bindWrappedPicker.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindTextSpan = _this.bindTextSpan.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleBlur = _this.handleToggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClear = _this.handleClear.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleHover = _this.handleHover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTextChange = _this.handleTextChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.parseDate = _this.parseDate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.dateToCurrent = _this.dateToCurrent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.shouldFocus = _this.shouldFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDisabled = _this.handleDisabled.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.disabledRegister = _this.disabledRegister.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindClickAway = _this.bindClickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearClickAway = _this.clearClickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClickAway = _this.handleClickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getDefaultTime = _this.getDefaultTime.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getQuick = _this.getQuick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
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
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
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
        if (_utils.default.isInvalid(v)) v = _utils.default.newDate(defaultPickerRange[i], _this2.getOptions());
        return v;
      });
      if (current.length === 0) current = [_utils.default.newDate(defaultPickerRange[0], this.getOptions()), _utils.default.newDate(defaultPickerRange[1], this.getOptions())];
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
        return _utils.default.toDateWithFormat(v, format, undefined, _this3.getOptions());
      });
      if (_utils.default.isInvalid(date[0])) invalid = true;
      if (date[1] && _utils.default.isInvalid(date[1])) invalid = true;
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
    if ((0, _is.isArray)(defaultTime)) return defaultTime;
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
    return _utils.default.toDateWithFormat(value, this.getFormat(), undefined, this.getOptions());
  };

  _proto.bindClickAway = function bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway);
  };

  _proto.clearClickAway = function clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway);
  };

  _proto.shouldFocus = function shouldFocus(el) {
    if (el.getAttribute('data-id') === this.pickerId) return true;
    if ((0, _element.getParent)(el, "." + (0, _styles.datepickerClass)('result'))) return true;
    return false;
  };

  _proto.handleClickAway = function handleClickAway(e) {
    var onPicker = e.target === this.element || this.element.contains(e.target);
    var onAbsolutePicker = (0, _element.getParent)(e.target, "." + (0, _styles.datepickerClass)('location'));

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
    if (e && focus && (0, _element.getParent)(e.target, this.pickerContainer)) return; // click close icon

    if (focus && e && e.target.classList.contains((0, _styles.datepickerClass)('close'))) return;
    this.setState((0, _immer.default)(function (state) {
      state.focus = focus;

      if (focus === true) {
        var rect = _this4.element.getBoundingClientRect();

        var windowHeight = _document.docSize.height;
        var windowWidth = _document.docSize.width;
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
    var val = date ? _utils.default.format(date, format, this.getOptions()) : '';
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

    var value = [].concat((0, _immer.default)(this.props.value === undefined && range ? [] : this.props.value, function (draft) {
      draft[index] = val;
    }));
    if (_utils.default.compareAsc(value[0], value[1]) > 0) value.push(value.shift());
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
      return v ? _utils.default.format(v, format, _this6.getOptions()) : v;
    });else value = _utils.default.format(date, format, this.getOptions());
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
    var className = (0, _classnames.default)((0, _styles.datepickerClass)('txt', this.state["picker" + key] && 'text-focus'), _utils.default.isInvalid(date) && (0, _styles2.inputClass)('placeholder'));
    var resultFormat = formatResult || this.getFormat();
    return _react.default.createElement(_Text.default, {
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
      value: _utils.default.isInvalid(date) ? undefined : _utils.default.format(date, resultFormat, this.getOptions()),
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

      return result && _utils.default.isInvalid(date);
    }, true);
    return _react.default.createElement("div", {
      className: (0, _styles.datepickerClass)('result')
    }, _react.default.createElement(_InputTitle.default, {
      className: (0, _styles.datepickerClass)('title-box'),
      contentClass: (0, _styles3.inputTitleClass)('hidable'),
      innerTitle: innerTitle,
      open: !isEmpty || inputable && this.state.focus
    }, range ? [this.renderText(value[0], placeholder[0], 0), _react.default.createElement("span", {
      key: "-",
      className: (0, _styles.datepickerClass)('separate')
    }, "~"), this.renderText(value[1], placeholder[1], 1)] : this.renderText(value, placeholder)), _react.default.createElement(_Icon.default, {
      className: isEmpty || !clearable ? '' : 'indecator',
      name: type === 'time' ? 'Clock' : 'Calendar'
    }), !isEmpty && clearable && _react.default.createElement(_Icon.default, {
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
      className: (0, _styles.datepickerClass)('picker', 'location', "absolute-" + getCurrentPosition(position), quickSelect && (0, _classname.getDirectionClass)('quick')),
      zIndex: zIndex,
      getRef: this.bindWrappedPicker // computed absolute position needed

    };

    if (absolute) {
      props.rootClass = (0, _styles.datepickerClass)('absolute', (0, _config.isRTL)() && 'rtl');
      props.parentElement = this.element;
      props.position = position;
    } else {
      props.position = getCurrentPosition(position);
    }

    return _react.default.createElement(OptionList, props, this.renderPicker());
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
    var Component = range ? _Range.default : _Picker.default;
    return _react.default.createElement(Component, {
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
      min: _utils.default.toDateWithFormat(min, format, undefined, this.getOptions()),
      max: _utils.default.toDateWithFormat(max, format, undefined, this.getOptions()),
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
    var rtl = (0, _config.isRTL)();
    var className = (0, _styles.datepickerClass)('inner', range && 'range', size && "size-" + size, focus && 'focus', disabled === true && 'disabled', align && "align-" + align, getCurrentPosition(this.state.position), rtl && 'rtl', innerTitle && 'inner-title');
    return _react.default.createElement("div", {
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
}(_component.PureComponent);

Container.propTypes = {
  clearable: _propTypes.default.bool,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  format: _propTypes.default.string,
  formatResult: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  inputable: _propTypes.default.bool,
  placeholder: _propTypes.default.any,
  onBlur: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  position: _propTypes.default.string,
  range: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  size: _propTypes.default.string,
  type: _propTypes.default.string,
  allowSingle: _propTypes.default.bool,
  defaultTime: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.object, _propTypes.default.array]),
  absolute: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  zIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  onValueBlur: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  quickSelect: _propTypes.default.array,
  min: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.object]),
  max: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.object]),
  defaultRangeMonth: _propTypes.default.array,
  defaultPickerValue: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.array]),
  hourStep: _propTypes.default.number,
  minuteStep: _propTypes.default.number,
  secondStep: _propTypes.default.number,
  onPickerChange: _propTypes.default.func,
  disabledTime: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  align: _propTypes.default.oneOf(['left', 'right', 'center']),
  clearWithUndefined: _propTypes.default.bool,
  innerTitle: _propTypes.default.node,
  timeZone: _propTypes.default.string
};
Container.defaultProps = {
  clearable: true,
  placeholder: _react.default.createElement("span", null, "\xA0"),
  type: 'date',
  allowSingle: false
};
var _default = Container;
exports.default = _default;