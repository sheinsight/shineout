/**
 * cn - 形状
 * en - Shape
 */
import React from 'react'
import { Image } from 'shineout'

export default function () {
  return (
    <div>
      <Image width={150} height={150} shape="rounded" title="rounded" />
      <Image width={150} height={150} shape="circle" title="circle" />
      <Image width={150} height={150} shape="thumbnail" title="thumbnail" />
    </div>
  )
}
