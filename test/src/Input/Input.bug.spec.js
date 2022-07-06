import { Input } from 'shineout'
import React from 'react'
import { mount } from 'enzyme'

describe('Input[Trim]', () => {
  test('should trim', () => {
    const wrapper = mount(<Input trim />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '    hello',
      },
    })
    wrapper.update()
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toBe('hello')
  })

  test('should trim • delay', () => {
    const wrapper = mount(<Input trim delay={500} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '    hello',
      },
    })
    wrapper.update()
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toBe('hello')
  })

  test('should trim • delay equal to 0', () => {
    const wrapper = mount(<Input trim delay={0} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '    hello',
      },
    })
    wrapper.update()
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toBe('hello')
  })
})
