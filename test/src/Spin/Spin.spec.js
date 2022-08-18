import React from 'react'
import { mount } from 'enzyme'
import { Spin } from 'shineout'
/* global SO_PREFIX */

describe('Spin[color]', () => {
  const color = 'green'

  test('should set color', () => {
    const wrapper = mount(<Spin color={color} />)
    expect(wrapper.find(`.${SO_PREFIX}-spin-default`).getDOMNode().style.color).toBe(color)
  })
})

describe('Spin[name]', () => {
  test('should set color', () => {
    const name = [
      'default',
      'chasing-dots',
      'cube-grid',
      'double-bounce',
      'fading-circle',
      'four-dots',
      'plane',
      'pulse',
      'ring',
      'scale-circle',
      'three-bounce',
      'wave',
      'chasing-ring',
    ]
    name.forEach(i => {
      const wrapper = mount(<Spin name={i} />)
      if (i === 'fading-circle') {
        expect(wrapper.find(`.${SO_PREFIX}-scale-circle`).length).toBe(1)
      } else {
        expect(wrapper.find(`.${SO_PREFIX}-${i}`).length || wrapper.find(`.${SO_PREFIX}-spin-${i}`).length).toBe(1)
      }
    })
  })
})

describe('Spin[size]', () => {
  test('should set size when typeof size is Number', () => {
    const size = 50
    const name = [
      'default',
      'chasing-dots',
      'cube-grid',
      'double-bounce',
      'fading-circle',
      'four-dots',
      'plane',
      'pulse',
      'ring',
      'scale-circle',
      'three-bounce',
      'wave',
      'chasing-ring',
    ]
    const doubleWidthName = ['three-bounce']

    name.forEach(i => {
      const wrapper = mount(<Spin name={i} size={size} />)
      if (i === 'fading-circle') {
        expect(wrapper.find(`.${SO_PREFIX}-scale-circle`).getDOMNode().style.width).toBe(`${size}px`)
        expect(wrapper.find(`.${SO_PREFIX}-scale-circle`).getDOMNode().style.height).toBe(`${size}px`)
      } else {
        const node =
          wrapper.find(`.${SO_PREFIX}-${i}`).length === 1
            ? wrapper.find(`.${SO_PREFIX}-${i}`)
            : wrapper.find(`.${SO_PREFIX}-spin-${i}`)

        expect(node.getDOMNode().style.width).toBe(`${doubleWidthName.includes(i) ? size * 2 : size}px`)
        expect(node.getDOMNode().style.height).toBe(`${doubleWidthName.includes(i) ? 'auto' : `${size}px`}`)
      }
    })
  })

  test('should set size when typeof size is String', () => {
    const size = '50px'
    const name = [
      'default',
      'chasing-dots',
      'cube-grid',
      'double-bounce',
      'fading-circle',
      'four-dots',
      'plane',
      'pulse',
      'ring',
      'scale-circle',
      'three-bounce',
      'wave',
      'chasing-ring',
    ]
    const doubleWidthName = ['three-bounce']

    name.forEach(i => {
      const wrapper = mount(<Spin name={i} size={size} />)
      if (i === 'fading-circle') {
        expect(wrapper.find(`.${SO_PREFIX}-scale-circle`).getDOMNode().style.width).toBe(size)
        expect(wrapper.find(`.${SO_PREFIX}-scale-circle`).getDOMNode().style.height).toBe(size)
      } else {
        const node =
          wrapper.find(`.${SO_PREFIX}-${i}`).length === 1
            ? wrapper.find(`.${SO_PREFIX}-${i}`)
            : wrapper.find(`.${SO_PREFIX}-spin-${i}`)

        expect(node.getDOMNode().style.width).toBe(
          `${doubleWidthName.includes(i) ? `${Number(size.slice(0, -2)) * 2}px` : size}`
        )
        expect(node.getDOMNode().style.height).toBe(`${doubleWidthName.includes(i) ? 'auto' : `${size}`}`)
      }
    })
  })
})

describe('Spin[tip]', () => {
  test('should set tip', () => {
    const tip = 'Loading...'
    const wrapper = mount(<Spin tip={tip} />)
    expect(wrapper.find(`.${SO_PREFIX}-spin-tip`).text()).toBe(tip)
  })
})

describe('Spin[inexistence]', () => {
  test('name is inexistence', () => {
    console.warn = jest.fn()
    const inexistenceName = 'hello'
    const wrapper = mount(<Spin name={inexistenceName} />)
    expect(console.warn).toBeCalled()
    expect(
      (wrapper.find(`.${SO_PREFIX}-${inexistenceName}`).length || wrapper.find(`.${SO_PREFIX}-spin-${inexistenceName}`))
        .length
    ).toBe(0)
  })
})

describe('Spin[children]', () => {
  test('name is inexistence', () => {
    const wrapper = mount(<Spin loading>Hello</Spin>)
    expect(wrapper.find(`.${SO_PREFIX}-spin-content`).text()).toBe('Hello')
  })
})
