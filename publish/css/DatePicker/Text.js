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

var _utils = _interopRequireDefault(require("./utils"));

var _styles = require("./styles");

var _locale = require("../locale");

var target = null;
document.addEventListener('mousedown', function (e) {
  // eslint-disable-next-line prefer-destructuring
  target = e.target;
}, true);

var Text =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(Text, _PureComponent);

  function Text(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleInput = _this.handleInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleFocus = _this.handleFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindElement = _this.bindElement.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = Text.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus && this.props.focus && this.element && (this.props.focusElement === this.element || !this.props.focusElement)) {
      _element.focusElement.end(this.element);
    }
  };

  _proto.getOptions = function getOptions() {
    var timeZone = this.props.timeZone;
    return {
      timeZone: timeZone,
      weekStartsOn: (0, _locale.getLocale)('startOfWeek')
    };
  };

  _proto.bindElement = function bindElement(el) {
    var onTextSpanRef = this.props.onTextSpanRef;
    this.element = el;
    if (onTextSpanRef) onTextSpanRef(el);
  };

  _proto.handleBlur = function handleBlur(e) {
    var _this$props = this.props,
        format = _this$props.format,
        index = _this$props.index,
        onChange = _this$props.onChange,
        value = _this$props.value;
    var txt = e.target.innerText;
    if ((0, _element.getParent)(target, "." + (0, _styles.datepickerClass)('picker'))) return;
    if (txt === value) return;

    if (txt.trim().length === 0) {
      onChange(undefined, index, e);
    } else {
      var newValue = _utils.default.toDateWithFormat(txt, format, undefined, this.getOptions()); // if translate fail, clear


      if (!newValue) {
        this.element.innerText = null;
      }

      onChange(newValue, index, e);
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    var onTextSpanRef = this.props.onTextSpanRef;
    if (onTextSpanRef) onTextSpanRef(e.target);
  };

  _proto.handleInput = function handleInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.element.blur();
      this.handleBlur(e); // must wait for handleBlur to finish executing

      Promise.resolve().then(function () {
        document.dispatchEvent(new Event('mousedown', {
          bubbles: true
        }));
      });
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        inputable = _this$props2.inputable,
        value = _this$props2.value,
        placeholder = _this$props2.placeholder,
        disabled = _this$props2.disabled,
        focus = _this$props2.focus;

    if (!inputable || disabled || !focus) {
      return _react.default.createElement("span", {
        onClick: this.handleFocus,
        className: className
      }, value || placeholder);
    }

    return _react.default.createElement("span", {
      ref: this.bindElement,
      contentEditable: inputable,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleInput,
      className: className,
      dangerouslySetInnerHTML: {
        __html: value
      }
    });
  };

  return Text;
}(_react.PureComponent);

Text.propTypes = {
  disabled: _propTypes.default.bool,
  className: _propTypes.default.string,
  format: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  index: _propTypes.default.number,
  inputable: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.any,
  value: _propTypes.default.string,
  onTextSpanRef: _propTypes.default.func,
  focus: _propTypes.default.bool,
  focusElement: _propTypes.default.instanceOf(Element),
  timeZone: _propTypes.default.string
};
Text.defaultProps = {
  value: ''
};
var _default = Text;
exports.default = _default;