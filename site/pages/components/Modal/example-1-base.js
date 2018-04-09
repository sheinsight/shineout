/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Modal } from 'shineout'

const content = (
  <div>
    <p>some content1</p>
    <p>some content2</p>
    <p>some content3</p>
  </div>
)
export default function () {
  return (
    <Modal width={456} title="Modal Title" onOk={() => (console.log('you are click ok'))} onCancel={() => console.log('you are cancel')}>
      {content}
    </Modal>
  )
}
