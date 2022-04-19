import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { progressClass } from './styles'
import analyzeColor from './analyzeColor'
import Popup from './Popup'
import { isRTL } from '../config'

function Line(props) {
  const { children, strokeWidth, type, value, color, style, background, popup } = props
  const hasChildren = children !== undefined
  const isPopup = popup && hasChildren
  const className = classnames(progressClass('line', type, isPopup && 'line-popup', isRTL() && 'rtl'), props.className)
  const innerStyle = {
    width: `${(value / 100) * 100}%`,
    borderRadius: strokeWidth / 2,
  }

  if (typeof color === 'string') {
    innerStyle.background = color
    innerStyle.backgroundSize = '1em 1em'
  } else if (typeof color === 'object') {
    innerStyle.background = `linear-gradient(to right, ${analyzeColor(color).reduce((p, v) => {
      const col = `${v.color} ${v.pos}`
      return p ? `${p},${col}` : col
    }, '')})`
  }

  return (
    <div className={className} style={style}>
      <div
        className={progressClass('background')}
        style={{ height: strokeWidth, background, borderRadius: strokeWidth / 2 }}
      >
        <div className={progressClass('front')} style={innerStyle} />
      </div>
      {hasChildren &&
        (popup ? <Popup {...props} value={value} /> : <div className={progressClass('content')}>{children}</div>)}
    </div>
  )
}

Line.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  strokeWidth: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: PropTypes.number,
  popup: PropTypes.bool,
}

Line.defaultProps = {
  strokeWidth: 8,
}

export default Line
