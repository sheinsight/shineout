import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Textarea from '../Textarea';
import Input from '../Input';
import Popover from '../Popover';
import { editableAreaClass } from './styles';
import icons from '../icons';
import { focusElement, getParent } from '../utils/dom/element';
import { inputClass } from '../Input/styles';
import InputTitle from '../InputTitle';
import { inputTitleClass } from '../InputTitle/styles';

var noop = function noop() {};

function formatShowValue(value) {
  if (!value && value !== 0) return '';
  var arr = String(value).split('\n');
  var len = arr.length;
  if (len > 1) return arr[0] + "...";
  return String(value);
}

var Editable =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Editable, _React$PureComponent);

  function Editable(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.state = {
      showTextarea: false
    };
    _this.bindContainer = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'container');
    _this.bindInput = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'input');
    _this.renderInput = _this.renderInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderPlace = _this.renderPlace.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.renderTextarea = _this.renderTextarea.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.autoFocus = _this.autoFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.showPop = _this.updateShowTextarea.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
    _this.hidePop = _this.updateShowTextarea.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
    _this.handleClear = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)), '');
    return _this;
  }

  var _proto = Editable.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var showTextarea = this.state.showTextarea;

    if (prevState.showTextarea !== showTextarea && showTextarea) {
      this.autoFocus();
    }
  };

  _proto.onChange = function onChange(value) {
    var onChange = this.props.onChange;
    if (typeof onChange === 'function') onChange(value);
  };

  _proto.onBlur = function onBlur(e) {
    var onBlur = this.props.onBlur;
    this.hidePop();
    if (typeof onBlur === 'function') onBlur(e);
  };

  _proto.getErrorProps = function getErrorProps() {
    var p = {};
    if ('error' in this.props) p.error = this.props.error;
    return p;
  };

  _proto.updateShowTextarea = function updateShowTextarea(flag) {
    if (flag && this.input) {
      this.width = getParent(this.input, "." + editableAreaClass('input')).offsetWidth;
    }

    this.setState({
      showTextarea: flag
    });

    if (this.props.onShowTextareaChange) {
      this.props.onShowTextareaChange(flag);
    }
  };

  _proto.handleFocus = function handleFocus(e) {
    var onFocus = this.props.onFocus;
    if (typeof onFocus === 'function') onFocus(e);
  };

  _proto.bindElement = function bindElement(type, el) {
    this[type] = el;
  };

  _proto.autoFocus = function autoFocus() {
    if (!this.container) return;
    var target = this.container.querySelector("." + editableAreaClass('text-area') + " textarea.so-input-auto-size");
    if (target) focusElement.end(target);
  };

  _proto.renderTextarea = function renderTextarea() {
    var showTextarea = this.state.showTextarea;
    var _this$props = this.props,
        placeholder = _this$props.placeholder,
        maxHeight = _this$props.maxHeight,
        value = _this$props.value,
        innerTitle = _this$props.innerTitle,
        placeTitle = _this$props.placeTitle,
        renderFooter = _this$props.renderFooter;
    if (!showTextarea) return null;
    return React.createElement("div", {
      ref: this.bindContainer
    }, React.createElement(Textarea, _extends({
      className: editableAreaClass('text-area'),
      autosize: true,
      innerTitle: innerTitle,
      placeTitle: placeTitle,
      value: value,
      rows: 1,
      delay: 0,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: this.handleFocus,
      placeholder: placeholder,
      maxHeight: maxHeight,
      renderFooter: renderFooter
    }, this.getErrorProps())));
  };

  _proto.renderResult = function renderResult() {
    var _this$props2 = this.props,
        placeholder = _this$props2.placeholder,
        disabled = _this$props2.disabled,
        value = _this$props2.value,
        renderResult = _this$props2.renderResult,
        placeTitle = _this$props2.placeTitle,
        innerTitle = _this$props2.innerTitle,
        error = _this$props2.error;
    var result = renderResult(value);
    return React.createElement("div", {
      tabIndex: disabled ? undefined : 0,
      className: classnames(editableAreaClass('input'), inputClass('_', error && 'invalid', disabled && 'disabled')),
      onFocus: this.showPop
    }, React.createElement(InputTitle, {
      placeTitle: placeTitle,
      innerTitle: innerTitle,
      open: !!value
    }, React.createElement("div", {
      className: classnames(inputClass('spare'), innerTitle && inputTitleClass('hidable', 'item')),
      ref: this.bindInput
    }, result || React.createElement("div", {
      className: inputClass('placeholder')
    }, placeholder || React.createElement("br", null)))));
  };

  _proto.renderInput = function renderInput() {
    var _this$props3 = this.props,
        placeholder = _this$props3.placeholder,
        disabled = _this$props3.disabled,
        value = _this$props3.value,
        innerTitle = _this$props3.innerTitle,
        placeTitle = _this$props3.placeTitle;
    return React.createElement(Input, _extends({
      innerTitle: innerTitle,
      placeTitle: placeTitle,
      forwardedRef: this.bindInput,
      placeholder: placeholder,
      value: formatShowValue(value),
      onChange: noop,
      className: editableAreaClass('input'),
      onFocus: this.showPop,
      disabled: disabled
    }, this.getErrorProps()));
  };

  _proto.renderPlace = function renderPlace() {
    var renderResult = this.props.renderResult;

    if (renderResult && typeof renderResult === 'function') {
      return this.renderResult();
    }

    return this.renderInput();
  };

  _proto.render = function render() {
    var showTextarea = this.state.showTextarea;
    var _this$props4 = this.props,
        width = _this$props4.width,
        style = _this$props4.style,
        className = _this$props4.className,
        bordered = _this$props4.bordered,
        clearable = _this$props4.clearable,
        getPopupContainer = _this$props4.getPopupContainer,
        value = _this$props4.value;
    var cls = classnames(className, editableAreaClass('_', !bordered && 'none-bordered'));
    var ms = Object.assign({
      width: width
    }, style);
    var popStyle = {
      width: this.width
    };
    return React.createElement("div", {
      className: cls,
      style: ms
    }, this.renderPlace(), React.createElement(Popover, {
      visible: showTextarea,
      showArrow: false,
      className: editableAreaClass('popover'),
      position: "cover",
      style: popStyle,
      getPopupContainer: getPopupContainer
    }, this.renderTextarea()), clearable && value ? React.createElement("div", {
      className: editableAreaClass('clear'),
      onClick: this.handleClear
    }, icons.CloseCircle) : null);
  };

  return Editable;
}(React.PureComponent);

Editable.defaultProps = {
  bordered: false
};
Editable.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerTitle: PropTypes.node,
  placeTitle: PropTypes.node,
  renderFooter: PropTypes.func,
  renderResult: PropTypes.func,
  onShowTextareaChange: PropTypes.func,
  error: PropTypes.object
};
export default Editable;