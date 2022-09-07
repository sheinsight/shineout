/**
 * cn -
 *    -- 设置 align="vertical-left" 使标签垂直靠左
 * en -
 *    -- set align to 'vertical-left' to align labels to the vertically left
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '0 12px' }

export default function() {
  return (
    <Tabs defaultActive={1} align="vertical-left" shape="line">
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
