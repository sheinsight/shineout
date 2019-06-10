/**
 * cn - 自定义颜色
 *    -- 自定义每个标签的字体颜色、边框颜色和背景色
 * en - Color
 *    -- Set the font color, border color, and background color for each label.
 */
import React from 'react'
import { Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'
import FontAwsome from '../Icon/FontAwesome'

const panelStyle = { padding: 15 }
const contact = (
  <span>
    <FontAwsome name="user" />
    Contact
  </span>
)

export default function() {
  return (
    <Tabs>
      <Tabs.Panel border="transparent" background="#ffe7ba" style={panelStyle} tab="Home">
        {lorem(5)}
      </Tabs.Panel>
      <Tabs.Panel border="transparent" background="#ffc069" style={panelStyle} tab="Profile">
        {lorem(5)}
      </Tabs.Panel>
      <Tabs.Panel border="transparent" color="#fff" background="#d46b08" style={panelStyle} tab={contact}>
        {lorem(5)}
      </Tabs.Panel>
      <Tabs.Panel border="transparent" color="#fff" background="#873800" style={panelStyle} tab="Setting">
        {lorem(5)}
      </Tabs.Panel>
      <Tabs.Panel border="#b7eb8f" background="#f6ffed" style={panelStyle} tab="Message">
        {lorem(5)}
      </Tabs.Panel>
    </Tabs>
  )
}
