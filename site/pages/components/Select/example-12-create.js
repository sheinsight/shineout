/**
 * cn -
 *    -- 示例：创建选项和 filter(前端过滤) 配合使用
 * en -
 *    -- Example: Create options with filter(front-end filtering).
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        data={data}
        placeholder="input label"
        keygen
        onCreate
        onFilter={text => d => d.indexOf(text) >= 0}
        filterDelay={0}
      />
      <br />
      <Select
        style={{ width: 360, marginBottom: 12 }}
        data={data}
        placeholder="input label"
        keygen
        onCreate
        multiple
        onFilter={text => d => d.indexOf(text) >= 0}
        filterDelay={0}
      />
    </div>
  )
}
