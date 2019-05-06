import { mount } from 'enzyme'
import React from 'react'
import { Tag } from 'shineout'

/* global SO_PREFIX */
describe('Tag[onClose]', () => {
  test('should show close btn while onClose', () => {
    const wrapper = mount(<Tag onClose>Hello</Tag>)
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(1)
  })
  test('should not render close default', () => {
    const wrapper = mount(<Tag>Hello</Tag>)
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(0)
  })
  test('should call onClose while func', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<Tag onClose={mockFn}>Hello</Tag>)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    expect(mockFn).toBeCalled()
  })
  test('should render loading when onClose promise', () => {
    jest.useFakeTimers()
    const mockFn = jest.fn()
    const wrapper = mount(
      <Tag
        onClose={() =>
          new Promise(resolve => {
            setTimeout(() => {
              mockFn()
              resolve(true)
            }, 3000)
          })
        }
      >
        Hello
      </Tag>
    )
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-icon`)).toHaveLength(1)
    wrapper.find(`div.${SO_PREFIX}-tag-close-icon`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-tag-close-loading`)).toHaveLength(1)
    jest.runAllTimers()
    expect(mockFn).toBeCalled()
  })
})

describe('Tag[Disabled]', () => {
  test('should render disabled className', () => {
    const wrapper = mount(<Tag disabled>Disabled</Tag>)
    expect(wrapper.find(`.${SO_PREFIX}-tag-disabled`)).toHaveLength(1)
  })
})

describe('Tag[Input]', () => {
  test('should render input', () => {
    const wrapper = mount(<Tag.Input />)
    expect(wrapper.find('label input')).toHaveLength(1)
  })
})
