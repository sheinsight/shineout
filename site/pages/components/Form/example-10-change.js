/**
 * cn - 联动
 * en - onChange
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox } from 'shineout'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        email: 'test@example.com',
      },
    }

    this.rules = {
      age: [
        { required: true, message: 'Please enter age.' },
        { min: 18, max: 60, message: 'Age must between {min} and {max}.' },
      ],
      colors: [
        { required: true, message: 'Please select your favorite colors.' },
        { min: 2, message: 'At least select 2 colors.' },
      ],
    }

    this.colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ value: { ...value } })
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <Form
          value={value}
          rules={this.rules}
          onChange={this.handleChange}
          onSubmit={d => console.log(d)}
        >
          <Form.Item label="Email">
            <Input name="email" />
          </Form.Item>

          <Form.Item label="Password">
            <Input name="password" type="password" />
          </Form.Item>

          <Form.Item label="">
            <Checkbox name="showAge">Show age</Checkbox>
            <Checkbox name="showColors">Show colors</Checkbox>
          </Form.Item>

          {
            value.showAge &&
            <Form.Item required label="Age" tip="between 18 and 60">
              <Input name="age" digits={0} defaultValue={18} style={{ width: 100 }} type="number" />
            </Form.Item>
          }

          {
            value.showColors &&
            <Form.Item required label="Favorite Colors">
              <Checkbox.Group name="colors" data={this.colors} />
            </Form.Item>
          }

          <Form.Item label="">
            <Form.Button>Sumbit</Form.Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
