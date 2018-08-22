/**
 * cn - 类型
 *    -- Modal 内置了 4 个类型的样式，为了方便调用，设计为静态函数
 * en - Type
 *    -- Modal has 4 built in style.
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

  function warning() {
    Modal.warn({
      title: 'This is a warning message',
      content: 'this is  some information that user must know',
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
      <Button onClick={warning}>warning</Button>
      <Button onClick={error}>error</Button>
    </div>
  )
}
