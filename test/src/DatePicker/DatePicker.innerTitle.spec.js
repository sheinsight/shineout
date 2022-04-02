import React from 'react'
import { DatePicker } from 'shineout'
import { mount } from 'enzyme'
import { appendToDOM } from '../../utils'

/* global SO_PREFIX */
describe('DatePicker[innerTitle]', () => {
  it('show content when not empty', () => {
    const wrapper = mount(<DatePicker type="date" innerTitle="Select date" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.setProps({ value: '2021-10-01' })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })

  it('show content when not focus', () => {
    const wrapper = mount(<DatePicker type="date" innerTitle="Select date" inputable />)
    appendToDOM(wrapper.html())
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('focus', {
      target: wrapper.find(`.${SO_PREFIX}-datepicker-inner`).getDOMNode(),
    })
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click', {
      target: wrapper.find(`.${SO_PREFIX}-datepicker-inner`).getDOMNode(),
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
})
