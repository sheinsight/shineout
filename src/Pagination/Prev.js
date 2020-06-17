import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'

function Prev(props) {
  const { onChange, current, text, disabled, size = '' } = props
  const prev = current - 1
  const className = text.prev ? `no-border ${size}` : size
  return (
    <Item className={className} page={prev} disabled={disabled || prev < 1} onClick={onChange}>
      {text.prev || icons.AngleLeft}
    </Item>
  )
}

Prev.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.object,
  size: PropTypes.string,
}

Prev.displayName = 'ShineoutPaginationPrev'

export default Prev
