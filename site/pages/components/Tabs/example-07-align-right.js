/**
 * cn - 对齐
 *    -- 设置 align="right" 使标签右对齐
 * en - Align
 *    -- set align to 'right' to align labels to the right
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
    <Tabs defaultActive={1} align="right">
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
