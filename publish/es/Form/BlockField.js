import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';

var BlockField =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BlockField, _PureComponent);

  function BlockField(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;
    console.warn('Form.BlockField is not recommend. Use Form.FieldSet instead.');
    return _this;
  }

  var _proto = BlockField.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        other = _objectWithoutPropertiesLoose(_this$props, ["children"]);

    return React.createElement(Block, other, children);
  };

  return BlockField;
}(PureComponent);

BlockField.propTypes = {
  children: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
};
export default BlockField;