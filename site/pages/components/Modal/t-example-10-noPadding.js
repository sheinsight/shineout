/**
 * cn - 无边距
 *    -- 取消内容区域的padding。在 antd 主题下可见具体效果，sheinout主题本无边距。
 * en - NoPadding
 *    -- Set the content style padding to 0
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

  handleOk = () => {
    this.setState(prev => ({
      visible: false,
      content: prev.content + 1,
    }))
    console.log('clicked ok!')
  }

  handleCancel = () => {
    this.setState(prev => ({
      visible: false,
      content: prev.content + 1,
    }))

    console.log('clicked cancel')
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.show}>no padding</Button>
        <Modal
          noPadding
          visible={this.state.visible}
          width={400}
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
