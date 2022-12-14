"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _element = require("../utils/dom/element");

var _is = require("../utils/is");

var handleFocus = function handleFocus(e) {
  e.stopPropagation();
};

var FilterInput =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(FilterInput, _Component);

  function FilterInput(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      editable: false
    };
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleInput = _this.handleInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.geHandleMax = _this.geHandleMax.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handlePaste = _this.handlePaste.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.focusInput = _this.focusInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCompositionStart = _this.handleCompositionStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCompositionEnd = _this.handleCompositionEnd.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // for mutiple select

    _this.props.setInputReset(_this.reset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)))); // set focus func to Select


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
    (0, _element.preventPasteFile)(e, function (text) {
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
    var action = focusSelected ? _element.focusElement.select : _element.focusElement.end;
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
    this.lastCursorOffset = (0, _element.getCursorOffset)(text.length);
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
      className: (0, _styles.selectClass)('input', !focus && 'ellipsis', !multiple && 'full'),
      ref: this.bindElement,
      key: 'input',
      onInput: this.handleInput,
      contentEditable: focus || this.state.editable,
      onFocus: handleFocus,
      onBlur: this.handleBlur,
      title: !focus && (0, _is.isString)(value) ? value : null,
      onCompositionStart: this.handleCompositionStart,
      onCompositionEnd: this.handleCompositionEnd
    };

    if ((0, _react.isValidElement)(value)) {
      if (value.type.toString() === 'Symbol(react.fragment)') {
        return (0, _react.cloneElement)(_react.default.createElement("span", null, value), (0, _objectSpread2.default)({}, props, {
          suppressContentEditableWarning: true
        }));
      }

      return (0, _react.cloneElement)(value, (0, _objectSpread2.default)({}, props, {
        suppressContentEditableWarning: true
      }));
    }

    return _react.default.createElement("span", (0, _extends2.default)({
      dangerouslySetInnerHTML: {
        __html: value
      }
    }, props, {
      onPaste: this.handlePaste
    }));
  };

  return FilterInput;
}(_react.Component);

FilterInput.propTypes = {
  focus: _propTypes.default.bool.isRequired,
  multiple: _propTypes.default.bool,
  onFilter: _propTypes.default.func.isRequired,
  onInputBlur: _propTypes.default.func.isRequired,
  onInputFocus: _propTypes.default.func.isRequired,
  updatAble: _propTypes.default.bool,
  setInputReset: _propTypes.default.func.isRequired,
  text: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  trim: _propTypes.default.bool,
  focusSelected: _propTypes.default.bool,
  bindFocusInputFunc: _propTypes.default.func,
  // collapse: PropTypes.func,
  maxLength: _propTypes.default.number,
  convertBr: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
};
FilterInput.defaultProps = {
  text: '',
  updatAble: false
};
var _default = FilterInput;
exports.default = _default;