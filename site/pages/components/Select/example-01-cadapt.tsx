/**
 * cn -
 *    -- 当文字过长时，下拉列表宽度根据内容自由展开
 * en -
 *    --  options auto adapt width
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']

const data: SelectData = [
  'red',
  'orange',
  'this option is so long long long long long',
  'green',
  'cyan',
  'blue',
  'violet',
]

const App: React.FC = () => <Select keygen absolute autoAdapt style={{ width: 240 }} data={data} defaultValue="" />

export default App
