/**
 * cn - 拖动
 *    -- 设置 onDrop 属性可以拖动节点，设置 dragSibling 限制兄弟节点之间拖动
 * en - Drag
 *    -- Set the onDrop property to drag nodes.
 */
import React from 'react'
import { Tree, TYPE } from 'shineout'
import tree from 'doc/data/tree'

type DataItem = typeof tree[0]
type TreeProps = TYPE.Tree.Props<DataItem, string[]>

const App: React.FC = () => {
  const [data, setData] = React.useState<TreeProps['data']>(tree)

  const handleDrop: TreeProps['onDrop'] = (d, key, targetKey, position) => {
    console.log(d, key, targetKey, position)
    setData(d)
  }

  const renderItem: TreeProps['renderItem'] = node => (
    <div>
      <span>node </span>
      <span id={`node-id-${node.id}`}>{node.text}</span>
    </div>
  )

  return <Tree data={data} keygen="id" defaultExpanded={['1']} onDrop={handleDrop} renderItem={renderItem} />
}

export default App
