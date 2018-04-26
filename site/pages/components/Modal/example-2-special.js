/**
 * cn - 使用api
 * en - use api
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default function () {
  function info() {
    Modal.info({
      title: 'This is a info message',
      content: 'this is  some information that user must know',
    })
  }

  function success() {
    Modal.success({
      title: 'This is a success message',
      content: 'this is some information that user successful operation',
    })
  }

  function error() {
    Modal.error({
      title: 'This is a error message',
      content: 'this is some information that user attended',
    })
  }

  return (
    <div>
      <Button onClick={info}>info</Button>
      <Button onClick={success}>success</Button>
      <Button onClick={error}>error</Button>
    </div>
  )
}
