import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

var Submit =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Submit, _PureComponent);

  function Submit(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Submit.prototype;

  _proto.handleClick = function handleClick(e) {
    var _this2 = this;

    e.persist();
    setTimeout(function () {
      _this2.props.onSubmit(e.target);
    }, 50);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        onSubmit = _this$props.onSubmit,
        loading = _this$props.loading,
        children = _this$props.children,
        formStatus = _this$props.formStatus,
        other = _objectWithoutPropertiesLoose(_this$props, ["onSubmit", "loading", "children", "formStatus"]);

    return React.createElement(Button, _extends({
      type: "primary"
    }, other, {
      disabled: other.disabled || formStatus === 'disabled',
      loading: formStatus === 'pending' || loading,
      onClick: this.handleClick
    }), children);
  };

  return Submit;
}(PureComponent);

Submit.propTypes = {
  children: PropTypes.any,
  formStatus: PropTypes.string,
  loading: PropTypes.bool,
  onCollapse: PropTypes.func,
  onSubmit: PropTypes.func
};
export default Submit;