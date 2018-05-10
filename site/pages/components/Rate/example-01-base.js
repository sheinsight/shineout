/**
 * cn - 基本用法
 * en - Base
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
