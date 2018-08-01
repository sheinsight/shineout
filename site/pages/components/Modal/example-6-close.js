/**
 * cn - 点击空白关闭
 *    -- 默认点击对话框外部空白页面会关闭对话框。
 *    -- 设置 maskCloseAble 属性为 false，禁用点击空白关闭，同时右上角的关闭图标也会隐藏。
 *    -- 设置 maskCloseAble 属性为 null，禁用点击空白关闭，右上角的关闭图标会保留。
 * en - MaskCloseAble
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

  handleOk = () => {
    this.setState({
      visible: false,
    })
    console.log('you are click ok!')
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.show}>click me</Button>
        <Modal
          visible={this.state.visible}
          maskCloseAble={null}
          width={500}
          height={300}
          title="Modal Title"
          onClose={this.cancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="ok" type="primary" onClick={this.handleOk}>Ok</Button>,
          ]}
        >
          The prop maskCloseAble is false.
          <br />
          You must click the button to close the Modal.
        </Modal>
      </div>
    )
  }
}
