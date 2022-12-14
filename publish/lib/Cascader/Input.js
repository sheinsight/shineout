"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

var _element = require("../utils/dom/element");

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
    _this.handlePaste = _this.handlePaste.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.focusInput = _this.focusInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = FilterInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.focusInput(true);
  };

  _proto.getProcessedValue = function getProcessedValue(text) {
    var trim = this.props.trim;
    if (!trim && this.lastCursorOffset === 0 && /^\u00A0$/.test(text)) return '';
    return trim ? text.trim() : text.replace(/\u00A0/g, ' ');
  };

  _proto.reset = function reset() {
    if (this.editElement) this.editElement.innerText = '';
    if (this.blurTimer) clearTimeout(this.blurTimer);
  };

  _proto.focusInput = function focusInput(flag) {
    var _this2 = this;

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
      return _this2.focus();
    });
  };

  _proto.focus = function focus() {
    var _this3 = this;

    requestAnimationFrame(function () {
      _element.focusElement.end(_this3.editElement);
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.editElement = el;
  };

  _proto.handleInput = function handleInput(e) {
    var text = e.target.innerText.replace('\feff ', '');
    this.lastCursorOffset = (0, _element.getCursorOffset)(text.length);
    var t = this.getProcessedValue(text);
    this.props.onFilter(t);
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.handlePaste = function handlePaste(e) {
    (0, _element.preventPasteFile)(e);
  };

  _proto.render = function render() {
    var focus = this.props.focus;
    var props = {
      className: (0, _styles.cascaderClass)('input', !focus && 'ellipsis'),
      ref: this.bindElement,
      key: 'input',
      onInput: this.handleInput,
      contentEditable: focus || this.state.editable,
      onFocus: handleFocus,
      onPaste: this.handlePaste
    };
    return _react.default.createElement("span", props);
  };

  return FilterInput;
}(_react.Component);

FilterInput.propTypes = {
  onFilter: _propTypes.default.func.isRequired,
  trim: _propTypes.default.bool,
  focus: _propTypes.default.bool,
  filterText: _propTypes.default.string
};
var _default = FilterInput;
exports.default = _default;