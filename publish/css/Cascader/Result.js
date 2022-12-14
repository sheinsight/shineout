"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("../Input/styles");

var _styles2 = require("../Select/styles");

var _styles3 = require("./styles");

var _Input = _interopRequireDefault(require("./Input"));

var _icons = _interopRequireDefault(require("../icons"));

var _More = _interopRequireWildcard(require("../Select/More"));

var _element = require("../utils/dom/element");

var _is = require("../utils/is");

var _types = require("../Datum/types");

var _Caret = _interopRequireDefault(require("../icons/Caret"));

var _classname = require("../utils/classname");

var _InputTitle = _interopRequireDefault(require("../InputTitle"));

var _styles4 = require("../InputTitle/styles");

// eslint-disable-next-line react/prop-types
function Item(_ref) {
  var children = _ref.children,
      close = _ref.close,
      className = _ref.className,
      data = _ref.data,
      isPopover = _ref.isPopover,
      singleRemove = _ref.singleRemove,
      click = _ref.click,
      only = _ref.only;
  var onClose = close ? function (e) {
    close(data, isPopover, e);
  } : undefined;
  var onClick = click ? function () {
    click(data, isPopover);
  } : undefined;
  return _react.default.createElement("a", {
    tabIndex: -1,
    className: (0, _classnames.default)((0, _styles3.cascaderClass)((0, _classname.getDirectionClass)('item'), only && 'item-only'), className),
    onClick: onClick
  }, children, singleRemove && _react.default.createElement("span", {
    className: (0, _styles3.cascaderClass)((0, _classname.getDirectionClass)('single-remove')),
    onClick: onClose
  }, _icons.default.Close));
}

