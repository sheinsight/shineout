import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { selectClass } from './styles';
import { focusElement, getCursorOffset, preventPasteFile } from '../utils/dom/element';
import { isString } from '../utils/is';

var handleFocus = function handleFocus(e) {
  e.stopPropagation();
};

var FilterInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FilterInput, _Component);

  function FilterInput(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      editable: false
    };
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.geHandleMax = _this.geHandleMax.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handlePaste = _this.handlePaste.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusInput = _this.focusInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCompositionStart = _this.handleCompositionStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleCompositionEnd = _this.handleCompositionEnd.bind(_assertThisInitialized(_assertThisInitialized(_this))); // for mutiple select

    _this.props.setInputReset(_this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)))); // set focus func to Select


    props.bindFocusInputFunc(_this.focusInput);
    return _this;
  }

  var _proto = FilterInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.focus) {
      this.props.onInputFocus();
      this.focus();
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return this.props.updatAble;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.focus === prevProps.focus || !this.props.focus) return;
    this.props.onInputFocus();
    this.focus();
  };

  _proto.getProcessedValue = function getProcessedValue(text) {
    var trim = this.props.trim;
    if (!trim && this.lastCursorOffset === 0 && /^\u00A0$/.test(text)) return '';
    return trim ? text.trim() : text.replace(/\u00A0/g, ' ');
  };

  _proto.handlePaste = function handlePaste(e) {
    var _this2 = this;

    var convertBr = this.props.convertBr;
    preventPasteFile(e, function (text) {
      if (window.getSelection) {
        var selection = window.getSelection();
        _this2.lastSelect = {
          anchorOffset: selection.anchorOffset,
          focusOffset: selection.focusOffset,
          text: text
        };
      }
    }, {
      convertBr: convertBr
    });
  };

  _proto.geHandleMax = function geHandleMax(e) {
    var maxLength = this.props.maxLength;

    if (!maxLength || this.composition) {
      return true;
    }

    var change = true;
    var text = e.target.innerText;

    if (text.length >= maxLength) {
      var lastPos; // 输入的位置 需要考虑选中文本的情况

      if (window.getSelection) {
        lastPos = Math.min(window.getSelection().anchorOffset - (text.length > maxLength ? 1 : 0), maxLength);
      }

      if (!this.lastMaxValue) {
        this.lastMaxValue = text.slice(0, maxLength); // 粘贴文本的情况
      } else if (this.lastSelect) {
        var _this$lastSelect = this.lastSelect,
            anchorOffset = _this$lastSelect.anchorOffset,
            focusOffset = _this$lastSelect.focusOffset,
            str = _this$lastSelect.text;
        var start = anchorOffset < focusOffset ? anchorOffset : focusOffset;
        var end = anchorOffset > focusOffset ? anchorOffset : focusOffset;

        if (end - start > 0) {
          this.lastMaxValue = this.lastMaxValue.slice(0, start) + str.slice(0, end - start) + this.lastMaxValue.slice(end);
          lastPos = focusOffset;
        } else {
          change = false;
        }
      } else {
        change = false;
      } // clear select info


      this.lastSelect = false;
      e.target.innerText = this.lastMaxValue; // 修改e.target.innerText后光标会变到最前面，这儿改变光标位置到上次光标的位置

      if (lastPos) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var textNode = range.startContainer;

        if (textNode.nodeName !== '#text') {
          ;
          var _textNode$childNodes = textNode.childNodes;
          textNode = _textNode$childNodes[0];
        }

        range.setStart(textNode, lastPos);
        range.collapse(true);
      }
    } else {
      this.lastMaxValue = '';
    } // eslint-disable-next-line consistent-return


    return change;
  };

  _proto.reset = function reset() {
    if (this.editElement) this.editElement.innerText = '';
    if (this.blurTimer) clearTimeout(this.blurTimer);
  };

  _proto.focusInput = function focusInput(flag) {
    var _this3 = this;

    if (flag === void 0) {
      flag = false;
    }

    if (!flag) {
      this.setState({
        editable: false
      });
      return;
    }

    this.setState({
      editable: true
    }, function () {
      return _this3.focus();
    });
  };

  _proto.focus = function focus() {
    var _this4 = this;

    var focusSelected = this.props.focusSelected;
    var action = focusSelected ? focusElement.select : focusElement.end;
    requestAnimationFrame(function () {
      action(_this4.editElement);
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.editElement = el;
  };

  _proto.handleInput = function handleInput(e) {
    var change = this.geHandleMax(e);

    if (!change) {
      return;
    }

    var text = e.target.innerText.replace('\feff ', '');
    this.lastCursorOffset = getCursorOffset(text.length);
    var t = this.getProcessedValue(text);
    this.props.onFilter(t);
  };

  _proto.handleBlur = function handleBlur(e) {
    var txt = this.props.text;
    var text = this.getProcessedValue(e.target.innerText.replace('\feff ', ''));
    this.focusInput(false);
    if (text === txt) return;
    this.props.onInputBlur(text);
  };

  _proto.handleCompositionStart = function handleCompositionStart() {
    this.composition = true;
  };

  _proto.handleCompositionEnd = function handleCompositionEnd(e) {
    this.composition = false;
    this.handleInput(e);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        text = _this$props.text,
        focus = _this$props.focus,
        multiple = _this$props.multiple;
    var value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text;
    var props = {
      className: selectClass('input', !focus && 'ellipsis', !multiple && 'full'),
      ref: this.bindElement,
      key: 'input',
      onInput: this.handleInput,
      contentEditable: focus || this.state.editable,
      onFocus: handleFocus,
      onBlur: this.handleBlur,
      title: !focus && isString(value) ? value : null,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd
    };

    if (isValidElement(value)) {
      if (value.type.toString() === 'Symbol(react.fragment)') {
        return cloneElement(React.createElement("span", null, value), _objectSpread({}, props, {
          suppressContentEditableWarning: true
        }));
      }

      return cloneElement(value, _objectSpread({}, props, {
        suppressContentEditableWarning: true
      }));
    }

    return React.createElement("span", _extends({
      dangerouslySetInnerHTML: {
        __html: value
      }
    }, props, {
      onPaste: this.handlePaste
    }));
  };

  return FilterInput;
}(Component);

FilterInput.propTypes = {
  focus: PropTypes.bool.isRequired,
  multiple: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  onInputFocus: PropTypes.func.isRequired,
  updatAble: PropTypes.bool,
  setInputReset: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  trim: PropTypes.bool,
  focusSelected: PropTypes.bool,
  bindFocusInputFunc: PropTypes.func,
  // collapse: PropTypes.func,
  maxLength: PropTypes.number,
  convertBr: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
FilterInput.defaultProps = {
  text: '',
  updatAble: false
};
export default FilterInput;