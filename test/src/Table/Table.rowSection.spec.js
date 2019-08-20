import React from 'react'
import { mount } from 'enzyme'
import TableSelectBase from '../../../site/pages/components/Table/example-15-select-base'
import TableSelectFormat from '../../../site/pages/components/Table/example-15-select-format'
import TableSelectDatum from '../../../site/pages/components/Table/example-16-select-datum'
import TableSelectDisabled from '../../../site/pages/components/Table/example-17-select-disabled'
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

  test('should render with datum', () => {
    const wrapper = mount(<TableSelectDatum />)
    const wrapperTable = wrapper.find('ShineoutTable')
    const data = wrapperTable.prop('data')
    const datum = wrapperTable.prop('datum')
    expect(datum.check(data[0])).toBeFalsy()
    // select first item
    const first = wrapperTable.find(`.${SO_PREFIX}-scroll tbody tr input[type="checkbox"]`).first()
    first.prop('onChange')({
      target: {
        checked: true,
      },
    })
    wrapper.update()
    expect(datum.check(data[0])).toBeTruthy()
  })

  test('should call onChange with datum', () => {
    const wrapper = mount(<TableSelectDatum />)
    const wrapperTable = wrapper.find('ShineoutTable')
    const data = wrapperTable.prop('data')
    const datum = wrapperTable.prop('datum')
    expect(datum.check(data[0])).toBeFalsy()
    // select first item
    const first = wrapperTable.find(`.${SO_PREFIX}-scroll tbody tr input[type="checkbox"]`).first()
    first.prop('onChange')({
      target: {
        checked: true,
      },
    })
    wrapper.update()
    expect(wrapper.state('selectedValue').includes(`${data[0].firstName} ${data[0].lastName}`)).toBeTruthy()

    first.prop('onChange')({
      target: {
        checked: false,
      },
    })
    wrapper.update()
    expect(wrapper.state('selectedValue').includes(`${data[0].firstName} ${data[0].lastName}`)).toBeFalsy()
  })

  test('should render disabled', () => {
    const wrapper = mount(<TableSelectDisabled />).find('ShineoutTable')
    const disabled = wrapper.prop('disabled')
    const data = wrapper.prop('data')
    wrapper.find(`.${SO_PREFIX}-scroll table tbody tr input[type="checkbox"]`).forEach((checkbox, index) => {
      expect(!!checkbox.prop('disabled')).toBe(disabled(data[index]))
    })
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
