import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { progressClass } from '../styles'

function Circle(props) {
  const {
    children, strokeWidth, type, color, size, value, background, strokeLinecap,
  } = props
  const className = classnames(progressClass('circle', type), props.className)

  const r = 100 - Math.ceil((strokeWidth / size) * 100)

  const p = Math.PI * 2 * r
  const dasharray = [p * (value / 100), p * (1 - (value / 100))]
  const style = Object.assign({ width: size, height: size }, props.style)

  return (
    <div className={className} style={style}>
      <svg viewBox="0 0 200 200">
        <circle
          className={progressClass('background')}
          cx="100"
          cy="100"
          r={r}
          strokeWidth={strokeWidth * 2}
          fill="transparent"
          style={{ stroke: background }}
        />
        {
          value > 0 &&
          <circle
            className={progressClass('front')}
            cx="100"
            cy="100"
            r={r}
            fill="transparent"
            style={{ stroke: color }}
            strokeDasharray={dasharray}
            strokeLinecap={strokeLinecap}
            strokeWidth={strokeWidth * 2}
          />
        }
      </svg>
      { children && <div className={progressClass('content')}>{children}</div> }
    </div>
  )
}

Circle.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  strokeLinecap: PropTypes.string,
  strokeWidth: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: PropTypes.number,
}

Circle.defaultProps = {
  strokeLinecap: 'round',
  strokeWidth: 8,
  size: 100,
}

export default Circle

