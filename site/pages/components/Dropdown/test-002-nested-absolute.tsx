/**
 * cn - 嵌套 absolute Dropdown
 *    -- 验证 Popover 内嵌套 absolute Dropdown 的 item onClick 能正常触发
 * en - Nested absolute Dropdown
 *    -- Verify item onClick works in nested absolute Dropdown inside Popover
 */
import React from 'react'
import { Button, Popover, Dropdown, Message, TYPE } from 'shineout'

type DropdownItem = TYPE.Dropdown.Item
const childrenData = [
  {
    content: 'Submenu1',
    onClick: () => Message.info('Submenu1 clicked'),
  },
  {
    content: 'Submenu2',
    onClick: () => Message.info('Submenu2 clicked'),
  },
]

const getContainer = () => document.getElementById('dropdown-base') as HTMLElement
const data: DropdownItem[] = [
  {
    content: (
      <div>
        <Dropdown
          trigger="hover"
          placeholder="children dropdown1"
          data={childrenData}
          type="link"
          absolute={getContainer}
        />
      </div>
    ),
  },
  {
    content: (
      <div>
        <Dropdown
          trigger="hover"
          placeholder="children dropdown2"
          data={childrenData}
          type="link"
          absolute={getContainer}
        />
      </div>
    ),
  },
]

const App: React.FC = () => {
  const handleCollapse = (collapsed: boolean) => {
    console.log('Dropdown collapsed:', collapsed)
  }
  return (
    <div id="dropdown-base">
      <Button type="primary">
        <Popover style={{ padding: '4px 8px' }} trigger="click">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Dropdown trigger="hover" onCollapse={handleCollapse} placeholder="Dropdown" data={data} type="link" />
          </div>
        </Popover>
        Hover
      </Button>
    </div>
  )
}

export default App
