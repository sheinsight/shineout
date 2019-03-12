import React from 'react'
import { mount } from 'enzyme'
import { Slider } from 'shineout'
import SliderRange from '../../../site/pages/components/Slider/example-02-range'
import SliderScale from '../../../site/pages/components/Slider/example-03-scale'
import SliderFormat from '../../../site/pages/components/Slider/example-04-format'
import SliderHide from '../../../site/pages/components/Slider/example-08-hide'
import SliderDisabled from '../../../site/pages/components/Slider/example-09-disabled'
import SliderVertical from '../../../site/pages/components/Slider/example-10-vertical'

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
    const wrapper = mount(<SliderRange />)
    expect(wrapper.find(`.${SO_PREFIX}-slider-indicator`).length).toBe(2)
    const defaultValue = wrapper.find('ShineoutSlider').prop('defaultValue')
    defaultValue.forEach((value, index) => {
      expect(
        wrapper
          .find(`.${SO_PREFIX}-slider-result`)
          .at(index)
          .text()
      ).toBe(String(value))
    })
  })
})

describe('Slider[Scale]', () => {
  test('should render scale', () => {
    const wrapper = mount(<SliderScale />)
    const scales = wrapper.find('ShineoutSlider').prop('scale')
    wrapper
      .find(`.${SO_PREFIX}-slider-scale`)
      .children()
      .forEach((item, index) => {
        expect(item.find('span').text()).toBe(String(scales[index]))
      })
  })
})

describe('Slider[Format]', () => {
  test('should render format scale', () => {
    const wrapper = mount(<SliderFormat />)
    const format = wrapper.find('ShineoutSlider').prop('formatScale')
    const scales = wrapper.find('ShineoutSlider').prop('scale')
    wrapper
      .find(`.${SO_PREFIX}-slider-scale`)
      .children()
      .forEach((item, index) => {
        expect(item.find('span').text()).toBe(format(scales[index]))
      })
  })
})

describe('Slider[Step]', () => {
  test('should move step while drag', () => {
    const wrapper = mount(<Slider range defaultValue={[0.05, 0.25]} scale={[0, 1]} step={0.05} />)
    wrapper
      .find('Slider')
      .at(1)
      .instance().parentElement = {
      clientWidth: 820,
    }
    const drag = wrapper
      .find('Indicator')
      .at(1)
      .prop('onDrag')
    drag(1, 0)
    wrapper
      .find('Indicator')
      .at(1)
      .prop('onDragEnd')()
    const value = wrapper
      .find('Slider')
      .at(1)
      .prop('value')
    expect(value).toBe(0.25)
  })
})

describe('Slider[Hide]', () => {
  test('should not render scale', () => {
    const wrapper = mount(<SliderHide />)
    expect(wrapper.find(`.${SO_PREFIX}-slider-scale`).length).toBe(0)
  })
})

describe('Slider[Disabled]', () => {
  test('should render disabled class', () => {
    const wrapper = mount(<SliderDisabled />)
    expect(wrapper.find(`.${SO_PREFIX}-slider-disabled`).length).toBe(1)
  })
})

describe('Slider[Vertical]', () => {
  test('should render vertical slider & have top||bottom', () => {
    const wrapper = mount(<SliderVertical />)
    wrapper.find('ShineoutSlider').forEach(slider => {
      expect(slider.find(`.${SO_PREFIX}-slider-inner .${SO_PREFIX}-slider-top`).length).toBe(1)
    })
  })
})
