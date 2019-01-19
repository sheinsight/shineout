/**
 * cn - 数据处理
 *    -- Form 内部通过 Datum.Form 对象来处理数据，通常情况下，用户只需要 onSumbit 中的 formdata 提交即可。
 *    -- 如果有额外的需求，可以自定义一个 Datum.Form 对象来处理数据。
 * en - Datum.Form
 *    -- Forms internally process data through the Datum.Form object. Typically, users only need to get formdata on onSumbit.
 *    -- You can customize a Datum.Form object to process the data.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Checkbox, Datum, Button } from 'shineout'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.datum = new Datum.Form()
    this.getValue = this.getValue.bind(this)
  }

  setValue(name, value) {
    if (!value) {
      this.datum.setValue({
        email: 'test@example.com',
        age: 18,
        colors: ['yellow', 'cyan'],
      })
    } else {
      this.datum.set(name, value)
    }
  }

  getValue() {
    console.log(this.datum.getValue())
  }

  handleSubmit = () => {
    this.datum
      .validate()
      .then(() => {
        console.log(this.datum.getValue())
      })
      .catch(() => {})
  }

  render() {
    return (
      <div>
        <Button onClick={this.setValue.bind(this)}>set values</Button>
        <Button onClick={this.setValue.bind(this, 'colors', ['violet'])}>set color</Button>
        <Button onClick={this.setValue.bind(this, { colors: ['yellow'], age: 20 })}>set color and age</Button>
        <Button onClick={this.getValue}>get values</Button>

        <Form style={{ maxWidth: 500, marginTop: 20 }} datum={this.datum}>
          <Form.Item label="Email" required>
            <Input name="email" rules={[{ required: true, message: 'Please input your email.' }]} />
          </Form.Item>

          <Form.Item label="Password">
            <Input name="password" type="password" />
          </Form.Item>

          <Form.Item label="Age">
            <Input name="age" digits={0} style={{ width: 100 }} type="number" />
          </Form.Item>

          <Form.Item label="Favorite Colors">
            <Checkbox.Group
              name="colors"
              keygen
              data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']}
            />
          </Form.Item>

          <Form.Item label="">
            <Button type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
