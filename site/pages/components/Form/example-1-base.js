/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Form, Input } from 'shineout'

export default function () {
  return (
    <Form onSubmit={(data) => { console.log(data) }}>
      <Form.Item label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item label="Password">
        <Input name="password" type="password" />
      </Form.Item>

      <Form.Item>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
