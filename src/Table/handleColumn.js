import React from 'react'
import PropTypes from 'prop-types'
import hash from '../utils/hash'

export default function (Table) {
  function ColumnTable({ columns, ...props }) {
    if (!columns) return <Table {...props} />

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

    return <Table {...props} columns={cols} />
  }

  ColumnTable.propTypes = {
    columns: PropTypes.array,
  }

  ColumnTable.defaultProps = {
    columns: undefined,
  }

  return ColumnTable
}
