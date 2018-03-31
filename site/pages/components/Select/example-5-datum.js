/**
 * cn - 数据处理
 *    -- 可以借助 Datum.List，处理复杂数据
 * en - Datum
 */
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'
import { fetchSync as fetchUser } from 'doc/data/user'

// data = [{id:1, city: 'name'}]
const citys = fetchCity(100)
const users = fetchUser(100)
const onChange = d => console.log(d)
const style = { width: 200, marginBottom: 12, display: 'block' }

export default function () {
  return (
    <div>
      <Select
        data={citys}
        datum={{ format: 'id' }}
        defaultValue={3}
        onChange={onChange}
        style={style}
        placeholder="Select a city"
        renderItem="city"
      />

      <Select
        data={users}
        datum={{ format: 'id' }}
        defaultValue={3}
        onChange={onChange}
        style={style}
        placeholder="Select a user"
        renderItem={user => `${user.firstName} ${user.lastName}`}
      />

      <Select
        data={citys}
        multiple
        defaultValue={[3, 4]}
        datum={{ format: 'id' }}
        onChange={onChange}
        placeholder="Select citys"
        renderItem="city"
      />
    </div>
  )
}
