import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Children, PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps } from '../utils/proptypes';
import { buttonClass } from './styles';
import { isRTL } from '../config';

var ButtonGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ButtonGroup, _PureComponent);

  function ButtonGroup() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ButtonGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        outline = _this$props.outline,
        size = _this$props.size,
        type = _this$props.type;
    var typeSetted = type !== 'default';
    var className = classnames(buttonClass('group', (outline || !typeSetted) && 'outline', isRTL() && 'group-rtl'), this.props.className);
    return React.createElement("div", {
      className: className
    }, Children.toArray(children).map(function (child) {
      return cloneElement(child, {
        size: size,
        outline: outline,
        type: typeSetted ? type : child.props.type
      });
    }));
  };

  return ButtonGroup;
}(PureComponent);

ButtonGroup.propTypes = _objectSpread({}, getProps(PropTypes, 'size'), {
  children: PropTypes.any.isRequired,
  outline: PropTypes.bool,
  type: PropTypes.string
});
ButtonGroup.defaultProps = {
  outline: false,
  type: 'default'
};
export default ButtonGroup;