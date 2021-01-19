/**
 * cn - 垂直分割线
 *   -- 使用 mode="vertical" 设置为行内的垂直分割线。
 * en - Vertical
 *  --  Use type="vertical" make it vertical.
 */
import React, { Fragment } from 'react'
import { Divider } from 'shineout'

export default function () {
    return (
        <Fragment>
            Text
            <Divider mode="vertical" />
            <a href="#">Link</a>
            <Divider mode="vertical" />
            <a href="#">Link</a>
        </Fragment>
    )
}
