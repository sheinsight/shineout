/**
 * cn - 筛选
 *    -- onFilter 返回函数时，使用这个函数做前端过滤。
 * en - Filter
 *    -- OnFilter is a function to filter data.
 */
import React from 'react'
import { TreeSelect } from 'shineout'

interface DataItem {
  id: string
  title: string
  children?: DataItem[]
}

const data = [
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
  { id: '4', title: '4', children: [{ id: '4-1', title: '4-1' }] },
  { id: '5', title: '5', children: [{ id: '5-1', title: '5-1' }] },
]

const App: React.FC = () => {
  const [single, setSingle] = React.useState<string>('')
  const [multi, setMulti] = React.useState<string[]>([])
  const handleChangeSingle = (v: string) => {
    setSingle(v)
  }
  const handleChangeMultiple = (v: string[]) => {
    setMulti(v)
  }

  const handleFilter = (text: string) => (d: DataItem) => d.title.indexOf(text) > -1
  return (
    <div>
      <TreeSelect
        onFilter={handleFilter}
        value={single}
        onChange={handleChangeSingle}
        clearable
        style={{ width: 250, marginBottom: 20 }}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        data={data}
      />
      <br />
      <TreeSelect
        multiple
        onFilter={handleFilter}
        value={multi}
        onChange={handleChangeMultiple}
        clearable
        style={{ width: 250 }}
        keygen="id"
        renderItem={node => `node ${node.title}`}
        data={data}
      />
    </div>
  )
}

export default App
