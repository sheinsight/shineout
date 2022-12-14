import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { createElement, PureComponent } from 'react';
import PropTypes from 'prop-types';
import icons from '../icons';
import { datepickerClass } from './styles';

var Icon =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Icon, _PureComponent);

  function Icon() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Icon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        name = _this$props.name,
        onClick = _this$props.onClick,
        tag = _this$props.tag,
        disabled = _this$props.disabled;
    var newProps = {
      className: datepickerClass(className, 'icon', disabled && 'disabled'),
      onClick: disabled ? undefined : onClick
    };
    return createElement(tag, newProps, icons[name]);
  };

  return Icon;
}(PureComponent);

Icon.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  tag: PropTypes.string
};
Icon.defaultProps = {
  tag: 'span'
};
export default Icon;