/**
 * cn - 颜色
 *    -- 在创建组件时设置颜色
 * en - Icon color
 *    -- Set the color when the component is created.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const heartBg = <FontAwesome name="heart-o" />
const heart = <FontAwesome name="heart" style={{ color: '#ff4d4f' }} />
const HeartRate = Rate(heartBg, heart)

export default function() {
  return <HeartRate defaultValue={2} />
}
