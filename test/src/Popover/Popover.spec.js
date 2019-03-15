import React from 'react'
import { mount } from 'enzyme'
import { Popover, Button } from 'shineout'
import { dispatchEvent } from '../../../src/utils/dom/element'

/* global SO_PREFIX */
describe('Popover[Base]', () => {
  test('should hover/click to render default', () => {
    const modalText = 'Some Test Text'
    const wrapperHover = mount(
      <Button>
        <Popover>{modalText}</Popover>
        Hover
      </Button>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(wrapperHover.find('button').instance(), 'mouseenter')
    expect(document.querySelector(`.${SO_PREFIX}-popover .${SO_PREFIX}-popover-content`).innerHTML).toBe(modalText)

    document.body.innerHTML = ''
    const wrapperClick = mount(
      <Button>
        <Popover trigger="click">{modalText}</Popover>
        Click
      </Button>
    )
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(wrapperClick.find('button').instance(), 'click')
    expect(document.querySelector(`.${SO_PREFIX}-popover .${SO_PREFIX}-popover-content`).innerHTML).toBe(modalText)

    // render correctly
    expect(document.querySelector(`.${SO_PREFIX}-popover`).innerHTML).toMatchSnapshot()
  })
})
