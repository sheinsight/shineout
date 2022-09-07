/**
 * cn - 加载中
 *    -- 设置 loading 属性可以将表格状态设置为加载中
 * en - Loading
 *    -- Set the loading property can set the table state to loading.
 */
import React from 'react'
import { Table, Spin } from 'shineout'
import { fetchSync } from 'doc/data/user'

const data = fetchSync(8)

const columns = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: d => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
]

export default function() {
  const loading = <Spin color="#1890ff" name="ring" />

  return <Table keygen="id" loading={loading} columns={columns} data={data} />
}
