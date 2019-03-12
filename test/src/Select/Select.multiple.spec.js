import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'
import { appendToDOM } from '../../utils'

/* global SO_PREFIX */
describe('Select[Multiple]', () => {
  test('should set array value', () => {
    const cities = fetchCity(10)
    const wrapper = mount(<Select multiple data={cities} keygen="id" format="city" renderItem="city" />)
    appendToDOM(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    // select all of options
    options.forEach(option => {
      option.simulate('click')
    })
    expect(wrapper.find('Select').prop('value')).toEqual(cities.map(v => v.city))
  })
})
