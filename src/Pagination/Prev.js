import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'

function Prev({ onChange, current, text }) {
  const prev = current - 1
  const className = text.prev ? 'no-border' : ''
  return (
    <Item className={className} page={prev} disabled={prev < 1} onClick={onChange}>
      {text.prev || icons.AngleLeft}
    </Item>
  )
}

Prev.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.object,
}

export default Prev
