/**
 * cn - 使用 Iconfont
 *    -- 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式
 * en - Customize Font
 *    -- You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.
 */
import React from 'react'
import { Icon, TYPE } from 'shineout'

type IconComponent = TYPE.Icon.Com

const FontIconfont: IconComponent = Icon('//at.alicdn.com/t/font_550076_uyvw3e8ul8w4gqfr.css')
const SVGIconfont: IconComponent = Icon('//at.alicdn.com/t/font_1725436_8gldxw9bjlu.js')
const margin: React.CSSProperties = { marginInlineEnd: 20 }

const App: React.FC = () => (
  <div>
    <SVGIconfont style={margin} name="qingtian" />
    <SVGIconfont style={margin} name="wanduoyun" />
    <FontIconfont style={margin}>&#xe64e;</FontIconfont>
    <FontIconfont style={margin} name="info" type="info" />
  </div>
)

export default App
