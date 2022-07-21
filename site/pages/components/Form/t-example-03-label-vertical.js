/**
 * cn -
 *    -- 当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式
 * en -
 *    -- Use labelVerticalAlign to control vertical alignment when there is a line break in the label text
 */
import React from 'react'
import { Form, Input } from 'shineout'

export default function() {
  return (
    <Form labelWidth={100} labelVerticalAlign="middle" style={{ maxWidth: 300 }}>
      <Form.Item label="Your Email Address">
        <Input name="email" />
      </Form.Item>

      <Form.Item label="Password">
        <Input name="password" type="password" />
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  )
}
