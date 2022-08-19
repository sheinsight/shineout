/**
 * cn - 筛选限制字符长度
 *    -- maxLength
 * en - 筛选限制字符长度
 *    -- maxLength
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<string, string[]>
type SelectOnFilter = SelectProps['onFilter']

const data: string[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => {
  const handleFilter: SelectOnFilter = text => v => v.indexOf(text) > -1

  return (
    <Select
      maxLength={10}
      absolute
      multiple
      clearable
      keygen
      data={data}
      style={{ width: 250 }}
      onFilter={handleFilter}
    />
  )
}

export default App
