/**
 * cn - 键盘事件
 *    -- Input 支持部分键盘按键的事件，在按下按键后触发相应的事件
 * en - Keyboard events
 *    -- Input supports events for some keyboard keys, which trigger the corresponding event when a key is pressed
 */
import React, { useState } from 'react'
import { Input, TYPE } from 'shineout'

type InputProps = TYPE.Input.Props
type InputOnKeyUp = InputProps['onKeyUp']
type InputOnKeyDown = InputProps['onKeyDown']
type InputOnEnterPress = InputProps['onEnterPress']

const style: React.CSSProperties = { marginBottom: 12 }

const App: React.FC = () => {
  const [keyUp, setKeyUp] = useState<number>(0)
  const [keyDown, setKeyDown] = useState<number>(0)
  const [keyEnterPress, setKeyEnterPress] = useState<number>(0)

  const onKeyUp: InputOnKeyUp = () => setKeyUp(keyUp + 1)
  const onKeyDown: InputOnKeyDown = () => setKeyDown(keyDown + 1)
  const onEnterPress: InputOnEnterPress = () => setKeyEnterPress(keyEnterPress + 1)

  return (
    <div>
      <Input.Group style={style}>
        <Input delay={0} placeholder="onKeyUp" onKeyUp={onKeyUp} />
        <b className="onKeyUp">{`onKeyUp: ${keyUp} times`}</b>
      </Input.Group>

      <Input.Group style={style}>
        <Input delay={0} placeholder="onKeyDown" onKeyDown={onKeyDown} />
        <b className="onKeyDown">{`onKeyDown: ${keyDown} times`}</b>
      </Input.Group>

      <Input.Group style={style}>
        <Input delay={0} placeholder="onEnterPress" onEnterPress={onEnterPress} />
        <b className="onEnterPress">{`onEnterPress: ${keyEnterPress} times`}</b>
      </Input.Group>
    </div>
  )
}

export default App
