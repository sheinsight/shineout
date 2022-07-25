/**
 * cn - 创建选项
 *    -- 设置 onCreate 属性可以通过输入创建选项
 * en - Create by input
 *    -- Set the onCreate property can create options by inputting.
 */
import React from 'react'
import { Select } from 'shineout'

type SelectItem = string

const style: React.CSSProperties = { width: 240, marginBottom: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Select style={style} data={data} keygen placeholder="input color" onCreate defaultValue="brown" />
    <br />
    <Select style={style} data={data} keygen multiple placeholder="input color" onCreate={t => t} />
  </div>
)

export default App
