/**
 * cn -
 *    -- 分页中 默认情况下，翻页时会保留当前选中的数据, 如果不需要保留, 则可以分页的时候手动清除
 * en -
 *    -- By default, the Datum object retains the currently selected data when the page is changed.
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
  const [pageSize, setPageSize] = useState(5)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<TableRowData[]>([])
  const [selectedValue, setSelectedValue] = useState<string[]>([])

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
      title: 'Id',
      render: 'id',
      width: 70,
      sorter: order => handleSorter('id', order),
    },
    { title: 'First Name', render: 'firstName' },
    { title: 'Last Name', render: 'lastName', sorter: order => handleSorter('lastName', order) },
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
    <div>
      <Table
        keygen="id"
        format="id"
        data={data}
        loading={loading}
        columns={columns}
        onRowSelect={(value: string[]) => setSelectedValue(value)}
        pagination={{
          total,
          current,
          pageSize,
          align: 'center',
          onChange: handlePageChange,
        }}
      />
      <br />
      <div>{`selected rows: ${JSON.stringify(selectedValue)}`}</div>
    </div>
  )
}

export default App
