/**
 * cn - 基本用法
 *    -- 最基本的组件用法。
 *    -- Modal 会在 document.body 中创建一个新的层显示弹出内容。
 *    -- 关闭 modal 时没有对组件进行销毁, 只是隐藏, 组件的状态会被保留。 如果不需要保留组件之前的状态, 可以通过改变 modal 的 key 去实现。
 * en - Base
 *    -- The basic usage for component.
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
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
      content: (this.state.content += 1),
    })
    console.log('clicked ok!')
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      content: (this.state.content += 1),
    })
    console.log('clicked cancel')
  }

  render() {
    return (
      <div>
        <Button onClick={this.show}>click me</Button>
        <Modal
          visible={this.state.visible}
          width={500}
          title="Modal Title"
          onClose={this.handleCancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={this.handleOk}>
              Ok
            </Button>,
          ]}
        >
          {`you are visited ${this.state.content}`}
        </Modal>
      </div>
    )
  }
}
