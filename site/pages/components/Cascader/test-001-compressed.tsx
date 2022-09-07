/**
 * cn - 超长合并选项
 *    -- 设置 compressed 属性，当选项超长的时候会合并选项
 * en - Extra long merge option
 *   -- Set the compressed attribute, when the option is too long, the option will be merged
 */

import React from 'react'
import { Cascader, TYPE } from 'shineout'
import data from './data'

interface DataItem {
  id: string
  text: string
  children?: DataItem[]
}
type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>
type CascaderRenderItem = CascaderProps['renderItem']

const getValue = (list: any, value: any) => {
  const [node] = list
  if (!node) return value
  value.push(node.id)
  if (node.children) getValue(node.children, value)
  return value
}

const App: React.FC = () => {
  const renderItem: CascaderRenderItem = node => `node ${node.id}`

  return (
    <div>
      <Cascader data={data} keygen="id" compressed mode={0} style={{ width: 200 }} renderItem={renderItem} />
      <br />
      <Cascader data={data} keygen="id" compressed mode={0} style={{ width: 500 }} renderItem={renderItem} />
      <br />
      <Cascader data={data} keygen="id" compressed compressedBound={1} mode={0} renderItem={renderItem} />
    </div>
  )
}

export default App
