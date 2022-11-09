import enzyme, { mount } from 'enzyme'
import React from 'react'
import { Button, Form, Input, Select, Rule } from 'shineout'
import { delay } from '../../utils'
import InputField from '../../../site/pages/components/Form/example-12-field'
import InputBindValidate from '../../../site/pages/components/Form/example-08-x-validate-bind'
import FormMode from '../../../site/pages/components/Form/example-21-mode'
import exampleText from '../../example'

class F extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        a: '1',
        test: 'hello',
      },
      show: true,
      input: true,
    }
  }

  render() {
    const { show, value, input } = this.state

    return (
      <div>
        <Button onClick={() => this.setState({ show: false, value: { b: 'c' } })}>hidden</Button>
        <Button onClick={() => this.setState({ input: false })}>hidden</Button>
        {show && (
          // eslint-disable-next-line react/prop-types
          <Form value={value} onChange={this.props.onChange}>
            {input && <Input name="test" />}
          </Form>
        )}
      </div>
    )
  }
}

describe('Form[snapshot]', () => {
  exampleText('Form', { ignore: ['example-01-base', 'example-20-array'] })
})

describe('Form[Base]', () => {
  jest.useFakeTimers()
  test('should change with value', () => {
    const fn = jest.fn()
    const wrapper = enzyme.mount(<F onChange={fn} />)
    wrapper
      .find('button')
      .at(1)
      .simulate('click')
    wrapper.update()
    jest.runAllTimers()
    expect(fn).toBeCalledWith({ a: '1' })
  })
})

// 静态属性（无交互）
describe('Form[classname, style, inline, labelAlign, labelVerticalAlign, labelWidth]', () => {
  const props = {
    className: 'custom',
    style: { color: 'red' },
  }
  const wrapper = mount(
    <Form {...props}>
      <Form.Item label="姓名">
        <Input name="name" />
      </Form.Item>
      <Form.Item label="姓名2">
        <Input name="name2" />
      </Form.Item>
    </Form>
  )

  it('should render classname style', () => {
    expect(wrapper.find('.so-form').hasClass(props.className)).toBeTruthy()
    expect((wrapper.find('.so-form').getDOMNode().style.color = props.style.color)).toBeTruthy()
  })

  it('should render inline item', () => {
    expect(wrapper.find('.so-form').hasClass('so-form-inline')).toBeFalsy()
    wrapper.setProps({ inline: true })
    wrapper.update()
    expect(wrapper.find('.so-form').hasClass('so-form-inline')).toBeTruthy()
  })

  it('should render labelAlign', () => {
    wrapper.setProps({ labelAlign: 'left' })
    wrapper.update()
    expect(
      wrapper
        .find('.so-form-item')
        .first()
        .hasClass('so-form-label-align-left')
    ).toBeTruthy()
    wrapper.setProps({ labelAlign: 'top' })
    wrapper.update()
    expect(
      wrapper
        .find('.so-form-item')
        .first()
        .hasClass('so-form-label-align-top')
    ).toBeTruthy()
  })

  it('should render labelVerticalAlign labelWidth', () => {
    ;['top', 'middle', 'bottom'].forEach(type => {
      wrapper.setProps({
        inline: true,
        labelVerticalAlign: type,
        labelWidth: 200,
      })
      wrapper.update()
      const item = wrapper.find('.so-form-item').first()
      expect(item.hasClass(`so-form-label-vertical-align-${type}`))
      expect((item.find('.so-form-label').getDOMNode().style.width = '200px'))
    })
  })
})

// value 相关

