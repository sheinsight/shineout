/**
 * cn - 使用api
 * en - use api
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default function () {
  return (
    <Button
      onClick={() => Modal.success({
        okText: 'i know',
        title: 'This is a success message',
        content: 'some messages...some messages...',
        onOk: () => console.log('yes i know'),
  })}
    >success
    </Button>)
}
