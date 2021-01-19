/**
 * cn - 基本用法
 *  --默认为水平分割线，可在中间加入文字。
 * en - Base
 *  --Divider is horizontal by default. You can add text within Divider.
 */
import React, { Fragment } from 'react'
import { Divider } from 'shineout'

export default function () {
    return (
        <Fragment>
            <p>Some content.</p>
            <Divider />
            <p>Some content.</p>
        </Fragment>
    )
}
