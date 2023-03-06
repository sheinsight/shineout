import { mount } from 'enzyme/build'
import React from 'react'
import SelectColumns from '../../../site/pages/components/Select/example-14-columns-default'
import ColumnsStack from '../../../site/pages/components/Select/example-14-columns-stack'
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
  test('should render stack columns ', () => {
    jest.useFakeTimers()
    const wrapper = mount(<ColumnsStack />)
    appendToDOM(wrapper.html())
    const Select = wrapper.find('ShineoutSelect')
    Select.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-select-box-options`).length).toBe(1)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-select-box-options .${SO_PREFIX}-select-option`)
        .first()
        .getDOMNode().style.width
    ).toBe('')
  })
})

describe('Select[Columns] check ', () => {
  const wrapper = mount(<SelectColumns />)
  test('should select All', () => {
    const multipleSelect = wrapper.find('ShineoutSelect').last()
    multipleSelect.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    wrapper.update()
    multipleSelect.find('.so-select-header input').simulate('change', { target: { checked: true } })
    wrapper.update()
    const SelectProps = wrapper
      .find('ShineoutSelect')
      .last()
      .find('Select')
      .props()
    expect(SelectProps.value.length).toBe(SelectProps.data.length)
  })

  it('should cancel all', () => {
    const multipleSelect = wrapper.find('ShineoutSelect').last()
    multipleSelect.find('.so-select-header input').simulate('change', { target: { checked: false } })
    wrapper.update()
    const SelectProps = wrapper
      .find('ShineoutSelect')
      .last()
      .find('Select')
      .props()
    expect(SelectProps.value.length).toBe(0)
  })

  it('should select one', () => {
    const multipleSelect = wrapper.find('ShineoutSelect').last()
    multipleSelect.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    wrapper.update()
    wrapper
      .find('ShineoutSelect')
      .last()
      .find('.so-select-box-options input')
      .first()
      .simulate('change', { target: { checked: true } })
    wrapper
      .find('ShineoutSelect')
      .last()
      .find('.so-select-box-options input')
      .first()
      .simulate('change', { target: { checked: true } })
    wrapper.update()
    const SelectProps = wrapper
      .find('ShineoutSelect')
      .last()
      .find('Select')
      .props()
    expect(SelectProps.value.length).toBe(1)
  })
})
