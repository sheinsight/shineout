/**
 * cn -
 *    -- 示例：只固定右侧列
 * en -
 *    -- Example: Only fix the right column.
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

const data: TableRowData[] = fetchSync(6)

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  {
    title: 'Date',
    render: 'start',
    fixed: 'right',
    group: 'Start Time',
    width: 120,
  },
  {
    title: 'Time',
    render: 'time',
    group: 'Start Time',
    width: 80,
  },
]

const App: React.FC = () => <Table fixed="x" keygen="id" width={1500} columns={columns} data={data} />

export default App
