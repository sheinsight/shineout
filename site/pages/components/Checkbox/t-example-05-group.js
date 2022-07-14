/**
 * cn -
 *    -- 可以直接通过数据来渲染一组 Checkbox
 * en -
 *    -- Render a group of checkboxes from data.
 */
import React from 'react'
import { Checkbox } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function renderItem(color) {
  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
  return <span style={style}>{color}</span>
}

export default function() {
  return <Checkbox.Group keygen={c => c} data={data} defaultValue={['blue', 'cyan']} renderItem={renderItem} />
}
