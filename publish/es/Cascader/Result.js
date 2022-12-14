import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { inputClass } from '../Input/styles';
import { selectClass } from '../Select/styles';
import { cascaderClass } from './styles';
import Input from './Input';
import icons from '../icons';
import More, { getResetMore } from '../Select/More';
import { addResizeObserver } from '../utils/dom/element';
import { isEmpty, isNumber } from '../utils/is';
import { CHANGE_TOPIC } from '../Datum/types';
import Caret from '../icons/Caret';
import { getDirectionClass } from '../utils/classname';
import InputTitle from '../InputTitle';
import { inputTitleClass } from '../InputTitle/styles'; // eslint-disable-next-line react/prop-types

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
  return React.createElement("a", {
    tabIndex: -1,
    className: classnames(cascaderClass(getDirectionClass('item'), only && 'item-only'), className),
    onClick: onClick
  }, children, singleRemove && React.createElement("span", {
    className: cascaderClass(getDirectionClass('single-remove')),
    onClick: onClose
  }, icons.Close));
}

var Result =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Result, _PureComponent);

  function Result(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      more: -1
    };
    _this.handleNodeClick = _this.handleNodeClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderItem = _this.renderItem.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeTargetNode = _this.removeTargetNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleUpdate = _this.handleUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindResult = _this.bindResult.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resetMore = _this.resetMore.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var datum = this.props.datum;
    datum.subscribe(CHANGE_TOPIC, this.handleUpdate);
    var compressed = this.props.compressed;

    if (compressed && !this.isCompressedBound()) {
      this.cancelResizeObserver = addResizeObserver(this.resultEl, this.resetMore, {
        direction: 'x'
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(preProps) {
    this.updateMore(preProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var datum = this.props.datum;
    datum.unsubscribe(CHANGE_TOPIC, this.handleUpdate);
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
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1;
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
        this.state.more = getResetMore(onFilter, this.resultEl, this.resultEl.querySelectorAll("." + cascaderClass('item')));
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
    var removeContainerClassName = cascaderClass(singleRemove && getDirectionClass('remove-container'));
    return nodes.map(function (n, i) {
      return _this2.renderItem({
        className: removeContainerClassName,
        index: i,
        data: n,
        raw: nodes,
        render: render
      });
    }).filter(function (n) {
      return !isEmpty(n);
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
    var className = classnames(selectClass('indicator', 'close'), cascaderClass(getDirectionClass('close')));

    if (clearable && value.length > 0 && !disabled) {
      /* eslint-disable */
      return React.createElement("a", {
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
        options = _objectWithoutPropertiesLoose(_ref3, ["index", "render", "data", "raw", "className"]);

    var singleRemove = this.props.singleRemove;
    var res = data && render(data, raw);
    if (!res) return null;
    var more = this.getCompressedBound();
    return React.createElement(Item, _extends({
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
    return [React.createElement(More, {
      key: "more",
      data: list,
      className: cascaderClass(getDirectionClass('item'), 'item-compressed'),
      popoverClassName: cascaderClass('popover'),
      contentClassName: cascaderClass('result', size),
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
    return React.createElement(Input, {
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

    return React.createElement("span", {
      key: "placeholder",
      className: classnames(inputClass('placeholder'), selectClass('ellipsis'), innerTitle && inputTitleClass('hidable'))
    }, this.props.placeholder, "\xA0");
  };

  _proto.renderIndicator = function renderIndicator() {
    var _this$props6 = this.props,
        multiple = _this$props6.multiple,
        showArrow = _this$props6.showArrow,
        compressed = _this$props6.compressed;
    if (!showArrow || multiple && !compressed) return null;
    var showCaret = !multiple; // eslint-disable-next-line

    return React.createElement("a", {
      key: "indicator",
      tabIndex: -1,
      className: selectClass('indicator', multiple ? 'multi' : 'caret')
    }, showCaret && React.createElement(Caret, null));
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
    return React.createElement(InputTitle, {
      className: cascaderClass('title-box'),
      titleClass: cascaderClass(getDirectionClass('title-box-title'), shouldCompressed && 'title-box-title-compressed'),
      innerTitle: innerTitle,
      open: !empty || onFilter && focus
    }, React.createElement("div", {
      ref: this.bindResult,
      className: classnames(cascaderClass(getDirectionClass('result'), shouldCompressed && 'compressed', clearEl && 'result-clearable'), innerTitle && inputTitleClass('item-scroll')),
      style: style
    }, result, this.renderIndicator(), clearEl));
  };

  return Result;
}(PureComponent);

Result.propTypes = {
  clearable: PropTypes.bool,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onClear: PropTypes.func,
  onPathChange: PropTypes.func,
  placeholder: PropTypes.any,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  renderResult: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  style: PropTypes.object,
  value: PropTypes.array,
  compressed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  compressedBound: PropTypes.number,
  focus: PropTypes.bool,
  onFilter: PropTypes.func,
  trim: PropTypes.bool,
  focusSelected: PropTypes.bool,
  bindInput: PropTypes.func,
  filterText: PropTypes.string,
  singleRemove: PropTypes.bool,
  handleRemove: PropTypes.func,
  selectId: PropTypes.string,
  showList: PropTypes.func,
  size: PropTypes.string,
  showArrow: PropTypes.bool,
  data: PropTypes.array,
  innerTitle: PropTypes.string
};
Result.defaultProps = {
  value: []
};
export default Result;