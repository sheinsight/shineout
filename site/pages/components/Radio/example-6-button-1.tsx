/**
 * cn - 按钮样式
 *    -- 设置 button 属性可以展示为按钮样式
 * en - Button
 *    -- set button to show button style
 */
import React from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = ['red', 'orange', 'yellow']

const App: React.FC = () => <Radio.Group button keygen data={data} defaultValue="red" />

export default App
