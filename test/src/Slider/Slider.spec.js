import React from 'react'
import { mount } from 'enzyme'
import { Slider } from 'shineout'
import SliderRange from '../../../site/pages/components/Slider/example-02-range'

/* global SO_PREFIX */
describe('Slider[Base]', () => {
  let wrapper
  // let changeFn = jest.fn()
  beforeAll(() => {
    wrapper = mount(<Slider defaultValue={50} />)
  })
  test('should render correct dom structure', () => {
    expect(wrapper.find(`.${SO_PREFIX}-slider .${SO_PREFIX}-slider-background`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-slider .${SO_PREFIX}-slider-inner .${SO_PREFIX}-slider-bar`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-slider .${SO_PREFIX}-slider-scale`).length).toBe(1)
  })
  test('should render correct length', () => {
    const style = wrapper.find(`.${SO_PREFIX}-slider-bar`).prop('style')
    expect(style.width).toBe('50%')
  })
  test('should render correct result', () => {
    const result = wrapper.find(`.${SO_PREFIX}-slider-result`).text()
    expect(result).toBe('50')
  })
})

describe('Slider[Base-action]', () => {
  test('should change value while drag', () => {
    const changeFn = jest.fn()
    const wrapper = mount(<Slider defaultValue={50} onChange={changeFn} />)
    wrapper.find('Indicator').prop('onDrag')(0.1, 0)
    wrapper.find('Indicator').prop('onDragEnd')()
    expect(changeFn.mock.calls[0][0]).toBe(100)
    const result = wrapper.find(`.${SO_PREFIX}-slider-result`).text()
    expect(result).toBe('100')
  })
})

describe('Slider[Range]', () => {
  test('should render double indicate', () => {

  })
})
