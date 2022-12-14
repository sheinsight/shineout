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

var _immer = _interopRequireDefault(require("immer"));

var _classnames = _interopRequireDefault(require("classnames"));

var _is = require("../utils/is");

var _component = require("../component");

var _uid = require("../utils/uid");

var _Tree = _interopRequireDefault(require("../Datum/Tree"));

var _styles = require("../Select/styles");

var _styles2 = require("./styles");

var _Result = _interopRequireDefault(require("./Result"));

var _List = _interopRequireDefault(require("./List"));

var _FilterList = _interopRequireDefault(require("./FilterList"));

var _document = require("../utils/dom/document");

var _element = require("../utils/dom/element");

var _AbsoluteList = _interopRequireDefault(require("../AnimationList/AbsoluteList"));

var _config = require("../config");

var OptionList = (0, _AbsoluteList.default)(function (_ref) {
  var focus = _ref.focus,
      getRef = _ref.getRef,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["focus", "getRef"]);
  return focus ? _react.default.createElement("div", (0, _extends2.default)({}, other, {
    ref: getRef
  })) : null;
});

var isDescendent = function isDescendent(el, id) {
  if (el.getAttribute('data-id') === id) return true;
  if (!el.parentElement) return false;
  return isDescendent(el.parentElement, id);
};

