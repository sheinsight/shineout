/**
 * cn -
 *    -- 设置 size 可以控制按钮样式的大小
 * en -
 *    -- size to set button style size
 */
import React from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = ['red', 'orange', 'yellow']

const App: React.FC = () => (
  <div>
    <Radio.Group size="small" button keygen data={data} defaultValue="red" />
    <Radio.Group keygen button data={data} defaultValue="red" />
    <Radio.Group size="large" button keygen data={data} defaultValue="red" />
  </div>
)

export default App
