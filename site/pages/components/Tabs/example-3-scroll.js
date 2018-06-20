/**
 * cn - 滚动
 * en - Scroll
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function () {
  return (
    <Tabs>
      {
        Array.from({ length: 20 }).map((_, i) => (
          <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>{lorem(5)}</Tabs.Panel>
        ))
      }
    </Tabs>
  )
}

