/**
 * cn - 基本用法
 *    -- 引入一个在线地址（本示例为 font-awesome）创建一个新的 Icon 组件，在需要使用的地方引入。
 * en - Base
 *    -- Create a new compoennt with url, then use it anywhere.
 */
import React from 'react'
import { Icon } from 'shineout'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')
const margin = { marginRight: 20 }

export default function() {
  return (
    <div>
      <FontAwesome style={margin} name="home" />
      <FontAwesome style={margin} name="info" type="info" />
      <FontAwesome style={margin} name="check" type="success" />
      <FontAwesome style={margin} name="close" type="danger" />
    </div>
  )
}
