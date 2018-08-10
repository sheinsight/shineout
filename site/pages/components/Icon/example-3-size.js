/**
 * cn - 尺寸 \n 提供了一个fontSize属性设置图标大小，效果和 style.fontSize 相同
 * en - Font Size \n A fontSize property is provided to set the icon size to the same effect as the style.fontSize.
 */
import React from 'react'
import FontAwesome from './FontAwesome'

const margin = { marginRight: 20 }

export default function () {
  return (
    <div>
      <FontAwesome style={margin} name="home" />
      <FontAwesome style={margin} name="home" type="info" fontSize={18} />
      <FontAwesome style={margin} name="home" type="success" fontSize="24px" />
      <FontAwesome style={{ fontSize: 30, color: '#f5222d' }} name="home" />
    </div>
  )
}
