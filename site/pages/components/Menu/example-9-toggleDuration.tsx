/**
 * cn - 菜单项状态改变后持续时间
 *    -- 当鼠标从菜单项中移开时，菜单项会在停留指定时间后消失
 * en - ToggleDuration
 *    -- When the mouse cursor is removed from  menuitem, the menuitem disappears for a specified period of time
 */
import React, { useState } from 'react'
import { Menu, Button, TYPE } from 'shineout'

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
  const [toggleDuration, setToggleDuration] = useState(500)

  const renderItem: MenuRenderItem = (d: any) => d.title

  const checkActive: MenuActive = (d: any) => active === d.id

  const handleClick: MenuOnClick = (d: any) => setActive(d.id)

  return (
    <div>
      <Button type={toggleDuration === 500 ? 'primary' : 'default'} onClick={() => setToggleDuration(500)}>
        0.5s
      </Button>
      <Button type={toggleDuration === 2000 ? 'primary' : 'default'} onClick={() => setToggleDuration(2000)}>
        2s
      </Button>
      <Menu
        keygen="id"
        data={data}
        mode="horizontal"
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        renderItem={renderItem}
        toggleDuration={toggleDuration}
      />
    </div>
  )
}

export default App
