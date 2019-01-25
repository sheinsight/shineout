/**
 * cn - 基本用法
 *    -- Select 没有单独的 Option 选项，通过数据来渲染。
 * en - Base
 *    -- Select generate group of options from data.
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return <Select keygen style={{ width: 240 }} data={data} defaultValue="" />
}
