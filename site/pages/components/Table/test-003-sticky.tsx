/**
 * cn - T:sticky
 *    -- fixed: 修复 Table 在配置 Sticky 具体属性后可能导致表头渲染异常的问题
 *    -- https://github.com/sheinsight/shineout/pull/1890
 * en - T:sticky
 *    --
 */
import React, { useState } from 'react'
import { Table, Button, TYPE } from 'shineout'
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

const App: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <Button onClick={() => setShow(!show)}>Show</Button>
      <div style={{ display: show ? 'block' : 'none' }}>
        <Table sticky={{ top: 10 }} data={data} columns={columns} keygen="id" />
      </div>
    </div>
  )
}

export default App
