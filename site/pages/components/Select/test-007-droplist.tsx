/**
 * cn - T:菜单下拉上拉判断错误
 *    --
 * en -
 *    --
 */
import React from 'react'
import { Select } from 'shineout'

type SelectItem = string

const data: SelectItem[] = [
  'red',
  'orange',
  'this option is so long long long long long this option is so long long long long long',
  'this option is so long long long long long this option is so long long long long long1',
  'this option is so long long long long long this option is so long long long long long2',
  'this option is so long long long long long this option is so long long long long long3',
  'this option is so long long long long long this option is so long long long long long4',
  'this option is so long long long long long this option is so long long long long long5',
  'green',
  'cyan',
  'blue',
  'violet',
]

const App: React.FC = () => (
  <div id="scrollContainer" style={{ height: 200, overflow: 'auto', width: 500 }}>
    <div style={{ height: 300 }}>
      <Select
        height={350}
        keygen
        absolute
        autoAdapt
        style={{ width: 240, marginTop: 265 }}
        data={data}
        defaultValue=""
      />
    </div>
  </div>
)

export default App
