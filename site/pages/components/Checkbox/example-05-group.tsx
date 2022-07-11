/**
 * cn -
 *    -- 可以直接通过数据来渲染一组 Checkbox
 * en -
 *    -- Render a group of checkboxes from data.
 */
import React from 'react'
import { Checkbox, TYPE } from 'shineout'

type GroupData = string
type CheckboxGroupProps = TYPE.Checkbox.GroupProps<GroupData, string>
type CheckboxGroupData = CheckboxGroupProps['data']
type CheckboxGroupRenderItem = CheckboxGroupProps['renderItem']

const data: CheckboxGroupData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const renderItem: CheckboxGroupRenderItem = color => {
  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
  return <span style={style}>{color}</span>
}

const App: React.FC = () => (
  <Checkbox.Group keygen={c => c} data={data} defaultValue={['blue', 'cyan']} renderItem={renderItem} />
)

export default App
