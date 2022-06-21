/**
 * cn - 图片组
 *    -- 一组图片可以放在 Image.Group 中
 * en - Group
 *    -- A group of images can be placed in the Image.Group .
 */
import React from 'react'
import { Image } from 'shineout'

const App: React.FC = () => (
  <Image.Group>
    {[1, 2, 3, 4].map(i => (
      <Image
        key={i}
        fit="fill"
        width={80}
        height={80}
        shape="thumbnail"
        src={`../../../images/${i}_s.jpg`}
        href={`../../../images/${i}_b.jpg`}
      />
    ))}
  </Image.Group>
)

export default App
