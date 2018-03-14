/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'

const initData = {
  email: 'test@example.com',
  age: 18,
}

const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
  return (
    <Form data={initData} style={{ maxWidth: 500 }} onSubmit={(data) => { console.log(data) }}>
      <Form.Item required label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item required label="Password">
        <Input name="password" type="password" />
      </Form.Item>

      <Form.Item label="Name">
        <Input.Group style={{ width: 300 }}>
          <Input name="firstName" placeholder="First Name" />
          -
          <Input name="lastName" placeholder="Last Name" />
        </Input.Group>
      </Form.Item>

      <Form.Item label="Age">
        <Input style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
      </Form.Item>

      <Form.Item label="Favorite Color">
        <Checkbox.Group name="favoriteColor" data={colors} />
      </Form.Item>

      <Form.Item>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
