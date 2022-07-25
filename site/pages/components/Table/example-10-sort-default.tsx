/**
 * cn - 排序
 *    -- 设置 Table 的 sorter 属性统一指定排序函数
 *    -- 设置 column 的 sorter 标示此列需要排序并指定依据字段，会作为第一个参数传入排序函数
 *    -- defaultOrder 指定该列默认排序规则
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort.
 *    -- Set the sorter property of Column to indicate the sort key string, will pass to table sorter method
 *    -- Set defaultOrder mark defualt order
 *    -- When the sorter returns a function, use this function to sort data internally.
 *    -- Server-side or self-sorting is is handled by the user, do not return results.
 */
import React from 'react'
import { Table, TYPE } from 'shineout'
import { fetchSync } from 'doc/data/user'

interface TableRowData {
  id: number
  time: string
  start: string
  height: number
  salary: number
  office: string
  country: string
  office5: string
  position: string
  lastName: string
  firstName: string
}
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>
type TableSorter = TableProps['sorter']
type TableColumnOrder = TYPE.Table.ColumnOrder
type TableOnSortCancel = TableProps['onSortCancel']
type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>

const data: TableRowData[] = fetchSync(1000)

const columns: TableColumnItem[] = [
  {
    width: 80,
    title: 'id',
    render: 'id',
    sorter: 'id',
  },
  {
    title: 'Name',
    fixed: 'left',
    width: 160,
    sorter: 'firstName',
    defaultOrder: 'asc',
    render: d => `${d.firstName} ${d.lastName}`,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]

const App: React.FC = () => {
  const sorter: {
    [x: string]: Function
  } = {
    id: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.id - b.id : b.id - a.id,
    firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName),
  }

  const handleSorter: TableSorter = (name, order) => sorter[name](order)

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index)
  }

  return (
    <Table
      striped
      data={data}
      keygen="id"
      fixed="both"
      width={1200}
      rowsInView={10}
      columns={columns}
      sorter={handleSorter}
      style={{ maxHeight: 400 }}
      onSortCancel={handleCancel}
    />
  )
}

export default App
