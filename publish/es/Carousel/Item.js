import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { carouselClass } from './styles';

var Item =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Item, _PureComponent);

  function Item() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Item.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        current = _this$props.current,
        pre = _this$props.pre;
    var className = classnames(carouselClass('item', current && 'item-current', pre && 'item-pre'), this.props.className);
    return React.createElement("div", {
      className: className
    }, children);
  };

  return Item;
}(PureComponent);

Item.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  current: PropTypes.bool,
  pre: PropTypes.bool
};
export default Item;