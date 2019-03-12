import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { appendToDOM } from '../../utils'
import SelectBase from '../../../site/pages/components/Select/example-01-base'

/* global SO_PREFIX */
describe('Select[Single/Multiple dismiss]', () => {
  test('should select to dismiss on single', () => {
    jest.useFakeTimers()
    const wrapper = mount(<SelectBase />)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(1)
    // select first option
    const options = wrapper.find(`div.${SO_PREFIX}-scroll-inner a.${SO_PREFIX}-select-option`)
    if (options.length) {
      options.first().simulate('click')
      jest.runAllTimers()
      wrapper.update()
      expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(0)
    }
  })
  test('should not dismiss while select on multiple', () => {
    const data = ['red', 'blue']
    jest.useFakeTimers()
    const wrapper = mount(<Select data={data} multiple keygen />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(1)
    // select first option
    const options = wrapper.find(`div.${SO_PREFIX}-scroll-inner a.${SO_PREFIX}-select-option`)
    if (options.length) {
      options.first().simulate('click')
      jest.runAllTimers()
      wrapper.update()
      expect(wrapper.find(`div.${SO_PREFIX}-hidable-show`).length).toBe(1)
    }
  })
})
