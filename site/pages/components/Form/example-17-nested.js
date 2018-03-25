/**
 * cn - 嵌套数据
 *    -- Form.Block 配合 Form.Field 使用，可以处理多层嵌套数据
 * en - Nested data
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox } from 'shineout'

// eslint-disable-next-line
const Account = ({ value, onChange }) => (
  <Form.Block labelWidth={50} value={value} onChange={onChange}>
    <Form.Item label="Name">
      <Form.Field name="name">
        {
          props => (
            <Form.Block {...props}>
              <Input.Group style={{ width: 300 }}>
                <Input name="firstName" placeholder="First Name" />
                -
                <Input name="lastName" placeholder="Last Name" />
              </Input.Group>
            </Form.Block>
          )
        }
      </Form.Field>
    </Form.Item>

    <Form.Item label="Age">
      <Input style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
    </Form.Item>
  </Form.Block>
)

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
    favoriteColor: ['cyan', 'yellow'],
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

        <Form.Item label="Account">
          <Form.Field name="account">
            { props => <Account {...props} /> }
          </Form.Field>
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
}
