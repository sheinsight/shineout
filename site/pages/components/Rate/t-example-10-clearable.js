/**
 * cn - 清除
 *    -- 通过 clearable 属性可以设置再次点击清除 value。
 * en - clear
 *    -- Set the clearable to clear value when click again.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return <StarRate clearable />
}
