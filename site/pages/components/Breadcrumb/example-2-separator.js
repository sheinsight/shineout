/**
 * cn - 自定义分隔符(字符串和reactNode)
 * en - separator(string and reactNode)
 */

import React, { Fragment } from 'react'
import { Breadcrumb } from 'shineout'

function Separator() {
  return <span>~</span>
}

const dataSource = [{
  title: 'HOME',
  url: '#',
}, {
  title: 'SELF',
  url: 'https://www.baidu.com',
}]

export default function () {
  return (
    <Fragment>
      <Breadcrumb dataSource={dataSource} separator="|" />
      <Breadcrumb dataSource={dataSource} separator={<Separator />} />
    </Fragment>
  )
}

