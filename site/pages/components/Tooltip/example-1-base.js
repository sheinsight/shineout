/**
 * cn - 基本用法
 *    -- 内置了四个弹出方向
 * en - Base
 *    -- There are four pop-up directions built in.
 */
import React from 'react'
import { Tooltip } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 }

export default function() {
  return (
    <div>
      <Tooltip tip="Some text." position="left">
        <FontAwesome name="arrow-circle-o-left" style={fontStyle} />
      </Tooltip>
      <Tooltip tip="Some text." position="top">
        <FontAwesome name="arrow-circle-o-up" style={fontStyle} />
      </Tooltip>
      <Tooltip tip="Some text." position="bottom">
        <FontAwesome name="arrow-circle-o-down" style={fontStyle} />
      </Tooltip>
      <Tooltip tip="Some text." position="right">
        <FontAwesome name="arrow-circle-o-right" style={fontStyle} />
      </Tooltip>
    </div>
  )
}
