/**
 * cn - 高级筛选
 *    -- 高级筛选模式下，可通过按钮针对当前层级在筛选结果和原始数据间切换
 *    -- 设置 onAdvancedFilter 属性开启高级筛选，仅支持前端筛选
 * en - Advanced Filter
 *    -- In the advanced filter mode, you can switch between the filter results and the original data for the current level by pressing the button
 *    -- Set the onAdvancedFilter property to enable advanced filtering, only front-end filtering is supported
 */
import React from 'react'
import { TreeSelect } from 'shineout'

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
  <TreeSelect
    showHitDescendants
    onAdvancedFilter={text => d => d.value.indexOf(text) > -1}
    clearable
    style={{ width: 250, marginBottom: 20 }}
    keygen="value"
    renderItem="value"
    data={data}
  />
)
