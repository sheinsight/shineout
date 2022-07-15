/**
 * cn -
 *    -- disabled 为函数时，根据函数返回结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true.
 */
import React from 'react'
import { Radio } from 'shineout'

type RadioGroupItem = string

const data: RadioGroupItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <Radio.Group keygen data={data} disabled={d => d === 'yellow'} defaultValue="blue" renderItem={d => d} />
)

export default App
