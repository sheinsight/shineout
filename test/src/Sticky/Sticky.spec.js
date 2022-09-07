import React from 'react'
import { mount } from 'enzyme'
import { Sticky } from 'shineout'
import TestBottom from '../../../site/pages/components/Sticky/test-001-bottom'

/* global SO_PREFIX */

describe('Sticky[Base]', () => {
  test('should custom style and className', () => {
    const color = 'red'
    const className = 'hello'
    const wrapper = mount(
      <Sticky className="hello" style={{ color }}>
        Hello
      </Sticky>
    )
    expect(wrapper.find(Sticky).length).toBe(1)
    expect(wrapper.find(Sticky).getDOMNode().style.color).toBe(color)
    expect(wrapper.find(Sticky).getDOMNode().className).toBe(className)
    wrapper.unmount()
    expect(wrapper.find(Sticky).length).toBe(0)
  })
})

// describe('Sticky[bottom]', () => {
//   test('should custom style and className', () => {
//     const wrapper = mount(<TestBottom />)
//     expect(wrapper.find('#target').html()).toBe('20px')
//   })
// })
