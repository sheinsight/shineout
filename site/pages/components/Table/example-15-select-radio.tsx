/**
 * cn -
 *    -- 设置 radio 属性实现单选效果
 * en -
 *    -- Set the radio attribute to achieve the radio effect
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
type TableProps = TYPE.Table.Props<TableRowData, number>
type TableOnRowSelect = TableProps['onRowSelect']

const data: TableRowData[] = fetchSync(50)

const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
  },
  {
    width: 50,
    title: 'id',
    render: 'id',
  },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, width: 160 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

const App: React.FC = () => {
  const [value, setValue] = useState(1)

  const handelRowSelect: TableOnRowSelect = v => {
    console.log(v)
    setValue(v)
  }
  return (
    <div>
      <Table
        radio
        data={data}
        keygen="id"
        format="id"
        fixed="both"
        value={value}
        columns={columns}
        style={{ height: 450 }}
        onRowSelect={handelRowSelect}
      />
      <div>{`selected: ${value}`}</div>
    </div>
  )
}

export default App
