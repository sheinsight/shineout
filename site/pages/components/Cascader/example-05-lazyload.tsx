/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 */
import React, { useState } from 'react'
import immer from 'immer'
import { Cascader, TYPE } from 'shineout'

type CascaderProps<Item, Value> = TYPE.Cascader.Props<Item, Value>
type CascaderKeygen = CascaderProps<any, string[]>['keygen']
type CascaderLoader = CascaderProps<any, string[]>['loader']
type CascaderChange = CascaderProps<any, string[]>['onChange']
type CascaderRenderItem = CascaderProps<any, string[]>['renderItem']

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map(i => ({ id: i }))
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i)

const App: React.FC = () => {
  const [_data, setData] = useState(initData)
  const [value, setValue] = useState([])

  const handleChange: CascaderChange = v => setValue(v)
  const renderItem: CascaderRenderItem = node => `node ${node.id}`
  const keyGenerator: CascaderKeygen = (node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')

  const loader: CascaderLoader = key => {
    const path = key.toString().split(',')
    setTimeout(() => {
      const producer = immer(draft => {
        let { data } = draft
        path.forEach((pid, i) => {
          data = draft.find(d => d.id === pid)
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
