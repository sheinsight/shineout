/**
 * cn - 创建选项
 *    -- 设置 onCreate 属性可以通过输入创建选项
 * en - Create by input
 *    -- Set the onCreate property can create options by inputting.
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
        keygen
        placeholder="input color"
        onCreate
        defaultValue="brown"
      />
      <br />
      <Select style={{ width: 400 }} data={data} keygen multiple placeholder="input color" onCreate={t => t} />
    </div>
  )
}
