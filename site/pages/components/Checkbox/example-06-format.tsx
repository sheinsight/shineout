/**
 * cn - 复杂数据
 *    -- 复杂的数据可以使用 format 处理 value
 * en - Complex data
 *    -- Complex data can use format to process value.
 */
import React from 'react'
import { Checkbox, TYPE } from 'shineout'

type CheckboxGroupProps<Data = any, T = any> = TYPE.Checkbox.GroupProps<Data, T>
type CheckboxGroupData = CheckboxGroupProps['data']
type CheckboxGroupRenderItem = CheckboxGroupProps['renderItem']

const data: CheckboxGroupData = [
  { id: 1, color: 'red' },
  { id: 2, color: 'cyan' },
  { id: 3, color: 'blue' },
  { id: 4, color: 'green' },
  { id: 5, color: 'yellow' },
  { id: 6, color: 'orange' },
  { id: 7, color: 'violet' },
]

const App: React.FC = () => {
  const renderItem: CheckboxGroupRenderItem = d => {
    const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }
    return <span style={style}>{d.color}</span>
  }

  return (
    <Checkbox.Group keygen="id" data={data} format="color" defaultValue={['blue', 'cyan']} renderItem={renderItem} />
  )
}

export default App