describe('defaultValue, value, onChange, onReset, onSubmit', () => {
  const onChange = jest.fn()
  const onReset = jest.fn()
  const onSubmit = jest.fn()
  const wrapper = mount(
    <Form defaultValue={{ name: 'leo' }} onChange={onChange} onReset={onReset} onSubmit={onSubmit}>
      <Form.Item label="姓名">
        <Input name="name" rules={[{ required: true, message: '必填' }]} />
      </Form.Item>
      <Form.Submit>提交</Form.Submit>
      <Form.Reset>重置</Form.Reset>
    </Form>
  )
  it('should defaultValue', () => {
    expect(wrapper.find('Input').prop('value')).toBe('leo')
  })
  it('should  onchange', () => {
    jest.useFakeTimers()
    wrapper.find('input').simulate('change', { target: { value: 'shein' } })
    jest.runAllTimers()
    wrapper.update()
    expect(JSON.stringify(onChange.mock.calls[0][0])).toBe(JSON.stringify({ name: 'shein' }))
  })

  it('should  reset', () => {
    jest.useFakeTimers()
    // wrapper.find('button[type="reset"]').simulate('submit')
    wrapper.find('form').simulate('reset')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('Input').prop('value')).toBe('leo')
    expect(onReset).toBeCalledTimes(1)
  })

  it('should submit and throttle 1000', async () => {
    jest.useRealTimers()
    wrapper
      .find('Form')
      .instance()
      .handleSubmit()
    await delay(20)
    expect(JSON.stringify(onSubmit.mock.calls[0][0])).toBe(JSON.stringify({ name: 'leo' }))
    // 连续提交会被阻断
    wrapper
      .find('Form')
      .instance()
      .handleSubmit()
    await delay(20)
    expect(onSubmit.mock.calls.length).toBe(1)

    // 默认阻断时间为1s
    await delay(1000)
    wrapper
      .find('Form')
      .instance()
      .handleSubmit()
    await delay(20)
    expect(onSubmit.mock.calls.length).toBe(2)
  })

  it('should value', () => {
    jest.useFakeTimers()
    wrapper.setProps({ value: { name: 'monday' } })
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('Input').prop('value')).toBe('monday')
  })
})

describe('Form[initValidate, keepErrorHeight, onError, rule]', () => {
  const onError = jest.fn()
  const wrapper = mount(
    <Form onError={onError} keepErrorHeight initValidate rules={{ name: [{ max: 3, message: '最长3个字符' }] }}>
      <Form.Item label="姓名">
        <Input name="name" />
      </Form.Item>
      <Form.Button>提交</Form.Button>
      <Form.Reset>重置</Form.Reset>
    </Form>
  )
  // it('should initValidate rule onerror', async () => {
  //   jest.useRealTimers()
  //   wrapper.setProps({ ...wrapper.props(), value: { name: '6666' }, initValidate: true })
  //   await delay(200)
  //   wrapper.update()
  //   expect(wrapper.find('.so-input-invalid').length).toBe(1)
  //   wrapper.setProps({ ...wrapper.props(), value: { name: 'leo' } })
  //   await delay(200)
  //   wrapper.update()
  //   expect(wrapper.find('.so-input-invalid').length).toBe(0)
  // })
  // it('should keepErrorHeight', () => {
  //   expect(wrapper.find('.so-form-item-keep-height').length).toBe(1)
  // })
  it('should call onError when error', async () => {
    jest.useRealTimers()
    wrapper.find('input').simulate('change', { target: { value: '6666' } })
    await delay(500)
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(1)
    wrapper
      .find('button')
      .at(0)
      .simulate('click')
    await delay(200)
    expect(onError.mock.calls.length).toBe(1)
  })
})

describe('removeUndefined', () => {
  const fn = jest.fn()
  const wrapper = mount(
    <Form removeUndefined={false} defaultValue={{ color: 'red' }} onChange={fn}>
      <Form.Item label="姓名">
        <Select keygen name="color" data={['red', 'yellow']} clearable />
      </Form.Item>
    </Form>
  )

  it('should remove undefined', () => {
    wrapper.find('.so-select-close').simulate('click')
    wrapper.update()
    expect(wrapper.find('Select').prop('value')).toBe(undefined)
    expect(Object.keys(fn.mock.calls[0][0])[0]).toBe('color')
  })
})

describe('useMode', () => {
  const wrapper = mount(<FormMode />)
  it('should default createMode', () => {
    expect(wrapper.find('.so-input-disabled').length).toBe(1)
  })
  it('should change mode', async () => {
    jest.useRealTimers()
    wrapper
      .find('input[type="radio"]')
      .at(0)
      .simulate('change', { target: { checked: true } })
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-input-disabled').length).toBe(0)
    wrapper
      .find('input[type="radio"]')
      .at(2)
      .simulate('change', { target: { checked: true } })
    await delay(200)
    expect(wrapper.find('.so-form').text()).toBe('Ops...')
  })
})

