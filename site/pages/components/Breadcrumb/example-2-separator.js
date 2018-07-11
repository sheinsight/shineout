/**
 * cn - 自定义分隔符(字符串和reactNode)
 * en - separator(string and reactNode)
 */

import React from 'react'
import { Breadcrumb } from 'shineout'

function Separator() {
  return <span>~</span>
}

const data = [{
  title: 'Home',
  url: '#',
}, {
  title: 'Self',
  url: 'https://www.baidu.com',
}]

export default function () {
  return (
    <div>
      <Breadcrumb keygen="title" data={data} separator="|" />
      <Breadcrumb keygen={d => (`${d.title}2`)} data={data} separator={<Separator />} />
    </div>
  )
}

