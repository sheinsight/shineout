/**
 * cn - 自定义渲染下拉列表
 *    -- 使用 renderOptionList 来自定义渲染下拉列表
 * en - custom render dropdown
 *   -- Use the renderOptionList property to customize the render dropdown list
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
    data={data}
    keygen="value"
    renderItem={n => `${n.value}`}
    onFilter={text => d => d.value.indexOf(text) > -1}
    renderOptionList={list => (
      <div>
        {list}
        <div style={{ padding: 5, textAlign: 'center', borderTop: '1px solid var(--gray-200, #e8ebf0)' }}>footer</div>
      </div>
    )}
  />
)

export default App
