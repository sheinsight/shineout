import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps } from '../utils/proptypes';
import { dividerClass } from './styles';

var Divider =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Divider, _PureComponent);

  function Divider() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Divider.prototype;

  _proto.showText = function showText() {
    var _this$props = this.props,
        children = _this$props.children,
        mode = _this$props.mode;
    return children && mode === 'horizontal';
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children,
        mode = _this$props2.mode,
        orientation = _this$props2.orientation,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["className", "children", "mode", "orientation"]);

    var mc = classnames(dividerClass('_', mode, children && 'with-text', orientation && "with-text-" + orientation), className);
    return React.createElement("div", _extends({}, restProps, {
      className: mc
    }), this.showText() && React.createElement("span", {
      className: dividerClass('inner-text')
    }, children));
  };

  return Divider;
}(PureComponent);

Divider.propTypes = _objectSpread({}, getProps(PropTypes), {
  mode: PropTypes.oneOf(['horizontal', 'vertical']),
  orientation: PropTypes.oneOf(['left', 'center', 'right'])
});
Divider.defaultProps = {
  mode: 'horizontal'
};
export default Divider;