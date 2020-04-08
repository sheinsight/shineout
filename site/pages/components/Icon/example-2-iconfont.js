/**
 * cn - 使用 Iconfont
 *    -- 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式
 * en - Customize Font
 *    -- You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.
 */
import React from 'react'
import { Icon } from 'shineout'

const FontIconfont = Icon('//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css')
const SVGIconfont = Icon('//at.alicdn.com/t/font_1725436_8gldxw9bjlu.js')
const margin = { marginRight: 20 }

export default function() {
  return (
    <div>
      <FontIconfont style={margin}>&#xe64e;</FontIconfont>
      <FontIconfont style={margin} name="info" type="info" />
      <SVGIconfont style={margin} name="qingtian" />
      <SVGIconfont style={margin} name="wanduoyun" />
    </div>
  )
}
