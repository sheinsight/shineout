import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import deepEqual from 'fast-deep-equal'
import hash from '../utils/hash'
import pagable from '../hoc/pagable'
import Table from './Table'

const TableWithPagination = pagable(Table)

export default class extends PureComponent {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    onRowSelect: PropTypes.func,
    value: PropTypes.object,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      sorter: {},
    }

    this.handleSortChange = this.handleSortChange.bind(this)
  }

  getColumns(columns) {
    if (deepEqual(columns, this.oldColumns)) {
      return this.cachedColumns
    }

    const { onRowSelect, value } = this.props

    let left = -1
    let right = -1
    columns.forEach((c, i) => {
      if (c.fixed === 'left') left = i
      if (c.fixed === 'right' && right < 0) right = i
    })

    this.cachedColumns = columns.map((c, i) => immer(c, (draft) => {
      draft.index = i
      if (!draft.key) draft.key = hash(c)
      if (i <= left) draft.fixed = 'left'
      if (i === left) draft.lastFixed = true
      if (i >= right && right > 0) draft.fixed = 'right'
      if (i === right) draft.firstFixed = true
    }))

    if (onRowSelect || value) {
      this.cachedColumns.unshift({
        key: 'checkbox',
        type: 'checkbox',
        width: 40,
        fixed: left >= 0 ? 'left' : undefined,
      })
    }

    this.oldColumns = columns

    return this.cachedColumns
  }

  handleSortChange(order, sorter, index) {
    this.setState(immer((state) => {
      state.sorter.order = order
      state.sorter.index = index
      state.sorter.sort = sorter(order)
    }))
  }

  render() {
    const { columns, onRowSelect, ...props } = this.props
    const { sorter } = this.state
    if (!columns) return <Table {...props} />

    let { data } = this.props
    if (sorter.sort) {
      data = immer(data, draft => draft.sort(sorter.sort))
    }

    const Component = props.pagination ? TableWithPagination : Table
    return (
      <Component
        {...props}
        onChange={onRowSelect}
        columns={this.getColumns(columns)}
        data={data}
        sorter={sorter}
        onSortChange={this.handleSortChange}
      />
    )
  }
}

