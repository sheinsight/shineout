import { mount } from 'enzyme'
import React from 'react'
import { Tooltip } from 'shineout'

/* global SO_PREFIX */
describe('Tooltip[position]', () => {
  test('should render correct position', () => {
    jest.useFakeTimers()
    ;['left', 'top', 'right', 'bottom'].forEach(pos => {
      const wrapper = mount(
        <Tooltip tip="Test" position={pos}>
          <span>test</span>
        </Tooltip>
      )
      wrapper.find('span').prop('onMouseEnter')()
      jest.runAllTimers()
      expect(document.querySelectorAll(`.${SO_PREFIX}-tooltip-${pos}`).length).toBe(1)
    })
  })
})
