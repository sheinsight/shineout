/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 时，禁用所有选项
 * en - Disabled
 *    -- Set disabled property is set to true, all the options is disabled.
 */
import React from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Radio.Group keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
    <Radio.Group button keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
    <Radio.Group button="outline" keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
  </div>
)

export default App
