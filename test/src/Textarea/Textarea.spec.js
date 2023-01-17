import React from 'react'
import { mount } from 'enzyme'
import { Textarea } from 'shineout'
import TextareaBase from '../../../site/pages/components/Textarea/example-1-base'
import TextareaAutosize from '../../../site/pages/components/Textarea/example-2-autosize'
import TextareaInfo from '../../../site/pages/components/Textarea/example-4-custom'
import { baseTest } from '../../utils'

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

describe('Textarea[Info:function]', () => {
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

describe('Textarea[info:number]', () => {
  jest.useFakeTimers()
  const wrapper = mount(<Textarea info={20} />)
  it('should render tip', () => {
    wrapper.find('textarea').prop('onChange')({ target: { value: 'test' } })
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('.so-input-tip').text()).toBe('4 / 20')
  })
  it('should render error', () => {
    wrapper.find('textarea').prop('onChange')({ target: { value: '1234456789012345678901' } })
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('.so-input-error').text()).toBe('22 / 20')
  })
})

describe('Textarea[trim]', () => {
  jest.useFakeTimers()
  const changFn = jest.fn()
  const wrapper = mount(<Textarea onChange={changFn} trim />)
  wrapper.find('textarea').prop('onBlur')({ target: { value: '   test    ' } })
  jest.runAllTimers()
  expect(changFn.mock.calls[0][0].length).toBe(4)
})

describe('Textarea[disabled]', () => {
  const wrapper = mount(<Textarea defaultValue="default" disabled />)
  expect(
    wrapper
      .find('textarea')
      .getDOMNode()
      .getAttribute('disabled')
  ).toBe('')
})

describe('Textarea[onBlur onChange on delay]', () => {
  it('should trigger events', () => {
    const changeHandler = jest.fn()
    const blurHandler = jest.fn()
    const wrapper = mount(<Textarea defaultValue="default" delay={0} onChange={changeHandler} onBlur={blurHandler} />)
    wrapper.find('textarea').simulate('change', { target: { value: 'aaa' } })
    wrapper.update()
    expect(changeHandler.mock.calls.length).toBe(1)
    expect(changeHandler.mock.calls[0][0]).toBe('aaa')
    wrapper.find('textarea').simulate('blur', { target: { value: 'aaa' } })
    expect(blurHandler.mock.calls.length).toBe(1)
  })
})

describe('Textarea[onBlur onChange, delay]', () => {
  it('should trigger events', () => {
    const changeHandler = jest.fn()
    const blurHandler = jest.fn()
    const wrapper = mount(<Textarea defaultValue="default" delay={0} onChange={changeHandler} onBlur={blurHandler} />)
    wrapper.find('textarea').simulate('change', { target: { value: 'aaa' } })
    wrapper.update()
    expect(changeHandler.mock.calls.length).toBe(1)
    expect(changeHandler.mock.calls[0][0]).toBe('aaa')
    wrapper.find('textarea').simulate('blur', { target: { value: 'aaa' } })
    expect(blurHandler.mock.calls.length).toBe(1)
  })
})

describe('Textarea[onEnterPress]', () => {
  it('should trigger events', () => {
    const onEnterPress = jest.fn()
    const wrapper = mount(
      <Textarea defaultValue="default" delay={0} onEnterPress={onEnterPress} onBlur={onEnterPress} />
    )
    wrapper.find('textarea').simulate('keyup', { target: { value: 'aaa' }, keyCode: 13 })
    wrapper.update()
    expect(onEnterPress.mock.calls.length).toBe(1)
    expect(onEnterPress.mock.calls[0][0]).toBe('aaa')
  })
})

describe('Textarea[placeholder, rows, className, style, footer, underline]', () => {
  it('should render placeholder and rows', () => {
    const wrapper = mount(<Textarea placeholder="input something" rows={6} />)
    const textarea = wrapper.find('textarea').getDOMNode()
    expect(textarea.getAttribute('rows')).toBe('6')
    expect(textarea.getAttribute('placeholder')).toBe('input something')
  })
  it('should render className and style', () => {
    baseTest(Textarea, '.so-input')
  })
  it('should renderFooter', () => {
    const wrapper = mount(<Textarea placeholder="input something" renderFooter={() => <span>hello world</span>} />)
    expect(wrapper.find('.so-input-footer').text()).toBe('hello world')
  })
})

describe('Textarea[underline]', () => {
  it('should render underline', () => {
    const wrapper = mount(<Textarea placeholder="input something" underline />)
    expect(wrapper.find('.so-input').hasClass('so-input-underline')).toBeTruthy()
  })
})

describe('Textarea[autosize]', () => {
  it('should render autosize', () => {
    const wrapper = mount(<Textarea autosize value="aaaa" onChange={() => {}} />)
    const fn = jest.fn(wrapper.find('Textarea').instance().resize)
    wrapper.find('Textarea').instance().resize = fn
    wrapper.setProps({ value: 'bbb' })
    wrapper.update()
    expect(fn.mock.calls.length).toBe(1)
  })
})
