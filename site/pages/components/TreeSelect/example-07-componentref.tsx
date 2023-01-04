/**
 * cn - 组件方法
 *    -- 通过 getComponentRef 获取一些组件方法目前支持 getDataByValues
 * en - Component method
 *    -- Get some component methods through getComponentRef currently support getDataByValues
 */
import React from 'react'
import { TreeSelect, TYPE } from 'shineout'

interface DataItem {
  id: string
  title: string
  children?: DataItem[]
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, DataItem[]>

type TreeSelectRef = TYPE.TreeSelect.ComponentRef<DataItem>

const data: TreeSelectProps['data'] = [
  {
    id: '1',
    title: '1',
    children: [
      { id: '1-1', title: '1-1', children: [{ id: '1-1-1', title: '1-1-1' }, { id: '1-1-2', title: '1-1-2' }] },
      { id: '1-2', title: '1-2' },
    ],
  },
  { id: '2', title: '2', children: [{ id: '2-1', title: '2-1' }, { id: '2-2', title: '2-2' }] },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
]

const App: React.FC = () => {
  const [value, setValue] = React.useState<TreeSelectProps['value']>()
  const ref = React.useRef<TreeSelectRef>()

  const handleChange: TreeSelectProps['onChange'] = v => {
    setValue(v)
    if (ref.current) {
      const d = ref.current.getDataByValues(v)
      console.log('data', d)
    }
  }

  return (
    <TreeSelect
      value={value}
      multiple
      getComponentRef={ref}
      onChange={handleChange}
      clearable
      style={{ width: 250 }}
      keygen="id"
      renderItem={node => `node ${node.title}`}
      data={data}
    />
  )
}

export default App
