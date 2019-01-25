/**
 * cn - 使用 Iconfont
 *    -- 可以在 iconfont.cn 定制一个图标，在项目中引入
 * en - Customize Font
 *    -- You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>
 */
import React from 'react'
import { Icon } from 'shineout'

const Iconfont = Icon('//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css')
const margin = { marginRight: 20 }

export default function() {
  return (
    <div>
      <Iconfont style={margin}>&#xe64e;</Iconfont>
      <Iconfont style={margin} name="info" type="info" />
      <Iconfont style={margin} name="right" type="success" />
      <Iconfont style={margin} name="error" type="danger" />
    </div>
  )
}
