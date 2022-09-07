/**
 * cn - 延迟加载
 *    -- lazy 属性为 true 时，图片会在进入屏幕可视区域后加载, 默认以 document 的滚动条为判断
 * en - Lazy load
 *    -- When the lazy property is true, the image will load when it enter the visual area of the screen.
 */
import React from 'react'
import { Image, TYPE } from 'shineout'

type ImageProps = TYPE.Image.Props
type ImageSrc = ImageProps['src']

const data: ImageSrc[] = [1, 2, 3, 4].map(i => `../../../images/${i}_b.jpg`)

const App: React.FC = () => (
  <div>
    {data.map((img, i) => (
      <Image lazy key={i} fit="fill" height="66%" src={img} />
    ))}
  </div>
)

export default App
