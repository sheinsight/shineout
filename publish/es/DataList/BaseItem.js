import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { listClass } from './styles';
import Meta from './Meta';
import Extra from './Extra';

var BaseItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BaseItem, _PureComponent);

  function BaseItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = BaseItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        extra = _this$props.extra,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "extra"]);

    if (!extra) return React.createElement(Meta, _extends({}, props, {
      className: className
    }));
    return React.createElement("div", {
      className: classnames(listClass('base'), className)
    }, React.createElement(Meta, this.props), React.createElement(Extra, {
      extra: extra
    }));
  };

  return BaseItem;
}(PureComponent);

BaseItem.propTypes = {
  avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  title: PropTypes.string,
  desc: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
};
export default BaseItem;