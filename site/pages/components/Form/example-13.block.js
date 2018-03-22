/**
 * cn - 嵌套数据
 * en - Block
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox } from 'shineout'

export default class extends PureComponent {
  initValue = {
    email: 'test@example.com',
    user: {
      name: {
        firstName: 'Harry',
        lastName: 'Potter',
      },
      age: 18,
    },
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

        <Form.Block name="user">
          <Form.Item label="Name">
            <Form.Block name="name">
              <Input.Group style={{ width: 300 }}>
                <Input name="firstName" placeholder="First Name" />
                -
                <Input name="lastName" placeholder="Last Name" />
              </Input.Group>
            </Form.Block>
          </Form.Item>

          <Form.Item label="Age">
            <Input style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
          </Form.Item>
        </Form.Block>

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
}
