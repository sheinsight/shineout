/**
 * cn - 尺寸 \n 提供了一个fontSize属性设置图标大小，效果和 style.fontSize 相同
 * en - Font Size
 */
import React, { Fragment } from 'react'
import { Icon } from 'shineout'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')
const margin = { marginRight: 20 }

export default function () {
  return (
    <Fragment>
      <FontAwesome style={margin} name="home" />
      <FontAwesome style={margin} name="home" type="info" fontSize={18} />
      <FontAwesome style={margin} name="home" type="success" fontSize="24px" />
      <FontAwesome style={{ fontSize: 30, color: '#f5222d' }} name="home" />
    </Fragment>
  )
}
