/**
 * cn - 嵌套数据 (旧)
 *    -- <b>Form.Block已不推荐，建议使用 FieldSet</b>
 *    -- Form.Block 配合 Form.Field 使用，可以处理多层嵌套数据
 * en - BlockField (Out of date)
 *    -- <b>Form.Block is not recommend, use FieldSet instead.</b>
 *    -- Form.Block can handle multiple levels of nested data well through Form.Field.
 */
import React, { PureComponent } from 'react'
import { Datum, Form, Input, Checkbox } from 'shineout'

const rules = {
  account: {
    age: [{ min: 18, max: 60, message: 'Age must between {min} and {max}.' }],
  },
}

// eslint-disable-next-line
const Account = ({ value, onChange }) => (
  <Form.Block labelWidth={50} labelAlign="top" value={value} onChange={onChange}>
    <Form.Item label="Name">
      <Form.Field name="name">
        <Form.Block>
          <Input.Group style={{ width: 300 }}>
            <Input name="firstName" placeholder="First Name" />
            -
            <Input name="lastName" placeholder="Last Name" />
          </Input.Group>
        </Form.Block>
      </Form.Field>
    </Form.Item>

    <Form.Item label="Age">
      <Input rules={rules.account.age} style={{ width: 100 }} name="age" type="number" digits={0} defaultValue={0} />
    </Form.Item>
  </Form.Block>
)

export default class extends PureComponent {
  componentDidMount() {
    this.datum.setValue({
      email: 'test@example.com',
      account: {
        name: {
          firstName: 'Harry',
          lastName: 'Potter',
        },
        age: 18,
      },
      favoriteColor: ['cyan', 'yellow'],
    })
  }

  datum = new Datum.Form()

  render() {
    return (
      <Form
        datum={this.datum}
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

        <Form.Item label="Account">
          <Form.Field name="account">
            <Account />
          </Form.Field>
        </Form.Item>

        <Form.Item label="Favorite Color">
          <Checkbox.Group
            name="favoriteColor"
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
