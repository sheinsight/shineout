/**
 * cn - 表单块 (旧)
 *    -- <b>Form.Block已不推荐，建议使用 FieldSet</b>
 *    -- Block 类似 Form，可以存取数据，只是没有 Submit 能力。一般用在 Form 中处理复杂数据。
 *    -- Block 内组件设置的 name 只在这个 Block 内有效，只能存取 Block 的 value 中的数据，不能存取 Form 的数据。
 * en - Block (Out of date)
 *    -- <b>Not recommend, use FieldSet instead.</b>
 *    -- Block is similar to Form except submit
 *    -- The name set in the Block component is valid only in this block. It can only access the data in the value of instead of the Form.
 */
import React, { PureComponent } from 'react'
import { Form, Input } from 'shineout'

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.rules = {
      password: [
        { required: true, message: 'Please enter password.' },
        { min: 7, message: 'Password must be at least {min} characters.' },
        { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
        (value, formdata, callback) => {
          if (/\d+/.test(value)) callback(true)
          else callback(new Error('Password at least has one numeral.'))
        },
      ],
    }

    this.colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']
  }

  render() {
    return (
      <div>
        <Form.Block value={{ email: 'test@example.com' }} onChange={d => console.log(d)}>
          <Form.Item label="Email">
            <Input name="email" />
          </Form.Item>

          <Form.Item label="Password" tip="Use at least one letter, one numeral, and seven characters.">
            <Input rules={this.rules.password} name="password" type="password" />
          </Form.Item>
        </Form.Block>
      </div>
    )
  }
}