var Result =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Result, _PureComponent);

  function Result(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      more: -1
    };
    _this.handleNodeClick = _this.handleNodeClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.renderItem = _this.renderItem.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.removeTargetNode = _this.removeTargetNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleUpdate = _this.handleUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindResult = _this.bindResult.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetMore = _this.resetMore.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var datum = this.props.datum;
    datum.subscribe(_types.CHANGE_TOPIC, this.handleUpdate);
    var compressed = this.props.compressed;

    if (compressed && !this.isCompressedBound()) {
      this.cancelResizeObserver = (0, _element.addResizeObserver)(this.resultEl, this.resetMore, {
        direction: 'x'
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(preProps) {
    this.updateMore(preProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var datum = this.props.datum;
    datum.unsubscribe(_types.CHANGE_TOPIC, this.handleUpdate);
    if (this.cancelResizeObserver) this.cancelResizeObserver();
  };

  _proto.getCompressedBound = function getCompressedBound() {
    var compressedBound = this.props.compressedBound;

    if (this.isCompressedBound()) {
      return compressedBound;
    }

    return this.state.more;
  };

  _proto.handleUpdate = function handleUpdate() {
    this.forceUpdate();
  };

  _proto.bindResult = function bindResult(el) {
    this.resultEl = el;
  };

  _proto.isCompressedBound = function isCompressedBound() {
    var compressedBound = this.props.compressedBound;
    return compressedBound && (0, _is.isNumber)(compressedBound) && compressedBound >= 1;
  };

  _proto.updateMore = function updateMore(preProps) {
    var _this$props = this.props,
        compressed = _this$props.compressed,
        _this$props$value = _this$props.value,
        value = _this$props$value === void 0 ? [] : _this$props$value,
        onFilter = _this$props.onFilter,
        data = _this$props.data;

    if (compressed) {
      if (this.isCompressedBound()) return;

      if ((preProps.value || []).join('') !== (value || []).join('')) {
        this.resetMore();
      } else if ((preProps.data || []).length !== (data || []).length) {
        this.resetMore();
      } else if (value.length && this.shouldResetMore) {
        this.shouldResetMore = false;
        this.state.more = (0, _More.getResetMore)(onFilter, this.resultEl, this.resultEl.querySelectorAll("." + (0, _styles3.cascaderClass)('item')));
        this.forceUpdate();
      }
    }
  };

  _proto.resetMore = function resetMore() {
    if (!this.props.compressed) return;
    this.shouldResetMore = true;
    this.state.more = -1;
    this.forceUpdate();
  };

  _proto.handleNodeClick = function handleNodeClick(data, show) {
    if (show === void 0) {
      show = false;
    }

    var id = this.props.datum.getKey(data);

    var _ref2 = this.props.datum.getPath(id) || {},
        path = _ref2.path;

    if (!path) return;
    this.props.onPathChange(id, null, path);

    if (show) {
      this.props.showList();
    }
  };

  _proto.handleNode = function handleNode(nodes, render) {
    var _this2 = this;

    var singleRemove = this.props.singleRemove;
    var removeContainerClassName = (0, _styles3.cascaderClass)(singleRemove && (0, _classname.getDirectionClass)('remove-container'));
    return nodes.map(function (n, i) {
      return _this2.renderItem({
        className: removeContainerClassName,
        index: i,
        data: n,
        raw: nodes,
        render: render
      });
    }).filter(function (n) {
      return !(0, _is.isEmpty)(n);
    });
  };

  _proto.removeTargetNode = function removeTargetNode() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var node = args[0],
        isPopover = args[1],
        event = args[2];

    if (isPopover) {
      event.stopPropagation();
    }

    var handleRemove = this.props.handleRemove;
    handleRemove(node);
  };

  _proto.renderClear = function renderClear() {
    var _this$props2 = this.props,
        clearable = _this$props2.clearable,
        value = _this$props2.value,
        disabled = _this$props2.disabled,
        onClear = _this$props2.onClear;
    var className = (0, _classnames.default)((0, _styles2.selectClass)('indicator', 'close'), (0, _styles3.cascaderClass)((0, _classname.getDirectionClass)('close')));

    if (clearable && value.length > 0 && !disabled) {
      /* eslint-disable */
      return _react.default.createElement("a", {
        tabIndex: -1,
        className: className,
        onClick: onClear
      });
      /* eslint-enable */
    }

    return null;
  };

  _proto.renderItem = function renderItem(_ref3) {
    var index = _ref3.index,
        render = _ref3.render,
        data = _ref3.data,
        raw = _ref3.raw,
        className = _ref3.className,
        options = (0, _objectWithoutPropertiesLoose2.default)(_ref3, ["index", "render", "data", "raw", "className"]);
    var singleRemove = this.props.singleRemove;
    var res = data && render(data, raw);
    if (!res) return null;
    var more = this.getCompressedBound();
    return _react.default.createElement(Item, (0, _extends2.default)({
      key: index,
      only: more === 1
    }, options, {
      data: data,
      className: className,
      singleRemove: singleRemove,
      close: this.removeTargetNode,
      isPopover: true,
      click: this.handleNodeClick
    }), res);
  };

  _proto.renderMore = function renderMore(list) {
    var _this$props3 = this.props,
        selectId = _this$props3.selectId,
        size = _this$props3.size,
        compressed = _this$props3.compressed;
    var more = this.getCompressedBound();
    return [_react.default.createElement(_More.default, {
      key: "more",
      data: list,
      className: (0, _styles3.cascaderClass)((0, _classname.getDirectionClass)('item'), 'item-compressed'),
      popoverClassName: (0, _styles3.cascaderClass)('popover'),
      contentClassName: (0, _styles3.cascaderClass)('result', size),
      dataId: selectId,
      showNum: more,
      compressed: compressed
    })];
  };

  _proto.renderInput = function renderInput() {
    var _this$props4 = this.props,
        onFilter = _this$props4.onFilter,
        focus = _this$props4.focus,
        trim = _this$props4.trim,
        focusSelected = _this$props4.focusSelected,
        bindInput = _this$props4.bindInput,
        filterText = _this$props4.filterText;
    return _react.default.createElement(_Input.default, {
      filterText: filterText,
      ref: bindInput,
      trim: trim,
      key: "input." + (focus ? 1 : 0),
      focus: true,
      onFilter: onFilter,
      focusSelected: focusSelected
    });
  };

  _proto.renderPlaceholder = function renderPlaceholder() {
    var _this$props5 = this.props,
        focus = _this$props5.focus,
        onFilter = _this$props5.onFilter,
        innerTitle = _this$props5.innerTitle;

    if (focus && onFilter) {
      return this.renderInput();
    }

    return _react.default.createElement("span", {
      key: "placeholder",
      className: (0, _classnames.default)((0, _styles.inputClass)('placeholder'), (0, _styles2.selectClass)('ellipsis'), innerTitle && (0, _styles4.inputTitleClass)('hidable'))
    }, this.props.placeholder, "\xA0");
  };

  _proto.renderIndicator = function renderIndicator() {
    var _this$props6 = this.props,
        multiple = _this$props6.multiple,
        showArrow = _this$props6.showArrow,
        compressed = _this$props6.compressed;
    if (!showArrow || multiple && !compressed) return null;
    var showCaret = !multiple; // eslint-disable-next-line

    return _react.default.createElement("a", {
      key: "indicator",
      tabIndex: -1,
      className: (0, _styles2.selectClass)('indicator', multiple ? 'multi' : 'caret')
    }, showCaret && _react.default.createElement(_Caret.default, null));
  };

  _proto.renderResult = function renderResult() {
    var _this$props7 = this.props,
        datum = _this$props7.datum,
        value = _this$props7.value,
        renderItem = _this$props7.renderItem,
        renderResult = _this$props7.renderResult,
        compressed = _this$props7.compressed,
        focus = _this$props7.focus,
        onFilter = _this$props7.onFilter;
    var nodes = value.map(function (v) {
      return datum.getDataById(v);
    });
    var render = renderResult || renderItem;

    if (typeof render === 'string') {
      var copyRender = render;

      render = function render(n) {
        return n[copyRender];
      };
    }

    var items = this.handleNode(nodes, render);

    if (compressed && items.length) {
      items = this.renderMore(items);
    }

    if (items.length === 0) {
      items.push(this.renderPlaceholder());
    } else if (focus && onFilter) {
      items.push(this.renderInput());
    }

    return items;
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        style = _this$props8.style,
        value = _this$props8.value,
        compressed = _this$props8.compressed,
        multiple = _this$props8.multiple,
        innerTitle = _this$props8.innerTitle,
        onFilter = _this$props8.onFilter,
        focus = _this$props8.focus;
    var empty = value.length === 0;
    var result = empty ? this.renderPlaceholder() : this.renderResult();
    var clearEl = this.renderClear();
    var shouldCompressed = multiple && compressed;
    return _react.default.createElement(_InputTitle.default, {
      className: (0, _styles3.cascaderClass)('title-box'),
      titleClass: (0, _styles3.cascaderClass)((0, _classname.getDirectionClass)('title-box-title'), shouldCompressed && 'title-box-title-compressed'),
      innerTitle: innerTitle,
      open: !empty || onFilter && focus
    }, _react.default.createElement("div", {
      ref: this.bindResult,
      className: (0, _classnames.default)((0, _styles3.cascaderClass)((0, _classname.getDirectionClass)('result'), shouldCompressed && 'compressed', clearEl && 'result-clearable'), innerTitle && (0, _styles4.inputTitleClass)('item-scroll')),
      style: style
    }, result, this.renderIndicator(), clearEl));
  };

  return Result;
}(_react.PureComponent);

Result.propTypes = {
  clearable: _propTypes.default.bool,
  datum: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  multiple: _propTypes.default.bool,
  onClear: _propTypes.default.func,
  onPathChange: _propTypes.default.func,
  placeholder: _propTypes.default.any,
  renderItem: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  renderResult: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  style: _propTypes.default.object,
  value: _propTypes.default.array,
  compressed: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  compressedBound: _propTypes.default.number,
  focus: _propTypes.default.bool,
  onFilter: _propTypes.default.func,
  trim: _propTypes.default.bool,
  focusSelected: _propTypes.default.bool,
  bindInput: _propTypes.default.func,
  filterText: _propTypes.default.string,
  singleRemove: _propTypes.default.bool,
  handleRemove: _propTypes.default.func,
  selectId: _propTypes.default.string,
  showList: _propTypes.default.func,
  size: _propTypes.default.string,
  showArrow: _propTypes.default.bool,
  data: _propTypes.default.array,
  innerTitle: _propTypes.default.string
};
Result.defaultProps = {
  value: []
};
var _default = Result;
exports.default = _default;