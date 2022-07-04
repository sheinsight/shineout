/**
 * cn - 大小
 *    -- 有三种 size，['small', default, 'large']
 * en - Size
 *    -- There are three sizes, ['small', default, 'large']
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']

const style: React.CSSProperties = { width: 100, marginInlineEnd: 12 }
const data: SelectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Select size="small" keygen data={data} style={style} placeholder="small" />
    <Select keygen data={data} style={style} placeholder="default" />
    <Select size="large" keygen data={data} style={style} placeholder="large" />
  </div>
)

export default App
