import { Input } from 'shineout'
import React from 'react'
import { mount } from 'enzyme'
import { baseTest } from '../../utils'
import InputSize from '../../../site/pages/components/Input/example-02-size'

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
    const inputValue = '2424.2424'
    const valueMap = ['2424', '2424.2', '2424.24', '2424.242']
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
  test('should number of integer restricted by integerLimit', () => {
    const valueMap = ['12.34', '123.4', '1234']
    valueMap.forEach((v, i) => {
      const integerLimit = i + 1
      const wrapper = mount(<Input delay={0} type="number" integerLimit={integerLimit} />)
      wrapper.find('input').simulate('change', {
        target: {
          value: v,
        },
      })
      wrapper.find('input').simulate('blur')
      wrapper.update()
      const result =
        v.indexOf('.') >= 0 ? `${v.split('.')[0].substring(0, integerLimit)}` : v.substring(0, integerLimit)
      expect(wrapper.find('input').getDOMNode().value).toBe(result)
    })
  })
  test('should render correct with numType props', () => {
    const inputValue = '-123.4'
    const valueMap = ['-123.4', '123.4', '123.4']
    const inputs = [
      <Input type="number" placeholder="digits undefined" />,
      <Input numType="positive" type="number" placeholder="digits 0" />,
      <Input numType="non-negative" type="number" placeholder="digits 0" />,
    ]
    inputs.forEach((input, index) => {
      const wrapper = mount(input)
      for (let i = 0; i < inputValue.length; i++) {
        const originalVal = wrapper.find('input').prop('value')
        wrapper.find('input').simulate('change', {
          target: {
            value: originalVal + inputValue[i],
          },
        })
      }
      expect(wrapper.find('input').prop('value')).toBe(valueMap[index])
    })
  })
  test('should 0 is not allowed when numType is positive', () => {
    const expectValue = ['123.4', '123.4', '', '']
    const inputValue = ['123.4', '-123.4', '0', '0.']
    inputValue.forEach((input, index) => {
      const wrapper = mount(<Input type="number" numType="positive" />)
      for (let i = 0; i < input.length; i++) {
        const originalVal = wrapper.find('input').prop('value')
        wrapper.find('input').simulate('change', {
          target: {
            value: originalVal + input[i],
          },
        })
      }
      wrapper.update()
      wrapper.find('input').simulate('blur')
      wrapper.update()
      expect(wrapper.find('input').prop('value')).toBe(expectValue[index])
    })
  })
  test('should render correct after blur', () => {
    const expectValue = ['', '', '', '0', '-0', '0.123', '-0.123']
    const inputValue = ['-', '.', '-.', '00000.', '-00000.', '.123', '-0000.123']
    inputValue.forEach((input, index) => {
      input = mount(<Input type="number" />)
      input.find('input').simulate('change', {
        target: {
          value: inputValue[index],
        },
      })
      input.update()
      input.find('input').simulate('blur')
      input.update()
      expect(input.find('input').prop('value')).toBe(expectValue[index])
    })
  })
  test('should fix correct after blur', () => {
    const inputValue = '-123.4'
    const valueMap = ['-123', '-123.40']
    const inputs = [
      <Input digits={0} autoFix type="number" placeholder="digits 0" />,
      <Input digits={2} autoFix type="number" placeholder="digits 2" />,
    ]
    inputs.forEach((input, index) => {
      input = mount(input)
      input.find('input').simulate('change', {
        target: {
          value: inputValue,
        },
      })
      input.update()
      input.find('input').simulate('blur')
      input.update()
      expect(input.find('input').prop('value')).toBe(valueMap[index])
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
  test('should change value restricted by integerLimit while up value click', () => {
    const wrapper = mount(<Input.Number width={120} integerLimit={3} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '998',
      },
    })
    wrapper.update()
    wrapper.find(`a.${SO_PREFIX}-input-number-up`).simulate('mouseDown')
    expect(wrapper.find('input').prop('value')).toBe(999)
    wrapper.find(`a.${SO_PREFIX}-input-number-up`).simulate('mouseDown')
    expect(wrapper.find('input').prop('value')).toBe(999)
  })
  test('should value cannot <= 0 when numType is positive while down value click', () => {
    const wrapper = mount(<Input.Number width={120} numType="positive" />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '1',
      },
    })
    wrapper.update()
    wrapper.find(`a.${SO_PREFIX}-input-number-down`).simulate('mouseDown')
    expect(wrapper.find('input').prop('value')).toBe('1')
  })
  test('should value is null when numType is positive and input value is 0', () => {
    const wrapper = mount(<Input.Number width={120} numType="positive" />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '0',
      },
    })
    wrapper.update()
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').prop('value')).toBe('')
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
  jest.useRealTimers()
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

