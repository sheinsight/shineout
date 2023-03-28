/**
 * cn - openKeys 受控
 *    -- openKeys onOpenChange
 * en - openKeys 受控
 *    -- openKeys onOpenChange
 */
import React from 'react'
import { Menu, Button, TYPE } from 'shineout'

interface MenuItem {
  id: string
  title: string
  children?: MenuItem[]
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>
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
  const [keys, setKeys] = React.useState<string[]>([])
  return (
    <>
      <Button
        onClick={() => {
          setKeys([])
        }}
      >
        修改为[]
      </Button>
      <Button
        onClick={() => {
          setKeys(['6', '8'])
        }}
      >
        修改为[6, 8]
      </Button>
      <Button
        onClick={() => {
          setKeys(['3'])
        }}
      >
        修改为[3]
      </Button>
      <div id="keys">{`${keys.join(',')}`}</div>
      <Menu
        keygen="id"
        data={data}
        openKeys={keys}
        style={{ width: 256 }}
        renderItem={renderItem}
        onOpenChange={(k: string[]) => {
          setKeys(k)
        }}
      />
    </>
  )
}

export default App
