/**
 * cn - 表头分组
 *    -- Table 会自动合并相邻相同 group 的表头
 * en - Column group
 *    -- Table automatically merges headers with adjacent and identical groups.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(4)
const name = (
  <span
    style={{
      background: '#ccc',
      display: 'block',
      lineHeight: '40px',
      color: '#fff',
    }}
  >
    Name
  </span>
)

const other = <span>Other</span>

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'First Name', render: 'firstName', group: [name, 'True Name'] },
  { title: 'Last Name', render: 'lastName', group: [name, 'True Name'] },
  { title: 'Nick Name', render: () => 'nickname', group: name },
  { title: 'Country', render: 'country' },
  { title: 'Office', render: 'office', group: other },
  { title: 'Position', render: 'position', group: other },
]

export default function() {
  return <Table bordered keygen="id" columns={columns} data={data} />
}
