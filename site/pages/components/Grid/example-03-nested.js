/**
 * cn - 嵌套
 *    -- 嵌套的栅格
 * en - Nested
 *    -- Nested grids
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
    <Grid style={{ textAlign: 'center' }}>
      <Grid width={1 / 2} style={style}>
        1/2
      </Grid>

      <Grid width={1 / 2} style={{ lineHeight: '30px' }}>
        <div>1/2</div>
        <div>
          <Grid style={style} width={1 / 3}>
            1/3
          </Grid>
          <Grid style={{ ...style, background: '#f5f5f5', color: '#333' }} width={1 / 3}>
            1/3
          </Grid>
          <Grid style={style} width={1 / 3}>
            1/3
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}
