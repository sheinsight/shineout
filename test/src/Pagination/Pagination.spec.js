import React from 'react'
import { Pagination } from 'shineout'
import { mount } from 'enzyme'
import PaginationSize from '../../../site/pages/components/Pagination/example-2-size'

/* global SO_PREFIX */
describe('Pagination[Base]', () => {
  test('should render left and right btn', () => {
    const wrapper = mount(<Pagination defaultCurrent={10} total={1000} />)
    const prev = wrapper.find('Item').first()
    const next = wrapper.find('Item').last()
    expect(prev.find('svg').length).toBe(1)
    expect(next.find('svg').length).toBe(1)
  })
  test('should call onChange', () => {
    const changeMock = jest.fn()
    const wrapper = mount(<Pagination current={10} total={1000} onChange={changeMock} />)
    wrapper
      .find('Item')
      .first()
      .prop('onClick')(0)
    expect(changeMock.mock.calls[0][0]).toBe(0)
  })
  test('should compute page-number', () => {
    const wrapper = mount(<Pagination current={10} total={1000} />)
    const items = wrapper.find('Item')
    const lastItem = items.at(items.length - 2)
    expect(Number.parseInt(lastItem.find('a').text(), 10)).toBe(100)
  })
  test('should add while next click', () => {
    const wrapper = mount(<Pagination current={10} total={1000} />)
    wrapper
      .find('Item')
      .last()
      .find('a')
      .prop('onMouseDown')()
    wrapper.update()
    expect(wrapper.find('ShineoutPagination').state('current')).toBe(11)
  })
  test('should minus while prev click', () => {
    const wrapper = mount(<Pagination current={10} total={1000} />)
    wrapper
      .find('Item')
      .first()
      .find('a')
      .prop('onMouseDown')()
    wrapper.update()
    expect(wrapper.find('ShineoutPagination').state('current')).toBe(9)
  })
  test('should disabled while page-number is min', () => {
    const wrapper = mount(<Pagination current={1} total={1000} />)
    expect(
      wrapper
        .find('Item')
        .first()
        .prop('disabled')
    ).toBeTruthy()
  })
  test('should disabled while page-number is max', () => {
    const wrapper = mount(<Pagination current={100} total={1000} />)
    expect(
      wrapper
        .find('Item')
        .last()
        .prop('disabled')
    ).toBeTruthy()
  })
})

describe('Pagination[Size]', () => {
  test('should have size class', () => {
    const wrapper = mount(<PaginationSize />)
    wrapper.find('Pagination').forEach(pagination => {
      const size = pagination.prop('size')
      expect(pagination.find(`.${SO_PREFIX}-pagination-${size}`).length).toBe(1)
    })
  })
})
