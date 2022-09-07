/**
 * cn - 额外内容
 *    -- 可以在标签页的右侧添加额外内容
 * en - Extra Content
 *    -- Can add extra content on the right side of the tab
 */
import React from 'react'
import { Tabs, Button } from 'shineout'

// lorem can return a radom string
import lorem from 'doc/utils/faker/lorem'

const panelStyle: React.CSSProperties = { padding: '12px 0' }

const App: React.FC = () => (
  <Tabs defaultActive={1} style={{ height: 200 }} tabBarExtraContent={<Button type="link">extra</Button>}>
    <Tabs.Panel style={panelStyle} tab="Home">
      {lorem(5)}
    </Tabs.Panel>

    <Tabs.Panel style={panelStyle} tab="Profile">
      {lorem(6)}
    </Tabs.Panel>

    <Tabs.Panel style={panelStyle} tab="Contact">
      {lorem(4)}
    </Tabs.Panel>
  </Tabs>
)

export default App
