/**
 * cn - 备用地址
 *    -- 在 src 获取失败的情况下，自动使用 alt 属性设置的地址
 * en - Alt
 *    -- If the src address fails to load, use the alt property instead.
 */
import React from 'react'
import { Image } from 'shineout'

export default function() {
  return <Image width={200} height={125} src="notfound" alt="../../../images/1_b.jpg" />
}
