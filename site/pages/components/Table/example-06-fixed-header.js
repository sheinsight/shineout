/**
 * cn - 固定表头
 *    -- 设置 fixed 属性为 'both' 或 'y'，可以固定表头，表格高度默认填充父元素
 *    -- 注:横向滚动需要指定 Table 的 width 属性, 不建议给所有的 column 设置宽度, 如果出现表头对不齐的问题, 请尝试至少留一列不设宽度以适应弹性布局，或者检查表格内容是否有超长不换行元素破坏布局.
 * en - Fixed head
 *    -- Set the fixed property to 'both' or 'y' can fix the table header. The table height defaults to full the parent element.
 *    -- Note: Horizontal scrolling requires the width property of Table, it is not recommended to set the width for all columns, if there is a problem with tablehead pairs, try leaving at least one column without a width to fit the elastic layout, or check the table contentford for excessively long unwrapped elements to break the layout.
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
