/**
 * cn - 半星
 *    -- Rate 是否允许半星。
 * en - Semi selection
 *    -- Rate whether to allow semi selection.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return <StarRate size={24} allowHalf />
}
