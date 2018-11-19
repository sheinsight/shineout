import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'

function Next(props) {
  const {
    onChange, current, text, total, pageSize, disabled,
  } = props
  const max = Math.ceil(total / pageSize)
  const next = current + 1
  const className = text.next ? 'no-border' : ''
  return (
    <Item className={className} page={next} disabled={disabled || next > max} onClick={onChange}>
      {text.next || icons.AngleRight}
    </Item>
  )
}

Next.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

Next.displayName = 'ShineoutPaginationNext'

export default Next
