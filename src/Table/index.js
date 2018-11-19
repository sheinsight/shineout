import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import deepEqual from 'deep-eql'
import pagable from '../hoc/pagable'
import Table from './Table'

const TableWithPagination = pagable(Table)

export default class extends PureComponent {
  static displayName = 'ShineoutTable'

  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    onRowSelect: PropTypes.func,
    datum: PropTypes.object,
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

    const { onRowSelect, datum } = this.props
    columns = columns.filter(c => typeof c === 'object')

    let left = -1
    let right = -1
    columns.forEach((c, i) => {
      if (c.fixed === 'left') left = i
      if (c.fixed === 'right' && right < 0) right = i
    })

    this.cachedColumns = columns.map((c, i) => immer(c, (draft) => {
      draft.index = i
      if (draft.key === undefined) draft.key = i
      if (i <= left) draft.fixed = 'left'
      if (i === left) draft.lastFixed = true
      if (i >= right && right > 0) draft.fixed = 'right'
      if (i === right) draft.firstFixed = true
      // if (draft.type === 'expand' && !draft.width) draft.width = 48
    }))

    if ((onRowSelect || datum) && this.cachedColumns[0].type !== 'checkbox') {
      this.cachedColumns.unshift({
        key: 'checkbox',
        type: 'checkbox',
        // width: 48,
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

