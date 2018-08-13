/**
 * cn - 颜色
 *    -- 默认的颜色为金色，可以在创建函数时设置颜色
 * en - Icon color
 *    -- The default color is golden. You can set the color when the component is created.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const heartBg = <FontAwesome name="heart-o" />
const heart = <FontAwesome name="heart" style={{ color: '#ff4d4f' }} />
const HeartRate = Rate(heartBg, heart)

export default function () {
  return (
    <HeartRate defaultValue={2} />
  )
}
