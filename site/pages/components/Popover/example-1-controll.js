/**
 * cn - 受控
 *    -- 可以通过 visible 去控制
 * en -  controll
 *    -- Use cisible to controll the show/hidden
 */
import React from 'react'
import { Button, Popover } from 'shineout'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  render() {
    const { visible } = this.state
    return (
      <Button>
        <Popover
          visible={visible}
          onVisibleChange={v => this.setState({ visible: v })}
          style={{ width: 200, padding: 20 }}
        >
          Some text
        </Popover>
        Hover
      </Button>
    )
  }
}
