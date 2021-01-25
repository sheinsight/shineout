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

function highlight(title, key) {
  if (!key) return title
  const repleased = title.replace(new RegExp(key, 'g'), '#')
  return repleased.split('').map((v, i) => {
    if (v !== '#') return v
    return (
      <span key={i} style={{ color: '#FF4E50' }}>
        {key}
      </span>
    )
  })
}

export default function() {
  const [current, setCurrent] = React.useState([])
  const [filterText, setFilterText] = React.useState()
  return (
    <Cascader
      value={current}
      onChange={d => {
        setFilterText('')
        setCurrent(d)
      }}
      onFilter={text => {
        setFilterText(text)
        return d => d.value.indexOf(text) >= 0
      }}
      data={data}
      absolute
      keygen="value"
      renderResult={d => d.value}
      renderItem={({ value }) => highlight(value, filterText)}
    />
  )
}
