"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.IS_NOT_MATCHED_VALUE = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("./styles");

var _styles2 = require("../Input/styles");

var _styles3 = require("../InputTitle/styles");

var _is = require("../utils/is");

var _element = require("../utils/dom/element");

var _Input = _interopRequireDefault(require("./Input"));

var _Caret = _interopRequireDefault(require("../icons/Caret"));

var _config = require("../config");

var _More = _interopRequireWildcard(require("./More"));

var _InputTitle = _interopRequireDefault(require("../InputTitle"));

var _uid = require("../utils/uid");

var _classname = require("../utils/classname");

var IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE';
/**
 * get result className from resultClassName attr
 * @param {function | string} f props => resultClassName
 * @param {any} value result value
 * @returns {string | null}
 */

exports.IS_NOT_MATCHED_VALUE = IS_NOT_MATCHED_VALUE;

var getResultClassName = function getResultClassName(f, value) {
  if ((0, _is.isFunc)(f)) {
    return f((0, _is.isObject)(value) && value.IS_NOT_MATCHED_VALUE ? value.value : value);
  }

  if ((0, _is.isString)(f)) {
    return f;
  }

  return null;
};

var getResultContent = function getResultContent(data, renderResult, renderUnmatched) {
  if ((0, _is.isObject)(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value);
    return (0, _is.isObject)(data.value) ? renderResult(data.value) : data.value;
  }

  return renderResult(data);
}; // eslint-disable-next-line


