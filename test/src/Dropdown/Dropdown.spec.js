import { Dropdown, Button } from 'shineout'
import { mount } from 'enzyme'
import React from 'react'
import { appendToDOM, delay } from '../../utils'
import DropdownPosition from '../../../site/pages/components/Dropdown/example-3-position.tsx'
import DropdownSplit from '../../../site/pages/components/Dropdown/example-5-split.tsx'
import DropdownType from '../../../site/pages/components/Dropdown/example-6-type.tsx'
// import { docSize } from '../../../src/utils/dom/document'

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
    appendToDOM(wrapper.html())
    const type = ['success']
    const size = ['large']
    const outline = [false, true]
    const disabled = [false, true]
    // change type size
    type.forEach(t => {
      size.forEach(s => {
        wrapper
          .find(`.${SO_PREFIX}-select-inner`)
          .first()
          .simulate('click')
        wrapper.find(`a.so-select-option`).forEach(a => {
          if (a.props().title === t) {
            a.simulate('click')
          }
        })

        wrapper
          .find(`.${SO_PREFIX}-select-inner`)
          .last()
          .simulate('click')
        wrapper.find(`a.so-select-option`).forEach(a => {
          if (a.props().title === s) {
            a.simulate('click')
          }
        })

        const button = wrapper.find(Button).find('button')
        expect(button.hasClass(`${SO_PREFIX}-button-${t}`)).toBeTruthy()
        expect(button.hasClass(`${SO_PREFIX}-button-${s}`)).toBeTruthy()
      })
    })
    // change type outline
    type.forEach(t => {
      outline.forEach(o => {
        wrapper
          .find(`.${SO_PREFIX}-select-inner`)
          .first()
          .simulate('click')
        wrapper.find(`a.so-select-option`).forEach(a => {
          if (a.props().title === t) {
            a.simulate('click')
          }
        })

        wrapper
          .find('input[type="checkbox"]')
          .first()
          .simulate('change', {
            target: {
              checked: o,
            },
          })

        const button = wrapper.find(Button).find('button')
        expect(button.hasClass(`${SO_PREFIX}-button-${t}`)).toBeTruthy()
        expect(button.hasClass(`${SO_PREFIX}-button-outline`)).toBe(o)
      })
    })
    // change type disabled
    type.forEach(t => {
      disabled.forEach(d => {
        wrapper
          .find(`.${SO_PREFIX}-select-inner`)
          .first()
          .simulate('click')
        wrapper.find(`a.so-select-option`).forEach(a => {
          if (a.props().title === t) {
            a.simulate('click')
          }
        })

        wrapper
          .find('input[type="checkbox"]')
          .last()
          .simulate('change', {
            target: {
              checked: d,
            },
          })

        const button = wrapper.find(Button).find('button')
        expect(button.hasClass(`${SO_PREFIX}-button-${t}`)).toBeTruthy()
        expect(button.hasClass(`${SO_PREFIX}-button-disabled`)).toBe(d)
      })
    })
    // change size outline
    size.forEach(s => {
      outline.forEach(o => {
        wrapper
          .find(`.${SO_PREFIX}-select-inner`)
          .last()
          .simulate('click')
        wrapper.find(`a.so-select-option`).forEach(a => {
          if (a.props().title === s) {
            a.simulate('click')
          }
        })

        wrapper
          .find('input[type="checkbox"]')
          .first()
          .simulate('change', {
            target: {
              checked: o,
            },
          })

        const button = wrapper.find(Button).find('button')
        expect(button.hasClass(`${SO_PREFIX}-button-${s}`)).toBeTruthy()
        expect(button.hasClass(`${SO_PREFIX}-button-outline`)).toBe(o)
      })
    })
    // change size disabled
    size.forEach(s => {
      disabled.forEach(d => {
        wrapper
          .find(`.${SO_PREFIX}-select-inner`)
          .last()
          .simulate('click')
        wrapper.find(`a.so-select-option`).forEach(a => {
          if (a.props().title === s) {
            a.simulate('click')
          }
        })

        wrapper
          .find('input[type="checkbox"]')
          .last()
          .simulate('change', {
            target: {
              checked: d,
            },
          })
        const button = wrapper.find(Button).find('button')
        expect(button.hasClass(`${SO_PREFIX}-button-${s}`)).toBeTruthy()
        expect(button.hasClass(`${SO_PREFIX}-button-disabled`)).toBe(d)
      })
    })
    // change outline disabled
    outline.forEach(o => {
      disabled.forEach(d => {
        wrapper
          .find('input[type="checkbox"]')
          .first()
          .simulate('change', {
            target: {
              checked: o,
            },
          })

        wrapper
          .find('input[type="checkbox"]')
          .last()
          .simulate('change', {
            target: {
              checked: d,
            },
          })

        const button = wrapper.find(Button).find('button')
        expect(button.hasClass(`${SO_PREFIX}-button-outline`)).toBe(o)
        expect(button.hasClass(`${SO_PREFIX}-button-disabled`)).toBe(d)
      })
    })
  })
})

