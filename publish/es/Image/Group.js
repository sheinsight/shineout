import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import showGallery from './events';
import { IMAGE } from './Image';
import { imageClass } from './styles';

var Group =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Group, _PureComponent);

  function Group() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Group.prototype;

  _proto.handleClick = function handleClick(index) {
    var children = this.props.children;
    var images = [];
    var current = 0;
    Children.toArray(children).forEach(function (child, i) {
      if (child && child.type && child.type.symbolType === IMAGE) {
        if (index === i) current = images.length;
        var _child$props = child.props,
            src = _child$props.src,
            href = _child$props.href;
        images.push({
          thumb: src,
          src: href || src,
          key: i
        });
      }
    });
    showGallery(images, current);
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        children = _this$props.children,
        pile = _this$props.pile,
        style = _this$props.style,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "pile", "style"]);

    return React.createElement("div", {
      className: imageClass('group', pile && 'pile'),
      style: style
    }, Children.toArray(this.props.children).map(function (child, i) {
      return cloneElement(child, _objectSpread({}, props, {
        onClick: _this.handleClick.bind(_this, i)
      }));
    }));
  };

  return Group;
}(PureComponent);

Group.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  pile: PropTypes.bool,
  style: PropTypes.object
};
export default Group;