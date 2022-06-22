/**
 * cn - 点击事件
 *    -- 如果选项未设置单独的 onClick 事件，点击后会调用 Menu 定义的 onClick 事件
 * en - Click
 *    -- If the data item set the onClick event, this event is called. Otherwise, the onClick event defined by Menu is called.
 */
import React, { useState } from 'react'
import { Menu, Message, TYPE } from 'shineout'

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
  const [active, setActive] = useState(['1'])

  const renderItem: MenuRenderItem = (d: any) => d.title

  const handleClick: MenuOnClick = (d: any) => {
    Message.info(`now select is ${d.title}`)
    setActive([d.id])
  }

  const checkActive: MenuActive = (d: any) => active.includes(d.id)

  return (
    <Menu
      keygen="id"
      data={data}
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
