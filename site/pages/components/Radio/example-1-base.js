/**
 * cn - 基本用法
 * en - Base
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
      keygen={c => c}
      data={data}
      onChange={c => console.log(c)}
      defaultValue="blue"
      renderItem={renderItem}
    />
  )
}
