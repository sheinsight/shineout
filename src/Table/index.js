import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import hash from '../utils/hash'
import Table from './Table'

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

    const cols = columns.map((c, i) => {
      const nc = Object.assign({}, c)
      if (!nc.key) nc.key = hash(c)
      if (i <= left) nc.fixed = 'left'
      if (i >= right && right > 0) nc.fixed = 'right'
      return nc
    })

    return <Table {...props} columns={cols} />
  }
}

