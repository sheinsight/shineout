import React from 'react'
import DatePicker from 'shineout/DatePicker'
import { mount } from 'enzyme'
import DatePickerSize from '../../../site/pages/components/DatePicker/example-03-size'

/* global SO_PREFIX */

describe('DatePicker[Base]', () => {
  test('should modal picker dialog while click', () => {
    jest.useFakeTimers()
    const wrapper = mount(<DatePicker />)
    document.write(wrapper.html())
    expect(wrapper.find(`.${SO_PREFIX}-hidable-show`).length).toBe(0)
    expect(wrapper.find(`.${SO_PREFIX}-input-focus`).length).toBe(0)
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    jest.runAllTimers()
    expect(wrapper.find(`.${SO_PREFIX}-input-focus`).length).toBe(1)
    expect(wrapper.html().indexOf(`${SO_PREFIX}-hidable-show`) > 0).toBeTruthy()
  })
  test('should set placeholder if not have value', () => {
    const placeholder = 'hello'
    const wrapper = mount(<DatePicker placeholder={placeholder} />)
    expect(wrapper.find(`span.${SO_PREFIX}-input-placeholder`).text()).toBe(placeholder)
  })
  test('should call onChange prop', () => {
    const changeFn = jest.fn()
    const wrapper = mount(<DatePicker onChange={changeFn} />)
    document.write(wrapper.html())
    // show picker
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    // select first day
    wrapper
      .find(`.${SO_PREFIX}-datepicker-list`)
      .childAt(0)
      .find('span')
      .simulate('click')
    expect(changeFn.mock.calls[0][0]).toBeTruthy()
  })
})

describe('DatePicker[Format]', () => {
  test('return date should match to format', () => {
    // const mockFn = jest.fn()
    const mockFn = jest.fn()
    const formats = ['yyyy-M-d HH:mm', 'yy-MM-dd H:m:s', 'yy-MM-dd h:m:SSS']
    const output = ['2018-2-1 00:00', '18-02-01 0:0:0', '18-02-01 12:0:000']

    formats.forEach((format, index) => {
      mount(<DatePicker format={format} value={new Date(1517414400000)} type="datetime" onChange={mockFn} />)
      expect(mockFn.mock.calls[index][0]).toBe(output[index])
    })
  })
})

describe('DatePicker[Size]', () => {
  test('should have size class', () => {
    const wrapper = mount(<DatePickerSize />)
    wrapper.find('ShineoutDatepicker').forEach(picker => {
      const size = picker.prop('size')
      expect(picker.find(`.${SO_PREFIX}-datepicker-size-${size}`).length).toBe(1)
    })
  })
})

describe('DatePicker[WeekPicker]', () => {
  test('should only pick week', () => {
    const wrapper = mount(<DatePicker type="week" format="yyyy wWW" defaultValue={Date.now()} />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    const days = wrapper.find(`.${SO_PREFIX}-datepicker-list`)
    for (let i = 0; i < 5; i++) {
      const first = days.childAt(i * 7)
      const last = days.childAt(i * 7 + 6)
      if (first.find(`.${SO_PREFIX}-datepicker-active`).length > 0) continue
      first.simulate('mouseEnter')
      expect(first.html().indexOf(`${SO_PREFIX}-datepicker-hover-start`) > 0).toBeTruthy()
      expect(last.html().indexOf(`${SO_PREFIX}-datepicker-hover-end`) > 0).toBeTruthy()
      for (let j = 0; j < 5; j++) {
        const center = days.childAt(i * 7 + j + 1)
        expect(center.html().indexOf(`${SO_PREFIX}-datepicker-hover`) > 0).toBeTruthy()
      }
    }
  })
})

describe('DatePicker[MonthPick]', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<DatePicker type="month" defaultValue={Date.now()} />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
  })
  test('should render all month', () => {
    const months = wrapper.find(`.${SO_PREFIX}-datepicker-list`)
    expect(months.children().length).toBe(12)
  })
  test('should active current month', () => {
    const months = wrapper.find(`.${SO_PREFIX}-datepicker-list`)
    const monthIndex = new Date().getMonth()
    expect(months.childAt(monthIndex).hasClass(`${SO_PREFIX}-datepicker-active`)).toBeTruthy()
  })
})

