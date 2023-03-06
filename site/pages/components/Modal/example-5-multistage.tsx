/**
 * cn - 多层 Modal
 *    -- 支持多层叠加 Modal
 * en - Multistage
 *    -- Multi-layer Modal
 */
import React, { useState, Fragment } from 'react'
import { Modal, Button, TYPE } from 'shineout'

type ModalProps = TYPE.Modal.Props
type ModalFooter = ModalProps['footer']

const pickNumber = (max = 65555, min = 0, fixed = 2) => {
  if (typeof max === 'string') max = parseInt(max, 10)
  if (typeof min === 'string') min = parseInt(min, 10)

  const num = Math.random() * (max - min) + min
  return parseFloat(num.toFixed(fixed))
}

const range = (end: number, start = 0) => {
  const delta = end - start
  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'))
  }
  return Array.from({ length: end - start }, (_v, k) => k + start)
}

const size = range(11, 0).map(() => [pickNumber(450, 380), pickNumber(400, 300)])

const App: React.FC = () => {
  const [current, setCurrent] = useState(0)

  const show = (v: number) => setCurrent(v)

  const footer = (i: number): ModalFooter => <Button onClick={() => show(i)}>Close</Button>

  return (
    <div>
      <Button onClick={() => show(1)}>click me</Button>

      {range(11, 1).map(i => (
        <Modal
          key={i}
          width={size[i][0]}
          height={size[i][1]}
          footer={footer(i - 1)}
          visible={current >= i}
          title={`Modal Title ${i}`}
          onClose={() => show(i - 1)}
        >
          {`Level ${i}`}
          .
          <br />
          {i < 10 && (
            <Fragment>
              <a onClick={() => show(i + 1)}>Next level</a>
              <br />
              <br />
              <a onClick={() => show(0)}>Close all</a>
            </Fragment>
          )}
        </Modal>
      ))}
    </div>
  )
}

export default App
