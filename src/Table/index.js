import React from 'react'
import PropTypes from 'prop-types'
import hash from '../utils/hash'
import TableView from './Table'

function Table({ columns, ...props }) {
  if (!columns) return <TableView {...props} />

  let left = -1
  let right = -1
  columns.forEach((c, i) => {
    if (c.fixed === 'left') left = i
    if (c.fixed === 'right' && right < 0) right = i
  })

  const cols = columns.map((c, i) => {
    const nc = Object.assign({
      lastFixed: i === left,
      firstFixed: i === right,
    }, c)
    if (!nc.key) nc.key = hash(c)
    if (i <= left) nc.fixed = 'left'
    if (i >= right && right > 0) nc.fixed = 'right'
    return nc
  })

  return <TableView {...props} columns={cols} />
}

Table.propTypes = {
  columns: PropTypes.array,
}

Table.defaultProps = {
  columns: undefined,
}

export default Table
