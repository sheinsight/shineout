/**
 * cn - expand bug
 *    -- 修复了展开行在滚动时的问题
 * en - expand bug
 *    -- Fixed the problem of expanding rows when scrolling
 */
import React from 'react'
import { Table } from 'shineout'

const TableData = Array.from({ length: 2 }, (_, i) => ({
  id: i,
  name: `name-name-name-name-name-${i}`,
  office: `office-${i}`,
  start: `date-${i}`,
}))

const columns = [
  { title: 'id', render: 'id', width: 50 },
  {
    type: 'row-expand',
    width: 50,
    render: d => () => <div style={{ height: 150 }}>{JSON.stringify(d)}</div>,
  },
  { title: 'Name', render: 'name', width: 120 },
  { title: 'Office', render: 'office', width: 120 },
  { title: 'Start Date', render: 'start', width: 120 },
  { title: 'Salary', render: 'salary', width: 120 },
  { title: 'column1', render: 'col1', width: 120 },
  { title: 'column2', render: 'col2', width: 120 },
  { title: 'column3', render: 'col3', width: 120 },
]
const App = () => (
  <div style={{ width: 600 }}>
    <Table
      fixed="both"
      keygen="id"
      bordered
      verticalAlign="middle"
      data={TableData}
      columns={columns}
      style={{ height: 280 }}
      width={columns.reduce((prev, i) => prev + i.width, 15)}
      onRowClick={(d, i) => console.log(d, i)}
    />
  </div>
)
export default App
