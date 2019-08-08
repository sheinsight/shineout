/**
 * cn - 确认框
 *    -- 调用 confirm 函数可以快捷的显示确认框，便于用户操作；同时可以通过 text 配置 Modal 按钮文案，onOk 与 onClose 配置 Modal 确认和取消事件回调（当事件返回 Promise 时会等待 Promise resolve 后关闭 Modal）
 * en - Confirm
 *    -- The confirmation modal dialog.
 */
import React, { Component } from 'react'
import { Modal, Button } from 'shineout'

export default class extends Component {
  confirm = () => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
      onOk: () =>
        new Promise(resolve => {
          console.log('yes i know')
          setTimeout(() => resolve(true), 2000)
        }),
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
