/**
 * cn - 通知提醒
 *    -- 设置 positoin 参数，修改显示位置。借此可以实现 Notification 的功能。
 * en - Notification
 *    -- Set position property to specify the pop-up layer location.
 */
import React from 'react'
import { Button, Message, Select } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { position: 'top-right' }
  }

  setPosition = position => this.setState({ position })

  show = () => {
    Message.info(
      <div style={{ width: 240 }}>some message.</div>,
      3,
      { position: this.state.position, title: 'notify title' },
    )
  }

  render() {
    return (
      <div>
        position:
        <Select
          keygen
          data={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          onChange={this.setPosition}
          value={this.state.position}
          width={200}
          style={{ margin: '0 20px' }}
        />
        <Button onClick={this.show}>Show message.</Button>
      </div>
    )
  }
}

