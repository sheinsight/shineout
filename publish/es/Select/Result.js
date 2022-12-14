import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { selectClass } from './styles';
import { inputClass } from '../Input/styles';
import { inputTitleClass } from '../InputTitle/styles';
import { isObject, isFunc, isString, isEmpty, isNumber } from '../utils/is';
import { addResizeObserver } from '../utils/dom/element';
import Input from './Input';
import Caret from '../icons/Caret';
import { isRTL } from '../config';
import More, { getResetMore } from './More';
import InputTitle from '../InputTitle';
import { getKey } from '../utils/uid';
import { getDirectionClass } from '../utils/classname';
export var IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE';
/**
 * get result className from resultClassName attr
 * @param {function | string} f props => resultClassName
 * @param {any} value result value
 * @returns {string | null}
 */

var getResultClassName = function getResultClassName(f, value) {
  if (isFunc(f)) {
    return f(isObject(value) && value.IS_NOT_MATCHED_VALUE ? value.value : value);
  }

  if (isString(f)) {
    return f;
  }

  return null;
};

var getResultContent = function getResultContent(data, renderResult, renderUnmatched) {
  if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value);
    return isObject(data.value) ? renderResult(data.value) : data.value;
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
  return React.createElement("a", {
    title: title && isString(content) ? content : null,
    tabIndex: -1,
    className: classnames(selectClass(getDirectionClass('item'), disabled && getDirectionClass('disabled'), synDisabled && getDirectionClass('ban'), only && 'item-only'), getResultClassName(resultClassName, data))
  }, content, !synDisabled && React.createElement("span", {
    className: selectClass('indicator', 'close'),
    onClick: click
  }));
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
    _this.handleRemove = _this.handleRemove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handelMore = _this.handelMore.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindResult = _this.bindResult.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resetMore = _this.resetMore.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Result.prototype;

  _proto.componentDidMount = function componentDidMount() {
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
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1;
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
          return d && d.IS_NOT_MATCHED_VALUE ? d.value : getKey(d, k);
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
        this.state.more = getResetMore(onFilter, this.resultEl, this.resultEl.querySelectorAll("." + selectClass('item')));
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

      if (!isEmpty(r)) {
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
    return React.createElement(Item, {
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
    var className = classnames(selectClass('popover'), compressedClassName);
    return [React.createElement(More, {
      key: "more",
      showNum: more,
      className: selectClass(getDirectionClass('item'), 'item-compressed'),
      popoverClassName: className,
      contentClassName: selectClass(getDirectionClass('result')),
      compressed: compressed,
      data: items,
      more: more,
      cls: selectClass
    })];
  };

  _proto.renderClear = function renderClear() {
    var _this$props5 = this.props,
        onClear = _this$props5.onClear,
        result = _this$props5.result,
        disabled = _this$props5.disabled;

    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return React.createElement("div", {
        key: "clear",
        onClick: onClear,
        className: selectClass('close-warpper')
      }, React.createElement("a", {
        tabIndex: -1,
        "data-role": "close",
        className: selectClass('indicator', 'close')
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
    return React.createElement(Input, {
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

    return React.createElement("span", {
      key: "placeholder",
      className: classnames(inputClass('placeholder'), selectClass('ellipsis'), innerTitle && inputTitleClass('hidable'))
    }, React.createElement("span", null, this.props.placeholder), "\xA0");
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
        return !isEmpty(n);
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
    var title = isString(v) ? v : undefined;
    return React.createElement("span", {
      key: "result",
      title: title,
      className: classnames(selectClass('ellipsis'), getResultClassName(resultClassName, result[0]))
    }, v);
  };

  _proto.renderIndicator = function renderIndicator() {
    var _this$props9 = this.props,
        multiple = _this$props9.multiple,
        showArrow = _this$props9.showArrow,
        compressed = _this$props9.compressed;
    if (!showArrow || multiple && !compressed) return null;
    var showCaret = !multiple; // eslint-disable-next-line

    return React.createElement("a", {
      key: "indicator",
      tabIndex: -1,
      className: selectClass('indicator', multiple ? 'multi' : 'caret')
    }, showCaret && React.createElement(Caret, null));
  };

  _proto.render = function render() {
    var _this$props10 = this.props,
        compressed = _this$props10.compressed,
        innerTitle = _this$props10.innerTitle,
        focus = _this$props10.focus,
        onFilter = _this$props10.onFilter;
    var showPlaceholder = this.isEmptyResult();
    var result = showPlaceholder ? this.renderPlaceholder() : this.renderResult();
    var rtl = isRTL();
    var clearEl = this.renderClear();
    var indicator = this.renderIndicator();
    var inner = [result, indicator, clearEl];
    var open = onFilter && focus || !showPlaceholder;
    return React.createElement(InputTitle, {
      innerTitle: innerTitle,
      open: open,
      className: selectClass('title-box'),
      titleClass: selectClass(getDirectionClass('title-box-title'))
    }, React.createElement("div", {
      ref: this.bindResult,
      className: classnames(selectClass(getDirectionClass('result'), compressed && 'compressed', showPlaceholder && 'empty', clearEl && 'result-clearable'), innerTitle && inputTitleClass(getDirectionClass('item'), 'item-scroll'))
    }, rtl ? inner.reverse() : inner));
  };

  return Result;
}(PureComponent);

Result.propTypes = {
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filterText: PropTypes.string,
  focus: PropTypes.bool,
  multiple: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
  onClear: PropTypes.func,
  onFilter: PropTypes.func,
  onInputBlur: PropTypes.func,
  onInputFocus: PropTypes.func,
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  bindFocusInputFunc: PropTypes.func,
  // collapse: PropTypes.func,
  compressed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  compressedBound: PropTypes.number,
  trim: PropTypes.bool,
  renderUnmatched: PropTypes.func,
  showArrow: PropTypes.bool,
  focusSelected: PropTypes.bool,
  compressedClassName: PropTypes.string,
  resultClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  maxLength: PropTypes.number,
  innerTitle: PropTypes.node,
  keygen: PropTypes.any,
  data: PropTypes.array,
  convertBr: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
export default Result;