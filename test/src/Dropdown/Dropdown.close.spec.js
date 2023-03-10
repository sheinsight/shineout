import React from 'react'
import { Dropdown } from 'shineout'
import { mount } from 'enzyme'

const data = [
  {
    content: 'Submenu',
    children: [
      {
        content: 'Link to Google',
        target: '_blank',
        url: 'https://google.com',
      },
      {
        content: 'Disabled',
        disabled: true,
      },
    ],
  },
  {
    content: 'Message',
  },
]

describe('Dropdown[close]', () => {
  test('should close', () => {
    jest.useFakeTimers()
    const wrapper = mount(<Dropdown absolute data={data} placeholder="Dropdown" />)
    wrapper.find('button').simulate('click')
    expect(
      wrapper
        .find('ShineoutDropdown')
        .first()
        .instance().state.show
    ).toBe(true)
    const click = new UIEvent('mousedown')
    click.initUIEvent('mousedown')
    document.dispatchEvent(click)
    jest.runAllTimers()
    expect(
      wrapper
        .find('ShineoutDropdown')
        .first()
        .instance().state.show
    ).toBe(false)
  })
})
