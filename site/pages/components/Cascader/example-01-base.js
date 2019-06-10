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

export default function() {
  return <Cascader data={data} absolute keygen="value" renderItem={n => `${n.value}`} />
}
