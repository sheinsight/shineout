/**
 * cn - 基本用法
 *    -- 图片设置宽高后即使图片未加载，仍然会先占位
 * en - Base
 *    -- After the width and height of the image is set, it will be occupied firstly even if the image is not loaded。
 */
import React from 'react'
import { Image } from 'shineout'

export default function () {
  return (
    <Image width={200} height={125} src="/images/1_b.jpg" />
  )
}
