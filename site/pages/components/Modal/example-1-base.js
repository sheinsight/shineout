/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      content: 1,
    }
    this.show = this.show.bind(this)
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
      content: this.state.content += 1,
    })
    console.log('you are click ok!')
  }

  handleCancel = () => {
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
        <Modal
          visible={this.state.visible}
          width={500}
          title="Modal Title"
          onClose={this.cancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="ok" type="primary" onClick={this.handleOk}>Ok</Button>,
          ]}
        >
          {`you are visited ${this.state.content}`}
        </Modal>
      </div>
    )
  }
}
