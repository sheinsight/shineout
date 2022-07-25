/**
 * cn - 形状
 *    -- 内置了三种图片样式，rounded, cricle, thumbnail
 * en - Shape
 *    -- There are three built-in styles, rounded, cricle, thumbnail.
 */
import React from 'react'
import { Image } from 'shineout'

const App: React.FC = () => (
  <div>
    <Image width={150} height={150} shape="rounded" title="rounded" />
    <Image width={150} height={150} shape="circle" title="circle" />
    <Image width={150} height={150} shape="thumbnail" title="thumbnail" />
  </div>
)

export default App
