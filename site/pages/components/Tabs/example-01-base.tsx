/**
 * cn - 基本用法
 *    -- 默认标签样式
 * en - Base
 *    -- Basic usage.
 */
import React from 'react'
import { Tabs } from 'shineout'

// lorem can return a radom string
import lorem from 'doc/utils/faker/lorem'

const panelStyle: React.CSSProperties = { padding: '12px 0' }

const App: React.FC = () => (
  <Tabs defaultActive={1} color="red" shape="dash">
    <Tabs.Panel style={panelStyle} tab="Home" color="red">
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
