/**
 * cn -
 *    -- 使用 onAdvancedFilter 属性开启高级筛选，可通过按钮针对当前层级在筛选结果和原始数据间切换
 * en -
 *    -- In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
 */
import React from 'react'
import { Select } from 'shineout'

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
      {
        value: 'suzhou',
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
          {
            value: 'feixi',
          },
        ],
      },
      {
        value: 'maanshan',
      },
    ],
  },
]

export default () => (
  <Select
    showHitDescendants
    absolute
    onAdvancedFilter={text => d => d.value.indexOf(text) > -1}
    clearable
    multiple
    format="value"
    keygen="value"
    renderItem="value"
    style={{ width: 250 }}
    treeData={data}
  />
)
