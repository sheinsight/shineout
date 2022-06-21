/**
 * cn - 自定义间距
 *    -- 通过 row 和 column 分别来调整垂直和水平间距
 * en - Custom
 *    -- custom the vertical and horizontal spacing by row and column
 */
import React from 'react'
import { Gap, Tag } from 'shineout'

const tagStyle = { margin: 0 }
export default function() {
  return (
    <Gap style={{ width: 400 }} row={4} column={4}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Tag key={i} style={tagStyle}>
          Tag
          {i}
        </Tag>
      ))}
    </Gap>
  )
}
