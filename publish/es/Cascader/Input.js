import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cascaderClass } from './styles';
import { focusElement, getCursorOffset, preventPasteFile } from '../utils/dom/element';

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
    _this.handlePaste = _this.handlePaste.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusInput = _this.focusInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
      focusElement.end(_this3.editElement);
    });
  };

  _proto.bindElement = function bindElement(el) {
    this.editElement = el;
  };

  _proto.handleInput = function handleInput(e) {
    var text = e.target.innerText.replace('\feff ', '');
    this.lastCursorOffset = getCursorOffset(text.length);
    var t = this.getProcessedValue(text);
    this.props.onFilter(t);
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.handlePaste = function handlePaste(e) {
    preventPasteFile(e);
  };

  _proto.render = function render() {
    var focus = this.props.focus;
    var props = {
      className: cascaderClass('input', !focus && 'ellipsis'),
      ref: this.bindElement,
      key: 'input',
      onInput: this.handleInput,
      contentEditable: focus || this.state.editable,
      onFocus: handleFocus,
      onPaste: this.handlePaste
    };
    return React.createElement("span", props);
  };

  return FilterInput;
}(Component);

FilterInput.propTypes = {
  onFilter: PropTypes.func.isRequired,
  trim: PropTypes.bool,
  focus: PropTypes.bool,
  filterText: PropTypes.string
};
export default FilterInput;