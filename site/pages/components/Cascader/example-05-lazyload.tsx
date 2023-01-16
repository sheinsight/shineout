/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数
 *    -- 注意，在开启动态加载功能后，mode 属性仅支持 3 或 4 模式。
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 *    -- In addition, with lazyload enabled, the mode attribute only supports mode 3 or 4.
 */
import React, { useState } from 'react'
import immer from 'immer'
import { Cascader, TYPE } from 'shineout'

interface DataItem {
  id: string
  children: DataItem[]
}
type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>
type CascaderKeygen = CascaderProps['keygen']
type CascaderLoader = CascaderProps['loader']
type CascaderChange = CascaderProps['onChange']
type CascaderValue = CascaderProps['value']
type CascaderRenderItem = CascaderProps['renderItem']

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map(i => ({ id: i }))
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i)

const App: React.FC = () => {
  const [_data, setData] = useState(initData)
  const [value, setValue] = useState<CascaderValue>([])

  const handleChange: CascaderChange = v => setValue(v)
  const renderItem: CascaderRenderItem = node => `node ${node.id}`
  const keyGenerator: CascaderKeygen = (node, parentKey) => `${String(parentKey)},${node.id}`.replace(/^,/, '')

  const loader: CascaderLoader = key => {
    const path = key.toString().split(',')
    setTimeout(() => {
      const producer = immer(draft => {
        let { data } = draft
        path.forEach((pid, i) => {
          data = draft.find((d: { id: string }) => d.id === pid)
          if (i < path.length - 1) draft = data.children
        })
        data.children = [...createRange().map(i => ({ id: `${data.id}-${i}` }))]
      })
      const nextState = producer(_data)
      setData(nextState)
    }, 500)
  }

  return (
    <Cascader
      mode={3}
      data={_data}
      value={value}
      loader={loader}
      keygen={keyGenerator}
      renderItem={renderItem}
      onChange={handleChange}
    />
  )
}

export default App
