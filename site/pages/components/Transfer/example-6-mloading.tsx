/**
 * cn -
 *    -- 可以通过给 loading 设置数组的方式, 给两边设置一个不同的loading
 * en -
 *    -- You can set an array for loading and set an unused loading for both sides
 */
import React from 'react'
import { Transfer, TYPE } from 'shineout'

interface DataItem {
  id: number
  content: string
}
type TransferProps = TYPE.Transfer.Props<DataItem, number[]>

const data: TransferProps['data'] = []

for (let i = 1; i < 20; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

const App: React.FC = () => (
  <Transfer
    loading={[true, false]}
    data={data}
    format="id"
    renderItem="content"
    keygen="id"
    titles={['Source', 'Target']}
  />
)

export default App
