import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { focusElement, preventPasteFile } from '../utils/dom/element';
import { treeSelectClass } from './styles';

var FilterInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(FilterInput, _Component);

  function FilterInput(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleInput = _this.handleInput.bind(_assertThisInitialized(_assertThisInitialized(_this))); // for mutiple select

    _this.props.setInputReset(_this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this))));

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
      focusElement.select(_this2.editElement);
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

    if (isValidElement(value)) {
      return cloneElement(value, {
        className: treeSelectClass('input'),
        ref: this.bindElement,
        key: 'input',
        onInput: this.handleInput,
        contentEditable: focus
      });
    }

    return React.createElement("span", {
      key: "input",
      className: treeSelectClass('input', !multiple && 'full'),
      ref: this.bindElement,
      contentEditable: focus,
      onPaste: preventPasteFile,
      onInput: this.handleInput,
      onBlur: this.handleBlur,
      dangerouslySetInnerHTML: {
        __html: value
      }
    });
  };

  return FilterInput;
}(Component);

FilterInput.propTypes = {
  focus: PropTypes.bool.isRequired,
  multiple: PropTypes.bool,
  onFilter: PropTypes.func.isRequired,
  updatAble: PropTypes.bool,
  setInputReset: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};
FilterInput.defaultProps = {
  text: '',
  updatAble: false
};
export default FilterInput;