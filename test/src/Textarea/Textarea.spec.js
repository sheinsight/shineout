import React from 'react'
import { mount } from 'enzyme'
import { Textarea, Input } from 'shineout'
import TextareaBase from '../../../site/pages/components/Textarea/example-1-base'
import TextareaAutosize from '../../../site/pages/components/Textarea/example-2-autosize'
import TextareaInfo from '../../../site/pages/components/Textarea/example-3-info'

/* global SO_PREFIX */
describe('Textarea[Base]', () => {
  test('should render textarea element', () => {
    const wrapper = mount(<TextareaBase />)
    expect(wrapper.find('textarea').length).toBe(1)
  })
  test('should render default value', () => {
    const value = 'test'
    const wrapper = mount(<Textarea rows={6} defaultValue={value} />)
    expect(wrapper.find('textarea').text()).toBe(value)
  })
  test('should call onChange', () => {
    jest.useFakeTimers()
    const changeFn = jest.fn()
    const wrapper = mount(<Textarea onChange={changeFn} />)
    wrapper.find('textarea').prop('onChange')({ target: { value: 'test' } })
    jest.runAllTimers()
    expect(changeFn.mock.calls[0][0]).toBe('test')
  })
})

describe('Textarea[Autosize]', () => {
  test('should render double textarea to autosize', () => {
    const wrapper = mount(<TextareaAutosize />)
    wrapper.find('ShineoutTextarea').forEach(textarea => {
      expect(textarea.find('textarea').length).toBe(2)
    })
  })
})

describe('Textarea[Info]', () => {
  let wrapper
  beforeAll(() => {
    jest.useFakeTimers()
    wrapper = mount(<TextareaInfo />)
    // insert conent
    wrapper.find('textarea').prop('onChange')({ target: { value: 'test' } })
    jest.runAllTimers()
    wrapper.update()
  })
  test('should render tip', () => {
    expect(wrapper.find(`.${SO_PREFIX}-input-tip`).length).toBe(1)
  })
  test('should render tip we want', () => {
    const info = wrapper.find('ShineoutTextarea').prop('info')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-input-tip`)
        .text()
        .trim()
    ).toBe(info('test'))
  })
})

describe('Textarea[trim]', () => {
  jest.useFakeTimers()
  const changFn = jest.fn()
  const wrapper = mount(<Textarea onChange={changFn} trim />)
  wrapper.find('textarea').prop('onBlur')({ target: { value: '   test    ' } })
  jest.runAllTimers()
  expect(changFn.mock.calls[0][0].length).toBe(11)
  expect(changFn.mock.calls[1][0].length).toBe(4)
})
