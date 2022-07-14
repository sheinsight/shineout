/**
 * cn - 图标
 *    -- 带图标的面包屑
 * en - icon
 *    -- Breadcrumbs with icons
 */

import React from 'react'
import { Breadcrumb, TYPE } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

type BreadcrumbData = TYPE.Breadcrumb.Data

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  { icon: <FontAwesome name="home" />, title: 'Home', url: '#home' },
  { title: 'Menu' },
  { title: 'Self', url: 'https://www.google.com' },
]

const App: React.FC = () => <Breadcrumb data={data} />

export default App
