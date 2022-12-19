import React, { ComponentType } from 'react'
import immer from 'immer'
import deepEqual from 'deep-eql'
import pagable from '../hoc/pagable'
import Table from './Table'
import { compose } from '../utils/func'
import { isFunc } from '../utils/is'
import treeExpand from './TreeExpand'
import {
  ColumnItem,
  ColumnItemWithFixed,
  ColumnOrder,
  SorterState,
  TableIndexProps,
  TableProps,
  TablePropsWidthPT,
} from './Props'

const TableWithPagination = pagable(Table as ComponentType<TableProps<any, any>>)
const TableWithTree = treeExpand<any, any>(Table)
const TableWithPT = compose(
  pagable,
  treeExpand
)(Table)

interface TableIndexState<DataItem> {
  sorter: SorterState<DataItem>[]
}
export default class TableIndex<DataItem, Value> extends React.Component<
  TableIndexProps<DataItem, Value>,
  TableIndexState<DataItem>
> {
  cacheDefaultSorterList: Array<SorterState<DataItem>>

  oldColumns: TableIndexProps<DataItem, Value>['columns']

  cachedColumns: TableProps<DataItem, Value>['columns']

  static displayName = 'ShineoutTable'

  static defaultProps = {
    data: [],
  }

  constructor(props: TableIndexProps<DataItem, Value>) {
    super(props)
    this.state = {
      sorter: [],
    }

    this.handleSortChange = this.handleSortChange.bind(this)
    this.cacheDefaultSorterList = []
  }

  getTreeColumnsName() {
    const columns = this.getFilteredColumn()
    if (!Array.isArray(columns)) return undefined
    const has = columns.filter(v => typeof v.treeColumnsName === 'string')
    if (has.length === 0) return undefined
    return has[0].treeColumnsName
  }

  getColumns(columns: TableIndexProps<DataItem, Value>['columns'] = []) {
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
    this.cachedColumns = (columns as ColumnItemWithFixed<DataItem>[]).map((c, i) =>
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
    // filter checkbox
    const haveCheckbox = columns.find(v => v.type === 'checkbox')
    if ((onRowSelect || datum) && this.cachedColumns[0] && this.cachedColumns[0].type !== 'checkbox' && !haveCheckbox) {
      this.cachedColumns.unshift({
        index: -1,
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
        const a1 = ((a[sorter as keyof DataItem] || '') as any).toString()
        const b1 = ((b[sorter as keyof DataItem] || '') as any).toString()
        return order === 'asc' ? a1.localeCompare(b1) : b1.localeCompare(a1)
      }
    }
    return tableSorter
  }

  getFilteredColumn() {
    const { columns } = this.props
    if (!columns) return columns
    return columns.filter(v => !(['expand', 'row-expand'].indexOf(v.type!) > -1 && v.hide))
  }

  getExternalExpandObj() {
    const { columns } = this.props
    if (!columns) return undefined
    const obj = columns.find(v => ['expand', 'row-expand'].indexOf(v.type!) > -1 && v.hide)
    if (obj && typeof obj === 'object') return obj
    return undefined
  }

  handleSortChange(
    order: ColumnOrder | undefined,
    sorter: Required<ColumnItem<DataItem>>['sorter'],
    index: number,
    cancelOrder: ColumnOrder,
    manual: boolean
  ) {
    const { onSortCancel } = this.props
    // cancel sorter
    if (!order) {
      this.setState(
        immer(state => {
          const item = state.sorter.find((v: SorterState<DataItem>) => v.index === index)
          if (item) {
            item.order = undefined
            item.manual = true
            item.deleted = true
          }
        }),
        () => {
          const rpm = this.state.sorter
            .filter(v => v.order && !v.deleted)
            .map(v => ({ order: v.order!, index: v.index, weight: v.weight, manual: v.manual }))
          if (typeof sorter === 'object' && typeof sorter.rule === 'function') {
            sorter.rule(rpm)
          }
          if (onSortCancel) onSortCancel(cancelOrder, index, rpm, sorter)
        }
      )
      return
    }
    if (typeof sorter === 'object') {
      this.setState(
        immer((state: TableIndexState<DataItem>) => {
          let rpm: SorterState<DataItem>[] = state.sorter.map(v => ({
            order: v.order,
            index: v.index,
            weight: v.weight,
            manual: v.manual,
            deleted: v.deleted,
          }))
          const item = state.sorter.find(v => v.index === index)
          if (state.sorter.length === 1 && !state.sorter[0].multiple) {
            state.sorter = []
            rpm = []
          }
          if (item) {
            item.order = order
            item.manual = manual
            item.deleted = false
            const rpmItem = rpm.find(v => v.index === index)!
            rpmItem.order = order
            rpmItem.manual = manual
            rpm = rpm.filter(v => v.order && !v.deleted)
            const sort = typeof sorter.rule === 'string' ? this.getTableSorter()(sorter.rule, order, rpm) : undefined
            item.sort = sort!
          } else {
            if (manual) {
              this.cacheDefaultSorterList = []
              rpm.push({ order, index, weight: sorter.weight, manual, deleted: false })
              rpm = rpm.filter(v => v.order && !v.deleted)
            }
            if (!manual) {
              this.cacheDefaultSorterList.push({
                order,
                index,
                weight: sorter.weight,
                deleted: false,
                multiple: false,
                manual,
              })
              rpm = this.cacheDefaultSorterList
            }
            const sort = typeof sorter.rule === 'string' ? this.getTableSorter()(sorter.rule, order, rpm) : undefined
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
            rpm = rpm.filter(v => v.order && !v.deleted)
            sorter.rule(rpm)
          }
        })
      )
    } else {
      const sort = typeof sorter === 'string' ? this.getTableSorter()(sorter, order, [{ order, index }]) : sorter(order)
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
    if (!columns) return <Table {...(props as unknown) as TableProps<DataItem, Value>} />

    let { data } = this.props
    if (!sorter.length) {
      sorter = immer(sorter, draft => {
        // @ts-ignore
        draft.push({})
      })
    }
    sorter
      .filter(v => !v.deleted)
      .forEach(v => {
        if (v.sort) data = immer(data, (draft: DataItem[]) => draft.sort(v.sort!))
      })

    const treeColumnsName = this.getTreeColumnsName()
    let Component: any = Table
    if (props.pagination && treeColumnsName) {
      Component = TableWithPT
    } else if (props.pagination) {
      Component = TableWithPagination
    } else if (treeColumnsName) {
      Component = TableWithTree
    }

    const externalExpandRender = (this.getExternalExpandObj() || {}).render
    const externalExpandOnClick = (this.getExternalExpandObj() || {}).onClick

    const ComponentPT = Component as ComponentType<TablePropsWidthPT<DataItem, Value>>

    return (
      <ComponentPT
        {...props}
        onChange={onRowSelect}
        columns={this.getColumns(columns)}
        data={data}
        sorter={sorter}
        onSortChange={this.handleSortChange}
        treeColumnsName={treeColumnsName}
        externalExpandRender={isFunc(externalExpandRender) ? externalExpandRender : undefined}
        externalExpandClick={externalExpandOnClick}
      />
    )
  }
}
