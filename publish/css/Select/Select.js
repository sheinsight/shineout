"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _types = require("../Datum/types");

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _Result = _interopRequireDefault(require("./Result"));

var _OptionList = _interopRequireDefault(require("./OptionList"));

var _OptionTree = _interopRequireDefault(require("./OptionTree"));

var _BoxList = _interopRequireDefault(require("./BoxList"));

var _is = require("../utils/is");

var _document = require("../utils/dom/document");

var _element = require("../utils/dom/element");

var _config = require("../config");

var _AbsoluteList = _interopRequireDefault(require("../AnimationList/AbsoluteList"));

var _classname = require("../utils/classname");

var WrappedOptionList = (0, _AbsoluteList.default)(_OptionList.default);
var WrappedBoxList = (0, _AbsoluteList.default)(_BoxList.default);
var WrappedOptionTree = (0, _AbsoluteList.default)(_OptionTree.default);

var isResult = function isResult(el, selector) {
  return (0, _element.getParent)(el, selector || "." + (0, _styles.selectClass)('result'));
};

var Select =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Select, _PureComponent);

  function Select(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "forceChange", function () {
      if (_this.inputBlurTimer && _this.blurHandler) {
        clearTimeout(_this.inputBlurTimer);

        _this.blurHandler();
      }
    });
    _this.state = {
      control: 'mouse',
      focus: false,
      position: 'drop-down'
    };
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindOptionFunc = _this.bindOptionFunc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setInputReset = _this.setInputReset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.shouldFocus = _this.shouldFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBlur = _this.handleState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleClear = _this.handleClear.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRemove = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleInputFocus = _this.handleInputFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleControlChange = _this.handleControlChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClickAway = _this.handleClickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleInputBlur = _this.handleInputBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindFocusInputFunc = _this.bindFocusInputFunc.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFilter = _this.handleFilter.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // this.toInputTriggerCollapse = this.toInputTriggerCollapse.bind(this)

    _this.renderItem = _this.renderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderResult = _this.renderResult.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleDelete = _this.handleDelete.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // option list not render till first focused

    _this.renderPending = true;
    _this.optionList = {};
    _this.selectId = "select_" + (0, _uid.getUidStr)(); // this.closeByResult = false

    _this.mouseDown = false;
    _this.lastResult = undefined;
    _this.focusInput = null;
    return _this;
  }

  var _proto = Select.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    var formDatum = this.props.formDatum;

    if (formDatum) {
      formDatum.subscribe(_types.SUBMIT_TOPIC, this.forceChange);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var onFilter = this.props.onFilter; // clear filter

    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(function () {
        onFilter('', 'blur');
      }, 400);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    var formDatum = this.props.formDatum;

    if (formDatum) {
      formDatum.unsubscribe(_types.SUBMIT_TOPIC, this.forceChange);
    }

    this.clearClickAway();
  };

  _proto.getDisabledStatus = function getDisabledStatus() {
    if (typeof this.props.disabled === 'function') {
      return this.props.disabled;
    }

    return !!this.props.disabled;
  };

  _proto.getFocusSelected = function getFocusSelected() {
    var _this$props = this.props,
        reFocus = _this$props.reFocus,
        focusSelected = _this$props.focusSelected;
    if (reFocus) return false;
    return focusSelected;
  };

  _proto.setInputReset = function setInputReset(fn) {
    this.inputReset = fn;
  };

  _proto.isDescendent = function isDescendent(el, id) {
    // const stay = el.classList.contains(selectClass('input')) || el.classList.contains(selectClass('item'))
    // if (stay) this.optionsHold = true
    // if (el.classList.contains(selectClass('result')) && this.optionsHold === null && this.state.focus) {
    //   this.closeByResult = true
    //   this.optionsHold = false
    // }
    if (el.getAttribute('data-id') === id) return true; // in label

    if (el.tagName === 'LABEL' && el.htmlFor && el.contains(this.element) && el.contains(document.getElementById(el.htmlFor))) {
      return true;
    }

    if (!el.parentElement) return false;
    return this.isDescendent(el.parentElement, id);
  };

  _proto.bindOptionFunc = function bindOptionFunc(name, fn) {
    this.optionList[name] = fn;
  };

  _proto.bindFocusInputFunc = function bindFocusInputFunc(fn) {
    this.focusInput = fn;
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.bindClickAway = function bindClickAway() {
    document.addEventListener('click', this.handleClickAway, true);
  };

  _proto.clearClickAway = function clearClickAway() {
    document.removeEventListener('click', this.handleClickAway, true);
  };

  _proto.handleClickAway = function handleClickAway(e) {
    var desc = this.isDescendent(e.target, this.selectId);

    if (!desc) {
      if (!(0, _element.getParent)(e.target, "[data-id=" + this.selectId + "]")) {
        this.blured = true;
        this.props.onBlur();
        this.clearClickAway();
        if (this.element) this.element.blur();
      }

      this.handleState(false, null);
    }
  };

  _proto.handleClick = function handleClick(e) {
    var _this$props2 = this.props,
        onCreate = _this$props2.onCreate,
        onFilter = _this$props2.onFilter;
    var plain = !onCreate && !onFilter;

    if (this.state.focus) {
      if (plain && isResult(e.target) || isResult(e.target, "." + (0, _styles.selectClass)('caret'))) {
        this.handleState(false, e);
        return;
      }
    }

    this.handleState(true, e);
  };

  _proto.handleState = function handleState(focus, e) {
    if (this.getDisabledStatus() === true) return;
    if (focus === this.state.focus) return; // click close icon

    if (focus && e && e.target.classList.contains((0, _styles.selectClass)('close'))) return;
    var _this$props3 = this.props,
        height = _this$props3.height,
        onCollapse = _this$props3.onCollapse;
    var position = this.props.position;
    var windowHeight = _document.docSize.height;
    var bottom = height + this.element.getBoundingClientRect().bottom;
    if (bottom > windowHeight && !position) position = 'drop-up';
    if (onCollapse) onCollapse(focus);
    this.setState({
      focus: focus,
      position: position || 'drop-down'
    });

    if (focus) {
      this.blured = false;
      this.renderPending = false;
    }
  };

  _proto.handleControlChange = function handleControlChange(control) {
    if (control !== this.state.control) this.setState({
      control: control
    });
  };

  _proto.handleChange = function handleChange(_, data, fromInput) {
    var _this2 = this;

    var _this$props4 = this.props,
        datum = _this$props4.datum,
        multiple = _this$props4.multiple,
        emptyAfterSelect = _this$props4.emptyAfterSelect,
        onFilter = _this$props4.onFilter,
        filterText = _this$props4.filterText,
        onCreate = _this$props4.onCreate,
        reFocus = _this$props4.reFocus;
    if (this.getDisabledStatus() === true) return; // if click option, ignore blur event

    if (this.inputBlurTimer) {
      this.lastChangeIsOptionClick = true;
      clearTimeout(this.inputBlurTimer);
      this.inputBlurTimer = null;
    }

    if (multiple) {
      if ((0, _is.isObject)(data) && data.IS_NOT_MATCHED_VALUE) {
        datum.remove(data);
      } else {
        var checked = !datum.check(data);

        if (checked) {
          datum.add(data);
        } else {
          if (fromInput === true) return;
          datum.remove(data);
        }

        if (this.inputReset) this.inputReset();
      }
    } else {
      datum.set(data);
      if (!reFocus) this.handleState(false); //  let the element focus

      setTimeout(function () {
        if (reFocus && _this2.focusInput) _this2.focusInput(true);
        if (onCreate && _this2.blured) return;
        if (_this2.element) _this2.element.focus();
      }, 10);
    }

    if (emptyAfterSelect && onFilter && filterText) onFilter('', 'select');
  } // toInputTriggerCollapse(text) {
  //   const { onCreate, datum } = this.props
  //   if (onCreate) {
  //     datum.set(onCreate(text))
  //   }
  //   this.handleState(true)
  // }
  ;

  _proto.shouldFocus = function shouldFocus(el) {
    if (el.getAttribute('data-id') === this.selectId) return true;
    if ((0, _element.getParent)(el, "." + (0, _styles.selectClass)('result'))) return true;
    return false;
  };

  _proto.handleFocus = function handleFocus(e) {
    if (!this.shouldFocus(e.target)) return;
    this.props.onFocus(e);
    this.bindClickAway();
  };

  _proto.handleInputFocus = function handleInputFocus() {
    var _this$props5 = this.props,
        hideCreateOption = _this$props5.hideCreateOption,
        onCreate = _this$props5.onCreate;
    this.inputLocked = true;
    var noHover = onCreate && hideCreateOption;

    if (this.props.inputable && this.state.control === 'keyboard' && !noHover) {
      if (this.optionList.handleHover) this.optionList.handleHover(0, true);
    }
  };

  _proto.handleInputBlur = function handleInputBlur(text) {
    var _this3 = this;

    var _this$props6 = this.props,
        onFilter = _this$props6.onFilter,
        onCreate = _this$props6.onCreate,
        multiple = _this$props6.multiple,
        filterSingleSelect = _this$props6.filterSingleSelect,
        data = _this$props6.data;

    if (onFilter && text && filterSingleSelect && data.length === 1) {
      this.handleChange(null, data[0], false);
      return;
    }

    if (!onCreate) return;
    if (multiple && !text) return;
    if (this.lastChangeIsOptionClick) return;

    this.blurHandler = function () {
      var retData = onCreate(text);

      _this3.handleChange(null, retData, true);
    }; // if click option, ignore input blur


    this.inputBlurTimer = setTimeout(function () {
      _this3.blurHandler();

      _this3.blurHandler = null;
    }, 200);
  };

  _proto.handleClear = function handleClear() {
    this.props.datum.setValue([]);
    this.element.focus();

    if (this.state.focus === false) {
      this.forceUpdate();
    } else {
      this.handleState(false);
    }
  };

  _proto.handleHideOption = function handleHideOption() {
    var _this$props7 = this.props,
        datum = _this$props7.datum,
        innerData = _this$props7.innerData;
    var checked = datum.check(innerData);

    if (checked) {
      if (this.inputReset) this.inputReset();
      return;
    }

    this.handleChange(true, innerData);
  };

  _proto.handleEnter = function handleEnter() {
    var _this$props8 = this.props,
        onCreate = _this$props8.onCreate,
        hideCreateOption = _this$props8.hideCreateOption;
    var hoverIndex = this.optionList.getIndex && this.optionList.getIndex();

    if (onCreate && hideCreateOption && hoverIndex === -1) {
      this.handleHideOption();
      return;
    }

    var data = this.props.data[hoverIndex];

    if (!data) {
      // eslint-disable-next-line prefer-destructuring
      data = this.props.data[0];
    }

    if (data && !data[this.props.groupKey]) {
      var checked = !this.props.datum.check(data);
      this.handleChange(checked, data);
      if (this.optionList.handleHover) this.optionList.handleHover(hoverIndex);
    }
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    var onEnterExpand = this.props.onEnterExpand;
    this.keyLocked = true; // just for enter to open the list

    if ((e.keyCode === 13 || e.keyCode === 40) && !this.state.focus) {
      e.preventDefault();

      if (typeof onEnterExpand === 'function') {
        var canOpen = onEnterExpand(e);
        if (canOpen === false) return;
      }

      this.handleClick(e);
      return;
    } // fot close the list


    if (e.keyCode === 9) {
      this.props.onBlur(e); // e.preventDefault()

      if (this.state.focus) this.handleState(false, e);else this.clearClickAway();
      return;
    } // no focus no event


    if (!this.state.focus) return;
    this.handleControlChange('keyboard');

    switch (e.keyCode) {
      case 38:
        if (this.optionList.hoverMove) this.optionList.hoverMove(-1);
        e.preventDefault();
        break;

      case 40:
        if (this.optionList.hoverMove) this.optionList.hoverMove(1);
        e.preventDefault();
        break;

      case 13:
        this.handleEnter();
        e.preventDefault();
        e.stopPropagation();
        break;

      case 8:
        this.handleDelete(e);
        break;

      default:
        this.lastChangeIsOptionClick = false;
    }
  };

  _proto.handleKeyUp = function handleKeyUp() {
    this.keyLocked = false;
  };

  _proto.cancelDeleteLock = function cancelDeleteLock() {
    var _this4 = this;

    if (this.cancelDeleteLockTimer) {
      clearTimeout(this.cancelDeleteLockTimer);
    }

    this.cancelDeleteLockTimer = setTimeout(function () {
      _this4.deleteLock = false;
    }, 400);
  };

  _proto.handleDelete = function handleDelete(e) {
    var _this$props9 = this.props,
        multiple = _this$props9.multiple,
        inputText = _this$props9.inputText,
        datum = _this$props9.datum,
        value = _this$props9.value,
        data = _this$props9.data;
    if (!multiple) return;

    if (inputText) {
      this.deleteLock = true;
    } else if (this.deleteLock) {
      this.cancelDeleteLock();
    }

    if (inputText || this.deleteLock) return;
    if (!value || !value.length) return;
    e.preventDefault();
    var raws = Array.isArray(value) ? value : [value];
    var values = [].concat(raws);
    var last = values.pop();
    datum.handleChange(values, datum.getDataByValue(data, last), false);
  };

  _proto.handleFilter = function handleFilter() {
    var _this$props10 = this.props,
        onFilter = _this$props10.onFilter,
        onCreate = _this$props10.onCreate,
        hideCreateOption = _this$props10.hideCreateOption;
    var hideCreate = onCreate && hideCreateOption;

    if (hideCreate) {
      this.optionList.handleHover(-1, true);
    }

    if (onFilter) {
      onFilter.apply(void 0, arguments);
    }
  };

  _proto.renderItem = function renderItem(data, index) {
    var renderItem = this.props.renderItem;
    return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem];
  };

  _proto.renderResult = function renderResult(data, index) {
    var renderResult = this.props.renderResult;
    if (!renderResult) return this.renderItem(data, index);
    return typeof renderResult === 'function' ? renderResult(data, index) : data[renderResult];
  }
  /**
   * custom options list header
   */
  ;

  _proto.renderCustomHeader = function renderCustomHeader() {
    var header = this.props.header;
    if (_react.default.isValidElement(header)) return _react.default.createElement("div", {
      className: (0, _styles.selectClass)('custom-header')
    }, header);
    return null;
  };

  _proto.renderTree = function renderTree() {
    var _this5 = this;

    var _this$state = this.state,
        focus = _this$state.focus,
        position = _this$state.position;
    var optionWidth = this.props.optionWidth;
    var props = {};
    ['treeData', 'expanded', 'onExpand', 'loader', 'defaultExpanded', 'defaultExpandAll', 'datum', 'keygen', 'multiple', 'text', 'height', 'loading', 'onFilter', 'filterText', 'absolute', 'zIndex', 'childrenKey', 'expandIcons', 'emptyText', 'renderOptionList'].forEach(function (k) {
      props[k] = _this5.props[k];
    });
    var style = optionWidth && {
      width: optionWidth
    };
    props.renderItem = this.renderItem;
    return _react.default.createElement(WrappedOptionTree, (0, _extends2.default)({
      onChange: this.handleChange,
      parentElement: this.element,
      position: position,
      rootClass: (0, _styles.selectClass)(position, (0, _config.isRTL)() && 'rtl'),
      selectId: this.selectId,
      focus: focus,
      renderPending: this.renderPending,
      fixed: "min"
    }, props, {
      style: style,
      customHeader: this.renderCustomHeader()
    }));
  };

  _proto.renderList = function renderList() {
    var _this6 = this;

    var _this$state2 = this.state,
        focus = _this$state2.focus,
        control = _this$state2.control,
        position = _this$state2.position;
    var _this$props11 = this.props,
        autoAdapt = _this$props11.autoAdapt,
        value = _this$props11.value,
        optionWidth = _this$props11.optionWidth;
    var props = {};
    ['data', 'datum', 'keygen', 'multiple', 'columns', 'columnWidth', 'columnsTitle', 'text', 'itemsInView', 'absolute', 'lineHeight', 'height', 'loading', 'onFilter', 'filterText', 'zIndex', 'groupKey', 'hideCreateOption', 'emptyText', 'renderOptionList'].forEach(function (k) {
      props[k] = _this6.props[k];
    });
    var List = props.columns >= 1 || props.columns === -1 ? WrappedBoxList : WrappedOptionList;
    var style = optionWidth && {
      width: optionWidth
    };
    return _react.default.createElement(List, (0, _extends2.default)({}, props, {
      style: style,
      rootClass: (0, _styles.selectClass)(position, (0, _config.isRTL)() && 'rtl'),
      autoClass: (0, _styles.selectClass)(autoAdapt && 'auto-adapt'),
      bindOptionFunc: this.bindOptionFunc,
      renderPending: this.renderPending,
      focus: focus,
      control: control,
      selectId: this.selectId,
      onControlChange: this.handleControlChange,
      onChange: this.handleChange,
      renderItem: this.renderItem,
      parentElement: this.element,
      position: position,
      onBlur: this.handleBlur,
      fixed: autoAdapt ? 'min' : true,
      value: value,
      customHeader: this.renderCustomHeader()
    }));
  };

  _proto.renderOptions = function renderOptions() {
    var treeData = this.props.treeData;
    if (treeData) return this.renderTree();
    return this.renderList();
  };

  _proto.render = function render() {
    var _this$props12 = this.props,
        placeholder = _this$props12.placeholder,
        multiple = _this$props12.multiple,
        clearable = _this$props12.clearable,
        size = _this$props12.size,
        datum = _this$props12.datum,
        filterText = _this$props12.filterText,
        onCreate = _this$props12.onCreate,
        result = _this$props12.result,
        compressed = _this$props12.compressed,
        compressedBound = _this$props12.compressedBound,
        trim = _this$props12.trim,
        renderUnmatched = _this$props12.renderUnmatched,
        showArrow = _this$props12.showArrow,
        compressedClassName = _this$props12.compressedClassName,
        resultClassName = _this$props12.resultClassName,
        maxLength = _this$props12.maxLength,
        innerTitle = _this$props12.innerTitle,
        keygen = _this$props12.keygen,
        convertBr = _this$props12.convertBr,
        data = _this$props12.data,
        onFilter = _this$props12.onFilter,
        treeData = _this$props12.treeData;
    var disabled = this.getDisabledStatus();
    var className = (0, _styles.selectClass)('inner', size, this.state.focus && 'focus', this.state.position, multiple && 'multiple', disabled === true && (0, _classname.getDirectionClass)('disabled'), !trim && 'pre');
    return _react.default.createElement("div", {
      // eslint-disable-next-line
      tabIndex: disabled === true ? -1 : 0,
      ref: this.bindElement,
      className: className,
      "data-id": this.selectId,
      onFocus: this.handleFocus,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      onKeyUp: this.handleKeyUp
    }, _react.default.createElement(_Result.default, {
      trim: trim,
      maxLength: maxLength,
      filterText: filterText,
      onClear: clearable ? this.handleClear : undefined,
      onCreate: onCreate,
      onRemove: this.handleRemove,
      onFilter: onFilter && this.handleFilter,
      datum: datum,
      disabled: disabled,
      focus: this.state.focus,
      result: result,
      multiple: multiple,
      placeholder: placeholder,
      renderResult: this.renderResult,
      renderUnmatched: renderUnmatched,
      onInputBlur: this.handleInputBlur,
      onInputFocus: this.handleInputFocus,
      setInputReset: this.setInputReset,
      bindFocusInputFunc: this.bindFocusInputFunc // collapse={this.toInputTriggerCollapse}
      ,
      compressed: compressed,
      compressedBound: compressedBound,
      showArrow: showArrow,
      focusSelected: this.getFocusSelected(),
      compressedClassName: compressedClassName,
      resultClassName: resultClassName,
      innerTitle: innerTitle,
      keygen: keygen,
      data: treeData || data,
      convertBr: convertBr
    }), this.renderOptions());
  };

  return Select;
}(_component.PureComponent);

