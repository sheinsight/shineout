/**
 * cn - 间距
 *    -- * 注意：设置 gutter 的栅格不能直接嵌套在另一个栅格中
 * en - Gutter
 */
import React from 'react'
import { Grid } from 'shineout'

const range = Array.from({ length: 8 }).map((n, i) => i + 1)

export default function () {
  return (
    <Grid gutter={8}>
      {
        range.map(i => (
          <Grid key={i} width={1 / 8}>
            <div style={{ background: '#ccc', textAlign: 'center' }}>1/8</div>
          </Grid>
        ))
      }
    </Grid>
  )
}

