/**
 * cn - 多列排序
 *    -- 设置 column 的 sorter 为一个对象，对象的rule属性同单列排序的sorter，weight表示排序权重，值越大表示排序优先级越高
 *    -- 支持多列默认排序，为需要默认排序的列设置defaultOrder
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - multiple Sorter
 *    -- Set the sorter property of Table to indicate the method of table sort.
 *    -- Set the sorter of column to an object, the rule attribute of the object is the same as the sorter of single column sorting, weight indicates the sorting weight, the larger the value, the higher the sorting priority
 *    -- Support multi-column default sorting, set defaultOrder for columns that need default sorting
 *    -- When the sorter returns a function, use this function to sort data internally.
 *    -- Server-side or self-sorting is is handled by the user, do not return results.
 */
import React from 'react'
import { Table, TYPE } from 'shineout'
import { fetchSync } from 'doc/data/user'

interface Sorter {
  [x: string]: any
}
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

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>
type TableSorter = TableProps['sorter']
type TableColumnOrder = TYPE.Table.ColumnOrder
type TableOnSortCancel = TableProps['onSortCancel']

const data: TableRowData[] = fetchSync(1000)
const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    sorter: {
      rule: 'id',
      weight: 1,
    },
    defaultOrder: 'asc',
  },
  {
    title: 'Name',
    fixed: 'left',
    render: d => `${d.firstName} ${d.lastName}`,
    width: 160,
    sorter: {
      rule: 'firstName',
      weight: 2,
    },
    defaultOrder: 'asc',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]

const sorter: Sorter = {
  id: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) => (order === 'asc' ? a.id - b.id : b.id - a.id),
  firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
    order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName),
}

const App: React.FC = () => {
  const handleSorter: TableSorter = (name, order) => sorter[name](order)

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index)
  }

  return (
    <Table
      sorter={handleSorter}
      fixed="both"
      keygen="id"
      striped
      width={1200}
      style={{ maxHeight: 400 }}
      columns={columns}
      data={data}
      rowsInView={10}
      onSortCancel={handleCancel}
    />
  )
}

export default App
