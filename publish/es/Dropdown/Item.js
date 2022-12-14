import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React, { isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { getProps, defaultProps } from '../utils/proptypes';

var Item =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Item, _React$PureComponent);

  function Item(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  var _proto = Item.prototype;

  _proto.handleClick = function handleClick() {
    if (!this.props.onClick) return;
    this.props.onClick(this.props.data);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        data = _this$props.data,
        itemClassName = _this$props.itemClassName,
        renderItem = _this$props.renderItem,
        width = _this$props.width,
        columns = _this$props.columns;
    var aWidth = width && columns ? (width - 2) / columns : undefined;
    var props = {
      disabled: data.disabled,
      onClick: this.handleClick,
      className: itemClassName,
      target: data.target,
      style: aWidth ? {
        display: 'inline-block',
        width: aWidth
      } : null
    };
    if (data.url) props.href = data.url;
    var content;

    if (isValidElement(data)) {
      content = data;
    } else {
      content = typeof renderItem === 'string' ? data[renderItem] : renderItem(data);
    }

    if (isValidElement(content)) {
      return cloneElement(content, Object.assign(props, content.props));
    }

    return React.createElement("a", props, content);
  };

  return Item;
}(React.PureComponent);

Item.propTypes = _objectSpread({}, getProps(PropTypes), {
  data: PropTypes.object,
  onClick: PropTypes.func,
  renderItem: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  columns: PropTypes.number
});
Item.defaultProps = _objectSpread({}, defaultProps, {
  data: {},
  renderItem: 'content'
});
export default Item;