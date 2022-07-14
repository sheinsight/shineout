/**
 * cn - 间距
 *    -- 通过 gutter 属性设置栅格间距
 * en - Gutter
 *    -- Set grid spacing through the gutter property.
 */
import React from 'react'
import { Grid } from 'shineout'

const style: React.CSSProperties = {
  background: '#f2f2f2',
}
const gridStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#3399ff',
}

const App: React.FC = () => (
  <div style={style}>
    <Grid gutter={8}>
      {Array.from({ length: 8 })
        .map((_, i) => i + 1)
        .map(i => (
          <Grid key={i} width={1 / 8}>
            <div style={gridStyle}>1/8</div>
          </Grid>
        ))}
    </Grid>
  </div>
)

export default App
