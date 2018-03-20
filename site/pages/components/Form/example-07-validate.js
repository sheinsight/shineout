/**
 * cn - 校验
 *    -- 通过 rules 校验
 * en - Validate
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'

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
  age: [
    { required: true, message: 'Please enter age.' },
    { min: 18, max: 60, message: 'Age must between {min} and {max}.' },
  ],
  colors: [
    { required: true, message: 'Please select your favorite colors.' },
    { min: 2, message: 'At least select 2 colors.' },
  ],
}

export default function () {
  return (
    <Form style={{ maxWidth: 500 }} rules={rules} onSubmit={d => console.log(d)}>
      <Form.Item required label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item required label="Password" tip="Use at least one letter, one numeral, and seven characters.">
        <Input name="password" type="password" />
      </Form.Item>

      <Form.Item required label="Age" tip="between 18 and 60">
        <Input name="age" digits={0} style={{ width: 100 }} type="number" />
      </Form.Item>

      <Form.Item required label="Favorite Colors" tip="select your favorite colors">
        <Checkbox.Group name="colors" data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
      </Form.Item>

      <Form.Item label="">
        <Form.Button>Sumbit</Form.Button>
      </Form.Item>
    </Form>
  )
}
