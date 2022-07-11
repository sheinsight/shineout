/**
 * cn - 基本用法
 *    -- 基础的级联用法
 * en - Base
 *   -- Basic usage of Cascader
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

const App: React.FC = () => <Cascader data={data} absolute keygen="value" renderItem={n => `${n.value}`} />

export default App
