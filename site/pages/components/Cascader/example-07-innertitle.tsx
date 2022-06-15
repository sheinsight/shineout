/**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - InnerTitle
 *   -- use innerTitle to display the inner title
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
    size="large"
    mode={2}
    compressed
    innerTitle="select city"
    data={data}
    absolute
    keygen="value"
    renderItem={n => `${n.value}`}
  />
)
export default App
