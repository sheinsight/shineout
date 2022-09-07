import { mount } from 'enzyme/build'
import React from 'react'
import MaxLength from '../../../site/pages/components/Select/test-001-maxlength'

describe('Select[maxLength]', () => {
  const wrapper = mount(<MaxLength />)
  test('should render in document', () => {
    wrapper.find('.so-select-inner').simulate('click')
    wrapper.update()
    expect(
      wrapper
        .find('.so-select-input')
        .getDOMNode()
        .getAttribute('contenteditable')
    ).toBe('true')
  })
})
