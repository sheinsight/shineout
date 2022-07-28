/**
 * cn - expandTrigger 和 finalDismiss 示例
 * en - Hover
 */

import React from 'react'
import { Cascader, TYPE } from 'shineout'
import { cascader as data } from 'doc/data/tree'

type DateItem = { text: string; id: string; children?: DateItem[] }
type CascaderProps = TYPE.Cascader.Props<DateItem, string>
type CascaderRenderItem = CascaderProps['renderItem']

const App: React.FC = () => {
  const renderItem: CascaderRenderItem = node => `node ${node.text}`
  return (
    <>
      <Cascader
        keygen="id"
        data={data}
        style={{ width: 300 }}
        renderItem={renderItem}
        expandTrigger="hover-only"
        placeholder="hover-only"
      />
      <Cascader
        keygen="id"
        placeholder="hover"
        data={data}
        style={{ width: 300 }}
        renderItem={renderItem}
        expandTrigger="hover"
      />
      <Cascader
        finalDismiss
        keygen="id"
        placeholder="click"
        data={data}
        style={{ width: 300 }}
        renderItem={renderItem}
      />
    </>
  )
}

export default App
