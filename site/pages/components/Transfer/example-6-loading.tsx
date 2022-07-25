/**
 * cn - 加载中
 *    -- 穿梭框的加载中
 * en -  Loading
 *    -- Loading
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
  <Transfer loading data={data} format="id" renderItem="content" keygen="id" titles={['Source', 'Target']} />
)
export default App
