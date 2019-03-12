import { mount } from 'enzyme/build'
import React from 'react'
import SelectColumns from '../../../site/pages/components/Select/example-14-columns'
import { appendToDOM } from '../../utils'

/* global SO_PREFIX */
describe('Select[Columns]', () => {
  test('should render columns', () => {
    const wrapper = mount(<SelectColumns />)
    appendToDOM(wrapper.html())
    const singleSelect = wrapper.find('ShineoutSelect').first()
    const multipleSelect = wrapper.find('ShineoutSelect').last()
    singleSelect.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(singleSelect.find(`.${SO_PREFIX}-select-box-options`).length).toBe(1)
    multipleSelect.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(multipleSelect.find(`.${SO_PREFIX}-select-box-options`).length).toBe(1)
  })
})
