"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _is = require("../utils/is");

var _Tree = _interopRequireDefault(require("../Tree"));

var _component = require("../component");

var _proptypes = require("../utils/proptypes");

var _uid = require("../utils/uid");

var _styles = require("./styles");

var _Result = _interopRequireDefault(require("./Result"));

var _AbsoluteList = _interopRequireDefault(require("../AnimationList/AbsoluteList"));

var _document = require("../utils/dom/document");

var _element = require("../utils/dom/element");

var _AnimationList = _interopRequireDefault(require("../AnimationList"));

var _locale = require("../locale");

var _config = require("../config");

var _classname = require("../utils/classname");

var ScaleList = (0, _AnimationList.default)(['fade', 'scale-y'], 'fast');
var OptionList = (0, _AbsoluteList.default)(function (_ref) {
  var focus = _ref.focus,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["focus"]);
  return _react.default.createElement(ScaleList, (0, _extends2.default)({
    show: focus
  }, other));
});

var isDescendent = function isDescendent(el, id) {
  if (el.getAttribute('data-id') === id) return true;
  if (!el.parentElement) return false;
  return isDescendent(el.parentElement, id);
};

var TreeSelect =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(TreeSelect, _PureComponent);

  function TreeSelect(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      focus: false,
      position: 'drop-down'
    };
    _this.treeSelectId = "treeSelect_" + (0, _uid.getUidStr)();
    _this.onExpandHandler = _this.onExpandHandler.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getResetPosition = _this.getResetPosition.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setInputReset = _this.setInputReset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderActive = _this.renderActive.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderItem = _this.renderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClick = _this.handleState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBlur = _this.handleState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleClear = _this.handleClear.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClickAway = _this.handleClickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.shouldFocus = _this.shouldFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getDataByValues = _this.getDataByValues.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    var componentRef = {
      getDataByValues: _this.getDataByValues
    };

    if (props.getComponentRef) {
      if ((0, _is.isFunc)(props.getComponentRef)) {
        props.getComponentRef(componentRef);
      } else {
        props.getComponentRef.current = componentRef;
      }
    }

    return _this;
  }

  var _proto = TreeSelect.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _this$props = this.props,
        onFilter = _this$props.onFilter,
        datum = _this$props.datum,
        mode = _this$props.mode;
    datum.mode = mode; // clear filter

    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(function () {
        onFilter('', 'blur');
      }, 400);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.clearClickAway();
  };

  _proto.onExpandHandler = function onExpandHandler() {
    var _this2 = this;

    if (this.resetAbsoluteListPosition) {
      setTimeout(function () {
        _this2.resetAbsoluteListPosition(true);
      });
    }

    if (this.props.onExpand) {
      var _this$props2;

      (_this$props2 = this.props).onExpand.apply(_this$props2, arguments);
    }
  };

  _proto.getText = function getText(key) {
    return this.props.empty || (0, _locale.getLocale)(key);
  };

  _proto.setInputReset = function setInputReset(fn) {
    this.inputReset = fn;
  };

  _proto.getValue = function getValue() {
    var _this$props3 = this.props,
        datum = _this$props3.datum,
        multiple = _this$props3.multiple;
    var value = datum.getValue();
    if (multiple) return value;
    return value.length ? value[0] : '';
  };

  _proto.getDataByValue = function getDataByValue(value) {
    if (value === null || value === undefined) return value;
    var _this$props4 = this.props,
        datum = _this$props4.datum,
        multiple = _this$props4.multiple;

    if (multiple) {
      return value.map(function (id) {
        return datum.getDataById(id);
      });
    }

    return datum.getDataById(value);
  };

  _proto.getDataByValues = function getDataByValues(values) {
    var datum = this.props.datum;

    if ((0, _is.isArray)(values)) {
      return values.map(function (id) {
        return datum.getDataById(id);
      });
    }

    return datum.getDataById(values);
  };

  _proto.getResetPosition = function getResetPosition(update) {
    this.resetAbsoluteListPosition = update;
  };

  _proto.bindElement = function bindElement(el) {
    this.element = el;
  };

  _proto.shouldFocus = function shouldFocus(el) {
    if (el.getAttribute('data-id') === this.treeSelectId) return true;
    if ((0, _element.getParent)(el, "." + (0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('result')))) return true;
    return false;
  };

  _proto.bindClickAway = function bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway);
  };

  _proto.clearClickAway = function clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway);
  };

  _proto.handleClickAway = function handleClickAway(e) {
    var desc = isDescendent(e.target, this.treeSelectId);

    if (!desc) {
      this.clearClickAway();
      this.props.onBlur();
      this.handleState(false, e);
    }
  };

  _proto.handleState = function handleState(focus, e) {
    if (this.props.disabled === true) return;
    if (focus === this.state.focus) return; // click close icon

    if (focus && e && e.target.classList.contains((0, _styles.treeSelectClass)('close'))) return;
    var _this$props5 = this.props,
        height = _this$props5.height,
        onCollapse = _this$props5.onCollapse;
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
      this.bindClickAway(); // onFocus()
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    if (!this.shouldFocus(e.target)) return;
    this.props.onFocus(e);
    this.bindClickAway();
  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    var onEnterExpand = this.props.onEnterExpand;

    if (e.keyCode === 13) {
      e.preventDefault(); // enter only can open

      if (!this.state.focus) {
        if (typeof onEnterExpand === 'function') {
          var canOpen = onEnterExpand(e);
          if (canOpen === false) return;
        }

        this.handleState(true);
      }
    } // fot close the list


    if (e.keyCode === 9) {
      this.props.onBlur(); // e.preventDefault()

      if (this.state.focus) {
        this.handleState(false, e, true);
      } else {
        this.clearClickAway();
      }
    }
  };

  _proto.handleRemove = function handleRemove(data) {
    var datum = this.props.datum;
    var dataKey = data && datum.isUnMatch(data) ? data.value : datum.getKey(data);
    datum.set(dataKey, 0);
    this.handleChange(data, datum.getKey(data));
  };

  _proto.handleChange = function handleChange(data, id) {
    var _this$props6 = this.props,
        datum = _this$props6.datum,
        multiple = _this$props6.multiple,
        disabled = _this$props6.disabled,
        onChange = _this$props6.onChange,
        onChangeAddition = _this$props6.onChangeAddition;
    if (disabled === true || datum.isDisabled(id)) return;
    var current = datum.getDataById(id);

    if (!multiple) {
      datum.setValue([]);
      datum.set(datum.getKey(data), 1);
      this.handleState(false);
    }

    var value = this.getValue();
    onChange(value, current, id && datum.getPath(id).path);

    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: this.getDataByValue(value),
        checked: multiple ? datum.get(id) : undefined,
        current: current
      });
    }
  };

  _proto.handleClear = function handleClear() {
    var _this$props7 = this.props,
        multiple = _this$props7.multiple,
        onChangeAddition = _this$props7.onChangeAddition;
    this.props.datum.setValue([]);
    this.props.onChange(multiple ? [] : '');

    if (typeof onChangeAddition === 'function') {
      onChangeAddition({
        data: multiple ? [] : null
      });
    }

    this.handleState(false);
    this.element.focus();
  };

  _proto.renderItem = function renderItem(data, index) {
    var renderItem = this.props.renderItem;
    return typeof renderItem === 'function' ? renderItem(data, index) : data[renderItem];
  };

  _proto.renderActive = function renderActive(data, expanded, active, id) {
    var _this$props8 = this.props,
        renderItem = _this$props8.renderItem,
        datum = _this$props8.datum;
    var item = typeof renderItem === 'function' ? renderItem(data, expanded, active, id) : data[renderItem];
    return _react.default.createElement("span", {
      title: typeof item === 'string' ? item : undefined,
      className: (0, _styles.treeSelectClass)('content-wrapper', active && 'selected', datum.isDisabled(datum.getKey(data)) && (0, _classname.getDirectionClass)('disabled'))
    }, item);
  };

  _proto.renderTreeOptions = function renderTreeOptions() {
    var _this3 = this;

    var _this$state = this.state,
        focus = _this$state.focus,
        position = _this$state.position;
    var _this$props9 = this.props,
        multiple = _this$props9.multiple,
        datum = _this$props9.datum,
        data = _this$props9.data,
        absolute = _this$props9.absolute,
        height = _this$props9.height,
        zIndex = _this$props9.zIndex,
        compressed = _this$props9.compressed,
        value = _this$props9.value;
    var props = {};
    ['mode', 'data', 'datum', 'defaultExpanded', 'defaultExpandAll', 'disabled', 'expanded', 'keygen', 'loader', 'onExpand', 'renderItem', 'line', 'parentClickExpand', 'childrenKey', 'expandIcons'].forEach(function (k) {
      props[k] = _this3.props[k];
    });
    props.value = datum.getValue();

    if (multiple) {
      props.onChange = this.handleChange;
    } else {
      props.onClick = this.handleChange;
      props.renderItem = this.renderActive;
      props.active = props.value.length ? props.value[0] : null;
    }

    var content = data.length === 0 ? _react.default.createElement("span", {
      className: (0, _styles.treeSelectClass)((0, _classname.getDirectionClass)('option'))
    }, this.getText('noData')) : _react.default.createElement(_Tree.default, (0, _extends2.default)({
      className: (0, _styles.treeSelectClass)(!multiple && 'single')
    }, props, {
      dataUpdate: false,
      onExpand: this.onExpandHandler
    }));
    return _react.default.createElement(OptionList, {
      getResetPosition: this.getResetPosition,
      absolute: absolute,
      rootClass: (0, _styles.treeSelectClass)(position, (0, _config.isRTL)() && 'rtl'),
      parentElement: this.element,
      position: position,
      focus: focus,
      "data-id": this.treeSelectId,
      className: (0, _styles.treeSelectClass)('options'),
      style: {
        maxHeight: height,
        overflowY: 'auto'
      },
      fixed: "min",
      zIndex: zIndex,
      value: multiple && !compressed ? value : undefined
    }, _react.default.createElement("div", {
      className: (0, _styles.treeSelectClass)('tree-wrapper')
    }, content));
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        placeholder = _this$props10.placeholder,
        onFilter = _this$props10.onFilter,
        compressed = _this$props10.compressed,
        compressedBound = _this$props10.compressedBound,
        multiple = _this$props10.multiple,
        datum = _this$props10.datum,
        clearable = _this$props10.clearable,
        disabled = _this$props10.disabled,
        size = _this$props10.size,
        filterText = _this$props10.filterText,
        result = _this$props10.result,
        renderUnmatched = _this$props10.renderUnmatched,
        innerTitle = _this$props10.innerTitle,
        keygen = _this$props10.keygen,
        data = _this$props10.data;
    var className = (0, _styles.treeSelectClass)('inner', size, this.state.focus && 'focus', this.state.position, multiple && 'multiple', disabled === true && (0, _classname.getDirectionClass)('disabled'));
    var renderResult = this.props.renderResult || this.renderItem;
    return _react.default.createElement("div", {
      // eslint-disable-next-line
      tabIndex: disabled === true ? -1 : 0,
      ref: this.bindElement,
      className: className,
      "data-id": this.treeSelectId,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick
    }, _react.default.createElement(_Result.default, {
      filterText: filterText,
      onClear: clearable ? this.handleClear : undefined,
      onRemove: this.handleRemove,
      onFilter: onFilter,
      result: result,
      disabled: disabled,
      datum: datum,
      focus: this.state.focus,
      multiple: multiple,
      placeholder: placeholder,
      renderResult: renderResult,
      setInputReset: this.setInputReset,
      compressed: compressed,
      compressedBound: compressedBound,
      renderUnmatched: renderUnmatched,
      innerTitle: innerTitle,
      keygen: keygen,
      data: data
    }), this.renderTreeOptions());
  };

  return TreeSelect;
}(_component.PureComponent);

