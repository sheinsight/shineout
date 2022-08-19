/**
 * cn - 限制输入
 *    -- Input 支持部分限制输入功能，比如最大值、最小值、最大输入长度。
 * en - Limit
 *    -- Input supports some rules of Input to limit the inputing, such as maximum, minimum, and maximum Input length.
 */
import React, { useState } from 'react'
import { Input, TYPE } from 'shineout'

type InputProps = TYPE.Input.Props<string>
type InputOnKeyUp = InputProps['onKeyUp']
type InputOnKeyDown = InputProps['onKeyDown']

const style: React.CSSProperties = { marginBottom: 12 }

const App: React.FC = () => {
  const [keyUp, setKeyUp] = useState<number>(0)
  const [keyDown, setKeyDown] = useState<number>(0)

  const onKeyUp: InputOnKeyUp = () => setKeyUp(keyUp + 1)
  const onKeyDown: InputOnKeyDown = () => setKeyDown(keyDown + 1)

  return (
    <div>
      <Input.Group style={style}>
        <b className="min">min</b>
        <Input.Number delay={0} placeholder="100" min={100} onKeyUp={onKeyUp} />
      </Input.Group>

      <Input.Group style={style}>
        <b className="max">max</b>
        <Input.Number delay={0} placeholder="200" max={200} onKeyDown={onKeyDown} />
      </Input.Group>

      <Input.Group style={style}>
        <b className="maxLength">maxLength</b>
        <Input delay={0} placeholder="5" maxLength={5} onKeyDown={onKeyDown} />
      </Input.Group>
    </div>
  )
}

export default App
