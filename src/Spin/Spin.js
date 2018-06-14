import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { range } from '../utils/numbers'

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

Spin.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  render: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spinClass: PropTypes.func,
  style: PropTypes.object,
}

Spin.defaultProps = {
  count: 0,
}
