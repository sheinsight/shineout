/**
 * cn - 点击事件
 *    -- 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 click
 * en - Click
 */
import React from 'react'
import { Tooltip } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <div>
      <Tooltip tip="Some text." trigger="click" position="left" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-left" fontSize={20} />
      </Tooltip>
      <Tooltip tip="Some text." trigger="click" position="top" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-up" fontSize={20} />
      </Tooltip>
      <Tooltip tip="Some text." trigger="click" position="bottom" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-down" fontSize={20} />
      </Tooltip>
      <Tooltip tip="Some text." trigger="click" position="right" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-right" fontSize={20} />
      </Tooltip>
    </div>
  )
}
