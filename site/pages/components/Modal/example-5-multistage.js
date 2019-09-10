/**
 * cn - 多层 Modal
 *    -- 支持多层叠加 Modal
 * en - Multistage
 *    -- Multi-layer Modal
 */
import React, { Fragment } from 'react'
import { Modal, Button } from 'shineout'

const pickNumber = (max = 65555, min = 0, fixed = 2) => {
  if (typeof max === 'string') max = parseInt(max, 10)
  if (typeof min === 'string') min = parseInt(min, 10)

  const num = Math.random() * (max - min) + min
  return parseFloat(num.toFixed(fixed), 0)
}

const range = (end, start = 0) => {
  const delta = end - start
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'))
  }
  return Array.from({ length: end - start }, (v, k) => k + start)
}

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

        {range(11, 1).map(i => (
          <Modal
            key={i}
            visible={this.state.current >= i}
            width={size[i][0]}
            height={size[i][1]}
            title={`Modal Title ${i}`}
            onClose={this.show.bind(this, i - 1)}
            footer={<Button onClick={this.show.bind(this, i - 1)}>Close</Button>}
          >
            {`Level ${i}`}
            .
            <br />
            {i < 10 && (
              <Fragment>
                <a onClick={this.show.bind(this, i + 1)}>Next level</a>
                <br />
                <br />
                <a onClick={this.show.bind(this, 0)}>Close all</a>
              </Fragment>
            )}
          </Modal>
        ))}
      </div>
    )
  }
}
