import { Input } from 'shineout'
import React from 'react'
import { mount } from 'enzyme'
import InputSize from '../../../site/pages/components/Input/example-2-size'

/* global SO_PREFIX */

describe('Input[Base]', () => {
  let singleInput
  beforeAll(() => {
    singleInput = mount(<Input />)
  })
  test('should render correct dom structure', () => {
    expect(singleInput.html()).toBe(`<label class="${SO_PREFIX}-input"><input type="text" value=""></label>`)
  })
  test('should set placeholder on input dom', () => {
    const prop = singleInput.find('ShineoutInput').prop('placeholder')
    const attr = singleInput.find('input').prop('placeholder')
    expect(prop).toBe(attr)
  })
  test('should clear the value', () => {
    const wrapper = mount(<Input clearable />)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'value',
      },
    })

    wrapper.update()

    expect(wrapper.find('input').prop('value')).toBe('value')

    wrapper.find(`.${SO_PREFIX}-input-clear-wrapper`).simulate('mousedown')

    wrapper.update()

    expect(wrapper.find('input').prop('value')).toBe('')
  })
  test('should set size', () => {
    const wrapper = mount(<InputSize />)
    wrapper.find('ShineoutInput').forEach(input => {
      const size = input.prop('size')
      // ignore the default size
      if (!size) return
      expect(input.find(`label.${SO_PREFIX}-input`).hasClass(`${SO_PREFIX}-input-${size}`)).toBeTruthy()
    })
  })
  test('should only input number', () => {
    const inputValue = 2424.2424
    const valueMap = [2424, 2424.2, 2424.24, 2424.242]
    const inputs = [
      <Input type="number" placeholder="digits undefined" />,
      <Input digits={0} type="number" placeholder="digits 0" />,
      <Input digits={1} type="number" placeholder="digits 1" />,
      <Input digits={2} type="number" placeholder="digits 2" />,
      <Input digits={3} type="number" placeholder="digits 3" />,
    ]
    inputs.forEach(input => {
      input = mount(input)
      const digits = input.prop('digits')
      input.find('input').simulate('change', {
        target: {
          value: inputValue,
        },
      })
      if (digits === undefined) {
        expect(input.find('input').prop('value')).toBe(inputValue)
        return
      }
      input.find('input').simulate('change', {
        target: {
          value: valueMap[digits],
        },
      })
      expect(input.find('input').prop('value')).toBe(valueMap[digits])
    })
  })
})

describe('Input.Number', () => {
  test('should have up/down button', () => {
    const wrapper = mount(<Input.Number width={120} min={23} max={100} digits={0} />)
    const label = wrapper.find(`label.${SO_PREFIX}-input`)
    expect(label.find(`.${SO_PREFIX}-input-number-up`).length).toBe(1)
    expect(label.find(`.${SO_PREFIX}-input-number-down`).length).toBe(1)
  })
  test('should change value while up/down value click', () => {
    const wrapper = mount(<Input.Number width={120} min={23} max={100} digits={0} />)
    function getValue() {
      return wrapper.find('input').prop('value')
    }
    function clickStep(allow, event, times) {
      for (let i = 0; i < times; i++) {
        wrapper.find(`a.${SO_PREFIX}-input-number-${allow}`).simulate(event)
      }
    }
    // origin is a empty string
    expect(getValue()).toBe('')
    // down the value 10times
    clickStep('down', 'mouseDown', 10)
    expect(getValue()).toBe(23)
    // up the value 50times
    clickStep('up', 'mouseDown', 50)
    expect(getValue()).toBe(73)
  })
  test('should set with step', () => {
    const wrapper = mount(<Input.Number step={10} min={1} max={100} digits={0} />)
    wrapper.find(`a.${SO_PREFIX}-input-number-up`).simulate('mouseDown')
    expect(wrapper.find('input').prop('value')).toBe(10)
  })
  test('should max/min work', () => {
    const wrapper = mount(<Input.Number width={120} defaultValue={50} min={23} max={100} digits={0} />)
    const blurFunc = wrapper.find(`Input`).prop('onBlur')
    function getValue() {
      return wrapper.find('input').prop('value')
    }
    blurFunc({
      target: {
        value: 400,
      },
    })
    wrapper.update()

    expect(wrapper.find('input').prop('value')).toBe(100)
    blurFunc({
      target: {
        value: 1,
      },
    })

    wrapper.update()
    expect(getValue()).toBe(23)
  })
})

