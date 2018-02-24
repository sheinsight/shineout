import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import hash from '../utils/hash'
import pagable from '../hoc/pagable'
import Table from './Table'

const TableWithPagination = pagable(Table)

export default class extends PureComponent {
  static propTypes = {
    columns: PropTypes.array,
  }

  render() {
    const { columns, ...props } = this.props
    if (!columns) return <Table {...props} />

    let left = -1
    let right = -1
    columns.forEach((c, i) => {
      if (c.fixed === 'left') left = i
      if (c.fixed === 'right' && right < 0) right = i
    })

    const cols = columns.map((c, i) => immer(c, (nc) => {
      if (!nc.key) nc.key = hash(c)
      if (i <= left) nc.fixed = 'left'
      if (i >= right && right > 0) nc.fixed = 'right'
    }))

    const Component = props.pagination ? TableWithPagination : Table
    return <Component {...props} columns={cols} />
  }
}

