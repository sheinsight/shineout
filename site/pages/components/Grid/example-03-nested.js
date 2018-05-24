/**
 * cn - 嵌套
 * en - Nested
 */
import React from 'react'
import { Grid } from 'shineout'

export default function () {
  return (
    <Grid style={{ textAlign: 'center' }}>
      <Grid width={1 / 2} style={{ background: '#ccc' }}>1/2</Grid>

      <Grid width={1 / 2}>
        <div>1/2</div>
        <div>
          <Grid style={{ background: '#ccc' }} width={1 / 3}>1/3</Grid>
          <Grid style={{ background: '#f2f2f2' }} width={1 / 3}>1/3</Grid>
          <Grid style={{ background: '#ccc' }} width={1 / 3}>1/3</Grid>
        </div>
      </Grid>
    </Grid>
  )
}
