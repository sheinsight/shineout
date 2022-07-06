/**
 * cn - 树形选择 - 筛选数据
 *    -- 通过设置 onFilter 来筛选树形数据。
 * en - Tree Select Filter
 *    -- Set onFilter to filter tree data.
 */
import React, { useState } from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectTreeData = SelectProps['treeData']
type SelectOnChange = SelectProps['onChange']
type SelectOnFilter = SelectProps['onFilter']

const data: SelectTreeData = [
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
  const [value, setValue] = useState([])

  const handleChange: SelectOnChange = v => setValue(v)

  const handleFilter: SelectOnFilter = text => v => v.title.indexOf(text) > -1

  return (
    <Select
      absolute
      multiple
      clearable
      format="id"
      keygen="id"
      value={value}
      treeData={data}
      style={{ width: 250 }}
      onFilter={handleFilter}
      onChange={handleChange}
      renderItem={v => `node ${v.title}`}
      disabled={v => v.title.startsWith('1-')}
    />
  )
}

export default App
