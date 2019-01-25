/**
 * cn - 展开
 *    -- 设置 collapsible 为 true，会出现可展开图标，点击图标或 Tabs 头部空白区域，展开/折起内容。
 * en - Collapsible
 *    -- Set the collapsible property to true, will show the arrow icon. User can click icon or header to expand/collapse the content.
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
    <Tabs shape="line" collapsible>
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
