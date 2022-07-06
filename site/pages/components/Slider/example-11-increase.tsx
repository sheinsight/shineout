/**
 * cn - 增长
 *    -- 允许拖动到最右边的时候进行增长
 * en - onIncrease
 *    -- can increase the maximum infinitely while dragging
 */
import React, { useState } from 'react'
import { Slider, TYPE } from 'shineout'

type SliderProps = TYPE.Slider.Props<any>
type SliderScale = SliderProps['scale']
type SliderOnIncrease = SliderProps['onIncrease']

const App: React.FC = () => {
  const [scale1, setScale1] = useState<SliderScale>([0, 100])
  const [scale2, setScale2] = useState<SliderScale>([0, 100])

  const onIncrease1: SliderOnIncrease = () => setScale1([0, scale1![1] + 1])
  const onIncrease2: SliderOnIncrease = () => setScale2([0, scale2![1] + 5])

  return (
    <div>
      <Slider scale={scale1} defaultValue={50} onIncrease={onIncrease1} />
      <Slider range scale={scale2} defaultValue={[20, 50]} onIncrease={onIncrease2} />
    </div>
  )
}

export default App
