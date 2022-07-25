/**
 * cn -
 *    -- 当文字过长时，下拉列表宽度根据内容自由展开
 * en -
 *    --  options auto adapt width
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'this option is so long long long long long', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return <Select keygen absolute autoAdapt style={{ width: 240 }} data={data} defaultValue="" />
}
