import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { progressClass } from '../styles'
import analyzeColor from './analyzeColor'

function Circle(props) {
  const { children, strokeWidth, type, color, size, value, background, strokeLinecap } = props
  const className = classnames(progressClass('circle', type), props.className)

  const r = 100 - Math.ceil(((strokeWidth * 2) / size) * 100)

  const p = Math.PI * 2 * r
  const dasharray = [p * (value / 100), p * (1 - value / 100)]
  const style = Object.assign({ width: size, height: size }, props.style)
  const width = value === 0 && strokeLinecap === 'round' ? 0 : strokeWidth * 2
  const objColor = color && typeof color === 'object'

  return (
    <div className={className} style={style}>
      <svg viewBox="0 0 200 200">
        {objColor ? (
          <defs>
            <linearGradient id="progress-linear" x1="50%" x2="50%" y1="0%" y2="100%">
              {analyzeColor(color).map(c => (
                <stop key={c.pos} offset={c.pos} stopColor={c.color} />
              ))}
            </linearGradient>
          </defs>
        ) : null}
        <circle
          className={progressClass('background')}
          cx="100"
          cy="100"
          r={r}
          strokeWidth={strokeWidth * 2}
          fill="transparent"
          style={{ stroke: background }}
        />
        <circle
          className={progressClass('front')}
          cx="100"
          cy="100"
          r={r}
          fill="transparent"
          style={{ stroke: objColor ? "url('#progress-linear')" : color }}
          strokeDasharray={dasharray}
          strokeLinecap={strokeLinecap}
          strokeWidth={width}
        />
      </svg>
      {children && <div className={progressClass('content')}>{children}</div>}
    </div>
  )
}

Circle.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