var Cascader =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Cascader, _PureComponent);

  function Cascader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      focus: false,
      path: [],
      position: 'drop-down'
    };
    _this.datum = new _Tree.default({
      data: props.data,
      loader: props.loader,
      keygen: props.keygen,
      mode: props.mode,
      onChange: props.onChange,
      value: props.value || props.defaultValue,
      disabled: typeof props.disabled === 'function' ? props.disabled : undefined,
      childrenKey: props.childrenKey,
      unmatch: props.unmatch
    });
    _this.isRendered = false;
    _this.selectId = "select_" + (0, _uid.getUidStr)();
    _this.handleClick = _this.handleState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), true);
    _this.handleBlur = _this.handleState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), false);
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClickAway = _this.handleClickAway.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handlePathChange = _this.handlePathChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClear = _this.handleClear.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.shouldFocus = _this.shouldFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindRef = _this.bindRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindInput = _this.bindInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.close = _this.handleBlur;

    if (props.getComponentRef) {
      if ((0, _is.isFunc)(props.getComponentRef)) {
        props.getComponentRef((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      } else {
        props.getComponentRef.current = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
      }
    }

    return _this;
  }

  var _proto = Cascader.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    this.updatePathByValue();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    this.datum.mode = this.props.mode;
    var _this$props = this.props,
        onFilter = _this$props.onFilter,
        filterDataChange = _this$props.filterDataChange,
        filterText = _this$props.filterText;
    if (!filterDataChange && prevProps.data !== this.props.data) this.datum.setData(this.props.data, true);

    if (prevProps.value !== this.props.value) {
      this.datum.setValue(this.props.value || []);
      this.updatePathByValue();
    }

    if (prevState.focus !== this.state.focus && !this.state.focus && onFilter) {
      setTimeout(function () {
        onFilter('');
      }, 400);
    }

    if (filterText !== undefined && prevProps.filterText !== filterText) {
      this.updatePath();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    _PureComponent.prototype.componentWillUnmount.call(this);

    this.clearClickAway();
  };

  _proto.bindRef = function bindRef(el) {
    this.ref = el;
  };

  _proto.bindClickAway = function bindClickAway() {
    document.addEventListener('mousedown', this.handleClickAway);
  };

  _proto.bindInput = function bindInput(input) {
    this.input = input;
  };

  _proto.clearClickAway = function clearClickAway() {
    document.removeEventListener('mousedown', this.handleClickAway);
  };

  _proto.shouldFocus = function shouldFocus(el) {
    if (el.getAttribute('data-id') === this.selectId) return true;
    if ((0, _element.getParent)(el, "." + (0, _styles2.cascaderClass)('result'))) return true;
    return false;
  };

  _proto.updatePath = function updatePath() {
    var _this$props2 = this.props,
        firstMatchNode = _this$props2.firstMatchNode,
        keygen = _this$props2.keygen,
        filterText = _this$props2.filterText;

    if (!filterText || !firstMatchNode) {
      this.setState({
        path: []
      });
      return;
    }

    var key = (0, _uid.getKey)(firstMatchNode, keygen);
    var current = this.datum.getPath(key);
    if (!current) return;
    this.setState((0, _immer.default)(function (draft) {
      draft.path = [].concat(current.path, [key]);
    }));
  };

  _proto.updatePathByValue = function updatePathByValue() {
    var _this$props3 = this.props,
        mode = _this$props3.mode,
        value = _this$props3.value;
    if (mode !== undefined) return;
    if (value === this.lastValue) return;

    if (!value || !value.length) {
      this.setState({
        path: []
      });
    } else {
      var v = value[value.length - 1];
      var data = this.datum.getDataById(v);
      if (data === null) return;

      try {
        var id = this.datum.getKey(data);

        var _ref2 = this.datum.getPath(id) || {},
            path = _ref2.path;

        path = path || [];
        this.handlePathChange(id, null, path);
      } catch (e) {
        console.error(e);
      }
    }
  };

  _proto.handleClickAway = function handleClickAway(e) {
    var desc = isDescendent(e.target, this.selectId);

    if (!desc) {
      this.clearClickAway();
      this.props.onBlur();
      this.handleState(false);
    }
  };

  _proto.handlePathChange = function handlePathChange(id, data, path, fromClick) {
    var _this2 = this;

    var _this$props4 = this.props,
        childrenKey = _this$props4.childrenKey,
        finalDismiss = _this$props4.finalDismiss,
        loader = _this$props4.loader;

    if (fromClick && data) {
      var leaf = !data[childrenKey] || data[childrenKey].length === 0;

      if (loader && typeof loader === 'function' && data[childrenKey] === undefined) {
        leaf = false;
      }

      if (finalDismiss && leaf) this.handleState(false);
    }

    setTimeout(function () {
      _this2.setState({
        path: [].concat(path, [id])
      });
    }, 50);
  };

  _proto.handleFocus = function handleFocus(e) {
    if (!this.shouldFocus(e.target)) return;
    this.props.onFocus(e);
    this.bindClickAway();
  };

  _proto.handleClear = function handleClear() {
    var _this3 = this;

    var mode = this.props.mode;
    this.setState({
      path: []
    });
    if (mode !== undefined) this.datum.setValue([]);
    this.handleChange([]); // force close

    setTimeout(function () {
      return _this3.handleState(false);
    }, 10);
  };

  _proto.handleRemove = function handleRemove(node) {
    var onChange = this.props.onChange;
    this.datum.set(this.datum.getKey(node), 0);
    if (onChange) onChange(this.datum.getValue(), node);
  };

  _proto.handleState = function handleState(focus, e) {
    if (this.props.disabled === true) return;
    if (focus === this.state.focus) return; // click close icon

    if (focus && e && e.target.classList.contains((0, _styles2.cascaderClass)('close'))) return; // if remove node, return

    if (e && (0, _element.getParent)(e.target, "." + (0, _styles2.cascaderClass)('remove-container'))) return;
    var _this$props5 = this.props,
        height = _this$props5.height,
        onCollapse = _this$props5.onCollapse;
    var position = this.props.position;

    if (!position) {
      var windowHeight = _document.docSize.height;
      var bottom = height + this.element.getBoundingClientRect().bottom;
      if (bottom > windowHeight) position = 'drop-up';
    }

    if (onCollapse) onCollapse(focus);
    this.setState({
      focus: focus,
      position: position || 'drop-down'
    });

    if (focus) {
      this.renderPending = false;
      this.bindClickAway();
    } // } else if (blur) {
    //   this.clearClickAway()
    //   onBlur()
    // }

  };

  _proto.handleKeyDown = function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleState(!this.state.focus);
    } // fot close the list


    if (e.keyCode === 9) {
      this.props.onBlur(); // e.preventDefault()

      if (this.state.focus) {
        this.handleState(false);
      } else {
        this.clearClickAway();
      }
    }
  };

  _proto.handleChange = function handleChange() {
    var _this$props6 = this.props,
        onChange = _this$props6.onChange,
        onFilter = _this$props6.onFilter,
        filterText = _this$props6.filterText;

    if (this.input) {
      this.input.reset();
      this.input.focus();
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var value = args[0];
    this.lastValue = value;
    onChange.apply(void 0, args);
    if (onFilter && filterText) onFilter('');
  };

  _proto.renderList = function renderList() {
    var _this4 = this;

    var _this$props7 = this.props,
        data = _this$props7.data,
        keygen = _this$props7.keygen,
        renderItem = _this$props7.renderItem,
        mode = _this$props7.mode,
        loader = _this$props7.loader,
        onItemClick = _this$props7.onItemClick,
        expandTrigger = _this$props7.expandTrigger,
        childrenKey = _this$props7.childrenKey,
        height = _this$props7.height;
    var path = this.state.path;
    var props = {
      datum: this.datum,
      renderItem: renderItem,
      keygen: keygen,
      loader: loader,
      onPathChange: this.handlePathChange,
      onChange: this.handleChange,
      onItemClick: onItemClick,
      multiple: mode !== undefined,
      expandTrigger: expandTrigger,
      childrenKey: childrenKey
    };
    var tempData = data;
    var list = [_react.default.createElement(_List.default, (0, _extends2.default)({}, props, {
      key: "root",
      data: tempData,
      id: path[0],
      parentId: "",
      path: []
    }))];
    var childs = path.map(function (p, i) {
      tempData = tempData && tempData.find(function (d) {
        var nid = _this4.datum.getKey(d, path[i - 1]);

        return nid === p;
      });

      if (tempData && tempData[childrenKey] && tempData[childrenKey].length > 0) {
        tempData = tempData[childrenKey];
        return _react.default.createElement(_List.default, (0, _extends2.default)({}, props, {
          key: p,
          data: tempData,
          id: path[i + 1],
          parentId: path[i],
          path: path.slice(0, i + 1)
        }));
      }

      return null;
    });
    list = list.concat(childs);
    var listStyle = data.length === 0 ? {
      height: 'auto',
      width: '100%'
    } : {
      height: height
    };
    return _react.default.createElement("div", {
      ref: this.bindRef,
      style: listStyle
    }, list);
  };

  _proto.renderAbsoluteList = function renderAbsoluteList() {
    var _this$props8 = this.props,
        absolute = _this$props8.absolute,
        zIndex = _this$props8.zIndex;
    var _this$state = this.state,
        focus = _this$state.focus,
        position = _this$state.position;
    var className = (0, _classnames.default)((0, _styles.selectClass)('options'), (0, _styles2.cascaderClass)('options'));
    var rootClass = (0, _classnames.default)((0, _styles2.cascaderClass)(focus && 'focus', (0, _config.isRTL)() && 'rtl'), (0, _styles.selectClass)(this.state.position));
    if (!focus && !this.isRendered) return null;
    this.isRendered = true;
    return _react.default.createElement(OptionList, {
      autoAdapt: true,
      rootClass: rootClass,
      className: className,
      position: position,
      absolute: absolute,
      focus: focus,
      parentElement: this.element,
      "data-id": this.selectId,
      zIndex: zIndex
    }, this.renderList());
  };

  _proto.renderFilterList = function renderFilterList() {
    var _this$props9 = this.props,
        absolute = _this$props9.absolute,
        onFilter = _this$props9.onFilter,
        filterText = _this$props9.filterText,
        zIndex = _this$props9.zIndex,
        data = _this$props9.data,
        childrenKey = _this$props9.childrenKey,
        renderItem = _this$props9.renderItem,
        expandTrigger = _this$props9.expandTrigger,
        height = _this$props9.height,
        loading = _this$props9.loading;
    var _this$state2 = this.state,
        focus = _this$state2.focus,
        position = _this$state2.position;
    var className = (0, _classnames.default)((0, _styles2.cascaderClass)(focus && 'focus', (0, _config.isRTL)() && 'rtl'), (0, _styles.selectClass)(this.state.position));
    return _react.default.createElement(_FilterList.default, {
      fixed: "min",
      rootClass: className,
      position: position,
      absolute: absolute,
      focus: focus,
      parentElement: this.element,
      "data-id": this.selectId,
      zIndex: zIndex,
      data: data,
      childrenKey: childrenKey,
      renderItem: renderItem,
      expandTrigger: expandTrigger,
      datum: this.datum,
      onChange: this.handleChange,
      onPathChange: this.handlePathChange,
      onFilter: onFilter,
      filterText: filterText,
      height: height,
      loading: loading
    });
  };

  _proto.renderPanel = function renderPanel() {
    var _this$props10 = this.props,
        filterText = _this$props10.filterText,
        data = _this$props10.data,
        mode = _this$props10.mode,
        loading = _this$props10.loading;
    if (loading) return this.renderFilterList();
    if (!filterText || filterText && mode !== undefined || data.length === 0) return this.renderAbsoluteList();
    return this.renderFilterList();
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$props11 = this.props,
        placeholder = _this$props11.placeholder,
        disabled = _this$props11.disabled,
        size = _this$props11.size,
        other = (0, _objectWithoutPropertiesLoose2.default)(_this$props11, ["placeholder", "disabled", "size"]);
    var focus = this.state.focus;
    var className = (0, _classnames.default)((0, _styles2.cascaderClass)('_', size, focus && 'focus', other.mode !== undefined && 'multiple', disabled === true && 'disabled', (0, _config.isRTL)() && 'rtl'), (0, _styles.selectClass)(this.state.position, focus && 'focus'));
    return _react.default.createElement("div", {
      // eslint-disable-next-line
      tabIndex: disabled === true ? -1 : 0,
      className: className,
      onFocus: this.handleFocus,
      onClick: this.handleClick,
      "data-id": this.selectId,
      onKeyDown: this.handleKeyDown,
      ref: function ref(el) {
        _this5.element = el;
      }
    }, _react.default.createElement(_Result.default, (0, _extends2.default)({}, other, {
      focus: focus,
      multiple: other.mode !== undefined,
      datum: this.datum,
      placeholder: placeholder,
      onClear: this.handleClear,
      onPathChange: this.handlePathChange,
      bindInput: this.bindInput,
      handleRemove: this.handleRemove,
      selectId: this.selectId,
      showList: this.handleClick,
      size: size
    })), this.renderPanel());
  };

  return Cascader;
}(_component.PureComponent);

