import React from 'react'
import PropTypes from 'prop-types'
import { getProps, defaultProps } from '../utils/proptypes'

function Icon(props) {
  const {
    fontName,
    iconSize,
    iconType,
    iconColor,
    className,
    style,
    ...otherProps
  } = props
  const useStyle = { ...style, fontSize: iconSize, color: iconColor }
  return (<i {...otherProps} style={useStyle} className={`${className} ${iconType}`} />)
}

Icon.propTypes = {
  ...getProps(),
  fontName: PropTypes.string,
  iconSize: PropTypes.number,
  className: PropTypes.string,
  iconColor: PropTypes.string,
  style: PropTypes.object,
}

Icon.defaultProps = {
  ...defaultProps,
  fontName: '',
  iconSize: 16,
  className: '',
  iconColor: '#000000',
  style: {},
}

export default Icon
