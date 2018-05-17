/**
 * cn - 错误处理
 *    -- alt 属性失效或没有 alt 属性时，会显示 title 属性
 * en - alt
 */
import React from 'react'
import { Image } from 'shineout'

export default function () {
  return (
    <Image width={200} height={125} src="notfound" title="Image not exist." />
  )
}
