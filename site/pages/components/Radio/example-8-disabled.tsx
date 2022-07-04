/**
 * cn -
 *    -- disabled 为函数时，根据函数返回结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true.
 */
import React from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <Radio.Group keygen data={data} disabled={d => d === 'yellow'} defaultValue="blue" renderItem={d => d} />
)

export default App
