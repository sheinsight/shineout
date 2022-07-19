import React from 'react'
import { Tabs } from 'shineout'
import { mount } from 'enzyme'
import TabsActive from '../../../site/pages/components/Tabs/example-05-active'
import TabsShapeLine from '../../../site/pages/components/Tabs/example-06-shape-line'
import TabsShapeButton from '../../../site/pages/components/Tabs/example-07-shape-button'
import TabsCollapsible from '../../../site/pages/components/Tabs/example-11-collapsible'

/* global SO_PREFIX */
describe('Tabs[Active]', () => {
  test('should active controlled', () => {
    const wrapper = mount(<TabsActive />)
    wrapper.find(`.${SO_PREFIX}-checkinput`).forEach(radio => {
      const text = radio
        .find(`.${SO_PREFIX}-checkinput-desc`)
        .first()
        .text()

      // simulate change
      radio
        .find(`input[type="radio"]`)
        .first()
        .simulate('change', () => ({
          target: {
            checked: true,
          },
        }))

      wrapper.update()

      const tabText = wrapper
        .find(`.${SO_PREFIX}-tabs-active`)
        .first()
        .text()

      expect(text[0].toUpperCase() + text.substring(1) === tabText).toBe(true)
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

describe('Tabs[extra]', () => {
  test('should render a extra button', () => {
    const wrapper = mount(
      <Tabs defaultActive={1}>
        <Tabs.Panel tab="Home">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tabs-extra`)).toHaveLength(0)

    const wrapper1 = mount(
      <Tabs defaultActive={1} tabBarExtraContent="niconiconi">
        <Tabs.Panel tab="Home">Test</Tabs.Panel>
      </Tabs>
    )
    expect(wrapper1.find(`.${SO_PREFIX}-tabs-extra`)).toHaveLength(1)
  })
})
