/**
 * cn -
 *    -- 设置 button 为 outline 可以展示透明背景的按钮样式
 * en -
 *    -- set button with outline to show outline button style
 */
import React from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = ['red', 'orange', 'yellow']

const App: React.FC = () => <Radio.Group button="outline" keygen data={data} defaultValue="red" />

export default App
