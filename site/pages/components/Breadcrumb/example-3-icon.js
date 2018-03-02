/**
 * cn - 图标
 * en - icon
 */

import React from 'react'
import { Breadcrumb, Icon } from 'shineout'


const MyIcon = Icon('//at.alicdn.com/t/font_550076_aqfu50lfa47bke29.css')

const data = [{
  id: '1',
  icon: <MyIcon iconType="info" />,
  url: '#',
}, {
  id: '2',
  title: 'Menu',
}, {
  id: '3',
  title: 'Self',
  url: 'https://www.baidu.com',
}]

export default function () {
  return (
    <Breadcrumb data={data} />
  )
}
