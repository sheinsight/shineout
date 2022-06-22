/**
 * cn - 基本用法
 *    -- Menu 通过数据来生成菜单项
 * en - Base
 *    -- Menu generates menu items through data.
 */
import React, { useState } from 'react'
import { Menu, TYPE } from 'shineout'

type MenuProps = TYPE.Menu.Props<object, any>
type MenuData = MenuProps['data']
type MenuActive = MenuProps['active']
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
  const [active, setActive] = useState('1')

  const handleClick = (d: any) => setActive(d.id)

  const renderItem: MenuRenderItem = (d: any) => d.title

  const checkActive: MenuActive = (d: any) => active === d.id

  return (
    <Menu
      keygen="id"
      data={data}
      inlineIndent={24}
      active={checkActive}
      onClick={handleClick}
      style={{ width: 256 }}
      renderItem={renderItem}
    />
  )
}

export default App
