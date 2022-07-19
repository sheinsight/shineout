/**
 * cn - 表头附着
 *    -- 在滚屏场景下，可以设置 sticky 属性使表头附着顶部
 * en - Sticky Header
 *    -- Use the sticky attribute to sticky the header.
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

export default () => <Table sticky data={data} columns={columns} keygen="id" />
