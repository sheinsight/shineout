/**
 * cn - 垂直布局
 *    -- 默认为水平布局，设置 block 属性可以改为垂直布局
 * en - Vertical layout
 *    -- The default is horizontal layout and setting the block property can changed it to be vertical layout.
 */
import React from 'react'
import { Radio, TYPE } from 'shineout'

type RadioGroupProps = TYPE.Radio.GroupProps<any, any>
type RadioGroupData = RadioGroupProps['data']

const data: RadioGroupData = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
]

const App: React.FC = () => (
  <Radio.Group keygen="id" block data={data} datum={{ format: 'id' }} defaultValue={3} renderItem="color" />
)

export default App
