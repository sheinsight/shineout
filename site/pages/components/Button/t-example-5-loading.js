/**
 * cn - 加载中
 *    -- 设定 loading 属性，可以让按钮变成加载中状态
 * en - Loading
 *    -- Set loading property can add a loading indicator to button.
 */
import React from 'react'
import { Button } from 'shineout'

export default function() {
  return (
    <div>
      <Button loading size="small" type="primary">
        Small
      </Button>
      <Button loading type="primary">
        Default
      </Button>
      <Button loading size="large" type="primary">
        Large
      </Button>
    </div>
  )
}
