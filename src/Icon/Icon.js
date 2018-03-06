import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { iconClass } from '../styles'

function Icon(props) {
  const {
    prefix,
    type,
    size,
    name,
    style,
    fontFamily,
    ...otherProps
  } = props
  const className = classnames(iconClass('_', type, {
    small: size === 'small',
    large: size === 'large',
  }), props.className)
  const iconClassString = ` ${prefix}-${name} `
  return (<i {...otherProps} className={`${className} ${iconClassString}`} style={{ ...style, fontFamily }} />)
}

Icon.propTypes = {
  ...getProps('size', 'type'),
  prefix: PropTypes.string,
  name: PropTypes.string,
  fontFamily: PropTypes.string,
}

Icon.defaultProps = {
  ...defaultProps,
  prefix: 'icon',
  fontFamily: 'iconfont',
  name: '',
  size: 'default',
  type: 'default',
}

export default Icon
