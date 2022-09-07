/**
 * cn - defaultOpenKeys
 *    -- defaultOpenKeys
 * en - defaultOpenKeys
 *    -- defaultOpenKeys
 */
import React from 'react'
import { Menu, TYPE } from 'shineout'

interface MenuItem {
  id: string
  title: string
  children?: MenuItem[]
}
type MenuProps = TYPE.Menu.Props<MenuItem, MenuItem>
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
  const renderItem: MenuRenderItem = (d: MenuItem) => d.title
  return <Menu keygen="id" data={data} defaultOpenKeys={['6', '8']} style={{ width: 256 }} renderItem={renderItem} />
}

export default App