describe('Input[innerTitle]', () => {
  test('content will show when focus', () => {
    const wrapper = mount(<Input.Password innerTitle="please input something" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.find('input').simulate('focus')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
  })
  test('content will show when there is value', () => {
    const wrapper = mount(<Input.Password innerTitle="please input something" />)
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(0)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'value',
      },
    })
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find(`.${SO_PREFIX}-input-title-box-open`).length).toBe(1)
  })
})

// this attribute will be test by e2e
// describe('Input[autoSelect]', () => {
//   const defaultValue = 'Hello'
//   const wrapper = mount(<Input delay={0} defaultValue={defaultValue} autoSelect />)
//   wrapper.find('input').simulate('focus')
//   wrapper.find('input').simulate('keypress', { keyCode: 8 })
//   expect(wrapper.find('input').getDOMNode().value).toBe('')
// })

describe('Input[clearToUndefined]', () => {
  test('should clear value and set as undefined', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Input
        delay={0}
        clearable
        clearToUndefined
        onChange={onChange}
        defaultValue="Hello"
        placeholder="input something"
      />
    )
    expect(wrapper.find('input').getDOMNode().value).toBe('Hello')
    wrapper.find(`.${SO_PREFIX}-input-clear-wrapper`).simulate('mousedown')
    wrapper.update()
    expect(onChange).toBeCalled()
    expect(onChange.mock.calls[0][0]).toBe(undefined)
  })
})

describe('Input[coin]', () => {
  test('should set coin when type is number', () => {
    const wrapper = mount(<Input coin type="number" />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '1000',
      },
    })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('1,000')
  })
})

describe('Input[defaultValue]', () => {
  test('should set defaultValue', () => {
    const wrapper = mount(<Input defaultValue="Hello" />)
    expect(wrapper.find('input').getDOMNode().value).toBe('Hello')
  })
})

describe('Input[delay]', () => {
  test('should set delay when onChange', () => {
    jest.useFakeTimers()
    const delay = 2000
    const onChange = jest.fn()
    const wrapper = mount(<Input delay={delay} onChange={onChange} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '1000',
      },
    })
    jest.advanceTimersByTime(500)
    expect(onChange).not.toHaveBeenCalled()
    jest.advanceTimersByTime(delay - 500)
    expect(onChange).toHaveBeenCalled()
    jest.runAllTimers()
  })
})

// describe('Input[forwardedRef]', () => {
//   test('should get input element', () => {
//     const wrapper = mount(<Input />)
//   })
// })

describe('Input[htmlName]', () => {
  test('should set htmlName', () => {
    const htmlName = 'shineout'
    const wrapper = mount(<Input htmlName={htmlName} />)
    expect(wrapper.find('input').getDOMNode().name).toBe(htmlName)
  })
})

describe('Input[info]', () => {
  test('should set default info', () => {
    const infoText = '1234567890'
    const info = infoText.length
    const wrapper = mount(<Input info={info} defaultValue={infoText} />)
    expect(wrapper.find(`.${SO_PREFIX}-input-tip`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-input-tip`).text()).toBe(`${infoText.length} / ${info}`)
  })

  test('should set default info error', () => {
    const infoText = '1234567890'
    const info = infoText.length - 1
    const wrapper = mount(<Input info={info} defaultValue={infoText} />)
    expect(wrapper.find(`.${SO_PREFIX}-input-error`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-input-error`).text()).toBe(`${infoText.length} / ${info}`)
  })

  test('should set custom info', () => {
    const infoText = 'shineout'
    const info = () => <div>{infoText}</div>
    const wrapper = mount(<Input info={info} />)
    expect(wrapper.find(`.${SO_PREFIX}-input-tip`).length).toBe(1)
    expect(wrapper.find(`.${SO_PREFIX}-input-tip > div`).text()).toBe(infoText)
  })
})

// this attribute will be test by e2e
// describe('Input[maxLength]', () => {})

describe('Input[onBlur]', () => {
  test('should trigger onBlur', () => {
    const onBlur = jest.fn()
    const wrapper = mount(<Input onBlur={onBlur} />)
    wrapper.find('input').simulate('focus')
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(onBlur).toBeCalled()
  })
})

describe('Input[onChange]', () => {
  test('should trigger onChange', () => {
    const value = 'shineout'
    const onChange = jest.fn()
    const wrapper = mount(<Input delay={0} onChange={onChange} />)
    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    })
    wrapper.update()
    expect(onChange).toBeCalled()
    expect(onChange.mock.calls[0][0]).toBe(value)
  })
})

