/**
 * cn - 选中值
 *    -- 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。
 * en - Value
 *    -- When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked);
 *    -- When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);
 */
import React from 'react'
import { Checkbox } from 'shineout'

const App: React.FC = () => (
  <Checkbox htmlValue="ok" defaultValue="ok">
    {'value is "ok"'}
  </Checkbox>
)

export default App
