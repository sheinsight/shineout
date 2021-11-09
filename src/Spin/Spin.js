import React from 'react'
import PropTypes from 'prop-types'
import { range } from '../utils/numbers'

export default function Spin(props) {
  const { spinClass, count, render, size } = props

  const style = Object.assign(
    {
      width: size,
      height: size,
    },
    props.style
  )

  if (count < 1) {
    return <div style={style} className={spinClass('_')} />
  }

  return (
    <div style={style} className={spinClass('_')}>
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
}

Spin.defaultProps = {
  count: 0,
}
