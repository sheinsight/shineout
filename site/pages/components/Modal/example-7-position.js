/**
 * cn - 位置（抽屉）
 *    -- 通过 position 可设置 Modal 弹出的位置，这时 Modal 就如 Drawer 一样。现支持 top、right、bottom 和 left 四个位置配置。
 * en - Position
 *    -- Set position property to specify the pop-up position.
 */
import React, { Component } from 'react'
import { Modal, Button, Form, Input, Select } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      position: 'right',
    }
  }

  handleClose = () => {
    this.setState({
      visible: false,
    })
  }

  toggle = visible => {
    this.setState({ visible })
  }

  renderFooter() {
    return (
      <div>
        <Button onClick={this.toggle.bind(this, false)}>Cancel</Button>
        <Modal.Submit>Submit</Modal.Submit>
      </div>
    )
  }

  render() {
    const { position } = this.state
    return (
      <div>
        <Select
          data={['top', 'right', 'bottom', 'left']}
          value={position}
          style={{ width: 100, marginRight: 12 }}
          keygen
          onChange={p => this.setState({ position: p })}
        />
        <Button onClick={this.toggle.bind(this, true)}>click me</Button>
        <Modal
          visible={this.state.visible}
          title="Form"
          key={position}
          position={position}
          onClose={this.toggle.bind(this, false)}
          footer={this.renderFooter()}
        >
          <Form labelWidth={100} labelAlign="right" style={{ width: 500 }} onSubmit={this.toggle.bind(this, false)}>
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
