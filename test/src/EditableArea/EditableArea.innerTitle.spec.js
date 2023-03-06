import React from 'react'
import { mount } from 'enzyme'
import { EditableArea } from 'shineout'

/* global SO_PREFIX */
describe('EditableArea[innerTitle]', () => {
  it('show content when focus', () => {
    const wrapper = mount(<EditableArea innerTitle="input something" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.find('input').simulate('focus')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
  it('show content when not empty', () => {
    const wrapper = mount(<EditableArea innerTitle="input something" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.setProps({ value: 'value' })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
    wrapper.find('input').simulate('focus')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(2)
  })
})
