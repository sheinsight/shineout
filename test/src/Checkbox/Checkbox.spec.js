import { mount } from 'enzyme'
import React from 'react'
import Checkbox from 'shineout/Checkbox'
import CheckboxStatus from '../../../site/pages/components/Checkbox/example-02-checked'
import CheckboxRawGroup from '../../../site/pages/components/Checkbox/example-04-rawgroup'
import CheckboxGroup from '../../../site/pages/components/Checkbox/example-05-group'
import CheckboxFormat from '../../../site/pages/components/Checkbox/example-06-format'

/* global SO_PREFIX */
describe('Checkbox[Base]', () => {
  test('should react while click', () => {
    const wrapper = mount(<Checkbox>Checkbox</Checkbox>)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput`).hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeFalsy()
    // click label
    wrapper.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
      target: {
        checked: true,
      },
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-checkinput`).hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeTruthy()
  })
  test('should call onChange prop', () => {
    const fn = jest.fn()
    const wrapper = mount(<Checkbox onChange={fn} />)
    wrapper.find(`label.${SO_PREFIX}-checkinput input`).simulate('change', {
      target: {
        checked: true,
      },
    })
    expect(fn.mock.calls[0][0]).toBeTruthy()
    expect(fn.mock.calls[0][1]).toBeTruthy()
  })
})

describe('Checkbox[Status]', () => {
  test('should set correct class', () => {
    const wrapper = mount(<CheckboxStatus />)
    const statusMap = {
      false: 'checkinput',
      true: 'checkinput-checked',
      indeterminate: 'checkinput-indeterminate',
    }
    wrapper.find(Checkbox).forEach(checkbox => {
      const className = `.${SO_PREFIX}-${statusMap[checkbox.prop('checked')]}`
      expect(checkbox.find(className).length).toBe(1)
    })
  })
})

describe('Checkbox[htmlValue]', () => {
  test('should return htmlValue', () => {
    const fn = jest.fn()
    const checkedText = 'ok'
    const wrapper = mount(<Checkbox htmlValue={checkedText} onChange={fn}/>)
    wrapper.find('input').simulate('change', {
      target: {
        checked: true,
      },
    })
    expect(fn.mock.calls[0][0]).toBe(checkedText)
  })
})

describe('Checkbox[RawGroup]', () => {
  test('should render checkbox while use raw checkbox', () => {
    const wrapper = mount(<CheckboxRawGroup />)
    expect(wrapper.find(Checkbox).length).toBe(7)
  })
})

describe('Checkbox[Group]', () => {
  test('should render checkbox while have data prop', () => {
    const wrapper = mount(<CheckboxGroup />)
    expect(wrapper.find('CheckItem').length).toBe(wrapper.find(Checkbox.Group).prop('data').length)
  })
})

describe('Checkbox[Format]', () => {
  test('should render format value', () => {
    const data = [
      { id: 1, color: 'red' },
      { id: 2, color: 'orange' },
      { id: 3, color: 'yellow' },
      { id: 4, color: 'green' },
      { id: 5, color: 'cyan' },
      { id: 6, color: 'blue' },
      { id: 7, color: 'violet' },
    ]
    const wrapper = mount(<CheckboxFormat />)
    const format = wrapper.find(Checkbox.Group).prop('format')
    wrapper.find('CheckItem').forEach((item, index) => {
      const innerText = item.find(`.${SO_PREFIX}-checkinput span span`).text()
      expect(innerText).toBe(data[index][format])
    })
  })
})
