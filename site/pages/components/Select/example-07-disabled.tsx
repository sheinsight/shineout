/**
 * cn - 禁用
 *    -- 设置 disabled 禁用组件
 * en - Disabled
 *    -- Set the disabled property to disable the component.
 */
import React from 'react'
import { Select } from 'shineout'

type SelectItem = string

const style: React.CSSProperties = { width: 240, marginBottom: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Select disabled keygen style={style} data={data} placeholder="Select color" />

    <br />

    <Select
      keygen
      multiple
      data={data}
      style={{ width: 300 }}
      placeholder="Multiple select"
      disabled={d => d === 'green'}
      defaultValue={['orange', 'green']}
    />
  </div>
)

export default App
