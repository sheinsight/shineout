import React from 'react'
import { mount } from 'enzyme'
import { Radio } from 'shineout'
import RadioBase from '../../../site/pages/components/Radio/example-1-base'
import RadioGroup from '../../../site/pages/components/Radio/example-2-group'
import RadioFormat from '../../../site/pages/components/Radio/example-3-format'
import RadioDatum from '../../../site/pages/components/Radio/example-4-datum'
import RadioBlock from '../../../site/pages/components/Radio/example-5-block'
import RadioDisabled from '../../../site/pages/components/Radio/example-6-disabled'

/* global SO_PREFIX */
describe('Radio[Base]', () => {
  let wrapper
  let data
  beforeAll(() => {
    wrapper = mount(<RadioBase />)
    data = wrapper.find('RadioGroup').prop('data')
  })
  test('should render radios while through data', () => {
    const defaultValue = wrapper.find('RadioGroup').prop('defaultValue')
    wrapper.find(`.${SO_PREFIX}-checkinput`).forEach((input, index) => {
      const text = input.find('span span').text()
      expect(input.find('input[type="radio"]').length).toBe(1)
      expect(text).toBe(data[index])
      if (text === defaultValue) {
        expect(input.hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeTruthy()
      }
    })
  })
  test('should call onChange', () => {
    const changeFn = jest.fn()
    const radiosWrapper = mount(<Radio.Group keygen data={data} onChange={changeFn} />)
    radiosWrapper.find('input[type="radio"]').forEach(radio => {
      // simulate change
      radio.simulate('change', () => {
        return {
          target: {
            checked: true,
          },
        }
      })
    })
    changeFn.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(data[index])
    })
  })
})

describe('Radio[Raw]', () => {
  let wrapper
  let data
  beforeAll(() => {
    wrapper = mount(<RadioGroup />)
    data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  })
  test('should render radios while through data', () => {
    const defaultValue = wrapper.find('RadioGroup').prop('defaultValue')
    wrapper.find(`.${SO_PREFIX}-checkinput`).forEach((input, index) => {
      const text = input.find('span').text()
      expect(input.find('input[type="radio"]').length).toBe(1)
      expect(text).toBe(data[index])
      if (text === defaultValue) {
        expect(input.hasClass(`${SO_PREFIX}-checkinput-checked`)).toBeTruthy()
      }
    })
  })
  test('should call onChange', () => {
    const changeFn = jest.fn()
    const radiosWrapper = mount(<Radio.Group keygen data={data} onChange={changeFn} />)
    radiosWrapper.find('input[type="radio"]').forEach(radio => {
      // simulate change
      radio.simulate('change', () => {
        return {
          target: {
            checked: true,
          },
        }
      })
    })
    changeFn.mock.calls.forEach((call, index) => {
      expect(call[0]).toBe(data[index])
    })
  })
})

describe('Radio[Format]', () => {
  test('should use format', () => {
    const wrapper = mount(<RadioFormat />)
    const data = wrapper.find('RadioGroup').prop('data')
    const format = wrapper.find('ShineoutRadioGroup').prop('format')
    wrapper.find(`label.${SO_PREFIX}`).forEach((text, index) => {
      expect(text).toBe(data[index][format])
    })
  })
  test('should use datum', () => {
    const data = [
      { id: 1, color: 'red' },
      { id: 2, color: 'orange' },
      { id: 3, color: 'yellow' },
      { id: 4, color: 'green' },
      { id: 5, color: 'cyan' },
      { id: 6, color: 'blue' },
      { id: 7, color: 'violet' },
    ]
    const wrapper = mount(<RadioDatum />)
    wrapper.find(`label.${SO_PREFIX}`).forEach((text, index) => {
      expect(text).toBe(data[index].color)
    })
  })
})

describe('Radio[Block]', () => {
  test('should display as block', () => {
    const wrapper = mount(<RadioBlock />)
    expect(wrapper.find(`.${SO_PREFIX}-checkinput-block`).length).toBe(1)
  })
})

describe('Radio[Disabled]', () => {
  test('should disabled on each input', () => {
    const wrapper = mount(<RadioDisabled />)
    const data = wrapper.find('RadioGroup').prop('data')
    expect(wrapper.find('input[disabled]').length).toBe(data.length)
  })
  test('should not call onChange', () => {
    const changeFn = jest.fn()
    const wrapper = mount(<Radio.Group keygen data={['hello', 'world']} disabled onChange={changeFn} />)
    wrapper.find('input[type="checkout"]').forEach(input => {
      input.simulate('change', {
        target: {
          checked: true,
        },
      })
    })
    expect(changeFn.mock.calls.length).toBe(0)
  })

  test('should disabled while return true', () => {
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
    const wrapper = mount(<Radio.Group keygen data={data} disabled={d => d === 'yellow'} />)
    wrapper.find('CheckItem').forEach(input => {
      expect(input.find('input').prop('disabled')).toBe(input.find('span').text() === 'yellow')
    })
  })
})
