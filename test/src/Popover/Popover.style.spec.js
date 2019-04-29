import React from 'react'
import { mount } from 'enzyme'
import { Popover, Button } from 'shineout'
import { dispatchEvent } from '../../../src/utils/dom/element'

describe('Popover[style]', () => {
  test('should render bg/border on popover', () => {
    const colors = ['rgb(1, 1, 1)', 'rgb(23, 34, 200)', 'rgb(0, 0, 0)']
    colors.forEach((color, index) => {
      const wrapper = mount(
        <Button>
          <Popover background={color} border={color} style={{ padding: 20 }}>
            <div data-popover-index={index}>Test</div>
          </Popover>
          Hover
        </Button>
      )
      dispatchEvent(wrapper.find('button').instance(), 'mouseenter')
      const dom = document.querySelector(`div[data-popover-index="${index}"]`)
      expect(dom.parentElement.parentElement.style.background).toBe(color)
      expect(dom.parentElement.parentElement.style.borderColor).toBe(color)
    })
  })
})
