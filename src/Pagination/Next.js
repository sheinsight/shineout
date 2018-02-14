import React from 'react'
import PropTypes from 'prop-types'
import icons from '../icons'
import Item from './Item'

function Next(props) {
  const {
    onChange, current, text, total, pageSize,
  } = props
  const max = Math.ceil(total / pageSize)
  const next = current + 1
  const className = text.next ? 'no-border' : ''
  return (
    <Item className={className} page={next} disabled={next > max} onClick={onChange}>
      {text.next || icons.AngleRight}
    </Item>
  )
}

Next.propTypes = {
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  text: PropTypes.object,
  total: PropTypes.number.isRequired,
}

export default Next
