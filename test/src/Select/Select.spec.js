import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'shineout'
import { appendToDOM } from '../../utils'

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
    appendToDOM(wrapper.html())
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
    appendToDOM(wrapper2.html())
    // show options
    wrapper2.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper2.find(`.${SO_PREFIX}-select-option`)
    expect(options.find(`.${SO_PREFIX}-select-active`).text()).toBe('red')
  })
  test('should call onChange', () => {
    const changeFn = jest.fn()
    const wrapper2 = mount(<Select onChange={changeFn} keygen data={data} />)
    appendToDOM(wrapper2.html())
    // show options
    wrapper2.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper2.find(`.${SO_PREFIX}-select-option`)
    options.forEach(option => {
      option.simulate('click')
    })
    data.forEach((color, index) => {
      expect(color).toBe(changeFn.mock.calls[index][0])
    })
  })
})

describe('Select[Size]', () => {
  test('should render correct size', () => {
    const sizes = ['small', 'default', 'large']
    sizes.forEach(size => {
      const wrapper = mount(<Select size={size} data={sizes} keygen />)
      if (size !== 'default') {
        expect(wrapper.find(`.${SO_PREFIX}-select-${size}`).length).toBe(1)
      }
    })
  })
})