describe('Dropdown[absolute]', () => {
  test('should set absolute', async () => {
    jest.useRealTimers()
    const wrapper = mount(<Dropdown absolute data={data} placeholder="Dropdown" />)
    wrapper.find('button').simulate('click')
    await delay(200)
    expect(wrapper.find(`.${SO_PREFIX}-list-absolute-wrapper`).length).toBe(0)
    expect(document.getElementsByClassName(`${SO_PREFIX}-list-absolute-wrapper`).length).toBe(1)
    wrapper.unmount()
  })
})

describe('Dropdown[animation]', () => {
  test('should set animation', () => {
    const wrapper = mount(<Dropdown animation={false} data={data} placeholder="Dropdown" />)
    expect(wrapper.find(`.${SO_PREFIX}-hidable-fade-animation-0`).length).not.toBe(0)
  })
})

describe('Dropdown[columns]', () => {
  test('should set columns', () => {
    const menu = []
    const width = 500
    const columns = 5
    for (let i = 1; i <= 30; i++) {
      menu.push({
        id: `${i}`,
        content: `item${i}`,
      })
    }
    const wrapper = mount(<Dropdown absolute data={menu} width={width} columns={columns} placeholder="Dropdown" />)
    wrapper.find('button').simulate('click')
    wrapper.find(`.${SO_PREFIX}-dropdown-item`).forEach(item => {
      expect(item.getDOMNode().style.width).toBe(`${(width - 2) / columns}px`)
    })
  })
})

describe('Dropdown[onClick]', () => {
  test('should set onClick', () => {
    const handleClick = jest.fn()
    const wrapper = mount(<Dropdown absolute onClick={handleClick} data={data} placeholder="Dropdown" />)
    wrapper.find('button').simulate('click')
    wrapper
      .find(`.${SO_PREFIX}-dropdown-item`)
      .first()
      .simulate('click')
    expect(handleClick).toBeCalled()
  })
})

describe('Dropdown[renderItem]', () => {
  test('should set renderItem', () => {
    const dropData = [
      {
        id: 0,
        content: 'a',
      },
      {
        id: 1,
        content: 'b',
      },
      {
        id: 2,
        content: 'c',
      },
      {
        id: 3,
        content: 'd',
      },
    ]
    const wrapper = mount(<Dropdown absolute renderItem={d => `id ${d.id}`} data={dropData} placeholder="Dropdown" />)
    wrapper.find(`.${SO_PREFIX}-dropdown-item`).forEach((item, index) => {
      expect(item.text()).toBe(`id ${dropData[index].id}`)
    })
  })
})

describe('Dropdown[trigger]', () => {
  test('should set trigger hover', () => {
    jest.useFakeTimers()
    const wrapper = mount(<Dropdown absolute trigger="hover" data={data} placeholder="Dropdown" />)
    wrapper
      .find(`.${SO_PREFIX}-dropdown`)
      .first()
      .simulate('mouseenter')
    expect(
      wrapper
        .find('ShineoutDropdown')
        .first()
        .instance().state.show
    ).toBe(true)

    wrapper
      .find(`.${SO_PREFIX}-dropdown`)
      .first()
      .simulate('mouseleave')
    jest.runAllTimers()

    expect(
      wrapper
        .find('ShineoutDropdown')
        .first()
        .instance().state.show
    ).toBe(false)
  })
})
