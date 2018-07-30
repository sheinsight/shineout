/**
 * cn - 只读
 *    -- 设置 disabled 标示为只读，只读状态下，value可以传入小数
 * en - Readonly
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function () {
  return (
    <StarRate value={3.6} disabled />
  )
}