Cascader.propTypes = {
  clearable: _propTypes.default.bool,
  data: _propTypes.default.array,
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.string),
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  expandTrigger: _propTypes.default.oneOf(['click', 'hover', 'hover-only']),
  height: _propTypes.default.number,
  keygen: _propTypes.default.any,
  loader: _propTypes.default.func,
  mode: _propTypes.default.oneOf([0, 1, 2, 3]),
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onItemClick: _propTypes.default.func,
  placeholder: _propTypes.default.any,
  position: _propTypes.default.string,
  renderItem: _propTypes.default.any,
  renderResult: _propTypes.default.any,
  size: _propTypes.default.string,
  style: _propTypes.default.object,
  value: _propTypes.default.array,
  absolute: _propTypes.default.bool,
  zIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  childrenKey: _propTypes.default.string,
  finalDismiss: _propTypes.default.bool,
  onCollapse: _propTypes.default.func,
  filterText: _propTypes.default.string,
  onFilter: _propTypes.default.func,
  filterDataChange: _propTypes.default.any,
  firstMatchNode: _propTypes.default.object,
  unmatch: _propTypes.default.bool,
  getComponentRef: _propTypes.default.func,
  showArrow: _propTypes.default.bool,
  loading: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.node])
};
Cascader.defaultProps = {
  clearable: true,
  expandTrigger: 'click',
  height: 300,
  data: [],
  childrenKey: 'children',
  showArrow: true
};
var _default = Cascader;
exports.default = _default;