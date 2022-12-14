import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inputClass } from './styles';

var Clear =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Clear, _Component);

  function Clear(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Clear.prototype;

  _proto.handleClick = function handleClick(e) {
    // do not blur
    e.preventDefault();
    var _this$props = this.props,
        onClick = _this$props.onClick,
        clearResult = _this$props.clearResult;
    if (onClick) onClick({
      target: {
        value: clearResult
      }
    }, true);
  };

  _proto.render = function render() {
    return React.createElement("div", {
      onMouseDown: this.handleClick,
      className: inputClass('clear-wrapper')
    }, React.createElement("div", {
      className: inputClass('clear')
    }));
  };

  return Clear;
}(Component);

Clear.propTypes = {
  onClick: PropTypes.func,
  clearResult: PropTypes.any
};
export default Clear;