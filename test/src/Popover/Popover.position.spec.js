import React from 'react'
import { mount } from 'enzyme'
import PopoverPosition from '../../../site/pages/components/Popover/example-2-position.tsx'
import { dispatchEvent } from '../../../src/utils/dom/element'

/* global SO_PREFIX */
describe('Popover[Position]', () => {
  test('should render position correctly', () => {
    jest.useFakeTimers()
    const wrapper = mount(<PopoverPosition />)
    wrapper.find('div > div > div').forEach(button => {
      if (button.text().length === 0) return
      // document.body.innerHTML = ''
      const innerText = button.text()
      expect(document.querySelectorAll(`.${SO_PREFIX}-popover-${innerText}`).length).toBe(0)
      dispatchEvent(button.instance(), 'click')
      jest.runAllTimers()
      expect(document.querySelectorAll(`.${SO_PREFIX}-popover-${innerText}`).length).toBe(1)
    })
  })
})
