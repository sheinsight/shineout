import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import * as vFilter from './v_filter'
import { appendToDOM, delay } from '../../utils'

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

  test('should not render option when  set hideCreateOption', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const finalValue = 'test'
    const div = document.createElement('div')
    document.body.appendChild(div)
    const wrapper = mount(<Select multiple data={data} keygen onCreate hideCreateOption />, { attachTo: div })
    wrapper.find(`.so-select-inner`).simulate('click')
    // should render input
    const inputSpan = wrapper.find(`span.so-select-input`)
    inputSpan.simulate('input', {
      target: {
        innerText: finalValue,
      },
    })
    jest.runAllTimers()
    wrapper.update()
    jest.useRealTimers()
    delay(200)
    expect(wrapper.find('.so-select-option').length).toBe(data.length)
  })
})
