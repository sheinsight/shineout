import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getProps, defaultProps } from '../utils/proptypes';
import { iconClass } from './styles';

function Icon(props) {
  var children = props.children,
      prefix = props.prefix,
      type = props.type,
      name = props.name,
      fontFamily = props.fontFamily,
      fontSize = props.fontSize,
      ext = props.ext,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "prefix", "type", "name", "fontFamily", "fontSize", "ext"]);

  var className = classnames(iconClass('_', type), props.className, prefix + "-" + name);
  var style = Object.assign({}, {
    fontFamily: fontFamily,
    fontSize: fontSize
  }, props.style);

  if (ext === 'js') {
    return React.createElement("i", _extends({}, otherProps, {
      className: className,
      style: style
    }), React.createElement("svg", {
      className: iconClass('svg'),
      "aria-hidden": "true"
    }, React.createElement("use", {
      xlinkHref: "#" + prefix + "-" + name
    })));
  }

  return React.createElement("i", _extends({}, otherProps, {
    className: className,
    style: style
  }), children);
}

Icon.propTypes = _objectSpread({}, getProps(PropTypes, 'children', 'size', 'type'), {
  prefix: PropTypes.string,
  name: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});
Icon.defaultProps = _objectSpread({}, defaultProps, {
  prefix: 'icon',
  fontFamily: 'iconfont',
  name: '',
  type: 'default'
});
Icon.displayName = 'ShineoutIcon';
export default Icon;