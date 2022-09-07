import React from 'react'
import { mount } from 'enzyme'
import TableSelectBase from '../../../site/pages/components/Table/example-15-select-base'
import TableSelectFormat from '../../../site/pages/components/Table/example-15-select-format'
import TableSelectDisabled from '../../../site/pages/components/Table/example-17-select-disabled'
import TableSelectRender from '../../../site/pages/components/Table/example-15-select-render'
import { dispatchEvent } from '../../../src/utils/dom/element'
// import TableSelectPagination from '../../../site/pages/components/Table/example-18-select'

/* global SO_PREFIX */
describe('Table[rowSection]', () => {
  test('should render correctly', () => {
    const wrapper = mount(<TableSelectBase />)
    wrapper.find(`.${SO_PREFIX}-scroll table tbody tr`).forEach(tr => {
      if (!tr.find(`td.${SO_PREFIX}-table-checkbox`).length) return
      expect(tr.find('input[type="checkbox"]')).toHaveLength(1)
    })
  })
  test('should render format', () => {
    const wrapper = mount(<TableSelectFormat />)
    const wrapperTable = wrapper.find('ShineoutTable')
    const data = wrapperTable.prop('data')
    const format = wrapperTable.prop('format')
    // select first item
    const first = wrapperTable.find(`.${SO_PREFIX}-scroll tbody tr input[type="checkbox"]`).first()
    first.prop('onChange')({
      target: {
        checked: true,
      },
    })
    wrapper.update()
    const value = wrapper.find('ShineoutTable').prop('value')
    expect(value[value.length - 1]).toBe(format(data[0]))
  })

  test('should render disabled', () => {
    const wrapper = mount(<TableSelectDisabled />).find('ShineoutTable')
    const disabled = wrapper.prop('disabled')
    const data = wrapper.prop('data')
    wrapper.find(`.${SO_PREFIX}-scroll table tbody tr input[type="checkbox"]`).forEach((checkbox, index) => {
      expect(!!checkbox.prop('disabled')).toBe(disabled(data[index]))
    })
  })

  test('should render disabled popover', () => {
    jest.useFakeTimers()
    const wrapper = mount(<TableSelectRender />).find('ShineoutTable')
    const disabledCheck = wrapper.find(`.${SO_PREFIX}-scroll table tbody tr .${SO_PREFIX}-checkinput-disabled`).first()
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(0)
    dispatchEvent(disabledCheck.instance().parentNode, 'mouseenter')
    jest.runAllTimers()
    expect(document.querySelectorAll(`.${SO_PREFIX}-popover`).length).toBe(1)
  })

  // test('should hold selected while paging', () => {
  //   const wrapper = mount(<TableSelectPagination />)
  //   // chose first page
  //   console.log(wrapper.find('thead input[type="checkbox"]').debug())
  //   wrapper.find('thead input[type="checkbox"]').prop('onChange')({
  //     target: {
  //       checked: true,
  //     },
  //   })
  //   wrapper.update()
  //   console.log(wrapper.find('thead input[type="checkbox"]').debug())
  //   // console.log(wrapper.html())
  //   console.log(wrapper.find('ShineoutTable').prop('datum').values)
  // })
})
