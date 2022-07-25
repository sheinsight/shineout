/**
 * cn - 间距
 *    -- 通过 gutter 属性设置栅格间距
 * en - Gutter
 *    -- Set grid spacing through the gutter property.
 */
import React from 'react'
import { Grid } from 'shineout'

const style = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#3399ff',
}

export default function() {
  return (
    <div style={{ background: '#f2f2f2' }}>
      <Grid gutter={8}>
        {Array.from({ length: 8 })
          .map((_, i) => i + 1)
          .map(i => (
            <Grid key={i} width={1 / 8}>
              <div style={style}>1/8</div>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}
