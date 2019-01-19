/**
 * cn - 动态示例
 *    -- value 变更时动画效果演示
 * en - Animation
 *    -- The animation for changing value.
 */
import React, { Component } from 'react'
import { Button, Progress } from 'shineout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { value: 0 }
  }

  handleClick = (value = this.state.value) => {
    value += Math.random() * 12
    if (value >= 100) {
      value = 100
      this.setState({ value })
    } else {
      this.setState({ value }, () => {
        setTimeout(this.handleClick, 320)
      })
    }
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <Progress style={{ width: 400 }} value={value}>
          <div style={{ width: 50 }}>{value.toFixed(0)}</div>
        </Progress>

        <br />

        <Progress shape="circle" type="success" value={value}>
          {value.toFixed(0)}%
        </Progress>

        <Button style={{ marginLeft: 80 }} onClick={this.handleClick.bind(this, 0)}>
          Start
        </Button>
      </div>
    )
  }
}
