/**
 * cn -
 *    -- 设置 shape 为 'dash'，标签显示为短线条
 * en -
 *    -- dash tab type
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle: React.CSSProperties = { padding: '12px 0' }

const App: React.FC = () => (
  <Tabs shape="dash" defaultActive={1}>
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
