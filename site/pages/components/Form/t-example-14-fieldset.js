/**
 * cn - FieldSet (Object)
 *    -- Form.FieldSet 可以处理对象类型的字段
 * en - FieldSet (Object)
 *    -- Form.FieldSet handles fields of object type
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Select, Rule } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

const citys = fetchCity(20)

const rule = Rule({
  name: (value, _, callback) => {
    const isEmpty = !value || (!value.firstName && !value.lastName)
    callback(isEmpty ? new Error('firstName and lastName cannot both be empty') : true)
  },
})

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      value: {
        hateColor: 'green',
      },
    }
  }

  componentDidMount() {
    this.handleChange({
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
    })
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <Form
        value={value}
        onChange={this.handleChange}
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
          <Form.FieldSet name="account" labelWidth={60}>
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
                  rules={[rule.min(18), rule.max(60)]}
                  style={{ width: 100 }}
                  name="age"
                  title="age"
                  type="number"
                  digits={0}
                  defaultValue={18}
                />
              ) : (
                <span />
              )}
            </Form.Item>

            <Form.Item label="City">
              <Select
                name="city"
                data={citys}
                datum={{ format: 'id' }}
                keygen="id"
                renderItem="city"
                title="city"
                rules={[rule.required]}
                style={{ width: 200 }}
              />
            </Form.Item>
          </Form.FieldSet>
        </Form.Item>

        <Form.Item label="Hate Color">
          <Select
            name="hateColor"
            width={200}
            keygen
            data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
          />
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
