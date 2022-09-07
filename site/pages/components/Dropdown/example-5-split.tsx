/**
 * cn - 组合
 *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项
 * en - Group
 *    -- Dropdown can be combined with Button used in Button.Group.
 */
import React from 'react'
import { Dropdown, Message, Button, TYPE } from 'shineout'

type DropdownProps = TYPE.Dropdown.Props
type DropdownData = DropdownProps['data']

const menu: DropdownData = [
  {
    content: 'First',
  },
  {
    content: 'Second',
    target: '_blank',
    url: 'http://www.google.com',
  },
]

const App: React.FC = () => (
  <Button.Group>
    <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>

    <Button>Center</Button>

    <Dropdown
      data={menu}
      position="bottom-right"
      onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}
    />
  </Button.Group>
)

export default App
