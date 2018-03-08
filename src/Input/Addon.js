import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass } from '../styles'

export default function Addon(props) {
  const { children, className, style } = props
  const newClassName = classnames(inputClass('addon'), className)
  return <span className={newClassName} style={style}>{children}</span>
}

Addon.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
}
