import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'

/* global SO_PREFIX */
describe('Select[Clearable]', () => {
  const data = ['red', 'blue', 'yellow']
  test('should have clear button & clear value', () => {
    const wrapper = mount(<Select defaultValue="red" data={data} keygen clearable />)
    expect(wrapper.find(`.${SO_PREFIX}-select-close`).length).toBe(1)
    // clear value
    wrapper.find(`.${SO_PREFIX}-select-close`).simulate('click')
    expect(wrapper.find('Select').prop('value')).toBeUndefined()
  })
  test('should have clear button & clear value on multiple select', () => {
    const wrapper = mount(<Select multiple defaultValue={['red', 'blue']} data={data} keygen clearable />)
    const closeBtn = wrapper.find(
      `.${SO_PREFIX}-select-result > .${SO_PREFIX}-select-close-warpper > .${SO_PREFIX}-select-close`
    )
    expect(closeBtn.length).toBe(1)
    // clear value
    closeBtn.simulate('click')
    expect(wrapper.find('Select').prop('value').length).toBe(0)
  })
})
