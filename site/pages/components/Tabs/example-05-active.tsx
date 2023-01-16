/**
 * cn - 受控
 *    -- 通过 active 和 onChange 可以控制标签状态
 * en - Controlled
 *    -- Set active and onChange property to control active state.
 */
import React, { useState } from 'react'
import { Radio, Tabs, TYPE } from 'shineout'
import lorem from 'doc/utils/faker/lorem'
import FontAwsome from '../Icon/FontAwesome'

type TabsProps = TYPE.Tabs.Props<string>
type TabsOnChange = TabsProps['onChange']

const panelStyle: React.CSSProperties = { padding: 15 }

const contact = (
  <span>
    <FontAwsome name="user" />
    Contact
  </span>
)

const App: React.FC = () => {
  const [active, setActive] = useState('profile')
  const [showMessage, setShowMessage] = useState(true)
  const [tabs, setTabs] = useState(['home', 'profile', 'contact', 'setting', 'message'])

  const handleActiveChange: TabsOnChange = v => setActive(v)

  const hideMessage = (e: React.MouseEvent) => {
    setActive('home')
    setShowMessage(false)
    setTabs(['home', 'profile', 'contact', 'setting'])
    e.stopPropagation()
  }

  const message = (
    <span>
      Message
      <a style={{ color: '#999', marginInlineStart: 10 }} onClick={hideMessage}>
        <FontAwsome name="close" />
      </a>
    </span>
  )

  return (
    <div>
      <Radio.Group data={tabs} keygen value={active} onChange={handleActiveChange} />

      <br />

      <Tabs active={active} onChange={handleActiveChange}>
        <Tabs.Panel id="home" border="transparent" background="#ffe7ba" style={panelStyle} tab="Home">
          {lorem(5)}
        </Tabs.Panel>

        <Tabs.Panel id="profile" border="transparent" background="#ffc069" style={panelStyle} tab="Profile">
          {lorem(5)}
        </Tabs.Panel>

        <Tabs.Panel
          id="contact"
          color="#fff"
          tab={contact}
          style={panelStyle}
          border="transparent"
          background="#d46b08"
        >
          {lorem(5)}
        </Tabs.Panel>

        <Tabs.Panel
          id="setting"
          color="#fff"
          tab="Setting"
          style={panelStyle}
          border="transparent"
          background="#873800"
        >
          {lorem(5)}
        </Tabs.Panel>

        {showMessage && (
          <Tabs.Panel id="message" border="#b7eb8f" background="#f6ffed" style={panelStyle} tab={message}>
            {lorem(5)}
          </Tabs.Panel>
        )}
      </Tabs>
    </div>
  )
}

export default App
