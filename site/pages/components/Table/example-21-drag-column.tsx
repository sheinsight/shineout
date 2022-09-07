/**
 * cn - 可伸缩列
 *    -- 设置 columnResizable，使所有列可伸缩。<br />可在columns中设置某一列 columnResizable: false 来取消伸缩该列。
 * en - Fixed head
 *    -- Set the columnResizable property to make all columns resizable. set columnResizable: false on columns item to cancel resizable.
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

const data: TableRowData[] = fetchSync(20)

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', fixed: 'left', maxWidth: 300, minWidth: 100 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

const App: React.FC = () => (
  <Table columnResizable height={300} width={1200} fixed="both" keygen="id" columns={columns} bordered data={data} />
)

export default App
