/**
 * cn - 带文字的分割线
 *   -- 分割线中带有文字，可以用 orientation 指定文字位置。
 * en - Divider with title
 *  --Divider with inner title, set orientation="left/right" to align it.
 */
import React, { Fragment } from 'react'
import { Divider } from 'shineout'

export default function () {
    return (
        <Fragment>
            <p>Some content.</p>
            <Divider>Text</Divider>
            <p>Some content.</p>
            <Divider orientation="left">Text</Divider>
            <p>Some content.</p>
            <Divider orientation="right">Text</Divider>
            <p>Some content.</p>
        </Fragment>
    )
}
