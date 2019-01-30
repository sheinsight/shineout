import { Dropdown, Button } from 'shineout'
import { mount, shallow } from 'enzyme'
import React from 'react'
import DropdownPosition from '../../../site/pages/components/Dropdown/example-3-position'
import DropdownMultipleColumns from '../../../site/pages/components/Dropdown/example-4-items'
import DropdownSplit from '../../../site/pages/components/Dropdown/example-5-split'
import DropdownType from '../../../site/pages/components/Dropdown/example-6-type'
import { sleep } from '../../utils'

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
let dropdownWrapper
beforeAll(() => {
  dropdownWrapper = shallow(<Dropdown data={data} placeholder="Dropdown" />)
})
describe('Dropdown[Base]', () => {
  test('should render a correct dom construction', () => {
    // wrapper
    expect(dropdownWrapper.childAt(0).hasClass(`${SO_PREFIX}-dropdown-menu`)).toBe(true)
    expect(dropdownWrapper.childAt(1).hasClass(`${SO_PREFIX}-dropdown-button`)).toBe(true)
    // root btn
    const rootBtnWrapper = dropdownWrapper.find(Button)
    expect(rootBtnWrapper.find('span').text()).toBe('Dropdown')
    // first list
    const listWrapper = dropdownWrapper.find('Hidable').shallow()
    expect(listWrapper.find(Dropdown).length).toBe(1)
    expect(listWrapper.find('Item').length).toBe(1)
    expect(
      listWrapper
        .find('Item')
        .shallow()
        .find('a')
        .text()
    ).toBe('Message')
    // dropdown nest
    const nestDropdown = listWrapper.find(Dropdown).shallow()
    expect(
      nestDropdown
        .find('a')
        .find('span')
        .text()
    ).toBe('Submenu')
    expect(nestDropdown.find('Item').length).toBe(2)
  })
  test('should add disabled class while disabled true', () => {
    const wrapper = mount(<Dropdown data={data} placeholder="Dropdown" />)
    // find the disabled item
    expect(wrapper.find('a[disabled]').text()).toBe('Disabled')
  })
  test('should show/hide list when click the dropdown button', () => {
    let container = shallow(<Dropdown data={data} placeholder="Dropdown" />)
    while (container) {
      expect(
        container
          .find('Hidable')
          .shallow()
          .hasClass(`${SO_PREFIX}-hidable-show`)
      ).toBeFalsy()
      const btnWrapper = container.find(Button).length
        ? container.find(Button)
        : container.find(`a.${SO_PREFIX}-dropdown-button`)
      btnWrapper.simulate('click')
      expect(
        container
          .find('Hidable')
          .shallow()
          .hasClass(`${SO_PREFIX}-hidable-show`)
      ).toBeTruthy()
      container = container.find(Dropdown).length ? container.find(Dropdown).shallow() : null
    }
  })
})

describe('Dropdown[Hover]', () => {
  test('should show/hide list when hover/leave', async () => {
    let container = shallow(<Dropdown trigger="hover" data={data} placeholder="Dropdown" />).find(Dropdown).shallow()
    while (container) {
      expect(
        container
          .find('Hidable')
          .shallow()
          .hasClass(`${SO_PREFIX}-hidable-show`)
      ).toBeFalsy()
      container.simulate('mouseEnter')
      expect(
        container
          .find('Hidable')
          .shallow()
          .hasClass(`${SO_PREFIX}-hidable-show`)
      ).toBeTruthy()
      container.simulate('mouseLeave')
      await sleep()
      expect(
        container
          .find('Hidable')
          .shallow()
          .hasClass(`${SO_PREFIX}-hidable-show`)
      ).toBeFalsy()
      container = container.find(Dropdown).length ? container.find(Dropdown).shallow() : null
    }
  })
})

describe('Dropdown[Position]', () => {
  const dropdowns = mount(<DropdownPosition />).find(Dropdown)
  dropdowns.forEach(dropdown => {
    const position = dropdown.prop('position')
    expect(dropdown.childAt(0).hasClass(`${SO_PREFIX}-dropdown-${position}`)).toBeTruthy()
  })
})

describe('Dropdown[MultipleColumns]', () => {
  const wrapper = shallow(<DropdownMultipleColumns />)
  const wrapperWidth = wrapper.prop('width')
  const wrapperColumns = wrapper.prop('columns')
  const expectWidth = (wrapperWidth - 2) / wrapperColumns
  wrapper
    .find(Dropdown)
    .shallow()
    .find('Item')
    .forEach(item => {
      expect(item.shallow().prop('style').width).toBe(expectWidth)
    })
})

describe('Dropdown[Split]', () => {
  const wrapper = shallow(<DropdownSplit />)
    .find(Dropdown)
    .shallow()
  expect(wrapper.find(Button).hasClass(`${SO_PREFIX}-dropdown-split-dropdown`))
})

describe('Dropdown[DropdownType]', () => {
  const wrapper = shallow(<DropdownType />)
  const state = wrapper.state()
  const button = wrapper
    .find(Dropdown)
    .shallow()
    .find(Button)
    .shallow()
  expect(button.hasClass(`${SO_PREFIX}-button-${state.type}`)).toBeTruthy()
  if (state.size !== 'default') {
    expect(button.hasClass(`${SO_PREFIX}-button-${state.size}`)).toBeTruthy()
  }
  expect(button.prop('disabled')).toBe(state.disabled ? true : undefined)
  expect(button.hasClass(`${SO_PREFIX}-button-outline`)).toBe(state.outline)
})
