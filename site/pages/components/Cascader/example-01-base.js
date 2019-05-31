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
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

export default function() {
  return <Cascader data={data} absolute keygen="label" renderItem={n => `${n.value}`} />
}
