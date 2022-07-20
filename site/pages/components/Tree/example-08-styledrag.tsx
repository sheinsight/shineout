/**
 * cn - 设置拖动样式
 *    -- 可以通过 dragImageSelector, dragImageStyle, dragHoverExpand定义一些拖动的设置
 * en - Set the drag style
 *    -- Some drag settings can be defined by dragImageSelector, dragImageStyle, dragHoverExpand
 */
import React from 'react'
import { Tree, TYPE } from 'shineout'
import tree from 'doc/data/tree'

type DataItem = typeof tree[0]
type TreeProps = TYPE.Tree.Props<DataItem, string[]>

const App: React.FC = () => {
  const [data, setData] = React.useState<TreeProps['data']>(tree)

  const handleDrop: TreeProps['onDrop'] = React.useCallback((d, key, targetKey, position) => {
    console.log(data, key, targetKey, position)
    setData(d)
  }, [])

  const renderItem: TreeProps['renderItem'] = React.useCallback(
    node => (
      <div>
        <span>node </span>
        <span id={`node-id-${node.id}`}>{node.text}</span>
      </div>
    ),
    []
  )

  return (
    <Tree
      data={data}
      keygen="id"
      defaultExpanded={['1']}
      onDrop={handleDrop}
      dragImageSelector={d => `#node-id-${d.id}`}
      dragImageStyle={{ color: 'red' }}
      renderItem={renderItem}
      dragHoverExpand
    />
  )
}

export default App
