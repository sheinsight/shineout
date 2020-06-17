import { Dropdown, Button } from 'shineout'
import { mount, shallow } from 'enzyme'
import React from 'react'
import DropdownPosition from '../../../site/pages/components/Dropdown/example-3-position'
import DropdownMultipleColumns from '../../../site/pages/components/Dropdown/example-4-items'
import DropdownSplit from '../../../site/pages/components/Dropdown/example-5-split'
import DropdownType from '../../../site/pages/components/Dropdown/example-6-type'
import { sleep } from '../../utils'

/* global SO_PREFIX */

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
describe('Dropdown[Base]', () => {
  let dropdownWrapper
  beforeAll(() => {
    dropdownWrapper = mount(<Dropdown data={data} placeholder="Dropdown" />)
  })
  test('should render a correct dom construction', () => {
    const dropdown = dropdownWrapper.find('.so-dropdown').first()
    // wrapper
    expect(dropdown.childAt(0).hasClass(`${SO_PREFIX}-dropdown-menu`)).toBe(true)
    expect(dropdown.childAt(1).hasClass(`${SO_PREFIX}-dropdown-button`)).toBe(true)
    // root btn
    const rootBtnWrapper = dropdown.find(Button)
    expect(
      rootBtnWrapper
        .find('span')
        .first()
        .text()
    ).toBe('Dropdown')
    // first list
    const listWrapper = dropdown.find('Hidable')
    expect(listWrapper.find('ShineoutDropdown').length).toBe(1)
    expect(listWrapper.find('Item').length).toBe(3)
    expect(
      listWrapper
        .find('Item')
        .find('a')
        .first()
        .text()
    ).toBe('Link to Google')
    // dropdown nest
    const nestDropdown = listWrapper.find('ShineoutDropdown')
    expect(
      nestDropdown
        .find('a')
        .find('span')
        .first()
        .text()
    ).toBe('Submenu')
    expect(nestDropdown.find('Item').length).toBe(2)
  })
  test('should add disabled class while disabled true', () => {
    const wrapper = mount(<Dropdown data={data} placeholder="Dropdown" />)
    // find the disabled item
    expect(wrapper.find('a[disabled]').text()).toBe('Disabled')
  })
})

describe('Dropdown[Position]', () => {
  test('should set correct class while has position prop', () => {
    const dropdowns = mount(<DropdownPosition />).find('ShineoutDropdown')
    dropdowns.forEach((dropdown, index) => {
      // ignore auto
      if (index > 7) return
      const position = dropdown.prop('position')
      expect(dropdown.childAt(0).hasClass(`${SO_PREFIX}-dropdown-${position}`)).toBeTruthy()
    })
  })

  test('should auto set position while position is auto', () => {
    const windowHeight = 768
    const windowWidth = 1024
    const rectMap = {
      'top-left': {
        bottom: windowHeight / 2 + 100,
        right: windowWidth / 2 - 100,
      },
      'top-right': {
        bottom: windowHeight / 2 + 100,
        right: windowWidth / 2 + 100,
      },
      'bottom-left': {
        bottom: windowHeight / 2 - 100,
        right: windowWidth / 2 - 100,
      },
      'bottom-right': {
        bottom: windowHeight / 2 - 100,
        right: windowWidth / 2 + 100,
      },
    }
    let currentRect
    Element.prototype.getBoundingClientRect = () => {
      console.log('getBoundingClientRect: ', currentRect)
      return currentRect
    }
    Object.keys(rectMap).forEach(k => {
      currentRect = rectMap[k]
      const wrapper = mount(<Dropdown data={data} position="auto" />)
      document.write(wrapper.html())
      wrapper.find('button').simulate('click')
      expect(
        wrapper
          .find('ShineoutDropdown')
          .first()
          .childAt(0)
          .prop('className')
          .indexOf(k) >= 0
      ).toBeTruthy()
    })
  })
})

describe('Dropdown[Split]', () => {
  test('should split', () => {
    const wrapper = mount(<DropdownSplit />).find('ShineoutDropdown')
    expect(wrapper.find(Button).hasClass(`${SO_PREFIX}-dropdown-split-dropdown`))
  })
})

describe('Dropdown[DropdownType]', () => {
  test('should set dropdown type', () => {
    const wrapper = mount(<DropdownType />)
    const state = wrapper.state()
    const button = wrapper.find(Button).find('button')
    expect(button.hasClass(`${SO_PREFIX}-button-${state.type}`)).toBeTruthy()
    if (state.size !== 'default') {
      expect(button.hasClass(`${SO_PREFIX}-button-${state.size}`)).toBeTruthy()
    }
    expect(button.prop('disabled')).toBe(state.disabled ? true : undefined)
    expect(button.hasClass(`${SO_PREFIX}-button-outline`)).toBe(state.outline)
  })
})
