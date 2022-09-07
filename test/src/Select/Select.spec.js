import React from 'react'
import { mount } from 'enzyme'
import { Select } from 'shineout'
import { appendToDOM, baseTest } from '../../utils'
import SelectHeader from '../../../site/pages/components/Select/test-002-header'

/* global SO_PREFIX */

describe('Select[Base]', () => {
  let wrapper
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  const placeholder = 'select_test'
  const div = document.createElement('div')
  document.body.appendChild(div)
  beforeAll(() => {
    wrapper = mount(<Select keygen data={data} placeholder={placeholder} />, { attachTo: div })
  })
  test('should render result label', () => {
    expect(wrapper.find(`.${SO_PREFIX}-select .${SO_PREFIX}-select-inner .${SO_PREFIX}-select-result`).length).toBe(1)
  })
  test('should render clsssName style', () => {
    const className = 'test-name'
    const style = { color: 'red' }
    baseTest(<Select data={[]} keygen className={className} style={style} />, '.so-select', style, className)
  })
  test('should show options while click', () => {
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-select-inner`).hasClass('so-select-focus')).toBe(true)
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    expect(options.length).toBe(data.length)
    options.forEach((option, index) => {
      expect(option.text()).toBe(data[index])
    })
    // 再次点击后隐藏 list
    const target = wrapper.find(`.${SO_PREFIX}-select-result`).getDOMNode()
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click', { target })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-select-inner`).hasClass('so-select-focus')).toBe(false)

    // 点击Icon 也可以关闭
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click', { target })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-select-inner`).hasClass('so-select-focus')).toBe(true)

    wrapper
      .find(`.${SO_PREFIX}-select-caret`)
      .simulate('click', { target: wrapper.find(`.${SO_PREFIX}-select-caret`).getDOMNode() })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-select-inner`).hasClass('so-select-focus')).toBe(false)
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

describe('Select[Header]', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const wrapper = mount(<SelectHeader />, { attachTo: div })
  wrapper.find('.so-select-inner').simulate('click')
  wrapper.update()
  const header = wrapper.find('.so-select-custom-header')
  expect(header.length).toBe(1)
})

describe('Select[absolute]', () => {
  test('should set absolute when typeof absolute is Function', () => {
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const container = document.createElement('div')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
    const absolute = jest.fn(() => document.getElementById('container'))
    const wrapper = mount(<Select data={data} keygen absolute={absolute} />)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(document.getElementById('container').childNodes.length).toBe(1)
  })
})
