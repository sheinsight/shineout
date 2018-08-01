/**
 * cn - 带输入
 *    -- 设置 inputable 属性可以显示输入框，返回值为输入框内容
 * en - Inputable
 */
import React from 'react'
import { Checkbox } from 'shineout'

export default function () {
  return (
    <Checkbox inputable onChange={d => console.log(d)}>more...</Checkbox>
  )
}
