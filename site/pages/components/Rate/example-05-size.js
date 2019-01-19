/**
 * cn - 大小
 *    -- 通过 size 属性可以设置大小
 * en - Size
 *    -- Set the size through the size property.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return (
    <div>
      <StarRate size={14} />
      <StarRate size={20} />
      <StarRate size={40} />
    </div>
  )
}
