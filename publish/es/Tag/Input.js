import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { PureComponent } from '../component';
import inputBorder from '../hoc/inputBorder';
import { tagClass } from './styles';

var TagInput =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TagInput, _PureComponent);

  function TagInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    return React.createElement("input", {
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
}(PureComponent);

TagInput.propTypes = {
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  onEnterPress: PropTypes.func,
  onFocus: PropTypes.func
};
export default inputBorder({
  className: tagClass('input')
})(TagInput);