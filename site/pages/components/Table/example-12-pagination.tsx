/**
 * cn -
 *    -- 后端分页的情况下, 在 pagination 的 onChange 中处理（获取）数据，可以实现服务端分页
 * en -
 *    -- Processing (acquiring) data in pagination's onChange realizes the pagination of server-side.
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
type TableColumnOrder = TYPE.Table.ColumnOrder

const App: React.FC = () => {
  const [total, setTotal] = useState(0)
  const [sorter, setSorter] = useState({})
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TableRowData[]>([])

  const fetchData = () => {
    setLoading(true)
    fetch.get('user', { sorter, current, pageSize, username: '' }).then(res => {
      setData(res.data)
      setLoading(false)
      setTotal(res.total)
    })
  }

  const handleSorter = (name: string, order: TableColumnOrder) => {
    setSorter({ name, order })
    setCurrent(1)
  }

  const handlePageChange = (c: number, p: number) => {
    setCurrent(c)
    setPageSize(p)
  }

  const columns: TableColumnItem[] = [
    {
      width: 80,
      title: 'id',
      render: 'id',
      sorter: order => handleSorter('id', order),
    },
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
      render: 'lastName',
      title: 'Last Name',
      sorter: order => handleSorter('lastName', order),
    },
    { title: 'Country', render: 'country' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start', sorter: order => handleSorter('start', order) },
  ]

  useEffect(
    () => {
      fetchData()
    },
    [current, pageSize, sorter]
  )

  return (
    <Table
      bordered
      fixed="y"
      keygen="id"
      data={data}
      loading={loading}
      columns={columns}
      style={{ height: 400 }}
      pagination={{
        total,
        current,
        pageSize,
        align: 'center',
        layout: ['links', 'list'],
        onChange: handlePageChange,
        pageSizeList: [10, 15, 20, 100],
      }}
    />
  )
}

export default App
