/**
 * cn - 基本用法
 *    -- Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用。
 * en - Base
 *    -- Rate is a function that creates a Rate component that specifies an icon or text for multiple reuse.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function () {
  return (
    <StarRate />
  )
}
