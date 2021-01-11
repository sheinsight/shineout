/**
 * cn - 筛选数据
 *    -- onFilter 可用于数据过滤，不返回结果时，可实现服务端过滤；返回函数时，用于前端过滤。
 *    -- 单选状态下支持
 * en - Filter
 *    -- onFilter can be used for data filtering, for server-side filtering when no results are returned, and for front-end filtering when a function is returned.
 *    -- Support in single selection state
 */
import React from 'react'
import { Cascader } from 'shineout'

const data = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
]

export default function() {
  return (
    <Cascader
      onFilter={text => d => d.value.indexOf(text) >= 0}
      data={data}
      absolute
      keygen="value"
      renderItem={n => `${n.value}`}
    />
  )
}
