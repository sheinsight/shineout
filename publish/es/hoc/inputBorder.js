import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Component } from '../component';
import { curry } from '../utils/func';
import { popoverClass } from '../Popover/styles';
import { buttonClass } from '../Button/styles';
import { inputClass } from '../Input/styles';
import { inputBorderClass } from '../Form/styles';
import Popover from '../Popover';
import { isRTL } from '../config';
import getDataset from '../utils/dom/getDataset';
export default curry(function (options, Origin) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(_class, _Component);

    function _class(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.el = null;
      _this.state = {
        focus: props.autoFocus
      };
      _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_assertThisInitialized(_this))); // this.enterPress = this.enterPress.bind(this)

      return _this;
    }

    var _proto = _class.prototype;

    _proto.bindRef = function bindRef(el) {
      this.el = el;
    };

    _proto.handleBlur = function handleBlur(event) {
      this.setState({
        focus: false
      });
      var onBlur = this.props.onBlur;
      if (onBlur) onBlur(event);
    };

    _proto.handleFocus = function handleFocus(event) {
      this.setState({
        focus: true
      });
      var onFocus = this.props.onFocus;
      if (onFocus) onFocus(event);
    };

    _proto.renderHelp = function renderHelp(focus) {
      var _this2 = this;

      var _this$props = this.props,
          error = _this$props.error,
          tip = _this$props.tip,
          popover = _this$props.popover,
          popoverProps = _this$props.popoverProps;
      var classList = ['input-tip'];
      var position = popover || (isRTL() ? 'bottom-right' : 'bottom-left');
      var styles = popoverProps.style && popoverProps.style.width ? popoverProps.style : Object.assign({
        minWidth: 200,
        maxWidth: 400
      }, popoverProps.style || {}); // 只有有错需要popover，或者tip被focus才显示

      if (error && popover || tip && focus) {
        if (error) classList.push('input-error');
        return React.createElement(Popover, _extends({
          getPopupContainer: function getPopupContainer() {
            return _this2.el;
          }
        }, popoverProps, {
          visible: true,
          style: styles,
          className: popoverClass.apply(void 0, classList),
          position: position
        }), error ? error.message : tip);
      }

      return null;
    };

    _proto.render = function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          border = _this$props2.border,
          size = _this$props2.size,
          tip = _this$props2.tip,
          popover = _this$props2.popover,
          width = _this$props2.width,
          style = _this$props2.style,
          error = _this$props2.error,
          popoverProps = _this$props2.popoverProps,
          underline = _this$props2.underline,
          other = _objectWithoutPropertiesLoose(_this$props2, ["className", "border", "size", "tip", "popover", "width", "style", "error", "popoverProps", "underline"]);

      var focus = this.state.focus;
      var rtl = isRTL();
      var Tag = options.tag || 'label';
      var newStyle = Object.assign({
        width: width
      }, style);
      var isDisabled = typeof other.disabled === 'function' ? false : !!other.disabled;
      var newClassName = classnames(inputBorderClass(rtl && 'rtl'), inputClass('_', rtl && 'rtl', focus && !isDisabled && 'focus', isDisabled && 'disabled', options.isGroup && 'group', size, newStyle.width && 'inline', !border && 'no-border', options.overflow && "overflow-" + options.overflow, error && 'invalid', popover && error && 'focus', underline && 'underline'), buttonClass(options.isGroup && 'group', options.from === 'input' && options.isGroup && 'from-input-group'), typeof options.className === 'function' ? options.className(this.props) : options.className, this.props.className);
      return React.createElement(Tag, _extends({
        ref: this.bindRef,
        className: newClassName,
        style: newStyle,
        tabIndex: options.enterPress ? '0' : undefined
      }, getDataset(other)), React.createElement(Origin, _extends({}, other, {
        size: size,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        inputFocus: focus
      })), this.renderHelp(focus));
    };

    return _class;
  }(Component), _defineProperty(_class, "propTypes", {
    autoFocus: PropTypes.bool,
    border: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    error: PropTypes.object,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
    tip: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    popover: PropTypes.oneOf(['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']),
    popoverProps: PropTypes.object,
    underline: PropTypes.bool
  }), _defineProperty(_class, "defaultProps", {
    border: true,
    style: {},
    popoverProps: {}
  }), _temp;
});