import React from 'react'
import { mount } from 'enzyme'
import { Rate } from 'shineout'
import FontAwesome from '../../../site/pages/components/Icon/FontAwesome'
import RateBase from '../../../site/pages/components/Rate/example-01-base'
import RateColor from '../../../site/pages/components/Rate/example-02-color'
import RateSize from '../../../site/pages/components/Rate/example-05-size'
import RateFace from '../../../site/pages/components/Rate/example-08-face'
import RateArray from '../../../site/pages/components/Rate/example-09-array'
import RateClearable from '../../../site/pages/components/Rate/example-10-clearable'

/* global SO_PREFIX */

describe('Rate[Base]', () => {
  test('should render background and front', () => {
    jest.useFakeTimers()
    const wrapper = mount(<RateBase />)
    // bg
    wrapper.find(`.${SO_PREFIX}-rate-background i`).forEach(icon => {
      expect(icon.hasClass(`${SO_PREFIX}-icon`)).toBeTruthy()
      expect(icon.hasClass('fa-star')).toBeTruthy()
    })
    // change rate to max
    const fronts = wrapper.find(`.${SO_PREFIX}-rate-front`).children()
    fronts.at(fronts.length - 2).simulate('click')
    jest.runAllTimers()
    wrapper.update()
    wrapper.find(`.${SO_PREFIX}-rate-front i`).forEach(icon => {
      expect(icon.hasClass(`${SO_PREFIX}-icon`)).toBeTruthy()
      expect(icon.hasClass('fa-star')).toBeTruthy()
    })
  })
  test('should call onChange', () => {
    const changeFn = jest.fn()
    const star = <FontAwesome name="star" />
    const StarRate = Rate(star, star)
    const wrapper = mount(<StarRate defaultValue={0} onChange={changeFn} />)
    // change to max
    const fronts = wrapper.find(`.${SO_PREFIX}-rate-front`).children()
    fronts.at(fronts.length - 2).simulate('click')
    expect(changeFn.mock.calls[0][0]).toBe(5)
  })
})

describe('Rate[Color]', () => {
  test('should render while set style', () => {
    const wrapper = mount(<RateColor />)
    const value = wrapper.find('Rate').prop('value')
    for (let i = 0; i < value; i++) {
      const front = wrapper
        .find(`.${SO_PREFIX}-rate-front`)
        .childAt(i)
        .find('i')
      expect(front.prop('style').color).toBe('#ff4d4f')
    }
  })
})

describe('Rate[Max]', () => {
  test('should set max', () => {
    const max = 10
    const star = <FontAwesome name="star" />
    const StarRate = Rate(star, star)
    const wrapper = mount(<StarRate max={max} defaultValue={max} />)
    expect(wrapper.find(`.${SO_PREFIX}-rate-background`).children().length).toBe(max)
    expect(wrapper.find(`.${SO_PREFIX}-rate-front`).children().length).toBe(max + 1)
  })
})

describe('Rate[Size]', () => {
  test('should set size on item', () => {
    const wrapper = mount(<RateSize />)
    wrapper.find('Rate').forEach(rate => {
      const size = rate.prop('size')
      rate.find('span').forEach(span => {
        // ignore empty value
        if (span.find('i').length === 0) return
        // ignore desc text
        if (span.hasClass(`${SO_PREFIX}-rate-text`)) return
        expect(span.prop('style').fontSize).toBe(size)
      })
    })
  })
})

describe('Rate[Text]', () => {
  test('should render text', () => {
    const star = <FontAwesome name="star" />
    const StarRate = Rate(star, star)
    const text = ['1', '2', '3', '4', '5']
    text.forEach((t, index) => {
      const wrapper = mount(<StarRate text={text} defaultValue={index + 1} />)
      expect(wrapper.find(`.${SO_PREFIX}-rate-text`).text()).toBe(t)
    })
  })
})

describe('Rate[Disabled]', () => {
  let wrapper
  const changeFn = jest.fn()
  beforeAll(() => {
    const star = <FontAwesome name="star" />
    const StarRate = Rate(star, star)
    wrapper = mount(<StarRate value={0.5} disabled />)
  })
  test('should disabled change value', () => {
    // change to max
    const fronts = wrapper.find(`.${SO_PREFIX}-rate-static`).children()
    expect(fronts.length > 0).toBeTruthy()
    fronts.at(fronts.length - 2).simulate('click')
    expect(changeFn.mock.calls.length).toBe(0)
  })
  test('should support float value', () => {
    const item = wrapper
      .find(`.${SO_PREFIX}-rate-static`)
      .childAt(0)
      .find('span span')
    expect(item.prop('style').width).toBe('50%')
  })
})

describe('Rate[Face]', () => {
  test('should render same front default', () => {
    const wrapper = mount(<RateFace />)
    const frontArray = wrapper.find('Rate').prop('front')
    frontArray.forEach((front, index) => {
      const name = front.props.name
      // simulate change value
      wrapper
        .find(`.${SO_PREFIX}-rate-front`)
        .childAt(index)
        .simulate('click')
      expect(wrapper.find('Rate').prop('value')).toBe(index + 1)
      for (let i = 0; i < index + 1; i++) {
        expect(
          wrapper
            .find(`.${SO_PREFIX}-rate-front`)
            .childAt(i)
            .find('i')
            .first()
            .hasClass(`icon-${name}`)
        ).toBeTruthy()
      }
    })
  })
})

describe('Rate[Array]', () => {
  test('should render different front while repeat false', () => {
    const wrapper = mount(<RateArray />)
    const arr = wrapper.find('Rate').prop('background')
    arr.forEach((item, index) => {
      // simulate change value
      wrapper
        .find(`.${SO_PREFIX}-rate-front`)
        .childAt(index)
        .simulate('click')
      for (let i = 0; i < index + 1; i++) {
        expect(
          wrapper
            .find(`.${SO_PREFIX}-rate-front`)
            .childAt(i)
            .find('span > span')
            .text()
        ).toBe(arr[i])
      }
    })
  })
})

describe('Rate[Clearable]', () => {
  test('should be clear value while clearable true', () => {
    const wrapper = mount(<RateClearable />)
    wrapper
      .find(`.${SO_PREFIX}-rate-front`)
      .children()
      .forEach(front => {
        // simulate change
        front
          .find('span')
          .first()
          .simulate('click')
        // click again
        front
          .find('span')
          .first()
          .simulate('click')
        expect(wrapper.find('Rate').prop('value')).toBe(0)
      })
  })
})
