/**
 * cn - 一组多选框
 *    -- Checkbox.Group 可以渲染一组 Checkbox
 * en - Group
 *    -- Checkbox.Group can render a group of checkbox.
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function renderItem(color) {
  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
  return <span style={style}>{color}</span>
}

export default function () {
  return (
    <Checkbox.Group
      keygen={c => c}
      data={data}
      onChange={c => console.log(c)}
      value={['blue', 'cyan']}
      renderItem={renderItem}
    />
  )
}
