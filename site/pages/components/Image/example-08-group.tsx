/**
 * cn -
 *    -- 设置 pile 属性可以把缩略图堆叠展示
 * en -
 *    -- Set the pile property to show the image stack.
 */
import React from 'react'
import { Image } from 'shineout'

const App: React.FC = () => (
  <Image.Group pile>
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
