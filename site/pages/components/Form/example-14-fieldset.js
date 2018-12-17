/**
 * cn - FieldSet
 *    -- Form.FieldSet 可以处理对象类型的字段
 * en - FieldSet
 *    -- Form.FieldSet handles fields of object type
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Select } from 'shineout'
import { fetchSync as fetchCity } from 'doc/data/city'

const citys = fetchCity(20)

const rules = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    (value, formdata, callback) => {
      if (/\d+/.test(value)) callback(true)
      else callback(new Error('Password at least has one numeral.'))
    },
  ],
  age: [
    { min: 18, max: 60, message: 'Age must between {min} and {max}.' },
  ],
  city: [
    { required: true, message: 'Please select your city.' },
  ],
  name: [
    (value, _, callback) => {
      const isEmpty = !value || (!value.firstName && !value.lastName)
      callback(isEmpty ? new Error('firstName and lastName cannot both be empty') : true)
    },
  ],
}

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
      favoriteColor: ['cyan', 'yellow'],
    })
  }

  handleChange = (value) => {
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <Form value={value} onChange={this.handleChange} onSubmit={(data) => { console.log(data) }}>
        <Form.Item label="Email">
          <Input name="email" rules={rules.email} />
        </Form.Item>

        <Form.Item label="Password">
          <Input name="password" type="password" />
        </Form.Item>

        <Form.Item label="Account">
          <Form.FieldSet name="account" labelWidth={60}>
            <Form.Item label="Name">
              <Form.FieldSet rules={rules.name} name="name">
                <Input.Group style={{ width: 300 }}>
                  <Input name="firstName" placeholder="First Name" />
                  -
                  <Input name="lastName" placeholder="Last Name" />
                </Input.Group>
              </Form.FieldSet>
            </Form.Item>

            <Form.Item label={<Checkbox name="showAge">Age</Checkbox>}>
              {
                (value && value.account && value.account.showAge) ?
                  <Input
                    rules={rules.age}
                    style={{ width: 100 }}
                    name="age"
                    type="number"
                    digits={0}
                    defaultValue={18}
                  />
                : <span />
              }
            </Form.Item>

            <Form.Item label="City">
              <Select
                name="city"
                data={citys}
                datum={{ format: 'id' }}
                keygen="id"
                renderItem="city"
                rules={rules.city}
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
