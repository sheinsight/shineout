import React from 'react'
import { Form, Input } from 'shineout'

export default function () {
  return (
    <Form labelAlign="top" style={{ maxWidth: 300 }}>
      <Form.Item required label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item required label="Password">
        <Input name="password" type="password" />
      </Form.Item>

      <Form.Submit>Submit</Form.Submit>
    </Form>
  )
}
