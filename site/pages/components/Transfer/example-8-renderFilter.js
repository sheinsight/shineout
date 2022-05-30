/**
 * cn - 自定义过滤渲染
 *    -- 自定义渲染过滤框区域内容
 * en - RenderFilter
 *    -- Custom render filter
 */
import React from 'react'
import { Transfer, Button, Input } from 'shineout'

const data = []

for (let i = 1; i < 20; i++) {
    data.push({
        id: i,
        content: `content ${i}`,
    })
}

function renderFilter(value) {
    return (
        <div style={{ display: 'flex' }}>
            <Input style={{ marginRight: '5px' }} onChange={value.onFilter}></Input>
            <Button type='primary'>查询</Button>
        </div>
    )
}

function onFilter(t, d) {
    return d.content.indexOf(t) > -1
}

export default function () {
    return <Transfer onFilter={onFilter} renderFilter={renderFilter} data={data} format="id" renderItem="content" keygen="id" titles={['Source', 'Target']} />
}
