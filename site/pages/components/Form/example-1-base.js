/**
 * cn - 基本用法
 * en - Base
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox } from 'shineout'

export default class extends PureComponent {
  initData = {
    email: 'test@example.com',
    age: 18,
  }

  render() {
    return (
      <Form data={this.initData} onSubmit={(data) => { console.log(data) }}>
        <Form.Item required label="Email">
          <Input required name="email" />
        </Form.Item>

        <Form.Item required label="Password">
          <Input required name="password" type="password" />
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
          <Checkbox.Group name="favoriteColor" data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
        </Form.Item>

        <Form.Item>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
