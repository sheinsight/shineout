/**
 * cn - 偏移
 *    -- offset 属性可以设置偏移，取值方式和宽度相同
 * en - Offset
 *    -- The offset property set the offset in the same way as the width.
 */
import React from 'react'
import { Grid } from 'shineout'

const style = {
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#3399ff',
}

export default function() {
  return (
    <div style={{ background: '#f2f2f2' }}>
      <Grid width={1 / 3} offset={1 / 3} style={style}>
        With 1/3, Offset 1/3
      </Grid>
    </div>
  )
}
