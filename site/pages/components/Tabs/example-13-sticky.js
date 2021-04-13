/**
 * cn - 头部附着
 *    -- sticky 属性会开启头部附着功能；sticky=true时，开启附着在顶部；sticky=number时，代表附着顶部，且距离顶部的间距；sticky=StickyProps时，参数将传入 Sticky 组件内；switchToTop 属性支持是否自动滚动到Tabs。
 * en - Sticky header
 *    -- sticky header in Tabs
 */
import React from 'react'
import { Tabs } from 'shineout'

// lorem can return a radom string
import lorem from 'doc/utils/faker/lorem'

const panelStyle = { padding: '12px 0' }

export default function() {
  return (
    <Tabs defaultActive={1} sticky tabBarStyle={{ backgroundColor: '#fff' }} switchToTop>
      <Tabs.Panel style={panelStyle} tab="Sticky Home">
        {lorem(5)}
      </Tabs.Panel>
      <Tabs.Panel style={panelStyle} tab="Sticky Profile">
        {lorem(6)}
      </Tabs.Panel>
      <Tabs.Panel style={panelStyle} tab="Sticky Contact">
        {lorem(4)}
      </Tabs.Panel>
    </Tabs>
  )
}
