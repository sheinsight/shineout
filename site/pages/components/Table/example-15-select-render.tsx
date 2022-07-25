/**
 * cn -
 *    -- 通过 render 自定义渲染
 * en - Select
 *    -- Custom rendering via render
 */
import React, { useState } from 'react'
import { Table, Popover, TYPE } from 'shineout'
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
type TableProps = TYPE.Table.Props<TableRowData, TableRowData[]>
type TableOnRowSelect = TableProps['onRowSelect']

const data: TableRowData[] = fetchSync(100)

const columns: TableColumnItem[] = [
  {
    width: 40,
    type: 'checkbox',
    render: (d, _index, checkbox) => (
      <span>
        {checkbox}
        {d.id % 3 === 0 ? <Popover position="right">这个不能选</Popover> : null}
      </span>
    ),
  },
  {
    width: 60,
    title: 'id',
    render: 'id',
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
  const [selectedValue, setSelectedValue] = useState([data[2]])

  const handelRowSelect: TableOnRowSelect = v => {
    console.log(v)
    setSelectedValue(v)
  }

  return (
    <div>
      <Table
        data={data}
        keygen="id"
        fixed="both"
        columns={columns}
        value={selectedValue}
        style={{ height: 450 }}
        onRowSelect={handelRowSelect}
        disabled={d => d.id % 3 === 0}
        prediction={(v, d) => v.id === d.id}
      />
      <div>{`selected rows: [${selectedValue.map(v => v.id).join(', ')}] `}</div>
    </div>
  )
}
export default App
