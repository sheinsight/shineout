/**
 * cn - 标签 \n 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式
 * en - Label
 */
import React from 'react'
import { Form, Input } from 'shineout'

export default function () {
  return (
    <Form labelWidth={200} labelAlign="right" style={{ maxWidth: 500 }}>
      <Form.Item required label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item required label="Password">
        <Input name="password" type="password" />
      </Form.Item>

      <Form.Item>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  )
}