exports.default = TreeSelect;
TreeSelect.propTypes = (0, _objectSpread2.default)({}, (0, _proptypes.getProps)(_propTypes.default, 'placehodler', 'keygen'), {
  value: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.any]),
  getComponentRef: _propTypes.default.func,
  clearable: _propTypes.default.bool,
  data: _propTypes.default.array,
  datum: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  filterText: _propTypes.default.string,
  renderResult: _propTypes.default.func,
  height: _propTypes.default.number,
  multiple: _propTypes.default.bool,
  position: _propTypes.default.string,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  result: _propTypes.default.array,
  size: _propTypes.default.string,
  defaultExpanded: _propTypes.default.arrayOf(_propTypes.default.string),
  expanded: _propTypes.default.arrayOf(_propTypes.default.string),
  loader: _propTypes.default.func,
  mode: _propTypes.default.oneOf([0, 1, 2, 3, 4]),
  line: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onExpand: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  empty: _propTypes.default.string,
  compressed: _propTypes.default.bool,
  compressedBound: _propTypes.default.number,
  absolute: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  parentClickExpand: _propTypes.default.bool,
  zIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  renderUnmatched: _propTypes.default.func,
  onCollapse: _propTypes.default.func,
  onChangeAddition: _propTypes.default.func,
  innerTitle: _propTypes.default.node
});
TreeSelect.defaultProps = {
  clearable: false,
  compressed: false,
  absolute: false,
  multiple: false,
  line: false,
  renderItem: function renderItem(e) {
    return e;
  },
  height: 300,
  data: [],
  defaultExpanded: []
};