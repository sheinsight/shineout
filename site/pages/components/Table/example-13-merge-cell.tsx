/**
 * cn - 合并行/列
 *    -- 设置 column 的 rowSpan 可以合并行，rowSpan 为函数，会传入相邻的两行数据，根据此函数返回结果(bool)判断是否合并行
 *    -- 设置 column 的 colSpan 可以合并列，colSpan 为函数，传入参数为当前行数据，函数返回结果为需要向后合并的列数，不合并返回 1
 *    -- 一个单元格同时指定了rowSpan和colSpan时，如果两行的colSpan计算结果不同，这两行不会合并
 * en - rowSpan & colSpan
 *    -- - Set column's rowSpan property to merge rows. The rowSpan property is a function that passed in two adjacent rows of data and determine whether to merge or not.
 *    -- - Set column's colSpan property to merge columns. The colSpan property is a function that passed in current row of data and the result returned by this function is as the number of columns that need to be merged.
 *    -- - When a cell specifies both rowSpan and colSpan, if the colSpan's calculation results of the two rows are different, the two rows will not be merged.
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

  const handlePageChange = (c: number, p: number) => {
    setCurrent(c)
    setPageSize(p)
  }

  const handleSorter = (name: string, order: TableColumnOrder) => {
    setSorter({ name, order })
    setCurrent(1)
  }

  const columns: TableColumnItem[] = [
    {
      width: 70,
      title: 'id',
      render: 'id',
      sorter: order => handleSorter('id', order),
    },
    { title: 'First Name', group: 'Name', render: 'firstName' },
    { title: 'Last Name', group: 'Name', render: 'lastName' },
    {
      render: 'start',
      title: 'Start Date',
      rowSpan: (a, b) => a.start === b.start,
      sorter: order => handleSorter('start', order),
      colSpan: d => {
        const hour = parseInt(d.time.slice(0, 2), 10)
        if (hour > 21 || hour < 9) return 2
        return 1
      },
    },
    { title: 'Time', render: 'time' },
    { title: 'Office', render: 'office5', rowSpan: true },
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
      keygen="id"
      data={data}
      loading={loading}
      columns={columns}
      pagination={{
        total,
        current,
        pageSize,
        align: 'center',
        layout: ['links', 'list'],
        onChange: handlePageChange,
        pageSizeList: [10, 15, 20],
      }}
    />
  )
}

export default App
