/**
 * cn - 选中值
 *    -- 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。
 * en - Value
 *    -- If the htmlValue is not set, the checkbox selected return true; if the htmlValue is set, return the htmlValue. When the checkbox is not selected, always return undefined.
 */
import React from 'react'
import { Checkbox } from 'shineout'

export default function () {
  return (
    <Checkbox onChange={v => console.log(v)} htmlValue="ok" value="ok">
      {'value is "ok"'}
    </Checkbox>
  )
}
