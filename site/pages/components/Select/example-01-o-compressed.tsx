/**
 * cn -
 *    -- 设置 compressed 使选中值合并展示，鼠标悬浮时将会展示所有值。
 * en -
 *    -- Set the compressed property to compress values, hover to show all values.
 */
import React from 'react'
import { Select } from 'shineout'

interface SelectItem {
  id: string
}

const data: SelectItem[] = [
  { id: 'red' },
  { id: 'cyan' },
  { id: 'blue' },
  { id: 'green' },
  { id: 'violet' },
  { id: 'yellow' },
  { id: 'orange' },
]

const App: React.FC = () => (
  <Select
    multiple
    data={data}
    compressed
    format="id"
    keygen="id"
    renderItem="id"
    style={{ width: 300 }}
    placeholder="Multiple select Compressed"
  />
)

export default App
