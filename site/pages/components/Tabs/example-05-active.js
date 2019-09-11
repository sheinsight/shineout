/**
 * cn - 受控
 *    -- 通过 active 和 onChange 可以控制标签状态
 * en - Controlled
 *    -- Set active and onChange property to control active state.
 */
import React, { Component } from 'react'
import { Radio, Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'
import FontAwsome from '../Icon/FontAwesome'

const panelStyle = { padding: 15 }
const contact = (
  <span>
    <FontAwsome name="user" />
    Contact
  </span>
)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabs: ['home', 'profile', 'contact', 'setting', 'message'],
      active: 'profile',
      showMessage: true,
    }
  }

  handleActiveChange = active => this.setState({ active })

  hideMessage = e => {
    e.stopPropagation()
    this.setState({
      tabs: ['home', 'profile', 'contact', 'setting'],
      showMessage: false,
      active: 'home',
    })
  }

  render() {
    const { active } = this.state

    const message = (
      <span>
        Message
        <a style={{ color: '#999', marginLeft: 10 }} onClick={this.hideMessage}>
          <FontAwsome name="close" />
        </a>
      </span>
    )

    return (
      <div>
        <Radio.Group data={this.state.tabs} keygen value={active} onChange={this.handleActiveChange} />

        <br />

        <Tabs active={active} onChange={this.handleActiveChange}>
          <Tabs.Panel id="home" border="transparent" background="#ffe7ba" style={panelStyle} tab="Home">
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel id="profile" border="transparent" background="#ffc069" style={panelStyle} tab="Profile">
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel
            id="contact"
            border="transparent"
            color="#fff"
            background="#d46b08"
            style={panelStyle}
            tab={contact}
          >
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel
            id="setting"
            border="transparent"
            color="#fff"
            background="#873800"
            style={panelStyle}
            tab="Setting"
          >
            {lorem(5)}
          </Tabs.Panel>
          {this.state.showMessage && (
            <Tabs.Panel id="message" border="#b7eb8f" background="#f6ffed" style={panelStyle} tab={message}>
              {lorem(5)}
            </Tabs.Panel>
          )}
        </Tabs>
      </div>
    )
  }
}
