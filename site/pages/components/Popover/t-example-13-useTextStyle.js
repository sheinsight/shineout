/**
 * cn - 内置文本样式
 *    -- 当采用自定义函数渲染时，允许通过useTextStyle来使用采用内置的文本样式
 * en - useTextStyle
 *    -- Render by the innerstyle of text when the children prop is render function
 */
import { func } from 'prop-types'
import React from 'react'
import { Button, Popover } from 'shineout'

function TextRender() {
  return <span>Hi !</span>
}

export default function() {
  return (
    <div>
      <Button>
        <Popover style={{ padding: '4px 8px' }} useTextStyle={false}>
          {TextRender}
        </Popover>
        defaultStyle
      </Button>
      <Button>
        <Popover style={{ padding: '4px 8px' }} useTextStyle={true}>
          {TextRender}
        </Popover>
        useTextStyle
      </Button>
    </div>
  )
}
