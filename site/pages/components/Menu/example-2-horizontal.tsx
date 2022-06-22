/**
 * cn - 水平布局
 *    -- 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）
 * en - Horizontal
 *    -- Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).
 */
import React, { useState } from 'react'
import { Menu, TYPE } from 'shineout'

type MenuProps = TYPE.Menu.Props<object, any>
type MenuData = MenuProps['data']
type MenuActive = MenuProps['active']
type MenuOnClick = MenuProps['onClick']
type MenuRenderItem = MenuProps['renderItem']

const data: MenuData = [
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

  const renderItem: MenuRenderItem = (d: any) => d.title

  const handleClick: MenuOnClick = (d: any) => setActive([d.id])

  const checkActive: MenuActive = (d: any) => active.includes(d.id)

  return (
    <Menu
      data={data}
      keygen="id"
      mode="horizontal"
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      renderItem={renderItem}
    />
  )
}

export default App
