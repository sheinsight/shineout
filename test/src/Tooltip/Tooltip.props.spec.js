import React from 'react'
import { mount } from 'enzyme'
import { Tooltip } from 'shineout'

describe('Tooltip[animation]', () => {
  jest.useFakeTimers()

  it('should show animation', () => {
    const wrapper = mount(
      <Tooltip tip="hello world">
        <span>hello</span>
      </Tooltip>
    )
    wrapper.find('span').prop('onMouseEnter')()
    jest.runAllTimers()
    wrapper.update()
    expect(document.querySelectorAll('.so-tooltip').length).toBe(1)
    expect(document.querySelectorAll('.so-tooltip-animation').length).toBe(1)
  })

  it('should not show animation', () => {
    const wrapper = mount(
      <Tooltip tip="hello world" animation={false}>
        <span>hello</span>
      </Tooltip>
    )
    wrapper.find('span').prop('onMouseEnter')()
    jest.runAllTimers()
    wrapper.update()
    expect(document.querySelectorAll('.so-tooltip').length).toBe(1)
    expect(document.querySelectorAll('.so-tooltip-animation').length).toBe(0)
  })
})

describe('Tooltip[className style]', () => {
  jest.useFakeTimers()
  it('should render className and style', () => {
    const wrapper = mount(
      <Tooltip tip="hello world" className="test-class" style={{ color: 'red' }}>
        <span>hello</span>
      </Tooltip>
    )
    wrapper.find('span').prop('onMouseEnter')()
    jest.runAllTimers()
    wrapper.update()
    expect(document.querySelectorAll('.so-tooltip.test-class').length).toBe(1)
    expect(document.querySelector('.test-class .so-tooltip-inner').style.color).toBe('red')
  })
})

describe('Tooltip[disabledChild]', () => {
  jest.useFakeTimers()
  it('should trigger disabled child', () => {
    const wrapper = mount(
      <Tooltip tip="hello world" disabledChild className="test-class">
        <button disabled type="button">
          hello
        </button>
      </Tooltip>
    )
    wrapper.find('span').prop('onMouseEnter')()
    jest.runAllTimers()
    wrapper.update()
    expect(document.querySelectorAll('.so-tooltip.test-class').length).toBe(1)
    wrapper.find('span').prop('onMouseLeave')()
    jest.runAllTimers()
    wrapper.update()
    expect(document.querySelectorAll('.so-tooltip.test-class').length).toBe(0)
  })
})
