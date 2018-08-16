/**
 * cn - 水平布局
 *    -- 设置 inline 属性使 Form 变为水平布局
 * en - Inline
 *    -- Set the inline to true make the Form horizontal.
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
}

export default function () {
  return (
    <Form inline rules={rules}>
      <Form.Item label="Email">
        <Input name="email" />
      </Form.Item>

      <Input name="password" placeholder="Password" popover="bottom-left" type="password" />

      <Checkbox name="remember">Remember</Checkbox>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  )
}
