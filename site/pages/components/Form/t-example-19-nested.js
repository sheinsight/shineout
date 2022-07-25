/**
 * cn -
 *    -- 更简单的处理多级嵌套数据的方法，在 name 中用 . 分隔字段名称。
 * en -
 *    -- A simpler way to handle multi-level nested data is to separate the field names in name with '.' .
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Rule } from 'shineout'

export default class extends PureComponent {
  initValue = {
    email: 'test@example.com',
    account: {
      name: {
        firstName: 'Harry',
        lastName: 'Potter',
      },
      age: 18,
    },
    extra: {
      favoriteColor: ['cyan', 'yellow'],
    },
  }

  rules = new Rule()

  render() {
    return (
      <Form
        value={this.initValue}
        onSubmit={data => {
          console.log(data)
        }}
      >
        <Form.Item label="Email">
          <Input name="email" />
        </Form.Item>

        <Form.Item label="Password">
          <Input name="password" type="password" />
        </Form.Item>

        <Form.Item label="Account Name">
          <Input.Group style={{ width: 300 }}>
            <Input name="account.name.firstName" placeholder="First Name" />
            -
            <Input name="account.name.lastName" placeholder="Last Name" />
          </Input.Group>
        </Form.Item>

        <Form.Item label="Account Age" required>
          <Input
            style={{ width: 100 }}
            rules={[this.rules.required]}
            name="account.age"
            type="number"
            digits={0}
            defaultValue={0}
          />
        </Form.Item>

        <Form.Item label="Favorite Color">
          <Checkbox.Group
            name="extra.favoriteColor"
            keygen
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
