/**
 * cn - 不使用 renderItem
 *    -- 当数据是字符串数组时，可以不传renderItem。
 * en - dont use renderItem
 *    -- When the data is a string array, renderItem can not be passed.
 */
import React from 'react'
import { List } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return <List keygen bordered data={data} />
}
