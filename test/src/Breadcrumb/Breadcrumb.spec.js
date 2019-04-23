import { mount } from 'enzyme'
import React from 'react'
import { Breadcrumb, FontAwesome } from 'shineout'
import Render from 'react-test-renderer'
import BreadcrumbIcon from '../../../site/pages/components/Breadcrumb/example-3-icon'

/* global SO_PREFIX */
describe('Breadcrumb[Base]', () => {
  test('should render correct', () => {
    const data = [{ title: <a href="#/components/Button">Button</a> }, { title: 'Self' }]
    const wrapper = Render.create(<Breadcrumb data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Breadcrumb[Separator]', () => {
  test('should render separator', () => {
    const data = [{ title: <a href="#/components/Button">Button</a> }, { title: 'Self' }]
    const wrapper = Render.create(<Breadcrumb data={data} separator="|" />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Breadcrumb[Icon]', () => {
  test('should render Icon', () => {
    const wrapper = Render.create(<BreadcrumbIcon />).toJSON()
    expect(wrapper).toMatchSnapshot()
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
