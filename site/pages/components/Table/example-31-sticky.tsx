/**
 * cn - 表头附着
 *    -- 在滚屏场景下，可以设置 sticky 属性使表头附着顶部
 * en - Sticky Header
 *    -- Use the sticky attribute to sticky the header.
 */
import React, { useState } from 'react'
import { Table, TYPE, Button } from 'shineout'
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
  const [width, setWidth] = useState(0)

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width }} />
        <Table key={width} sticky data={data} columns={columns} keygen="id" />
      </div>
      <Button onClick={() => (width === 0 ? setWidth(200) : setWidth(0))}>change</Button>
    </div>
  )
}

export default App
