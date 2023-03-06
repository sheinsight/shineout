import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import * as vFilter from './v_filter'
import { appendToDOM, delay } from '../../utils'
import SelectCreateBlur from '../../../site/pages/components/Select/test-004-blurAndSubmit'
/* global SO_PREFIX */
describe('Select[Create]', () => {
  test('should render value while create', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const finalValue = 'test'
    const wrapper = mount(<Select data={data} keygen onCreate />)
    appendToDOM(wrapper.html())
    vFilter.vCreate({ wrapper, finalValue })
  })
  test('should render value while create on multiple', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const finalValue = 'test'
    const wrapper = mount(<Select multiple data={data} keygen onCreate />)
    appendToDOM(wrapper.html())
    vFilter.vCreate({ wrapper, finalValue, multiple: true })
  })
})

describe('Select[Base]', () => {
  // todo https://github.com/enzymejs/enzyme/issues/2073
  test('should submit right value when blur and submit', async () => {
    jest.useRealTimers()
    const wrapper = mount(<SelectCreateBlur />)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    // should render input
    const inputSpan = wrapper.find(`span.${SO_PREFIX}-select-input`)
    inputSpan.simulate('blur', {
      target: {
        innerText: 'nice',
      },
    })
    wrapper.find(`.${SO_PREFIX}-button`).simulate('click')
    wrapper
      .find('Form')
      .instance()
      .handleSubmit()
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.submit-value').text()).toBe('nice')
  })
})
