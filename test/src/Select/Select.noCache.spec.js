import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { appendToDOM } from '../../utils'

/* global SO_PREFIX */
describe('Select noCache', () => {
  test('should result equal value', () => {
    const data1 = [
      {
        id: '1',
        title: '',
      },
      {
        id: '2',
        title: '',
      },
    ]
    const data2 = [
      {
        id: '1',
        title: 'name',
      },
      {
        id: '2',
        title: 'value',
      },
    ]
    const wrapper = mount(
      <Select
        data={data1}
        format="id"
        placeholder="Select color"
        renderItem="title"
        keygen="id"
        noCache
        onFilter={text => c => c.title.indexOf(text) >= 0}
      />
    )
    appendToDOM(wrapper.html())
    // show options
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    const options = wrapper.find(`.${SO_PREFIX}-select-option`)
    // select all of options
    options.forEach((option, i) => {
      if (i === 0) option.simulate('click')
    })
    // change the data
    wrapper.setProps({ data: data2 })
    expect(wrapper.find('Select').prop('result')).toEqual([data2[0]])
  })
})
