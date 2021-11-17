import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import { range } from '../utils/numbers'

export default function Spin(props) {
  const { spinClass, count, render, size, wrapperClass, wrapperStyle } = props

  const style = Object.assign(
    {
      width: size,
      height: size,
    },
    props.style,
    wrapperStyle
  )

  const className = classname(spinClass('_'), wrapperClass)

  if (count < 1) {
    return <div style={style} className={className} />
  }

  return (
    <div style={style} className={className}>
      {range(count + 1, 1).map(i => render(spinClass, i, props))}
    </div>
  )
}

Spin.propTypes = {
  count: PropTypes.number,
  render: PropTypes.func,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spinClass: PropTypes.func,
  style: PropTypes.object,
  wrapperClass: PropTypes.string,
  wrapperStyle: PropTypes.object,
}

Spin.defaultProps = {
  count: 0,
}
