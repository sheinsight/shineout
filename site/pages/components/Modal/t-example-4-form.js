/**
 * cn - 表单
 *    -- Modal 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Modal.Submit 来代替 Button[type=submit]
 * en - Form
 *    --The internal form of Modal can use Modal.Submit to trigger submit.
 */
import React from 'react'
import { Modal, Button, Form, Input, Message } from 'shineout'

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
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.show = this.show.bind(this)
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  handleSubmit = data => {
    this.setState({
      visible: false,
    })
    Message.success(JSON.stringify(data))
  }

  handleClose = () => {
    this.setState({
      visible: false,
    })
  }

  renderFooter() {
    return (
      <div>
        <Button onClick={this.handleClose}>Cancel</Button>
        <Modal.Submit>Submit</Modal.Submit>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Button onClick={this.show}>Modal Form</Button>
        <Modal
          visible={this.state.visible}
          width={456}
          title="Form"
          onClose={this.handleClose}
          footer={this.renderFooter()}
        >
          <Form
            labelWidth={100}
            rules={rules}
            labelAlign="right"
            style={{ maxWidth: 400 }}
            onSubmit={this.handleSubmit}
          >
            <Form.Item required label="Email">
              <Input name="email" />
            </Form.Item>

            <Form.Item required label="Password">
              <Input name="password" type="password" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
