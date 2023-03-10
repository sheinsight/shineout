/**
 * cn - 控制弹层（受控）
 *    -- Dropdown 通过 open 控制弹层的显示和隐藏
 * en - Controlled
 *    -- Component controlled by open property
 */
import React, { useState } from 'react'
import { Dropdown, Message, Button, TYPE } from 'shineout'

type DropdownItem = TYPE.Dropdown.Item
const data: DropdownItem[] = [
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

const App: React.FC = () => {
  const [show, setShow] = useState(true)

  const handleCollapse = (collapsed: boolean) => {
    setShow(collapsed)
    console.log('控制弹层（受控）:', collapsed)
  }
  return (
    <div style={{ height: 150 }}>
      <Button id="control" onClick={() => setShow(true)}>
        打开弹层
      </Button>
      <Dropdown onCollapse={handleCollapse} open={show} placeholder="Dropdown" data={data} />
    </div>
  )
}

export default App
