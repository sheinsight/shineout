/**
 * cn - 基本用法
 *    -- Radio.Group 通过数据来生成一组单选框。
 * en - Base
 *    -- Radio.Group generate a group of radios from an array.
 */
import React from 'react'
import { Radio } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function renderItem(color) {
  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
  return <span style={style}>{color}</span>
}

export default function() {
  return <Radio.Group keygen data={data} defaultValue="blue" renderItem={renderItem} />
}
