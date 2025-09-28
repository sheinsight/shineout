/**
 * cn - 基本用法
 *    -- 基础的TreeSelect用法。
 * en - Base
 *    -- Basic usage of TreeSelect.
 */
import React from 'react'
import { TreeSelect, TYPE } from 'shineout'

interface DataItem {
  id: string
  title: string
  child?: DataItem[]
}
type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>

const data: TreeSelectProps['data'] = [
  {
    id: '1',
    title: '1',
    child: [
      { id: '1-1', title: '1-1', child: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }] },
      { id: '1-2', title: '1-2' },
    ],
  },
  { id: '2', title: '2', child: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }] },
  { id: '3', title: '3', child: [{ id: '3-1', title: '3-1' }] },
]

const App: React.FC = () => {
  const [value, setValue] = React.useState<TreeSelectProps['value']>('')

  const handleChange: TreeSelectProps['onChange'] = v => {
    setValue(v)
  }

  return (
    <TreeSelect
      value={value}
      onChange={handleChange}
      clearable
      style={{ width: 250 }}
      keygen="id"
      renderItem={node => `node ${node.title}`}
      data={data}
      childrenKey="child"
    />
  )
}

export default App