describe('Input[onEnterPress]', async () => {
  test('should onEnterPress', () => {
    const onEnterPress = jest.fn()
    const wrapper = mount(<Input delay={0} onEnterPress={onEnterPress} />)
    wrapper.find('input').simulate('keydown', { keyCode: 13, target: { value: '1' } })
    wrapper.find('input').simulate('keyup', { keyCode: 13, target: { value: '1' } })
    expect(onEnterPress).toBeCalled()
  })
})

describe('Input[onKeyDown]', () => {
  test('should onKeyDown', () => {
    const onKeyDown = jest.fn()
    const wrapper = mount(<Input delay={0} onKeyDown={onKeyDown} />)
    wrapper.find('input').simulate('keydown')
    expect(onKeyDown).toBeCalled()
  })
})

// this attribute will be test by e2e
describe('Input[onKeyUp]', () => {
  test('should onKeyUp', () => {
    const onKeyUp = jest.fn()
    const wrapper = mount(<Input delay={0} onKeyUp={onKeyUp} />)
    wrapper.find('input').simulate('keyup')
    expect(onKeyUp).toBeCalled()
  })
})

describe('Input[popover]', () => {
  test('should set the position of popover', () => {
    const popover = ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']
    popover.forEach(i => {
      const wrapper = mount(<Input delay={0} placeholder="email" tip="popover" popover={i} />)
      expect(wrapper.find(`.${SO_PREFIX}-input-tip`).length).toBe(0)
      wrapper.find('input').simulate('focus')
      wrapper.find('input').simulate('blur')
      setTimeout(() => {
        wrapper.update()
        expect(wrapper.find(`.${SO_PREFIX}-popover-${i}`).length).toBe(1)
      })
    })
  })
})

describe('Input[base]', () => {
  test('should custom style and className', () => {
    baseTest(Input, `.${SO_PREFIX}-input`)
  })
})

describe('Input[trim]', () => {
  test('should set trim', () => {
    const wrapper = mount(<Input trim />)
    wrapper.find('input').simulate('change', {
      target: {
        value: 'shineout  ',
      },
    })
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('shineout')
  })
})

describe('Input[type]', () => {
  test('should set type', () => {
    const type = ['text', 'number', 'password']
    type.forEach(i => {
      const wrapper = mount(<Input delay={0} type={i} />)

      if (i === 'number') {
        wrapper.find('input').simulate('change', {
          target: {
            value: 'abc',
          },
        })
        wrapper.update()
        expect(wrapper.find('input').getDOMNode().value).toBe('')
        wrapper.find('input').simulate('change', {
          target: {
            value: '123',
          },
        })
        wrapper.update()
        expect(wrapper.find('input').getDOMNode().value).toBe('123')
      } else {
        expect(wrapper.find('input').getDOMNode().type).toBe(i)
      }
    })
  })
})

describe('Input[underline]', () => {
  test('should set underline', () => {
    const wrapper = mount(<Input underline />)
    expect(wrapper.find(`.${SO_PREFIX}-input`).hasClass(`${SO_PREFIX}-input-underline`)).toBeTruthy()
  })
})

describe('Input.Number[allowNull]', () => {
  test('should set allowNull', () => {
    const wrapper = mount(<Input.Number allowNull />)
    wrapper.find('input').simulate('focus')
    wrapper.update()
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('')
  })
})

describe('Input.Number[coin]', () => {
  test('should set coin', () => {
    const wrapper = mount(<Input.Number coin />)
    wrapper.find('input').simulate('change', {
      target: {
        value: '1000',
      },
    })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe('1,000')
  })
})

describe('Input.Number[hideArrow]', () => {
  test('should set hideArrow', () => {
    const wrapper = mount(<Input.Number hideArrow />)
    expect(wrapper.find(`.${SO_PREFIX}-input-number-up`).length).toBe(0)
    expect(wrapper.find(`.${SO_PREFIX}-input-number-down`).length).toBe(0)
  })
})

describe('Input.Number[max/min]', () => {
  test('should set max/min', () => {
    const min = 100
    const max = 200
    const wrapper = mount(<Input.Number delay={0} min={min} max={max} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: String(min - 1),
      },
    })
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(String(min))

    wrapper.find('input').simulate('change', {
      target: {
        value: String(max + 1),
      },
    })
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(String(max))
  })
})

