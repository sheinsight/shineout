/**
 * cn - 渲染 textarea footer
 *    -- 在输入框内嵌入标题
 * en - RenderFooter
 *    -- render textarea footer
 */

import React from 'react'
import { EditableArea } from 'shineout'

function renderFooter() {
   return <div>Tip</div>
}
export default function () {
    return (
        <div>
            <EditableArea bordered renderFooter={renderFooter} placeholder="input something" />
        </div>
    )
}
