import React from 'react'
import { mount } from 'enzyme'
import { EditableArea } from 'shineout'
import EditableAreaBase from '../../../site/pages/components/EditableArea/example-01-base'
// import EditableAreaControlled from '../../../site/pages/components/EditableArea/example-2-controlled'

/* global SO_PREFIX */
describe('EditableArea[Base]', () => {
  test('should render textarea element', () => {
    const wrapper = mount(<EditableAreaBase />)
    expect(wrapper.find('textarea').length).toBe(1)
  })
  test('should call onChange', () => {
    jest.useFakeTimers()
    const changeFn = jest.fn()
    const wrapper = mount(<EditableArea onChange={changeFn} />)
    wrapper.find('textarea').prop('onChange')({ target: { value: 'test' } })
    jest.runAllTimers()
    expect(changeFn.mock.calls[0][0]).toBe('test')
  })
})
