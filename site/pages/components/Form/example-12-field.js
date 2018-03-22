/**
 * cn - 自定义组件
 *    -- 支持 value 和 onChange 的自定义组件可以放在 Form.Field 中。
 * en - Field
 */
import React from 'react'
import { Form } from 'shineout'

const rules = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
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

// eslint-disable-next-line
function Input({ value = '', error, ...props }) {
  const style = { border: `solid 1px ${error ? 'red' : '#ccc'}`, outline: 'none' }
  return <input style={style} value={value} {...props} />
}

export default function () {
  return (
    <Form rules={rules} style={{ maxWidth: 500 }} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Form.Field defaultValue="test@email.com" name="email">
          <Input type="text" />
        </Form.Field>
      </Form.Item>

      <Form.Item required label="Password" tip="Use at least one letter, one numeral, and seven characters.">
        <Form.Field name="password">
          <Input type="password" />
        </Form.Field>
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  )
}
