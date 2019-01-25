/**
 * cn - 样式
 *    -- 通过 fontSize 和 type 属性可以便捷的设置大小和颜色，更多样式可以通过 style 属性设置。
 * en - Style
 *    -- Set fontSize and type to change icon size and color.
 */
import React from 'react'
import FontAwesome from './FontAwesome'

const margin = { marginRight: 20 }

export default function() {
  return (
    <div>
      <FontAwesome style={margin} name="home" />
      <FontAwesome style={margin} name="home" type="info" fontSize={18} />
      <FontAwesome style={margin} name="home" type="success" fontSize="24px" />
      <FontAwesome style={{ fontSize: 30, color: '#f5222d' }} name="home" />
    </div>
  )
}
