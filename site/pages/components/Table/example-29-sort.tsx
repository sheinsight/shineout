/**
 * cn - 排序 (旧)
 *    -- 设置 column 的 sorter 属性标示此列需要排序
 *    -- sorter 返回一个 sort 函数时，使用这个函数对数据进行内部排序
 *    -- 后端或自行排序用户自行处理，sorter 函数不要返回结果
 * en - Sorter (Out of date)
 *    -- Set the sorter property of column to indicate that this column can be sorted.
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

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>

const data: TableRowData[] = fetchSync(1000)

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    sorter: order => (a, b) => {
      if (order === 'asc') return a.id - b.id
      return b.id - a.id
    },
  },
  {
    title: 'Name',
    fixed: 'left',
    render: d => `${d.firstName} ${d.lastName}`,
    width: 160,
    sorter: order => (a, b) => {
      if (order === 'asc') return a.firstName.localeCompare(b.firstName)
      return b.firstName.localeCompare(a.firstName)
    },
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]

const App: React.FC = () => (
  <Table
    striped
    keygen="id"
    data={data}
    fixed="both"
    width={1200}
    rowsInView={10}
    columns={columns}
    style={{ maxHeight: 400 }}
  />
)

export default App
