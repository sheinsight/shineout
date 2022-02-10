import { mount } from 'enzyme/build'
import React from 'react'
import { Select } from 'shineout'
import { appendToDOM } from '../../utils'

const data = ['red', 'blue', 'yellow']

/* global SO_PREFIX */
describe('Select[innerTitle]', () => {
  it('show content when not empty', () => {
    const wrapper = mount(<Select innerTitle="select color" keygen data={data} />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.setProps({ value: 'red' })
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
  it('show content when onFilter and focus', () => {
    const wrapper = mount(
      <Select innerTitle="select color" onFilter={d => text => d.indexOf(text) > -1} keygen data={data} />
    )
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    appendToDOM(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('focus', {
      target: wrapper.find(`.${SO_PREFIX}-select-inner`).getDOMNode(),
    })
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click', {
      target: wrapper.find(`.${SO_PREFIX}-select-inner`).getDOMNode(),
    })
    console.log(wrapper.html())
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
})
