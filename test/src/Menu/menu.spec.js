import { mount } from 'enzyme'
import React from 'react'
import { Menu } from 'shineout'
import MenuBase from '../../../site/pages/components/Menu/example-1-base'
import Example1Link from '../../../site/pages/components/Menu/example-1-link'
import MenuHorizontal from '../../../site/pages/components/Menu/example-2-horizontal'
import MenuVertical from '../../../site/pages/components/Menu/example-3-vertical'
import Example10FrontCaret from '../../../site/pages/components/Menu/example-10-frontCaret'
import Test001LinkFunc from '../../../site/pages/components/Menu/test-001-link-func'
import MenuVerticalAuto from '../../../site/pages/components/Menu/test-004-verticalauto'
import Test003RenderLinkAndClick from '../../../site/pages/components/Menu/test-003-renderLink-click'
import ExampleDisabled from '../../../site/pages/components/Menu/example-4-disabled'
import Test005OpenKeys from '../../../site/pages/components/Menu/test-005-openKeys'
import Test006DefaultOpenKeys from '../../../site/pages/components/Menu/test-006-defaultOpenKeys'

/* global SO_PREFIX */
describe('Menu', () => {
  test('should click to expand children-menu', () => {
    const wrapper = mount(<MenuBase />)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-menu-has-children`)
        .first()
        .hasClass(`${SO_PREFIX}-menu-open`)
    ).toBeFalsy()
    wrapper
      .find(`.${SO_PREFIX}-menu-has-children`)
      .first()
      .simulate('click')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-menu-has-children`)
        .first()
        .hasClass(`${SO_PREFIX}-menu-open`)
    ).toBeFalsy()
    wrapper.unmount()
  })
})

describe('Menu[Horizontal]', () => {
  test('should hover to show menu-item', () => {
    const wrapper = mount(<MenuHorizontal />)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-menu-has-children`)
        .first()
        .hasClass(`${SO_PREFIX}-menu-open`)
    ).toBeFalsy()
    wrapper
      .find(`.${SO_PREFIX}-menu-has-children`)
      .first()
      .simulate('mouseenter')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-menu-has-children`)
        .first()
        .hasClass(`${SO_PREFIX}-menu-open`)
    ).toBeTruthy()
  })
})

describe('Menu[Vertical]', () => {
  test('should hover to show menu-item in vertical', () => {
    const wrapper = mount(<MenuVertical />)
    expect(
      wrapper
        .find(`.${SO_PREFIX}-menu-has-children`)
        .first()
        .hasClass(`${SO_PREFIX}-menu-open`)
    ).toBeFalsy()
    wrapper
      .find(`.${SO_PREFIX}-menu-has-children`)
      .first()
      .simulate('mouseenter')
    expect(
      wrapper
        .find(`.${SO_PREFIX}-menu-has-children`)
        .first()
        .hasClass(`${SO_PREFIX}-menu-open`)
    ).toBeTruthy()
  })
})

