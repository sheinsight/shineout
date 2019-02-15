import React from 'react'
import { mount } from 'enzyme'
import RadioBase from '../../../site/pages/components/Radio/example-1-base'

/* global SO_PREFIX */
describe('Radio[Base]', () => {
  test('should render radios while through data', () => {
    const wrapper = mount(<RadioBase />)
    const data = wrapper.find('RadioGroup').prop('data')
    const defaultValue = wrapper.find('RadioGroup').prop('defaultValue')
    wrapper.find(`.${SO_PREFIX}-checkinput`).forEach((input, index) => {
      const text = input.find('span span').text()
      expect(input.find('input[type="radio"]').length).toBe(1)
      expect(text).toBe(data[index])
      if (text === defaultValue) {
        expect(input.hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeTruthy()
      }
    })
  })
})
