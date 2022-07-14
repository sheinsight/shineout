/**
 * cn - 禁用
 *    -- disabled 为函数时，根据返回结果禁用节点，同时禁用子节点
 *    -- disabled 为 true 时，禁用全部节点
 * en - disabled
 *    -- When the disabled property is a function, disable the node and its child nodes according to the returned result.
 *    -- When the disabled property is true, disable all nodes.
 */

import React from 'react'
import { Cascader, TYPE } from 'shineout'
import { cascader as data } from 'doc/data/tree'

type DateItem = { text: string; id: string; children?: DateItem[] }
type CascaderProps = TYPE.Cascader.Props<DateItem, string[]>
type CascaderRenderItem = CascaderProps['renderItem']
type CascaderDisabled = CascaderProps['disabled']

const isDisabled: CascaderDisabled = d => d.id === '1-0' || d.id === '2'

const App: React.FC = () => {
  const renderItem: CascaderRenderItem = node => `node ${node.text}`

  return <Cascader data={data} keygen="id" disabled={isDisabled} mode={2} renderItem={renderItem} />
}

export default App
