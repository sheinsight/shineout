/**
 * cn - 基本用法
 *    -- Radio 必须以组的方式来使用
 * en - Base
 *    -- Radio must be used as a group.
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function renderItem(color) {
  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
  return <span style={style}>{color}</span>
}

export default function () {
  return (
    <Radio.Group
      keygen
      data={data}
      onChange={c => console.log(c)}
      defaultValue="blue"
      renderItem={renderItem}
    />
  )
}
