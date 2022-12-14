import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import Popover from './index';
import Button from '../Button';
import Alert from '../Alert';
import { Component } from '../component';
import { popoverClass } from './styles';
import { getProps } from '../utils/proptypes';
import { getLocale } from '../locale';

var Confirm =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Confirm, _Component);

  function Confirm(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      ok: false,
      cancel: false
    };
    _this.handleCancel = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'cancel');
    _this.handleOk = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)), 'ok');
    return _this;
  }

  var _proto = Confirm.prototype;

  _proto.handleClick = function handleClick(type, close) {
    var _this2 = this;

    var _this$props = this.props,
        onOk = _this$props.onOk,
        onCancel = _this$props.onCancel;
    var fn = type === 'ok' ? onOk : onCancel;
    var callback;
    if (fn) callback = fn();

    if (callback && typeof callback.then === 'function') {
      var _this$setState;

      this.setState((_this$setState = {}, _this$setState[type] = true, _this$setState), function () {
        callback.then(function () {
          var _this2$setState;

          close();

          _this2.setState((_this2$setState = {}, _this2$setState[type] = false, _this2$setState));
        });
      });
    } else {
      close();
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props2 = this.props,
        children = _this$props2.children,
        type = _this$props2.type,
        text = _this$props2.text,
        onOk = _this$props2.onOk,
        okType = _this$props2.okType,
        onCancel = _this$props2.onCancel,
        icon = _this$props2.icon,
        other = _objectWithoutPropertiesLoose(_this$props2, ["children", "type", "text", "onOk", "okType", "onCancel", "icon"]);

    var _this$state = this.state,
        ok = _this$state.ok,
        cancel = _this$state.cancel;
    return React.createElement(Popover, _extends({}, other, {
      trigger: "click"
    }), function (close) {
      return React.createElement("div", {
        className: popoverClass('confirm')
      }, React.createElement("div", {
        className: popoverClass('mention')
      }, React.createElement(Alert, {
        type: type,
        icon: icon,
        className: popoverClass('alert')
      }, children)), React.createElement("div", {
        className: popoverClass('footer')
      }, React.createElement(Button, {
        loading: cancel,
        size: "small",
        onClick: function onClick() {
          return _this3.handleCancel(close);
        }
      }, getLocale('cancel', text)), React.createElement(Button, {
        loading: ok,
        size: "small",
        type: okType,
        onClick: function onClick() {
          return _this3.handleOk(close);
        }
      }, getLocale('ok', text))));
    });
  };

  return Confirm;
}(Component);

export { Confirm as default };
Confirm.propTypes = _objectSpread({}, getProps(PropTypes, 'type'), {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  text: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okType: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node])
});
Confirm.defaultProps = {
  type: 'confirmwarning',
  icon: true,
  okType: 'danger'
};