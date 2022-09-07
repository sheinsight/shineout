/**
 * cn - 分页
 *    -- 前端分页的情况下, 设置 pagination 显示分页，没有设置 onChange 处理数据的情况下，会自动对数据进行分页
 *    -- pagination 的参数和 Pagination 组件一致
 * en - Pagination
 *    -- Set the pagination property to show the pagination and if not set onChange property, the data is automatically paged.
 *    -- The parameters of pagination are consistent with the Pagination component.
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

const data: TableRowData[] = fetchSync(1000)

const App: React.FC = () => {
  const [current, setCurrent] = useState<number>(1)

  const handlePageChange = (c: number) => {
    setCurrent(c)
  }

  const columns: TableColumnItem[] = [
    {
      title: 'id',
      render: 'id',
      width: 70,
      sorter: order => {
        handlePageChange(1)
        return (a, b) => {
          if (order === 'asc') return a.id - b.id
          return b.id - a.id
        }
      },
    },
    {
      title: 'First Name',
      group: 'Name',
      render: 'firstName',
      width: 100,
    },
    {
      title: 'Last Name',
      fixed: 'left',
      group: 'Name',
      render: 'lastName',
      width: 120,
      sorter: order => {
        handlePageChange(1)
        return (a, b) => {
          if (order === 'asc') return a.lastName.localeCompare(b.lastName)
          return b.lastName.localeCompare(a.lastName)
        }
      },
    },
    { title: 'Country', render: 'country' },
    { title: 'Position', render: 'position' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
    {
      title: 'Salary',
      fixed: 'right',
      width: 100,
      render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ]

  return (
    <Table
      fixed="x"
      keygen="id"
      data={data}
      width={1500}
      columns={columns}
      pagination={{
        current,
        align: 'center',
        layout: ['links', 'list'],
        onChange: handlePageChange,
        pageSizeList: [10, 15, 20],
        text: {
          page: '/ page',
        },
      }}
    />
  )
}

export default App
