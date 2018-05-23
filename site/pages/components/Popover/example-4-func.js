/**
 * cn - 关闭事件
 * en - onClose
 */
import React, { Component } from 'react'
import { Button, Popover, Message } from 'shineout'

export default class extends Component {
  handleContentClose = (close) => {
    close()
    Message.success('Popover panel closed.')
  }

  render() {
    const content = close => (
      <div style={{ padding: 20 }}>
        <div>Are you sure you want to close this panel?</div>
        <div style={{ marginTop: 30, textAlign: 'right' }}>
          <Button size="small" onClick={this.handleContentClose.bind(this, close)}>close</Button>
        </div>
      </div>
    )

    return (
      <Popover content={content} trigger="click" style={{ marginRight: 12 }}>
        <Button>Click me</Button>
      </Popover>
    )
  }
}
