/**
 * cn - 基本用法
 *    -- 基础的级联用法
 * en - Base
 *   -- Basic usage of Cascader
 */

import React from 'react'
import { Cascader } from 'shineout'

const data = [
  {
    value: 'zhejiang',
    children: [
      {
        value: 'hangzhou',
        children: [
          {
            value: 'xihu',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'zhonghuamen',
          },
        ],
      },
    ],
  },
]

export default function() {
  return <Cascader data={data} absolute keygen="value" renderItem={n => `${n.value}`} />
}
