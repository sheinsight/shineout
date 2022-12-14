import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps, defaultProps } from '../utils/proptypes';
import { listClass } from './styles'; // Use Component cause stateless Element can't use ref
// eslint-disable-next-line

var List =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(List, _Component);

  function List() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = List.prototype;

  _proto.render = function render() {
    var className = classnames(listClass('_'), this.props.className);

    var _this$props = this.props,
        show = _this$props.show,
        getRef = _this$props.getRef,
        props = _objectWithoutPropertiesLoose(_this$props, ["show", "getRef"]);

    return React.createElement("div", _extends({
      ref: getRef
    }, props, {
      className: className,
      style: this.props.style
    }));
  };

  return List;
}(Component);

List.propTypes = _objectSpread({}, getProps(PropTypes), {
  show: PropTypes.bool
});
List.defaultProps = _objectSpread({}, defaultProps, {
  show: false
});
List.displayName = 'List';
export default List;