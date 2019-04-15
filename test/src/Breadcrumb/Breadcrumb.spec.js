import { mount } from 'enzyme'
import React from 'react'
import { Breadcrumb } from 'shineout'
import Render from 'react-test-renderer'
import BreadcrumbBase from '../../../site/pages/components/Breadcrumb/example-1-base'

describe('Breadcrumb[Base]', () => {
  test('should render correct', () => {
    const data = [{ title: <a href="#/components/Button">Button</a> }, { title: 'Self' }]
    const wrapper = Render.create(<Breadcrumb data={data} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
