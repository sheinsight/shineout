/**
 * cn - 渐变色
 *    -- 当 color 为对象时可以设置渐变色, 推荐只使用两种颜色
 * en - Gradient
 *    -- Gradient color can be set when color is an object, recommended only in two colors
 */
import React from 'react'
import { Progress } from 'shineout'

const blue = '#108ee9'
const green = '#87d068'

export default function() {
  return (
    <div style={{ width: 400 }}>
      <Progress
        value={99}
        color={{
          '0%': blue,
          '100%': green,
        }}
      >
        99%
      </Progress>
      <br />
      <Progress
        value={99}
        color={{
          from: green,
          to: blue,
        }}
      >
        99%
      </Progress>
      <br />
      <Progress
        value={99}
        color={{
          '0%': blue,
          '100%': green,
        }}
        shape="circle"
      >
        99%
      </Progress>
    </div>
  )
}
