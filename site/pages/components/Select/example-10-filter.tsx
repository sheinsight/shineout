/**
 * cn -
 *    -- 示例：服务端过滤多选
 * en -
 *    -- Example: Server-side filters multiple selection.
 */

import React, { useState, useEffect } from 'react'
import { Select, TYPE } from 'shineout'
import { fetch } from 'doc/data/user'

interface SelectItem {
  id: number
  time: string
  start: string
  height: number
  salary: number
  office: string
  country: string
  office5: string
  position: string
  lastName: string
  firstName: string
}
type SelectProps = TYPE.Select.Props<SelectItem, number>
type SelectOnFilter = SelectProps['onFilter']
type SelectRenderItem = SelectProps['renderItem']

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<SelectItem[]>([])

  const handleFilter: SelectOnFilter = text => {
    setLoading(true)
    fetch.get('user', { username: text, sorter: '' }).then((res: { data: SelectItem[] }) => {
      setLoading(false)
      setData(res.data)
    })
  }

  const renderItem: SelectRenderItem = user => `${user.firstName} ${user.lastName}`

  useEffect(() => {
    handleFilter('', '')
  }, [])

  return (
    <Select
      multiple
      keygen="id"
      data={data}
      loading={loading}
      style={{ width: 240 }}
      onFilter={handleFilter}
      renderItem={renderItem}
      datum={{ format: 'id' }}
      placeholder="Select user"
    />
  )
}

export default App
