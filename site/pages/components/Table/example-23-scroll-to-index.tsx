/**
 * cn - 滚动
 *    -- 固定表头的表格提供了一个 scrollToIndex 方法滚动到指定行，因为非固定行高的原因，滚动到未渲染过的行有一定偏差，请谨慎使用。
 * en - scrollToIndex
 *    -- The table of the fixed header provides a scrollToIndex method to scroll to the specified line. Because of the row height is not fixed, scrolling to the unrendered line has a little deviation. Please use it with caution.
 */
import React, { useState, useEffect } from 'react'
import { Input, Table, Form, TYPE } from 'shineout'
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

const data: TableRowData[] = fetchSync(10000)

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: d => (
      <div id={`name_${d.id}`} style={{ height: d.height }}>
        {`${d.firstName} ${d.lastName}`}
      </div>
    ),
    width: 160,
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
]

const App: React.FC = () => {
  const [table, setTable] = useState<any>()

  const [state, setState] = useState({
    index: 1,
  })

  const handleScroll = () => {
    table.scrollToIndex(state.index - 1, () => {
      const el: HTMLElement = document.querySelector(`#name_${state.index}`)!
      if (el) {
        el.style.color = 'red'
      }
    })
  }

  const handleIndexChange = ({ index }: { index: number }) => {
    setState({ index })
  }

  useEffect(
    () => {
      setTimeout(handleScroll)
    },
    [state]
  )

  return (
    <div>
      <Form value={state} inline onSubmit={handleIndexChange}>
        <Input.Number min={1} max={10000} width={100} name="index" />
        <Form.Submit>Scroll</Form.Submit>
      </Form>

      <Table
        fixed="both"
        keygen="id"
        width={1400}
        style={{ height: 600 }}
        columns={columns}
        data={data}
        tableRef={t => setTable(t)}
        rowsInView={10}
        rowHeight={80}
      />
    </div>
  )
}

export default App
