import { mount } from 'enzyme'
import React from 'react'
import { Tooltip } from 'shineout'

/* global SO_PREFIX */
describe('Tooltip[position]', () => {
  test('should render correct position', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Tooltip tip="Test" trigger="click">
        <span>test</span>
      </Tooltip>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-tooltip`).length).toBe(0)
    wrapper.find('span').simulate('click')
    jest.runAllTimers()
    expect(document.querySelectorAll(`.${SO_PREFIX}-tooltip`).length).toBe(1)
  })
})
