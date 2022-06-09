/**
 * cn - 内嵌标题
 *    -- 在输入框内嵌入标题
 * en - InnerTitle
 *    -- inner title
 */

import React from 'react'
import { EditableArea } from 'shineout'

function InnerTitle() {
    return <span>😊 Hello</span>
}
export default function () {
    return (
        <div>
            <EditableArea bordered innerTitle="Email" placeholder="input something" />
            <br/>
            <EditableArea bordered innerTitle={InnerTitle()} placeholder="input something" />
        </div>
    )
}
