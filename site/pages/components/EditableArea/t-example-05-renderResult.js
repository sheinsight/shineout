/**
 * cn - 自定义显示结果
 *    -- 自定义显示结果
 * en - RenderResult
 *    -- Customize display results
 */

import React from 'react'
import { EditableArea } from 'shineout'

function renderResult() {
  return <div>Guessing what I inputed ?</div>
}
export default function() {
  return (
    <div>
      <EditableArea bordered renderResult={renderResult} placeholder="input something" />
    </div>
  )
}
