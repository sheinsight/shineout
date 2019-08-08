/**
 * cn - 弹出位置
 *    -- 设置 positoin 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right。
 * en - Notification
 *    -- Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right.
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
    Message.info(<div style={{ width: 240 }}>some message.</div>, 3, {
      position: this.state.position,
      title: 'notify title',
    })
  }

  render() {
    return (
      <div>
        position:
        <Select
          keygen
          data={['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right']}
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
