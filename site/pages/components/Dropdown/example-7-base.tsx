/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.
 */
import React from 'react'
import { Dropdown, Message, TYPE } from 'shineout'

type DropdownProps = TYPE.Dropdown.Props
type DropdownData = DropdownProps['data']

const data: DropdownData = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  <a href="/">Home</a>,
  {
    content: 'Message',
    onClick: () => {
      Message.info('Some message.')
    },
  },
]

const App: React.FC = () => (
  <div style={{ background: '#eee', padding: 20, borderRadius: 10, overflow: 'hidden' }}>
    <Dropdown absolute placeholder="Absolute" data={data} />

    <Dropdown placeholder="Default" data={data} style={{ marginInlineStart: 40 }} />
  </div>
)

export default App
