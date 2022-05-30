/**
 * cn - 条目数量显示控制
 *    -- 通过设置 itemsInView 来指定下拉列表中项目的显示数量
 * en - itemsInView
 *    -- Control the visabile numbers of Select items
 */
import React from 'react'
import { Select } from 'shineout'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <div>
            <Select itemsInView={2} keygen style={{ width: 240 }} data={data} defaultValue="" />
            <br />
            <br />
            <Select itemsInView={4} keygen style={{ width: 240 }} data={data} defaultValue="" />
        </div>
    )
}
