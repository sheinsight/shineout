import { mount } from 'enzyme/build'
import { Select } from 'shineout'
import React from 'react'
import { appendToDOM } from '../../utils'

/* global SO_PREFIX */
describe('Select[Disabled]', () => {
  test('should set disabled class', () => {
    const wrapper = mount(<Select data={['re']} keygen disabled />)
    expect(wrapper.find(`.${SO_PREFIX}-input-disabled`).length).toBe(1)
  })
  test('should disabled option', () => {
    const data = ['red', 'yello', 'blue']
    const disabled = v => v === 'red'
    const wrapper = mount(<Select data={data} keygen disabled={disabled} />)
    appendToDOM(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    options.forEach(option => {
      expect(option.find('a').hasClass(`${SO_PREFIX}-select-disabled`)).toBe(
        disabled(
          option
            .find('a')
            .text()
            .trim()
        )
      )
    })
  })
})
