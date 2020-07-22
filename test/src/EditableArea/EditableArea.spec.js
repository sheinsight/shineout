import React from 'react'
import { mount } from 'enzyme'
// import { EditableArea } from 'shineout'
import EditableAreaBase from '../../../site/pages/components/EditableArea/example-01-base'
// import EditableAreaControlled from '../../../site/pages/components/EditableArea/example-2-controlled'

/* global SO_PREFIX */
describe('EditableArea[Base]', () => {
  test('should render textarea element', () => {
    const wrapper = mount(<EditableAreaBase />)
    expect(wrapper.find('input').length).toBe(1)
  })
})
