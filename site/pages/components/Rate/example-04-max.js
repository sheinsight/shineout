/**
 * cn - 最大值
 *    -- 通过max设置选项最大值
 * en - Array
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function () {
  return (
    <StarRate max={10} defaultValue={3} />
  )
}
