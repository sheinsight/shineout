/**
 * cn - 基本用法
 * en - Base
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Textarea } from 'shineout'

export default class extends PureComponent {
  initValue = {
    email: 'test@example.com',
    age: 18,
  }

  render() {
    return (
      <Form value={this.initValue} onSubmit={(data) => { console.log(data) }}>
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

        <Form.Item label="Description">
          <Textarea name="desc" autosize />
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
