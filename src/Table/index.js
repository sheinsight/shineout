import React from 'react'
import PropTypes from 'prop-types'
import immer from 'immer'
import deepEqual from 'deep-eql'
import pagable from '../hoc/pagable'
import Table from './Table'
import { compose } from '../utils/func'
import treeExpand from './TreeExpand'

const TableWithPagination = pagable(Table)
const TableWithTree = treeExpand(Table)
const TableWithPT = compose(
  treeExpand,
  pagable
)(Table)

export default class extends React.Component {
  static displayName = 'ShineoutTable'

  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    onRowSelect: PropTypes.func,
    datum: PropTypes.object,
    sorter: PropTypes.func,
    onSortCancel: PropTypes.func,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      sorter: [],
    }

    this.handleSortChange = this.handleSortChange.bind(this)
  }

  getTreeColumnsName() {
    const columns = this.getFilteredColumn()
    if (!Array.isArray(columns)) return undefined
    const has = columns.filter(v => typeof v.treeColumnsName === 'string')
    if (has.length === 0) return undefined
    return has[0].treeColumnsName
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
    let setDefaultOrder = false
    this.cachedColumns = columns.map((c, i) =>
      immer(c, draft => {
        draft.index = i
        if (draft.key === undefined) draft.key = i
        if (i <= left) draft.fixed = 'left'
        if (i === left) draft.lastFixed = true
        if (i >= right && right > 0) draft.fixed = 'right'
        if (i === right) draft.firstFixed = true
        if (typeof draft.sorter !== 'object') {
          if (draft.defaultOrder && setDefaultOrder) delete draft.defaultOrder
          if (draft.defaultOrder) setDefaultOrder = true
        }
        // if (draft.type === 'expand' && !draft.width) draft.width = 48
      })
    )
    if (this.cachedColumns.find(v => typeof v.sorter !== 'object' && v.defaultOrder)) {
      this.cachedColumns = this.cachedColumns.map(v =>
        immer(v, draft => {
          if (typeof draft.sorter === 'object' && draft.defaultOrder) delete draft.defaultOrder
        })
      )
    }
    if ((onRowSelect || datum) && this.cachedColumns[0] && this.cachedColumns[0].type !== 'checkbox') {
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

  getTableSorter() {
    let { sorter: tableSorter } = this.props
    if (!tableSorter) {
      console.error('You need to specify a sorter as a sort function for the table. Default alphabetical order.')
      tableSorter = (sorter, order) => (a, b) => {
        const a1 = (a[sorter] || '').toString()
        const b1 = (b[sorter] || '').toString()
        return order === 'asc' ? a1.localeCompare(b1) : b1.localeCompare(a1)
      }
    }
    return tableSorter
  }

  getFilteredColumn() {
    const { columns } = this.props
    if (!columns) return columns
    return columns.filter(v => !(['expand', 'row-expand'].indexOf(v.type) > -1 && v.hide))
  }

  getExternalExpandObj() {
    const { columns } = this.props
    if (!columns) return undefined
    const obj = columns.find(v => ['expand', 'row-expand'].indexOf(v.type) > -1 && v.hide)
    if (obj && typeof obj === 'object') return obj
    return undefined
  }

  handleSortChange(order, sorter, index, cancelOrder, manual) {
    const { onSortCancel } = this.props
    // cancel sorter
    if (!order) {
      this.setState(
        immer(state => {
          const item = state.sorter.find(v => v.index === index)
          if (item) {
            item.order = undefined
            item.manual = true
            item.deleted = true
          }
          if (typeof sorter === 'object' && typeof sorter.rule === 'function') {
            const rpm = state.sorter.filter(v => v.order && !v.deleted).map(v => ({ order: v.order, index: v.index }))
            sorter.rule(rpm)
          }
        }),
        () => {
          if (onSortCancel) onSortCancel(cancelOrder, index)
        }
      )
      return
    }
    if (typeof sorter === 'object') {
      const sort = typeof sorter.rule === 'string' ? this.getTableSorter()(sorter.rule, order) : undefined
      this.setState(
        immer(state => {
          const item = state.sorter.find(v => v.index === index)
          if (state.sorter.length === 1 && !state.sorter[0].multiple) state.sorter = []
          if (item) {
            item.order = order
            item.sort = sort
            item.manual = manual
            item.deleted = false
          } else {
            state.sorter.push({
              order,
              index,
              sort,
              manual,
              multiple: true,
              weight: sorter.weight,
              deleted: false,
            })
            state.sorter.sort((a, b) => {
              const a1 = (a.weight || 0).toString()
              const b1 = (b.weight || 0).toString()
              return a1.localeCompare(b1)
            })
          }
          if (typeof sorter.rule === 'function') {
            const rpm = state.sorter.filter(v => v.order && !v.deleted).map(v => ({ order: v.order, index: v.index }))
            sorter.rule(rpm)
          }
        })
      )
    } else {
      const sort = typeof sorter === 'string' ? this.getTableSorter()(sorter, order) : sorter(order)
      this.setState(
        immer(state => {
          state.sorter = []
          state.sorter.push({
            order,
            index,
            sort,
            manual,
            multiple: false,
            deleted: false,
          })
        })
      )
    }
  }

  render() {
    const { onRowSelect, ...props } = this.props
    const columns = this.getFilteredColumn()
    let { sorter } = this.state
    if (!columns) return <Table {...props} />

    let { data } = this.props
    if (!sorter.length) {
      sorter = immer(sorter, draft => {
        draft.push({})
      })
    }
    sorter
      .filter(v => !v.deleted)
      .forEach(v => {
        if (v.sort) data = immer(data, draft => draft.sort(v.sort))
      })

    const treeColumnsName = this.getTreeColumnsName()
    let Component = Table
    if (props.pagination && treeColumnsName) {
      Component = TableWithPT
    } else if (props.pagination) {
      Component = TableWithPagination
    } else if (treeColumnsName) {
      Component = TableWithTree
    }

    const externalExpandRender = (this.getExternalExpandObj() || {}).render
    const externalExpandOnClick = (this.getExternalExpandObj() || {}).onClick

    return (
      <Component
        {...props}
        onChange={onRowSelect}
        columns={this.getColumns(columns)}
        data={data}
        sorter={sorter}
        onSortChange={this.handleSortChange}
        treeColumnsName={treeColumnsName}
        externalExpandRender={externalExpandRender}
        externalExpandClick={externalExpandOnClick}
      />
    )
  }
}
