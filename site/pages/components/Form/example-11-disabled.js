/**
 * cn - 禁用
 *    -- 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时
 * en - disabled
 */
import React from 'react'
import { Form, Input, Checkbox } from 'shineout'

export default function () {
  return (
    <Form disabled>
      <Form.Item label="Email">
        <Input name="email" />
      </Form.Item>

      <Form.Item label="Password">
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
        <Checkbox.Group
          name="favoriteColor"
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
        />
      </Form.Item>

      <Form.Item label="">
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  )
}
