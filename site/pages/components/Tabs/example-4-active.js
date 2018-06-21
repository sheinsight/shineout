/**
 * cn - 受控
 * en - Active
 */
import React, { Component } from 'react'
import { Radio, Tabs } from 'shineout'
import lorem from 'doc/utils/faker/lorem'
import FontAwsome from '../Icon/FontAwesome'

const panelStyle = { padding: 15 }
const contact = <span><FontAwsome name="user" /> Contact</span>


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { active: 'profile' }
  }

  handleActiveChange = active => this.setState({ active })

  render() {
    const { active } = this.state

    return (
      <div>
        <Radio.Group
          data={['home', 'profile', 'contact', 'setting', 'message']}
          value={active}
          onChange={this.handleActiveChange}
        />

        <br />

        <Tabs active={active} onChange={this.handleActiveChange}>
          <Tabs.Panel id="home" border="transparent" background="#ffe7ba" style={panelStyle} tab="Home">
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel id="profile" border="transparent" background="#ffc069" style={panelStyle} tab="Profile">
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel id="contact" border="transparent" color="#fff" background="#d46b08" style={panelStyle} tab={contact}>
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel id="setting" border="transparent" color="#fff" background="#873800" style={panelStyle} tab="Setting">
            {lorem(5)}
          </Tabs.Panel>
          <Tabs.Panel id="message" border="#b7eb8f" background="#f6ffed" style={panelStyle} tab="Message">
            {lorem(5)}
          </Tabs.Panel>
        </Tabs>
      </div>
    )
  }
}

