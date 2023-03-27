/**
 * cn - disabled 后 hover 无效
 *    -- 开启 disabled 后，hover、click 不可展开菜单
 * en -
 *    --
 */
import React from 'react'
import { Dropdown, TYPE } from 'shineout'

type DropdownProps = TYPE.Dropdown.Props
type DropdownData = DropdownProps['data']

const menu: DropdownData = [
  {
    content: 'First',
    id: '1',
    children: [
      {
        id: '3',
        content: 'optic 1',
      },
    ],
  },
  {
    content: 'Second',
    url: 'http://www.google.com',
    id: '2',
    children: [
      {
        content: 'topic 2',
        id: 4,
        children: [
          {
            id: '6',
            content: 'topic 3',
          },
        ],
      },
    ],
  },
]

const App: React.FC = () => (
  <div>
    <Dropdown className="click" disabled trigger="click" placeholder="Click" data={menu} />
    <Dropdown className="hover" disabled trigger="hover" placeholder="Hover" data={menu} />
  </div>
)

export default App