describe('Menu[active-controller]', () => {
  test('active should in control', () => {
    const data = [
      {
        id: '1',
        title: 'Navigation One',
      },
      {
        id: '3',
        title: 'Navigation Two',
      },
    ]
    const wrapper = mount(<Menu keygen="id" data={data} renderItem={d => d.title} active={da => da.id === '1'} />)
    expect(wrapper.find(`.${SO_PREFIX}-menu-active a`).text()).toBe(data[0].title)
    wrapper.setProps({
      active: da => da.id === '3',
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-menu-active a`).text()).toBe(data[1].title)
  })
})

describe('Menu[vertical-auto]', () => {
  const wrapper = mount(<MenuVerticalAuto /> )
  wrapper.update()
  it('should render up class', () => {})
  expect(
    wrapper
      .find(`.${SO_PREFIX}-menu-has-children`)
      .first()
      .hasClass(`${SO_PREFIX}-menu-open-up`)
  ).toBeFalsy()
  // tip: 这块用到了高度计算导致无法测试
  // expect(
  //   wrapper
  //     .find(`.${SO_PREFIX}-menu-has-children`)
  //     .last()
  //     .hasClass(`${SO_PREFIX}-menu-open-up`)
  // ).toBeTruthy()
})

describe('Menu[frontCaret]', () => {
  const wrappr = mount(<Example10FrontCaret />)
  it('should icon render front', () => {
    expect(
      wrappr
        .find('.so-menu')
        .at(0)
        .find('.so-menu-has-children')
        .first()
        .hasClass('so-menu-caret-solid')
    ).toBeTruthy()
  })

  it('should icon render hollow icon', () => {
    expect(
      wrappr
        .find('.so-menu')
        .at(1)
        .find('.so-menu-has-children')
        .first()
        .hasClass('so-menu-caret-hollow')
    ).toBeTruthy()
  })

  it('should render green icon', () => {
    expect(
      wrappr
        .find('.so-menu')
        .at(2)
        .find('.so-menu-has-children')
        .first()
        .find('.so-menu-caret')
        .first()
        .getDOMNode().style.color
    ).toBe('green')
  })
})

describe('Menu[linkKey]', () => {
  it('should render linkKey func', () => {
    const wrapper = mount(<Example1Link />)
    expect(wrapper.find('a[href]').length).toBe(3)
  })
  it('should render linkKey func', () => {
    const wrapper = mount(<Test001LinkFunc />)
    expect(wrapper.find('a[href]').length).toBe(3)
  })
})

describe('Menu[renderLink and onClick]', () => {
  const innerClick = jest.fn()
  const outerClick = jest.fn()
  const dataClick = jest.fn()
  const wrapper = mount(<Test003RenderLinkAndClick itemClick={innerClick} onClick={outerClick} dataClick={dataClick} />)
  it('should render 3 link', () => {
    expect(wrapper.find('a[href]').length).toBe(3)
  })
  it('should call onClick twice', () => {
    wrapper
      .find('a[href]')
      .at(0)
      .simulate('click')
    expect(innerClick.mock.calls.length).toBe(1)
    expect(outerClick.mock.calls.length).toBe(1)
    expect(dataClick.mock.calls.length).toBe(0)
  })
  it('should call onClick only outer', () => {
    wrapper
      .find('a[href]')
      .at(1)
      .simulate('click')
    expect(innerClick.mock.calls.length).toBe(1)
    expect(outerClick.mock.calls.length).toBe(2)
    expect(dataClick.mock.calls.length).toBe(0)
  })
  it('should call onClick only outer', () => {
    wrapper
      .find('a[href]')
      .at(2)
      .simulate('click')
    expect(innerClick.mock.calls.length).toBe(1)
    expect(outerClick.mock.calls.length).toBe(2)
    expect(dataClick.mock.calls.length).toBe(1)
  })
})

describe('Menu[disabled]', () => {
  jest.useFakeTimers()
  const wrapper = mount(<ExampleDisabled />)
  it('should click effect when not disabled', async () => {
    const hasChildItem = wrapper.find('.so-menu-item.so-menu-has-children:not(.so-menu-disabled)').at(0)
    expect(hasChildItem.hasClass('so-menu-open')).toBeFalsy()
    hasChildItem
      .find('a')
      .at(0)
      .simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
    // jest.runAllTimers()
    wrapper.update()
    expect(
      wrapper
        .find('.so-menu-item.so-menu-has-children:not(.so-menu-disabled)')
        .at(0)
        .hasClass('so-menu-open')
    ).toBeTruthy()
    wrapper.update()
    wrapper
      .find('.so-menu-open .so-menu-list a')
      .at(0)
      .simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
    wrapper.update()
    expect(
      wrapper
        .find('.so-menu-open .so-menu-list li')
        .at(0)
        .hasClass('so-menu-active')
    ).toBeTruthy()
  })
  it('disabled click will not effect', () => {
    wrapper.find('.so-menu-disabled.so-menu-no-children a').simulate('click')
    wrapper.update()
    expect(wrapper.find('.so-menu-disabled.so-menu-no-children').hasClass('so-menu-active')).toBeFalsy()
  })
})

describe('Menu[defaultOpenKeys]', () => {
  const wrapper = mount(<Test006DefaultOpenKeys />)
  it('should render default two open', () => {
    expect(wrapper.find('.so-menu-has-children.so-menu-open').length).toBe(2)
  })
})

describe('Menu[openKeys, onOpenChange]', () => {
  const wrapper = mount(<Test005OpenKeys />)
  it('should trigger onOpenChange when click', () => {
    wrapper
      .find('.so-menu-has-children > a')
      .at(0)
      .simulate('click', { nativeEvent: { stopImmediatePropagation: () => {} } })
    wrapper.update()
    expect(wrapper.find('#keys').text()).toBe('3')
  })

  it('should render chosed keys', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click')
    wrapper.update()
    expect(wrapper.find('.so-menu-has-children.so-menu-open').length).toBe(0)

    wrapper
      .find('button')
      .at(1)
      .simulate('click')
    wrapper.update()
    expect(wrapper.find('.so-menu-has-children.so-menu-open').length).toBe(2)

    wrapper
      .find('button')
      .at(2)
      .simulate('click')
    wrapper.update()
    expect(wrapper.find('.so-menu-has-children.so-menu-open').length).toBe(1)
  })
})
