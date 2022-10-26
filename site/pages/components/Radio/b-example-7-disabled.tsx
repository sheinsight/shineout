/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 时，禁用所有选项
 * en - Disabled
 *    -- Set disabled property is set to true, all the options is disabled.
 */
import React from 'react'
import { Radio } from 'shineout'


const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Radio.Group keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
    <Radio.Group button keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
    <Radio.Group button="outline" keygen disabled data={data} defaultValue="blue" renderItem={d => d} />
  </div>
)

export default App
