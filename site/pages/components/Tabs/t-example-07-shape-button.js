/**
 * cn -
 *    -- 设置 shape 为 'button'，标签显示为按钮
 * en -
 *    -- The button type tabs.
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
    <Tabs shape="button" defaultActive={1}>
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