function Item(_ref) {
  var content = _ref.content,
      data = _ref.data,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      resultClassName = _ref.resultClassName,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? false : _ref$title,
      only = _ref.only;
  var value = data;
  var click = disabled || !onClick ? undefined : function () {
    return onClick(value);
  };
  var synDisabled = disabled || !click;
  return _react.default.createElement("a", {
    title: title && (0, _is.isString)(content) ? content : null,
    tabIndex: -1,
    className: (0, _classnames.default)((0, _styles.selectClass)((0, _classname.getDirectionClass)('item'), disabled && (0, _classname.getDirectionClass)('disabled'), synDisabled && (0, _classname.getDirectionClass)('ban'), only && 'item-only'), getResultClassName(resultClassName, data))
  }, content, !synDisabled && _react.default.createElement("span", {
    className: (0, _styles.selectClass)('indicator', 'close'),
    onClick: click
  }));
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
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handelMore = _this.handelMore.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindResult = _this.bindResult.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.resetMore = _this.resetMore.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.componentDidMount = function componentDidMount() {
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
    if (this.cancelResizeObserver) this.cancelResizeObserver();
  };

  _proto.getCompressedBound = function getCompressedBound() {
    var compressedBound = this.props.compressedBound;

    if (this.isCompressedBound()) {
      return compressedBound;
    }

    return this.state.more;
  };

  _proto.isCompressedBound = function isCompressedBound() {
    var compressedBound = this.props.compressedBound;
    return compressedBound && (0, _is.isNumber)(compressedBound) && compressedBound >= 1;
  };

  _proto.bindResult = function bindResult(el) {
    this.resultEl = el;
  };

  _proto.updateMore = function updateMore(preProps) {
    var _this$props = this.props,
        result = _this$props.result,
        compressed = _this$props.compressed,
        onFilter = _this$props.onFilter,
        keygen = _this$props.keygen,
        data = _this$props.data;

    if (compressed) {
      if (this.isCompressedBound()) return;
      var shouldRest = false;

      if (preProps.result.length !== result.length || (data || []).length !== (preProps.data || []).length) {
        shouldRest = true;
      } else if (preProps.result !== result) {
        var getUnMatchKey = function getUnMatchKey(d, k) {
          return d && d.IS_NOT_MATCHED_VALUE ? d.value : (0, _uid.getKey)(d, k);
        };

        var isSameData = function isSameData(data1, data2, k) {
          return getUnMatchKey(data1, k) === getUnMatchKey(data2, k);
        };

        var i = preProps.result.length - 1;

        while (i >= 0) {
          if (!isSameData(result[i], preProps.result[i], keygen)) {
            shouldRest = true;
            break;
          }

          i -= 1;
        }
      }

      if (shouldRest) {
        this.resetMore();
      } else if (result.length && this.shouldResetMore) {
        this.shouldResetMore = false;
        this.state.more = (0, _More.getResetMore)(onFilter, this.resultEl, this.resultEl.querySelectorAll("." + (0, _styles.selectClass)('item')));
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

  _proto.handleRemove = function handleRemove() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var onRemove = this.props.onRemove;
    setTimeout(function () {
      onRemove.apply(void 0, args);
    }, 10);
  };

  _proto.isEmptyResult = function isEmptyResult() {
    var _this$props2 = this.props,
        result = _this$props2.result,
        renderResult = _this$props2.renderResult,
        renderUnmatched = _this$props2.renderUnmatched;
    if (result.length <= 0) return true;
    var res = result.reduce(function (acc, cur) {
      var r = getResultContent(cur, renderResult, renderUnmatched);

      if (!(0, _is.isEmpty)(r)) {
        acc.push(cur);
      }

      return acc;
    }, []);
    return res.length <= 0;
  };

  _proto.handelMore = function handelMore(more) {
    this.setState({
      more: more
    });
  };

  _proto.renderItem = function renderItem(data, index) {
    var _this$props3 = this.props,
        renderResult = _this$props3.renderResult,
        renderUnmatched = _this$props3.renderUnmatched,
        datum = _this$props3.datum,
        resultClassName = _this$props3.resultClassName;
    var content = getResultContent(data, renderResult, renderUnmatched);
    if (content === null) return null;
    var more = this.getCompressedBound();
    return _react.default.createElement(Item, {
      key: index,
      only: more === 1,
      content: content,
      data: data,
      disabled: datum.disabled(data),
      onClick: this.handleRemove,
      resultClassName: resultClassName,
      title: true
    });
  };

  _proto.renderMore = function renderMore(items) {
    var _this$props4 = this.props,
        compressedClassName = _this$props4.compressedClassName,
        compressed = _this$props4.compressed;
    var more = this.getCompressedBound();
    var className = (0, _classnames.default)((0, _styles.selectClass)('popover'), compressedClassName);
    return [_react.default.createElement(_More.default, {
      key: "more",
      showNum: more,
      className: (0, _styles.selectClass)((0, _classname.getDirectionClass)('item'), 'item-compressed'),
      popoverClassName: className,
      contentClassName: (0, _styles.selectClass)((0, _classname.getDirectionClass)('result')),
      compressed: compressed,
      data: items,
      more: more,
      cls: _styles.selectClass
    })];
  };

  _proto.renderClear = function renderClear() {
    var _this$props5 = this.props,
        onClear = _this$props5.onClear,
        result = _this$props5.result,
        disabled = _this$props5.disabled;

    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return _react.default.createElement("div", {
        key: "clear",
        onClick: onClear,
        className: (0, _styles.selectClass)('close-warpper')
      }, _react.default.createElement("a", {
        tabIndex: -1,
        "data-role": "close",
        className: (0, _styles.selectClass)('indicator', 'close')
      }));
      /* eslint-enable */
    }

    return null;
  };

  _proto.renderInput = function renderInput(text, key) {
    if (key === void 0) {
      key = 'input';
    }

    var _this$props6 = this.props,
        multiple = _this$props6.multiple,
        onFilter = _this$props6.onFilter,
        trim = _this$props6.trim,
        focus = _this$props6.focus,
        onInputFocus = _this$props6.onInputFocus,
        onInputBlur = _this$props6.onInputBlur,
        setInputReset = _this$props6.setInputReset,
        focusSelected = _this$props6.focusSelected,
        bindFocusInputFunc = _this$props6.bindFocusInputFunc,
        maxLength = _this$props6.maxLength,
        convertBr = _this$props6.convertBr;
    return _react.default.createElement(_Input.default, {
      key: key + "." + (focus ? 1 : 0),
      onInputFocus: onInputFocus,
      onInputBlur: onInputBlur,
      updatAble: !multiple,
      multiple: multiple,
      focus: focus,
      text: text,
      trim: trim,
      onFilter: onFilter,
      setInputReset: setInputReset,
      focusSelected: focusSelected,
      bindFocusInputFunc: bindFocusInputFunc // collapse={collapse}
      ,
      maxLength: maxLength,
      convertBr: convertBr
    });
  };

  _proto.renderPlaceholder = function renderPlaceholder() {
    var _this$props7 = this.props,
        focus = _this$props7.focus,
        onFilter = _this$props7.onFilter,
        filterText = _this$props7.filterText,
        multiple = _this$props7.multiple,
        innerTitle = _this$props7.innerTitle;

    if (focus && onFilter) {
      return this.renderInput(multiple ? filterText : '');
    }

    return _react.default.createElement("span", {
      key: "placeholder",
      className: (0, _classnames.default)((0, _styles2.inputClass)('placeholder'), (0, _styles.selectClass)('ellipsis'), innerTitle && (0, _styles3.inputTitleClass)('hidable'))
    }, _react.default.createElement("span", null, this.props.placeholder), "\xA0");
  };

  _proto.renderResult = function renderResult() {
    var _this2 = this;

    var _this$props8 = this.props,
        multiple = _this$props8.multiple,
        compressed = _this$props8.compressed,
        result = _this$props8.result,
        renderResult = _this$props8.renderResult,
        renderUnmatched = _this$props8.renderUnmatched,
        onFilter = _this$props8.onFilter,
        focus = _this$props8.focus,
        filterText = _this$props8.filterText,
        resultClassName = _this$props8.resultClassName;

    if (multiple) {
      var items = result.map(function (n, i) {
        return _this2.renderItem(n, i);
      }).filter(function (n) {
        return !(0, _is.isEmpty)(n);
      });

      if (compressed) {
        items = this.renderMore(items);
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, result.length));
      }

      return items;
    }

    if (onFilter) {
      return this.renderInput(getResultContent(result[0], renderResult, renderUnmatched));
    }

    var v = getResultContent(result[0], renderResult, renderUnmatched);
    var title = (0, _is.isString)(v) ? v : undefined;
    return _react.default.createElement("span", {
      key: "result",
      title: title,
      className: (0, _classnames.default)((0, _styles.selectClass)('ellipsis'), getResultClassName(resultClassName, result[0]))
    }, v);
  };

  _proto.renderIndicator = function renderIndicator() {
    var _this$props9 = this.props,
        multiple = _this$props9.multiple,
        showArrow = _this$props9.showArrow,
        compressed = _this$props9.compressed;
    if (!showArrow || multiple && !compressed) return null;
    var showCaret = !multiple; // eslint-disable-next-line

    return _react.default.createElement("a", {
      key: "indicator",
      tabIndex: -1,
      className: (0, _styles.selectClass)('indicator', multiple ? 'multi' : 'caret')
    }, showCaret && _react.default.createElement(_Caret.default, null));
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        compressed = _this$props10.compressed,
        innerTitle = _this$props10.innerTitle,
        focus = _this$props10.focus,
        onFilter = _this$props10.onFilter;
    var showPlaceholder = this.isEmptyResult();
    var result = showPlaceholder ? this.renderPlaceholder() : this.renderResult();
    var rtl = (0, _config.isRTL)();
    var clearEl = this.renderClear();
    var indicator = this.renderIndicator();
    var inner = [result, indicator, clearEl];
    var open = onFilter && focus || !showPlaceholder;
    return _react.default.createElement(_InputTitle.default, {
      innerTitle: innerTitle,
      open: open,
      className: (0, _styles.selectClass)('title-box'),
      titleClass: (0, _styles.selectClass)((0, _classname.getDirectionClass)('title-box-title'))
    }, _react.default.createElement("div", {
      ref: this.bindResult,
      className: (0, _classnames.default)((0, _styles.selectClass)((0, _classname.getDirectionClass)('result'), compressed && 'compressed', showPlaceholder && 'empty', clearEl && 'result-clearable'), innerTitle && (0, _styles3.inputTitleClass)((0, _classname.getDirectionClass)('item'), 'item-scroll'))
    }, rtl ? inner.reverse() : inner));
  };

  return Result;
}(_react.PureComponent);

Result.propTypes = {
  datum: _propTypes.default.object,
  disabled: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  filterText: _propTypes.default.string,
  focus: _propTypes.default.bool,
  multiple: _propTypes.default.bool.isRequired,
  onRemove: _propTypes.default.func,
  onClear: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  onInputBlur: _propTypes.default.func,
  onInputFocus: _propTypes.default.func,
  result: _propTypes.default.array.isRequired,
  renderResult: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  placeholder: _propTypes.default.string,
  setInputReset: _propTypes.default.func,
  bindFocusInputFunc: _propTypes.default.func,
  // collapse: PropTypes.func,
  compressed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  compressedBound: _propTypes.default.number,
  trim: _propTypes.default.bool,
  renderUnmatched: _propTypes.default.func,
  showArrow: _propTypes.default.bool,
  focusSelected: _propTypes.default.bool,
  compressedClassName: _propTypes.default.string,
  resultClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  maxLength: _propTypes.default.number,
  innerTitle: _propTypes.default.node,
  keygen: _propTypes.default.any,
  data: _propTypes.default.array,
  convertBr: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
};
var _default = Result;
exports.default = _default;