/**
 * cn - 自动填充
 *    -- 通过 autoFill 属性来使 Tabs.Panel 自动填充父元素空间
 * en - AutoFill
 *    -- Panel to automatically fill the parent element space via the autoFill property
 */
import React from 'react'
import { Tabs } from 'shineout'

// lorem can return a radom string
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
    <div style={{ height: 200 }}>
      <Tabs defaultActive={0} autoFill>
        <Tabs.Panel style={panelStyle} tab="Home">
          <p>{lorem(5)}</p>
          <p>{lorem(5)}</p>
          <p>{lorem(5)}</p>
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          {lorem(6)}
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          {lorem(4)}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
