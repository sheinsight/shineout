/**
 * cn - Offset
 * en - Offset
 */
import React from 'react'
import { Grid } from 'shineout'

export default function () {
  return (
    <div style={{ background: '#f2f2f2' }}>
      <Grid width={1 / 3} offset={1 / 3} style={{ background: '#ccc', textAlign: 'center' }}>
        With 1 / 3, Offset 1/3
      </Grid>
    </div>
  )
}
