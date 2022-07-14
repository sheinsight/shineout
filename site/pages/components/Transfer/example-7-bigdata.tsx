/**
 * cn - 性能
 *    -- Transfer 内部使用了虚拟列表来优化性能，本例加载了10000条数据
 * en -
 *    -- Transfer uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.
 */
import React from 'react'
import { Transfer, TYPE } from 'shineout'

interface DataItem {
  id: number
  content: string
}
type TransferProps = TYPE.Transfer.Props<DataItem, number[]>

const data: TransferProps['data'] = []

for (let i = 0; i < 10000; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

const App: React.FC = () => (
  <Transfer data={data} format="id" renderItem="content" keygen="id" titles={['Source', 'Target']} />
)
export default App
