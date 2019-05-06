import React from 'react'
import { mount } from 'enzyme'
import MessageContainer from 'shineout/Message/Container'

/* global SO_PREFIX */
describe('Message', () => {
  test('should show content', () => {
    const testMsg = 'test'
    const wrapper = mount(<MessageContainer onDestory={() => {}} />)
    wrapper.instance().addMessage({
      content: testMsg,
      duration: 3,
    })
    wrapper.update()
    expect(
      wrapper
        .find('ShineoutAlert')
        .find(`.${SO_PREFIX}-alert-content`)
        .text()
    ).toBe(testMsg)
  })
  test('should show different type', () => {
    const msg = 'test'
    ;['info', 'success', 'warn', 'error'].forEach(type => {
      const wrapper = mount(<MessageContainer onDestory={() => {}} />)
      wrapper.instance().addMessage({
        content: msg,
        duration: 3,
        type,
      })
      wrapper.update()
      expect(wrapper.find('ShineoutAlert').find(`div.${SO_PREFIX}-alert-${type}`)).toHaveLength(1)
    })
  })
  test('should render alert correct', () => {
    const msg = 'The Alert Message !!!'
    ;['info', 'success', 'warn', 'error'].forEach(type => {
      const wrapper = mount(<MessageContainer onDestory={() => {}} />)
      wrapper.instance().addMessage({
        content: msg,
        duration: 3,
        type,
      })
      wrapper.update()
      expect(wrapper.debug()).toMatchSnapshot()
    })
  })
})
