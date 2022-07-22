/**
 * cn - 适应
 *    -- 内置了 4 种适应容器的方式，填充、居中、原图、拉伸
 * en - Fit
 *    -- There are four built ways that fit the container, fill, center, original, stretch.
 */
import React from 'react'
import { Image } from 'shineout'

const src = '../../../images/1_b.jpg'

export default function() {
  return (
    <div>
      {['fill', 'center', 'fit', 'stretch'].map(fit => (
        <div key={fit} style={{ width: '25%', padding: 4, display: 'inline-block' }}>
          <Image width="100%" height="75%" src={src} shape="thumbnail" fit={fit} />
          <div style={{ textAlign: 'center', paddingTop: 4 }}>{fit}</div>
        </div>
      ))}
    </div>
  )
}
