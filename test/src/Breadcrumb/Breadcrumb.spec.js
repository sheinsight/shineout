import { mount } from 'enzyme'
import React from 'react'
import { Breadcrumb } from 'shineout'

/* global SO_PREFIX */

describe('Breadcrumb[Separator]', () => {
  test('should render separator', () => {
    const data = [{ title: <a href="#/components/Button">Button</a> }, { title: 'Self' }]
    const wrapper = mount(<Breadcrumb data={data} separator="|" />)
    expect(wrapper.find(`.${SO_PREFIX}-breadcrumb-separator`).text()).toBe('|')
  })
})

describe('Breadcrumb[Icon]', () => {
  const data = [
    { icon: <i>1</i>, title: 'Home', url: '#home' },
    { title: 'Menu' },
    { title: 'Self', url: 'https://www.google.com' },
  ]
  test('should render Icon', () => {
    const wrapper = mount(<Breadcrumb data={data} />)
    expect(
      wrapper
        .childAt(0)
        .find('i')
        .text()
    ).toBe('1')
  })
})

describe('Breadcrumb[Select]', () => {
  const data = [
    [{ title: 'Home', url: '#/' }, { title: 'aaa', url: '#/' }, { title: 'bbb', url: '#/' }],
    { title: <a href="#/components/Button">Button</a> },
  ]
  const wrapper = mount(<Breadcrumb data={data} />)
  expect(wrapper.find(`span.${SO_PREFIX}-breadcrumb-down`)).toHaveLength(1)
})

describe('Breadcrumb[Select]', () => {
  const data = [[{ title: 'Home', url: '#/' }, { title: 'aaa', url: '#/' }, { title: 'bbb', url: '#/' }]]
  const wrapper = mount(<Breadcrumb data={data} />)
  expect(wrapper.find(`span.${SO_PREFIX}-breadcrumb-down`)).toHaveLength(1)
})

describe('Breadcrumb[renderItem]', () => {
  const clickHandler = jest.fn()
  const data = [
    [{ title: 'Home', url: '#/' }, { title: 'aaa', url: '#/' }, { title: 'bbb', url: '#/' }],
    { title: <a href="#/components/Button">Button</a> },
    { title: 'Self', onClick: clickHandler },
  ]
  const renderItem = value => {
    let BreadcrumbItem = value.title
    if (value.onClick || value.url) {
      const props = {
        onClick: value.onClick,
      }
      if (value.url) props.href = value.url
      BreadcrumbItem = (
        <a {...props}>
          {value.icon}
          &nbsp;
          {value.title}
        </a>
      )
      return BreadcrumbItem
    }
    return <div>i am very special</div>
  }
  const wrapper = mount(<Breadcrumb data={data} renderItem={renderItem} />).find(`.${SO_PREFIX}-breadcrumb`)
  wrapper
    .childAt(2)
    .children()
    .simulate('click')
  expect(clickHandler.mock.calls.length).toBe(1)
  expect(
    wrapper
      .childAt(1)
      .find('div')
      .text()
  ).toBe('i am very special')
})
