/**
 * cn - 图标
 *    -- 在 renderItem 中根据状态展示不同的图标
 * en - Icons
 *    -- Display different icon in the renderItem.
 */
import React from 'react'
import { Tree, TYPE } from 'shineout'
import data from 'doc/data/tree'
import FontAwesome from '../Icon/FontAwesome'

interface DataItem {
  id: string
  text: string
  children: Array<DataItem>
}
type TreeProps = TYPE.Tree.Props<DataItem, string[]>
const renderItem: TreeProps['renderItem'] = (node, isExpanded) => {
  let icon
  if (!node.children || node.children.length === 0) {
    icon = <FontAwesome name="file-text-o" />
  } else if (isExpanded) {
    icon = <FontAwesome name="folder-open" style={{ color: '#ffd666' }} />
  } else {
    icon = <FontAwesome name="folder" style={{ color: '#ffd666' }} />
  }

  return (
    <span>
      {icon}
      {node.text}
    </span>
  )
}

const App: React.FC = () => <Tree data={data} keygen="id" renderItem={renderItem} doubleClickExpand />
export default App
