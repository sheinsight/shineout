import React from 'react'
import { Carousel } from 'shineout'
import { mount, shallow } from 'enzyme'
import { baseTest } from '../../utils'
import CarouselBase from '../../../site/pages/components/Carousel/example-1-base.tsx'

/* global SO_PREFIX */
describe('Carousel[Base]', () => {
  const Base = mount(<CarouselBase />)
  const wrapper = Base.find(Carousel)
  test('should render number of items', () => {
    expect(wrapper.find(`.${SO_PREFIX}-carousel-item`).length).toBe(4)
    expect(wrapper.find(`.${SO_PREFIX}-carousel-indicator`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-carousel-arrow`).length).toBe(1)
  })
  test('should render item class', () => {
    wrapper.find('Item').forEach(item => {
      expect(item.find(`.${SO_PREFIX}-carousel-item`).length).toBe(1)
    })
  })
  test('should have indicator', () => {
    expect(wrapper.find(`.${SO_PREFIX}-carousel-indicator`).length).toBe(1)
  })
})

describe('Carousel[props]', () => {
  test('should render correct animation', () => {
    const animates = ['slide', 'slide-y', 'fade']
    animates.forEach(animate => {
      const wrapper = shallow(<Carousel animation={animate} />)
      expect(wrapper.hasClass(`${SO_PREFIX}-carousel-${animate}`))
    })
  })
  test('should render correct indicatorPosition', () => {
    const positions = ['left', 'center', 'right']
    positions.forEach(position => {
      const wrapper = shallow(
        <Carousel indicatorPosition={position}>
          <div />
          <div />
        </Carousel>
      )
      expect(wrapper.find(`.${SO_PREFIX}-carousel-indicator-${position}`).length).toBe(1)
    })
  })
  test('should render correct indicatorType', () => {
    const types = ['circle', 'number', 'line']
    types.forEach(type => {
      const wrapper = shallow(
        <Carousel indicatorType={type}>
          <div />
          <div />
        </Carousel>
      )
      expect(wrapper.find(`.${SO_PREFIX}-carousel-indicator-${type}`).length).toBe(1)
    })
  })
  test('should default render circle & center', () => {
    const defaultType = 'circle'
    const defaultPosition = 'center'
    const wrapper = shallow(
      <Carousel>
        <div />
        <div />
      </Carousel>
    )
    expect(wrapper.find(`.${SO_PREFIX}-carousel-indicator-${defaultType}`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-carousel-indicator-${defaultPosition}`).length).toBe(1)
  })
})

describe('Carousel[Autoplay]', () => {
  test('should auto play while interval > 0', () => {
    const onMove = jest.fn()
    jest.useFakeTimers()
    const wrapper = shallow(
      <Carousel interval={5000} onMove={onMove}>
        <div />
        <div />
      </Carousel>
    )
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('current')
    ).toBeTruthy()
    jest.advanceTimersByTime(5000)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('current')
    ).toBeFalsy()
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('pre')
    ).toBeTruthy()
    expect(
      wrapper
        .find('Item')
        .at(1)
        .prop('current')
    ).toBeTruthy()
    expect(onMove.mock.calls.length).toBe(1)
    wrapper.find(`.${SO_PREFIX}-carousel`).simulate('mouseEnter')
    jest.advanceTimersByTime(5000)
    expect(onMove.mock.calls.length).toBe(1)
    wrapper.find(`.${SO_PREFIX}-carousel`).simulate('mouseLeave')
    jest.advanceTimersByTime(5000)
    expect(onMove.mock.calls.length).toBe(2)
  })
  test('should not auto play while interval not pass or equal 0', () => {
    jest.useFakeTimers()
    const wrapper = shallow(
      <Carousel>
        <div />
        <div />
      </Carousel>
    )
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('current')
    ).toBeTruthy()
    jest.advanceTimersByTime(10000)
    expect(
      wrapper
        .find('Item')
        .at(0)
        .prop('current')
    ).toBeTruthy()
  })
})

describe('Carousel[custom-indicator]', () => {
  test('should call indicatorType', () => {
    jest.useFakeTimers()
    const indicatorFn = jest.fn()
    mount(
      <Carousel indicatorType={indicatorFn} interval={3000}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    )
    jest.advanceTimersByTime(6000)
    expect(indicatorFn.mock.calls[0][0]).toBe(0)
    expect(indicatorFn.mock.calls[1][0]).toBe(1)
    expect(indicatorFn.mock.calls[2][0]).toBe(2)
    jest.advanceTimersByTime(9000)
    expect(indicatorFn.mock.calls[3][0]).toBe(0)
    expect(indicatorFn.mock.calls[4][0]).toBe(1)
    expect(indicatorFn.mock.calls[5][0]).toBe(2)
  })
  test('should react with moveTo', () => {
    const moveToIndex = 2
    const indicatorFn = (current, moveTo) => moveTo(moveToIndex)
    const wrapper = mount(
      <Carousel indicatorType={indicatorFn} interval={3000}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    )
    expect(wrapper.find('ShineoutCarousel').state('current')).toBe(moveToIndex)
  })
})

describe('Carousel[baseTest]', () => {
  test('should have custom class name and style', () => {
    baseTest(Carousel, `.${SO_PREFIX}-carousel`)
  })
})

describe('Carousel[baseTest]', () => {
  test('should onMove', () => {
    const index = 2
    const onMove = jest.fn()
    const wrapper = mount(
      <Carousel interval={0} onMove={onMove}>
        <div />
        <div />
        <div />
        <div />
      </Carousel>
    )
    wrapper
      .find(`a`)
      .at(index)
      .simulate('click')

    expect(onMove).toBeCalledTimes(1)
    expect(onMove.mock.calls[0][0]).toBe(index)
    expect(onMove.mock.calls[0][1].prev).toBe(0)
    expect(onMove.mock.calls[0][1].direction).toBe('forward')
  })
})

describe('Carousel[showArrow]', () => {
  test('never', () => {
    const wrapper = mount(
      <Carousel interval={0} showArrow="">
        <div />
        <div />
        <div />
        <div />
      </Carousel>
    )
    expect(wrapper.find(`.${SO_PREFIX}-carousel-arrow`).length).toBe(0)
    wrapper.unmount()
  })
  test('always', () => {
    const onMove = jest.fn()
    const wrapper = mount(
      <Carousel interval={0} showArrow="always" onMove={onMove}>
        <div />
        <div />
        <div />
        <div />
      </Carousel>
    )
    expect(wrapper.find(`.${SO_PREFIX}-carousel-arrow`).length).toBe(1)
    wrapper.find(`.${SO_PREFIX}-carousel-arrow-left`).simulate('click')
    wrapper.find(`.${SO_PREFIX}-carousel-arrow-right`).simulate('click')
    expect(onMove.mock.calls[0][0]).toBe(3)
    expect(onMove.mock.calls[1][0]).toBe(0)
    wrapper.unmount()
  })
  test('hover', () => {
    const onMove = jest.fn()
    const wrapper = mount(
      <Carousel interval={0} showArrow="hover" onMove={onMove}>
        <div />
        <div />
        <div />
        <div />
      </Carousel>
    )
    expect(wrapper.find(`.${SO_PREFIX}-carousel-arrow`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-carousel-arrow-hover`).length).toBe(1)
    wrapper.unmount()
  })
})
