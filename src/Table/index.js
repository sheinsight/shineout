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
    data: PropTypes.array,
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

  handleSortChange(order, sorter, index) {
    this.setState(immer((state) => {
      state.sorter.order = order
      state.sorter.index = index
      state.sorter.sort = sorter(order)
    }))
  }

  render() {
    const { columns, ...props } = this.props
    const { sorter } = this.state
    if (!columns) return <Table {...props} />

    let left = -1
    let right = -1
    columns.forEach((c, i) => {
      if (c.fixed === 'left') left = i
      if (c.fixed === 'right' && right < 0) right = i
    })

    const cols = columns.map((c, i) => immer(c, (draft) => {
      draft.index = i
      if (!draft.key) draft.key = hash(c)
      if (i <= left) draft.fixed = 'left'
      if (i >= right && right > 0) draft.fixed = 'right'
    }))

    let { data } = this.props
    if (sorter.sort) {
      data = immer(data, draft => draft.sort(sorter.sort))
    }

    const Component = props.pagination ? TableWithPagination : Table
    return (
      <Component
        {...props}
        columns={cols}
        data={data}
        sorter={sorter}
        onSortChange={this.handleSortChange}
      />
    )
  }
}

