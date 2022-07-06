/**
 * cn - 加载中
 *    -- 数据加载中，为true时会展示一个默认的[Spin](/components/Spin)组件，可以传入一个自定义的Spin代替
 * en - Loading
 *    -- When it is true, a default [Spin](/components/Spin) component will be displayed, a custom loading icon can be passed in to replace.
 */
import React from 'react'
import { Select, Spin, TYPE } from 'shineout'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']

const style: React.CSSProperties = { width: 240, marginInlineEnd: 12 }
const data: SelectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const App: React.FC = () => (
  <div>
    <Select keygen data={data} loading defaultValue="" style={style} />

    <Select
      keygen
      data={data}
      style={style}
      defaultValue=""
      loading={<Spin size={18} name="four-dots" color="green" />}
    />
  </div>
)

export default App
