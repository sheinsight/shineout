import React from 'react'
import classnames from 'classnames'
import { defaultProps } from '../utils/defaultProps'
import { iconClass } from './styles'
import { IconCompProps } from './Props'

function Icon(
  props: IconCompProps = {
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

Icon.defaultProps = {
  ...defaultProps,
  prefix: 'icon',
  fontFamily: 'iconfont',
  name: '',
  type: 'default',
}

Icon.displayName = 'ShineoutIcon'

export default Icon
