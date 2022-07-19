/**
 * cn - 行内元素点击
 *    -- 设置rowClickAttr，可以使行内元素的点击事件触发onRowClick
 * en - Base
 *    -- Set the rowClickAttr to trigger an onRowClick event for an element.
 */
import React, { useState } from 'react'
import { Table, Select, Button, TYPE } from 'shineout'
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

const dataList = fetchSync(4)

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  {
    title: 'Operation',
    render: () => (
      <span>
        <Button data-info size="small">
          info
        </Button>
        &nbsp;
        <Button data-call type="primary" size="small">
          call
        </Button>
      </span>
    ),
  },
]

const App: React.FC = () => {
  const [count, setCount] = useState(0)
  const [attrs, setAttrs] = useState(['*'])

  const handleClick = () => setCount(count + 1)

  const handleChange = (v: string[]) => setAttrs(v)

  return (
    <div>
      <Table rowClickAttr={attrs} onRowClick={handleClick} keygen="id" columns={columns} data={dataList} />
      Select rowClickAttr：
      <Select
        style={{ width: '300px', margin: '0 0 10px 10px' }}
        data={['data-info', 'data-call', '*']}
        keygen
        multiple
        placeholder="select rowClickAttr"
        value={attrs}
        onChange={handleChange}
      />
      <div>
        <span>onRowClick call count： </span>
        <strong>{count}</strong>
      </div>
    </div>
  )
}
export default App
