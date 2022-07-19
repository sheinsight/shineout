/**
 * cn - 固定列
 *    -- 设置 column 的 fixed 属性，可以固定列。只在设置了表格的 width 属性，并且 width 大于外部容器情况下才会生效
 * en - Fixed column
 *    -- Set the fixed property of the column can fix the column; Only take effect if the table's width property is set and width is greater than the external container.
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
  { title: 'id', render: 'id', width: 50 },
  {
    title: 'First Name',
    group: 'Name',
    render: 'firstName',
    width: 120,
  },
  {
    title: 'Last Name',
    fixed: 'left',
    group: 'Name',
    render: 'lastName',
    width: 120,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    fixed: 'right',
    width: 100,
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

const App: React.FC = () => (
  <Table bordered fixed="both" keygen="id" width={1500} style={{ height: 300 }} columns={columns} data={data} />
)

export default App
