/**
 * cn - 选择行
 *    -- 设置 onRowSelect 属性，会自动添加选择列
 * en - Select
 *    -- Set the onRowSelect property will automatically add a column with checkbox.
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
type TableProps = TYPE.Table.Props<TableRowData[], TableRowData>
type TableOnRowSelect = TableProps['onRowSelect']

const data: TableRowData[] = fetchSync(20)

const rowSpan = (a: TableRowData) => a.id % 3 === 0

const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    rowSpan,
    filterAll: d =>
      d.filter((_item, index) => {
        if (index > 0) {
          const before = d[index - 1]
          return !rowSpan(before)
        }
        return true
      }),
  },
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
        prediction={(v, d) => v.id === d.id}
      />
      {/* <div>selected rows: [{selectedValue.map(v => v.id).join(', ')}] </div> */}
      <div>{`selected rows: [${selectedValue.map(v => v.id).join(', ')}]`}</div>
    </div>
  )
}

export default App
