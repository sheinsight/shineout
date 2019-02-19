import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'shineout'
import SelectBase from '../../../site/pages/components/Select/example-01-base'

/* global SO_PREFIX */

describe('Select[Base]', () => {
  let wrapper
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  const placeholder = 'select_test'
  beforeAll(() => {
    wrapper = mount(<Select keygen data={data} placeholder={placeholder} />)
  })
  test('should render result label', () => {
    expect(wrapper.find(`.${SO_PREFIX}-select .${SO_PREFIX}-select-inner .${SO_PREFIX}-select-result`).length).toBe(1)
  })
  test('should show options while click', () => {
    document.write(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    expect(options.length).toBe(data.length)
    options.forEach((option, index) => {
      expect(option.text()).toBe(data[index])
    })
  })
  test('should render placeholder', () => {
    expect(
      wrapper
        .find(`.${SO_PREFIX}-input-placeholder`)
        .text()
        .trim()
    ).toBe(placeholder)
  })
  test('should highlight default value', () => {
    const wrapper2 = mount(<Select keygen data={data} defaultValue="red" />)
    document.write(wrapper2.html())
    // show options
    wrapper2.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper2.find(`.${SO_PREFIX}-select-option`)
    expect(options.find(`.${SO_PREFIX}-select-active`).text()).toBe('red')
  })
  test('should call onChange', () => {
    const changeFn = jest.fn()
    const wrapper2 = mount(<Select onChange={changeFn} keygen data={data} />)
    document.write(wrapper2.html())
    // show options
    wrapper2.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper2.find(`.${SO_PREFIX}-select-option`)
    console.log(options.debug())
  })
})
