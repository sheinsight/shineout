import React from 'react'
import { mount } from 'enzyme'
import Example20RenderOptionList from '../../../site/pages/components/Select/example-20-renderOptionList'

describe('Select[renderOptionList]', () => {
  let wrapper
  beforeAll(() => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    wrapper = mount(<Example20RenderOptionList />, { attachTo: div })
  })
  it('should render custom header and footer', () => {
    ;[0, 1, 2].forEach(index => {
      console.log(index)
      wrapper
        .find('.so-select')
        .at(index)
        .find('.so-select-inner')
        .simulate('click')
      wrapper.update()
      const contents = wrapper
        .find('.so-select')
        .at(index)
        .find('.so-list > div > div')
      expect(contents.at(0).text()).toBe('header')
      expect(contents.at(2).text()).toBe('footer')
    })
  })
})
