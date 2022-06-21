/**
 * cn - 任意等分
 *    -- Grid 的栅格体系是动态生成，可以实现任意等份
 * en - Arbitrary
 *    -- Grid system is dynamic generated and can be any number.
 */
import React, { useState } from 'react'
import { Grid, Slider, TYPE } from 'shineout'

type SliderProps = TYPE.Slider.Props<any>
type SliderOnChange = SliderProps['onChange']

const App: React.FC = () => {
  const [count, setCount] = useState(5)

  const handleCountChange: SliderOnChange = v => {
    setCount(v)
  }
  return (
    <div>
      <Slider
        step={0}
        value={count}
        formatValue={false}
        onChange={handleCountChange}
        scale={[1, 2, 3, 5, 8, 13, 21, 34, 55]}
      />

      <div style={{ height: 20 }} />

      {Array.from({ length: count }).map((_n, i) => (
        <div key={i} style={{ background: '#f2f2f2', marginBottom: 4, lineHeight: '30px' }}>
          <Grid width={(i + 1) / count} style={{ color: '#fff', paddingLeft: 8, background: '#3399ff' }}>
            {`${i + 1}/${count}`}
          </Grid>
        </div>
      ))}
    </div>
  )
}

export default App
