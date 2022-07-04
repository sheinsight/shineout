/**
 * cn - 性能
 *    -- Select 内部使用了虚拟列表来优化性能，本例加载了10000条数据。
 * en - Performance
 *    -- Select uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.
 */
import React from 'react'
import { Select, TYPE } from 'shineout'
import { fetchSync as fetchUser } from 'doc/data/user'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']
type SelectRenderItem = SelectProps['renderItem']
type SelectRenderResult = SelectProps['renderResult']

const users: SelectData = fetchUser(10000)
const style: React.CSSProperties = { width: 240, marginBottom: 12, display: 'block' }

const App: React.FC = () => {
  const renderResult: SelectRenderResult = user => `${user.firstName} ${user.lastName}`
  const renderItem: SelectRenderItem = (user, i) => `${user.firstName} ${user.lastName} (${i + 1})`

  return (
    <Select
      keygen="id"
      data={users}
      style={style}
      defaultValue={3}
      renderItem={renderItem}
      datum={{ format: 'id' }}
      renderResult={renderResult}
      placeholder="Select a user"
    />
  )
}

export default App
