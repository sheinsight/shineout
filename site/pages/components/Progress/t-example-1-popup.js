/**
 * cn - 弹出展示
 *    -- 设置 popup 属性后，children 会通过弹出框展示
 * en - Popup
 *    -- After setting the popup property, children will be displayed through a popup box
 */
import React from 'react'
import { Progress, Button } from 'shineout'

export default class extends React.Component {
  state = {
    value: 0,
  }

  handleClick = (value = this.state.value) => {
    value += Math.random() * 12
    if (value >= 100) {
      value = 100
      this.setState({ value })
    } else {
      this.setState({ value }, () => {
        setTimeout(this.handleClick, 160)
      })
    }
  }

  render() {
    const { value } = this.state
    return (
      <div style={{ width: 400 }}>
        <Progress value={value} popup>{`${parseInt(value, 10)}%`}</Progress>
        <br />
        <Button onClick={this.handleClick.bind(this, 0)}>Start</Button>
      </div>
    )
  }
}