describe('Input.Number[step]', () => {
  test('should set step', () => {
    const step = 10
    const wrapper = mount(<Input.Number delay={0} step={step} />)
    wrapper.find(`.${SO_PREFIX}-input-number-up`).simulate('click')
    wrapper.update()
    setTimeout(() => {
      expect(wrapper.find('input').getDOMNode().value).toBe(String(step))
    })
  })
})

describe('Input.Password[point]', () => {
  test('should set step', () => {
    const point = '*'
    const password = '123456'
    const result = Array.from({ length: password.length })
      .map(() => point)
      .reduce((a, b) => a + b)

    const wrapper = mount(<Input.Password delay={0} point={point} />)
    wrapper.find('input').simulate('change', {
      target: {
        value: password,
      },
    })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(result)
  })
})

describe('Input.Number[digits]', () => {
  test('should set Input.Number digits', () => {
    const digits = 2
    const value = '1.234'
    const wrapper = mount(<Input.Number delay={0} digits={digits} />)
    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(Number(value).toFixed(digits))
  })

  test('should set Input.Number digits when numType is non-negative', () => {
    const digits = 2
    const value = '1.234'
    const wrapper = mount(<Input.Number delay={0} digits={digits} defaultValue="1" numType="non-negative" />)
    wrapper.find('input').simulate('change', {
      target: {
        value,
      },
    })
    wrapper.find('input').simulate('blur')
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(Number(value).toFixed(digits))
  })
})

describe('Input.Number[onKeyDown]', () => {
  test('onKeyDown should be simulated when keyCode equal 38 or 40', () => {
    const onKeyDown = jest.fn()
    const defaultValue = 2
    const wrapper = mount(<Input.Number delay={0} defaultValue={defaultValue} onKeyDown={onKeyDown} />)
    wrapper.find('input').simulate('keydown', { keyCode: 38 })
    wrapper.find('input').simulate('keyup', { keyCode: 38 })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(String(defaultValue + 1))
  })

  test('onKeyDown should be simulated when keyCode equal 40', () => {
    const defaultValue = 2
    const wrapper = mount(<Input.Number delay={0} defaultValue={defaultValue} />)
    wrapper.find('input').simulate('keydown', { keyCode: 40 })
    wrapper.find('input').simulate('keyup', { keyCode: 40 })
    wrapper.update()
    expect(wrapper.find('input').getDOMNode().value).toBe(String(defaultValue - 1))
  })
})

describe('Input.Number[onMouseUp]', () => {
  test('mouseDown should be simulated', () => {
    const mouseDown = jest.fn()
    const wrapper = mount(<Input.Number onMouseDown={mouseDown} />)
    const label = wrapper.find(`label.${SO_PREFIX}-input`)
    expect(label.find(`.${SO_PREFIX}-input-number-up`).length).toBe(1)
    expect(label.find(`.${SO_PREFIX}-input-number-down`).length).toBe(1)

    label.find(`.${SO_PREFIX}-input-number-down`).simulate('mousedown')

    expect(mouseDown).toBeCalled()
  })

  test('mouseUp should be simulated', () => {
    const mouseUp = jest.fn()
    const wrapper = mount(<Input.Number onMouseUp={mouseUp} />)
    const label = wrapper.find(`label.${SO_PREFIX}-input`)
    expect(label.find(`.${SO_PREFIX}-input-number-up`).length).toBe(1)
    expect(label.find(`.${SO_PREFIX}-input-number-down`).length).toBe(1)

    label.find(`.${SO_PREFIX}-input-number-up`).simulate('mouseup')

    expect(mouseUp).toBeCalled()
  })
})

describe('Input.Number[clearToUndefined]', () => {
  test('should clear value and set as undefined', () => {
    const onChange = jest.fn()
    const wrapper = mount(
      <Input.Number
        delay={0}
        clearable
        clearToUndefined
        onChange={onChange}
        defaultValue={NaN}
        placeholder="input something"
      />
    )

    wrapper.find(`.${SO_PREFIX}-input-clear-wrapper`).simulate('mousedown')
    wrapper.find(`input`).simulate('blur')
    wrapper.update()
    expect(onChange).toBeCalled()
    expect(onChange.mock.calls[0][0]).toBe(undefined)
  })
})

describe('Input.Number[unMount]', () => {
  test('should unMount', () => {
    // eslint-disable-next-line react/prefer-stateless-function
    class Component extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          show: true,
        }
      }

      render() {
        return this.state.show && <Input.Number />
      }
    }
    const wrapper = mount(<Component />)
    expect(wrapper.find(`.${SO_PREFIX}-input`).length).toBe(1)
    wrapper.setState({ show: false })
    expect(wrapper.find(`.${SO_PREFIX}-input`).length).toBe(0)
  })
})
