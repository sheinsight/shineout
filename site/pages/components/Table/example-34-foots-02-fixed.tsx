/**
 * cn -
 *    -- 固定列用法
 * en -
 *    -- Fixed column usage
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

type TableProps = TYPE.Table.Props<TableRowData, number[]>

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

const foots: TableProps['foots'] = [
  [
    { render: () => <span>Summary</span>, colSpan: 3 },
    { render: () => <span>summary content</span>, colSpan: 4 },
    { render: () => <span>summary2</span> },
  ],
]

const App: React.FC = () => (
  <Table
    bordered
    fixed="both"
    keygen="id"
    width={1500}
    style={{ height: 300 }}
    columns={columns}
    data={data}
    foots={foots}
  />
)

export default App
