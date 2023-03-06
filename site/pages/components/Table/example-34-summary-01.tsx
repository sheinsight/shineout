/**
 * cn - 底部总结栏
 *    -- 通过 summary 属性来渲染底部信息
 * en - footer summary
 *    -- Render bottom information through the summary property
 */
import React from 'react'
import { Table, TYPE } from 'shineout'
import './row-drag.css'

interface TableRowData {
  id: number
  height: number
  salary: number
  lastName: string
  firstName: string
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>

type TableProps = TYPE.Table.Props<TableRowData, number[]>

const data: TableRowData[] = [
  {
    id: 1,
    firstName: 'Ephraim',
    lastName: 'Wisozk',
    salary: 115777,
    height: 113.74,
  },
  {
    id: 2,
    firstName: 'Osvaldo',
    lastName: 'Beer',
    salary: 396093,
    height: 82.13,
  },
  {
    id: 3,
    firstName: 'Dylan',
    lastName: 'Ratke',
    salary: 236064,
    height: 179.53,
  },
  {
    id: 4,
    firstName: 'Shaniya',
    lastName: 'Jacobs',
    salary: 338985,
    height: 190.11,
  },
]

const columns: TableColumnItem[] = [
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'height', render: 'height' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

const summary: TableProps['summary'] = [
  [
    {
      render: () => <span>Total</span>,
    },
    {
      render: () => <span>{1347016}</span>,
    },
    {
      render: () => <span>{2341312}</span>,
    },
  ],
  [
    {
      render: () => <span>Balance</span>,
    },
    {
      render: () => <span>{1234}</span>,
      colSpan: 2,
    },
  ],
]

const App: React.FC = () => (
  <Table bordered data={data} keygen="id" cellSelectable columns={columns} summary={summary} />
)

export default App
