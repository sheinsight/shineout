/**
 * cn - 控制懒加载数量显示
 *    -- 单次render的最大行数。Select 采用了lazy render的方式来优化在大量数据下的性能，如果你的表格显示的高度超出了20条，可以调整 itemsInView 的值。为 0 表示单次 render 所有数据。
 * en - itemsInView
 *    -- Control the visabile numbers of Select items
 */
import React from 'react'
import { Select } from 'shineout'

const data = []
for (let i = 0; i < 100; i++) {
  data.push(`Option-${i}`)
}

export default function () {
    return (
        <div>
            <Select itemsInView={30} keygen style={{ width: 240 }} data={data} defaultValue="" />
            <br />
            <br />
            <Select itemsInView={5} keygen style={{ width: 240 }} data={data} defaultValue="" />
        </div>
    )
}
