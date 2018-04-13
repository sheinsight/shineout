/**
 * cn - 性能
 *    -- Select 内部实现了懒加载机制优化性能，本例加载了10000条数据。
 * en - Datum
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchUser } from 'doc/data/user'

const users = fetchUser(10000)
const onChange = d => console.log(d)
const style = { width: 240, marginBottom: 12, display: 'block' }

export default function () {
  return (
    <Select
      data={users}
      datum={{ format: 'id' }}
      defaultValue={3}
      onChange={onChange}
      style={style}
      placeholder="Select a user"
      renderItem={(user, i) => `${user.firstName} ${user.lastName} (${i + 1})`}
      renderResult={user => `${user.firstName} ${user.lastName}`}
    />
  )
}