describe('Form.Item', () => {
  it('should label labelAlign labelWidth required keepErrorHeight', () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="姓名" labelWidth={200} labelAlign="left" required keepErrorHeight>
          <Input name="name" required />
        </Form.Item>
      </Form>
    )
    expect(wrapper.find('.so-form-item').hasClass('so-form-item-keep-height')).toBeTruthy()
    expect(wrapper.find('.so-form-item').hasClass('so-form-required')).toBeTruthy()
    expect(wrapper.find('.so-form-item').hasClass('so-form-label-align-left')).toBeTruthy()
    expect((wrapper.find('.so-form-label').getDOMNode().style.width = '200px'))
  })

  it('should render tip', async () => {
    const wrapper = mount(
      <Form>
        <Form.Item label="姓名" tip="二舅" required>
          <Input name="name" rules={[{ required: true, message: '必填' }]} />
        </Form.Item>
      </Form>
    )
    expect(wrapper.find('.so-form-tip').text()).toBe('二舅')
    // 当有error的时候不展示
    jest.useRealTimers()
    wrapper
      .find('Form')
      .instance()
      .handleSubmit()
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-form-tip').length).toBe(0)
  })
})

describe('Form.Field', () => {
  // eslint-disable-next-line react/prop-types

  it('should bind value and validate', () => {
    const wrapper = mount(<InputField />)
    // default value check
    expect(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode()
        .getAttribute('value')
    ).toBe('test@email.com')
    // change value
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'aa' } })
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bb' } })
    const datum = wrapper.find('Form').prop('datum')
    expect(datum.getValue().email).toBe('aa')
    expect(datum.getValue().password).toBe('bb')

    // rule effect
    expect(
      (wrapper
        .find('input')
        .at(0)
        .getDOMNode().style.border = '1px solid red')
    )
    expect(
      (wrapper
        .find('input')
        .at(1)
        .getDOMNode().style.border = '1px solid red')
    )
  })
})

describe('Form[Bind validate]', () => {
  const wrapper = mount(<InputBindValidate />)
  it('should bind validate', async () => {
    jest.useRealTimers()
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: '123456' } })
    await delay(500)
    wrapper.update()
    expect(
      wrapper
        .find('.so-form-item')
        .at(1)
        .find('.so-form-error').length
    ).toBe(1)
  })
})

