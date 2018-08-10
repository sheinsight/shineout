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
  { icon: <FontAwesome name="home" />, title: 'Home', url: '#/' },
  { title: 'Menu' },
  { title: 'Self', url: '#/components/Breadcrumb' },
]

export default function () {
  return (
    <Breadcrumb data={data} />
  )
}
