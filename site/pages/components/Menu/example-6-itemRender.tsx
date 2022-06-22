/**
 * cn - 自定义渲染
 *    -- 设置 renderItem 属性展现稍微复杂的内容
 * en - RenderItem
 *    -- Set the renderItem property to show format content.
 */
import React, { useState } from 'react'
import { Menu, TYPE } from 'shineout'
import Icon from '../Icon/FontAwesome'

type MenuProps = TYPE.Menu.Props<object, any>
type MenuData = MenuProps['data']
type MenuActive = MenuProps['active']
type MenuOnClick = MenuProps['onClick']
type MenuRenderItem = MenuProps['renderItem']

const Icons = {
  6: <Icon name="tag" />,
  1: <Icon name="home" />,
  3: <Icon name="flag" />,
  2: <Icon name="github" />,
}

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

  const renderItem: MenuRenderItem = (da: { id: 1 | 2 | 3 | 6; title: string }) => {
    if (da.title.startsWith('Navigation')) {
      return (
        <span>
          {Icons[da.id]}
          {` ${da.title}`}
        </span>
      )
    }
    return da.title
  }

  const handleClick: MenuOnClick = (d: any) => setActive([d.id])

  const checkActive: MenuActive = (d: any) => active.includes(d.id)

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
