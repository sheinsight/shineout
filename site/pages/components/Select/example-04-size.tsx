/**
 * cn - 大小
 *    -- 有三种 size，['small', default, 'large']
 * en - Size
 *    -- There are three sizes, ['small', default, 'large']
 */
import React from 'react'
import { Select } from 'shineout'

type SelectItem = string

const style: React.CSSProperties = { width: 100, marginInlineEnd: 12 }
const data: SelectItem[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Select size="small" keygen data={data} style={style} placeholder="small" />
    <Select keygen data={data} style={style} placeholder="default" />
    <Select size="large" keygen data={data} style={style} placeholder="large" />
  </div>
)

export default App
