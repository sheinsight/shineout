import React from 'react'
import { mount } from 'enzyme'
import { Popover, Button } from 'shineout'
import { dispatchEvent } from '../../../src/utils/dom/element'

describe('Popover[event]', () => {
  test('should fire event', () => {
    jest.useFakeTimers()
    const onOpen = jest.fn()
    const onClose = jest.fn()
    const wrapper = mount(
      <Button>
        <Popover onOpen={onOpen} onClose={onClose} trigger="click">
          Some text
        </Popover>
        Click me.
      </Button>
    )
    dispatchEvent(wrapper.find('button').instance(), 'click')
    jest.runAllTimers()
    expect(onOpen).toBeCalled()
    dispatchEvent(document, 'mousedown')
    jest.runAllTimers()
    expect(onClose).toBeCalled()
  })
})
