/**
 * cn - 固定表头
 *    -- 设置 fixed 属性为 'both' 或 'y'，可以固定表头，表格高度默认填充父元素
 * en - Fixed head
 *    -- Set the fixed property to 'both' or 'y' can fix the table header. The table height defaults to full the parent element.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(20)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start' },
  {
    title: 'Salary',
    render: d => `$${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
]

function Normal() {
  return (
    <div style={{ height: 300, marginBottom: 40 }}>
      <Table rowsInView={0} fixed="both" keygen="id" width={1500} columns={columns} bordered data={data} />
    </div>
  )
}

function Flex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
      <div style={{ textAlign: 'center', height: 40, lineHeight: '40px', background: '#eee' }}>Flex-Header</div>
      <Table style={{ flex: 1, overflow: 'hidden' }} fixed="y" data={data} keygen="id" columns={columns.slice(0, 4)} />
    </div>
  )
}

export default function() {
  return (
    <div>
      <Normal />
      <Flex />
    </div>
  )
}
