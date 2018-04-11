/**
 * cn - 多级modal
 * en - Multistage Modal
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
          {
            <Button onClick={() => Modal.error({ content: '你进入了错误的页面!' })}>确认</Button>
          }
        </Modal>
      </div>
    )
  }
}
