/**
 * cn - 一组复选框
 *    -- 一组复选框可以放在 Checkbox.Group 中
 * en - Group
 *    -- A series of checkboxes group by Checkbox.Group.
 */
import React from 'react'
import { Checkbox, TYPE } from 'shineout'

interface GroupData {
  id: number
  color: string
}
type CheckboxGroupProps = TYPE.Checkbox.GroupProps<GroupData, GroupData[]>
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
  <Checkbox.Group keygen="id" defaultValue={[3, 5]}>
    {data.map(d => (
      <Checkbox key={d.id} htmlValue={d.id}>
        {d.color}
      </Checkbox>
    ))}
  </Checkbox.Group>
)

export default App
