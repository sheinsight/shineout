import React from 'react'
import classnames from 'classnames'
import { range } from '../utils/numbers'
import propTypes from './proptypes'

export default function Spin(props) {
  const {
    size, margin, spinClass, count, render,
  } = props

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

  if (count < 1) {
    return <div style={style} className={className} />
  }

  return (
    <div style={style} className={className}>
      { range(count + 1, 1).map(i => render(spinClass, i, props)) }
    </div>
  )
}

Spin.propTypes = propTypes

Spin.defaultProps = {
  count: 0,
}
