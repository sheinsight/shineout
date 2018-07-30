/**
 * cn - 创建选项
 *    -- 设置 onCreate 属性可以通过输入创建选项
 * en - onCreate
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <div>
      <Select
        style={{ width: 240, marginBottom: 12 }}
        data={data}
        placeholder="input color"
        onCreate
        onChange={d => console.log(d)}
      />
      <br />
      <Select
        style={{ width: 400 }}
        data={data}
        multiple
        placeholder="input color"
        onCreate={t => t}
        onChange={d => console.log(d)}
      />
    </div>
  )
}
