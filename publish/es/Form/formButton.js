import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { getParent, dispatchEvent } from '../utils/dom/element';
import { formConsumer } from './formContext';
export default (function (htmlType) {
  var _class, _temp;

  return formConsumer(['disabled'], (_temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    _inheritsLoose(FormButton, _PureComponent);

    function FormButton(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this.bindElement = _this.bindElement.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = FormButton.prototype;

    _proto.bindElement = function bindElement(el) {
      this.button = el;
    };

    _proto.handleClick = function handleClick(e) {
      if (htmlType === 'button') {
        var form = getParent(this.button, 'form');
        dispatchEvent(form, 'submit', e.target);
      }

      if (this.props.onClick) this.props.onClick();
    };

    _proto.render = function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onClick = _this$props.onClick,
          other = _objectWithoutPropertiesLoose(_this$props, ["children", "onClick"]);

      var type = this.props.type || (htmlType === 'reset' ? 'default' : 'primary');
      return React.createElement(Button, _extends({}, other, {
        type: type,
        htmlType: htmlType,
        onRef: this.bindElement,
        onClick: this.handleClick
      }), children);
    };

    return FormButton;
  }(PureComponent), _defineProperty(_class, "propTypes", {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string
  }), _temp));
});