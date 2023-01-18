import React from 'react'
import { mount } from 'enzyme'
import { Switch } from 'shineout'
import { baseTest } from '../../utils'

/* global SO_PREFIX */

describe('Switch[Base]', () => {
  test('should custom style and className', () => {
    baseTest(Switch, `label.${SO_PREFIX}-checkinput-switch`)
  })
})

describe('Switch[content]', () => {
  const uncheckedText = '1'
  const unchecked = <span>{uncheckedText}</span>
  const ckeckedText = '2'
  const checked = <span>{ckeckedText}</span>

  test('should set content', () => {
    const wrapper = mount(<Switch content={[unchecked, checked]} />)
    wrapper.find('input').simulate('change', { target: { checked: true } })
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).text()).toBe(uncheckedText)
    wrapper.find('input').simulate('change', { target: { checked: false } })
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).text()).toBe(ckeckedText)
  })
})

describe('Switch[defaultValue]', () => {
  const uncheckedText = '1'
  const unchecked = <span>{uncheckedText}</span>
  const ckeckedText = '2'
  const checked = <span>{ckeckedText}</span>

  test('should set defaultValue true', () => {
    const wrapper = mount(<Switch defaultValue content={[unchecked, checked]} />)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).text()).toBe(uncheckedText)
  })

  test('should set defaultValue false', () => {
    const wrapper = mount(<Switch defaultValue={false} content={[unchecked, checked]} />)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).text()).toBe(ckeckedText)
  })
})

describe('Switch[disabled]', () => {
  test('should set disabled', () => {
    const wrapper = mount(<Switch disabled />)
    expect(wrapper.find('input').getDOMNode().disabled).toBe(true)
  })
})

describe('Switch[onChange]', () => {
  test('should onChange', () => {
    const handleChange = jest.fn()
    const wrapper = mount(<Switch onChange={handleChange} />)
    wrapper.find('input').simulate('change', { target: { checked: true } })
    expect(handleChange).toBeCalled()
    expect(handleChange.mock.calls[0][0]).toBe(true)
  })
})

describe('Switch[size]', () => {
  test('should onChange', () => {
    const size = ['default', 'small', 'large']
    size.forEach(i => {
      const wrapper = mount(<Switch size={i} />)
      expect(wrapper.find(`label.${SO_PREFIX}-checkinput${i === 'default' ? '' : `-${i}`}`).length).toBe(1)
    })
  })
})

describe('Switch[keepContentShow]', () => {
  test('should render switch children', () => {
    const wrapper = mount(<Switch size="small" content={['Open', 'Close']} />)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).length).toBe(0)
  })

  test('should keep content show when Size is small', () => {
    const wrapper = mount(<Switch size="small" content={['Open', 'Close']} keepContentShow />)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-switch-children`).text()).toBe('Close')
  })
})
