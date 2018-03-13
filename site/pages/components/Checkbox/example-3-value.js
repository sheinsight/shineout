/**
 * cn - 选中值 \n 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue，未选中返回 undefined。
 * en - Value
 */
import React from 'react'
import { Checkbox } from 'shineout'

export default function () {
  return (
    <Checkbox onChange={v => console.log(v)} htmlValue="ok" value="ok">
      value is "ok"
    </Checkbox>
  )
}
