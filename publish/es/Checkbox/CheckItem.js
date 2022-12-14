import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { PureComponent } from '../component';
import { getProps, defaultProps } from '../utils/proptypes';
import { getUidStr } from '../utils/uid';
import { getDirectionClass } from '../utils/classname';
import { isEnterPress } from '../utils/is';
import Input from '../Input';
import { checkinputClass } from './styles';
import { isRTL } from '../config';
import getDataset from '../utils/dom/getDataset';
export default function (type) {
  var CheckItem =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(CheckItem, _PureComponent);

    function CheckItem(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.state = {
        checked: props.checked
      };
      _this.id = "cb_" + getUidStr();
      _this.input = null;
      _this.el = null;
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleEnter = _this.handleEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = CheckItem.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          checked = _this$props.checked,
          inputable = _this$props.inputable,
          value = _this$props.value,
          htmlValue = _this$props.htmlValue;

      if (prevProps.value !== value && checked === undefined) {
        // eslint-disable-next-line
        this.setState({
          checked: inputable ? !!value : value === htmlValue
        });
      }
    };

    _proto.getChecked = function getChecked() {
      var _this$props2 = this.props,
          checked = _this$props2.checked,
          value = _this$props2.value,
          htmlValue = _this$props2.htmlValue;
      if (typeof checked === 'function') return checked(htmlValue);
      if (checked !== undefined) return checked;
      if (this.state.checked === undefined) return value === htmlValue;
      return this.state.checked;
    };

    _proto.getProp = function getProp(key) {
      if (this.props[key] !== undefined) return this.props[key];
      return this.state[key];
    };

    _proto.bindRef = function bindRef(el) {
      if (el) this.el = el;
    };

    _proto.handleEnter = function handleEnter(e) {
      if (isEnterPress(e)) {
        this.handleChange({
          target: {
            checked: !this.getChecked()
          }
        }); // e.target.click()
        // if (this.el) this.el.focus()
      }
    };

    _proto.handleChange = function handleChange(e) {
      var _this2 = this;

      var _this$props3 = this.props,
          onChange = _this$props3.onChange,
          onRawChange = _this$props3.onRawChange,
          index = _this$props3.index,
          inputable = _this$props3.inputable;
      var checked = e.target.checked;
      this.setState({
        checked: checked
      }, function () {
        return _this2.el.focus();
      });

      if (type === 'switch' && onChange) {
        onChange(checked);
        return;
      }

      var value = inputable ? this.props.value : this.props.htmlValue;
      if (onRawChange) onRawChange(value, checked);
      value = checked ? value : undefined;
      if (onChange) onChange(value, checked, index);
    };

    _proto.handleInputChange = function handleInputChange(val) {
      var _this$props4 = this.props,
          onChange = _this$props4.onChange,
          index = _this$props4.index;
      var checked = val.length > 0;
      if (onChange) onChange(val, checked, index);
    };

    _proto.render = function render() {
      var _this$props5 = this.props,
          disabled = _this$props5.disabled,
          style = _this$props5.style,
          content = _this$props5.content,
          size = _this$props5.size,
          children = _this$props5.children,
          inputable = _this$props5.inputable,
          onClick = _this$props5.onClick;
      var rtl = isRTL();
      var checked = this.getChecked();
      var isSwitch = type === 'switch';
      var className = classnames(checkinputClass('_', disabled && 'disabled', checked === true && 'checked', checked === 'indeterminate' && 'indeterminate', isSwitch && 'switch', type + "-container", rtl && 'rtl', {
        large: size === 'large',
        small: size === 'small'
      }), this.props.className);
      var checkedChildren = content[0],
          uncheckedChildren = content[1];
      var switchChildren = isSwitch && size !== 'small' ? React.createElement("span", {
        className: checkinputClass('switch-children')
      }, checked ? checkedChildren : uncheckedChildren) : null;
      var value = typeof this.props.value === 'string' ? this.props.value : '';
      return React.createElement("label", _extends({
        onKeyDown: this.handleEnter,
        className: className,
        style: style,
        htmlFor: this.id,
        tabIndex: disabled ? undefined : 0,
        ref: this.bindRef,
        disabled: disabled
      }, getDataset(this.props)), switchChildren, React.createElement("input", {
        id: this.id,
        disabled: disabled,
        tabIndex: -1,
        type: isSwitch ? 'checkbox' : type,
        onClick: onClick,
        onChange: this.handleChange,
        checked: checked
      }), React.createElement("i", {
        className: checkinputClass('indicator', type)
      }), children && !isSwitch && React.createElement("span", {
        className: checkinputClass('desc')
      }, children), inputable && !isSwitch && checked && React.createElement(Input, {
        className: checkinputClass('text'),
        onChange: this.handleInputChange,
        value: value
      }), isSwitch && React.createElement("span", {
        className: checkinputClass(getDirectionClass('switch-indicator'))
      }));
    };

    return CheckItem;
  }(PureComponent);

  CheckItem.propTypes = _objectSpread({}, getProps(PropTypes, 'disabled'), {
    checked: PropTypes.oneOfType([PropTypes.oneOf([true, false, 'indeterminate']), PropTypes.func]),
    inputable: PropTypes.bool,
    htmlValue: PropTypes.any,
    index: PropTypes.number,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.any,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    content: PropTypes.array
  });
  CheckItem.defaultProps = _objectSpread({}, defaultProps, {
    htmlValue: true,
    onClick: undefined,
    content: []
  });
  return CheckItem;
}