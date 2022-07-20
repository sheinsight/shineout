/**
 * cn - 受控选中
 *    -- 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中
 *    -- <b>注: 勾选的值均使用的是 keygen 的结果</b>
 * en - Controlled selected
 *    -- Can control which elements are selected by selectedKeys and onSelectChange
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
  const [value, setValue] = React.useState<TransferProps['value']>([1, 3, 5, 7, 9])
  const [selectedKeys, setSelectedKeys] = React.useState<TransferProps['selectedKeys']>([1, 2, 3, 4])
  const selectChange: TransferProps['onSelectChange'] = (sourceKeys, targetKeys) => {
    setSelectedKeys([...sourceKeys, ...targetKeys])
  }

  const handleChange: TransferProps['onChange'] = v => {
    setValue(v)
  }

  return (
    <Transfer
      data={data}
      selectedKeys={selectedKeys}
      onSelectChange={selectChange}
      value={value}
      onChange={handleChange}
      format="id"
      renderItem="content"
      keygen="id"
    />
  )
}

export default App
