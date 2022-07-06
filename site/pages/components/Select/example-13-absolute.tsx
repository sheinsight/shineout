/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)
 */
import React from 'react'
import { Select, TYPE } from 'shineout'
import { fetchSync as fetchUser } from 'doc/data/user'

type SelectProps = TYPE.Select.Props<any, any>
type SelectData = SelectProps['data']

const users = fetchUser(10000)
const data: SelectData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
const styleAbsolute: React.CSSProperties = { padding: 10, height: 100, overflow: 'hidden' }

const App: React.FC = () => (
  <div style={styleAbsolute}>
    <Select
      keygen
      absolute
      data={data}
      placeholder="default"
      style={{ width: 100, marginInlineEnd: 12 }}
      onFilter={text => d => d.indexOf(text) > -1}
    />

    <Select
      absolute
      multiple
      keygen="id"
      format="id"
      data={users}
      style={{ width: 300 }}
      placeholder="Select user"
      onFilter={text => d => d.firstName.indexOf(text) > -1}
      renderItem={user => `${user.firstName} ${user.lastName}`}
    />
  </div>
)

export default App
