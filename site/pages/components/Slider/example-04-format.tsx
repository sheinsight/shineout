/**
 * cn - 格式化
 *    -- 通过 formatScale 属性自定义刻度显示信息
 *    -- 通过 formatValue 属性自定义值显示信息
 * en - Format
 *    -- Set the formatScale property to customize the display scale.
 *    -- Set the formatValue property to customize the display value.
 */
import React from 'react'
import { Slider, TYPE } from 'shineout'

type SliderProps = TYPE.Slider.Props<number[]>
type SliderFormatScale = SliderProps['formatScale']
type SliderFormatValue = SliderProps['formatValue']

const pad = (i: number) => (i < 10 ? `0${i}` : i)

const format: SliderFormatScale | SliderFormatValue = (v: number) => {
  const value = v + 540
  const hours = Math.floor(value / 60)
  return `${pad(hours)}:${pad(value - hours * 60)}`
}

const App: React.FC = () => (
  <Slider
    range
    formatScale={format}
    formatValue={format}
    defaultValue={[33, 216]}
    scale={[0, 60, 120, 180, 240, 300, 360, 420, 480, 540]}
  />
)

export default App
