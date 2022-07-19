/**
 * cn -
 *    -- 设置 disabled 属性，禁用选项。
 * en -
 *    -- Set disabled to disable the selection.
 */
import React, { useState } from 'react'
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
type TableProps = TYPE.Table.Props<number[], TableRowData>
type TableOnRowSelect = TableProps['onRowSelect']

const data: TableRowData[] = fetchSync(100)

const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 60,
    sorter: order => (a, b) => {
      if (order === 'asc') return a.id - b.id
      return b.id - a.id
    },
  },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

const App: React.FC = () => {
  const [selectedText, setSelectedText] = useState([2, 3, 5])

  const handelRowSelect: TableOnRowSelect = values => {
    setSelectedText(values)
  }
  return (
    <div>
      <Table
        keygen="id"
        format="id"
        data={data}
        fixed="both"
        columns={columns}
        value={selectedText}
        style={{ height: 300 }}
        onRowSelect={handelRowSelect}
        disabled={d => d.id % 3 === 0}
      />
      <div>{`selected rows: [${selectedText.join(', ')}] `}</div>
    </div>
  )
}

export default App
