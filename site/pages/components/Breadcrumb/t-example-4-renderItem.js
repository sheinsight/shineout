/**
 * cn - 自定义渲染
 *    -- 自定义渲染面包屑中的内容
 * en - Base
 *    -- Custom render content in Breadcrumb
 */

import { func } from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Message, Button } from 'shineout'

const data = [
    [{ title: 'Home', url: '#home' }, { title: 'aaa', url: '#aaa' }, { title: 'bbb', url: '#bbb' }],
    { title: <Link to="/components/Button">Button</Link> },
    { title: 'Self', onClick: () => Message.show('Clicked self') },
]
const renderItem = function (value) {
    let BreadcrumbItem = value.title
    if (value.onClick || value.url) {
        const props = {
            onClick: value.onClick,
        }
        if (value.url) props.href = value.url
        BreadcrumbItem = (
            <a {...props}>
                {value.icon}
                &nbsp;
                {value.title}
            </a>
        )
        return BreadcrumbItem
    } else {
        return <Button size="small">{BreadcrumbItem}</Button>
    }
}
export default function () {
    return <Breadcrumb renderItem={renderItem} data={data} />
}
