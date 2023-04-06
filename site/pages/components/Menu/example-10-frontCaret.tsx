/**
 * cn - 前置展开符
 *    -- 使用 frontCaret 来前置展开符
 *    -- 使用 frontCaretType 来设置展开图标类型
 * en - put the expander in front
 *    -- use frontCaret to put the expander in front
 *    -- Use frontCaretType to set the Icon type
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
  const [active, setActive] = useState('1')

  const handleClick = (d: MenuItem) => setActive(d.id)

  const renderItem: MenuRenderItem = (d: MenuItem) => d.title

  const checkActive: MenuActive = (d: MenuItem) => active === d.id

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Menu
        keygen="id"
        frontCaret
        frontCaretType="solid"
        data={data}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256 }}
        renderItem={renderItem}
      />
      <Menu
        keygen="id"
        frontCaret
        frontCaretType="hollow"
        data={data}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256 }}
        renderItem={renderItem}
      />
      <Menu
        keygen="id"
        frontCaret
        frontCaretType="hollow"
        caretColor="green"
        data={data}
        inlineIndent={24}
        active={checkActive}
        onClick={handleClick}
        style={{ width: 256 }}
        renderItem={renderItem}
      />
    </div>
  )
}

export default App
