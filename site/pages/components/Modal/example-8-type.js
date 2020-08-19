/**
 * cn - type 属性
 *    -- Modal 组件根据 type 属性在 Title 区域显示带有状态Icon。
 * en - type attribute
 *    -- The Modal component displays the icon with status in the Title area according to the type attribute.
 */
import React from 'react'
import { Modal, Button, Select } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: 'success',
    }
    this.show = this.show.bind(this)
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
    console.log('clicked ok!')
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
    console.log('clicked cancel')
  }

  show() {
    this.setState({
      visible: true,
    })
  }

  render() {
    const { type } = this.state
    return (
      <div>
        <Select
          data={['info', 'success', 'warning', 'error']}
          value={type}
          style={{ width: 100, marginRight: 12 }}
          keygen
          onChange={t => this.setState({ type: t })}
        />
        <Button onClick={this.show}>click me</Button>
        <Modal
          visible={this.state.visible}
          type={type}
          width={500}
          title={`Modal Title with ${type} Icon`}
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
          <span>Modal type: </span>
          <b>{type}</b>
        </Modal>
      </div>
    )
  }
}
