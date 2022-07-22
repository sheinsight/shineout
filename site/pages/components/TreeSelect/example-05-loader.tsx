/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数。
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 */
import React from 'react'
import immer from 'immer'
import { TreeSelect, TYPE } from 'shineout'

interface DataItem {
  id: string
  children?: DataItem[]
}
type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string[]>

const initData: DataItem[] = ['0', '1', '2', '3', '4'].map(i => ({ id: i }))

let index = 0

const App: React.FC = () => {
  const [data, setData] = React.useState<TreeSelectProps['data']>(initData)
  const loader: TreeSelectProps['loader'] = key => {
    setTimeout(() => {
      const nextData = immer(data, (d: DataItem[]) => {
        d[parseInt(key, 10)].children = Array(6)
          .fill(0)
          // eslint-disable-next-line no-plusplus
          .map(() => ({ id: `-${index++}`, children: [] }))
      })
      setData(nextData)
    }, 500)
  }

  return <TreeSelect multiple loader={loader} keygen="id" renderItem={node => `node ${node.id}`} data={data} />
}
export default App
