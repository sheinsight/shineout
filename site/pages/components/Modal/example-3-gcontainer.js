/**
 * cn - 指定目标
 *    -- 使用 container 来指定 Modal 渲染的目标节点
 * en - Target
 *    -- set container to render target node
 */
import React from 'react'
import { Modal, Button } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.show = this.show.bind(this)
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  bindElement = ref => {
    this.wrapper = ref
  }

  handleDismiss = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div ref={this.bindElement}>
        <Button onClick={this.show}>click me</Button>
        <Modal
          container={() => this.wrapper}
          visible={this.state.visible}
          width={400}
          title="Modal Title"
          onClose={this.handleDismiss}
          footer={[
            <Button key="cancel" onClick={this.handleDismiss}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={this.handleDismiss}>
              Ok
            </Button>,
          ]}
        >
          Modal mount after Button
        </Modal>
      </div>
    )
  }
}