describe('DatePicker[TimePick]', () => {
  test('should render hours/minutes/seconds default', () => {
    const now = new Date()
    const wrapper = mount(<DatePicker type="time" defaultValue={now} />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    const pickerList = wrapper.find(`.${SO_PREFIX}-datepicker-time-picker`)
    const hoursPicker = pickerList.childAt(0)
    const minutesPicker = pickerList.childAt(1)
    const secondPicker = pickerList.childAt(2)
    expect(hoursPicker.find('span').length).toBe(24)
    expect(minutesPicker.find('span').length).toBe(60)
    expect(secondPicker.find('span').length).toBe(60)
    // render correct value
    expect(
      hoursPicker
        .find('span')
        .at(now.getHours())
        .hasClass(`${SO_PREFIX}-datepicker-time-active`)
    ).toBeTruthy()
    expect(
      minutesPicker
        .find('span')
        .at(now.getMinutes())
        .hasClass(`${SO_PREFIX}-datepicker-time-active`)
    ).toBeTruthy()
    expect(
      secondPicker
        .find('span')
        .at(now.getSeconds())
        .hasClass(`${SO_PREFIX}-datepicker-time-active`)
    ).toBeTruthy()
  })
  test('should render different picks to match format', () => {
    const formats = ['HH:mm', 'hh:mm a']
    const outputLength = [[24, 60], [12, 60, 2]]
    formats.forEach((format, index) => {
      const wrapper = mount(<DatePicker type="time" defaultValue={Date.now()} format={format} />)
      // show pickers
      document.write(wrapper.html())
      wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
      const pickList = wrapper.find(`.${SO_PREFIX}-datepicker-time-picker`)
      expect(pickList.children().length).toBe(outputLength[index].length)
      for (let i = 0; i < outputLength[index].length; i++) {
        expect(pickList.childAt(i).find('span').length).toBe(outputLength[index][i])
      }
    })
  })
})

describe('DatePicker[DatetimePick]', () => {
  test('should render date and time both', () => {
    const wrapper = mount(<DatePicker type="datetime" defaultValue={Date.now()} />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    // render time pick
    expect(wrapper.find(`.${SO_PREFIX}-datepicker-day-picker .${SO_PREFIX}-datepicker-datetime`).length).toBe(1)
    // render date pick
    expect(wrapper.find(`.${SO_PREFIX}-datepicker-day-picker .${SO_PREFIX}-datepicker-list`).length).toBe(1)
  })
})

describe('DatePicker[RangePick]', () => {
  test('should render two pick panel', () => {
    const wrapper = mount(<DatePicker range />)
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-datepicker-day-picker`).length).toBe(2)
  })
})

describe('DataPicker[disabled]', () => {
  test('should disabled select', () => {
    const wrapper = mount(<DatePicker disabled defaultValue={Date.now()} />)
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    expect(wrapper.find(`.${SO_PREFIX}-hidable-show`).length).toBe(0)
  })
  test('should exec disabled while function', () => {
    const today = Date.now() - 1000
    const wrapper = mount(<DatePicker disabled={d => d.getTime() <= today} type="datetime" defaultValue={Date.now()} />)
    // show picker
    document.write(wrapper.html())
    wrapper.find(`.${SO_PREFIX}-datepicker-inner`).simulate('click')
    const dayList = wrapper.find(`.${SO_PREFIX}-datepicker-list`).children()
    let beyondTody = false
    dayList.forEach(day => {
      if (day.find(`span.${SO_PREFIX}-datepicker-active`).length > 0) {
        beyondTody = true
        return
      }
      expect(day.find('span').hasClass(`${SO_PREFIX}-datepicker-disabled`)).toBe(!beyondTody)
    })
  })
})

describe('DataPicker[inputable]', () => {
})
