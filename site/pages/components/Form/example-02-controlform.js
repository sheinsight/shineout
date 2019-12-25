/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等.
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc.
 */
import React, { PureComponent } from 'react'
import { Form, Input, Button, Rule } from 'shineout'

const rules = new Rule()

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { value: undefined }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    return (
      <Form
        value={this.state.value}
        formRef={f => {
          this.form = f
        }}
        onChange={this.handleChange}
        onSubmit={data => {
          console.log(data)
        }}
      >
        <div style={{ margin: '20px 0' }}>
          <Button onClick={() => console.log(this.form.getValue())}>get value</Button>
          <Button onClick={() => this.form.validate()}>validate</Button>
          <Button onClick={() => this.form.clearValidate()}>clear validate</Button>
          <Button onClick={() => this.form.submit()}>submit</Button>
          <Button onClick={() => this.form.submit(false)}>submit without validate</Button>
          <Button onClick={() => this.form.reset()}>reset</Button>
        </div>
        <Form.Item label="name">
          <Input name="name" rules={[rules.required]} />
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password name="password" type="password" rules={[rules.required]} />
        </Form.Item>

        <Form.Item label="">
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    )
  }
}
