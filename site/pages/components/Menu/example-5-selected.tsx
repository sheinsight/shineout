/**
 * cn - 受控
 *    -- active 参数控制选中选项
 * en - Controlled
 *    -- Set active property to control the actived option.
 */
import React, { useState } from 'react'
import { Menu, TYPE } from 'shineout'

interface MenuItem {
  id: string
  title: string
  children?: MenuItem[]
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>
type MenuActive = MenuProps['active']
type MenuOnClick = MenuProps['onClick']
type MenuRenderItem = MenuProps['renderItem']

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Navigation One',
  },
  {
    id: '3',
    title: 'Navigation Two',
    children: [
      {
        id: '4',
        title: 'Option 1',
      },
      {
        id: '5',
        title: 'Option 2',
      },
    ],
  },
  {
    id: '6',
    title: 'Navigation Three',
    children: [
      {
        id: '7',
        title: 'Option 3',
      },
      {
        id: '8',
        title: 'Option 4',
        children: [
          {
            id: '9',
            title: 'Optic 1',
          },
          {
            id: '10',
            title: 'Optic 2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Navigation Four',
  },
]

const App: React.FC = () => {
  const [active, setActive] = useState(['1'])

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title

  const handleClick: MenuOnClick = (d: MenuItem) => setActive([d.id])

  const checkActive: MenuActive = (d: MenuItem) => active.includes(d.id)

  return (
    <Menu
      data={data}
      keygen="id"
      mode="inline"
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256 }}
      defaultOpenKeys={['3']}
      renderItem={renderItem}
    />
  )
}
export default App
