import React from 'react'
import { DatePicker } from 'shineout'
import { mount } from 'enzyme'

/* global SO_PREFIX */

describe('DatePicker[disabledTime]', () => {
  test('should input disabled time', () => {
    jest.useFakeTimers()
    const wrapper = mount(<DatePicker inputable type="time" defaultValue="20:21:22" disabledTime="20:21:20" />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    jest.runAllTimers()
    expect(wrapper.find(`.${SO_PREFIX}-datepicker-focus`).length).toBe(1)
    expect(wrapper.html().indexOf(`${SO_PREFIX}-hidable-show`) > 0).toBeTruthy()

    const activeHour = wrapper.find(`.${SO_PREFIX}-datepicker-time-active`).at(0)
    const activeMinute = wrapper.find(`.${SO_PREFIX}-datepicker-time-active`).at(1)
    const activeSecond = wrapper.find(`.${SO_PREFIX}-datepicker-time-active`).at(2)

    expect(activeHour.text()).toBe('20')
    expect(activeMinute.text()).toBe('21')
    expect(activeSecond.text()).toBe('22')
  })
})
