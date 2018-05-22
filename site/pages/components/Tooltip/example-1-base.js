/**
 * cn - 基本用法
 * en - Base
 */
import React from 'react'
import { Tooltip } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

export default function () {
  return (
    <div>
      <Tooltip tip="Some text." position="left" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-left" fontSize={20} />
      </Tooltip>
      <Tooltip tip="Some text." position="top" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-up" fontSize={20} />
      </Tooltip>
      <Tooltip tip="Some text." position="bottom" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-down" fontSize={20} />
      </Tooltip>
      <Tooltip tip="Some text." position="right" style={{ marginRight: 12 }}>
        <FontAwesome name="arrow-circle-o-right" fontSize={20} />
      </Tooltip>
    </div>
  )
}
