/**
 * cn - 自定义渲染
 *    -- 自定义渲染面包屑中的内容
 * en - Base
 *    -- Custom render content in Breadcrumb
 */

import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Message, Button, TYPE } from 'shineout'

type BreadcrumbData = TYPE.Breadcrumb.Data

type BreadcrumbProps<data> = TYPE.Breadcrumb.Props<data>

const data: BreadcrumbProps<BreadcrumbData>['data'] = [
  [{ title: 'Home', url: '#home' }, { title: 'aaa', url: '#aaa' }, { title: 'bbb', url: '#bbb' }],
  { title: <Link to="/components/Button">Button</Link> },
  { title: 'Self', onClick: () => Message.show('Clicked self') },
]

const renderItem = (value: BreadcrumbData) => {
  let BreadcrumbItem: ReactNode = value.title

  if (value.onClick || value.url) {
    const props: BreadcrumbProps<BreadcrumbData> = {
      onClick: value.onClick,
    }

    if (value.url) props.href = value.url
    BreadcrumbItem = (
      <a {...props}>
        {value.icon}
        &nbsp;
        {value.title}
      </a>
    )

    return BreadcrumbItem
  }

  return <Button size="small">{BreadcrumbItem}</Button>
}
export default function() {
  return <Breadcrumb renderItem={renderItem} data={data} />
}
