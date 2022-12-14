import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { range } from '../utils/numbers';
export default function Spin(props) {
  var spinClass = props.spinClass,
      count = props.count,
      render = props.render,
      size = props.size,
      wrapperClass = props.wrapperClass,
      wrapperStyle = props.wrapperStyle;
  var style = Object.assign({
    width: size,
    height: size
  }, props.style, wrapperStyle);
  var className = classname(spinClass('_'), wrapperClass);

  if (count < 1) {
    return React.createElement("div", {
      style: style,
      className: className
    });
  }

  return React.createElement("div", {
    style: style,
    className: className
  }, range(count + 1, 1).map(function (i) {
    return render(spinClass, i, props);
  }));
}
Spin.propTypes = {
  count: PropTypes.number,
  render: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spinClass: PropTypes.func,
  style: PropTypes.object,
  wrapperClass: PropTypes.string,
  wrapperStyle: PropTypes.object
};
Spin.defaultProps = {
  count: 0
};