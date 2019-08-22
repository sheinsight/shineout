/**
 * cn - 分组
 *    -- 可以通过 groupBy 去将数据分组
 *    -- 组件会通过该函数的返回值对内容进行分组, 如果返回的是空, 则默认不分组, 为了防止产生歧义, 建议有一个默认分组.
 * en - GroupBy
 *    -- Grouping data by groupBy.
 *    -- The component will group the content by the return value of the function. If the return is empty, the default is not grouped. To prevent ambiguity, it is recommended to have a default grouping.
 */
import React from 'react'
import { Select } from 'shineout'

const data = [
  { value: 'Beijing', tag: '1' },
  { value: 'China', tag: '2' },
  { value: 'Shanghai', tag: '1' },
  { value: 'Mars', tag: '3' },
]

export default function() {
  return (
    <Select
      groupBy={d => {
        if (d.tag === '1') return 'City'
        if (d.tag === '2') return 'Country'
        return 'Other'
      }}
      keygen="value"
      style={{ width: 240 }}
      data={data}
      renderItem="value"
    />
  )
}
