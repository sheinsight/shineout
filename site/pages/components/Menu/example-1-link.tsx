/**
 * cn - 链接
 *    --  可以通过设置 linkKey 来渲染出对应的链接
 * en - link
 *    -- Can render the corresponding link by setting linkKey
 */
import React from 'react'
import { Menu, TYPE } from 'shineout'

interface MenuItem {
  id: string
  link: string
  title: string
}
type MenuProps = TYPE.Menu.Props<MenuItem, string>
type MenuRenderItem = MenuProps['renderItem']

const data: MenuItem[] = [
  {
    id: '1',
    title: 'Google',
    link: 'https://www.google.com',
  },
  {
    id: '2',
    title: 'strackoverflow',
    link: 'https://www.strackoverflow.com',
  },
  {
    id: '3',
    title: 'github',
    link: 'https://www.github.com',
  },
]

const App: React.FC = () => {
  const renderItem: MenuRenderItem = (d: MenuItem) => d.title

  return (
    <Menu keygen="id" linkKey="link" data={data} renderItem={renderItem} style={{ width: 256 }} inlineIndent={24} />
  )
}

export default App
