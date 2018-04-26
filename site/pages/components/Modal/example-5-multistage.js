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
      current: 0,
    }
    this.show = this.show.bind(this)
  }

  show(current) {
    this.setState({ current })
  }

  render() {
    return (
      <div>
        <Button onClick={this.show.bind(this, 1)}>click me</Button>

        {
          range(11, 1).map(i => (
            <Modal
              key={i}
              visible={this.state.current >= i}
              width={pickNumber(600, 450)}
              height={pickNumber(450, 320)}
              title={`Modal Title ${i}`}
              onClose={this.show.bind(this, i - 1)}
              footer={<Button onClick={this.show.bind(this, i - 1)}>Close</Button>}
            >
              Level {i}.
              <br />
              {
                i < 10 &&
                <a href="javascript:;" onClick={this.show.bind(this, i + 1)}>Next level</a>
              }
            </Modal>
          ))
        }
      </div>
    )
  }
}
