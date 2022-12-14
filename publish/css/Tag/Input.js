"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _component = require("../component");

var _inputBorder = _interopRequireDefault(require("../hoc/inputBorder"));

var _styles = require("./styles");

var TagInput =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inheritsLoose2.default)(TagInput, _PureComponent);

  function TagInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindRef = _this.bindRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  var _proto = TagInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    _PureComponent.prototype.componentDidMount.call(this);

    if (this.element) this.element.focus();
  };

  _proto.bindRef = function bindRef(el) {
    this.element = el;
  };

  _proto.handleChange = function handleChange(e) {
    var value = e.target.value;
    var onChange = this.props.onChange;
    if (onChange) onChange(value);
  };

  _proto.handleKeyUp = function handleKeyUp(e) {
    var _this$props = this.props,
        onBlur = _this$props.onBlur,
        onKeyUp = _this$props.onKeyUp,
        onEnterPress = _this$props.onEnterPress;

    if (e.keyCode === 13) {
      if (onEnterPress) onEnterPress(e.target.value, e);else if (onBlur) onBlur(e.target.value, e);
    }

    if (onKeyUp) onKeyUp(e);
  };

  _proto.handleBlur = function handleBlur(e) {
    var onBlur = this.props.onBlur;
    if (onBlur) onBlur(e.target.value, e);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        value = _this$props2.value,
        onFocus = _this$props2.onFocus;
    return _react.default.createElement("input", {
      ref: this.bindRef,
      type: "text",
      value: value,
      onFocus: onFocus,
      onChange: this.handleChange,
      onKeyUp: this.handleKeyUp,
      onBlur: this.handleBlur
    });
  };

  return TagInput;
}(_component.PureComponent);

TagInput.propTypes = {
  value: _propTypes.default.string,
  onBlur: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onEnterPress: _propTypes.default.func,
  onFocus: _propTypes.default.func
};

var _default = (0, _inputBorder.default)({
  className: (0, _styles.tagClass)('input')
})(TagInput);

exports.default = _default;