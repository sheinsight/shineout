/**
 * cn -
 *    -- 设置 button 为 outline 可以展示透明背景的按钮样式
 * en -
 *    -- set button with outline to show outline button style
 */
import React from 'react'
import { Radio } from 'shineout'

const data: string[] = ['red', 'orange', 'yellow']

const App: React.FC = () => <Radio.Group button="outline" keygen data={data} defaultValue="red" />

export default App
