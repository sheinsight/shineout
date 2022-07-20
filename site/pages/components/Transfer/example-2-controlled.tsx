/**
 * cn - 受控
 *    -- 组件受控
 * en - Controlled
 *    -- Component controlled
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

const App: React.FC = () => {
  const [value, setValue] = React.useState<number[]>([1, 3, 5, 7, 9])
  const onChange: TransferProps['onChange'] = v => {
    setValue(v)
  }
  return (
    <Transfer
      data={data}
      value={value}
      onChange={onChange}
      format="id"
      renderItem="content"
      keygen="id"
      disabled={d => d.content.indexOf('1') > -1}
    />
  )
}

export default App
