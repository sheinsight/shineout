/**
 * cn - 内嵌form
 * en - use form
 */
import React from 'react'
import { Modal, Button, Form, Input } from 'shineout'

// const content = (
//   <div>
//     <p>some content1</p>
//     <p>some content2</p>
//     <p>some content3</p>
//   </div>
// )
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      content: 1,
    }
    this.show = this.show.bind(this)
    this.ok = this.ok.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  show() {
    this.setState({
      visible: true,
    })
  }
  ok() {
    this.setState({
      visible: false,
      content: this.state.content += 1,
    })
    console.log('you are click ok!')
  }
  cancel() {
    this.setState({
      visible: false,
      content: this.state.content += 1,
    })
    console.log('you are click cancel')
  }
  render() {
    return (
      <div>
        <Button onClick={this.show}>click me</Button>
        <Modal visible={this.state.visible} width={456} title="Modal Title" onOk={this.ok} onCancel={this.cancel}>
          <Form labelWidth={100} labelAlign="right" style={{ maxWidth: 400 }} onSubmit={data => console.log(data)}>
            <Form.Item label="Email">
              <Input name="email" />
            </Form.Item>

            <Form.Item label="Password">
              <Input name="password" type="password" />
            </Form.Item>

            <Form.Item label="">
              <Form.Submit>Submit</Form.Submit>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
