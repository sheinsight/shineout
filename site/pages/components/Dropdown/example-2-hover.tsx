/**
 * cn - 触发
 *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发
 * en - Trigger
 *    -- By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.
 */
import React from 'react'
import { Dropdown, TYPE } from 'shineout'

type DropdownItem = TYPE.Dropdown.Item

const menu: DropdownItem[] = [
  {
    content: 'First',
    children: [
      {
        content: 'optic 1',
      },
    ],
  },
  {
    content: 'Second',
    url: 'http://www.google.com',
    children: [
      {
        content: 'topic 2',
        children: [
          {
            content: 'topic 3',
          },
        ],
      },
    ],
  },
]

const App: React.FC = () => <Dropdown trigger="hover" placeholder="Hover" data={menu} />

export default App
