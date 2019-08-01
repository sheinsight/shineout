/**
 * cn -
 *    -- 列表自适应内容宽度
 * en -
 *    --  options auto adapt width
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'this option is so long long long long long', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return <Select keygen absolute autoAdapt style={{ width: 240 }} data={data} defaultValue="" />
}
