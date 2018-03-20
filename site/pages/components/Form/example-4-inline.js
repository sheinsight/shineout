/**
 * cn - 水平布局
 * en - Inline
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'

export default function () {
  return (
    <Form inline>
      <Form.Item label="Email">
        <Input name="email" />
      </Form.Item>

      <Input name="password" placeholder="Password" type="password" />

      <Checkbox name="remember">Remember</Checkbox>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  )
}
