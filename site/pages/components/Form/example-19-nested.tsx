/**
 * cn -
 *    -- 更简单的处理多级嵌套数据的方法，在 name 中用 . 分隔字段名称。
 * en -
 *    -- A simpler way to handle multi-level nested data is to separate the field names in name with '.' .
 */
import React, { useState } from 'react'
import { Form, Input, Checkbox, Rule } from 'shineout'

const rules = Rule()

const App: React.FC = () => {
  const [initValue] = useState({
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
  })

  return (
    <Form
      value={initValue}
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
          digits={0}
          type="number"
          defaultValue={0}
          name="account.age"
          style={{ width: 100 }}
          rules={[rules.required]}
        />
      </Form.Item>

      <Form.Item label="Favorite Color">
        <Checkbox.Group
          keygen
          name="extra.favoriteColor"
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

export default App
