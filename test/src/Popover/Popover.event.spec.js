import React from 'react'
import { mount } from 'enzyme'
import { Popover, Button } from 'shineout'
import { dispatchEvent } from '../../../src/utils/dom/element'

describe('Popover[event]', () => {
  jest.useFakeTimers()
  const onOpen = jest.fn()
  const onClose = jest.fn()
  test('should fire event', () => {
    const wrapper = mount(
      <Button>
        <Popover onOpen={onOpen} onClose={onClose} trigger="click">
          Some text
        </Popover>
        Click me.
      </Button>
    )
    dispatchEvent(wrapper.find('button').instance(), 'click')
    expect(onOpen).toBeCalled()
    dispatchEvent(document, 'click')
    jest.runAllTimers()
    expect(onClose).toBeCalled()
  })
})
