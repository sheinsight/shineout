/**
 * cn - 多层 Modal
 *    -- 支持多层 Modal
 * en - Multistage
 *    -- Multi-layer Modal
 */
import React from 'react'
import { Modal, Button } from 'shineout'
import { pickNumber } from 'doc/utils/faker'
import { range } from 'shineout/utils/numbers'

const size = range(11, 0).map(() => [pickNumber(600, 450), pickNumber(450, 320)])

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
              width={size[i][0]}
              height={size[i][1]}
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
