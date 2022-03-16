/**
 * cn - 自定义排序图标
 *    -- 设置 Table 的 renderSorter 属性来自定义图标
 * en - Sorter
 *    -- Set the renderSorter property of the Table to customize the icon.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(1000)
const columns = [
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

const sorter = {
  id: order => (a, b) => (order === 'asc' ? a.id - b.id : b.id - a.id),
  firstName: order => (a, b) =>
    order === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstName.localeCompare(a.firstName),
}

const commonStyle = { position: 'absolute', transform: 'rotate(-90deg) scale(0.8, 1.2)', cursor: 'pointer' }
// eslint-disable-next-line react/prop-types
const renderSorter = ({ status, triggerAsc, triggerDesc }) => (
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
function handleSorter(name, order) {
  return sorter[name](order)
}

function handleCancel(prevType, index) {
  console.log('sort cancel : ', prevType, index)
}

export default function() {
  return (
    <Table
      sorter={handleSorter}
      fixed="both"
      keygen="id"
      striped
      width={1200}
      style={{ maxHeight: 400 }}
      columns={columns}
      data={data}
      rowsInView={10}
      onSortCancel={handleCancel}
      renderSorter={renderSorter}
    />
  )
}
