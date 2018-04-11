/**
 * cn - 使用api
 * en - use api
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default function () {
  function info() {
    Modal.info({
      okText: 'i know',
      title: 'This is a info message',
      content: 'this is  some information that user must know',
      onOk: () => console.log('yes i know'),
    })
  }
  function success() {
    Modal.success({
      okText: 'i know',
      title: 'This is a success message',
      content: 'this is some information that user successful operation',
      onOk: () => console.log('yes i know'),
    })
  }
  function error() {
    Modal.error({
      okText: 'i know',
      title: 'This is a error message',
      content: 'this is some information that user attended',
      onOk: () => console.log('yes i know'),
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
