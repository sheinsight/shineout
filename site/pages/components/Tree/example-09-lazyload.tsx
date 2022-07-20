/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 */
import React from 'react'
import immer from 'immer'
import { Tree, TYPE } from 'shineout'

interface DataItem {
  id: string
  children?: DataItem[]
}
type TreeProps = TYPE.Tree.Props<DataItem, string[]>

const initData = ['0', '1', '2', '3', '4'].map(i => ({ id: i }))
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i)

const App: React.FC = () => {
  const [data, setData] = React.useState<TreeProps['data']>(initData)
  const loader: TreeProps['loader'] = (key: string) => {
    const nextData = immer(data, draft => {
      const path: string[] = key.split(',')
      let target: any = draft
      path.forEach((pid, i) => {
        target = target.find((d: DataItem) => d.id === pid)
        if (i < path.length - 1) target = target.children
      })
      target.children = [...createRange().map(i => ({ id: `${target.id}-${i}` }))]
    })
    setTimeout(() => setData(nextData), 500)
  }

  const keyGenerator: TreeProps['keygen'] = (node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')

  const renderItem: TreeProps['renderItem'] = node => `node ${node.id}`

  return <Tree data={data} keygen={keyGenerator} loader={loader} renderItem={renderItem} />
}
export default App
