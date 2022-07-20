/**
 * cn - 筛选
 *    -- 可以通过设置 onFilter 去筛选列表项
 * en - Filter
 *    -- Can filter list items by setting onFilter
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
  <Transfer onFilter={(t, d) => d.content.indexOf(t) > -1} data={data} format="id" renderItem="content" keygen="id" />
)

export default App
