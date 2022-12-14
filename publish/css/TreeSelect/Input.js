"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _element = require("../utils/dom/element");

var _styles = require("./styles");

var FilterInput =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(FilterInput, _Component);

  function FilterInput(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleInput = _this.handleInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))); // for mutiple select

    _this.props.setInputReset(_this.reset.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))));

    return _this;
  }

  var _proto = FilterInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.focus) {
      this.focus();
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return this.props.updatAble;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.focus === prevProps.focus || !this.props.focus) return;
    this.focus();
  };

  _proto.reset = function reset() {
    if (this.editElement) this.editElement.innerText = '';
    if (this.blurTimer) clearTimeout(this.blurTimer);
  };

  _proto.focus = function focus() {
    var _this2 = this;

    requestAnimationFrame(function () {
      _element.focusElement.select(_this2.editElement);
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.editElement = el;
  };

  _proto.handleInput = function handleInput(e) {
    this.props.onFilter(e.target.innerText.replace('\feff ', '').trim());
  };

  _proto.render = function render() {
    var _this$props = this.props,
        text = _this$props.text,
        focus = _this$props.focus,
        multiple = _this$props.multiple;
    var value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text;

    if ((0, _react.isValidElement)(value)) {
      return (0, _react.cloneElement)(value, {
        className: (0, _styles.treeSelectClass)('input'),
        ref: this.bindElement,
        key: 'input',
        onInput: this.handleInput,
        contentEditable: focus
      });
    }

    return _react.default.createElement("span", {
      key: "input",
      className: (0, _styles.treeSelectClass)('input', !multiple && 'full'),
      ref: this.bindElement,
      contentEditable: focus,
      onPaste: _element.preventPasteFile,
      onInput: this.handleInput,
      onBlur: this.handleBlur,
      dangerouslySetInnerHTML: {
        __html: value
      }
    });
  };

  return FilterInput;
}(_react.Component);

FilterInput.propTypes = {
  focus: _propTypes.default.bool.isRequired,
  multiple: _propTypes.default.bool,
  onFilter: _propTypes.default.func.isRequired,
  updatAble: _propTypes.default.bool,
  setInputReset: _propTypes.default.func.isRequired,
  text: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
};
FilterInput.defaultProps = {
  text: '',
  updatAble: false
};
var _default = FilterInput;
exports.default = _default;