/**
 * cn - 基本用法
 *    -- 默认标签样式
 * en - Base
 *    -- Basic usage.
 */
import React from 'react'
import { Tabs, Button } from 'shineout'

// lorem can return a radom string
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
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
}
