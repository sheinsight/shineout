/**
 * cn - 展示未匹配选项
 *    -- unmatch 为 true 时 展示 data 中不存在的值，renderUnmatched 用来自定义渲染未匹配值
 * en - Show unmatched options
 *   -- show values that do not exist in data when unmatch is true, and the `renderUnmatched` props is used to customize rendering unmatched value
 */

import React from 'react'
import { Cascader, TYPE } from 'shineout'

type dataItem = { value: string; children?: dataItem[] }
type CascaderProps = TYPE.Cascader.Props<dataItem, string[]>
type CascaderData = CascaderProps['data']

const data: CascaderData = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
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

const App: React.FC = () => (
  <Cascader
    defaultValue={['aaa']}
    unmatch
    renderUnmatched={d => `未匹配值${d}`}
    data={data}
    keygen="value"
    renderItem={n => `${n.value}`}
  />
)

export default App
