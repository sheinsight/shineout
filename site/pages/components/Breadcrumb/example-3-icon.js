/**
 * cn - 图标
 *    -- 带图标的面包屑
 * en - icon
 *    -- Breadcrumbs with icons
 */

import React from 'react'
import { Breadcrumb } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const data = [
  { icon: <FontAwesome name="home" />, title: 'Home', url: '#home' },
  { title: 'Menu' },
  { title: 'Self', url: 'https://www.google.com' },
]

export default function() {
  return <Breadcrumb data={data} />
}
