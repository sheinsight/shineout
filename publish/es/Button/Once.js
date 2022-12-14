import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

var OnceButton =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(OnceButton, _PureComponent);

  function OnceButton(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.state = {
      loading: props.loading
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = OnceButton.prototype;

  _proto.handleClick = function handleClick(e) {
    var onClick = this.props.onClick;
    this.setState({
      loading: true
    });
    if (onClick) onClick(e);
  };

  _proto.render = function render() {
    return React.createElement(Button, _extends({}, this.props, {
      loading: this.state.loading,
      onClick: this.handleClick
    }));
  };

  return OnceButton;
}(PureComponent);

OnceButton.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func
};
export default OnceButton;