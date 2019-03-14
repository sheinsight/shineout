import React from 'react'
import { mount } from 'enzyme'
import { Popover } from 'shineout'
import PopoverBase from '../../../site/pages/components/Popover/example-1-base'

/* global SO_PREFIX */
describe('Popover[Base]', () => {
  test('should hover to render default', () => {
    const wrapper = mount(<PopoverBase />)
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    wrapper.find('button').simulate('mouseEnter')
    console.log(document.body.innerHTML)
  })
})
