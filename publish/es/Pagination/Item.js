import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getDirectionClass } from '../utils/classname';
import { paginationClass } from './styles';

var Item =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Item, _PureComponent);

  function Item(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.handleClick = function handleClick() {
    var _this$props = this.props,
        page = _this$props.page,
        onClick = _this$props.onClick;
    onClick(page);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        isCurrent = _this$props2.isCurrent,
        disabled = _this$props2.disabled;
    var className = paginationClass(getDirectionClass('item'), this.props.className, isCurrent && 'current');
    return React.createElement("a", {
      className: className,
      disabled: disabled || isCurrent,
      onClick: this.handleClick
    }, children);
  };

  return Item;
}(PureComponent);

Item.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};
Item.defaultProps = {
  disabled: false,
  isCurrent: false
};
export default Item;