describe('Input[Group]', () => {
  test('should render correct dom structure', () => {
    const wrapper = mount(
      <Input.Group size="small">
        <Input placeholder="email" />
        .com
      </Input.Group>
    )
    const selector = [
      `.${SO_PREFIX}-input-group`,
      `.${SO_PREFIX}-input-group label.${SO_PREFIX}-input`,
      `.${SO_PREFIX}-input-group span`,
    ]
    selector.forEach(value => {
      expect(wrapper.find(value).length).toBe(1)
    })
  })
})

describe('Input[Tip]', () => {
  test('should render tip when focus', () => {
    const tips = 'enter your email'
    const wrapper = mount(<Input placeholder="email" tip={tips} popover="top-left" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-tip`).length).toBe(0)
    wrapper.find('input').simulate('focus')
    expect(wrapper.find(`.${SO_PREFIX}-popover-content`).text()).toBe(tips)
  })
})

describe('Input[Rule]', () => {
  test('should render error when get error & set popover', done => {
    const rules = [
      { required: true, message: 'Please enter your email.' },
      { type: 'email', message: 'Please enter a valid email.' },
    ]
    const wrapper = mount(
      <Input delay={0} placeholder="email" rules={rules} tip="Email, required" popover="top-left" width={300} />
    )
    // input a empty string
    wrapper.find('input').simulate('focus')
    wrapper.find('input').simulate('change', {
      target: {
        value: '',
      },
    })
    setTimeout(() => {
      wrapper.update()
      expect(wrapper.find(`div.${SO_PREFIX}-popover-content`).text()).toBe('Please enter your email.')
      done()
    }, 1000)
  })
  test('should validate rules one by one', done => {
    const rules = [
      { required: true, message: 'Please enter your email.' },
      { type: 'email', message: 'Please enter a valid email.' },
    ]
    const wrapper = mount(
      <Input delay={0} placeholder="email" rules={rules} tip="Email, required" popover="top-left" width={300} />
    )
    // input a wrong string
    wrapper.find('input').simulate('focus')
    wrapper.find('input').simulate('change', {
      target: {
        value: 'hello',
      },
    })
    setTimeout(() => {
      wrapper.update()
      expect(wrapper.find(`div.${SO_PREFIX}-popover-content`).text()).toBe('Please enter a valid email.')
      done()
    }, 1000)
  })
  test('should not render error while popover not set', done => {
    const rules = [
      { required: true, message: 'Please enter your email.' },
      { type: 'email', message: 'Please enter a valid email.' },
    ]
    const wrapper = mount(<Input delay={0} placeholder="email" rules={rules} tip="Email, required" width={300} />)
    // input a wrong string
    wrapper.find('input').simulate('focus')
    wrapper.find('input').simulate('change', {
      target: {
        value: 'hello',
      },
    })
    setTimeout(() => {
      wrapper.update()
      expect(wrapper.find(`div.${SO_PREFIX}-input-error`).length).toBe(0)
      done()
    }, 1000)
  })
})

describe('Input[Disabled]', () => {
  test('should have disabled attr', () => {
    const wrapper = mount(<Input disabled placeholder="disabled input" />)
    expect(wrapper.find('input').prop('disabled')).toBeTruthy()
  })
  test('should have disabled class', () => {
    const wrapper = mount(<Input disabled placeholder="disabled input" />)
    expect(wrapper.find(`label.${SO_PREFIX}-input-disabled`).length).toBe(1)
  })
  test('should through disabled while on group', () => {
    const wrapper = mount(
      <Input.Group disabled>
        <Input placeholder="first name" />
        <Input placeholder="last name" />
      </Input.Group>
    )
    wrapper.find('input').forEach(input => {
      expect(input.prop('disabled')).toBeTruthy()
    })
  })
})

describe('Input[Password]', () => {
  test('should render text type', () => {
    const wrapper = mount(<Input.Password placeholder="input password" />)
    expect(wrapper.find('input').prop('type')).toBe('text')
  })
  test('should render • default', () => {
    const wrapper = mount(<Input.Password placeholder="input password" />)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'hello',
      },
    })
    expect(wrapper.find('input').prop('value')).toBe('•••••')
  })
})
