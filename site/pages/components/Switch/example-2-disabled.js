/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 禁用 switch
 * en - Disabled
 *    -- disabled check while disabled true
 */
import React from 'react'
import { Switch, Button } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
    }
  }

  handleToggle = () => {
    this.setState(prev => ({
      disabled: !prev.disabled,
    }))
  }

  render() {
    return (
      <div>
        <Switch disabled={this.state.disabled} />
        <Button style={{ marginLeft: 14 }} type="primary" onClick={this.handleToggle}>
          Toggle
        </Button>
      </div>
    )
  }
}
