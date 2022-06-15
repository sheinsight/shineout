/**
 * cn - 移入展开
 *    -- 设置 expandTrigger 为 'hover' 或 'hover-only', 可以在鼠标移入节点时展开，默认为 'click'
 *    -- 如果值为 'hover-only'，父节点只能 hover 触发展开, 只有子节点可以点击选择值
 * en - Hover
 *    -- Set expandTrigger to 'hover' or 'hover-only', expand the node when mouse hover, default value is 'click'.
 */

import React from 'react'
import { Cascader, TYPE } from 'shineout'
import { cascader as data } from 'doc/data/tree'

type CascaderProps<Item, Value> = TYPE.Cascader.Props<Item, Value>
type RenderResult = CascaderProps<any, string[]>['renderResult']
type CascaderRenderItem = CascaderProps<any, string[]>['renderItem']

const App: React.FC = () => {
  const renderItem: CascaderRenderItem = node => `node ${node.text}`
  const renderResult: RenderResult = node => (node.children && node.children.length > 0 ? '' : node.text)

  return (
    <Cascader
      keygen="id"
      data={data}
      style={{ width: 300 }}
      renderItem={renderItem}
      expandTrigger="hover-only"
      renderResult={renderResult}
    />
  )
}

export default App
