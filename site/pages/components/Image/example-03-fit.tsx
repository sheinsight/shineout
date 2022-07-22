/**
 * cn - 适应
 *    -- 内置了 4 种适应容器的方式，填充、居中、原图、拉伸
 * en - Fit
 *    -- There are four built ways that fit the container, fill, center, original, stretch.
 */
import React from 'react'
import { Image, TYPE } from 'shineout'

type ImageProps = TYPE.Image.Props
type ImageFit = ImageProps['fit']

const src = '../../../images/1_b.jpg'
const fits: ImageFit[] = ['fill', 'center', 'fit', 'stretch']

const App: React.FC = () => (
  <div>
    {fits.map(fit => (
      <div key={fit} style={{ width: '25%', padding: 4, display: 'inline-block' }}>
        <Image width="100%" height="75%" src={src} shape="thumbnail" fit={fit} />
        <div style={{ textAlign: 'center', paddingTop: 4 }}>{fit}</div>
      </div>
    ))}
  </div>
)

export default App
