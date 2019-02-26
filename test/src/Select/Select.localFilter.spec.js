import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { appendToDOM } from '../../utils'
import * as vFilter from './v_filter'

describe('Select[Filter]', () => {
  test('should filter options', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select data={data} keygen onFilter={text => d => d.indexOf(text) >= 0} />)
    appendToDOM(wrapper.html())
    vFilter.v({ wrapper, data })
  })
  test('should filter options on multiple select', () => {
    jest.useFakeTimers()
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Select multiple data={data} keygen onFilter={text => d => d.indexOf(text) >= 0} />)
    appendToDOM(wrapper.html())
    vFilter.v({ wrapper, data })
  })
})
