/**
 * cn - 清除
 *    -- 支持允许或者禁用再次点击清除。
 * en - clear
 *    -- Support set allow to clear star when click again.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

export default function() {
  return <StarRate clearable={true} />
}
