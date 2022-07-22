/**
 * cn - 控制展开
 *    -- 受控的展开（此示例数据量太大，第一次全部展开会比较慢）
 * en - Expanded
 *    -- Controlled expansion (Because the data in this example is too large, it will be slower for the first time.)
 */
import React from 'react'
import { Button, Tree, TYPE } from 'shineout'
import data, { allIds } from 'doc/data/tree'

type DataItem = typeof data[0]
type TreeProps = TYPE.Tree.Props<DataItem, string[]>

const App: React.FC = () => {
  const [expanded, setExpanded] = React.useState<TreeProps['expanded']>(['1'])
  const expandAll = () => {
    setExpanded([...allIds])
  }
  const collapseAll = () => {
    setExpanded([])
  }
  const handleExpand = (ids: string[]) => {
    setExpanded([...ids])
  }
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button onClick={expandAll}>Expand all</Button>
        <Button onClick={collapseAll}>Collapse all</Button>
      </div>
      <Tree
        data={data}
        keygen="id"
        line={false}
        expanded={expanded}
        onExpand={handleExpand}
        renderItem={node => `node ${node.id}`}
      />
    </div>
  )
}

export default App
