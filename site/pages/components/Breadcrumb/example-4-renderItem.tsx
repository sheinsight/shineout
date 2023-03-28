/**
 * cn - 自定义渲染
 *    -- 自定义渲染面包屑中的内容
 * en - Base
 *    -- Custom render content in Breadcrumb
 */

import React, { ReactNode } from 'react'
import { Breadcrumb, TYPE } from 'shineout'

const data = [{ name: 'home', link: '#home' }, { name: 'menu' }, { name: 'self', link: 'https://www.google.com' }]
type BreadcrumbProps = TYPE.Breadcrumb.Props<typeof data[0]>

const renderItem: BreadcrumbProps['renderItem'] = value => {
  let BreadcrumbItem: ReactNode = value.name

  if (value.link) BreadcrumbItem = <a href={value.link}>{value.name}</a>

  return BreadcrumbItem

  return <b>{BreadcrumbItem}</b>
}
export default function() {
  return <Breadcrumb renderItem={renderItem} data={data} />
}
