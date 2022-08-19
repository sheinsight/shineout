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
  it('should emptyAfterSelect 选择后清空输入内容', () => {
    jest.useFakeTimers()
    const fn = jest.fn(text => d => d.indexOf(text) >= 0)
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const div = document.createElement('div')
    document.body.appendChild(div)
    const wrapper = mount(<Select emptyAfterSelect multiple data={data} keygen onFilter={fn} />, {
      attachTo: div,
    })
    wrapper.find('.so-select-inner').simulate('click')
    expect(wrapper.find('.so-select-inner').hasClass('so-select-focus')).toBeTruthy()
    wrapper.find('.so-select-input').simulate('input', { target: { innerText: 'red' } })
    jest.runAllTimers()
    wrapper.update()
    expect(fn.mock.calls[0][0]).toBe('red')
    wrapper
      .find('.so-select-option')
      .at(0)
      .simulate('click')
    wrapper.update()
    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[1][0]).toBe('')
  })
})
