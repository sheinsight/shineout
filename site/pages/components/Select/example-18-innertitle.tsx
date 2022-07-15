/**
 * cn - 内嵌标题
 *    -- 使用 innerTitle 展示内嵌标题
 * en - inner title
 *    -- use innerTitle to display the inner title
 */
import React from 'react'
import { Select } from 'shineout'

type SelectItem = string
const style: React.CSSProperties = { width: 240, marginInlineEnd: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div style={{ verticalAlign: 'top' }}>
    <Select innerTitle="Pick a color, please" multiple compressed clearable keygen style={style} data={data} />
    <Select
      keygen
      clearable
      compressed
      data={data}
      style={style}
      innerTitle="Pick a color, please"
      onFilter={text => d => d.indexOf(text) >= 0}
    />
  </div>
)

export default App
