import React from 'react'
import { Button, Popover } from 'shineout'
import { mount } from 'enzyme'
import { dispatchEvent } from '../../../src/utils/dom/element'

/* global SO_PREFIX */
describe('Popover[close]', () => {
  test('should render close function', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Button>
        <Popover trigger="click">{close => <button onClick={close}>close</button>}</Popover>
      </Button>
    )
    dispatchEvent(wrapper.find('button').instance(), 'click')
    jest.runAllTimers()
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover button`).length).toBe(1)
    document.querySelector(`.${SO_PREFIX}-popover button`).click()
    jest.runAllTimers()
    expect(document.querySelector(`.${SO_PREFIX}-popover`).style.display).toBe('none')
  })
})
