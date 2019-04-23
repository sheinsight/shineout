import { mount } from 'enzyme'
import React from 'react'
import { Menu } from 'shineout'
import MenuBase from '../../../site/pages/components/Menu/example-1-base'
import MenuHorizontal from '../../../site/pages/components/Menu/example-2-horizontal'
import MenuVertical from '../../../site/pages/components/Menu/example-3-vertical'

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
