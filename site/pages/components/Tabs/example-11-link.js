/**
 * cn - 链接
 *    -- 使用链接作为标签
 * en - Link
 *    -- Use link as every tab.
 */
import React from 'react'
import { Tabs } from 'shineout'

export default function() {
  return (
    <Tabs defaultActive={1} shape="line">
      <Tabs.Link href="/page1">第一页</Tabs.Link>

      <Tabs.Link>
        <a href="/page2">第二页</a>
      </Tabs.Link>
    </Tabs>
  )
}
