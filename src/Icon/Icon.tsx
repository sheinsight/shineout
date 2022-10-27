import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '../utils/proptypes'
import { iconClass } from './styles'
import { IconComProps } from './interface'

function Icon(
  props: IconComProps = {
    ...defaultProps,
    prefix: 'icon',
    fontFamily: 'iconfont',
    name: '',
    type: 'default',
  }
) {
  const { children, prefix, type, name, fontFamily, fontSize, ext, ...otherProps } = props

  const className = classnames(iconClass('_', type), props.className, `${prefix}-${name}`)

  const style = Object.assign(
    {},
    {
      fontFamily,
      fontSize,
    },
    props.style
  )

  if (ext === 'js') {
    return (
      <i {...otherProps} className={className} style={style}>
        <svg className={iconClass('svg')} aria-hidden="true">
          <use xlinkHref={`#${prefix}-${name}`} />
        </svg>
      </i>
    )
  }

  return (
    <i {...otherProps} className={className} style={style}>
      {children}
    </i>
  )
}

Icon.propTypes = {
  ...getProps(PropTypes, 'children', 'size', 'type'),
  prefix: PropTypes.string,
  name: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Icon.defaultProps = {
  ...defaultProps,
  prefix: 'icon',
  fontFamily: 'iconfont',
  name: '',
  type: 'default',
}

Icon.displayName = 'ShineoutIcon'

export default Icon
