/**
 * cn - FieldSet (Object)
 *    -- Form.FieldSet 可以处理对象类型的字段
 * en - FieldSet (Object)
 *    -- Form.FieldSet handles fields of object type
 */
import React, { useState, useEffect } from 'react'
import { Form, Input, Checkbox, Select, Rule, TYPE } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

interface Value {
  email?: string
  account?: {
    showAge?: boolean
    name?: {
      firstName: string
      lastName: string
    }
    city?: number
  }
  hateColor?: string
  favoriteColor?: string[]
}
type FormProps = TYPE.Form.Props<Value>
type FormValue = FormProps['value']
type FormOnChange = FormProps['onChange']

type RuleFunc = TYPE.Rule.ValidFunc

const citys = fetchCity(20)

const name: RuleFunc = (value, _, callback) => {
  const isEmpty = !value || (!value.firstName && !value.lastName)
  callback(isEmpty ? new Error('firstName and lastName cannot both be empty') : true)
}

const rule = Rule({ name })

const App: React.FC = () => {
  const [value, setValue] = useState<FormValue>({ hateColor: 'green' })

  useEffect(
    () =>
      setValue({
        email: 'test@example.com',
        account: {
          name: {
            firstName: 'James',
            lastName: 'Potter',
          },
          city: 3,
        },
        hateColor: 'blue',
        favoriteColor: ['cyan', 'yellow'],
      }),
    []
  )

  const handleChange: FormOnChange = v => {
    setValue(v)
  }

  return (
    <Form
      value={value}
      onChange={handleChange}
      onSubmit={data => {
        console.log(data)
      }}
    >
      <Form.Item label="Email">
        <Input name="email" title="email" rules={[rule.required, rule.email]} />
      </Form.Item>

      <Form.Item label="Password">
        <Input.Password
          name="password"
          title="password"
          rules={[rule.required, rule.min(8), rule.regExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)]}
        />
      </Form.Item>

      <Form.Item label="Account">
        <Form.FieldSet name="account">
          <Form.Item label="Name">
            <Form.FieldSet rules={[rule.name]} name="name">
              <Input.Group style={{ width: 300 }}>
                <Input name="firstName" placeholder="First Name" />
                -
                <Input name="lastName" placeholder="Last Name" />
              </Input.Group>
            </Form.FieldSet>
          </Form.Item>

          <Form.Item label={<Checkbox name="showAge">Age</Checkbox>}>
            {value && value.account && value.account.showAge ? (
              <Input
                name="age"
                digits={0}
                title="age"
                type="number"
                defaultValue="18"
                style={{ width: 100 }}
                rules={[rule.min(18), rule.max(60)]}
              />
            ) : (
              <span />
            )}
          </Form.Item>

          <Form.Item label="City">
            <Select
              keygen="id"
              name="city"
              format="id"
              data={citys}
              renderItem="city"
              style={{ width: 200 }}
              rules={[rule.required]}
            />
          </Form.Item>
        </Form.FieldSet>
      </Form.Item>

      <Form.Item label="Hate Color">
        <Select
          keygen
          width={200}
          name="hateColor"
          data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
        />
      </Form.Item>

      <Form.Item label="Favorite Color">
        <Checkbox.Group
          keygen
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

export default App
