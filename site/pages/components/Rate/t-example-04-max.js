/**
 * cn - 最大值
 *    -- 通过 max 属性设置选项最大值，默认为 5
 * en - Max
 *    -- Set the maximum value of the option through the max attribute. The default value is 5.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return <StarRate max={10} defaultValue={3} />
}
