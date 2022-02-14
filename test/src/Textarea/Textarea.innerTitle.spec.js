import React from 'react'
import { mount } from 'enzyme'
import { Textarea } from 'shineout'

/* global SO_PREFIX */
describe('Textarea[innerTitle]', () => {
  it('show content when focus', () => {
    const wrapper = mount(<Textarea innerTitle="input something" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.find('textarea').simulate('focus')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
  it('show content when not empty', () => {
    const wrapper = mount(<Textarea innerTitle="input something" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.setProps({ value: 'value' })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
})
