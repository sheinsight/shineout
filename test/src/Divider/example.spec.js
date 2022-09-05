import React from 'react'
import { mount } from 'enzyme'
import { Divider } from 'shineout'
import { baseTest } from '../../utils'

/* global SO_PREFIX */

describe('Divider[base]', () => {
  test('should custom style and className', () => {
    baseTest(Divider, `.${SO_PREFIX}-divider`)
  })
})

describe('Divider[mode]', () => {
  test('should set mode vertical', () => {
    const wrapper = mount(<Divider mode="vertical" />)
    expect(wrapper.find(`.${SO_PREFIX}-divider`).hasClass(`${SO_PREFIX}-divider-vertical`)).toBe(true)
  })

  test('should set mode horizontal', () => {
    const wrapper = mount(<Divider mode="horizontal" />)
    expect(wrapper.find(`.${SO_PREFIX}-divider`).hasClass(`${SO_PREFIX}-divider-horizontal`)).toBe(true)
  })
})

describe('Divider[orientation]', () => {
  test('should set orientation left', () => {
    const wrapper = mount(<Divider orientation="left">Hello</Divider>)
    expect(wrapper.find(`.${SO_PREFIX}-divider`).hasClass(`${SO_PREFIX}-divider-with-text-left`)).toBe(true)
  })

  test('should set orientation right', () => {
    const wrapper = mount(<Divider orientation="right">Hello</Divider>)
    expect(wrapper.find(`.${SO_PREFIX}-divider`).hasClass(`${SO_PREFIX}-divider-with-text-right`)).toBe(true)
  })
})
