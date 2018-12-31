/**
 * cn - 背景色
 *    -- 可以通过backgroundColor, 去设置背景色
 * en - background color
 *    -- There can change the tag's background color by 'broundColor' of the props.
 */
import React from 'react'
import { Tag } from 'shineout'

export default function () {
  return (
    <div>
      <Tag backgroundColor="#f50">#f50</Tag>
      <Tag backgroundColor="#87d068">#87d068</Tag>
      <Tag backgroundColor="#2db7f5">#2db7f5</Tag>
    </div>
  )
}
