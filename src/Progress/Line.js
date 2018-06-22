import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { progressClass } from '../styles'

function Line(props) {
  const {
    children, strokeWidth, type, value, color, style, background,
  } = props
  const className = classnames(progressClass('line', type), props.className)
  const innerStyle = {
    background: color,
    backgroundSize: '1em 1em',
    width: `${(value / 100) * 100}%`,
    borderRadius: strokeWidth / 2,
  }

  return (
    <div className={className} style={style}>
      <div
        className={progressClass('background')}
        style={{ height: strokeWidth, background, borderRadius: strokeWidth / 2 }}
      >
        <div className={progressClass('front')} style={innerStyle} />
      </div>
      { children !== undefined && <div className={progressClass('content')}>{children}</div> }
    </div>
  )
}

Line.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: PropTypes.number,
}

Line.defaultProps = {
  strokeWidth: 8,
}

export default Line
