import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { addResizeObserver } from '../utils/dom/element';
import { treeSelectClass } from './styles';
import { inputClass } from '../Input/styles';
import { inputTitleClass } from '../InputTitle/styles';
import { isEmpty, isObject, isNumber } from '../utils/is';
import Input from './Input';
import Caret from '../icons/Caret';
import More, { getResetMore } from '../Select/More';
import InputTitle from '../InputTitle';
import { getKey } from '../utils/uid';
import { getDirectionClass } from '../utils/classname';
export var IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE';

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
      only = _ref.only;
  var value = data;
  var click = disabled || !onClick ? undefined : function () {
    return onClick(value);
  };
  var synDisabled = disabled || !click;
  return React.createElement("a", {
    tabIndex: -1,
    className: treeSelectClass(getDirectionClass('item'), disabled && getDirectionClass('disabled'), synDisabled && getDirectionClass('ban'), only && 'item-only')
  }, content, !synDisabled && React.createElement("span", {
    className: treeSelectClass('indicator', 'close'),
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
      if (this.isCompressedBound()) {
        return;
      }

      var shouldRest = false;

      if (preProps.result.length !== result.length || (data || []).length !== (preProps.data || []).length) {
        shouldRest = true;
      } else if (preProps.result !== result) {
        var i = preProps.result.length - 1;

        var _loop = function _loop() {
          var getUnMatchKey = function getUnMatchKey(d, k) {
            return d && d.IS_NOT_MATCHED_VALUE ? d.value : getKey(d, k);
          };

          var isSameData = function isSameData(data1, data2, k) {
            return getUnMatchKey(data1, k) === getUnMatchKey(data2, k);
          };

          if (!isSameData(result[i], preProps.result[i], keygen)) {
            shouldRest = true;
            return "break";
          }

          i -= 1;
        };

        while (i >= 0) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      }

      if (shouldRest) {
        this.resetMore();
      } else if (result.length && this.shouldResetMore) {
        this.shouldResetMore = false;
        this.state.more = getResetMore(onFilter, this.resultEl, this.resultEl.querySelectorAll("." + treeSelectClass('item')));
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
    var onRemove = this.props.onRemove;
    onRemove.apply(void 0, arguments);
  };

  _proto.handelMore = function handelMore(more) {
    this.setState({
      more: more
    });
  };

  _proto.isCompressedBound = function isCompressedBound() {
    var compressedBound = this.props.compressedBound;
    return compressedBound && isNumber(compressedBound) && compressedBound >= 1;
  };

  _proto.renderClear = function renderClear() {
    var _this$props2 = this.props,
        onClear = _this$props2.onClear,
        result = _this$props2.result,
        disabled = _this$props2.disabled;

    if (onClear && result.length > 0 && disabled !== true) {
      /* eslint-disable */
      return React.createElement("div", {
        key: "clear",
        onClick: onClear,
        className: treeSelectClass('close-warpper')
      }, React.createElement("a", {
        tabIndex: -1,
        "data-role": "close",
        className: treeSelectClass('indicator', 'close')
      }));
      /* eslint-enable */
    }

    return null;
  };

  _proto.renderInput = function renderInput(text, key) {
    if (key === void 0) {
      key = 'input';
    }

    var _this$props3 = this.props,
        multiple = _this$props3.multiple,
        onFilter = _this$props3.onFilter,
        focus = _this$props3.focus,
        setInputReset = _this$props3.setInputReset;
    return React.createElement(Input, {
      key: key + "." + (focus ? 1 : 0),
      updatAble: !multiple,
      multiple: multiple,
      focus: focus,
      text: text,
      onFilter: onFilter,
      setInputReset: setInputReset
    });
  };

  _proto.renderItem = function renderItem(data, index) {
    var _this$props4 = this.props,
        renderResult = _this$props4.renderResult,
        renderUnmatched = _this$props4.renderUnmatched,
        datum = _this$props4.datum;
    var content = getResultContent(data, renderResult, renderUnmatched);
    if (content === null) return null;
    var more = this.state.more;
    return React.createElement(Item, {
      only: more === 1,
      key: index,
      content: content,
      data: data,
      disabled: datum.disabled(data),
      onClick: this.handleRemove
    });
  };

  _proto.renderMore = function renderMore(items) {
    var compressed = this.props.compressed;
    var more = this.getCompressedBound();
    return [React.createElement(More, {
      key: "more",
      className: treeSelectClass(getDirectionClass('item'), 'item-compressed'),
      popoverClassName: treeSelectClass('popover'),
      contentClassName: treeSelectClass(getDirectionClass('result')),
      compressed: compressed,
      data: items,
      cls: treeSelectClass,
      showNum: more
    })];
  };

  _proto.renderPlaceholder = function renderPlaceholder() {
    var _this$props5 = this.props,
        focus = _this$props5.focus,
        onFilter = _this$props5.onFilter,
        innerTitle = _this$props5.innerTitle;

    if (focus && onFilter) {
      return this.renderInput(' ');
    }

    return React.createElement("span", {
      className: classnames(inputClass('placeholder'), treeSelectClass('ellipsis'), innerTitle && inputTitleClass('hidable'))
    }, this.props.placeholder, "\xA0");
  };

  _proto.renderResult = function renderResult() {
    var _this2 = this;

    var _this$props6 = this.props,
        multiple = _this$props6.multiple,
        compressed = _this$props6.compressed,
        result = _this$props6.result,
        renderResult = _this$props6.renderResult,
        renderUnmatched = _this$props6.renderUnmatched,
        onFilter = _this$props6.onFilter,
        focus = _this$props6.focus,
        filterText = _this$props6.filterText;

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

    return React.createElement("span", {
      className: treeSelectClass('ellipsis')
    }, getResultContent(result[0], renderResult, renderUnmatched));
  };

  _proto.render = function render() {
    var showPlaceholder = this.props.result.length === 0;
    var result = showPlaceholder ? this.renderPlaceholder() : this.renderResult();
    var _this$props7 = this.props,
        compressed = _this$props7.compressed,
        innerTitle = _this$props7.innerTitle,
        focus = _this$props7.focus,
        onFilter = _this$props7.onFilter;
    var open = onFilter && focus || !showPlaceholder;
    return React.createElement(InputTitle, {
      innerTitle: innerTitle,
      open: open,
      className: treeSelectClass('title-box'),
      titleClass: treeSelectClass(getDirectionClass('title-box-title'))
    }, React.createElement("div", {
      ref: this.bindResult,
      className: classnames(treeSelectClass(getDirectionClass('result'), compressed && 'compressed', showPlaceholder && 'empty'), innerTitle && inputTitleClass('item-scroll'))
    }, result, !this.props.multiple && // eslint-disable-next-line
    React.createElement("a", {
      tabIndex: -1,
      className: treeSelectClass('indicator', 'caret')
    }, React.createElement(Caret, null)), this.renderClear()));
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
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  compressed: PropTypes.bool,
  compressedBound: PropTypes.number,
  renderUnmatched: PropTypes.func,
  innerTitle: PropTypes.node,
  keygen: PropTypes.any,
  data: PropTypes.array
};
export default Result;