/**
 * cn - 自定义过滤渲染
 *    -- 自定义渲染过滤框区域内容
 * en - RenderFilter
 *    -- Custom render filter
 */
import React from 'react'
import { Transfer, Input, TYPE } from 'shineout'

interface DataItem {
  id: number
  content: string
}
type TransferProps = TYPE.Transfer.Props<DataItem, number[]>

const data: TransferProps['data'] = []
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    content: `content ${i}`,
  })
}

const renderFilter: TransferProps['renderFilter'] = filterProps => (
  <div style={{ display: 'flex' }}>
    <Input placeholder="我是自定义筛选" onChange={filterProps.onFilter} />
  </div>
)

const onFilter: TransferProps['onFilter'] = (t, d) => d.content.indexOf(t) > -1

const App: React.FC = () => (
  <Transfer
    onFilter={onFilter}
    renderFilter={renderFilter}
    data={data}
    format="id"
    renderItem="content"
    keygen="id"
    titles={['Source', 'Target']}
  />
)

export default App
