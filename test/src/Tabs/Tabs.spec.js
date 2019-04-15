import React from 'react'
import { Tabs } from 'shineout'
import { mount } from 'enzyme'
import Render from 'react-test-renderer'
import TabsActive from '../../../site/pages/components/Tabs/example-04-active'
import TabsShapeLine from '../../../site/pages/components/Tabs/example-05-shape-line'
import TabsShapeButton from '../../../site/pages/components/Tabs/example-06-shape-button'
import TabsCollapsible from '../../../site/pages/components/Tabs/example-10-collapsible'
import FontAwsome from '../../../site/pages/components/Icon/FontAwesome'
import TabsCollapse from '../Tabs/Tabs.spec'

/* global SO_PREFIX */
describe('Tabs[Base]', () => {
  test('should render correct', () => {
    const wrapper = Render.create(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab="Home">Home</Tabs.Panel>
        <Tabs.Panel tab="Profile">Profile</Tabs.Panel>
        <Tabs.Panel tab="Contact">Contact</Tabs.Panel>
      </Tabs>
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  test('should render defined style', () => {
    const panelStyle = { padding: 15 }
    const contact = (
      <span>
        <FontAwsome name="user" /> Contact
      </span>
    )
    const wrapper = Render.create(
      <Tabs>
        <Tabs.Panel border="transparent" background="#ffe7ba" style={panelStyle} tab="Home">
          Test
        </Tabs.Panel>
        <Tabs.Panel border="transparent" background="#ffc069" style={panelStyle} tab="Profile">
          Test
        </Tabs.Panel>
        <Tabs.Panel border="transparent" color="#fff" background="#d46b08" style={panelStyle} tab={contact}>
          Test
        </Tabs.Panel>
        <Tabs.Panel border="transparent" color="#fff" background="#873800" style={panelStyle} tab="Setting">
          Test
        </Tabs.Panel>
        <Tabs.Panel border="#b7eb8f" background="#f6ffed" style={panelStyle} tab="Message">
          Test
        </Tabs.Panel>
      </Tabs>
    ).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Tabs[Active]', () => {
  test('should active controlled', () => {
    const wrapper = mount(<TabsActive />)
    const tabs = wrapper.state('tabs')
    tabs.forEach((tab, index) => {
      wrapper.setState({
        active: tab,
      })
      expect(
        wrapper
          .find('Tab')
          .at(index)
          .prop('isActive')
      ).toBeTruthy()
    })
  })
})

describe('Tabs[Shape-Line]', () => {
  test('should render line class', () => {
    const lineWrapper = mount(<TabsShapeLine />)
    expect(lineWrapper.find(`.${SO_PREFIX}-tabs-line`)).toHaveLength(1)
    const buttonWrapper = mount(<TabsShapeButton />)
    expect(buttonWrapper.find(`.${SO_PREFIX}-tabs-button`)).toHaveLength(1)
  })
})

describe('Tabs[align]', () => {
  test('should render align class', () => {
    ;['left', 'right', 'vertical-left', 'vertical-right'].forEach(align => {
      const wrapper = mount(
        <Tabs defaultActive={1} align={align}>
          <Tabs.Panel tab="Home">Test</Tabs.Panel>
        </Tabs>
      )
      expect(wrapper.find(`.${SO_PREFIX}-tabs-align-${align}`)).toHaveLength(1)
    })
  })
})

describe('Tabs[collapsible]', () => {
  test('should render expand button', () => {
    const wrapper = mount(<TabsCollapsible />)
    document.body.innerHTML += wrapper.html()
    expect(wrapper.find(`.${SO_PREFIX}-tabs-header span.${SO_PREFIX}-tabs-indicator`)).toHaveLength(1)

    // default expand
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-collapse`).hasClass(`${SO_PREFIX}-hidable-show`)).toBeTruthy()
    wrapper.find(`.${SO_PREFIX}-tabs-header span.${SO_PREFIX}-tabs-indicator`).simulate('click')
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-collapse`).hasClass(`${SO_PREFIX}-hidable-show`)).toBeFalsy()
  })
})
