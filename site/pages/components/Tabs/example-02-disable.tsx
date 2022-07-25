/**
 * cn - 禁用
 *    -- 禁用某一个标签
 * en -  disabled
 *    -- disable a tab.
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle: React.CSSProperties = { padding: '12px 0' }

const App: React.FC = () => (
  <Tabs defaultActive={1}>
    <Tabs.Panel style={panelStyle} tab="Home">
      {lorem(5)}
    </Tabs.Panel>

    <Tabs.Panel style={panelStyle} tab="Profile">
      {lorem(6)}
    </Tabs.Panel>

    <Tabs.Panel style={panelStyle} tab="Contact" disabled>
      {lorem(4)}
    </Tabs.Panel>
  </Tabs>
)

export default App
