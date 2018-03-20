/**
 * cn - 数据处理
 *    -- 不设置 datum 属性时，Form 内部会自动创建一个 Datum.Form 对象，可以自定义一个 Datum.Form 对象来控制数据。
 * en - Validate
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

  render() {
    return (
      <div>
        <Button onClick={this.setValue.bind(this)}>set values</Button>
        <Button onClick={this.setValue.bind(this, 'colors', ['violet'])}>set color</Button>
        <Button onClick={this.getValue}>get values</Button>

        <Form style={{ maxWidth: 500, marginTop: 20 }} datum={this.datum}>
          <Form.Item label="Email">
            <Input name="email" />
          </Form.Item>

          <Form.Item label="Password">
            <Input name="password" type="password" />
          </Form.Item>

          <Form.Item label="Age">
            <Input name="age" digits={0} style={{ width: 100 }} type="number" />
          </Form.Item>

          <Form.Item label="Favorite Colors">
            <Checkbox.Group name="colors" data={['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']} />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
