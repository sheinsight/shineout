/**
 * cn - 确认框
 * en - Confirm Modal
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default function () {
  function confirm() {
    Modal.confirm({
      okText: 'ok',
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
      onOk: () => console.log('yes i know'),
    })
  }
  return (
    <div>
      <Button onClick={confirm}>confirm</Button>
    </div>
  )
}
