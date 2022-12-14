import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { Component } from '../component';
import Popover from '../Popover';

var RemoveConfirm =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RemoveConfirm, _Component);

  function RemoveConfirm(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      visible: false
    };
    _this.handleRemoveConfirm = _this.handleRemoveConfirm.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleRemoveLater = _this.handleRemoveLater.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = RemoveConfirm.prototype;

  _proto.handleRemoveConfirm = function handleRemoveConfirm(visible) {
    var onVisibleChange = this.props.onVisibleChange;
    if (onVisibleChange) onVisibleChange(visible);
    this.setState({
      visible: visible
    });
  };

  _proto.handleRemoveLater = function handleRemoveLater() {
    var onRemove = this.props.onRemove;
    return new Promise(function (resolve) {
      if (onRemove) onRemove();
      resolve();
    });
  };

  _proto.render = function render() {
    var visible = this.state.visible;
    var confirm = this.props.confirm;
    if (!confirm) return null;
    var confirmProps = typeof confirm === 'object' ? confirm : {
      children: confirm
    };
    return React.createElement(Popover.Confirm, _extends({}, confirmProps, {
      onOk: this.handleRemoveLater,
      visible: visible,
      onVisibleChange: this.handleRemoveConfirm
    }));
  };

  return RemoveConfirm;
}(Component);

export { RemoveConfirm as default };
RemoveConfirm.propTypes = {
  confirm: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRemove: PropTypes.func,
  onVisibleChange: PropTypes.func
};