/**
 * cn -
 *    -- 示例：创建选项和 filter 配合使用
 * en -
 *    -- Example: Create options with filter
 */
import React from 'react'
import { Select, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']

const style: React.CSSProperties = { width: 240, marginBottom: 12 }
const data: SelectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Select
      keygen
      onCreate
      data={data}
      style={style}
      filterDelay={0}
      placeholder="input label"
      onFilter={text => d => d.indexOf(text) >= 0}
    />

    <br />

    <Select
      keygen
      onCreate
      multiple
      data={data}
      style={style}
      filterDelay={0}
      placeholder="input label"
      onFilter={text => d => d.indexOf(text) >= 0}
    />
  </div>
)

export default App
