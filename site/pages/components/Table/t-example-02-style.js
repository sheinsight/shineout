/**
 * cn - 边框和底纹
 *    -- 通过 striped 显示交错底纹；通过 bordered 显示边框。
 * en - Style
 *    -- Set striped to add zebra-striping; Set bordered to add borders.
 */
import React from 'react'
import { Table } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(4)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}`, align: 'right' },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position', align: 'right' },
  { title: 'Office', render: 'office' },
]

export default function() {
  return <Table keygen="id" striped bordered columns={columns} data={data} />
}