Select.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'placehodler', 'keygen'), {
  absolute: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  clearable: _propTypes.default.bool,
  columns: _propTypes.default.number,
  data: _propTypes.default.array,
  treeData: _propTypes.default.array,
  datum: _propTypes.default.object.isRequired,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  filterText: _propTypes.default.string,
  height: _propTypes.default.number,
  itemsInView: _propTypes.default.number,
  lineHeight: _propTypes.default.number,
  loading: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.bool]),
  multiple: _propTypes.default.bool,
  onBlur: _propTypes.default.func,
  onCreate: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  position: _propTypes.default.string,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  result: _propTypes.default.array,
  size: _propTypes.default.string,
  text: _propTypes.default.object,
  compressed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  compressedBound: _propTypes.default.number,
  trim: _propTypes.default.bool,
  autoAdapt: _propTypes.default.bool,
  filterSingleSelect: _propTypes.default.bool,
  renderUnmatched: _propTypes.default.func,
  emptyAfterSelect: _propTypes.default.bool,
  showArrow: _propTypes.default.bool,
  focusSelected: _propTypes.default.bool,
  compressedClassName: _propTypes.default.string,
  onCollapse: _propTypes.default.func,
  resultClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  reFocus: _propTypes.default.bool,
  header: _propTypes.default.node,
  maxLength: _propTypes.default.number,
  innerTitle: _propTypes.default.node,
  convertBr: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  inputText: _propTypes.default.string,
  renderOptionList: _propTypes.default.func
});
Select.defaultProps = {
  clearable: false,
  data: [],
  height: 250,
  itemsInView: 10,
  lineHeight: 34,
  loading: false,
  multiple: false,
  renderItem: function renderItem(e) {
    return e;
  },
  text: {},
  compressed: false,
  trim: true,
  autoAdapt: false,
  showArrow: true,
  focusSelected: true
};
var _default = Select;
exports.default = _default;