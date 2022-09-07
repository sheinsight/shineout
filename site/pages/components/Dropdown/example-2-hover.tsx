/**
 * cn - 触发
 *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发
 * en - Trigger
 *    -- By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.
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

const App: React.FC = () => <Dropdown trigger="hover" placeholder="Hover" data={menu} />

export default App