describe('Form[FieldSet]', () => {
  it('should render object and error', async () => {
    const change = jest.fn()
    const submit = jest.fn()
    const wrapper = mount(
      <Form onChange={change} onSubmit={submit}>
        <Form.Item label="姓名">
          <Form.FieldSet
            name="name"
            rules={[
              (value, formData, cb) => {
                if (!(value && value.last && value.first)) {
                  cb(new Error('请填写完整姓名'))
                } else {
                  cb(true)
                }
              },
            ]}
          >
            <Form.Item label="firstName">
              <Input name="first" rules={[{ max: 2, message: 'max2' }]} />
            </Form.Item>
            <Form.Item label="lastName">
              <Input name="last" />
            </Form.Item>
          </Form.FieldSet>
        </Form.Item>
      </Form>
    )
    jest.useRealTimers()
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'leo' } })
    await delay(500)
    wrapper.update()
    expect(change.mock.calls.length).toBe(1)
    expect(change.mock.calls[0][0].name.first).toBe('leo')
    expect(wrapper.find('.so-form-error').length).toBe(2)

    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'chen' } })
    await delay(500)
    wrapper.update()
    expect(change.mock.calls.length).toBe(2)
    expect(change.mock.calls[1][0].name.last).toBe('chen')
    expect(wrapper.find('.so-form-error').length).toBe(1)
  })
  it('should render loop', async () => {
    jest.useFakeTimers()
    const change = jest.fn()
    const submit = jest.fn()
    const isExist = (values, _, callback) => {
      const result = []
      const valueMap = {}
      values.forEach(({ name }, i) => {
        if (!name) return
        if (valueMap[name]) result[i] = { name: new Error(`Name "${name}" is existed.`) }
        else valueMap[name] = true
      })
      callback(result.length > 0 ? result : true)
    }
    const rules = Rule({ isExist })
    const wrapper = mount(
      <Form onChange={change} onSubmit={submit}>
        <Form.Item label="姓名">
          <Form.Item label="Friends">
            <Form.FieldSet
              name="friends"
              empty={onAppend => (
                <Button key="empty" onClick={() => onAppend({ name: '' })}>
                  Add new friend
                </Button>
              )}
              rules={[rules.min(2), rules.isExist]}
              defaultValue={[{ name: 'Hermione Granger', age: 18 }, {}]}
            >
              {({ onAppend, onRemove }) => (
                <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                  <Input
                    name="name"
                    placeholder="Name"
                    title="Friend name"
                    rules={[rules.required]}
                    style={{ width: 180, marginInlineEnd: 8 }}
                  />
                  <Input
                    name="age"
                    type="number"
                    placeholder="Age"
                    title="Friend age"
                    style={{ width: 60 }}
                    rules={[rules.min(18)]}
                  />
                  <a style={{ margin: '0 12px' }} className="add" onClick={() => onAppend({ age: 16 })}>
                    +
                  </a>
                  <a onClick={onRemove} className="minus">
                    -
                  </a>
                </Form.Item>
              )}
            </Form.FieldSet>
          </Form.Item>
        </Form.Item>
        <Form.Button>提交</Form.Button>
      </Form>
    )
    expect(change.mock.calls.length).toBe(1)
    // 点击添加按钮
    wrapper
      .find('a.add')
      .last()
      .simulate('click')
    expect(change.mock.calls.length).toBe(2)
    expect(change.mock.calls[1][0].friends.length).toBe(3)
    // 删除最后一个
    wrapper
      .find('a.minus')
      .last()
      .simulate('click')
    expect(change.mock.calls.length).toBe(3)
    expect(change.mock.calls[2][0].friends.length).toBe(2)

    // 编辑第二列
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'leo' } })
    wrapper
      .find('input')
      .at(3)
      .simulate('change', { target: { value: '20' } })
    jest.runAllTimers()
    // 提交
    wrapper.find('button').simulate('click')
    jest.runAllTimers()
    jest.useRealTimers()
    await delay(200)
    wrapper.update()
    expect(submit.mock.calls.length).toBe(1)
  })
})

describe('Form[formRef]', () => {
  let ref = null
  const fn = f => {
    ref = f
  }
  const onSubmit = jest.fn()
  const rules = Rule()
  const wrapper = mount(
    <Form defaultValue={{ name: 'leo' }} formRef={fn} onSubmit={onSubmit}>
      <Form.Item label="name">
        <Input name="name" rules={[rules.required]} />
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password name="password" type="password" rules={[rules.required]} />
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
  it('should getvalue', () => {
    expect(ref.getValue().name).toBe('leo')
  })
  it('should valid', async () => {
    jest.useRealTimers()
    ref.validate().catch(() => {})
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(1)
  })

  it('should reset', async () => {
    jest.useRealTimers()
    ref.reset()
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(0)
  })

  it('should validFields', async () => {
    jest.useRealTimers()
    ref.validateFields(['name'])
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(0)

    ref.validateFields(['password'])
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(1)
  })

  it('should validFieldsWidthError', async () => {
    jest.useRealTimers()
    ref.reset()
    await delay(200)
    wrapper.update()
    ref.validateFieldsWithError(['password']).catch(e => {
      const msg = e.message
      expect(msg).toBe('Please enter ')
    })
  })

  it('should clearValid and submit', async () => {
    jest.useRealTimers()
    // submit 触发校验
    ref.submit()
    await delay(200)
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(1)

    // clearValidate 手动清除校验
    ref.clearValidate()
    wrapper.update()
    expect(wrapper.find('.so-input-invalid').length).toBe(0)

    // 输入文本满足检验 submit
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: '123456' } })
    await delay(1000)
    wrapper.update()
    ref.submit()
    await delay(10)
    expect(wrapper.find('.so-input-invalid').length).toBe(0)
    expect(onSubmit.mock.calls.length).toBe(1)
  })
})
