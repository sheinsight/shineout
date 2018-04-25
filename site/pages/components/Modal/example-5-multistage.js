/**
 * cn - 多级modal
 * en - Multistage Modal
 */
import React from 'react'
import { Modal, Button } from 'shineout'
import { pickNumber } from 'doc/utils/faker'
import { range } from 'shineout/utils/numbers'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: 0,
      content: 1,
    }
    this.show = this.show.bind(this)
    this.ok = this.ok.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  show(index) {
    console.log(index)
    this.setState({ visible: index })
  }

  ok() {
    this.setState({
      visible: false,
      content: this.state.content += 1,
    })
    console.log('you are click ok!')
  }

  cancel() {
    this.setState({
      visible: false,
      content: this.state.content += 1,
    })
    console.log('you are click cancel')
  }

  render() {
    return (
      <div>
        <Button onClick={this.show.bind(this, 1)}>click me</Button>

        {
          range(10, 1).map(i => (
            <Modal
              key={i}
              visible={this.state.visible >= i}
              width={pickNumber(600, 450)}
              style={{ height: pickNumber(450, 320) }}
              title={`Modal Title ${i}`}
            >
              Level {i}.
              <br />
              <a href="javascript:;" onClick={this.show.bind(this, i + 1)}>Next level</a>
            </Modal>
          ))
        }
      </div>
    )
  }
}
