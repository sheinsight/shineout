/**
 * cn -
 *    -- disabled 为函数时，根据函数结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true.
 */
import React from 'react'
import { Checkbox, TYPE } from 'shineout'

type GroupData = string
type CheckboxGroupProps = TYPE.Checkbox.GroupProps<GroupData, string>
type CheckboxGroupData = CheckboxGroupProps['data']

const data: CheckboxGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Checkbox.Group data={data} disabled={d => d === 'yellow'} keygen defaultValue={['blue']} renderItem={d => d} />
  </div>
)

export default App
