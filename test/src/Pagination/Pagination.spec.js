import React from 'react'
import { Pagination } from 'shineout'
import { mount } from 'enzyme'
import PaginationSize from '../../../site/pages/components/Pagination/example-2-size'
import PaginationLayout from '../../../site/pages/components/Pagination/example-3-layout'
import PaginationText from '../../../site/pages/components/Pagination/example-4-text'
import PaginationAlign from '../../../site/pages/components/Pagination/example-5-align'
import PaginationController from '../../../site/pages/components/Pagination/example-7-controlled'
import PaginationDisabled from '../../../site/pages/components/Pagination/example-8-disabled'

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
      .prop('onClick')()
    wrapper.update()
    expect(wrapper.find('ShineoutPagination').state('current')).toBe(11)
  })
  test('should minus while prev click', () => {
    const wrapper = mount(<Pagination current={10} total={1000} />)
    wrapper
      .find('Item')
      .first()
      .find('a')
      .prop('onClick')()
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

describe('Pagination[layout]', () => {
  test('should render layout', () => {
    const layout = {
      links: `.${SO_PREFIX}-pagination-links`,
      list: `.${SO_PREFIX}-pagination-pagesize .${SO_PREFIX}-select-default`,
      jumper: `.${SO_PREFIX}-pagination-section input[type="text"]`,
    }
    const wrapper = mount(<PaginationLayout />).find('ShineoutPagination')
    const inner = wrapper.find(`div.${SO_PREFIX}-pagination`)
    const layoutData = wrapper.prop('layout')
    layoutData.forEach((l, index) => {
      if (typeof l !== 'string') return
      expect(inner.childAt(index).find(layout[l]).length).toBe(1)
    })
  })
})

describe('Pagination[text]', () => {
  test('should render text', () => {
    const wrapper = mount(<PaginationText />).find('ShineoutPagination')
    const text = wrapper.prop('text')
    expect(
      wrapper
        .find('ShineoutPaginationPrev')
        .find('a')
        .text()
    ).toBe(text.prev)
    expect(
      wrapper
        .find('ShineoutPaginationNext')
        .find('a')
        .text()
    ).toBe(text.next)
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-select-result span`)
        .text()
        .indexOf(text.page) > 0
    ).toBeTruthy()
  })
})

describe('Pagination[position]', () => {
  test('should render position', () => {
    const wrapper = mount(<PaginationAlign />).find('ShineoutPagination')
    wrapper.forEach(pagination => {
      const align = pagination.prop('align')
      expect(pagination.find(`.${SO_PREFIX}-pagination-${align}`).length).toBe(1)
    })
  })
})

describe('Pagination[controller]', () => {
  test('should render controller component', () => {
    const wrapper = mount(<PaginationController />)
    Array(50)
      .fill(1)
      .forEach((p, index) => {
        wrapper.setState({
          current: index + 1,
        })
        wrapper.find(`.${SO_PREFIX}-pagination-current`).forEach(item => {
          expect(item.find('a').text()).toBe(String(index + 1))
        })
      })
  })
})

describe('Pagination[Disabled]', () => {
  test('should disabled items', () => {
    const wrapper = mount(<PaginationDisabled />)
    wrapper.find(`a.${SO_PREFIX}-pagination-item`).forEach(item => {
      expect(item.prop('disabled')).toBeTruthy()
    })
    wrapper.find(`.${SO_PREFIX}-select-inner`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-select-disabled`).length).toBe(1)
  })
})
