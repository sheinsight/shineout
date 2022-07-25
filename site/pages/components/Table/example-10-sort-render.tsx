/**
 * cn - 自定义排序图标
 *    -- 设置 Table 的 renderSorter 属性来自定义图标
 * en - Sorter
 *    -- Set the renderSorter property of the Table to customize the icon.
 */
import React from 'react'
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
type TableProps = TYPE.Table.Props<TableRowData, TableRowData>
type TableSorter = TableProps['sorter']
type TableColumnOrder = TYPE.Table.ColumnOrder
type TableRenderSorter = TableProps['renderSorter']
type TableOnSortCancel = TableProps['onSortCancel']
type TableSorterParam = TYPE.Table.renderSorterParam

const data: TableRowData[] = fetchSync(1000)
const columns: TableColumnItem[] = [
  {
    title: 'id',
    render: 'id',
    width: 80,
    sorter: 'id',
    defaultOrder: 'asc',
  },
  {
    title: 'Name',
    fixed: 'left',
    render: d => `${d.firstName} ${d.lastName}`,
    width: 160,
    sorter: 'firstName',
  },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
]

const commonStyle: React.CSSProperties = {
  position: 'absolute',
  cursor: 'pointer',
  transform: 'rotate(-90deg) scale(0.8, 1.2)',
}

const App: React.FC = () => {
  const sorter: {
    [x: string]: Function
  } = {
    id: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.id - b.id : b.id - a.id,
    firstName: (order: TableColumnOrder) => (a: TableRowData, b: TableRowData) =>
      order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName),
  }

  const renderSorter: TableRenderSorter = ({ status, triggerAsc, triggerDesc }: TableSorterParam) => (
    <>
      <div
        style={{
          ...commonStyle,
          top: '-5px',
          color: status === 'asc' ? '#197afa' : '#999da8',
        }}
        onClick={triggerAsc}
      >
        {'>'}
      </div>
      <div
        style={{
          bottom: '-5px',
          ...commonStyle,
          color: status === 'desc' ? '#197afa' : '#999da8',
        }}
        onClick={triggerDesc}
      >
        {'<'}
      </div>
    </>
  )

  const handleSorter: TableSorter = (name, order) => sorter[name](order)

  const handleCancel: TableOnSortCancel = (prevType, index) => {
    console.log('sort cancel : ', prevType, index)
  }
  return (
    <Table
      striped
      data={data}
      keygen="id"
      fixed="both"
      width={1200}
      rowsInView={10}
      columns={columns}
      sorter={handleSorter}
      style={{ maxHeight: 400 }}
      onSortCancel={handleCancel}
      renderSorter={renderSorter}
    />
  )
}

export default App
