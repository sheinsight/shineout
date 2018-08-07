/**
 * cn - 基本用法
 *    -- 图片设置宽高后及时图片未加载，仍然会先占位
 * en - Base
 */
import React from 'react'
import { Image } from 'shineout'

export default function () {
  return (
    <Image width={200} height={125} src="../images/1_b.jpg" />
  )
}
