/**
 * cn - 自定义
 *    -- 可以自定义标题, 按钮, 底部, 样式等属性
 * en - Customize
 *    -- Customizable title, button, bottom properties
 */
import React from 'react'
import { Transfer, Button, TYPE } from 'shineout'

interface DataItem {
  id: number
  content: string
}
type TransferProps = TYPE.Transfer.Props<DataItem, number[]>

const data: TransferProps['data'] = []

for (let i = 1; i < 30; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

const App: React.FC = () => (
  <Transfer
    titles={['I am left', 'I am right']}
    footers={[<Button style={{ margin: 4 }}>left</Button>, <Button style={{ margin: 4 }}>right</Button>]}
    data={data}
    format="id"
    renderItem="content"
    keygen="id"
    operations={['to right', 'to left']}
    listHeight={240}
  />
)
export default App
