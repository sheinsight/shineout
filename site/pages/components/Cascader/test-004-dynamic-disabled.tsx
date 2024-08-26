/**
 * cn - 动态disabled
 *    -- 树形数据的禁用逻辑存在层级关系，为了提高计算性能禁用状态会被缓存，当 data 更新或组件重新挂载才会更新缓存。
 * en - Dynamic disabled
 *   -- The disable logic of tree data has a hierarchical relationship. To improve the calculation performance, the disable status will be cached. The cache will be updated when the data is updated or the component is re-mounted.
 */

import React from 'react'
import { Cascader } from 'shineout'

interface DataItem {
  id: string
  name: string
  idChain?: string[] | null
  children?: DataItem[]
}

const mockData = [
  {
    id: 'brand',
    name: 'brand',
    children: [
      {
        id: 'brand-1',
        name: 'brand child1',
        children: [
          { id: 'brand-1-1', name: 'brand child1-1' },
          { id: 'brand-1-2', name: 'brand child1-2' },
        ],
      },
      {
        id: 'brand-2',
        name: 'brand child2',
        children: [
          { id: 'brand-2-1', name: 'brand child2-1' },
          { id: 'brand-2-2', name: 'brand child2-2' },
        ],
      },
    ],
  },
  {
    id: 'good',
    name: 'good',
    children: [
      { id: 'good-1', name: 'good child1', children: [{ id: 'good-1-1', name: 'good child1-1' }] },
      { id: 'good-2', name: 'good child2', children: [{ id: 'good-1-2', name: 'good child2-1' }] },
    ],
  },
]

const App: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([])

  const idChainsMap: Record<string, string[]> = {}
  const addParentId = (data: DataItem[], parentIdChain: string[] | null = null) =>
    data.map(d => {
      const idChains = parentIdChain ? [...parentIdChain, d.id] : [d.id]
      idChainsMap[d.id] = idChains
      d.idChain = idChains
      if (d.children) {
        d.children = addParentId(d.children, d.idChain)
      }
      return d
    })

  let treeData = addParentId(mockData)

  const onlySelectedBrand = value.length ? idChainsMap[value[0]][0] : null

  const handleChange = (v: string[]) => {
    setValue(v)

    treeData = [...treeData]
  }

  return (
    <div>
      <h4>一级单选，二三级多选，且仅返回三级节点（末级节点）的值</h4>
      <Cascader
        data={treeData}
        keygen="id"
        renderItem="name"
        compressed
        mode={2}
        // @ts-ignore
        disabled={(d: any) => {
          if (!onlySelectedBrand) return false

          if (d.idChain[0] !== onlySelectedBrand) {
            return true
          }

          return false
        }}
        style={{ width: 800 }}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default App
