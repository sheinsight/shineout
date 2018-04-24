/**
 * cn - 确认框
 * en - Confirm Modal
 */
import React, { Component } from 'react'
import { Modal, Button } from 'shineout'

export default class extends Component {
  confirm = () => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
      onOk: () => console.log('yes i know'),
      text: { ok: 'Yes', cancel: 'No' },
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.confirm}>confirm</Button>
      </div>
    )
  }
}
