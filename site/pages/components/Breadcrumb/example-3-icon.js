/**
 * cn - 图标
 * en - icon
 */

import React from 'react'
import { Breadcrumb } from 'shineout'

const dataSource = [{
  icon: (<span className="glyphicon glyphicon-heart" />),
  url: '#',
}, {
  icon: (<span className="glyphicon glyphicon-th" />),
  title: 'MENU',
}, {
  title: 'SELF',
  url: 'https://www.baidu.com',
}]

export default function () {
  return (
    <Breadcrumb dataSource={dataSource} />
  )
}
