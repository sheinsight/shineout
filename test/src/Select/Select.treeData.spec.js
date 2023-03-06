import { mount } from 'enzyme/build'
import React from 'react'
import TreeCase from '../../../site/pages/components/Select/example-15-treeData'

describe('Select[treeData]', () => {
  let wrapper
  const div = document.createElement('div')
  document.body.appendChild(div)
  beforeAll(() => {
    wrapper = mount(<TreeCase />, { attachTo: div })
  })
  test('should select when click options', () => {
    const getSelect = () => wrapper.find('ShineoutSelect').at(0)
    getSelect()
      .find('.so-select-inner')
      .simulate('click')
    expect(
      getSelect()
        .find('Result')
        .props().focus
    ).toBe(true)
  })
  test('should select when click options', () => {
    const getSelect = () => wrapper.find('ShineoutSelect').at(0)
    getSelect()
      .find('.so-select-inner')
      .simulate('click')
    getSelect()
      .find('.so-select-tree-node')
      .at(0)
      .simulate('click')
    wrapper.update()
    expect(
      getSelect()
        .find('Select')
        .props().value
    ).toBe('0')
  })
})
