/**
 * cn - 附带图标
 *    -- 使用 type 属性来指定标题附带的图标
 * en - Icon
 *    -- use type display type icon
 */
import React from 'react'
import { Drawer, Button, Select } from 'shineout'

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
        <Drawer
          visible={this.state.visible}
          type={type}
          width={500}
          title={`Drawer Title with ${type} Icon`}
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
          <span>Drawer type: </span>
          <b>{type}</b>
        </Drawer>
      </div>
    )
  }
}
