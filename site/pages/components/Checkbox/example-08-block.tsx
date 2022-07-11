/**
 * cn - 垂直布局
 *    -- 默认是水平布局，设置 block 属性可以改为垂直布局
 * en - Block
 *    -- The default is horizontal layout, and setting the block property can change it to be vertical layout.
 */
import React from 'react'
import { Checkbox, TYPE } from 'shineout'

interface GroupData {
  id: number
  color: string
}
type CheckboxGroupProps = TYPE.Checkbox.GroupProps<GroupData, string>
type CheckboxGroupData = CheckboxGroupProps['data']

const data: CheckboxGroupData = [
  { id: 1, color: 'red' },
  { id: 2, color: 'cyan' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
  { id: 5, color: 'yellow' },
  { id: 6, color: 'orange' },
  { id: 7, color: 'violet' },
]

const App: React.FC = () => (
  <Checkbox.Group
    block
    keygen="id"
    data={data}
    renderItem="color"
    datum={{ format: 'color' }}
    defaultValue={['blue', 'cyan']}
  />
)

export default App
