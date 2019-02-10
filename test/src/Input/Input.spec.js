import { Input } from 'shineout'
import React from 'react'
import { mount } from 'enzyme'
import InputSize from '../../../site/pages/components/Input/example-2-size'


/* global SO_PREFIX */

describe('Input[Base]', () => {
  let singleInput
  beforeAll(() => {
    singleInput = mount(<Input />)
  })
  test('should render correct dom structure', () => {
    expect(singleInput.html()).toBe(`<label class="${SO_PREFIX}-input"><input type="text" value=""></label>`)
  })
  test('should set placeholder on input dom', () => {
    const prop = singleInput.find('ShineoutInput').prop('placeholder')
    const attr = singleInput.find('input').prop('placeholder')
    expect(prop).toBe(attr)
  })
  test('should set size', () => {
    const wrapper = mount(<InputSize />)
    wrapper.find('ShineoutInput').forEach(input => {
      const size = input.prop('size')
      // ignore the default size
      if (!size) return
      expect(input.find(`label.${SO_PREFIX}-input`).hasClass(`${SO_PREFIX}-input-${size}`)).toBeTruthy()
    })
  })
  test('should only input number', () => {
    const inputValue = 2424.2424
    const valueMap = [2424, 2424.2, 2424.24, 2424.242]
    const inputs = [
      <Input type="number" placeholder="digits undefined" />,
      <Input digits={0} type="number" placeholder="digits 0" />,
      <Input digits={1} type="number" placeholder="digits 1" />,
      <Input digits={2} type="number" placeholder="digits 2" />,
      <Input digits={3} type="number" placeholder="digits 3" />,
    ]
    inputs.forEach(input => {
      input = mount(input)
      const digits = input.prop('digits')
      input.find('input').simulate('change', {
        target: {
          value: inputValue,
        },
      })
      if (digits === undefined) {
        expect(input.find('input').prop('value')).toBe(inputValue)
        return
      }
      input.find('input').simulate('change', {
        target: {
          value: valueMap[digits],
        },
      })
      expect(input.find('input').prop('value')).toBe(valueMap[digits])
    })
  })
})

describe('Input.Number', () => {
  test('should have up/down button', () => {
    const wrapper = mount(<Input.Number width={120} min={23} max={100} digits={0} />)
    const label = wrapper.find(`label.${SO_PREFIX}-input`)
    expect(label.find(`.${SO_PREFIX}-input-number-up`).length).toBe(1)
    expect(label.find(`.${SO_PREFIX}-input-number-down`).length).toBe(1)
  })
  test('should change value while up/down value click', () => {

  })
})
