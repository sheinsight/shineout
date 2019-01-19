/**
 * cn - 背景色
 *    -- 可以通过backgroundColor, 和style去设置自己想要的样式
 * en - background color
 *    -- You can set the style you want with backgroundColor, and style.
 */
import React from 'react'
import { Tag } from 'shineout'

export default function() {
  return (
    <div>
      <Tag backgroundColor="#eeeeee">#eeeeee</Tag>
      <Tag backgroundColor="#613400">#613400</Tag>
      <Tag
        style={{
          color: '#eb2f96',
          background: '#fff0f6',
          borderColor: '#ffadd2',
        }}
      >
        #f50
      </Tag>
      <Tag
        style={{
          color: '#52c41a',
          background: '#f6ffed',
          borderColor: '#b7eb8f',
        }}
      >
        #87d068
      </Tag>
    </div>
  )
}
