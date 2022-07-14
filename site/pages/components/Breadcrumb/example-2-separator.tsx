/**
 * cn - 分隔符
 *    -- 默认的分隔符为 '/'，可以通过 separator 属性自定义
 * en - separator
 *    -- The default separator is '/'.
 */

import React from 'react'
import { Breadcrumb, TYPE } from 'shineout'

function Separator() {
  return <span>~</span>
}

type BreadcrumbData = TYPE.Breadcrumb.Data

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>

const data: BreadcrumbProps<BreadcrumbData>['data'] = [{ title: 'Home', url: '/' }, { title: 'Self' }]

const App: React.FC = () => (
  <div>
    <Breadcrumb data={data} separator="|" />
    <Breadcrumb data={data} separator={<Separator />} />
  </div>
)

export default App
