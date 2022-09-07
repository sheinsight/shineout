/**
 * cn - 滚动加载
 *    -- onScroll 事件会返回当前滚动条位置 (float 类型，[0,1])，可以据此实现滚动加载数据
 * en - onScroll
 *    -- The onScroll event returns the current position(float,[0,1]) of the scroll bar.
 */
import React, { useState, useEffect } from 'react'
import { Table, TYPE } from 'shineout'
import { fetch } from 'doc/data/user'

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

const App: React.FC = () => {
  const [pageSize] = useState(20)
  const [current, setCurrent] = useState(1)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TableRowData[]>([])

  const fetchData = () => {
    setLoading(true)
    fetch.get('table', { current, pageSize, sorter: '', username: '' }).then(res => {
      setData([...data, ...res.data])
      setLoading(false)
    })
  }

  const handleScroll = (_left: number, top: number) => {
    if (top === 1 && !loading) {
      setCurrent(current + 1)
    }
  }

  const columns: TableColumnItem[] = [
    { title: 'id', render: 'id', width: 70 },
    {
      width: 100,
      group: 'Name',
      title: 'First Name',
      render: 'firstName',
    },
    {
      width: 120,
      fixed: 'left',
      group: 'Name',
      title: 'Last Name',
      render: 'lastName',
    },
    { title: 'Country', render: 'country' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
  ]

  useEffect(
    () => {
      fetchData()
    },
    [pageSize, current]
  )

  return (
    <Table
      bordered
      fixed="y"
      keygen="id"
      data={data}
      loading={loading}
      columns={columns}
      verticalAlign="middle"
      style={{ height: 450 }}
      onScroll={handleScroll}
    />
  )
}

export default App
