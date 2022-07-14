/**
 * cn - 父菜单可选中
 *    -- 设置 parentSelectable 使父级菜单支持单独选中 <br /> 此时父级菜单左侧区域用于选中，偏右侧区域用于展开和收起子菜单
 * en - Parent Selectable
 *    -- Setting the parentSelectable property can make the parent menu trigger the onClick of the Menu after clicking
 */
import React, { useState } from 'react'
import { Menu, TYPE } from 'shineout'

interface MenuItem {
  id: string
  title: string
  children?: MenuItem[]
}
type MenuProps = TYPE.Menu.Props<MenuItem, any>
type MenuActive = MenuProps['active']
type MenuRenderItem = MenuProps['renderItem']

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Parent 1',
    children: [
      {
        id: '2',
        title: 'Option 2',
      },
      {
        id: '3',
        title: 'Option 3',
      },
    ],
  },
  {
    id: '4',
    title: 'Parent 4',
    children: [
      {
        id: '5',
        title: 'Option 5',
      },
      {
        id: '6',
        title: 'Option 6',
      },
    ],
  },
  {
    id: '7',
    title: 'Option 7',
  },
]

const App: React.FC = () => {
  const [active, setActive] = useState('1')

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title

  const checkActive: MenuActive = (d: MenuItem) => active === d.id

  const handleClick = (d: MenuItem) => {
    setActive(d.id)
  }

  return (
    <Menu
      keygen="id"
      data={data}
      parentSelectable
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256 }}
      renderItem={renderItem}
    />
  )
}

export default App
