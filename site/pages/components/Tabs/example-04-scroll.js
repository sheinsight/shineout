/**
 * cn - 滚动
 *    -- 超出长度时，会自动出现滚动按钮
 * en - Scroll
 *    -- The slide button is displayed when the Tabs length exceeds the parent container
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
    <Tabs inactiveBackground="#f2f2f2">
      {Array.from({ length: 20 }).map((_, i) => (
        <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
          {lorem(5)}
        </Tabs.Panel>
      ))}
    </Tabs>
  )
}
