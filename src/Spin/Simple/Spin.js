import React from 'react'
import classnames from 'classnames'
import propTypes from '../proptypes'

export default function Spin(props) {
  const { size, spinClass, margin } = props

  const className = classnames(
    spinClass('_'),
    props.className,
  )

  const style = Object.assign(
    {
      width: size,
      height: size,
      margin,
    },
    props.style,
  )

  return (
    <div style={style} className={className} />
  )
}

Spin.propTypes = propTypes
