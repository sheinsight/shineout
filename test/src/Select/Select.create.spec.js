import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import * as vFilter from './v_filter'
import { appendToDOM } from '../../utils'

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
